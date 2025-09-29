import { ref, computed, readonly } from 'vue'
import { useRuntimeConfig, useI18n } from '#imports'
import { highlightHeroHeadline, highlightHeroSubheadline, getUserContextForHighlighting } from '~/utils/textHighlighting'

interface UserContext {
  location: {
    country: string
    countryCode: string
    region: string
    city: string
    timezone: string
    currency: string
    language: string
  }
  market: {
    primaryExchange: string
    marketHours: {
      isOpen: boolean
      nextOpen: Date | null
      nextClose: Date | null
      localTime: string
    }
    preferredSymbols: string[]
    localIndices: string[]
  }
  timing: {
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
    dayOfWeek: string
    isWeekend: boolean
    marketSession: 'pre-market' | 'market' | 'after-hours' | 'closed' | 'market-open' | 'market-closed'
  }
  preferences: {
    visitCount: number
    lastVisit: Date | null
    interactionLevel: 'new' | 'browsing' | 'engaged' | 'returning'
    preferredLanguage: string
  }
}

interface PersonalizedContent {
  greeting: string
  headline: string
  subheadline: string
  cta: string
  urgency: string
  marketStatus: string
  relevantSymbols: string[]
  localizedCurrency: string
  timeZoneMessage: string
}

// Comprehensive worldwide market configuration
const MARKET_MAP: Record<string, { name: string, indices: string[], exchange: string, hours: { open: number, close: number } }> = {
  // North America
  'US': { name: 'NYSE', indices: ['SPY', 'QQQ', 'DIA'], exchange: 'NYSE', hours: { open: 9.5, close: 16 } },
  'CA': { name: 'TSX', indices: ['TSX', 'VTI'], exchange: 'TSX', hours: { open: 9.5, close: 16 } },
  'MX': { name: 'BMV', indices: ['IPC'], exchange: 'BMV', hours: { open: 8.5, close: 15 } },
  
  // Europe  
  'SE': { name: 'OMX', indices: ['OMXS30'], exchange: 'OMX', hours: { open: 9, close: 17.5 } },
  'GB': { name: 'LSE', indices: ['FTSE', 'UKX'], exchange: 'LSE', hours: { open: 8, close: 16.5 } },
  'DE': { name: 'XETRA', indices: ['DAX', 'MDAX'], exchange: 'XETRA', hours: { open: 9, close: 17.5 } },
  'FR': { name: 'Euronext', indices: ['CAC', 'SBF'], exchange: 'Euronext', hours: { open: 9, close: 17.5 } },
  'ES': { name: 'BME', indices: ['IBEX'], exchange: 'BME', hours: { open: 9, close: 17.5 } },
  'IT': { name: 'Borsa Italiana', indices: ['FTSE MIB'], exchange: 'MIB', hours: { open: 9, close: 17.5 } },
  'NL': { name: 'Euronext', indices: ['AEX'], exchange: 'Euronext', hours: { open: 9, close: 17.5 } },
  'CH': { name: 'SIX', indices: ['SMI'], exchange: 'SIX', hours: { open: 9, close: 17.5 } },
  'NO': { name: 'OSE', indices: ['OBX'], exchange: 'OSE', hours: { open: 9, close: 16.5 } },
  'DK': { name: 'NASDAQ Copenhagen', indices: ['OMXC'], exchange: 'NASDAQ', hours: { open: 9, close: 17 } },
  'FI': { name: 'NASDAQ Helsinki', indices: ['OMXH'], exchange: 'NASDAQ', hours: { open: 10, close: 18.5 } },
  'AT': { name: 'Wiener Börse', indices: ['ATX'], exchange: 'WBAG', hours: { open: 9, close: 17.5 } },
  'BE': { name: 'Euronext', indices: ['BEL20'], exchange: 'Euronext', hours: { open: 9, close: 17.5 } },
  'PT': { name: 'Euronext', indices: ['PSI'], exchange: 'Euronext', hours: { open: 9, close: 17.5 } },
  'GR': { name: 'ATHEX', indices: ['ASE'], exchange: 'ATHEX', hours: { open: 10, close: 17.5 } },
  'PL': { name: 'WSE', indices: ['WIG'], exchange: 'WSE', hours: { open: 9, close: 17 } },
  'CZ': { name: 'PSE', indices: ['PX'], exchange: 'PSE', hours: { open: 9, close: 17 } },
  'RU': { name: 'MOEX', indices: ['RTS'], exchange: 'MOEX', hours: { open: 10, close: 18.5 } },
  
  // Asia-Pacific
  'JP': { name: 'TSE', indices: ['N225', 'TOPIX'], exchange: 'TSE', hours: { open: 9, close: 15 } },
  'CN': { name: 'SSE', indices: ['SHCOMP', 'CSI300'], exchange: 'SSE', hours: { open: 9.5, close: 15 } },
  'HK': { name: 'HKEX', indices: ['HSI'], exchange: 'HKEX', hours: { open: 9.5, close: 16 } },
  'KR': { name: 'KRX', indices: ['KOSPI'], exchange: 'KRX', hours: { open: 9, close: 15.5 } },
  'TW': { name: 'TWSE', indices: ['TAIEX'], exchange: 'TWSE', hours: { open: 9, close: 13.5 } },
  'SG': { name: 'SGX', indices: ['STI'], exchange: 'SGX', hours: { open: 9, close: 17 } },
  'MY': { name: 'Bursa', indices: ['KLCI'], exchange: 'Bursa', hours: { open: 9, close: 17 } },
  'TH': { name: 'SET', indices: ['SET'], exchange: 'SET', hours: { open: 10, close: 16.5 } },
  'ID': { name: 'IDX', indices: ['JCI'], exchange: 'IDX', hours: { open: 9, close: 16 } },
  'PH': { name: 'PSE', indices: ['PSEI'], exchange: 'PSE', hours: { open: 9.5, close: 15.5 } },
  'VN': { name: 'HOSE', indices: ['VNI'], exchange: 'HOSE', hours: { open: 9, close: 15 } },
  'IN': { name: 'NSE', indices: ['NIFTY', 'SENSEX'], exchange: 'NSE', hours: { open: 9.25, close: 15.5 } },
  'AU': { name: 'ASX', indices: ['XAO', 'XJO'], exchange: 'ASX', hours: { open: 10, close: 16 } },
  'NZ': { name: 'NZX', indices: ['NZX50'], exchange: 'NZX', hours: { open: 10, close: 16.5 } },
  
  // Middle East & Africa
  'AE': { name: 'DFM', indices: ['DFMGI'], exchange: 'DFM', hours: { open: 10, close: 15 } },
  'SA': { name: 'Tadawul', indices: ['TASI'], exchange: 'Tadawul', hours: { open: 10, close: 15 } },
  'QA': { name: 'QSE', indices: ['QSI'], exchange: 'QSE', hours: { open: 9.5, close: 13 } },
  'KW': { name: 'Boursa Kuwait', indices: ['KWSE'], exchange: 'Boursa', hours: { open: 9.5, close: 13 } },
  'IL': { name: 'TASE', indices: ['TA125'], exchange: 'TASE', hours: { open: 9.5, close: 17.25 } },
  'TR': { name: 'Borsa Istanbul', indices: ['XU100'], exchange: 'BIST', hours: { open: 10, close: 18 } },
  'ZA': { name: 'JSE', indices: ['JSE'], exchange: 'JSE', hours: { open: 9, close: 17 } },
  'EG': { name: 'EGX', indices: ['EGX30'], exchange: 'EGX', hours: { open: 10, close: 14.5 } },
  'MA': { name: 'Casablanca SE', indices: ['MASI'], exchange: 'CSE', hours: { open: 9.5, close: 15.5 } },
  'NG': { name: 'NSE', indices: ['NSE'], exchange: 'NSE', hours: { open: 10, close: 14.5 } },
  'KE': { name: 'NSE', indices: ['NSE20'], exchange: 'NSE', hours: { open: 9.5, close: 15 } },
  
  // Latin America
  'BR': { name: 'B3', indices: ['IBOV', 'BVSP'], exchange: 'B3', hours: { open: 10, close: 17 } },
  'AR': { name: 'BYMA', indices: ['MERV'], exchange: 'BYMA', hours: { open: 11, close: 17 } },
  'CL': { name: 'BCS', indices: ['IPSA'], exchange: 'BCS', hours: { open: 9.5, close: 16 } },
  'CO': { name: 'BVC', indices: ['COLCAP'], exchange: 'BVC', hours: { open: 9.5, close: 16 } },
  'PE': { name: 'BVL', indices: ['IGBVL'], exchange: 'BVL', hours: { open: 9.5, close: 15.5 } }
}

