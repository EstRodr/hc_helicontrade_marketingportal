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
    marketSession: 'pre-market' | 'market' | 'after-hours' | 'closed'
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

// Location and market mapping
const locationMarketMap: Record<string, {
  exchange: string
  indices: string[]
  currency: string
  timezone: string
}> = {
  'US': { exchange: 'NYSE', indices: ['SPY', 'QQQ', 'DIA'], currency: 'USD', timezone: 'America/New_York' },
  'GB': { exchange: 'LSE', indices: ['FTSE', 'UKX'], currency: 'GBP', timezone: 'Europe/London' },
  'DE': { exchange: 'XETRA', indices: ['DAX', 'MDAX'], currency: 'EUR', timezone: 'Europe/Berlin' },
  'FR': { exchange: 'EPA', indices: ['CAC', 'SBF'], currency: 'EUR', timezone: 'Europe/Paris' },
  'SE': { exchange: 'OMX', indices: ['OMXS30', 'OMXSPI'], currency: 'SEK', timezone: 'Europe/Stockholm' },
  'JP': { exchange: 'TSE', indices: ['N225', 'TOPIX'], currency: 'JPY', timezone: 'Asia/Tokyo' },
  'CN': { exchange: 'SSE', indices: ['SHCOMP', 'CSI300'], currency: 'CNY', timezone: 'Asia/Shanghai' },
  'AU': { exchange: 'ASX', indices: ['XAO', 'XJO'], currency: 'AUD', timezone: 'Australia/Sydney' },
  'CA': { exchange: 'TSX', indices: ['GSPTSE', 'TSX'], currency: 'CAD', timezone: 'America/Toronto' },
  'IN': { exchange: 'NSE', indices: ['NIFTY', 'SENSEX'], currency: 'INR', timezone: 'Asia/Kolkata' },
  'BR': { exchange: 'BVSP', indices: ['IBOV', 'BVSP'], currency: 'BRL', timezone: 'America/Sao_Paulo' },
  'default': { exchange: 'NYSE', indices: ['SPY', 'QQQ', 'DIA'], currency: 'USD', timezone: 'America/New_York' }
}

