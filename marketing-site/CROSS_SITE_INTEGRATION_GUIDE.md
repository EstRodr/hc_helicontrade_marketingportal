# 🔗 Cross-Site Integration Guide - Marketing ↔ App

## 🎯 **Overview**

Complete guide for seamlessly connecting the marketing site (`http://helicontrade.local:3002`) with the main app (`http://localhost:5173`) including shared language, theme settings, and environment configuration.

---

## 🚀 **App Routes Integration**

### **Current URLs to Connect**
- **Marketing Site:** `http://helicontrade.local:3002` (Nuxt)
- **Main App:** `http://localhost:5173` (likely Vite/React/Vue)

### **Target Integration Points**
```typescript
// Marketing site should link to:
- Login: http://localhost:5173/login
- Register: http://localhost:5173/register  
- Dashboard: http://localhost:5173/dashboard
- App Home: http://localhost:5173/

// App should link back to:
- Marketing Home: http://helicontrade.local:3002/
- About: http://helicontrade.local:3002/about
- Pricing: http://helicontrade.local:3002/pricing
```

### **Environment Configuration**

#### **Update nuxt.config.ts**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      // App URLs - Dynamic based on environment
      appUrl: process.env.NUXT_PUBLIC_APP_URL || (isProduction ? 'https://app.helicontrade.com' : 'http://localhost:5173'),
      
      // Existing config...
      apiBase: process.env.NUXT_PUBLIC_API_BASE || (isProduction ? 'https://api.helicontrade.com' : 'http://api.helicontrade.local:8000'),
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || (isProduction ? 'https://helicontrade.com' : 'http://helicontrade.local:3002'),
    }
  }
})
```

#### **Update .env file**
```bash
# Cross-site Integration URLs
NUXT_PUBLIC_APP_URL=http://localhost:5173
NUXT_PUBLIC_MARKETING_URL=http://helicontrade.local:3002

