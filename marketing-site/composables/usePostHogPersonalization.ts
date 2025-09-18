// PostHog Integration for Personalization
import { posthogFeatureFlags, defaultPersonalizationConfig, type PersonalizationConfig } from '~/config/personalization'

interface PostHogPersonalizationState {
  config: PersonalizationConfig
  isLoading: boolean
  error: string | null
  userVariant: string | null
}

export const usePostHogPersonalization = () => {
  const state = reactive<PostHogPersonalizationState>({
    config: { ...defaultPersonalizationConfig },
    isLoading: true,
    error: null,
    userVariant: null
  })

  // PostHog instance (if available)
  const posthog = process.client ? (window as any).posthog : null

  // Load feature flags from PostHog
  const loadFeatureFlags = async () => {
    if (!posthog || !state.config.integrations.posthog.enabled) {
      state.isLoading = false
      return
    }

    try {
      // Wait for PostHog to load feature flags
      await new Promise((resolve) => {
        if (posthog.isFeatureEnabled) {
          resolve(true)
        } else {
          posthog.onFeatureFlags(resolve)
        }
      })

      // Update config based on PostHog feature flags
      state.config.features = {
        personalization: posthog.isFeatureEnabled(posthogFeatureFlags.PERSONALIZATION_ENABLED) ?? state.config.features.personalization,
        smoothTransition: posthog.isFeatureEnabled(posthogFeatureFlags.SMOOTH_TRANSITIONS) ?? state.config.features.smoothTransition,
        locationDetection: posthog.isFeatureEnabled(posthogFeatureFlags.LOCATION_DETECTION) ?? state.config.features.locationDetection,
        marketHours: posthog.isFeatureEnabled(posthogFeatureFlags.MARKET_HOURS_DISPLAY) ?? state.config.features.marketHours,
        greetings: state.config.features.greetings,
        urgencyMessages: state.config.features.urgencyMessages,
        adaptiveCTAs: posthog.isFeatureEnabled(posthogFeatureFlags.ADAPTIVE_CTAS) ?? state.config.features.adaptiveCTAs
      }

      // A/B Testing
      state.config.experiments = {
        headlineVariants: posthog.isFeatureEnabled(posthogFeatureFlags.HEADLINE_VARIANTS) ?? false,
        ctaVariants: posthog.isFeatureEnabled(posthogFeatureFlags.ADAPTIVE_CTAS) ?? false,
        colorScheme: posthog.isFeatureEnabled(posthogFeatureFlags.COLOR_SCHEME_TEST) ?? false
      }

      // Get user variant for A/B testing
      state.userVariant = posthog.getFeatureFlag(posthogFeatureFlags.HEADLINE_VARIANTS) || 'default'

      console.log('PostHog feature flags loaded:', {
        features: state.config.features,
        experiments: state.config.experiments,
        userVariant: state.userVariant
      })

    } catch (error) {
      console.error('Failed to load PostHog feature flags:', error)
      state.error = 'Failed to load feature flags'
    } finally {
      state.isLoading = false
    }
  }

  // Track personalization events
  const trackPersonalizationEvent = (eventName: string, properties: Record<string, any> = {}) => {
    if (!posthog || !state.config.integrations.posthog.analytics) return

    posthog.capture(`personalization_${eventName}`, {
      ...properties,
      timestamp: new Date().toISOString(),
      config: {
        personalizationEnabled: state.config.features.personalization,
        locationDetection: state.config.features.locationDetection,
        smoothTransition: state.config.features.smoothTransition
      }
    })
  }

  // Track location detection
  const trackLocationDetected = (location: any) => {
    trackPersonalizationEvent('location_detected', {
      country: location.country,
      countryCode: location.countryCode,
      city: location.city,
      timezone: location.timezone,
      currency: location.currency
    })
  }

  // Track content variation shown
  const trackContentVariation = (type: 'headline' | 'cta' | 'greeting', variant: string, content: string) => {
    trackPersonalizationEvent('content_variation_shown', {
      type,
      variant,
      content,
      userVariant: state.userVariant
    })
  }

  // Track user interaction with personalized content
  const trackPersonalizedInteraction = (action: string, content: string, context: any = {}) => {
    trackPersonalizationEvent('personalized_interaction', {
      action,
      content,
      context
    })
  }

  // Initialize PostHog integration
  const initializePostHog = async () => {
    if (!process.client) return

    // Wait for PostHog to be available
    let attempts = 0
    const maxAttempts = 50
    
    while (!posthog && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }

    if (posthog) {
      await loadFeatureFlags()
    } else {
      console.warn('PostHog not available, using default configuration')
      state.isLoading = false
    }
  }

  // Get current configuration
  const getConfig = () => state.config

  // Check if feature is enabled
  const isFeatureEnabled = (feature: keyof PersonalizationConfig['features']) => {
    return state.config.features[feature]
  }

  // Get experiment variant
  const getExperimentVariant = (experiment: string) => {
    if (!posthog) return 'default'
    return posthog.getFeatureFlag(experiment) || 'default'
  }

  // Manual override for development/testing
  const overrideConfig = (overrides: Partial<PersonalizationConfig>) => {
    state.config = {
      ...state.config,
      ...overrides,
      features: {
        ...state.config.features,
        ...(overrides.features || {})
      },
      experiments: {
        ...state.config.experiments,
        ...(overrides.experiments || {})
      }
    }
  }

  return {
    // State
    config: readonly(state.config),
    isLoading: readonly(ref(state.isLoading)),
    error: readonly(ref(state.error)),
    userVariant: readonly(ref(state.userVariant)),

    // Methods
    initializePostHog,
    loadFeatureFlags,
    getConfig,
    isFeatureEnabled,
    getExperimentVariant,
    overrideConfig,

    // Analytics
    trackPersonalizationEvent,
    trackLocationDetected,
    trackContentVariation,
    trackPersonalizedInteraction
  }
}
