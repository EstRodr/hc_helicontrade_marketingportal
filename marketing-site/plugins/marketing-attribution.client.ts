/**
 * Marketing Attribution Tracking Plugin
 * 
 * Automatically tracks UTM parameters, referral codes, and other marketing
 * attribution data when users land on the marketing site.
 */

export default defineNuxtPlugin(() => {
  // Only run on client-side
  if (process.server) return

  // Track marketing attribution on page load
  const trackMarketingAttribution = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const attribution: Record<string, string> = {}
      
      // UTM parameters
      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      utmParams.forEach(param => {
        const value = urlParams.get(param)
        if (value) attribution[param] = value
      })
      
      // Referral and affiliate tracking
      const trackingParams = ['ref', 'referral', 'affiliate', 'channel']
      trackingParams.forEach(param => {
        const value = urlParams.get(param)
        if (value) attribution[param] = value
      })
      
      // Google/Facebook click IDs
      const clickIds = ['gclid', 'fbclid', 'msclkid']
      clickIds.forEach(param => {
        const value = urlParams.get(param)
        if (value) attribution[param] = value
      })
      
      // Store attribution data if any parameters were found
      if (Object.keys(attribution).length > 0) {
        const attributionData = {
          ...attribution,
          landing_page: window.location.pathname,
          referrer: document.referrer,
          timestamp: Date.now(),
          session_id: generateSessionId()
        }
        
        localStorage.setItem('helicontrade_marketing_attribution', JSON.stringify(attributionData))
        
        // Optional: Send to analytics service immediately
        console.log('Marketing attribution tracked:', attributionData)
        
        // You can send to Google Analytics, Mixpanel, etc. here
        // trackEvent('marketing_attribution', attributionData)
      }
    } catch (error) {
      console.error('Failed to track marketing attribution:', error)
    }
  }
  
  // Generate a simple session ID
  const generateSessionId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  }
  
  // Track on initial load
  trackMarketingAttribution()
  
  // Track on navigation (for SPA behavior)
  const router = useRouter()
  router.afterEach(() => {
    // Only track if there are new parameters
    if (window.location.search) {
      trackMarketingAttribution()
    }
  })
})