# Production URLs (for reference)
# NUXT_PUBLIC_APP_URL=https://app.helicontrade.com  
# NUXT_PUBLIC_MARKETING_URL=https://helicontrade.com
```

---

## 🎨 **Shared Settings Implementation**

### **1. Shared Language Preferences**

#### **Create Shared Settings Composable**
```typescript
// composables/useSharedSettings.ts
export const useSharedSettings = () => {
  const STORAGE_KEY = 'helicontrade-shared-settings'
  
  // Get shared settings from localStorage
  const getSharedSettings = () => {
    if (typeof window === 'undefined') return null
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.warn('Failed to read shared settings:', error)
      return null
    }
  }
  
  // Save shared settings to localStorage
  const setSharedSettings = (settings: {
    language?: string
    theme?: 'light' | 'dark' | 'system'
    country?: string
    currency?: string
  }) => {
    if (typeof window === 'undefined') return
    
    try {
      const existing = getSharedSettings() || {}
      const updated = { ...existing, ...settings, lastUpdated: new Date().toISOString() }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      
      // Broadcast change to other tabs/windows
      window.dispatchEvent(new CustomEvent('helicontrade-settings-changed', { 
        detail: updated 
      }))
      
      console.log('✅ Shared settings updated:', updated)
    } catch (error) {
      console.warn('Failed to save shared settings:', error)
    }
  }
  
  // Listen for settings changes from other sites
  const onSettingsChanged = (callback: (settings: any) => void) => {
    if (typeof window === 'undefined') return
    
    const handler = (event: CustomEvent) => {
      callback(event.detail)
    }
    
    window.addEventListener('helicontrade-settings-changed', handler as EventListener)
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          callback(JSON.parse(e.newValue))
        } catch (error) {
          console.warn('Failed to parse settings from storage event:', error)
        }
      }
    })
    
    // Cleanup function
    return () => {
      window.removeEventListener('helicontrade-settings-changed', handler as EventListener)
    }
  }
  
  return {
    getSharedSettings,
    setSharedSettings,
    onSettingsChanged
  }
}
```

#### **Update i18n Integration**
```typescript
// plugins/shared-settings.client.ts
export default defineNuxtPlugin(() => {
  const { locale } = useI18n()
  const { setColorMode } = useColorMode()
  const { getSharedSettings, setSharedSettings, onSettingsChanged } = useSharedSettings()
  
  // Load shared settings on startup
  const sharedSettings = getSharedSettings()
  if (sharedSettings) {
    if (sharedSettings.language && sharedSettings.language !== locale.value) {
      console.log('🌍 Loading shared language:', sharedSettings.language)
      navigateTo(switchLocalePath(sharedSettings.language))
    }
    
    if (sharedSettings.theme) {
      console.log('🎨 Loading shared theme:', sharedSettings.theme)
      setColorMode(sharedSettings.theme)
    }
  }
  
  // Listen for settings changes from app
  onSettingsChanged((settings) => {
    console.log('🔄 Settings changed from other site:', settings)
    
    if (settings.language && settings.language !== locale.value) {
      navigateTo(switchLocalePath(settings.language))
    }
    
    if (settings.theme) {
      setColorMode(settings.theme)
    }
  })
  
  // Save settings when they change on marketing site
  watch(locale, (newLocale) => {
    setSharedSettings({ language: newLocale })
  })
  
  const colorMode = useColorMode()
  watch(colorMode.preference, (newTheme) => {
    setSharedSettings({ theme: newTheme })
  })
})
```

---

## 🔗 **Navigation Integration**

### **Create App Navigation Composable**
```typescript
// composables/useAppNavigation.ts
export const useAppNavigation = () => {
  const config = useRuntimeConfig()
  
  const getAppUrl = (path = '') => {
    const baseUrl = config.public.appUrl
    return `${baseUrl}${path}`
  }
  
  const navigateToApp = (path = '', options = {}) => {
    const url = getAppUrl(path)
    const { newTab = false, preserveSettings = true } = options
    
    // Preserve current settings when navigating to app
    if (preserveSettings) {
      const { setSharedSettings } = useSharedSettings()
      const { locale } = useI18n()
      const { preference } = useColorMode()
      const { userContext } = usePersonalization()
      
      setSharedSettings({
        language: locale.value,
        theme: preference.value,
        country: userContext?.location?.country,
        currency: userContext?.location?.currency
      })
    }
    
    if (newTab) {
      window.open(url, '_blank')
    } else {
      window.location.href = url
    }
  }
  
  return {
    getAppUrl,
    navigateToApp
  }
}
```

### **Update Marketing Site Components**

#### **Header Navigation**
```vue
<!-- components/AppHeader.vue -->
<template>
  <header class="bg-white dark:bg-gray-900">
    <nav class="container mx-auto flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <img src="/logo.svg" alt="HeliconTrade" class="h-8 w-8">
        <span class="ml-2 text-xl font-bold">HeliconTrade</span>
      </NuxtLink>
      
      <!-- Marketing Navigation -->
      <div class="hidden md:flex space-x-6">
        <NuxtLink to="/about">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink to="/features">{{ t('nav.features') }}</NuxtLink>  
        <NuxtLink to="/pricing">{{ t('nav.pricing') }}</NuxtLink>
        <NuxtLink to="/contact">{{ t('nav.contact') }}</NuxtLink>
      </div>
      
      <!-- App Actions -->
      <div class="flex items-center space-x-4">
        <!-- Language Selector -->
        <LanguageSelector />
        
        <!-- Theme Toggle -->
        <ThemeToggle />
        
        <!-- App Links -->
        <button @click="navigateToApp('/login')" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          {{ t('nav.login') }}
        </button>
        
        <button @click="navigateToApp('/register')" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          {{ t('nav.getStarted') }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
const { t } = useI18n()
const { navigateToApp } = useAppNavigation()
</script>
```

#### **CTA Buttons**
```vue
<!-- components/CTAButton.vue -->
<template>
  <button 
    @click="handleClick"
    :class="buttonClasses"
    class="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg transition-colors"
  >
    <slot>{{ t('cta.getStarted') }}</slot>
    <ArrowRightIcon v-if="showArrow" class="ml-2 h-5 w-5" />
  </button>
</template>

<script setup>
interface Props {
  variant?: 'primary' | 'secondary'
  action?: 'register' | 'login' | 'demo'
  showArrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  action: 'register',
  showArrow: true
})

const { t } = useI18n()
const { navigateToApp } = useAppNavigation()

const buttonClasses = computed(() => {
  return props.variant === 'primary' 
    ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
})

const handleClick = () => {
  const routes = {
    register: '/register',
    login: '/login', 
    demo: '/demo'
  }
  
  navigateToApp(routes[props.action])
}
</script>
```

---

## 🎛️ **Theme Synchronization**

### **Enhanced Theme Toggle Component**
```vue
<!-- components/ThemeToggle.vue -->
<template>
  <button
    @click="cycleTheme"
    class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    :title="t('theme.toggle')"
  >
    <SunIcon v-if="colorMode.value === 'light'" class="h-5 w-5" />
    <MoonIcon v-else-if="colorMode.value === 'dark'" class="h-5 w-5" />
    <ComputerDesktopIcon v-else class="h-5 w-5" />
  </button>
</template>

