// Minimal declaration so this shared module can reference Nuxt composable in Nuxt apps
// without requiring Nuxt types in non-Nuxt contexts.
declare function useRuntimeConfig(): any
/**
 * Shared Authentication Utilities for HeliconTrade
 * 
 * This module provides cross-domain authentication utilities that work
 * between the marketing site (helicontrade.local) and the trading app
 * (app.helicontrade.local).
 */

export interface AuthToken {
  token: string
  refreshToken?: string
  expiresAt: number
  user?: {
    id: string
    email: string
    name: string
    plan: string
  }
}

// Cookie/Storage Keys
const AUTH_TOKEN_KEY = 'helicontrade_auth_token'
const AUTH_USER_KEY = 'helicontrade_auth_user'
const MARKETING_ATTRIBUTION_KEY = 'helicontrade_marketing_attribution'

/**
 * Store authentication token (simulates cross-domain for local development)
 */
export function setAuthToken(authData: AuthToken): void {
  try {
    // For local development, store in localStorage to simulate cross-domain sharing
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(authData))
    
    // Also set as regular cookie for same-origin requests
    const expires = new Date(authData.expiresAt).toUTCString()
    document.cookie = `auth_token=${authData.token}; path=/; expires=${expires}; SameSite=Strict; Secure`
    
    if (authData.user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authData.user))
    }
  } catch (error) {
    console.error('Failed to store auth token:', error)
  }
}

/**
 * Retrieve authentication token
 */
export function getAuthToken(): AuthToken | null {
  try {
    // Try localStorage first (simulates cross-domain)
    const stored = localStorage.getItem(AUTH_TOKEN_KEY)
    if (stored) {
      const authData = JSON.parse(stored) as AuthToken
      
      // Check if token is expired
      if (authData.expiresAt > Date.now()) {
        return authData
      } else {
        // Token expired, clean up
        clearAuthToken()
        return null
      }
    }
    
    // Fallback to cookie
    const cookieValue = getCookieValue('auth_token')
    if (cookieValue) {
      return {
        token: cookieValue,
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // Assume 24 hours if no expiry
      }
    }
    
    return null
  } catch (error) {
    console.error('Failed to retrieve auth token:', error)
    return null
  }
}

/**
 * Get user information
 */
export function getAuthUser(): AuthToken['user'] | null {
  try {
    const stored = localStorage.getItem(AUTH_USER_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Failed to retrieve user data:', error)
    return null
  }
}

/**
 * Clear authentication data
 */
export function clearAuthToken(): void {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    
    // Clear cookie
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  } catch (error) {
    console.error('Failed to clear auth token:', error)
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAuthToken()
  return token !== null && token.expiresAt > Date.now()
}

/**
 * Store marketing attribution data
 */
export function setMarketingAttribution(data: Record<string, any>): void {
  try {
    localStorage.setItem(MARKETING_ATTRIBUTION_KEY, JSON.stringify({
      ...data,
      timestamp: Date.now()
    }))
  } catch (error) {
    console.error('Failed to store marketing attribution:', error)
  }
}

/**
 * Get marketing attribution data
 */
export function getMarketingAttribution(): Record<string, any> | null {
  try {
    const stored = localStorage.getItem(MARKETING_ATTRIBUTION_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Failed to retrieve marketing attribution:', error)
    return null
  }
}

/**
 * Clear marketing attribution data
 */
export function clearMarketingAttribution(): void {
  try {
    localStorage.removeItem(MARKETING_ATTRIBUTION_KEY)
  } catch (error) {
    console.error('Failed to clear marketing attribution:', error)
  }
}

/**
 * Extract marketing parameters from URL
 */
export function extractMarketingParams(url: string = window.location.href): Record<string, string> {
  const urlObj = new URL(url)
  const params: Record<string, string> = {}
  
  // UTM parameters
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  utmParams.forEach(param => {
    const value = urlObj.searchParams.get(param)
    if (value) params[param] = value
  })
  
  // Other tracking parameters
  const trackingParams = ['ref', 'referral', 'affiliate', 'channel', 'gclid', 'fbclid']
  trackingParams.forEach(param => {
    const value = urlObj.searchParams.get(param)
    if (value) params[param] = value
  })
  
  return params
}

/**
 * Utility to get cookie value by name
 */
export function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

/**
 * Redirect to login with current page as return URL
 */
export function redirectToLogin(currentUrl?: string): void {
  const config = useRuntimeConfig()
  const returnUrl = currentUrl || window.location.href
  
  // Store marketing attribution before redirect
  const marketingParams = extractMarketingParams()
  if (Object.keys(marketingParams).length > 0) {
    setMarketingAttribution(marketingParams)
  }
  
  const loginUrl = new URL(`${config.public.appUrl}/auth/login`)
  loginUrl.searchParams.set('return', returnUrl)
  
  window.location.href = loginUrl.toString()
}

/**
 * Redirect to registration with marketing attribution
 */
export function redirectToRegister(currentUrl?: string): void {
  const config = useRuntimeConfig()
  const returnUrl = currentUrl || window.location.href
  
  // Store marketing attribution before redirect
  const marketingParams = extractMarketingParams()
  if (Object.keys(marketingParams).length > 0) {
    setMarketingAttribution(marketingParams)
  }
  
  const registerUrl = new URL(`${config.public.appUrl}/auth/register`)
  registerUrl.searchParams.set('return', returnUrl)
  
  // Pass through any referral codes or UTM parameters
  Object.entries(marketingParams).forEach(([key, value]) => {
    registerUrl.searchParams.set(key, value)
  })
  
  window.location.href = registerUrl.toString()
}

/**
 * Handle authentication callback (for app domain)
 */
export function handleAuthCallback(tokenData: AuthToken): void {
  // Store the token
  setAuthToken(tokenData)
  
  // Process any marketing attribution
  const marketingData = getMarketingAttribution()
  if (marketingData) {
    // Send attribution data to analytics/backend
    console.log('Processing marketing attribution:', marketingData)
    // You would send this to your analytics service here
    
    // Clear after processing
    clearMarketingAttribution()
  }
  
  // Redirect to dashboard or return URL
  const urlParams = new URLSearchParams(window.location.search)
  const returnUrl = urlParams.get('return')
  
  if (returnUrl && returnUrl.startsWith(window.location.origin)) {
    window.location.href = returnUrl
  } else {
    window.location.href = '/dashboard'
  }
}

/**
 * Logout user and redirect to marketing site
 */
export function logout(): void {
  clearAuthToken()
  clearMarketingAttribution()
  
  const config = useRuntimeConfig()
  window.location.href = config.public.siteUrl || 'http://helicontrade.local:3002'
}
