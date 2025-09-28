/**
 * Shared Settings Composable
 * 
 * Manages language, theme, and user preferences that sync between 
 * marketing site and main app using localStorage and events.
 */

interface SharedSettings {
  language?: string
  theme?: 'light' | 'dark' | 'system'
  country?: string
  countryCode?: string
  city?: string
  currency?: string
  timezone?: string
  primaryIndex?: string
  lastUpdated?: string
}

export const useSharedSettings = () => {
  const STORAGE_KEY = 'helicontrade-shared-settings'
  
  /**
   * Get shared settings from localStorage
   */
  const getSharedSettings = (): SharedSettings | null => {
    if (typeof window === 'undefined') return null
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.warn('🚨 Failed to read shared settings:', error)
      return null
    }
  }
  
  /**
   * Save shared settings to localStorage and broadcast to other tabs/sites
   */
  const setSharedSettings = (settings: Partial<SharedSettings>) => {
    if (typeof window === 'undefined') return
    
    try {
      const existing = getSharedSettings() || {}
      const updated: SharedSettings = { 
        ...existing, 
        ...settings, 
        lastUpdated: new Date().toISOString() 
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      
      // Broadcast change to other tabs/windows
      window.dispatchEvent(new CustomEvent('helicontrade-settings-changed', { 
        detail: updated 
      }))
      
      console.log('✅ Shared settings updated:', updated)
    } catch (error) {
      console.warn('🚨 Failed to save shared settings:', error)
    }
  }
  
  /**
   * Listen for settings changes from other sites/tabs
   */
  const onSettingsChanged = (callback: (settings: SharedSettings) => void) => {
    if (typeof window === 'undefined') return () => {}
    
    const customEventHandler = (event: CustomEvent<SharedSettings>) => {
      callback(event.detail)
    }
    
    const storageEventHandler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const settings = JSON.parse(e.newValue)
          callback(settings)
        } catch (error) {
          console.warn('🚨 Failed to parse settings from storage event:', error)
        }
      }
    }
    
    // Listen for custom events (same-origin)
    window.addEventListener('helicontrade-settings-changed', customEventHandler as EventListener)
    
    // Listen for storage events (cross-tab)
    window.addEventListener('storage', storageEventHandler)
    
    // Cleanup function
    return () => {
      window.removeEventListener('helicontrade-settings-changed', customEventHandler as EventListener)
      window.removeEventListener('storage', storageEventHandler)
    }
  }
  
  /**
   * Sync current personalization context to shared settings
   */
  const syncPersonalizationToShared = (userContext: any) => {
    if (!userContext?.location) return
    
    const userData: Partial<SharedSettings> = {
      country: userContext.location.country,
      countryCode: userContext.location.countryCode,
      city: userContext.location.city,
      currency: userContext.location.currency,
      timezone: userContext.location.timezone,
      primaryIndex: userContext.market?.localIndices?.[0]
    }
    
    setSharedSettings(userData)
    console.log('👤 User data synced to shared settings:', userData)
  }
  
  /**
   * Get shared settings for a specific key
   */
  const getSharedSetting = <K extends keyof SharedSettings>(key: K): SharedSettings[K] | null => {
    const settings = getSharedSettings()
    return settings?.[key] ?? null
  }
  
  /**
   * Set a single shared setting
   */
  const setSharedSetting = <K extends keyof SharedSettings>(key: K, value: SharedSettings[K]) => {
    setSharedSettings({ [key]: value })
  }
  
  /**
   * Clear all shared settings (useful for logout)
   */
  const clearSharedSettings = () => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.removeItem(STORAGE_KEY)
      
      // Broadcast clear event
      window.dispatchEvent(new CustomEvent('helicontrade-settings-changed', { 
        detail: {} 
      }))
      
      console.log('🧹 Shared settings cleared')
    } catch (error) {
      console.warn('🚨 Failed to clear shared settings:', error)
    }
  }
  
  return {
    getSharedSettings,
    setSharedSettings,
    onSettingsChanged,
    syncPersonalizationToShared,
    getSharedSetting,
    setSharedSetting,
    clearSharedSettings
  }
}