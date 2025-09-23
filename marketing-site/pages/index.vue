<script setup lang="ts">
const config = useRuntimeConfig()
const { $t, locale } = useI18n()

// Debug: Log current locale
console.log('Current locale:', locale.value)
console.log('Translation test:', $t('hero.joinBeta'))

// Static SEO for faster loading - no reactive dependencies
useHead({
  title: 'HeliconTrade — Where Traders Research, Then Commit',
  meta: [
    { name: 'description', content: 'AI-powered trading platform that monitors global markets 24/7 to find opportunities matching your strategy. Sleep better while AI watches the markets for you.' },
    { name: 'keywords', content: 'trading platform, market analysis, charts, real-time data, trading community, financial markets' }
  ]
})

// Search functionality
const searchQuery = ref('')
const showSearchDropdown = ref(false)
const searchResults = ref([])
const selectedIndex = ref(-1)

// Popular searches similar to TradingView
const popularSymbols = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'BTC', 'ETH', 'SPY']

// Market summary data (simulating real-time data like TradingView)
const marketData = ref([
  // Major Indices
  { symbol: 'SPY', name: 'S&P 500 ETF', price: 445.67, change: +2.34, changePercent: +0.53, category: 'index' },
  { symbol: 'QQQ', name: 'Nasdaq 100', price: 378.92, change: +1.87, changePercent: +0.50, category: 'index' },
  { symbol: 'DIA', name: 'Dow Jones', price: 347.23, change: -0.45, changePercent: -0.13, category: 'index' },
  
  // Popular Stocks
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.34, change: +2.45, changePercent: +1.31, category: 'stock' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 875.22, change: +12.87, changePercent: +1.49, category: 'stock' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.91, change: -3.42, changePercent: -1.35, category: 'stock' },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.67, change: +8.23, changePercent: +2.02, category: 'stock' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 142.38, change: +1.89, changePercent: +1.35, category: 'stock' },
  { symbol: 'META', name: 'Meta Platforms', price: 523.45, change: -5.67, changePercent: -1.07, category: 'stock' },
  
  // Crypto
  { symbol: 'BTC', name: 'Bitcoin', price: 67234, change: +1240, changePercent: +1.88, category: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 3456, change: -89, changePercent: -2.51, category: 'crypto' },
])

// AI Platform stats
const platformStats = [
  { value: '24/7', label: 'Market Monitoring', subtext: 'never stops watching' },
  { value: '10,000+', label: 'Assets Scanned', subtext: 'across global markets' },
  { value: '95%+', label: 'Pattern Accuracy', subtext: 'AI-powered detection' },
  { value: '<0.3ms', label: 'Alert Speed', subtext: 'lightning-fast notifications' }
]

// Static content for faster loading
const homepageContent = ref({
  page_title: 'HeliconTrade — Where Traders Research, Then Commit',
  meta_description: 'AI-powered trading platform that monitors global markets 24/7 to find opportunities matching your strategy.',
  cta_primary: 'Get started for free',
  cta_secondary: 'View demo',
  cta_disclaimer: 'Start free — No credit card required',
  value_prop_1: 'AI-powered opportunity discovery',
  value_prop_2: '24/7 market scanning',
  value_prop_3: 'Personalized to your strategy'
})

