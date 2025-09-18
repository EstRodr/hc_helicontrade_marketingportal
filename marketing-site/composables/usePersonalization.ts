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

  // Track user preferences and behavior
  const trackUserBehavior = () => {
    const visitCount = parseInt(localStorage.getItem('helicon-visit-count') || '0') + 1
    const lastVisit = localStorage.getItem('helicon-last-visit')
    
    userContext.value.preferences.visitCount = visitCount
    userContext.value.preferences.lastVisit = lastVisit ? new Date(lastVisit) : null
    
    // Determine interaction level
    if (visitCount === 1) {
      userContext.value.preferences.interactionLevel = 'new'
    } else if (visitCount <= 3) {
      userContext.value.preferences.interactionLevel = 'browsing'
    } else if (visitCount <= 10) {
      userContext.value.preferences.interactionLevel = 'engaged'
    } else {
      userContext.value.preferences.interactionLevel = 'returning'
    }

    // Save current visit
    localStorage.setItem('helicon-visit-count', visitCount.toString())
    localStorage.setItem('helicon-last-visit', new Date().toISOString())
  }

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
    
    // Headlines based on market status and user level
    let headline = 'AI finds the opportunities, you make the decisions'
    let subheadline = 'Sleep better, trade smarter with 24/7 AI market monitoring.'
    
    if (market.marketHours.isOpen) {
      const currencyName = getCurrencyName(location.currency)
      headline = `Markets are LIVE — AI is watching for ${currencyName} opportunities`
      subheadline = `Don't miss today's moves. Our AI is scanning ${market.localIndices.join(', ')} right now.`
    } else if (timing.marketSession === 'pre-market') {
      headline = 'Pre-market is heating up — Get ready for the open'
      subheadline = 'AI detected overnight moves. See what\'s setting up before markets open.'
    } else if (timing.marketSession === 'after-hours') {
      headline = 'After-hours action continues — AI never stops'
      subheadline = 'Extended hours present unique opportunities. Let AI catch what others miss.'
    }
    
    // CTAs based on user engagement level
    const ctas = {
      new: 'Start free trial',
      browsing: 'See AI in action',
      engaged: 'Activate AI alerts',
      returning: 'Welcome back — Continue setup'
    }
    
    // Market status message
    let marketStatus = ''
    if (market.marketHours.isOpen) {
      marketStatus = `${market.primaryExchange} is open • Live until ${market.marketHours.nextClose?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`
    } else if (market.marketHours.nextOpen) {
      marketStatus = `${market.primaryExchange} opens in ${getTimeUntil(market.marketHours.nextOpen)}`
    }

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

  // Initialize personalization
  const initializePersonalization = async () => {
    isLoading.value = true
    
    // Show default content immediately
    generatePersonalizedContent()
    
    try {
      // Run all detection functions
      await detectLocation()
      calculateMarketHours()
      calculateTimeOfDay()
      trackUserBehavior()
      
      // Smooth transition: wait 3 seconds then show personalized content
      setTimeout(() => {
        isLoading.value = false
        generatePersonalizedContent()
      }, 3000)
      
      // Set up real-time updates
      setInterval(() => {
        calculateMarketHours()
        calculateTimeOfDay()
        generatePersonalizedContent()
      }, 60000) // Update every minute
      
    } catch (error) {
      console.error('Personalization initialization error:', error)
      // Still show personalized content even if some detection fails
      setTimeout(() => {
        isLoading.value = false
        generatePersonalizedContent()
      }, 3000)
    }
  }

  // Expose reactive state and methods
  return {
    userContext: readonly(userContext),
    personalizedContent: readonly(personalizedContent),
    isLoading: readonly(isLoading),
    initializePersonalization,
    generatePersonalizedContent
  }
}