export const usePersonalization = () => {
  const { t, locale, getLocaleMessage, onLanguageSwitched, tm } = useI18n() as any
  // Track intervals for cleanup
  let updateInterval: ReturnType<typeof setInterval> | null = null
  // Retry timer for non-English variant loading
  let nonEnRetryTimer: ReturnType<typeof setTimeout> | null = null
  // Limited retry counter for loading localized hero variants
  const nonEnVariantRetryCount = ref(0)
  // Rotation index for non-English heroVariants
  const nonEnVariantIndex = ref(0)
  
  const userContext = ref<UserContext>({
    location: {
      country: '',
      countryCode: '',
      region: '',
      city: '',
      timezone: '',
      currency: 'USD',
      language: 'en'
    },
    market: {
      primaryExchange: 'NYSE',
      marketHours: {
        isOpen: false,
        nextOpen: null,
        nextClose: null,
        localTime: ''
      },
      preferredSymbols: ['SPY', 'QQQ', 'AAPL'],
      localIndices: ['SPY', 'QQQ', 'DIA']
    },
    timing: {
      timeOfDay: 'morning',
      dayOfWeek: '',
      isWeekend: false,
      marketSession: 'closed'
    },
    preferences: {
      visitCount: 1,
      lastVisit: null,
      interactionLevel: 'new',
      preferredLanguage: 'en'
    }
  })

  const personalizedContent = ref<PersonalizedContent>({
    greeting: 'Welcome',
    headline: 'AI finds the opportunities, you make the decisions',
    subheadline: 'Sleep better, trade smarter with 24/7 AI market monitoring.',
    cta: 'Get started for free',
    urgency: '',
    marketStatus: '',
    relevantSymbols: ['AAPL', 'TSLA', 'BTC'],
    localizedCurrency: '$',
    timeZoneMessage: ''
  })

  const isLoading = ref(true)


  // Determine time of day
  const calculateTimeOfDay = () => {
    const hour = new Date().getHours()
    
    if (hour >= 5 && hour < 12) {
      userContext.value.timing.timeOfDay = 'morning'
    } else if (hour >= 12 && hour < 17) {
      userContext.value.timing.timeOfDay = 'afternoon'
    } else if (hour >= 17 && hour < 21) {
      userContext.value.timing.timeOfDay = 'evening'
    } else {
      userContext.value.timing.timeOfDay = 'night'
    }
  }

  // Track user preferences and behavior - client-side only to prevent hydration issues
  const trackUserBehavior = () => {
    // Only run on client-side to prevent hydration issues
    if (typeof window === 'undefined') {
      return
    }
    
    try {
      const visitCount = parseInt(localStorage.getItem('helicon-visit-count') || '0') + 1
      const lastVisit = localStorage.getItem('helicon-last-visit')
      
      userContext.value.preferences.visitCount = visitCount
      userContext.value.preferences.lastVisit = lastVisit ? new Date(lastVisit) : null
      
      // Determine user engagement level
      if (visitCount === 1) {
        userContext.value.preferences.engagementLevel = 'new'
      } else if (visitCount <= 3) {
        userContext.value.preferences.engagementLevel = 'browsing'
      } else if (visitCount <= 10) {
        userContext.value.preferences.engagementLevel = 'engaged'
      } else {
        userContext.value.preferences.engagementLevel = 'returning'
      }

      // Save current visit
      localStorage.setItem('helicon-visit-count', visitCount.toString())
      localStorage.setItem('helicon-last-visit', new Date().toISOString())
    } catch (error) {
      console.warn('Failed to access localStorage:', error)
      // Fallback to default values
      userContext.value.preferences.visitCount = 1
      userContext.value.preferences.engagementLevel = 'new'
    }
  }

  // Helper function to convert country names to adjectives
  const getCountryAdjective = (country: string): string => {
    const countryAdjectiveMap: Record<string, string> = {
      // Europe
      'Sweden': 'Swedish',
      'Spain': 'Spanish',
      'Germany': 'German',
      'France': 'French',
      'Italy': 'Italian',
      'United Kingdom': 'UK',
      'Netherlands': 'Dutch',
      'Portugal': 'Portuguese',
      'Belgium': 'Belgian',
      'Switzerland': 'Swiss',
      'Austria': 'Austrian',
      'Norway': 'Norwegian',
      'Denmark': 'Danish',
      'Finland': 'Finnish',
      'Poland': 'Polish',
      'Czech Republic': 'Czech',
      'Greece': 'Greek',
      
      // Americas
      'United States': 'US',
      'Canada': 'Canadian',
      'Mexico': 'Mexican',
      'Brazil': 'Brazilian',
      'Argentina': 'Argentine',
      'Chile': 'Chilean',
      'Colombia': 'Colombian',
      'Peru': 'Peruvian',
      
      // Asia-Pacific
      'Japan': 'Japanese',
      'China': 'Chinese',
      'India': 'Indian',
      'Australia': 'Australian',
      'New Zealand': 'New Zealand',
      'South Korea': 'Korean',
      'Singapore': 'Singaporean',
      'Hong Kong': 'Hong Kong',
      'Thailand': 'Thai',
      'Malaysia': 'Malaysian',
      'Indonesia': 'Indonesian',
      'Philippines': 'Filipino',
      'Vietnam': 'Vietnamese',
      
      // Middle East & Africa
      'United Arab Emirates': 'UAE',
      'Saudi Arabia': 'Saudi',
      'Israel': 'Israeli',
      'Turkey': 'Turkish',
      'South Africa': 'South African',
      'Egypt': 'Egyptian',
      'Morocco': 'Moroccan',
      'Nigeria': 'Nigerian',
      'Kenya': 'Kenyan'
    }
    return countryAdjectiveMap[country] || country
  }

  // Language-agnostic personalization options using translation keys
  // These translation keys will be available in all languages (EN, FR, AR, ES, DE, etc.)
  const personalizationOptionKeys = [
    {
      // Option 0: Empowerment frame
      headlineKey: 'personalization.variants.0.headline',
      subheadlineKey: 'personalization.variants.0.subheadline', 
      type: 'empowerment'
    },
    {
      // Option 1: Momentum/dynamism
      headlineKey: 'personalization.variants.1.headline',
      subheadlineKey: 'personalization.variants.1.subheadline',
      type: 'momentum'
    },
    {
      // Option 2: User-centric
      headlineKey: 'personalization.variants.2.headline',
      subheadlineKey: 'personalization.variants.2.subheadline',
      type: 'user_centric'
    },
    {
      // Option 3: Clean & modern
      headlineKey: 'personalization.variants.3.headline', 
      subheadlineKey: 'personalization.variants.3.subheadline',
      type: 'modern'
    },
    {
      // Option 4: Action-oriented
      headlineKey: 'personalization.variants.4.headline',
      subheadlineKey: 'personalization.variants.4.subheadline',
      type: 'action_oriented'
    },
    {
      // Option 5: Pre-market urgency
      headlineKey: 'personalization.variants.5.headline',
      subheadlineKey: 'personalization.variants.5.subheadline',
      type: 'pre_market_urgency'
    },
    {
      // Option 6: Market open urgency
      headlineKey: 'personalization.variants.6.headline',
      subheadlineKey: 'personalization.variants.6.subheadline',
      type: 'market_open_urgency'
    },
    {
      // Option 7: After-hours urgency
      headlineKey: 'personalization.variants.7.headline',
      subheadlineKey: 'personalization.variants.7.subheadline',
      type: 'after_hours_urgency'
    },
    {
      // Option 8: New visitor behavioral
      headlineKey: 'personalization.variants.8.headline',
      subheadlineKey: 'personalization.variants.8.subheadline', 
      type: 'new_visitor'
    },
    {
      // Option 9: Returning visitor behavioral
      headlineKey: 'personalization.variants.9.headline',
      subheadlineKey: 'personalization.variants.9.subheadline',
      type: 'returning_visitor'
    }
  ]

  // Production-ready personalization option selection with fallback hierarchy
  const getPersonalizationOptionIndex = async (): Promise<number> => {
    // Give PostHog a moment to fully initialize if it's still loading
    if (typeof window !== 'undefined') {
      let attempts = 0
      while (!((window as any).posthog || useNuxtApp()?.$posthog) && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        attempts++
      }
    }
    // Priority 0: Check if personalization is enabled via PostHog kill switch
    // Try multiple ways to access PostHog
    let posthog = null
    if (typeof window !== 'undefined') {
      // Method 1: Direct window access
      posthog = (window as any).posthog
      // Method 2: Check if Nuxt provided it
      if (!posthog) {
        const nuxtApp = useNuxtApp()
        posthog = nuxtApp.$posthog
      }
    }
    
    if (posthog) {
      console.log('✅ PostHog found for personalization:', !!posthog)
      
      // Check the kill switch first
      const personalizationEnabled = posthog.isFeatureEnabled('marketing-homepage-headline-enable-personalization')
      
      if (!personalizationEnabled) {
        console.log('🚫 Personalization disabled via PostHog kill switch')
        // Track that personalization was disabled
        posthog.capture('personalization_disabled', {
          source: 'posthog_kill_switch',
          timestamp: new Date().toISOString()
        })
        // Return default option (0) when disabled
        return 0
      }
      
      console.log('✅ Personalization enabled via PostHog')
      
      // Priority 1: PostHog A/B Testing (if enabled)
      const flagName = 'marketing-homepage-headline-personalization-variant'
      
      // Get both the variant key and payload
      const variant = posthog.getFeatureFlag(flagName)
      const payload = posthog.getFeatureFlagPayload(flagName)
      
      console.log('🎯 PostHog Flag Debug:', { variant, payload, enabled: personalizationEnabled })
      
      // Handle different PostHog response formats
      let variantValue: string | null = null
      
      // Method 1: Check payload first (recommended)
      if (payload && payload.value) {
        variantValue = payload.value
      }
      // Method 2: Check direct variant value
      else if (variant) {
        if (typeof variant === 'string') {
          variantValue = variant
        }
      }
      
      // Convert variant key to option index
      if (variantValue) {
        let optionIndex: number
        
        // Handle both numeric strings and variant keys
        if (!isNaN(parseInt(variantValue))) {
          optionIndex = parseInt(variantValue) % personalizationOptionKeys.length
        } else {
          // Handle variant keys like 'variant_0', 'variant_1', etc.
          const match = variantValue.match(/variant[_-]?(\d+)/i)
          if (match) {
            optionIndex = parseInt(match[1]) % personalizationOptionKeys.length
          } else {
            // Map variant keys to indices
            const variantMap: Record<string, number> = {
              'global-insight': 0,
              'ai-eyes': 1,
              'your-edge': 2,
              'redefined-intelligence': 3,
              'global-ai-power': 4
            }
            optionIndex = variantMap[variantValue] ?? 0
          }
        }
        
        console.log('🎯 PostHog A/B Test - Variant:', variantValue, '→ Option:', optionIndex)
        
        // Track the variant assignment with detailed context
        const selectedVariantKey = personalizationOptionKeys[optionIndex]
        const eventData = {
          variant_id: optionIndex,
          variant_key: variantValue,
          variant_type: selectedVariantKey.type, // NEW: Track variant category
          flag_name: flagName,
          source: 'posthog_ab_test',
          enabled: true,
          country: userContext.value.location.country || 'Sweden',
          country_code: userContext.value.location.countryCode || 'SE',
          city: userContext.value.location.city || 'Stockholm',
          market_session: userContext.value.timing.marketSession,
          time_of_day: userContext.value.timing.timeOfDay,
          is_weekend: userContext.value.timing.isWeekend,
          timezone: userContext.value.location.timezone || 'Europe/Stockholm',
          primary_index: userContext.value.market.localIndices[0] || 'OMXS30',
          headline_key: selectedVariantKey.headlineKey,
          subheadline_key: selectedVariantKey.subheadlineKey,
          visit_count: userContext.value.preferences.visitCount,
          is_new_visitor: userContext.value.preferences.visitCount === 1,
          is_returning_visitor: userContext.value.preferences.visitCount > 3,
          interaction_level: userContext.value.preferences.interactionLevel,
          device_type: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop',
          timestamp: new Date().toISOString()
        }
        
        // Capture the main event
        posthog.capture('personalization_variant_assigned', eventData)
        
        // Also set user properties for better cohort analysis
        posthog.setPersonProperties({
          'personalization_variant': optionIndex,
          'personalization_enabled': true,
          'last_variant_assignment': new Date().toISOString(),
          'market_primary_index': eventData.primary_index,
          'user_country': eventData.country,
          'user_city': eventData.city
        })
        
        return optionIndex
      }
    }
    
    // Priority 2: Strapi CMS Configuration
    // TODO: Implement Strapi integration for content management
    
    // Priority 3: Runtime config (for manual overrides)
    const config = useRuntimeConfig()
    const runtimeOption = config.public?.personalizationOption
    if (runtimeOption && !isNaN(parseInt(runtimeOption))) {
      console.log('🔧 Using runtime config option:', runtimeOption)
      return parseInt(runtimeOption) % personalizationOptionKeys.length
    }
    
    // Priority 4: Environment variable fallback removed (TS client-side)
    
    // Priority 5: Intelligent default based on user context
    const { location, timing, preferences } = userContext.value
    
    // NEW VISITOR vs RETURNING VISITOR (highest priority)
    if (preferences.visitCount === 1) {
      console.log('👋 New visitor: Using welcome variant (Option 8)')
      return 8 // "Start Trading Smarter with AI-Powered Insights"
    } else if (preferences.visitCount > 3) {
      console.log('🔄 Returning visitor: Using returning variant (Option 9)')
      return 9 // "Welcome Back — Ready to Trade Smarter?"
    }
    
    // TIME-BASED URGENCY (market session variants)
    if (timing.marketSession === 'pre-market') {
      console.log('📈 Pre-market urgency: Option 5 (Markets Open Soon)')
      return 5 // "Markets Open Soon — Your [Country] Edge Awaits"
    } else if (timing.marketSession === 'market' || timing.marketSession === 'market-open') {
      console.log('🔥 Market open urgency: Option 6 (Live Market Action)')
      return 6 // "Live Market Action — [Country] Opportunities Now"
    } else if (timing.marketSession === 'after-hours') {
      console.log('🌙 After-hours urgency: Option 7 (AI Never Sleeps)')
      return 7 // "Markets Closed, But Your AI Never Sleeps"
    }
    
    // ORIGINAL VARIANTS for standard market hours
    if (location.country === 'Sweden') {
      console.log('🇸🇪 Using Sweden default: Option 0 (Global insight)')
      return 0 // "Global insight, built for Sweden markets"
    }
    
    // Final fallback: Week-based cycling through original 5 variants
    const weekNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7))
    const fallbackOption = weekNumber % 5 // Only cycle through original 5
    console.log('📅 Using week-based fallback:', fallbackOption)
    return fallbackOption
  }
  
