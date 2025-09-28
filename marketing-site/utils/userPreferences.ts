/**
 * User Preference Detection Utilities for HeliconTrade
 * 
 * Automatically detects and sets user preferences for:
 * - Theme (light/dark) based on system preferences and time of day
 * - Language based on browser locale and location
 * - Timezone and region-specific settings
 */

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: string
  timezone: string
  region: string
  currency: string
  marketHours: {
    primary: string
    secondary?: string
  }
}

interface BrowserInfo {
  language: string
  languages: readonly string[]
  timezone: string
  colorScheme: 'light' | 'dark' | 'no-preference'
  reducedMotion: boolean
  cookiesEnabled: boolean
}

/**
 * Get comprehensive browser information for preference detection
 */
export function getBrowserInfo(): BrowserInfo {
  // Default fallbacks for SSR
  if (typeof window === 'undefined') {
    return {
      language: 'en',
      languages: ['en'],
      timezone: 'Europe/Stockholm',
      colorScheme: 'light',
      reducedMotion: false,
      cookiesEnabled: false
    }
  }

  // Detect color scheme preference
  let colorScheme: 'light' | 'dark' | 'no-preference' = 'light'
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorScheme = 'dark'
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    colorScheme = 'light'
  } else {
    colorScheme = 'no-preference'
  }

  // Detect reduced motion preference
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return {
    language: navigator.language || 'en',
    languages: navigator.languages || ['en'],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Stockholm',
    colorScheme,
    reducedMotion,
    cookiesEnabled: navigator.cookieEnabled
  }
}

/**
 * Detect optimal theme based on user preferences and context
 */
export function detectOptimalTheme(browserInfo?: BrowserInfo): 'light' | 'dark' {
  const info = browserInfo || getBrowserInfo()
  
  // Respect system preference if available
  if (info.colorScheme === 'dark') {
    return 'dark'
  } else if (info.colorScheme === 'light') {
    return 'light'
  }

  // Fallback to time-based detection for better UX
  const hour = new Date().getHours()
  
  // Use dark theme during evening/night hours
  if (hour >= 20 || hour <= 6) {
    return 'dark'
  }
  
  // Use light theme during day hours
  return 'light'
}

/**
 * Detect optimal language based on browser and location
 */
export function detectOptimalLanguage(browserInfo?: BrowserInfo, countryCode?: string): string {
  const info = browserInfo || getBrowserInfo()
  
  // Supported languages by HeliconTrade
  const supportedLanguages = ['en', 'fr', 'ar']
  
  // Check primary browser language
  const primaryLang = info.language.split('-')[0].toLowerCase()
  if (supportedLanguages.includes(primaryLang)) {
    return primaryLang
  }
  
  // Check all browser languages
  for (const lang of info.languages) {
    const langCode = lang.split('-')[0].toLowerCase()
    if (supportedLanguages.includes(langCode)) {
      return langCode
    }
  }
  
  // Regional language preferences based on location
  if (countryCode) {
    const regionalLanguageMap: Record<string, string> = {
      // French-speaking regions
      'FR': 'fr',
      'CA': 'fr', // Quebec primarily
      'CH': 'fr', // Swiss French regions
      'BE': 'fr', // Belgian French regions
      'MC': 'fr', // Monaco
      'LU': 'fr', // Luxembourg (multilingual)
      
      // Arabic-speaking regions
      'SA': 'ar', // Saudi Arabia
      'AE': 'ar', // UAE
      'EG': 'ar', // Egypt
      'JO': 'ar', // Jordan
      'LB': 'ar', // Lebanon
      'MA': 'ar', // Morocco
      'TN': 'ar', // Tunisia
      'DZ': 'ar', // Algeria
      'QA': 'ar', // Qatar
      'KW': 'ar', // Kuwait
      'BH': 'ar', // Bahrain
      'OM': 'ar', // Oman
      'IQ': 'ar', // Iraq
      'SY': 'ar', // Syria
      'YE': 'ar', // Yemen
      'LY': 'ar', // Libya
      'SD': 'ar', // Sudan
    }
    
    if (regionalLanguageMap[countryCode.toUpperCase()]) {
      return regionalLanguageMap[countryCode.toUpperCase()]
    }
  }
  
  // Default to English for global markets
  return 'en'
}

/**
 * Get region-specific market preferences
 */
