/**
 * App Navigation Composable
 * 
 * Handles navigation between marketing site and main app,
 * preserving user settings and context across sites.
 */

interface NavigationOptions {
  newTab?: boolean
  preserveSettings?: boolean
  trackEvent?: boolean
}

export const useAppNavigation = () => {
  const config = useRuntimeConfig()
  const { locale } = useI18n()
  const colorMode = useColorMode()
  
  /**
   * Get the app URL with optional path
   */
  const getAppUrl = (path = '') => {
    const baseUrl = config.public.appUrl || 'http://localhost:5173'
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${normalizedPath}`
  }
  
  /**
   * Get the marketing site URL with optional path
   */
  const getMarketingUrl = (path = '') => {
    const baseUrl = config.public.siteUrl || 'http://helicontrade.local:3002'
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${normalizedPath}`
  }
  
  /**
   * Navigate to the main app with settings preservation
   */
  const navigateToApp = async (path = '', options: NavigationOptions = {}) => {
    const { 
      newTab = false, 
      preserveSettings = true, 
      trackEvent = true 
    } = options
    
    const url = getAppUrl(path)
    
    // Preserve current settings when navigating to app
    if (preserveSettings) {
      await preserveCurrentSettings()
    }
    
    // Track navigation event
    if (trackEvent) {
      trackCrossSiteNavigation(url, 'marketing-to-app')
    }
    
    console.log(`🔗 Navigating to app: ${url}`)
    
    if (newTab) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = url
    }
  }
  
  /**
   * Navigate back to marketing site (useful for app → marketing links)
   */
  const navigateToMarketing = (path = '', options: NavigationOptions = {}) => {
    const { 
      newTab = false, 
      preserveSettings = true, 
      trackEvent = true 
    } = options
    
    const url = getMarketingUrl(path)
    
    // Preserve settings when navigating back
    if (preserveSettings) {
      preserveCurrentSettings()
    }
    
    // Track navigation event
    if (trackEvent) {
      trackCrossSiteNavigation(url, 'app-to-marketing')
    }
    
    console.log(`🔗 Navigating to marketing: ${url}`)
    
    if (newTab) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = url
    }
  }
  
  /**
   * Preserve current settings to shared storage
   */
  const preserveCurrentSettings = async () => {
    try {
      const { setSharedSettings } = useSharedSettings()
      const { userContext } = usePersonalization()
      
      const settingsToShare = {
        language: locale.value,
        theme: colorMode.preference,
        country: userContext?.location?.country,
        countryCode: userContext?.location?.countryCode,
        city: userContext?.location?.city,
        currency: userContext?.location?.currency,
        timezone: userContext?.location?.timezone,
        primaryIndex: userContext?.market?.localIndices?.[0]
      }
      
      setSharedSettings(settingsToShare)
      
      console.log('💾 Settings preserved for cross-site navigation:', settingsToShare)
    } catch (error) {
      console.warn('⚠️ Failed to preserve settings:', error)
    }
  }
  
  /**
   * Track cross-site navigation events
   */
  const trackCrossSiteNavigation = (destination: string, source: string) => {
    try {
      // PostHog tracking
      if (typeof window !== 'undefined' && (window as any).posthog) {
        const posthog = (window as any).posthog
        const { userContext } = usePersonalization()
        
        posthog.capture('cross_site_navigation', {
          destination,
          source,
          user_country: userContext?.location?.country,
          user_city: userContext?.location?.city,
          current_language: locale.value,
          current_theme: colorMode.preference,
          timestamp: new Date().toISOString()
        })
      }
      
      // GTM tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'cross_site_navigation', {
          destination,
          source,
          custom_parameter_1: locale.value
        })
      }
    } catch (error) {
      console.warn('⚠️ Failed to track navigation:', error)
    }
  }
  
  /**
   * Common app routes with proper paths
   */
  const appRoutes = {
    home: '/',
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',
    profile: '/profile',
    settings: '/settings',
    demo: '/demo',
    onboarding: '/onboarding'
  }
  
  /**
   * Common marketing routes  
   */
  const marketingRoutes = {
    home: '/',
    about: '/about',
    features: '/features',
    pricing: '/pricing',
    contact: '/contact',
    blog: '/blog',
    privacy: '/privacy',
    terms: '/terms'
  }
  
  /**
   * Quick navigation helpers
   */
  const goToLogin = (options?: NavigationOptions) => navigateToApp(appRoutes.login, options)
  const goToRegister = (options?: NavigationOptions) => navigateToApp(appRoutes.register, options)
  const goToDashboard = (options?: NavigationOptions) => navigateToApp(appRoutes.dashboard, options)
  const goToDemo = (options?: NavigationOptions) => navigateToApp(appRoutes.demo, options)
  
  /**
   * Check if current site is the marketing site
   */
  const isMarketingSite = computed(() => {
    if (typeof window === 'undefined') return true
    return window.location.origin === getMarketingUrl().replace(/\/$/, '')
  })
  
  /**
   * Check if current site is the app
   */
  const isAppSite = computed(() => {
    if (typeof window === 'undefined') return false
    return window.location.origin === getAppUrl().replace(/\/$/, '')
  })
  
  /**
   * Get environment info for debugging
   */
  const getEnvironmentInfo = () => {
    return {
      appUrl: config.public.appUrl,
      siteUrl: config.public.siteUrl,
      apiBase: config.public.apiBase,
      environment: process.env.NODE_ENV,
      isMarketingSite: isMarketingSite.value,
      isAppSite: isAppSite.value
    }
  }
  
  return {
    // URLs
    getAppUrl,
    getMarketingUrl,
    
    // Navigation functions
    navigateToApp,
    navigateToMarketing,
    
    // Quick navigation
    goToLogin,
    goToRegister, 
    goToDashboard,
    goToDemo,
    
    // Route constants
    appRoutes,
    marketingRoutes,
    
    // State
    isMarketingSite,
    isAppSite,
    
    // Utils
    preserveCurrentSettings,
    trackCrossSiteNavigation,
    getEnvironmentInfo
  }
}