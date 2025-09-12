// Google Analytics 4 implementation for Nuxt 3
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { $router } = useNuxtApp()
  
  // Only load in production or when GA_MEASUREMENT_ID is provided
  if (!config.public.gaMeasurementId) {
    console.warn('Google Analytics: GA_MEASUREMENT_ID not configured')
    return
  }

  // Check if user has consented to analytics
  const checkConsent = () => {
    const consent = localStorage.getItem('helicontrade-cookie-consent')
    if (!consent) return false
    try {
      const parsed = JSON.parse(consent)
      return parsed.analytics === true
    } catch {
      return false
    }
  }

  const initializeGA = () => {
    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.public.gaMeasurementId}`
    document.head.appendChild(script)

    // Initialize gtag
    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }

      // Make gtag globally available first
      window.gtag = gtag

      // Configure Google Analytics
      gtag('js', new Date())
      gtag('config', config.public.gaMeasurementId, {
        // Privacy-friendly settings
        anonymize_ip: true,
        send_page_view: false, // We'll handle page views manually
        cookie_flags: 'SameSite=None;Secure'
      })

      // Track initial page view
      gtag('config', config.public.gaMeasurementId, {
        page_title: document.title,
        page_location: window.location.href
      })

      // Add gtag to global context for use in components
      const nuxtApp = useNuxtApp()
      nuxtApp.provide('gtag', gtag)

      // Track route changes
      $router.afterEach((to) => {
        if (checkConsent()) {
          gtag('config', config.public.gaMeasurementId, {
            page_title: to.meta.title || document.title,
            page_location: window.location.href
          })
        }
      })
      
      console.log('Google Analytics loaded successfully')
    }
  }

  // Initialize if consent already given
  if (checkConsent()) {
    initializeGA()
  }

  // Listen for consent events
  window.addEventListener('analytics-consent-granted', () => {
    if (!window.gtag) {
      initializeGA()
    }
  })
})

// Extend global types
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