<script setup>
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline'

const { t } = useI18n()
const colorMode = useColorMode()
const { setSharedSettings } = useSharedSettings()

const cycleTheme = () => {
  const themes = ['light', 'dark', 'system']
  const currentIndex = themes.indexOf(colorMode.preference)
  const nextTheme = themes[(currentIndex + 1) % themes.length]
  
  colorMode.preference = nextTheme
  
  // Save to shared settings
  setSharedSettings({ theme: nextTheme })
  
  console.log('🎨 Theme changed to:', nextTheme)
}
</script>
```

---

## 🔄 **Data Synchronization**

### **User Context Sharing**
```typescript
// composables/useUserSync.ts
export const useUserSync = () => {
  const { userContext } = usePersonalization()
  const { setSharedSettings } = useSharedSettings()
  
  // Sync user data to shared settings
  const syncUserData = () => {
    if (!userContext?.location) return
    
    const userData = {
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
  
  // Watch for user context changes
  watch(() => userContext?.location, syncUserData, { deep: true })
  
  return {
    syncUserData
  }
}
```

---

## 📱 **Mobile Deep Linking**

### **App Install Detection & Deep Links**
```typescript
// composables/useAppDetection.ts
export const useAppDetection = () => {
  const isAppInstalled = ref(false)
  const showAppPrompt = ref(false)
  
  const checkAppInstall = async () => {
    // Check if running in mobile app context
    const isInApp = window.navigator.userAgent.includes('HeliconTradeApp')
    
    if (isInApp) {
      isAppInstalled.value = true
      return true
    }
    
    // Check if PWA is installed
    if ('getInstalledRelatedApps' in navigator) {
      try {
        const relatedApps = await (navigator as any).getInstalledRelatedApps()
        isAppInstalled.value = relatedApps.length > 0
      } catch (error) {
        console.warn('Could not check for installed apps:', error)
      }
    }
    
    return isAppInstalled.value
  }
  
  const openInApp = (path = '') => {
    // Try deep link first
    const deepLink = `helicontrade://app${path}`
    window.location.href = deepLink
    
    // Fallback to web app after delay
    setTimeout(() => {
      const { navigateToApp } = useAppNavigation()
      navigateToApp(path)
    }, 1500)
  }
  
  const showInstallPrompt = () => {
    showAppPrompt.value = true
  }
  
  return {
    isAppInstalled,
    showAppPrompt,
    checkAppInstall,
    openInApp,
    showInstallPrompt
  }
}
```

---

## 🧪 **Testing Integration**

### **Cross-Site Testing Checklist**

#### **Navigation Testing**
- [ ] Marketing → App login works correctly
- [ ] Marketing → App register works correctly  
- [ ] URLs resolve correctly in dev/prod
- [ ] New tab links work properly

#### **Settings Sync Testing**
- [ ] Language changes sync between sites
- [ ] Theme changes sync between sites
- [ ] Settings persist after page reload
- [ ] Multiple tabs stay in sync

#### **Data Flow Testing**
- [ ] User location data syncs correctly
- [ ] Personalization context transfers
- [ ] No data loss during navigation
- [ ] Error handling works properly

---

## 🚀 **Deployment Configuration**

### **Environment-Specific URLs**

#### **Development**
```bash
# .env.development
NUXT_PUBLIC_APP_URL=http://localhost:5173
NUXT_PUBLIC_MARKETING_URL=http://helicontrade.local:3002
```

#### **Staging**
```bash
# .env.staging  
NUXT_PUBLIC_APP_URL=https://app-staging.helicontrade.com
NUXT_PUBLIC_MARKETING_URL=https://marketing-staging.helicontrade.com
```

#### **Production**
```bash
# .env.production
NUXT_PUBLIC_APP_URL=https://app.helicontrade.com
NUXT_PUBLIC_MARKETING_URL=https://helicontrade.com
```

---

## 📊 **Analytics Integration**

### **Cross-Site Event Tracking**
```typescript
// Track user journey across sites
const trackCrossSiteNavigation = (destination: string, source = 'marketing') => {
  // PostHog tracking
  if (window.posthog) {
    window.posthog.capture('cross_site_navigation', {
      destination,
      source,
      user_country: userContext?.location?.country,
      personalization_variant: variant?.value,
      timestamp: new Date().toISOString()
    })
  }
  
  // GTM tracking
  if (window.gtag) {
    window.gtag('event', 'cross_site_navigation', {
      destination,
      source,
      custom_parameter_1: userContext?.location?.country
    })
  }
}
```

This integration ensures seamless user experience between your marketing site and main app with shared preferences and proper environment configuration! 🎯