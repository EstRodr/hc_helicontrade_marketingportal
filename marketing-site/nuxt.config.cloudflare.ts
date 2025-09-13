// @ts-nocheck
// Cloudflare Pages specific configuration
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // Disable SSR for static generation
  ssr: false,
  
  devtools: { enabled: false },
  
  // Local development configuration - not used in CF but kept for consistency
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
        { rel: 'canonical', href: 'https://helicontrade-marketing-portal.pages.dev' }
      ],
    },
  },
  
  css: [
    '@/assets/css/base.css',
  ],
  
  runtimeConfig: {
    public: {
      // Production URLs for Cloudflare deployment
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'https://app.helicontrade.com',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.helicontrade.com',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://helicontrade-marketing-portal.pages.dev',
      cmsBase: process.env.NUXT_PUBLIC_CMS_BASE || 'https://cms.helicontrade.com',
      
      // Analytics configuration
      gaMeasurementId: process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID,
      posthogPublicKey: process.env.NUXT_PUBLIC_POSTHOG_PUBLIC_KEY,
      posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      posthogRecordingEnabled: process.env.NUXT_PUBLIC_POSTHOG_RECORDING === 'true',
      
      // Strapi CMS configuration
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'https://cms.helicontrade.com',
      strapiToken: process.env.NUXT_PUBLIC_STRAPI_TOKEN,
    },
  },
  
  nitro: {
    preset: 'cloudflare-pages',
    // Silence Nitro warning and lock features for this date
    compatibilityDate: '2025-08-26',
  }
})