// PostHog analytics implementation for Nuxt 3
// We'll load PostHog dynamically to avoid package conflicts during development

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  
  // Only load in production or when PostHog key is provided
  if (!config.public.posthogPublicKey) {
    console.warn('PostHog: Public key not configured')
    return
  }

  try {
    // Dynamically import PostHog to avoid build conflicts
    // Handle case where posthog-js is not installed
    let posthog
    try {
      const module = await import('posthog-js')
      posthog = module.default
    } catch (importError) {
      console.warn('PostHog package not installed. Install with: npm install posthog-js')
      return
    }
    
    // Initialize PostHog with latest recommended settings
    posthog.init(config.public.posthogPublicKey, {
      api_host: config.public.posthogHost || 'https://app.posthog.com',
      person_profiles: 'identified_only', // Latest PostHog recommendation
      // Privacy-friendly settings
      capture_pageview: false, // We'll handle page views manually
      capture_pageleave: true,
      disable_session_recording: !config.public.posthogRecordingEnabled,
      autocapture: false, // We'll use manual tracking for better control
      // GDPR compliance
      opt_out_capturing_by_default: false,
      respect_dnt: true,
      // Performance
      loaded: function(posthog) {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog loaded successfully')
        }
      }
    })

    // Track initial page view
    posthog.capture('$pageview', {
      $current_url: window.location.href,
      $title: document.title
    })

    // Add PostHog to global context
    const nuxtApp = useNuxtApp()
    nuxtApp.provide('posthog', posthog)
    
    // Also add to global window for debugging/external access
    if (typeof window !== 'undefined') {
      (window as any).posthog = posthog
    }

    // Track route changes
    const router = useRouter()
    router.afterEach((to) => {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        $title: to.meta.title || document.title
      })
    })

  } catch (error) {
    console.warn('Failed to load PostHog:', error)
  }
})

// Type definitions
declare module '#app' {
  interface NuxtApp {
    $posthog: any
  }
}