// Make variant reactive and available to components
const variant = ref<number>(0)

// Initialize variant with PostHog A/B test result
const initializeVariant = async (): Promise<number> => {
  const optionIndex = await getPersonalizationOptionIndex()
  variant.value = optionIndex
  return optionIndex
}

// Localized country helpers (must be defined before generatePersonalizedContent)
  const getCountryCode = (): string => {
    const cc = (userContext.value.location.countryCode || '').toUpperCase()
    if (cc) return cc
    const name = userContext.value.location.country
    const map: Record<string, string> = {
      'Sweden': 'SE',
      'United States': 'US',
      'United Kingdom': 'GB',
      'Germany': 'DE',
      'France': 'FR'
    }
    return map[name] || ''
  }

  const getLocalizedCountryName = (): string => {
    try {
      const code = getCountryCode()
      if (code) {
        const dn = new Intl.DisplayNames([locale.value], { type: 'region' }) as any
        const name = dn.of(code)
        if (typeof name === 'string') return name
      }
    } catch (e) {}
    return userContext.value.location.country || 'global'
  }

  // Track last generation to prevent excessive calls
  let lastGenerationTime = 0
  let isGenerating = false
  const GENERATION_DEBOUNCE_MS = 2000 // Prevent regeneration within 2 seconds

  // Generate personalized content based on context
  const generatePersonalizedContent = async () => {
    const now = Date.now()
    console.log('🚀 generatePersonalizedContent called at:', new Date().toISOString())
    
    // Prevent concurrent generations
    if (isGenerating) {
      console.log('⏱️ Personalization generation in progress, skipping...')
      return
    }
    
    // Prevent too frequent calls
    if (now - lastGenerationTime < GENERATION_DEBOUNCE_MS) {
      console.log('⏱️ Personalization generation debounced (too frequent calls)')
      return
    }
    
    console.log('🔧 Starting personalization generation...', {
      isLoading: isLoading.value,
      locale: locale.value,
      userContext: {
        country: userContext.value.location.country,
        city: userContext.value.location.city,
        marketSession: userContext.value.timing.marketSession,
        isWeekend: userContext.value.timing.isWeekend
      }
    })
    
    isGenerating = true
    lastGenerationTime = now
    
    const { location, timing, market, preferences } = userContext.value
    
    // Personalization control - easy to toggle
    const ENABLE_PERSONALIZATION = true
    const ENABLE_SMOOTH_TRANSITION = true // Show default first, then personalize
    
    if (!ENABLE_PERSONALIZATION) {
      // Use default non-personalized content
      personalizedContent.value = {
        greeting: t('hero.joinBeta'),
        headline: t('hero.title'),
        subheadline: t('hero.subtitle'),
        cta: t('cta.createAccount'),
        urgency: '',
        marketStatus: '',
        relevantSymbols: ['AAPL', 'TSLA', 'BTC'],
        localizedCurrency: '$',
        timeZoneMessage: ''
      }
      return
    }
    
    // If smooth transition is enabled, start with default content
    if (ENABLE_SMOOTH_TRANSITION && isLoading.value) {
      personalizedContent.value = {
        greeting: t('hero.joinBeta'),
        headline: t('hero.title'),
        subheadline: t('hero.subtitle'),
        cta: t('cta.createAccount'),
        urgency: '',
        marketStatus: '',
        relevantSymbols: ['AAPL', 'TSLA', 'BTC'],
        localizedCurrency: '$',
        timeZoneMessage: ''
      }
      return
    }
    
    // Greeting based on time and location
    const timeGreetings = {
      morning: [`Good morning`, `Rise and shine`, `Start your day strong`],
      afternoon: [`Good afternoon`, `Hope your day is going well`, `Making moves this afternoon`],
      evening: [`Good evening`, `Ending the day right`, `Evening trader`],
      night: [`Working late`, `Night owl trader`, `Markets never sleep`]
    }
    
    const greetings = timeGreetings[timing.timeOfDay]
    let greeting = greetings[Math.floor(Math.random() * greetings.length)]
    
    if (location.city) {
      greeting += ` from ${location.city}`
    }

    // Prepare dynamic placeholders
    const country = location.country || 'global'
    const city = location.city || 'your city'
    const primaryIndex = market.localIndices[0] || 'SPY'

    // If locale is not English, use localized rotating variants if available
    if (locale.value !== 'en') {
      const localizedCountry = getLocalizedCountryName()
      console.log('🌐 i18n non-EN branch start', { locale: locale.value })
      // Prefer plain JSON from getLocaleMessage (avoids Proxy/value wrappers). Fallback to tm().
      let variants: any[] = []
      const messages = getLocaleMessage ? (getLocaleMessage(locale.value) as any) : null
      if (messages && (Array.isArray(messages.heroVariants) || typeof messages.heroVariants === 'object')) {
        try {
          // Normalize to array (handles object-with-numeric-keys)
          const raw = Array.isArray(messages.heroVariants)
            ? messages.heroVariants
            : Object.values(messages.heroVariants)
          // Deep-clone to strip reactivity/proxies
          variants = JSON.parse(JSON.stringify(raw))
        } catch (_) {
          variants = Array.isArray(messages.heroVariants)
            ? messages.heroVariants
            : Object.values(messages.heroVariants)
        }
        console.log('📦 getLocaleMessage(heroVariants) length:', variants.length)
      }
      if (!Array.isArray(variants) || variants.length === 0) {
        try {
          if (tm && typeof tm === 'function') {
            const v = tm('heroVariants')
            if (Array.isArray(v)) {
              try {
                variants = JSON.parse(JSON.stringify(v))
              } catch (_) {
                variants = v as any[]
              }
              console.log('🧩 tm("heroVariants") length:', variants.length)
            }
          }
        } catch (e) { console.warn('tm("heroVariants") failed', e) }
      }
      // If variants aren't ready yet (race with i18n HMR/load), retry a few times before falling back
      if ((!variants || variants.length === 0) && nonEnVariantRetryCount.value < 8) {
        nonEnVariantRetryCount.value += 1
        if (!nonEnRetryTimer) {
          nonEnRetryTimer = setTimeout(() => {
            nonEnRetryTimer = null
            generatePersonalizedContent()
          }, 350)
        }
        // Preserve existing personalized content until variants appear
        return
      }
      if (Array.isArray(variants) && variants.length > 0) {
        if (nonEnRetryTimer) {
          clearTimeout(nonEnRetryTimer)
          nonEnRetryTimer = null
        }
        const idx = nonEnVariantIndex.value % variants.length
        const v = variants[idx]
        console.log('✅ Using localized variant', { idx, total: variants.length, v })
        // Try resolving with i18n path first (avoids proxies/wrappers)
        const headKey = `heroVariants.${idx}.headline`
        const subKey = `heroVariants.${idx}.subheadline`
        let tH: any = ''
        let tS: any = ''
        try { tH = t(headKey, { country: localizedCountry, city, index: primaryIndex }) } catch (_) {}
        try { tS = t(subKey, { country: localizedCountry, city, index: primaryIndex }) } catch (_) {}
        const isValidTH = typeof tH === 'string' && !tH.startsWith('heroVariants.')
        const isValidTS = typeof tS === 'string' && !tS.startsWith('heroVariants.')
        if (isValidTH && isValidTS) {
          // Apply semantic highlighting to localized content
          const highlightContext = getUserContextForHighlighting(userContext.value, locale.value)
          const highlightedHeadline = highlightHeroHeadline(tH, locale.value, highlightContext)
          const highlightedSubheadline = highlightHeroSubheadline(tS, locale.value, highlightContext)
          
          personalizedContent.value = {
            ...personalizedContent.value,
            greeting,
            headline: highlightedHeadline,
            subheadline: highlightedSubheadline,
            cta: t('cta.createAccount'),
            urgency: personalizedContent.value.urgency || '',
            relevantSymbols: market.localIndices.concat(['BTC', 'ETH']).slice(0, 5),
            localizedCurrency: getCurrencySymbol(location.currency),
            timeZoneMessage: `Local time: ${market.marketHours.localTime} ${location.timezone.split('/')[1]}`
          }
          // Do not auto-start rotation for non-English; show a single personalized message
          return
        }
        // Extract strings robustly (walk nested structures and pick first string)
        const pickString = (val: any): string => {
          if (typeof val === 'string') return val
          if (val == null) return ''
          if (Array.isArray(val)) {
            for (const item of val) {
              const s = pickString(item)
              if (s) return s
            }
            return ''
          }
          if (typeof val === 'object') {
            const preferred = ['value', 'text', 'message', 'label', 'content']
            for (const k of preferred) {
              if (typeof (val as any)[k] === 'string') return (val as any)[k]
            }
            for (const k in val) {
              const s = pickString((val as any)[k])
              if (s) return s
            }
          }
          return ''
        }
        const rawH = pickString(v.headline)
        const baseH = (rawH && rawH.trim().length > 0) ? rawH : (t('hero.title') as string)
        const h = baseH
          .replace('{country}', localizedCountry)
          .replace('{city}', city)
          .replace('{index}', primaryIndex)
        const rawS = pickString(v.subheadline)
        const baseS = (rawS && rawS.trim().length > 0) ? rawS : (t('hero.subtitle') as string)
        const s = baseS
          .replace('{country}', localizedCountry)
          .replace('{city}', city)
          .replace('{index}', primaryIndex)
        // If variant fields are missing, fallback safely to base localized copy
        const finalHeadline = h && h.trim().length > 0 ? h : t('hero.title')
        const finalSub = s && s.trim().length > 0 ? s : t('hero.subtitle')
        console.log('📝 Non-EN final copy', { finalHeadline, finalSub })
        // Apply semantic highlighting to localized content
        const highlightContext = getUserContextForHighlighting(userContext.value, locale.value)
        const highlightedHeadline = highlightHeroHeadline(finalHeadline, locale.value, highlightContext)
        const highlightedSubheadline = highlightHeroSubheadline(finalSub, locale.value, highlightContext)
        
        personalizedContent.value = {
          ...personalizedContent.value,
          greeting,
          headline: highlightedHeadline,
          subheadline: highlightedSubheadline,
          cta: t('cta.createAccount'),
          urgency: personalizedContent.value.urgency || '',
          relevantSymbols: market.localIndices.concat(['BTC', 'ETH']).slice(0, 5),
          localizedCurrency: getCurrencySymbol(location.currency),
          timeZoneMessage: `Local time: ${market.marketHours.localTime} ${location.timezone.split('/')[1]}`
        }
        // Do not start rotation for non-English; show a single personalized message
        return
      } else {
        // Fallback to base localized copy with highlighting
        const highlightContext = getUserContextForHighlighting(userContext.value, locale.value)
        const baseHeadline = t('hero.title')
        const baseSubheadline = t('hero.subtitle')
        const highlightedHeadline = highlightHeroHeadline(baseHeadline, locale.value, highlightContext)
        const highlightedSubheadline = highlightHeroSubheadline(baseSubheadline, locale.value, highlightContext)
        
        personalizedContent.value = {
          ...personalizedContent.value,
          greeting: t('hero.joinBeta'),
          headline: highlightedHeadline,
          subheadline: highlightedSubheadline,
          cta: t('cta.createAccount'),
          urgency: personalizedContent.value.urgency || '',
          relevantSymbols: market.localIndices.concat(['BTC', 'ETH']).slice(0, 5),
          localizedCurrency: getCurrencySymbol(location.currency),
          timeZoneMessage: `Local time: ${market.marketHours.localTime} ${location.timezone.split('/')[1]}`
        }
        // If variants not yet loaded, retry shortly
        if (nonEnVariantRetryCount.value < 5) {
          nonEnVariantRetryCount.value += 1
          setTimeout(async () => {
            await generatePersonalizedContent()
          }, 600)
        }
        return
      }
    }

    // Get rotating personalization option (now language-agnostic using translation keys)
    const currentOptionIndex = await initializeVariant()
    const currentOptionKey = personalizationOptionKeys[currentOptionIndex]
    
    // Get localized country name for translations
    const localizedCountryName = getLocalizedCountryName()
    
    console.log('🎯 Personalization Debug:', {
      optionIndex: currentOptionIndex,
      optionType: currentOptionKey.type,
      country,
      city,
      primaryIndex,
      isLoading: isLoading.value,
      marketSession: timing.marketSession,
      headlineKey: currentOptionKey.headlineKey,
      subheadlineKey: currentOptionKey.subheadlineKey
    })
    
    // Generic personalization with dynamic location injection using translation keys
    let headline, subheadline
    
    if (location.country && location.city) {
      // Location detected - apply personalization using translated content with dynamic injection
      // Test if translation function works with simple keys vs nested keys
      const testSimple = t('hero.title')
      const testNested = t('personalization.variants.0.headline')
      const testDirectVariant = t('personalization.variants.7.headline')
      
      console.log('🔍 Translation Debug:', {
        headlineKey: currentOptionKey.headlineKey,
        subheadlineKey: currentOptionKey.subheadlineKey,
        locale: locale.value,
        tFunction: typeof t,
        country: localizedCountryName,
        countryAdjective: getCountryAdjective(location.country),
        testSimple,
        testNested,
        testDirectVariant,
        simpleWorks: testSimple !== 'hero.title',
        nestedWorks: testNested !== 'personalization.variants.0.headline',
        directVariantWorks: testDirectVariant !== 'personalization.variants.7.headline'
      })
      
      // Try direct translation first, with fallback to manual lookup
      let rawHeadline = t(currentOptionKey.headlineKey, { 
        country: localizedCountryName, 
        countryAdjective: getCountryAdjective(location.country) 
      })
      let rawSubheadline = t(currentOptionKey.subheadlineKey, { 
        city: location.city, 
        index: market.localIndices[0] || 'SPY' 
      })
      
      // If translation returned the key itself (meaning it wasn't found), try manual lookup
      if (rawHeadline === currentOptionKey.headlineKey) {
        console.log('⚠️ Direct translation failed, trying manual lookup')
        try {
          // Get messages directly from locale
          const messages = getLocaleMessage ? getLocaleMessage(locale.value) : null
          if (messages && messages.personalization && messages.personalization.variants) {
            const variantIndex = currentOptionKey.headlineKey.match(/\\.(\\d+)\\./)?.[1]
            if (variantIndex && messages.personalization.variants[variantIndex]) {
              let template = messages.personalization.variants[variantIndex].headline
              // Manual interpolation
              template = template.replace(/{country}/g, localizedCountryName)
              template = template.replace(/{countryAdjective}/g, getCountryAdjective(location.country))
              rawHeadline = template
              console.log('✅ Manual headline lookup successful:', rawHeadline)
            }
          }
        } catch (e) {
          console.warn('Manual headline lookup failed:', e)
        }
      }
      
      if (rawSubheadline === currentOptionKey.subheadlineKey) {
        console.log('⚠️ Direct subheadline translation failed, trying manual lookup')
        try {
          const messages = getLocaleMessage ? getLocaleMessage(locale.value) : null
          if (messages && messages.personalization && messages.personalization.variants) {
            const variantIndex = currentOptionKey.subheadlineKey.match(/\\.(\\d+)\\./)?.[1]
            if (variantIndex && messages.personalization.variants[variantIndex]) {
              let template = messages.personalization.variants[variantIndex].subheadline
              // Manual interpolation
              template = template.replace(/{city}/g, location.city)
              template = template.replace(/{index}/g, market.localIndices[0] || 'SPY')
              rawSubheadline = template
              console.log('✅ Manual subheadline lookup successful:', rawSubheadline)
            }
          }
        } catch (e) {
          console.warn('Manual subheadline lookup failed:', e)
        }
      }
      
      console.log('🔍 Translation Results:', {
        rawHeadline,
        rawSubheadline,
        headlineIsKey: rawHeadline === currentOptionKey.headlineKey,
        subheadlineIsKey: rawSubheadline === currentOptionKey.subheadlineKey
      })
      
      // Apply semantic highlighting to personalized content
      const highlightContext = getUserContextForHighlighting(userContext.value, locale.value)
      headline = highlightHeroHeadline(rawHeadline, locale.value, highlightContext)
      subheadline = highlightHeroSubheadline(rawSubheadline, locale.value, highlightContext)
      
      console.log(`🌍 Personalization applied with highlighting:`, {
        country: location.country,
        city: location.city,
        index: market.localIndices[0],
        option: currentOptionIndex,
        rawHeadline,
        highlightedHeadline: headline,
        rawSubheadline,
        highlightedSubheadline: subheadline
      })
    } else {
      // Location detection failed - NO PERSONALIZATION, but still apply highlighting to base content
      const baseHeadline = t('hero.title')
      const baseSubheadline = t('hero.subtitle')
      const highlightContext = getUserContextForHighlighting(userContext.value, locale.value)
      headline = highlightHeroHeadline(baseHeadline, locale.value, highlightContext)
      subheadline = highlightHeroSubheadline(baseSubheadline, locale.value, highlightContext)
      console.log('⚠️ No location detected - using neutral base content with highlighting')
    }
    
    console.log('📝 Generated content:', { headline, subheadline })
    
    // Override with market-specific messages only if not already using time-based personalization
    // Time-based variants (options 5, 6, 7) already handle these scenarios
    const isTimeBasedVariant = currentOptionKey.type.includes('urgency')
    
    if (!isTimeBasedVariant) {
      if (timing.marketSession === 'pre-market') {
        console.log('⏰ Using pre-market time override')
        const rawHeadline = t('personalization.timeOverrides.preMarket.headline')
        const rawSubheadline = t('personalization.timeOverrides.preMarket.subheadline')
        console.log('🔍 Time Override Results:', {
          rawHeadline,
          rawSubheadline,
          headlineIsKey: rawHeadline === 'personalization.timeOverrides.preMarket.headline',
          subheadlineIsKey: rawSubheadline === 'personalization.timeOverrides.preMarket.subheadline'
        })
        const highlightContext = getUserContextForHighlighting(userContext.value, locale.value)
        headline = highlightHeroHeadline(rawHeadline, locale.value, highlightContext)
        subheadline = highlightHeroSubheadline(rawSubheadline, locale.value, highlightContext)
      } else if (timing.marketSession === 'after-hours') {
        console.log('🌙 Using after-hours time override')
        const rawHeadline = t('personalization.timeOverrides.afterHours.headline')
        const rawSubheadline = t('personalization.timeOverrides.afterHours.subheadline')
        console.log('🔍 Time Override Results:', {
          rawHeadline,
          rawSubheadline,
          headlineIsKey: rawHeadline === 'personalization.timeOverrides.afterHours.headline',
          subheadlineIsKey: rawSubheadline === 'personalization.timeOverrides.afterHours.subheadline'
        })
        const highlightContext = getUserContextForHighlighting(userContext.value, locale.value)
        headline = highlightHeroHeadline(rawHeadline, locale.value, highlightContext)
        subheadline = highlightHeroSubheadline(rawSubheadline, locale.value, highlightContext)
      }
    }
    // Note: Time-based personalization variants handle market timing contextually
    
    // CTAs based on user engagement level
    const ctas = {
      new: 'Start free trial',
      browsing: 'See AI in action',
      engaged: 'Activate AI alerts',
      returning: 'Welcome back — Continue setup'
    }
    
    // Use the market status that was already generated in initialization
    // Don't override it here since we already set it properly based on country
    let marketStatus = personalizedContent.value.marketStatus || ''
    
    console.log('🔄 Using existing market status:', marketStatus)

    // Urgency based on market conditions and time
    let urgency = ''
    if (timing.timeOfDay === 'evening' && !timing.isWeekend) {
      urgency = 'Setup tonight to catch tomorrow\'s pre-market moves'
    } else if (timing.marketSession === 'pre-market') {
      urgency = 'Only 30 minutes until market open'
    } else if (market.marketHours.isOpen) {
      urgency = 'Markets are moving now'
    }

    const prev3 = personalizedContent.value
    if (prev3.headline !== headline || prev3.subheadline !== subheadline) {
      personalizedContent.value = {
        ...prev3,
        greeting,
        headline,
        subheadline,
        cta: ctas[preferences.interactionLevel],
        urgency,
        relevantSymbols: market.localIndices.concat(['BTC', 'ETH']).slice(0, 5),
        localizedCurrency: getCurrencySymbol(location.currency),
        timeZoneMessage: `Local time: ${market.marketHours.localTime} ${location.timezone.split('/')[1]}`
      }
    }
    
    // Reset generating flag
    isGenerating = false
  }

  // Function to rotate to next personalization option
  const rotatePersonalizationOption = async () => {
    variant.value = (variant.value + 1) % personalizationOptionKeys.length
    await generatePersonalizedContent()
  }

  // Helper function to get time until a date
  const getTimeUntil = (date: Date): string => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days} day${days > 1 ? 's' : ''}`
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  // Helper function to get currency symbol
  const getCurrencySymbol = (currencyCode: string): string => {
    const symbols: Record<string, string> = {
      USD: '$', EUR: '€', GBP: '£', JPY: '¥', CNY: '¥',
      AUD: 'A$', CAD: 'C$', INR: '₹', BRL: 'R$', SEK: 'kr'
    }
    return symbols[currencyCode] || '$'
  }
  
  // Helper function to get currency name for better readability
  const getCurrencyName = (currencyCode: string): string => {
    const names: Record<string, string> = {
      USD: 'USD', EUR: 'EUR', GBP: 'GBP', JPY: 'JPY', CNY: 'CNY',
      AUD: 'AUD', CAD: 'CAD', INR: 'INR', BRL: 'BRL', SEK: 'SEK'
    }
    return names[currencyCode] || currencyCode
  }

  // Helper: get market schedule by country using the centralized MARKET_MAP
  const getMarketSchedule = (country: string, countryCode: string) => {
    // Default to US markets if country not found
    const marketConfig = MARKET_MAP[countryCode] || MARKET_MAP['US']
    
    return { 
      marketOpen: marketConfig.hours.open, 
      marketClose: marketConfig.hours.close, 
      marketName: marketConfig.name 
    }
  }

  // Helper: format time according to locale
  const formatHHmm = (hoursFloat: number) => {
    const h = Math.floor(hoursFloat)
    const m = Math.round((hoursFloat % 1) * 60)
    if (locale.value === 'en') {
      const date = new Date()
      date.setHours(h, m, 0, 0)
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    } else {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    }
  }

  // Helper: localize and set market status text
  const setLocalizedMarketStatus = () => {
    const country = userContext.value.location.country || 'Sweden'
    const countryCode = userContext.value.location.countryCode || 'SE'
    const { marketOpen, marketClose, marketName } = getMarketSchedule(country, countryCode)
    const session = userContext.value.timing.marketSession
    const isOpen = userContext.value.market.marketHours.isOpen
    const weekend = userContext.value.timing.isWeekend || session === 'market-closed'
    let msg = ''
    
    console.log('🏢 Market status debug:', {
      country,
      countryCode,
      marketName,
      session,
      isOpen
    })
    
    if (weekend) {
      msg = t('marketStatus.closed', { market: marketName }) as string
    } else if (isOpen) {
      const closeTime = formatHHmm(marketClose)
      msg = t('marketStatus.open', { market: marketName, time: closeTime }) as string
    } else if (session === 'pre-market') {
      const openTime = formatHHmm(marketOpen)
      msg = t('marketStatus.preMarket', { market: marketName, time: openTime }) as string
    } else if (session === 'after-hours') {
      msg = t('marketStatus.afterHours', { market: marketName }) as string
    } else {
      msg = t('marketStatus.closed', { market: marketName }) as string
    }

    // Only assign if resolved; otherwise keep previous and retry shortly
    if (typeof msg === 'string' && msg.startsWith('marketStatus.')) {
      // Build safe English fallback so the badge doesn't disappear on first paint
      let fallback = ''
      if (isOpen) {
        const closeTime = formatHHmm(marketClose)
        fallback = `${marketName} is open • Live until ${closeTime}`
      } else if (session === 'pre-market') {
        const openTime = formatHHmm(marketOpen)
        fallback = `${marketName} opens at ${openTime}`
      } else if (session === 'after-hours') {
        fallback = `${marketName} closed • After-hours trading`
      } else {
        fallback = `${marketName} closed`
      }
      // Keep previous if present, otherwise use fallback
      if (!personalizedContent.value.marketStatus) {
        personalizedContent.value.marketStatus = fallback
      }
      setTimeout(() => setLocalizedMarketStatus(), 250)
      return
    }
    personalizedContent.value.marketStatus = msg
  }

  // Initialize personalization system with PostHog integration
  const initializePersonalization = async () => {
    // Prevent duplicate initialization
    if (isInitialized) {
      console.log('⚠️ Personalization already initialized, skipping...')
      return
    }
    
    console.log('🚀 Initializing personalization system...')
    isInitialized = true
    
    // Set initial loading state
    isLoading.value = true
    
    // Initialize user context with basic data
    try {
      // Fetch user location (simplified)
      if (typeof window !== 'undefined') {
        // Try to get location from browser
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        userContext.value.location.timezone = timezone
        
        // Try to get ACTUAL user location using multiple methods
        let locationDetected = false
        
        try {
          // Method 1: Try IP geolocation (most accurate for city) 
          console.log('📍 Attempting IP-based location detection...')
          try {
            const response = await fetch('https://ipapi.co/json/')
            if (response.ok) {
              const data = await response.json()
              if (data.city && data.country_name && data.country_code) {
                userContext.value.location.country = data.country_name
                userContext.value.location.city = data.city
                userContext.value.location.countryCode = data.country_code.toUpperCase()
                locationDetected = true
                console.log('✅ Location detected via IP:', { 
                  country: data.country_name, 
                  city: data.city, 
                  code: data.country_code 
                })
              }
            }
          } catch (ipError) {
            console.warn('IP geolocation failed, trying timezone fallback:', ipError)
          }
          
          // Method 2: Timezone fallback (less accurate but better than nothing)
          if (!locationDetected && timezone.startsWith('Europe/')) {
            const city = timezone.split('/')[1].replace('_', ' ')
            // Use Intl.DisplayNames to get country from timezone  
            const locale_parts = navigator.language.split('-')
            const region = locale_parts[1] // e.g., 'ES' from 'es-ES'
            
            if (region) {
              try {
                const displayNames = new Intl.DisplayNames([navigator.language], { type: 'region' })
                const countryName = displayNames.of(region)
                
                if (countryName && city) {
                  userContext.value.location.country = countryName
                  userContext.value.location.city = city
                  userContext.value.location.countryCode = region
                  locationDetected = true
                  console.log('✅ Location detected via timezone + browser locale:', { country: countryName, city, region })
                }
              } catch (e) {
                console.warn('Failed to resolve country name:', e)
              }
            }
          } else if (!locationDetected && timezone.startsWith('America/')) {
            const city = timezone.split('/')[1].replace('_', ' ')
            userContext.value.location.country = 'United States'
            userContext.value.location.city = city
            userContext.value.location.countryCode = 'US'
            locationDetected = true
            console.log('✅ Location detected (US):', { city })
          }
        } catch (error) {
          console.warn('Location detection failed:', error)
        }
        
        if (!locationDetected) {
          // NO PERSONALIZATION if location detection fails
          userContext.value.location.country = ''
          userContext.value.location.city = ''
          userContext.value.location.countryCode = ''
          console.log('⚠️ Location detection failed - no personalization will be applied')
        }
        
        console.log('🌍 Detected location:', {
          timezone,
          country: userContext.value.location.country,
          city: userContext.value.location.city
        })
      }
      
      // Update market timing
      const now = new Date()
      const hour = now.getHours()
      
      if (hour >= 6 && hour < 12) {
        userContext.value.timing.timeOfDay = 'morning'
      } else if (hour >= 12 && hour < 17) {
        userContext.value.timing.timeOfDay = 'afternoon'
      } else if (hour >= 17 && hour < 21) {
        userContext.value.timing.timeOfDay = 'evening'
      } else {
        userContext.value.timing.timeOfDay = 'night'
      }
      
      // Generic market mapping based on country code with US fallback
      const country = userContext.value.location.country
      const countryCode = userContext.value.location.countryCode
      
      // Use centralized MARKET_MAP (no duplication)
      const marketConfig = MARKET_MAP[countryCode] || MARKET_MAP['US']
      
      const marketOpen = marketConfig.hours.open
      const marketClose = marketConfig.hours.close 
      const marketName = marketConfig.name
      
      userContext.value.market.localIndices = marketConfig.indices
      userContext.value.market.primaryExchange = marketConfig.exchange
      
      console.log('🏢 Market config:', {
        country,
        countryCode,
        marketName,
        indices: marketConfig.indices,
        fallback: !MARKET_MAP[countryCode] ? 'US_FALLBACK' : 'DIRECT_MATCH'
      })
      
      // Determine market session
  const currentHour = hour + (now.getMinutes() / 60) // Include minutes for precision
  const day = now.getDay()
  const isWeekend = day === 0 || day === 6
  userContext.value.timing.isWeekend = isWeekend

  if (isWeekend) {
    userContext.value.timing.marketSession = 'market-closed'
    userContext.value.market.marketHours.isOpen = false
  } else if (currentHour >= marketOpen && currentHour < marketClose) {
    userContext.value.timing.marketSession = 'market-open'
    userContext.value.market.marketHours.isOpen = true
  } else if (currentHour >= (marketOpen - 3) && currentHour < marketOpen) {
    userContext.value.timing.marketSession = 'pre-market'
    userContext.value.market.marketHours.isOpen = false
  } else if (currentHour >= marketClose && currentHour < (marketClose + 3)) {
    userContext.value.timing.marketSession = 'after-hours'
    userContext.value.market.marketHours.isOpen = false
  } else {
    userContext.value.timing.marketSession = 'market-closed'
    userContext.value.market.marketHours.isOpen = false
  }
      
      // Generate market status message with proper time formatting
      console.log('⏰ Market timing debug:', {
        marketOpen,
        marketClose,
        marketName,
        currentHour,
        currentTime: new Date().toISOString(),
        isWeekend,
        isOpen: userContext.value.market.marketHours.isOpen,
        session: userContext.value.timing.marketSession,
        country: userContext.value.location.country,
        timezone: userContext.value.location.timezone
      })
      
      // Helper: build localized time string
      const formatHHmm = (hoursFloat: number) => {
        const h = Math.floor(hoursFloat)
        const m = Math.round((hoursFloat % 1) * 60)
        // Use 24h for non-English locales; 12h for English to keep existing style
        if (locale.value === 'en') {
          const date = new Date()
          date.setHours(h, m, 0, 0)
          return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        } else {
          return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
        }
      }

      setLocalizedMarketStatus()
      
      console.log('📊 Market status generated:', {
        country,
        marketName,
        session: userContext.value.timing.marketSession,
        isOpen: userContext.value.market.marketHours.isOpen,
        status: personalizedContent.value.marketStatus
      })
      
      // Track user behavior (simplified)
      trackUserBehavior()
      
    } catch (error) {
      console.warn('Error initializing user context:', error)
    }
    
    // If non-English, finalize immediately to avoid flicker and English variants
    if (locale.value !== 'en') {
      // Show base localized headline first, then personalize after 3s
      setLocalizedMarketStatus()
      setTimeout(async () => {
        isLoading.value = false
        await generatePersonalizedContent()
      }, 3000)
      return
    }

    // Check if PostHog is available and wait for feature flags (English only)
    if (typeof window !== 'undefined' && (window as any).posthog) {
      const posthog = (window as any).posthog
      
      // Helper to compute stable hash from flags + locale state
      const computeFlagsHash = () => {
        try {
          // PostHog method to get all active flags
          const flags = posthog.getAllFlags ? posthog.getAllFlags() : (posthog.getFeatureFlags ? posthog.getFeatureFlags() : {})
          const flagEntries = Object.entries(flags || {})
          const flagData = flagEntries.map(([key, value]) => [key, value, posthog.getFeatureFlagPayload(key)])
          return JSON.stringify({ locale: locale.value, flagData })
        } catch (error) {
          console.warn('Error computing flags hash:', error)
          return JSON.stringify({ locale: locale.value, error: error.message })
        }
      }
      
      // Guarded personalization function
      const applyPersonalizationIfNeeded = async (force = false) => {
        const currentHash = computeFlagsHash()
        console.log('🔍 PersonalizationCheck:', { force, currentHash, lastAppliedFlagsHash })
        
        if (!force && currentHash === lastAppliedFlagsHash) {
          console.log('⏭️ PostHog flags unchanged, skipping personalization')
          return
        }
        
        lastAppliedFlagsHash = currentHash
        console.log('🎯 PostHog flags changed, applying personalization')
        console.log('🔄 Current location:', userContext.value.location)
        console.log('🔄 Market timing:', userContext.value.timing)
        
        isLoading.value = false
        await generatePersonalizedContent()
        setLocalizedMarketStatus()
        
        console.log('✅ Personalization applied, current headline:', personalizedContent.value.headline)
      }
      
      // Register onFeatureFlags callback only once
      if (!postHogCallbackRegistered && typeof posthog.onFeatureFlags === 'function') {
        postHogCallbackRegistered = true
        
        posthog.onFeatureFlags(() => {
          console.log('📡 PostHog onFeatureFlags callback triggered')
          // Debounce to handle rapid multiple callbacks
          setTimeout(() => {
            applyPersonalizationIfNeeded(false)
          }, 100)
        })
        
        console.log('✅ PostHog onFeatureFlags callback registered')
      }
      
      // Initial personalization after delay (for first load)
      setTimeout(async () => {
        await applyPersonalizationIfNeeded(true)
      }, 2000)
      
    } else {
      // Fallback if PostHog is not available
      console.log('⚠️ PostHog not available, using fallback personalization')
      setTimeout(async () => {
        isLoading.value = false
        await generatePersonalizedContent()
      }, 2000)
    }
  }

  // Track initialization state to prevent duplicates
  let isInitialized = false
  let featureFlagsCallbackSet = false
  let lastAppliedFlagsHash: string | null = null
  let postHogCallbackRegistered = false

  // Re-localize after language fully switches
  if (onLanguageSwitched) {
    onLanguageSwitched(async () => {
      // Reset retry counter so localized variants can load after switch
      nonEnVariantRetryCount.value = 0
      nonEnVariantIndex.value = 0
      // Stop any existing rotation (e.g., switching FR -> EN)
      if (updateInterval) {
        clearInterval(updateInterval)
        updateInterval = null
      }
      if (nonEnRetryTimer) {
        clearTimeout(nonEnRetryTimer)
        nonEnRetryTimer = null
      }
      setLocalizedMarketStatus()
      await generatePersonalizedContent()
    })
  }

  // Cleanup function to clear intervals
  const cleanup = () => {
    if (updateInterval) {
      clearInterval(updateInterval)
      updateInterval = null
    }
    if (nonEnRetryTimer) {
      clearTimeout(nonEnRetryTimer)
      nonEnRetryTimer = null
    }
  }
  
  // Hero interaction tracking for conversion analysis
  const trackHeroInteraction = (action: 'view' | 'click' | 'cta_click', additionalData: any = {}) => {
    if (typeof window !== 'undefined' && (window as any).posthog) {
      const posthog = (window as any).posthog
      
      const eventData = {
        action,
        variant_id: variant.value,
        headline: personalizedContent.value.headline,
        subheadline: personalizedContent.value.subheadline,
        country: userContext.value.location.country,
        market_session: userContext.value.timing.marketSession,
        time_of_day: userContext.value.timing.timeOfDay,
        visit_count: userContext.value.preferences.visitCount,
        interaction_level: userContext.value.preferences.interactionLevel,
        timestamp: new Date().toISOString(),
        ...additionalData
      }
      
      // Track the interaction event
      posthog.capture(`hero_${action}`, eventData)
      
      // For CTA clicks, also track conversion funnel progress
      if (action === 'cta_click') {
        posthog.capture('conversion_funnel_hero_cta', {
          ...eventData,
          funnel_step: 'hero_cta_click',
          conversion_source: 'personalized_hero'
        })
      }
      
      console.log('📊 Hero interaction tracked:', action, eventData)
    }
  }
  
  // Track hero variant performance metrics
  const trackVariantPerformance = (metrics: {
    time_to_interaction?: number
    scroll_depth?: number
    engagement_score?: number
  }) => {
    if (typeof window !== 'undefined' && (window as any).posthog) {
      const posthog = (window as any).posthog
      
      posthog.capture('hero_variant_performance', {
        variant_id: variant.value,
        country: userContext.value.location.country,
        market_session: userContext.value.timing.marketSession,
        timestamp: new Date().toISOString(),
        ...metrics
      })
    }
  }
  
  // Expose reactive state and methods
  return {
    userContext: readonly(userContext),
    personalizedContent: readonly(personalizedContent),
    isLoading: readonly(isLoading),
    variant: readonly(variant),
    initializePersonalization,
    generatePersonalizedContent,
    rotatePersonalizationOption,
    trackHeroInteraction,
    trackVariantPerformance,
    cleanup
  }
}
