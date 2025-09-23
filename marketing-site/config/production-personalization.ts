// Production Personalization Configuration
// Integrates with PostHog, Strapi, and Main Admin App

export interface ProductionPersonalizationConfig {
  // PostHog A/B Testing Configuration
  posthog: {
    enabled: boolean
    featureFlags: {
      personalizationVariant: string // 'personalization-variant'
      enablePersonalization: string // 'enable-personalization'
      smoothTransitions: string // 'smooth-transitions'
    }
    fallbackBehavior: 'intelligent' | 'random' | 'fixed'
  }
  
  // Strapi CMS Integration
  strapi: {
    enabled: boolean
    endpoints: {
      personalizationConfig: string // '/api/personalization-configs'
      contentVariants: string // '/api/content-variants'
      marketConfigs: string // '/api/market-configs'
    }
    cacheDuration: number // minutes
    fallbackBehavior: 'cache' | 'default'
  }
  
  // Main Admin App Integration
  adminApp: {
    enabled: boolean
    apiEndpoint: string // Your main admin API
    authToken?: string
    syncInterval: number // minutes
  }
  
  // Fallback Configuration
  fallbacks: {
    defaultOption: number // 0-4
    marketBasedDefaults: {
      preMarket: number
      marketOpen: number
      afterHours: number
      marketClosed: number
    }
    countryDefaults: Record<string, number>
  }
}

export const productionPersonalizationConfig: ProductionPersonalizationConfig = {
  posthog: {
    enabled: true,
    featureFlags: {
      personalizationVariant: 'personalization-variant',
      enablePersonalization: 'enable-personalization',
      smoothTransitions: 'smooth-transitions'
    },
    fallbackBehavior: 'intelligent'
  },
  
  strapi: {
    enabled: true,
    endpoints: {
      personalizationConfig: '/api/personalization-configs',
      contentVariants: '/api/content-variants',
      marketConfigs: '/api/market-configs'
    },
    cacheDuration: 30, // 30 minutes
    fallbackBehavior: 'cache'
  },
  
  adminApp: {
    enabled: false, // Enable when ready to integrate with main admin
    apiEndpoint: process.env.NUXT_PUBLIC_ADMIN_API_URL || '',
    syncInterval: 15 // 15 minutes
  },
  
  fallbacks: {
    defaultOption: 0,
    marketBasedDefaults: {
      preMarket: 1, // "AI eyes on markets — opportunity never sleeps"
      marketOpen: 0, // "Global insight, built for [country] markets"
      afterHours: 2, // "Your edge in [country]'s markets"
      marketClosed: 3 // "[Country] markets, redefined by intelligence"
    },
    countryDefaults: {
      'Sweden': 0,
      'United States': 1,
      'Germany': 3,
      'France': 2,
      'Japan': 4,
      'Australia': 1,
      'Canada': 0
    }
  }
}

// PostHog Integration Helper
export const setupPostHogPersonalization = () => {
  if (typeof window === 'undefined') return null
  
  const posthog = (window as any).posthog
  if (!posthog) return null
  
  // Set up user properties for better targeting
  posthog.identify(posthog.get_distinct_id(), {
    personalization_enabled: true,
    market_interest: 'trading',
    platform: 'marketing_site'
  })
  
  return {
    getVariant: (flagName: string) => posthog.getFeatureFlag(flagName),
    isEnabled: (flagName: string) => posthog.isFeatureEnabled(flagName),
    capture: (eventName: string, properties: any) => posthog.capture(eventName, properties)
  }
}

// Strapi Integration Helper
export const setupStrapiPersonalization = async () => {
  const config = useRuntimeConfig()
  const strapiUrl = config.public.strapiUrl
  const strapiToken = config.public.strapiToken
  
  if (!strapiUrl) return null
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }
  
  if (strapiToken) {
    headers['Authorization'] = `Bearer ${strapiToken}`
  }
  
  return {
    fetchConfig: async () => {
      try {
        const response = await fetch(`${strapiUrl}/api/personalization-configs?populate=*`, {
          headers
        })
        return await response.json()
      } catch (error) {
        console.warn('Failed to fetch Strapi personalization config:', error)
        return null
      }
    },
    
    fetchContentVariants: async () => {
      try {
        const response = await fetch(`${strapiUrl}/api/content-variants?populate=*`, {
          headers
        })
        return await response.json()
      } catch (error) {
        console.warn('Failed to fetch Strapi content variants:', error)
        return null
      }
    }
  }
}

// Main Admin App Integration Helper
export const setupAdminAppPersonalization = () => {
  const config = productionPersonalizationConfig.adminApp
  
  if (!config.enabled || !config.apiEndpoint) return null
  
  return {
    syncConfig: async () => {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        }
        
        if (config.authToken) {
          headers['Authorization'] = `Bearer ${config.authToken}`
        }
        
        const response = await fetch(`${config.apiEndpoint}/personalization/config`, {
          headers
        })
        
        return await response.json()
      } catch (error) {
        console.warn('Failed to sync with admin app:', error)
        return null
      }
    },
    
    reportMetrics: async (metrics: any) => {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        }
        
        if (config.authToken) {
          headers['Authorization'] = `Bearer ${config.authToken}`
        }
        
        await fetch(`${config.apiEndpoint}/personalization/metrics`, {
          method: 'POST',
          headers,
          body: JSON.stringify(metrics)
        })
      } catch (error) {
        console.warn('Failed to report metrics to admin app:', error)
      }
    }
  }
}