export const usePersonalization = () => {
  // Track intervals for cleanup
  let updateInterval: ReturnType<typeof setInterval> | null = null
  
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

  // Get user's location and timezone
  const detectLocation = async () => {
    try {
      // Use browser timezone as primary method (more reliable)
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      userContext.value.location.timezone = timezone
      
      // Infer location from timezone (more reliable than IP APIs)
      if (timezone.includes('Stockholm') || timezone.includes('Europe/Stockholm')) {
        userContext.value.location.countryCode = 'SE'
        userContext.value.location.country = 'Sweden'
        userContext.value.location.city = 'Stockholm'
        userContext.value.location.currency = 'SEK'
      } else if (timezone.includes('Europe/London')) {
        userContext.value.location.countryCode = 'GB'
        userContext.value.location.country = 'United Kingdom'
      } else if (timezone.includes('Europe/Berlin') || timezone.includes('Europe/Amsterdam')) {
        userContext.value.location.countryCode = 'DE'
        userContext.value.location.country = 'Germany'
        userContext.value.location.currency = 'EUR'
      } else if (timezone.includes('Europe/Paris')) {
        userContext.value.location.countryCode = 'FR'
        userContext.value.location.country = 'France'
        userContext.value.location.currency = 'EUR'
      } else if (timezone.includes('America/New_York') || timezone.includes('America/Chicago')) {
        userContext.value.location.countryCode = 'US'
        userContext.value.location.country = 'United States'
        userContext.value.location.currency = 'USD'
      } else if (timezone.includes('Asia/Tokyo')) {
        userContext.value.location.countryCode = 'JP'
        userContext.value.location.country = 'Japan'
        userContext.value.location.currency = 'JPY'
      } else {
        // Default fallback
        userContext.value.location.countryCode = 'US'
        userContext.value.location.country = 'United States'
        userContext.value.location.currency = 'USD'
      }
      
      // Set language from browser
      userContext.value.location.language = navigator.language?.split('-')[0] || 'en'
      
    } catch (error) {
      console.warn('Location detection failed, using defaults:', error)
      // Fallback to US defaults
      userContext.value.location = {
        country: 'United States',
        countryCode: 'US',
        region: '',
        city: '',
        timezone: 'America/New_York',
        currency: 'USD',
        language: 'en'
      }
    }
  }

  // Determine market hours and session
  const calculateMarketHours = () => {
    const now = new Date()
    const marketInfo = locationMarketMap[userContext.value.location.countryCode] || locationMarketMap.default
    
    userContext.value.market.primaryExchange = marketInfo.exchange
    userContext.value.market.localIndices = marketInfo.indices
    userContext.value.location.currency = marketInfo.currency

    // Simplified market hours (NYSE as example)
    const marketOpen = new Date(now)
    marketOpen.setHours(9, 30, 0, 0) // 9:30 AM
    const marketClose = new Date(now)
    marketClose.setHours(16, 0, 0, 0) // 4:00 PM

    const isWeekday = now.getDay() >= 1 && now.getDay() <= 5
    const currentHour = now.getHours()

    userContext.value.timing.isWeekend = !isWeekday
    userContext.value.timing.dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' })

    if (isWeekday && now >= marketOpen && now <= marketClose) {
      userContext.value.market.marketHours.isOpen = true
      userContext.value.timing.marketSession = 'market'
      userContext.value.market.marketHours.nextClose = marketClose
    } else if (isWeekday && currentHour >= 4 && currentHour < 9.5) {
      userContext.value.timing.marketSession = 'pre-market'
      userContext.value.market.marketHours.nextOpen = marketOpen
    } else if (isWeekday && currentHour >= 16 && currentHour < 20) {
      userContext.value.timing.marketSession = 'after-hours'
      const nextOpen = new Date(now)
      nextOpen.setDate(nextOpen.getDate() + 1)
      nextOpen.setHours(9, 30, 0, 0)
      userContext.value.market.marketHours.nextOpen = nextOpen
    } else {
      userContext.value.timing.marketSession = 'closed'
      const nextOpen = new Date(now)
      if (now.getDay() === 6) { // Saturday
        nextOpen.setDate(nextOpen.getDate() + 2) // Monday
      } else if (now.getDay() === 0) { // Sunday
        nextOpen.setDate(nextOpen.getDate() + 1) // Monday
      } else {
        nextOpen.setDate(nextOpen.getDate() + 1) // Next day
      }
      nextOpen.setHours(9, 30, 0, 0)
      userContext.value.market.marketHours.nextOpen = nextOpen
    }

    userContext.value.market.marketHours.localTime = now.toLocaleTimeString('en-US', { 
      timeZone: userContext.value.location.timezone,
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    })
  }

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

  // Rotating personalization message options
  const personalizationOptions = [
    {
      // Option A (empowerment frame)
      headline: (country: string) => `Global insight, built for ${country} markets`,
      subheadline: (city: string, index: string) => `From ${city} to Wall Street, turn real‑time moves in ${index} into smarter decisions.`
    },
    {
      // Option B (momentum/dynamism)
      headline: (country: string) => `AI eyes on ${country} markets — opportunity never sleeps`,
      subheadline: (city: string) => `From ${city} to Wall Street, track every market pulse, 24/7.`
    },
    {
      // Option C (user‑centric)
      headline: (country: string) => `Your edge in ${country}'s markets`,
      subheadline: (city: string, index: string) => `With AI scanning ${index} day and night, you focus on making confident moves.`
    },
    {
      // Option D (clean & modern)
      headline: (country: string) => `${country} markets, redefined by intelligence`,
      subheadline: (city: string, index: string) => `From ${city} to Wall Street, stay connected to every swing in ${index}.`
    },
    {
      // Option E (short, punchy, younger feel)
      headline: (country: string) => `Trade ${country} markets with global AI power`,
      subheadline: (city: string, index: string) => `From ${city} to Wall Street, our AI keeps an eye on ${index} so you don't miss a beat.`
    }
  ]

  // Production-ready personalization option selection with fallback hierarchy
  const getPersonalizationOptionIndex = (): number => {
    // Priority 0: Check if personalization is enabled via PostHog kill switch
    if (typeof window !== 'undefined' && (window as any).posthog) {
      const posthog = (window as any).posthog
      
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
          optionIndex = parseInt(variantValue) % personalizationOptions.length
        } else {
          // Handle variant keys like 'variant_0', 'variant_1', etc.
          const match = variantValue.match(/variant[_-]?(\d+)/i)
          if (match) {
            optionIndex = parseInt(match[1]) % personalizationOptions.length
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
        posthog.capture('personalization_variant_assigned', {
          variant: optionIndex,
          variant_key: variantValue,
          flag_name: flagName,
          source: 'posthog',
          enabled: true,
          country: userContext.value.location.country || 'Sweden',
          market_session: userContext.value.timing.marketSession,
          headline: personalizationOptions[optionIndex].headline(userContext.value.location.country || 'Sweden'),
          timestamp: new Date().toISOString()
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
      return parseInt(runtimeOption) % personalizationOptions.length
    }
    
    // Priority 4: Environment variable fallback
    const envOption = process.env.PERSONALIZATION_OPTION
    if (envOption && !isNaN(parseInt(envOption))) {
      console.log('🌍 Using env option:', envOption)
      return parseInt(envOption) % personalizationOptions.length
    }
    
    // Priority 5: Intelligent default based on user context
    const { location, timing } = userContext.value
    
    // Smart defaults based on market conditions
    if (timing.marketSession === 'pre-market') {
      console.log('📈 Using pre-market default: Option 1 (AI eyes)')
      return 1 // "AI eyes on markets — opportunity never sleeps"
    } else if (timing.marketSession === 'after-hours') {
      console.log('🌙 Using after-hours default: Option 2 (Your edge)')
      return 2 // "Your edge in markets"
    } else if (location.country === 'Sweden') {
      console.log('🇸🇪 Using Sweden default: Option 0 (Global insight)')
      return 0 // "Global insight, built for Sweden markets"
    }
    
    // Final fallback: Week-based cycling
    const weekNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7))
    console.log('📅 Using week-based fallback:', weekNumber % personalizationOptions.length)
    return weekNumber % personalizationOptions.length
  }
  
  // Make currentOptionIndex reactive to config changes
  const currentOptionIndex = computed(() => getPersonalizationOptionIndex())

  // Generate personalized content based on context
  const generatePersonalizedContent = () => {
    const { location, timing, market, preferences } = userContext.value
    
    // Personalization control - easy to toggle
    const ENABLE_PERSONALIZATION = true
    const ENABLE_SMOOTH_TRANSITION = true // Show default first, then personalize
    
    if (!ENABLE_PERSONALIZATION) {
      // Use default non-personalized content
      personalizedContent.value = {
        greeting: 'Welcome',
        headline: 'AI finds the opportunities, you make the decisions',
        subheadline: 'Sleep better, trade smarter with 24/7 AI market monitoring.',
        cta: 'Get started for free',
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
        greeting: 'Welcome',
        headline: 'AI finds the opportunities, you make the decisions',
        subheadline: 'Sleep better, trade smarter with 24/7 AI market monitoring.',
        cta: 'Get started for free',
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
    
    // Get rotating personalization option
    const currentOption = personalizationOptions[currentOptionIndex.value]
    const country = location.country || 'global'
    const city = location.city || 'your city'
    const primaryIndex = market.localIndices[0] || 'SPY'
    
    console.log('🎯 Personalization Debug:', {
      optionIndex: currentOptionIndex.value,
      country,
      city,
      primaryIndex,
      isLoading: isLoading.value,
      marketSession: timing.marketSession
    })
    
    // Generate personalized headlines and subheadlines using the selected option
    let headline = currentOption.headline(country)
    let subheadline = currentOption.subheadline(city, primaryIndex)
    
    console.log('📝 Generated content:', { headline, subheadline })
    
    // Only override with market-specific messages for pre-market and after-hours
    // Keep personalized content during market hours
    if (timing.marketSession === 'pre-market') {
      headline = 'Pre-market is heating up — Get ready for the open'
      subheadline = 'AI detected overnight moves. See what\'s setting up before markets open.'
    } else if (timing.marketSession === 'after-hours') {
      headline = 'After-hours action continues — AI never stops'
      subheadline = 'Extended hours present unique opportunities. Let AI catch what others miss.'
    }
    // Note: During market hours, we now use the personalized options instead of generic "Markets are LIVE"
    
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

    personalizedContent.value = {
      greeting,
      headline,
      subheadline,
      cta: ctas[preferences.interactionLevel],
      urgency,
      marketStatus,
      relevantSymbols: market.localIndices.concat(['BTC', 'ETH']).slice(0, 5),
      localizedCurrency: getCurrencySymbol(location.currency),
      timeZoneMessage: `Local time: ${market.marketHours.localTime} ${location.timezone.split('/')[1]}`
    }
  }

  // Function to rotate to next personalization option
  const rotatePersonalizationOption = () => {
    currentOptionIndex.value = (currentOptionIndex.value + 1) % personalizationOptions.length
    generatePersonalizedContent()
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

  // Initialize personalization system with PostHog integration
  const initializePersonalization = async () => {
    console.log('🚀 Initializing personalization system...')
    
    // Set initial loading state
    isLoading.value = true
    
    // Initialize user context with basic data
    try {
      // Fetch user location (simplified)
      if (typeof window !== 'undefined') {
        // Try to get location from browser
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        userContext.value.location.timezone = timezone
        
        // Map timezone to country (comprehensive European mapping)
        if (timezone.includes('Stockholm') || timezone.includes('Europe/Stockholm')) {
          userContext.value.location.country = 'Sweden'
          userContext.value.location.city = 'Stockholm'
        } else if (timezone.includes('Europe/Berlin') || timezone.includes('Europe/Amsterdam') || timezone.includes('Europe/Brussels') || timezone.includes('Europe/Copenhagen') || timezone.includes('Europe/Oslo') || timezone.includes('Europe/Helsinki') || timezone.includes('Europe/Zurich') || timezone.includes('Europe/Vienna') || timezone.includes('Europe/Prague') || timezone.includes('Europe/Warsaw')) {
          // Central European Time zone - default to Sweden for Nordic/European users
          userContext.value.location.country = 'Sweden'
          userContext.value.location.city = 'Stockholm'
        } else if (timezone.includes('New_York') || timezone.includes('America/New_York') || timezone.includes('America/Chicago') || timezone.includes('America/Denver') || timezone.includes('America/Los_Angeles')) {
          userContext.value.location.country = 'United States'
          userContext.value.location.city = 'New York'
        } else if (timezone.includes('London') || timezone.includes('Europe/London')) {
          userContext.value.location.country = 'United Kingdom'
          userContext.value.location.city = 'London'
        } else {
          // Default to Sweden for European users
          userContext.value.location.country = 'Sweden'
          userContext.value.location.city = 'Stockholm'
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
      
      // Set market session and hours based on country
      const country = userContext.value.location.country || 'Sweden'
      let marketOpen = 9
      let marketClose = 17.5
      let marketName = 'OMX'
      
      console.log('🏢 Setting market for country:', country)
      
      // Set market hours based on country
      if (country === 'Sweden') {
        marketOpen = 9
        marketClose = 17.5 // 5:30 PM (17:30)
        marketName = 'OMX'
        userContext.value.market.localIndices = ['OMXS30']
        userContext.value.market.primaryExchange = 'OMX'
      } else if (country === 'United States') {
        marketOpen = 9.5 // 9:30 AM
        marketClose = 16 // 4:00 PM
        marketName = 'NYSE'
        userContext.value.market.localIndices = ['SPY', 'QQQ']
        userContext.value.market.primaryExchange = 'NYSE'
      } else if (country === 'United Kingdom') {
        marketOpen = 8
        marketClose = 16.5 // 4:30 PM
        marketName = 'LSE'
        userContext.value.market.localIndices = ['FTSE']
        userContext.value.market.primaryExchange = 'LSE'
      } else if (country === 'Germany') {
        marketOpen = 9
        marketClose = 17.5 // 5:30 PM
        marketName = 'XETRA'
        userContext.value.market.localIndices = ['DAX']
        userContext.value.market.primaryExchange = 'XETRA'
      } else if (country === 'France') {
        marketOpen = 9
        marketClose = 17.5 // 5:30 PM
        marketName = 'EPA'
        userContext.value.market.localIndices = ['CAC']
        userContext.value.market.primaryExchange = 'EPA'
      }
      
      // Determine market session
      const currentHour = hour + (now.getMinutes() / 60) // Include minutes for precision
      
      if (currentHour >= marketOpen && currentHour < marketClose) {
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
        isOpen: userContext.value.market.marketHours.isOpen,
        session: userContext.value.timing.marketSession
      })
      
      if (userContext.value.market.marketHours.isOpen) {
        const closeHour = Math.floor(marketClose)
        const closeMinutes = Math.round((marketClose % 1) * 60)
        const closeTime = closeHour + ':' + String(closeMinutes).padStart(2, '0')
        personalizedContent.value.marketStatus = `${marketName} is open • Live until ${closeTime} PM`
        console.log('✅ Market open status:', personalizedContent.value.marketStatus)
      } else if (userContext.value.timing.marketSession === 'pre-market') {
        const openHour = Math.floor(marketOpen)
        const openMinutes = Math.round((marketOpen % 1) * 60)
        const openTime = openHour + ':' + String(openMinutes).padStart(2, '0')
        personalizedContent.value.marketStatus = `${marketName} opens at ${openTime} AM`
        console.log('🌅 Pre-market status:', personalizedContent.value.marketStatus)
      } else if (userContext.value.timing.marketSession === 'after-hours') {
        personalizedContent.value.marketStatus = `${marketName} closed • After-hours trading`
        console.log('🌙 After-hours status:', personalizedContent.value.marketStatus)
      } else {
        personalizedContent.value.marketStatus = `${marketName} closed`
        console.log('🔒 Market closed status:', personalizedContent.value.marketStatus)
      }
      
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
    
    // Check if PostHog is available and wait for feature flags
    if (typeof window !== 'undefined' && (window as any).posthog) {
      const posthog = (window as any).posthog
      
      // Ensure flags are loaded before usage
      posthog.onFeatureFlags(() => {
        console.log('🎯 PostHog feature flags loaded')
        
        // Check if personalization is enabled
        const personalizationEnabled = posthog.isFeatureEnabled('marketing-homepage-headline-enable-personalization')
        console.log('🎛️ Personalization enabled:', personalizationEnabled)
        
        // Smooth transition: wait 2 seconds then show personalized content
        setTimeout(() => {
          isLoading.value = false
          generatePersonalizedContent()
        }, 2000)
      })
    } else {
      // Fallback if PostHog is not available
      console.log('⚠️ PostHog not available, using fallback personalization')
      setTimeout(() => {
        isLoading.value = false
        generatePersonalizedContent()
      }, 2000)
    }
  }

  // Cleanup function to clear intervals
  const cleanup = () => {
    if (updateInterval) {
      clearInterval(updateInterval)
      updateInterval = null
    }
  }
  
  // Expose reactive state and methods
  return {
    userContext: readonly(userContext),
    personalizedContent: readonly(personalizedContent),
    isLoading: readonly(isLoading),
    initializePersonalization,
    generatePersonalizedContent,
    rotatePersonalizationOption,
    cleanup
  }
}
