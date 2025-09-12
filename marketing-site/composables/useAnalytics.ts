// Analytics composable for unified tracking across GA4 and PostHog
export const useAnalytics = () => {
  const { $gtag, $posthog } = useNuxtApp()

  // Track page views
  const trackPageView = (page: string, title?: string) => {
    try {
      // Google Analytics
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('config', useRuntimeConfig().public.gaMeasurementId, {
          page_title: title || document.title,
          page_location: window.location.href
        })
      }

      // PostHog
      if ($posthog) {
        $posthog.capture('$pageview', {
          $current_url: window.location.href,
          $title: title || document.title,
          page: page
        })
      }
    } catch (error) {
      console.warn('Analytics tracking error:', error)
    }
  }

  // Track custom events
  const trackEvent = (
    eventName: string, 
    parameters: Record<string, any> = {},
    options?: {
      gaAction?: string
      gaCategory?: string
      gaLabel?: string
    }
  ) => {
    try {
      // Google Analytics
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', options?.gaAction || eventName, {
          event_category: options?.gaCategory || 'engagement',
          event_label: options?.gaLabel,
          ...parameters
        })
      }

      // PostHog
      if ($posthog) {
        $posthog.capture(eventName, {
          ...parameters,
          timestamp: new Date().toISOString(),
          page: window.location.pathname
        })
      }
    } catch (error) {
      console.warn('Event tracking error:', error)
    }
  }

  // Track user properties
  const identifyUser = (userId: string, properties: Record<string, any> = {}) => {
    try {
      // Google Analytics
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('config', useRuntimeConfig().public.gaMeasurementId, {
          user_id: userId,
          custom_map: properties
        })
      }

      // PostHog
      if ($posthog) {
        $posthog.identify(userId, properties)
      }
    } catch (error) {
      console.warn('User identification error:', error)
    }
  }

  // Track business-specific events
  const trackBusinessEvent = {
    // CTA and conversion tracking
    ctaClick: (ctaName: string, location: string) => {
      trackEvent('cta_click', {
        cta_name: ctaName,
        location: location
      }, {
        gaAction: 'click',
        gaCategory: 'cta',
        gaLabel: ctaName
      })
    },

    // Registration funnel
    registrationStart: () => {
      trackEvent('registration_start', {}, {
        gaAction: 'start',
        gaCategory: 'registration'
      })
    },

    registrationComplete: (method: string = 'email') => {
      trackEvent('registration_complete', {
        method: method
      }, {
        gaAction: 'complete',
        gaCategory: 'registration'
      })
    },

    // Content engagement
    contentView: (contentType: string, contentId: string) => {
      trackEvent('content_view', {
        content_type: contentType,
        content_id: contentId
      }, {
        gaAction: 'view',
        gaCategory: 'content'
      })
    },

    // Newsletter and marketing
    newsletterSubscribe: (location: string) => {
      trackEvent('newsletter_subscribe', {
        location: location
      }, {
        gaAction: 'subscribe',
        gaCategory: 'newsletter'
      })
    },

    // Platform usage
    demoStart: (demoType: string = 'interactive') => {
      trackEvent('demo_start', {
        demo_type: demoType
      }, {
        gaAction: 'start',
        gaCategory: 'demo'
      })
    },

    // Contact and support
    contactForm: (formType: string = 'general') => {
      trackEvent('contact_form_submit', {
        form_type: formType
      }, {
        gaAction: 'submit',
        gaCategory: 'contact'
      })
    },

    // Navigation and engagement
    navigationClick: (destination: string) => {
      trackEvent('navigation_click', {
        destination: destination
      }, {
        gaAction: 'click',
        gaCategory: 'navigation'
      })
    },

    // Error tracking
    error: (errorType: string, errorMessage: string) => {
      trackEvent('error', {
        error_type: errorType,
        error_message: errorMessage
      }, {
        gaAction: 'error',
        gaCategory: 'technical'
      })
    }
  }

  return {
    trackPageView,
    trackEvent,
    identifyUser,
    track: trackBusinessEvent
  }
}
