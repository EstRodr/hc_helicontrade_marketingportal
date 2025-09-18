// Personalization Configuration System
// This file centralizes all personalization settings for easy management

export interface PersonalizationConfig {
  // Feature Flags
  features: {
    personalization: boolean
    smoothTransition: boolean
    locationDetection: boolean
    marketHours: boolean
    greetings: boolean
    urgencyMessages: boolean
    adaptiveCTAs: boolean
  }
  
  // Timing Configuration
  timing: {
    transitionDelayMs: number
    updateIntervalMs: number
    locationTimeoutMs: number
  }
  
  // A/B Testing
  experiments: {
    headlineVariants: boolean
    ctaVariants: boolean
    colorScheme: boolean
  }
  
  // Integration Settings
  integrations: {
    posthog: {
      enabled: boolean
      featureFlags: boolean
      analytics: boolean
    }
    strapi: {
      enabled: boolean
      endpoint: string
      contentSync: boolean
    }
  }
}

// Default Configuration
export const defaultPersonalizationConfig: PersonalizationConfig = {
  features: {
    personalization: true,
    smoothTransition: true,
    locationDetection: true,
    marketHours: true,
    greetings: true,
    urgencyMessages: true,
    adaptiveCTAs: true
  },
  timing: {
    transitionDelayMs: 3000,
    updateIntervalMs: 60000,
    locationTimeoutMs: 5000
  },
  experiments: {
    headlineVariants: false,
    ctaVariants: false,
    colorScheme: false
  },
  integrations: {
    posthog: {
      enabled: true,
      featureFlags: true,
      analytics: true
    },
    strapi: {
      enabled: false, // Enable when Strapi is configured
      endpoint: process.env.NUXT_PUBLIC_STRAPI_URL || '',
      contentSync: false
    }
  }
}

// Geography and Market Configuration
export interface MarketConfig {
  exchange: string
  indices: string[]
  currency: string
  timezone: string
  marketHours: {
    open: string // "09:30"
    close: string // "16:00"
    preMarketStart: string // "04:00"
    afterHoursEnd: string // "20:00"
  }
  holidays: string[] // ISO dates
  languages: string[]
}