// Static features for faster loading
const featuresData = ref({
  featured: [
    {
      title: 'Opportunity Discovery',
      description: 'AI continuously scans markets to find setups that match your trading style and risk preferences. Never miss a profitable opportunity again.',
      short_description: 'AI-powered market scanning',
      category: 'Analysis'
    },
    {
      title: 'Smart Alerts',
      description: 'Get notified instantly when conditions align with your strategy — no more staring at screens all day.',
      short_description: 'Sleep better with smart notifications',
      category: 'Trading'
    },
    {
      title: 'Everywhere Coverage',
      description: 'We monitor global markets across all asset classes so you can focus on what matters most to your trading success.',
      short_description: 'Global market monitoring',
      category: 'Trading'
    },
    {
      title: 'Personalized Intelligence',
      description: 'Our AI learns your preferences and refines recommendations to match your unique trading style and risk tolerance.',
      short_description: 'AI that learns your style',
      category: 'Analysis'
    }
  ],
  additional: [
    {
      title: 'Smart Alerts Pro',
      description: 'Get notified instantly when your custom conditions are met across all your favorite instruments and setups.',
      short_description: 'Real-time notifications',
      category: 'Trading'
    },
    {
      title: 'AI Trading Assistant',
      description: 'Let our AI help you identify profitable trading opportunities with advanced pattern recognition and market analysis.',
      short_description: 'AI-powered insights',
      category: 'Analysis'
    },
    {
      title: 'Market News Integration',
      description: 'Stay ahead with real-time financial news and market updates integrated directly into your trading workflow.',
      short_description: 'Real-time market news',
      category: 'Analysis'
    },
    {
      title: 'Precision Trading Tools',
      description: 'Advanced algorithms and data analysis for more accurate trade timing and enhanced execution precision.',
      short_description: 'Enhanced accuracy',
      category: 'Trading'
    },
    {
      title: 'Multi-Platform Integration',
      description: 'Connect with your favorite brokers and trading platforms seamlessly for unified portfolio management.',
      short_description: '20+ broker integrations',
      category: 'Trading'
    },
    {
      title: 'Educational Resources',
      description: 'Learn from expert analysis, webinars, and comprehensive trading guides to improve your skills.',
      short_description: 'Expert-led content',
      category: 'Education'
    }
  ]
})

// Load CMS content server-side for immediate display
const { getHomepageContent, getFeatures } = useStrapi()

// Server-side data fetching with fallbacks
try {
  const [cmsContent, [featured, additional]] = await Promise.all([
    getHomepageContent().catch(() => null),
    Promise.all([
      getFeatures(true).catch(() => []),
      getFeatures(false).catch(() => [])
    ])
  ])
  
  // Update content if CMS data is available
  if (cmsContent && Object.keys(cmsContent).length > 0) {
    homepageContent.value = { ...homepageContent.value, ...cmsContent }
    console.log('✅ Loaded homepage content from Strapi:', cmsContent.hero_headline_default)
  }
  // Only use CMS features if we have enough additional features (6), otherwise use static
  if (featured?.length > 0 || (additional?.length > 0 && additional.length >= 6)) {
    featuresData.value = {
      featured: featured || featuresData.value.featured,
      additional: additional?.length >= 6 ? additional : featuresData.value.additional
    }
    console.log('✅ Using CMS features:', { featuredCount: featured?.length || 0, additionalCount: additional?.length || 0 })
  } else {
    console.log('📋 Using static features fallback - CMS has insufficient features')
  }
} catch (error) {
  console.warn('CMS content loading failed (using static fallback):', error)
}

// Extract features from data
const platformFeatures = computed(() => featuresData.value?.featured || [])
const additionalFeatures = computed(() => featuresData.value?.additional || [])

// Helper functions for mapping
function getIconName(iconField: any, title?: string): string {
  const iconMap: Record<string, string> = {
    'Opportunity Discovery': 'analytics',
    'Smart Alerts': 'speed', 
    'Smart Alerts Pro': 'bell',
    'Everywhere Coverage': 'automation',
    'Personalized Intelligence': 'social',
    'AI Trading Assistant': 'brain',
    'Market News Integration': 'news',
    'Precision Trading Tools': 'target',
    'Multi-Platform Integration': 'connect',
    'Educational Resources': 'education'
  }
  
  if (title && iconMap[title]) {
    return iconMap[title]
  }
  
  return 'analytics'
}

function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    'Trading': 'blue',
    'Analysis': 'purple', 
    'Education': 'green',
    'Security': 'orange'
  }
  return colorMap[category] || 'blue'
}

// Map features to template format
const mappedPlatformFeatures = computed(() => {
  return platformFeatures.value.map(feature => ({
    ...feature,
    svg: getIconName(feature.icon, feature.title),
    color: getCategoryColor(feature.category),
    highlight: feature.short_description || '',
    stats: feature.short_description || ''
  }))
})

const mappedAdditionalFeatures = computed(() => {
  return additionalFeatures.value.map(feature => ({
    ...feature,
    svg: getIconName(feature.icon, feature.title),
    color: getCategoryColor(feature.category),
    stats: feature.short_description || ''
  }))
})

