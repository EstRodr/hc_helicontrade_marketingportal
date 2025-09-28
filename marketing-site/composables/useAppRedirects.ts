// Centralized app redirect utilities
export const useAppRedirects = () => {
  const config = useRuntimeConfig()
  const { locale } = useI18n()
  const colorMode = useColorMode()
  
  // Get the correct app URL for current environment
  const getAppUrl = () => {
    // Force localhost:5174 for development since that's where the Vue app is running
    if (config.public.appUrl.includes('localhost')) {
      return 'http://localhost:5174'
    }
    return config.public.appUrl
  }
  
  // Build URL with theme and language parameters
  const buildAppUrl = (path: string) => {
    const baseUrl = `${getAppUrl()}${path}`
    const params = new URLSearchParams()
    
    // Add current language
    if (locale.value && locale.value !== 'en') {
      params.set('lang', locale.value)
    }
    
    // Add current theme
    if (colorMode.value && colorMode.value !== 'system') {
      params.set('theme', colorMode.value)
    }
    
    const queryString = params.toString()
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  }
  
  // Redirect to login page
  const redirectToLogin = () => {
    window.location.href = buildAppUrl('/login')
  }
  
  // Redirect to register page
  const redirectToRegister = () => {
    window.location.href = buildAppUrl('/register')
  }
  
  // Redirect to app (register by default)
  const redirectToApp = () => {
    window.location.href = buildAppUrl('/register')
  }
  
  // Start trading (register)
  const startTrading = () => {
    window.location.href = buildAppUrl('/register')
  }
  
  return {
    getAppUrl,
    redirectToLogin,
    redirectToRegister,
    redirectToApp,
    startTrading
  }
}