export function getRegionalMarketPreferences(timezone: string, countryCode?: string): {
  primaryMarket: string
  currency: string
  marketHours: string
  indices: string[]
} {
  // Nordic/European markets
  if (timezone.includes('Stockholm') || timezone.includes('Helsinki') || timezone.includes('Oslo')) {
    return {
      primaryMarket: 'OMX',
      currency: 'SEK',
      marketHours: '09:00-17:30 CET',
      indices: ['OMXS30', 'OMXH25', 'OBX']
    }
  }
  
  // US markets
  if (timezone.includes('America/New_York') || timezone.includes('America/Chicago') || timezone.includes('America/Denver') || timezone.includes('America/Los_Angeles')) {
    return {
      primaryMarket: 'NYSE',
      currency: 'USD',
      marketHours: '09:30-16:00 EST',
      indices: ['SPY', 'QQQ', 'DIA', 'IWM']
    }
  }
  
  // UK markets
  if (timezone.includes('Europe/London')) {
    return {
      primaryMarket: 'LSE',
      currency: 'GBP',
      marketHours: '08:00-16:30 GMT',
      indices: ['FTSE', 'UKX']
    }
  }
  
  // European markets
  if (timezone.includes('Europe/Berlin') || timezone.includes('Europe/Paris') || timezone.includes('Europe/Amsterdam')) {
    return {
      primaryMarket: 'XETRA',
      currency: 'EUR',
      marketHours: '09:00-17:30 CET',
      indices: ['DAX', 'CAC', 'AEX']
    }
  }
  
  // Asian markets
  if (timezone.includes('Asia/Tokyo')) {
    return {
      primaryMarket: 'TSE',
      currency: 'JPY',
      marketHours: '09:00-15:00 JST',
      indices: ['N225', 'TOPIX']
    }
  }
  
  if (timezone.includes('Asia/Shanghai') || timezone.includes('Asia/Hong_Kong')) {
    return {
      primaryMarket: 'SSE',
      currency: 'CNY',
      marketHours: '09:30-15:00 CST',
      indices: ['SHCOMP', 'HSI']
    }
  }
  
  // Default to European (Swedish) market for international users
  return {
    primaryMarket: 'OMX',
    currency: 'SEK',
    marketHours: '09:00-17:30 CET',
    indices: ['OMXS30', 'SPY', 'QQQ']
  }
}

/**
 * Apply user preferences to the application
 */
export function applyUserPreferences(preferences: UserPreferences) {
  if (typeof window === 'undefined') return
  
  // Apply theme
  const html = document.documentElement
  if (preferences.theme === 'dark') {
    html.classList.add('dark')
  } else if (preferences.theme === 'light') {
    html.classList.remove('dark')
  }
  
  // Apply language to HTML lang attribute
  html.setAttribute('lang', preferences.language)
  
  // Store preferences in localStorage for persistence
  try {
    localStorage.setItem('helicon-user-preferences', JSON.stringify(preferences))
  } catch (error) {
    console.warn('Could not save user preferences:', error)
  }
}

/**
 * Load saved user preferences from localStorage
 */
export function loadSavedPreferences(): UserPreferences | null {
  if (typeof window === 'undefined') return null
  
  try {
    const saved = localStorage.getItem('helicon-user-preferences')
    if (saved) {
      return JSON.parse(saved) as UserPreferences
    }
  } catch (error) {
    console.warn('Could not load saved preferences:', error)
  }
  
  return null
}

/**
 * Auto-detect and apply optimal user preferences
 */
export function autoDetectAndApplyPreferences(countryCode?: string): UserPreferences {
  // First check for saved preferences
  const saved = loadSavedPreferences()
  if (saved) {
    applyUserPreferences(saved)
    return saved
  }
  
  // Auto-detect preferences
  const browserInfo = getBrowserInfo()
  const theme = detectOptimalTheme(browserInfo)
  const language = detectOptimalLanguage(browserInfo, countryCode)
  const marketPrefs = getRegionalMarketPreferences(browserInfo.timezone, countryCode)
  
  const preferences: UserPreferences = {
    theme,
    language,
    timezone: browserInfo.timezone,
    region: countryCode || 'SE',
    currency: marketPrefs.currency,
    marketHours: {
      primary: marketPrefs.marketHours,
      secondary: marketPrefs.primaryMarket !== 'NYSE' ? '09:30-16:00 EST' : undefined
    }
  }
  
  // Apply the detected preferences
  applyUserPreferences(preferences)
  
  return preferences
}

/**
 * Create reactive composable for user preferences
 */
export function useUserPreferences() {
  const preferences = ref<UserPreferences | null>(null)
  const isLoading = ref(true)
  
  const initializePreferences = async (countryCode?: string) => {
    isLoading.value = true
    
    try {
      preferences.value = autoDetectAndApplyPreferences(countryCode)
      
      // Listen for system theme changes
      if (typeof window !== 'undefined' && window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
        
        const handleThemeChange = (e: MediaQueryListEvent) => {
          if (preferences.value && preferences.value.theme === 'auto') {
            const newTheme = e.matches ? 'dark' : 'light'
            preferences.value = { ...preferences.value, theme: newTheme }
            applyUserPreferences(preferences.value)
          }
        }
        
        // Modern browsers
        if (darkModeQuery.addEventListener) {
          darkModeQuery.addEventListener('change', handleThemeChange)
        }
        // Legacy browsers
        else if (darkModeQuery.addListener) {
          darkModeQuery.addListener(handleThemeChange)
        }
      }
      
    } catch (error) {
      console.error('Failed to initialize user preferences:', error)
      
      // Fallback preferences
      preferences.value = {
        theme: 'light',
        language: 'en',
        timezone: 'Europe/Stockholm',
        region: 'SE',
        currency: 'SEK',
        marketHours: {
          primary: '09:00-17:30 CET'
        }
      }
    }
    
    isLoading.value = false
  }
  
  const updatePreferences = (updates: Partial<UserPreferences>) => {
    if (preferences.value) {
      preferences.value = { ...preferences.value, ...updates }
      applyUserPreferences(preferences.value)
    }
  }
  
  return {
    preferences: readonly(preferences),
    isLoading: readonly(isLoading),
    initializePreferences,
    updatePreferences
  }
}