// Market categories for filtering
const marketCategories = [
  { id: 'all', name: 'All Markets', active: true },
  { id: 'indices', name: 'Indices', active: false },
  { id: 'stocks', name: 'Stocks', active: false },
  { id: 'crypto', name: 'Crypto', active: false }
]

const activeCategory = ref('all')

// Computed filtered market data
const filteredMarketData = computed(() => {
  if (activeCategory.value === 'all') {
    return marketData.value.slice(0, 8)
  }
  return marketData.value.filter(item => {
    if (activeCategory.value === 'indices') return item.category === 'index'
    if (activeCategory.value === 'stocks') return item.category === 'stock'  
    if (activeCategory.value === 'crypto') return item.category === 'crypto'
    return true
  })
})

// Rest of search and navigation functions (same as original)
// ... [I'll keep the rest of the functions the same for brevity]
function navigateToSymbol(symbol: string) {
  navigateTo(`/symbol/${symbol.toLowerCase()}`)
}

// Use centralized redirect utilities
const { redirectToApp, startTrading } = useAppRedirects()

function setActiveCategory(categoryId: string) {
  activeCategory.value = categoryId
  marketCategories.forEach(cat => {
    cat.active = cat.id === categoryId
  })
}

// Handle location detection for analytics
function onLocationDetected(location: any) {
  console.log('User location detected:', location)
  // You could send this to analytics here
}

