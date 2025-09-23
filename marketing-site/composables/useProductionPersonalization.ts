// Production Personalization Composable
// Integrates PostHog, Strapi, and Admin App for production-ready personalization

import { 
  productionPersonalizationConfig, 
  setupPostHogPersonalization, 
  setupStrapiPersonalization, 
  setupAdminAppPersonalization 
} from '~/config/production-personalization'

interface PersonalizationState {
  currentVariant: number
  source: 'posthog' | 'strapi' | 'admin' | 'intelligent' | 'fallback'
  isLoading: boolean
  error: string | null
  lastSync: Date | null
}

export const useProductionPersonalization = () => {
  const state = reactive<PersonalizationState>({
    currentVariant: 0,
    source: 'fallback',
    isLoading: true,
    error: null,
    lastSync: null
  })

  // Integration instances
  let posthogIntegration: any = null
  let strapiIntegration: any = null
  let adminIntegration: any = null

  // Initialize integrations
  const initializeIntegrations = async () => {
    try {
      // PostHog Integration
      if (productionPersonalizationConfig.posthog.enabled) {
        posthogIntegration = setupPostHogPersonalization()
      }

      // Strapi Integration
      if (productionPersonalizationConfig.strapi.enabled) {
        strapiIntegration = await setupStrapiPersonalization()
      }

      // Admin App Integration
      if (productionPersonalizationConfig.adminApp.enabled) {
        adminIntegration = setupAdminAppPersonalization()
      }

      state.lastSync = new Date()
    } catch (error) {
      console.error('Failed to initialize personalization integrations:', error)
      state.error = error instanceof Error ? error.message : 'Unknown error'
    }
  }

  // Get personalization variant with priority hierarchy
  const getPersonalizationVariant = async (): Promise<number> => {
    try {
      // Priority 1: PostHog A/B Testing
      if (posthogIntegration) {
        const variant = posthogIntegration.getVariant(
          productionPersonalizationConfig.posthog.featureFlags.personalizationVariant
        )
        
        if (variant !== null && !isNaN(parseInt(variant))) {
          state.source = 'posthog'
          const variantNum = parseInt(variant) % 5
          console.log('🎯 PostHog A/B Test - Variant:', variantNum)
          
          // Track the variant assignment
          posthogIntegration.capture('personalization_variant_assigned', {
            variant: variantNum,
            source: 'posthog'
          })
          
          return variantNum
        }
      }

      // Priority 2: Strapi CMS Configuration
      if (strapiIntegration) {
        const config = await strapiIntegration.fetchConfig()
        if (config?.data?.[0]?.attributes?.variant !== undefined) {
          state.source = 'strapi'
          const variantNum = config.data[0].attributes.variant % 5
          console.log('📝 Strapi CMS - Variant:', variantNum)
          return variantNum
        }
      }

      // Priority 3: Admin App Configuration
      if (adminIntegration) {
        const config = await adminIntegration.syncConfig()
        if (config?.personalizationVariant !== undefined) {
          state.source = 'admin'
          const variantNum = config.personalizationVariant % 5
          console.log('🏢 Admin App - Variant:', variantNum)
          return variantNum
        }
      }

      // Priority 4: Intelligent Fallback
      state.source = 'intelligent'
      return getIntelligentFallback()

    } catch (error) {
      console.error('Error getting personalization variant:', error)
      state.error = error instanceof Error ? error.message : 'Unknown error'
      state.source = 'fallback'
      return productionPersonalizationConfig.fallbacks.defaultOption
    }
  }

  // Intelligent fallback based on user context
  const getIntelligentFallback = (): number => {
    // Get user context (you'll need to import this from your existing composable)
    const userContext = getCurrentUserContext() // This would come from usePersonalization
    
    if (!userContext) {
      return productionPersonalizationConfig.fallbacks.defaultOption
    }

    const { location, timing } = userContext
    const fallbacks = productionPersonalizationConfig.fallbacks

    // Market-based defaults
    if (timing?.marketSession) {
      const marketDefault = fallbacks.marketBasedDefaults[timing.marketSession as keyof typeof fallbacks.marketBasedDefaults]
      if (marketDefault !== undefined) {
        console.log(`📈 Intelligent Fallback - Market (${timing.marketSession}):`, marketDefault)
        return marketDefault
      }
    }

    // Country-based defaults
    if (location?.country && fallbacks.countryDefaults[location.country]) {
      const countryDefault = fallbacks.countryDefaults[location.country]
      console.log(`🌍 Intelligent Fallback - Country (${location.country}):`, countryDefault)
      return countryDefault
    }

    // Final fallback
    console.log('🔄 Using default fallback:', fallbacks.defaultOption)
    return fallbacks.defaultOption
  }

  // Get current user context (integrate with existing usePersonalization)
  const getCurrentUserContext = () => {
    // This should integrate with your existing usePersonalization composable
    // For now, return null - you'll need to connect this
    return null
  }

  // Load and set personalization variant
  const loadPersonalizationVariant = async () => {
    state.isLoading = true
    state.error = null

    try {
      await initializeIntegrations()
      const variant = await getPersonalizationVariant()
      state.currentVariant = variant
      
      // Report metrics to admin app if enabled
      if (adminIntegration) {
        await adminIntegration.reportMetrics({
          variant,
          source: state.source,
          timestamp: new Date().toISOString(),
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : null
        })
      }

    } catch (error) {
      console.error('Failed to load personalization variant:', error)
      state.error = error instanceof Error ? error.message : 'Unknown error'
      state.currentVariant = productionPersonalizationConfig.fallbacks.defaultOption
      state.source = 'fallback'
    } finally {
      state.isLoading = false
    }
  }

  // Sync configuration from all sources
  const syncConfiguration = async () => {
    console.log('🔄 Syncing personalization configuration...')
    await loadPersonalizationVariant()
  }

  // Set up periodic sync if admin app is enabled
  const setupPeriodicSync = () => {
    if (productionPersonalizationConfig.adminApp.enabled && productionPersonalizationConfig.adminApp.syncInterval > 0) {
      const intervalMs = productionPersonalizationConfig.adminApp.syncInterval * 60 * 1000
      setInterval(syncConfiguration, intervalMs)
      console.log(`⏰ Periodic sync enabled: every ${productionPersonalizationConfig.adminApp.syncInterval} minutes`)
    }
  }

  // Initialize on composable creation
  onMounted(async () => {
    await loadPersonalizationVariant()
    setupPeriodicSync()
  })

  // Reactive variant that updates when state changes
  const currentVariant = computed(() => state.currentVariant)

  return {
    // State
    currentVariant,
    source: readonly(toRef(state, 'source')),
    isLoading: readonly(toRef(state, 'isLoading')),
    error: readonly(toRef(state, 'error')),
    lastSync: readonly(toRef(state, 'lastSync')),

    // Methods
    syncConfiguration,
    loadPersonalizationVariant,

    // Integration status
    integrations: computed(() => ({
      posthog: !!posthogIntegration,
      strapi: !!strapiIntegration,
      admin: !!adminIntegration
    }))
  }
}
