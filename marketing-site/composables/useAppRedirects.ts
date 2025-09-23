// Centralized app redirect utilities
export const useAppRedirects = () => {
  const config = useRuntimeConfig()
  
  // Get the correct app URL for current environment
  const getAppUrl = () => {
    // Force localhost:5174 for development since that's where the Vue app is running
    if (process.env.NODE_ENV !== 'production') {
      return 'http://localhost:5174'
    }
    return config.public.appUrl
  }
  
  // Redirect to login page
  const redirectToLogin = () => {
    window.location.href = `${getAppUrl()}/login`
  }
  
  // Redirect to register page
  const redirectToRegister = () => {
    window.location.href = `${getAppUrl()}/register`
  }
  
  // Redirect to app (register by default)
  const redirectToApp = () => {
    window.location.href = `${getAppUrl()}/register`
  }
  
  // Start trading (register)
  const startTrading = () => {
    window.location.href = `${getAppUrl()}/register`
  }
  
  return {
    getAppUrl,
    redirectToLogin,
    redirectToRegister,
    redirectToApp,
    startTrading
  }
}
