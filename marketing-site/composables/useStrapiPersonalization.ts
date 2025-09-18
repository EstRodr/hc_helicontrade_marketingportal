// Strapi Integration for Personalization Content Management
import { strapiContentTypes, type PersonalizationConfig, type MarketConfig } from '~/config/personalization'

interface StrapiPersonalizationState {
  isLoading: boolean
  error: string | null
  lastSynced: Date | null
  contentCache: Record<string, any>
}

export const useStrapiPersonalization = () => {
  const config = useRuntimeConfig()
  const state = reactive<StrapiPersonalizationState>({
    isLoading: false,
    error: null,
    lastSynced: null,
    contentCache: {}
  })

  // Strapi API client
  const strapiEndpoint = config.public.strapiUrl || ''
  const strapiToken = config.public.strapiToken || ''

  // Generic Strapi API call
  const strapiApiCall = async (endpoint: string, options: RequestInit = {}) => {
    if (!strapiEndpoint) {
      throw new Error('Strapi endpoint not configured')
    }

    const headers = {
      'Content-Type': 'application/json',
      ...(strapiToken && { 'Authorization': `Bearer ${strapiToken}` }),
      ...options.headers
    }

    const response = await fetch(`${strapiEndpoint}/api/${endpoint}`, {
      ...options,
      headers
    })

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Load personalization config from Strapi
  const loadPersonalizationConfig = async (): Promise<PersonalizationConfig | null> => {
    try {
      state.isLoading = true
      const response = await strapiApiCall(`${strapiContentTypes.PERSONALIZATION_CONFIG}?populate=*`)
      
      if (response.data && response.data.length > 0) {
        const config = response.data[0].attributes
        state.contentCache.personalizationConfig = config
        return config
      }
      
      return null
    } catch (error) {
      console.error('Failed to load personalization config from Strapi:', error)
      state.error = 'Failed to load configuration'
      return null
    } finally {
      state.isLoading = false
    }
  }

  // Load market configurations from Strapi
  const loadMarketConfigurations = async (): Promise<Record<string, MarketConfig> | null> => {
    try {
      state.isLoading = true
      const response = await strapiApiCall(`${strapiContentTypes.MARKET_CONFIGURATIONS}?populate=*`)
      
      if (response.data) {
        const markets: Record<string, MarketConfig> = {}
        
        response.data.forEach((item: any) => {
          const config = item.attributes
          markets[config.countryCode] = {
            exchange: config.exchange,
            indices: config.indices,
            currency: config.currency,
            timezone: config.timezone,
            marketHours: config.marketHours,
            holidays: config.holidays || [],
            languages: config.languages || ['en']
          }
        })
        
        state.contentCache.marketConfigurations = markets
        return markets
      }
      
      return null
    } catch (error) {
      console.error('Failed to load market configurations from Strapi:', error)
      state.error = 'Failed to load market configurations'
      return null
    } finally {
      state.isLoading = false
    }
  }

  // Load content variations for A/B testing
  const loadContentVariations = async (locale: string = 'en') => {
    try {
      state.isLoading = true
      const response = await strapiApiCall(
        `${strapiContentTypes.CONTENT_VARIATIONS}?populate=*&locale=${locale}`
      )
      
      if (response.data) {
        const variations: Record<string, any> = {}
        
        response.data.forEach((item: any) => {
          const config = item.attributes
          variations[config.type] = {
            default: config.defaultContent,
            variants: config.variants || {}
          }
        })
        
        state.contentCache.contentVariations = variations
        return variations
      }
      
      return null
    } catch (error) {
      console.error('Failed to load content variations from Strapi:', error)
      state.error = 'Failed to load content variations'
      return null
    } finally {
      state.isLoading = false
    }
  }

  // Load localized greetings and messages
  const loadLocalizedContent = async (countryCode: string, locale: string = 'en') => {
    try {
      state.isLoading = true
      const cacheKey = `localizedContent_${countryCode}_${locale}`
      
      // Check cache first
      if (state.contentCache[cacheKey]) {
        return state.contentCache[cacheKey]
      }

      const response = await strapiApiCall(
        `localized-contents?filters[countryCode][$eq]=${countryCode}&locale=${locale}&populate=*`
      )
      
      if (response.data && response.data.length > 0) {
        const content = response.data[0].attributes
        const localizedContent = {
          greetings: {
            morning: content.morningGreetings || [],
            afternoon: content.afternoonGreetings || [],
            evening: content.eveningGreetings || [],
            night: content.nightGreetings || []
          },
          headlines: content.headlines || {},
          ctas: content.ctas || {},
          urgencyMessages: content.urgencyMessages || {},
          marketMessages: content.marketMessages || {}
        }
        
        state.contentCache[cacheKey] = localizedContent
        return localizedContent
      }
      
      return null
    } catch (error) {
      console.error(`Failed to load localized content for ${countryCode}/${locale}:`, error)
      state.error = 'Failed to load localized content'
      return null
    } finally {
      state.isLoading = false
    }
  }

  // Update personalization config in Strapi
  const updatePersonalizationConfig = async (config: PersonalizationConfig) => {
    try {
      state.isLoading = true
      
      // Check if config exists
      const existing = await strapiApiCall(`${strapiContentTypes.PERSONALIZATION_CONFIG}`)
      
      const method = existing.data.length > 0 ? 'PUT' : 'POST'
      const endpoint = existing.data.length > 0 
        ? `${strapiContentTypes.PERSONALIZATION_CONFIG}/${existing.data[0].id}`
        : strapiContentTypes.PERSONALIZATION_CONFIG

      await strapiApiCall(endpoint, {
        method,
        body: JSON.stringify({ data: config })
      })
      
      state.contentCache.personalizationConfig = config
      state.lastSynced = new Date()
      
    } catch (error) {
      console.error('Failed to update personalization config in Strapi:', error)
      state.error = 'Failed to update configuration'
      throw error
    } finally {
      state.isLoading = false
    }
  }

  // Sync all content from Strapi
  const syncAllContent = async (locale: string = 'en') => {
    try {
      state.isLoading = true
      
      const [config, markets, variations] = await Promise.all([
        loadPersonalizationConfig(),
        loadMarketConfigurations(),
        loadContentVariations(locale)
      ])
      
      state.lastSynced = new Date()
      
      return {
        config,
        markets,
        variations
      }
    } catch (error) {
      console.error('Failed to sync content from Strapi:', error)
      state.error = 'Failed to sync content'
      throw error
    } finally {
      state.isLoading = false
    }
  }

  // Get cached content
  const getCachedContent = (key: string) => {
    return state.contentCache[key] || null
  }

  // Clear cache
  const clearCache = () => {
    state.contentCache = {}
    state.lastSynced = null
  }

  // Check if Strapi is configured and available
  const isAvailable = async () => {
    if (!strapiEndpoint) {
      return false
    }

    try {
      await strapiApiCall('')
      return true
    } catch (error) {
      return false
    }
  }

  // Initialize Strapi integration
  const initializeStrapi = async (locale: string = 'en') => {
    if (!strapiEndpoint) {
      console.warn('Strapi not configured, skipping content sync')
      return null
    }

    try {
      const isOnline = await isAvailable()
      if (!isOnline) {
        console.warn('Strapi not available, using cached content')
        return null
      }

      return await syncAllContent(locale)
    } catch (error) {
      console.error('Failed to initialize Strapi:', error)
      return null
    }
  }

  return {
    // State
    isLoading: readonly(ref(state.isLoading)),
    error: readonly(ref(state.error)),
    lastSynced: readonly(ref(state.lastSynced)),

    // Content Loading
    loadPersonalizationConfig,
    loadMarketConfigurations,
    loadContentVariations,
    loadLocalizedContent,
    
    // Content Management
    updatePersonalizationConfig,
    syncAllContent,
    
    // Cache Management
    getCachedContent,
    clearCache,
    
    // Utility
    isAvailable,
    initializeStrapi
  }
}