// Auto-update market data (simulate real-time updates)
onMounted(() => {
  setInterval(() => {
    marketData.value.forEach(item => {
      // Simulate small price movements
      const movement = (Math.random() - 0.5) * 0.002 // ±0.1% max movement
      const newPrice = item.price * (1 + movement)
      const change = newPrice - item.price
      const changePercent = (change / item.price) * 100
      
      item.price = Math.round(newPrice * 100) / 100
      item.change = Math.round(change * 100) / 100
      item.changePercent = Math.round(changePercent * 100) / 100
    })
  }, 3000) // Update every 3 seconds for demo
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <!-- Hero Section - Simplified PersonalizedHero -->
    <section class="mobile-content relative pt-20 pb-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 overflow-hidden">
      <!-- Animated Background Particles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
        <div class="particle particle-5"></div>
      </div>
      
      <!-- Grid Pattern Overlay -->
      <div class="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div class="grid-pattern"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Personalized Hero Content -->
        <PersonalizedHero 
          :content="homepageContent"
          @cta-click="startTrading" 
          @location-detected="onLocationDetected"
        />

        <!-- Search Bar - Same as original -->
        <div class="max-w-2xl mx-auto mb-8 px-4 sm:px-0">
          <div class="relative">
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Try: AAPL, BTC, TSLA, SPY..."
                class="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-l-xl sm:rounded-r-none focus:border-blue-500 focus:ring-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              >
              <button
                class="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl sm:rounded-l-none sm:rounded-r-xl transition-colors touch-target"
              >
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Popular searches -->
          <div class="mt-4">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Popular:</p>
            <div class="flex flex-wrap justify-center gap-2">
              <button
                v-for="symbol in popularSymbols.slice(0, 8)"
                :key="symbol"
                @click="navigateToSymbol(symbol)"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors cursor-pointer"
              >
                {{ symbol }}
              </button>
            </div>
          </div>
        </div>

        <!-- CTAs -->
        <div class="mobile-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 mt-8 px-4 sm:px-0">
          <button
            @click="startTrading"
            class="mobile-button modern-button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all hover:scale-105 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 touch-target"
          >
            {{ $t('hero.joinBeta') }}
          </button>
          <button
            class="mobile-button modern-button glass-effect border-2 border-white/20 hover:border-blue-500/50 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all hover:scale-105 backdrop-blur-sm touch-target"
          >
            {{ homepageContent?.cta_secondary || $t('navigation.features') }}
          </button>
        </div>

        <!-- Value indicators -->
        <div class="text-sm text-gray-500 dark:text-gray-400 text-center px-4 sm:px-0">
          <p class="mb-3 sm:mb-2">{{ homepageContent?.cta_disclaimer || $t('hero.disclaimer') }}</p>
          <div class="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-6 max-w-2xl mx-auto">
            <span class="flex items-center justify-center">✓ {{ homepageContent?.value_prop_1 || $t('hero.valueProp1') }}</span>
            <span class="flex items-center justify-center">✓ {{ homepageContent?.value_prop_2 || $t('hero.valueProp2') }}</span>
            <span class="flex items-center justify-center">✓ {{ homepageContent?.value_prop_3 || $t('hero.valueProp3') }}</span>
          </div>
        </div>
        
        <!-- Hero Dashboard Mockup with AI Insights -->
        <div class="relative z-10 mt-8 sm:mt-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
              <!-- Main Dashboard Mockup -->
              <div class="lg:col-span-2 flex justify-center">
                <div class="mobile-dashboard dashboard-mockup bg-gray-900 rounded-2xl p-3 sm:p-6 shadow-2xl border border-gray-700 max-w-4xl w-full overflow-hidden">
            <!-- Dashboard Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                <span class="text-gray-400 text-sm ml-4">HeliconTrade Platform</span>
              </div>
              <div class="text-green-400 text-sm font-medium flex items-center">
                <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                LIVE TRADING
              </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6 min-w-0">
              <!-- Main Chart Area -->
              <div class="lg:col-span-2 min-w-0">
                <div class="bg-gray-800 rounded-xl p-2 sm:p-4 min-w-0">
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                    <div class="flex items-center space-x-2 sm:space-x-3">
                      <span class="text-white font-bold text-base sm:text-lg">BTC/USD</span>
                      <span class="text-green-400 text-xs sm:text-sm">+2.45% ($67,234)</span>
                    </div>
                    <div class="flex space-x-1 sm:space-x-2">
                      <button class="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs rounded">1D</button>
                      <button class="px-2 sm:px-3 py-1 text-gray-400 hover:text-white text-xs rounded">1W</button>
                      <button class="px-2 sm:px-3 py-1 text-gray-400 hover:text-white text-xs rounded">1M</button>
                    </div>
                  </div>
                  <!-- Enhanced Mock Chart -->
                  <div class="h-32 sm:h-48 relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-2 sm:p-4">
                    <svg class="w-full h-full" viewBox="0 0 400 150">
                      <defs>
                        <linearGradient id="chartGradientHero" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:0.4" />
                          <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0.1" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/> 
                          </feMerge>
                        </filter>
                      </defs>
                      <!-- Grid lines -->
                      <defs><pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#374151" stroke-width="0.5" opacity="0.3"/>
                      </pattern></defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      <!-- Chart line with glow -->
                      <path d="M0,120 Q60,40 120,60 T240,45 T400,30" stroke="#3B82F6" stroke-width="3" fill="none" filter="url(#glow)" class="animate-pulse"/>
                      <!-- Area fill -->
                      <path d="M0,120 Q60,40 120,60 T240,45 T400,30 L400,150 L0,150 Z" fill="url(#chartGradientHero)"/>
                      <!-- Price points -->
                      <circle cx="120" cy="60" r="4" fill="#10B981" opacity="0.8"/>
                      <circle cx="240" cy="45" r="4" fill="#10B981" opacity="0.8"/>
                      <circle cx="400" cy="30" r="4" fill="#10B981" opacity="0.8"/>
                    </svg>
                    <!-- Live price indicator -->
                    <div class="absolute top-2 right-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                      <span class="animate-pulse">● LIVE</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Sidebar with stats -->
              <div class="space-y-4">
                <!-- Portfolio Stats -->
                <div class="bg-gray-800 rounded-xl p-4">
                  <h4 class="text-white font-semibold mb-3 text-sm">Portfolio Overview</h4>
                  <div class="space-y-3">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-400 text-xs">Total Value</span>
                      <span class="text-white font-bold">$125,847</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-400 text-xs">Today's P&L</span>
                      <span class="text-green-400 font-bold">+$3,247</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-400 text-xs">Win Rate</span>
                      <span class="text-blue-400 font-bold">73.2%</span>
                    </div>
                  </div>
                </div>
                
                <!-- AI Insights -->
                <div class="bg-gray-800 rounded-xl p-4">
                  <h4 class="text-white font-semibold mb-3 text-sm">AI Insights</h4>
                  <div class="space-y-2">
                    <div class="p-2 bg-blue-900/30 rounded-lg border border-blue-500/30">
                      <p class="text-blue-300 text-xs">🤖 BTC bullish pattern detected</p>
                      <p class="text-gray-400 text-xs">Confidence: 87%</p>
                    </div>
                    <div class="p-2 bg-green-900/30 rounded-lg border border-green-500/30">
                      <p class="text-green-300 text-xs">📈 Strong buying pressure</p>
                      <p class="text-gray-400 text-xs">Volume: +45%</p>
                    </div>
                  </div>
                </div>
                
                <!-- Top Movers -->
                <div class="bg-gray-800 rounded-xl p-4">
                  <h4 class="text-white font-semibold mb-3 text-sm">Top Movers</h4>
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-300 text-xs">AAPL</span>
                      <span class="text-green-400 text-xs">+1.31%</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-300 text-xs">NVDA</span>
                      <span class="text-green-400 text-xs">+1.49%</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-300 text-xs">TSLA</span>
                      <span class="text-red-400 text-xs">-1.35%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                </div>
              </div>
            
              <!-- AI Insights Feed -->
              <div class="mobile-insights lg:col-span-1">
                <AIInsightsFeed />
              </div>
            </div>
          </div>
      </div>
      </div>
    </section>

    <!-- Live Market Summary - TradingView Style -->
    <section class="py-8 bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Market Category Tabs -->
        <div class="flex justify-center mb-6 px-4">
          <div class="flex bg-white dark:bg-gray-900 rounded-lg p-1 shadow-sm overflow-x-auto">
            <button
              v-for="category in marketCategories"
              :key="category.id"
              @click="setActiveCategory(category.id)"
              class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap flex-shrink-0"
              :class="category.active 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'"
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- Market Summary Grid -->
        <div class="text-center mb-4">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Market Summary</h2>
          <p class="text-gray-600 dark:text-gray-300 live-data">Live data • Updates every second</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4">
          <div
            v-for="item in filteredMarketData"
            :key="item.symbol"
            @click="navigateToSymbol(item.symbol)"
            class="market-card bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 border border-gray-200/50 dark:border-gray-800/50 hover:border-blue-200 dark:hover:border-blue-800"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex-1 min-w-0">
                <div class="font-bold text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ item.symbol }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ item.name }}</div>
              </div>
              <!-- Mini Chart Visualization -->
              <div class="w-12 h-8 flex items-end justify-center space-x-0.5"
                   :class="{
                     'text-blue-600 dark:text-blue-400': item.category === 'index',
                     'text-green-600 dark:text-green-400': item.category === 'stock',
                     'text-orange-600 dark:text-orange-400': item.category === 'crypto'
                   }">
                <!-- Mini bar chart -->
                <div class="w-0.5 bg-current opacity-60" :style="{height: '16px'}"></div>
                <div class="w-0.5 bg-current opacity-80" :style="{height: '20px'}"></div>
                <div class="w-0.5 bg-current" :style="{height: item.change >= 0 ? '24px' : '12px'}"></div>
                <div class="w-0.5 bg-current opacity-90" :style="{height: item.change >= 0 ? '28px' : '8px'}"></div>
                <div class="w-0.5 bg-current opacity-70" :style="{height: '18px'}"></div>
              </div>
            </div>
            
            <div class="text-right">
              <div class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                ${{ item.price.toLocaleString() }}
              </div>
              <div class="text-xs sm:text-sm font-medium"
                   :class="item.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                {{ item.change >= 0 ? '+' : '' }}{{ item.change.toFixed(2) }} ({{ item.changePercent >= 0 ? '+' : '' }}{{ item.changePercent.toFixed(2) }}%)
              </div>
            </div>
          </div>
        </div>

        <!-- View All Markets Button -->
        <div class="text-center mt-6">
          <button
            @click="redirectToApp"
            class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
          >
            View all markets →
          </button>
        </div>
      </div>
    </section>

    <!-- Platform Stats Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
          Never miss an opportunity
          <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent glow-text">
            while you sleep
          </span>
        </h2>
        
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
          Our AI works around the clock, analyzing patterns and finding opportunities 
          that align with your trading style and preferences.
        </p>

        <!-- Platform Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div
            v-for="stat in platformStats"
            :key="stat.label"
            class="text-center p-6"
          >
            <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {{ stat.label }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ stat.subtext }}
            </div>
          </div>
        </div>

        <!-- Platform Features Grid -->
        <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div
            v-for="(feature, index) in mappedPlatformFeatures"
            :key="feature.title"
            class="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 glow-border"
          >
            <!-- Background Gradient -->
            <div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 :class="{
                   'bg-gradient-to-br from-blue-500/5 to-cyan-500/5': feature.color === 'blue',
                   'bg-gradient-to-br from-green-500/5 to-emerald-500/5': feature.color === 'green',
                   'bg-gradient-to-br from-purple-500/5 to-pink-500/5': feature.color === 'purple',
                   'bg-gradient-to-br from-orange-500/5 to-red-500/5': feature.color === 'orange'
                 }"></div>
            
            <!-- Content -->
            <div class="relative z-10">
              <!-- SVG Icon Placeholder -->
              <div class="w-16 h-16 mb-6 mx-auto rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                   :class="{
                     'bg-gradient-to-br from-blue-500 to-cyan-500': feature.color === 'blue',
                     'bg-gradient-to-br from-green-500 to-emerald-500': feature.color === 'green',
                     'bg-gradient-to-br from-purple-500 to-pink-500': feature.color === 'purple',
                     'bg-gradient-to-br from-orange-500 to-red-500': feature.color === 'orange'
                   }">
                <!-- Modern SVG Icons -->
                <svg v-if="feature.svg === 'analytics'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <svg v-else-if="feature.svg === 'speed'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <svg v-else class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              
              <!-- Title -->
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {{ feature.title }}
              </h3>
              
              <!-- Description -->
              <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {{ feature.description }}
              </p>
              
              <!-- Stats -->
              <div class="flex items-center text-sm font-medium"
                   :class="{
                     'text-blue-600 dark:text-blue-400': feature.color === 'blue',
                     'text-green-600 dark:text-green-400': feature.color === 'green',
                     'text-purple-600 dark:text-purple-400': feature.color === 'purple',
                     'text-orange-600 dark:text-orange-400': feature.color === 'orange'
                   }">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                {{ feature.stats }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mid-Page CTA - Visual Break -->
    <section class="py-16 gradient-border relative overflow-hidden" style="background: linear-gradient(-45deg, #3B82F6, #06B6D4, #1E40AF, #0EA5E9); background-size: 400% 400%;">
      <!-- Subtle background pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="grid-pattern"></div>
      </div>
      
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-200 text-sm font-medium mb-6 border border-blue-400/30">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          Ready to Transform Your Trading?
        </div>
        
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 animate-slide-up">
          Your strategy everywhere,
          <br>
          <span class="text-blue-300 glow-text">your life anywhere</span>
        </h2>
        <p class="text-lg text-blue-200 mb-8 leading-relaxed">
          AI executes your trading strategy across global markets 24/7. 
          No more staring at screens — live your life while opportunities find you.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            @click="startTrading"
            class="modern-button bg-white text-slate-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Start free trial
          </button>
          <button
            class="modern-button bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 backdrop-blur-sm"
          >
            Watch demo
          </button>
        </div>
        
        <p class="text-blue-200/80 text-sm">
          No credit card required • AI-powered alerts • 24/7 monitoring
        </p>
      </div>
    </section>

    <!-- Everything You Need to Trade Smarter -->
    <section class="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-200/50 dark:border-blue-700/50">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>
            Complete Trading Platform
          </div>
          
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up">
            Everything You Need to 
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent glow-text">Trade Smarter</span>
          </h2>
          <p class="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Beyond AI-powered insights, get access to a complete trading ecosystem designed for serious traders.
          </p>
        </div>

        <!-- Additional Features Grid (3x2 layout) -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div
            v-for="feature in mappedAdditionalFeatures"
            :key="feature.title"
            class="group bg-white dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 backdrop-blur-sm"
          >
            <!-- Icon -->
            <div class="w-12 h-12 mb-4 mx-auto rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                 :class="{
                   'bg-gradient-to-br from-blue-500 to-blue-600': feature.color === 'blue',
                   'bg-gradient-to-br from-purple-500 to-purple-600': feature.color === 'purple',
                   'bg-gradient-to-br from-green-500 to-green-600': feature.color === 'green',
                   'bg-gradient-to-br from-orange-500 to-orange-600': feature.color === 'orange',
                   'bg-gradient-to-br from-cyan-500 to-cyan-600': feature.color === 'cyan',
                   'bg-gradient-to-br from-indigo-500 to-indigo-600': feature.color === 'indigo'
                 }">
              
              <!-- SVG Icons for Additional Features -->
              <svg v-if="feature.svg === 'bell'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <svg v-else-if="feature.svg === 'brain'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <svg v-else-if="feature.svg === 'news'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
              <svg v-else-if="feature.svg === 'target'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"></circle>
                <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2"></circle>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"></circle>
                <circle cx="12" cy="12" r="1" fill="currentColor"></circle>
              </svg>
              <svg v-else-if="feature.svg === 'connect'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
              <svg v-else-if="feature.svg === 'education'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              </svg>
              <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>

            <!-- Content -->
            <div class="text-center">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {{ feature.title }}
              </h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {{ feature.description }}
              </p>
              <div class="text-xs font-medium"
                   :class="{
                     'text-blue-600 dark:text-blue-400': feature.color === 'blue',
                     'text-purple-600 dark:text-purple-400': feature.color === 'purple',
                     'text-green-600 dark:text-green-400': feature.color === 'green',
                     'text-orange-600 dark:text-orange-400': feature.color === 'orange',
                     'text-cyan-600 dark:text-cyan-400': feature.color === 'cyan',
                     'text-indigo-600 dark:text-indigo-400': feature.color === 'indigo'
                   }">
                {{ feature.stats }}
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-12">
          <button
            @click="startTrading"
            class="modern-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Get Started Free
          </button>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-3">
            No credit card required • Full access to all features
          </p>
        </div>
      </div>
    </section>

    <!-- AI-Powered Trading Problems We Solve -->
    <section class="py-24 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" clip-rule="evenodd"></path>
            </svg>
            AI-Powered Solution
          </div>
          <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Finally, an AI that
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent glow-text">works for you</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Stop staring at screens all day. Our AI monitors markets 24/7, 
            finds opportunities that match your style, and alerts you instantly.
          </p>
        </div>

        <!-- Problem-Solution Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <!-- Problem 1: Missing Opportunities -->
          <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Missing Great Setups
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                You can't watch every market, every timeframe, every symbol. 
                The best opportunities happen when you're sleeping or busy.
              </p>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div class="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-semibold mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>AI Solution</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>24/7 Market Scanning</strong> — Our AI never sleeps, constantly monitoring 10,000+ instruments across all global markets.
              </p>
            </div>
          </div>
          
          <!-- Problem 2: Information Overload -->
          <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Too Much Noise
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Endless news, alerts, and signals flood your feeds. 
                You spend more time filtering information than trading.
              </p>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div class="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-semibold mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>AI Solution</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>Smart Filtering</strong> — Only get alerts for setups that match your proven strategies and risk tolerance. No more noise.
              </p>
            </div>
          </div>
          
          <!-- Problem 3: Emotional Trading -->
          <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Emotional Decisions
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                FOMO, fear, and stress lead to bad timing. 
                You know what to do but emotions get in the way.
              </p>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div class="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-semibold mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>AI Solution</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>Objective Analysis</strong> — AI removes emotions from the equation, delivering purely data-driven opportunities when conditions align.
              </p>
            </div>
          </div>
        </div>

        <!-- How It Works -->
        <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl shadow-blue-500/10 border border-gray-200 dark:border-gray-800">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              How Our AI Works for You
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Set it up once, then let AI do the heavy lifting
            </p>
          </div>
          
          <div class="grid md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold">1</span>
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Define Your Style</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Tell us your preferred assets, timeframes, and risk tolerance</p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold">2</span>
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">AI Monitors</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Our AI scans global markets 24/7 for your specific setups</p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold">3</span>
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Get Alerted</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Receive instant notifications when conditions align perfectly</p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold">4</span>
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Trade Smart</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Make informed decisions with confidence and better timing</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-20 gradient-border" style="background: linear-gradient(-45deg, #3B82F6, #8B5CF6, #1E40AF, #7C3AED); background-size: 400% 400%;">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-white mb-6 animate-slide-up glow-text">
          Start sleeping better tonight
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Let our AI watch the markets while you focus on what matters most. 
          Wake up to opportunities, not regrets.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            @click="startTrading"
            class="modern-button bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Start free trial
          </button>
          <button
            class="modern-button glass-effect border-2 border-white/30 text-white hover:bg-white/10 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 backdrop-blur-sm"
          >
            See how it works
          </button>
        </div>
        
        <p class="text-blue-100 text-sm">
          No credit card required • AI-powered alerts • 24/7 monitoring
        </p>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
/* Smooth animations for market data updates */
.transition-all {
  transition: all 0.3s ease;
}

/* Hover effects for market cards */
.group:hover .group-hover\:text-blue-600 {
  @apply text-blue-600;
}

.dark .group:hover .dark\:group-hover\:text-blue-400 {
  @apply text-blue-400;
}

/* Search input focus styles */
.focus\:border-blue-500:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Modern gradient text animation */
@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

.bg-gradient-to-r {
  animation: gradient-x 6s ease infinite;
}

/* Market data pulse animation */
@keyframes pulse-glow {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% { 
    transform: scale(1.02);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
}

.market-update {
  animation: pulse-glow 2s infinite;
}

/* Modern floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(-5px) rotate(-1deg); }
}

.float-animation {
  animation: float 6s ease-in-out infinite;
}

/* Glowing border animation */
@keyframes glow-border {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.1), 0 0 40px rgba(59, 130, 246, 0.05);
  }
  50% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.1);
  }
}

