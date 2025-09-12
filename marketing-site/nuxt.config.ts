// @ts-nocheck
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  
  // Local development configuration
  devServer: {
    port: 3002,
    host: 'helicontrade.local'
  },
  
  // Import modules
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss'
    // '@nuxtjs/i18n' // Temporarily disabled for testing
  ],
  
  // Color mode configuration
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'helicontrade-color-mode',
    componentName: 'ColorScheme',
    dataValue: 'theme'
  },
  
  // Internationalization configuration
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
    ],
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'helicontrade-i18n-locale',
      redirectOn: 'root',
      alwaysRedirect: false
    }
  },
  
  app: {
    head: {
      title: 'HeliconTrade — Learn & Trade',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Gen‑Z financial education and trading platform.' },
        { name: 'keywords', content: 'trading, finance, education, crypto, stocks, investment' },
        { name: 'author', content: 'HeliconTrade' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'HeliconTrade — Learn & Trade' },
        { property: 'og:description', content: 'Gen‑Z financial education and trading platform.' },
        { property: 'og:url', content: 'https://helicontrade.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'HeliconTrade — Learn & Trade' },
        { name: 'twitter:description', content: 'Gen‑Z financial education and trading platform.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: process.env.NUXT_PUBLIC_SITE_URL || 'http://helicontrade.local:3002' }
      ],
    },
  },
  
  css: [
    '@/assets/css/base.css',
  ],
  
  runtimeConfig: {
    public: {
      // Local development URLs
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://app.helicontrade.local:5173',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://api.helicontrade.local:8000',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://helicontrade.local:3002',
      cmsBase: process.env.NUXT_PUBLIC_CMS_BASE || 'http://cms.helicontrade.local:1337',
      
      // Analytics configuration
      gaMeasurementId: process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID,
      posthogPublicKey: process.env.NUXT_PUBLIC_POSTHOG_PUBLIC_KEY,
      posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      posthogRecordingEnabled: process.env.NUXT_PUBLIC_POSTHOG_RECORDING === 'true',
      
      // Strapi CMS configuration
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://cms.helicontrade.local:1337',
      strapiToken: process.env.NUXT_PUBLIC_STRAPI_TOKEN,
    },
  },
  
  nitro: {
    preset: 'node-server',
    // Silence Nitro warning and lock features for this date
    compatibilityDate: '2025-08-26',
  }
})