export const marketConfigurations: Record<string, MarketConfig> = {
  // United States
  'US': {
    exchange: 'NYSE',
    indices: ['SPY', 'QQQ', 'DIA'],
    currency: 'USD',
    timezone: 'America/New_York',
    marketHours: {
      open: '09:30',
      close: '16:00',
      preMarketStart: '04:00',
      afterHoursEnd: '20:00'
    },
    holidays: ['2024-01-01', '2024-07-04', '2024-12-25'],
    languages: ['en']
  },

  // Sweden
  'SE': {
    exchange: 'OMX Stockholm',
    indices: ['OMXS30', 'OMXSPI'],
    currency: 'SEK',
    timezone: 'Europe/Stockholm',
    marketHours: {
      open: '09:00',
      close: '17:30',
      preMarketStart: '08:00',
      afterHoursEnd: '18:30'
    },
    holidays: ['2024-01-01', '2024-06-06', '2024-12-25'],
    languages: ['sv', 'en']
  },

  // United Kingdom
  'GB': {
    exchange: 'LSE',
    indices: ['FTSE', 'UKX'],
    currency: 'GBP',
    timezone: 'Europe/London',
    marketHours: {
      open: '08:00',
      close: '16:30',
      preMarketStart: '07:00',
      afterHoursEnd: '17:30'
    },
    holidays: ['2024-01-01', '2024-12-25', '2024-12-26'],
    languages: ['en']
  },

  // Germany
  'DE': {
    exchange: 'XETRA',
    indices: ['DAX', 'MDAX'],
    currency: 'EUR',
    timezone: 'Europe/Berlin',
    marketHours: {
      open: '09:00',
      close: '17:30',
      preMarketStart: '08:00',
      afterHoursEnd: '20:00'
    },
    holidays: ['2024-01-01', '2024-10-03', '2024-12-25'],
    languages: ['de', 'en']
  },

  // France
  'FR': {
    exchange: 'Euronext Paris',
    indices: ['CAC 40', 'SBF 120'],
    currency: 'EUR',
    timezone: 'Europe/Paris',
    marketHours: {
      open: '09:00',
      close: '17:30',
      preMarketStart: '08:00',
      afterHoursEnd: '18:30'
    },
    holidays: ['2024-01-01', '2024-07-14', '2024-12-25'],
    languages: ['fr', 'en']
  },

  // Japan
  'JP': {
    exchange: 'TSE',
    indices: ['N225', 'TOPIX'],
    currency: 'JPY',
    timezone: 'Asia/Tokyo',
    marketHours: {
      open: '09:00',
      close: '15:00',
      preMarketStart: '08:00',
      afterHoursEnd: '16:00'
    },
    holidays: ['2024-01-01', '2024-02-23', '2024-12-29'],
    languages: ['ja', 'en']
  },

  // Australia
  'AU': {
    exchange: 'ASX',
    indices: ['ASX 200', 'All Ordinaries'],
    currency: 'AUD',
    timezone: 'Australia/Sydney',
    marketHours: {
      open: '10:00',
      close: '16:00',
      preMarketStart: '09:30',
      afterHoursEnd: '17:00'
    },
    holidays: ['2024-01-01', '2024-01-26', '2024-12-25'],
    languages: ['en']
  },

  // Canada
  'CA': {
    exchange: 'TSX',
    indices: ['TSX Composite', 'TSX 60'],
    currency: 'CAD',
    timezone: 'America/Toronto',
    marketHours: {
      open: '09:30',
      close: '16:00',
      preMarketStart: '04:00',
      afterHoursEnd: '20:00'
    },
    holidays: ['2024-01-01', '2024-07-01', '2024-12-25'],
    languages: ['en', 'fr']
  },

  // Default fallback
  'default': {
    exchange: 'NYSE',
    indices: ['SPY', 'QQQ', 'DIA'],
    currency: 'USD',
    timezone: 'America/New_York',
    marketHours: {
      open: '09:30',
      close: '16:00',
      preMarketStart: '04:00',
      afterHoursEnd: '20:00'
    },
    holidays: [],
    languages: ['en']
  }
}

// Timezone to Country Mapping
export const timezoneToCountry: Record<string, string> = {
  'Europe/Stockholm': 'SE',
  'Europe/London': 'GB',
  'Europe/Berlin': 'DE',
  'Europe/Amsterdam': 'DE', // Netherlands uses similar market
  'Europe/Paris': 'FR',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Los_Angeles': 'US',
  'America/Toronto': 'CA',
  'Asia/Tokyo': 'JP',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU'
}

// Content Variations for A/B Testing
export const contentVariations = {
  headlines: {
    default: 'AI finds the opportunities, you make the decisions',
    variant_a: 'Smart AI finds trades, you decide when to act',
    variant_b: 'AI scouts the markets, you make the moves',
    variant_c: 'Let AI do the research, you do the trading'
  },
  
  ctas: {
    default: 'Get started for free',
    variant_a: 'Start your free trial',
    variant_b: 'Try it free today',
    variant_c: 'Begin free trial now'
  },
  
  urgency: {
    high: 'Limited time: Market opportunities closing soon',
    medium: 'Don\'t miss today\'s market moves',
    low: 'Check out what\'s trending in the markets'
  }
}

// PostHog Integration
export const posthogFeatureFlags = {
  PERSONALIZATION_ENABLED: 'personalization-enabled',
  SMOOTH_TRANSITIONS: 'smooth-transitions',
  LOCATION_DETECTION: 'location-detection',
  MARKET_HOURS_DISPLAY: 'market-hours-display',
  ADAPTIVE_CTAS: 'adaptive-ctas',
  HEADLINE_VARIANTS: 'headline-variants',
  COLOR_SCHEME_TEST: 'color-scheme-test'
}

// Strapi Content Types
export const strapiContentTypes = {
  PERSONALIZATION_CONFIG: 'personalization-config',
  MARKET_CONFIGURATIONS: 'market-configurations',
  CONTENT_VARIATIONS: 'content-variations',
  FEATURE_FLAGS: 'feature-flags'
}