.glow-border {
  animation: glow-border 3s ease-in-out infinite;
}

/* Smooth scale-up on scroll */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideInUp 0.6s ease-out;
}

/* Modern glassmorphism effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass-effect {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Parallax scrolling effect */
.parallax {
  transform: translateY(var(--parallax-offset, 0));
}

/* Gradient border animation */
@keyframes gradient-border {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.gradient-border {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient-border 15s ease infinite;
}

/* Modern button hover effects */
.modern-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.modern-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.modern-button:hover:before {
  left: 100%;
}

/* Responsive improvements */
@media (max-width: 640px) {
  .hero-title {
    font-size: 2.5rem !important;
    line-height: 1.1;
  }
  
  .market-card {
    padding: 1rem !important;
  }
  
  .feature-card {
    padding: 1.5rem !important;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .gradient-border {
    background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
  }
}

/* Animated Background Particles */
.particle {
  position: absolute;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3));
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.particle-1 {
  width: 20px;
  height: 20px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.particle-2 {
  width: 30px;
  height: 30px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.particle-3 {
  width: 15px;
  height: 15px;
  top: 80%;
  left: 80%;
  animation-delay: 4s;
}

.particle-4 {
  width: 25px;
  height: 25px;
  top: 30%;
  right: 30%;
  animation-delay: 1s;
}

.particle-5 {
  width: 18px;
  height: 18px;
  top: 50%;
  left: 70%;
  animation-delay: 3s;
}

/* Grid Pattern */
.grid-pattern {
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0);
  background-size: 20px 20px;
  width: 100%;
  height: 100%;
}

.dark .grid-pattern {
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0);
}

/* Enhanced market card animations */
.market-card:hover {
  transform: translateY(-4px) scale(1.02);
}

/* Pulsing effect for live data */
@keyframes data-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.live-data {
  animation: data-pulse 2s ease-in-out infinite;
}

/* Glowing text effect */
.glow-text {
  text-shadow: 0 0 10px currentColor;
}

/* Enhanced button hover with ripple effect */
.modern-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.modern-button:hover::after {
  width: 300px;
  height: 300px;
  opacity: 0;
}
</style>
