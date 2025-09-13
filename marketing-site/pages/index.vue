<script setup lang="ts">
const config = useRuntimeConfig()

// SEO configuration
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

// AI-focused platform features (main 4)
const platformFeatures = [
  {
    title: 'Opportunity Discovery',
    description: 'AI continuously scans markets to find setups that match your trading style and risk preferences',
    svg: 'analytics',
    highlight: 'AI-Powered',
    color: 'blue',
    stats: 'Finds opportunities you would miss'
  },
  {
    title: 'Smart Alerts',
    description: 'Get notified instantly when conditions align with your strategy — no more staring at screens',
    svg: 'speed',
    highlight: 'Sleep Better',
    color: 'green',
    stats: 'Never miss a setup again'
  },
  {
    title: 'Everywhere Coverage',
    description: 'We monitor global markets across all asset classes so you can focus on what matters',
    svg: 'automation',
    highlight: 'Global Reach',
    color: 'purple',
    stats: '10,000+ instruments tracked'
  },
  {
    title: 'Personalized Intelligence',
    description: 'Our AI learns your preferences and refines recommendations to match your trading style',
    svg: 'social',
    highlight: 'Learns You',
    color: 'orange',
    stats: 'Gets smarter over time'
  }
]

// Additional comprehensive platform features
const additionalFeatures = [
  {
    title: 'Smart Alerts',
    description: 'Get notified instantly when your custom conditions are met',
    svg: 'bell',
    color: 'blue',
    stats: 'Real-time notifications'
  },
  {
    title: 'AI Trading Assistant',
    description: 'Let our AI help you identify profitable trading opportunities',
    svg: 'brain',
    color: 'purple',
    stats: 'AI-powered insights'
  },
  {
    title: 'Market News',
    description: 'Stay ahead with real-time financial news and market updates',
    svg: 'news',
    color: 'green',
    stats: 'Breaking news alerts'
  },
  {
    title: 'Precision Trading',
    description: 'Advanced algorithms and data analysis for more accurate trade timing',
    svg: 'target',
    color: 'orange',
    stats: 'Enhanced accuracy'
  },
  {
    title: 'Multi-Platform Integration',
    description: 'Connect with your favorite brokers and trading platforms seamlessly',
    svg: 'connect',
    color: 'cyan',
    stats: '20+ broker integrations'
  },
  {
    title: 'Educational Resources',
    description: 'Learn from expert analysis, webinars, and comprehensive trading guides',
    svg: 'education',
    color: 'indigo',
    stats: 'Expert-led content'
  }
]

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
    return marketData.value.slice(0, 8) // Show top 8 for "all"
  }
  return marketData.value.filter(item => {
    if (activeCategory.value === 'indices') return item.category === 'index'
    if (activeCategory.value === 'stocks') return item.category === 'stock'  
    if (activeCategory.value === 'crypto') return item.category === 'crypto'
    return true
  })
})

// Search functionality with dropdown
function performSearch() {
  const query = searchQuery.value.trim().toLowerCase()
  if (query.length === 0) {
    searchResults.value = []
    showSearchDropdown.value = false
    selectedIndex.value = -1
    return
  }
  
  // Filter symbols based on query (symbol or name)
  const filtered = allMockSymbols.value.filter(symbol => 
    symbol.symbol.toLowerCase().includes(query) ||
    symbol.name.toLowerCase().includes(query)
  )
  
  searchResults.value = filtered.slice(0, 8) // Show top 8 matches
  showSearchDropdown.value = filtered.length > 0
  selectedIndex.value = -1
}

function onSearchInput() {
  performSearch()
}

function handleSearch() {
  if (selectedIndex.value >= 0 && searchResults.value[selectedIndex.value]) {
    // User selected item with keyboard
    selectSearchResult(searchResults.value[selectedIndex.value])
  } else if (searchResults.value.length === 1) {
    // Only one result, select it
    selectSearchResult(searchResults.value[0])
  } else if (searchQuery.value.trim()) {
    // Try exact match
    const symbol = searchQuery.value.trim().toUpperCase()
    if (validSymbols.value.has(symbol)) {
      navigateToSymbol(symbol)
    }
  }
  hideSearchDropdown()
}

function selectSearchResult(result) {
  navigateToSymbol(result.symbol)
  hideSearchDropdown()
  searchQuery.value = result.symbol
}

function hideSearchDropdown() {
  // Add small delay to allow click events to fire before hiding
  setTimeout(() => {
    showSearchDropdown.value = false
    selectedIndex.value = -1
  }, 150)
}

function onSearchKeydown(event) {
  if (!showSearchDropdown.value || searchResults.value.length === 0) return
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, searchResults.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
      break
    case 'Escape':
      event.preventDefault()
      hideSearchDropdown()
      break
  }
}

function selectPopularSymbol(symbol: string) {
  navigateToSymbol(symbol)
}

function setActiveCategory(categoryId: string) {
  activeCategory.value = categoryId
  marketCategories.forEach(cat => {
    cat.active = cat.id === categoryId
  })
}

function redirectToApp() {
  window.location.href = `${config.public.appUrl}/auth/register`
}

function startTrading() {
  window.location.href = `${config.public.appUrl}/auth/register`
}

// Handle location detection for analytics
function onLocationDetected(location: any) {
  console.log('User location detected:', location)
  // You could send this to analytics here
}

// Navigate to symbol page
function navigateToSymbol(symbol: string) {
  navigateTo(`/symbol/${symbol.toLowerCase()}`)
}

// Extended mock symbols for search (combining market data, popular symbols, and additional mocks)
const allMockSymbols = computed(() => {
  const symbolMap = new Map()
  
  // Add market data symbols first (highest priority)
  marketData.value.forEach(item => {
    symbolMap.set(item.symbol, {
      symbol: item.symbol,
      name: item.name,
      price: item.price,
      change: item.change,
      changePercent: item.changePercent,
      type: item.category
    })
  })
  
  // Add popular symbols (only if not already in market data)
  popularSymbols.forEach(symbol => {
    if (!symbolMap.has(symbol)) {
      symbolMap.set(symbol, {
        symbol,
        name: getSymbolName(symbol),
        price: Math.floor(Math.random() * 500) + 50,
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
        type: getSymbolType(symbol)
      })
    }
  })
  
  // Add additional symbols for better search experience
  const additionalSymbols = [
    'NFLX', 'AMD', 'INTC', 'CRM', 'ADBE', 'PYPL', 'ZOOM', 'SQ',
    'SHOP', 'UBER', 'LYFT', 'SNAP', 'TWTR', 'FB', 'PINS', 'ROKU', 'SPOT', 'ZM'
  ]
  
  additionalSymbols.forEach(symbol => {
    if (!symbolMap.has(symbol)) {
      symbolMap.set(symbol, {
        symbol,
        name: getSymbolName(symbol),
        price: Math.floor(Math.random() * 500) + 50,
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
        type: getSymbolType(symbol)
      })
    }
  })
  
  return Array.from(symbolMap.values())
})

// Helper functions for mock data
function getSymbolName(symbol) {
  const names = {
    'AAPL': 'Apple Inc.',
    'GOOGL': 'Alphabet Inc.',
    'MSFT': 'Microsoft Corporation',
    'AMZN': 'Amazon.com Inc.',
    'TSLA': 'Tesla Inc.',
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'NFLX': 'Netflix Inc.',
    'AMD': 'Advanced Micro Devices',
    'NVDA': 'NVIDIA Corporation'
  }
  return names[symbol] || `${symbol} Corporation`
}

function getSymbolType(symbol) {
  if (['BTC', 'ETH'].includes(symbol)) return 'crypto'
  if (['SPY', 'QQQ', 'DIA'].includes(symbol)) return 'etf'
  return 'stock'
}

// Valid symbols set
const validSymbols = computed(() => {
  return new Set(allMockSymbols.value.map(s => s.symbol.toUpperCase()))
})


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

    <!-- Hero Section - TradingView Style with Personalization -->
    <section class="relative pt-20 pb-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 overflow-hidden">
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
          @cta-click="startTrading" 
          @location-detected="onLocationDetected"
        />

          <!-- Search Bar - TradingView style -->
          <div class="max-w-2xl mx-auto mb-8">
          <div class="relative">
            <div class="flex">
              <input
                v-model="searchQuery"
                @input="onSearchInput"
                @keydown="onSearchKeydown"
                @keyup.enter="handleSearch"
                @focus="performSearch"
                @blur="hideSearchDropdown"
                type="text"
                placeholder="Try: AAPL, BTC, TSLA, SPY, GOOGL..."
                class="flex-1 px-6 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-l-xl focus:border-blue-500 focus:ring-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              >
              <button
                @click="handleSearch"
                class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-r-xl transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
            
            <!-- Search Dropdown -->
            <div v-if="showSearchDropdown && searchResults.length > 0" class="absolute top-full left-0 right-8 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 z-50 max-h-80 overflow-y-auto">
              <div class="p-2">
                <div
                  v-for="(result, index) in searchResults"
                  :key="result.symbol"
                  @mousedown="selectSearchResult(result)"
                  class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
                  :class="{
                    'bg-blue-50 dark:bg-blue-900/30': index === selectedIndex,
                    'hover:bg-gray-50 dark:hover:bg-gray-700': index !== selectedIndex
                  }"
                >
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                           :class="{
                             'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300': result.type === 'stock',
                             'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300': result.type === 'crypto',
                             'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300': result.type === 'etf'
                           }">
                        {{ result.type === 'crypto' ? '₿' : result.type === 'etf' ? 'ETF' : '$' }}
                      </div>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900 dark:text-white">{{ result.symbol }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-48">{{ result.name }}</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium text-gray-900 dark:text-white">${{ result.price.toFixed(2) }}</div>
                    <div class="text-sm"
                         :class="result.changePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                      {{ result.changePercent >= 0 ? '+' : '' }}{{ result.changePercent.toFixed(2) }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Popular searches -->
          <div class="mt-4">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Popular:</p>
            <div class="flex flex-wrap justify-center gap-2">
              <button
                v-for="symbol in popularSymbols.slice(0, 8)"
                :key="symbol"
                @click="selectPopularSymbol(symbol)"
                class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors cursor-pointer"
              >
                {{ symbol }}
              </button>
          </div>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12 mt-8">
            <button
              @click="startTrading"
              class="modern-button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Get started for free
            </button>
            <button
              class="modern-button glass-effect border-2 border-white/20 hover:border-blue-500/50 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 backdrop-blur-sm"
            >
              View demo
            </button>
          </div>

          <!-- Value indicators -->
          <div class="text-sm text-gray-500 dark:text-gray-400 text-center">
            <p class="mb-2">Start free — No credit card required</p>
            <div class="flex flex-wrap justify-center gap-6">
              <span>✓ AI-powered opportunity discovery</span>
              <span>✓ 24/7 market scanning</span>
              <span>✓ Personalized to your strategy</span>
            </div>
          </div>
        </div>
        
        <!-- Hero Dashboard Mockup with AI Insights -->
        <div class="relative z-10 mt-16">
          <div class="grid lg:grid-cols-3 gap-8 items-start">
            <!-- Main Dashboard Mockup -->
            <div class="lg:col-span-2 flex justify-center">
              <div class="dashboard-mockup bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 max-w-4xl w-full">
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
            
            <div class="grid md:grid-cols-3 gap-6">
              <!-- Main Chart Area -->
              <div class="md:col-span-2">
                <div class="bg-gray-800 rounded-xl p-4">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <span class="text-white font-bold text-lg">BTC/USD</span>
                      <span class="text-green-400 text-sm">+2.45% ($67,234)</span>
                    </div>
                    <div class="flex space-x-2">
                      <button class="px-3 py-1 bg-blue-600 text-white text-xs rounded">1D</button>
                      <button class="px-3 py-1 text-gray-400 hover:text-white text-xs rounded">1W</button>
                      <button class="px-3 py-1 text-gray-400 hover:text-white text-xs rounded">1M</button>
                    </div>
                  </div>
                  <!-- Enhanced Mock Chart -->
                  <div class="h-48 relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4">
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
            <div class="lg:col-span-1">
              <AIInsightsFeed />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Market Summary - TradingView Style -->
    <section class="py-8 bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Market Category Tabs -->
        <div class="flex justify-center mb-6">
          <div class="flex bg-white dark:bg-gray-900 rounded-lg p-1 shadow-sm">
            <button
              v-for="category in marketCategories"
              :key="category.id"
              @click="setActiveCategory(category.id)"
              class="px-4 py-2 text-sm font-medium rounded-md transition-all"
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

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          <div
            v-for="item in filteredMarketData"
            :key="item.symbol"
            @click="navigateToSymbol(item.symbol)"
            class="market-card bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 border border-gray-200/50 dark:border-gray-800/50 hover:border-blue-200 dark:hover:border-blue-800"
          >
            <div class="flex items-center justify-between mb-2">
              <div>
                <div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
              <div class="font-semibold text-gray-900 dark:text-white">
                ${{ item.price.toLocaleString() }}
              </div>
              <div class="text-sm font-medium"
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


    <!-- "Where the world does markets" - Community Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Never miss an opportunity
          <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            while you sleep
          </span>
        </h2>
        
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
          Our AI works around the clock, analyzing patterns and finding opportunities 
          that align with your trading style and preferences.
        </p>

        <!-- Community Stats -->
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

        <!-- Modern Platform Features Grid -->
        <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div
            v-for="(feature, index) in platformFeatures"
            :key="feature.title"
            class="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10"
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
                <!-- Modern SVG Icons with Enhanced Designs -->
                <svg v-if="feature.svg === 'analytics'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  <circle cx="18" cy="6" r="3" fill="currentColor"></circle>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6l2 2-2 2" opacity="0.7"></path>
                </svg>
                <svg v-if="feature.svg === 'speed'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 12h3m0 0h3" opacity="0.5"></path>
                </svg>
                <svg v-if="feature.svg === 'automation'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"></circle>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v6m-3-3h6" opacity="0.7"></path>
                </svg>
                <svg v-if="feature.svg === 'social'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 14l2-2-2-2" opacity="0.5"></path>
                </svg>
              </div>
              
              <!-- Badge -->
              <div class="mb-4">
                <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
                      :class="{
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300': feature.color === 'blue',
                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300': feature.color === 'green',
                        'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300': feature.color === 'purple',
                        'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300': feature.color === 'orange'
                      }">
                  {{ feature.highlight }}
                </span>
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
            
            <!-- Hover Arrow -->
            <div class="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mid-Page CTA - Visual Break -->
    <section class="py-16 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 relative overflow-hidden">
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
        
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Your strategy everywhere,
          <br>
          <span class="text-blue-300">your life anywhere</span>
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
          
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to 
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trade Smarter</span>
          </h2>
          <p class="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Beyond AI-powered insights, get access to a complete trading ecosystem designed for serious traders.
          </p>
        </div>

        <!-- Additional Features Grid (3x2 layout) -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div
            v-for="feature in additionalFeatures"
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
              <svg v-if="feature.svg === 'brain'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <svg v-if="feature.svg === 'news'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
              <svg v-if="feature.svg === 'target'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"></circle>
                <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2"></circle>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"></circle>
                <circle cx="12" cy="12" r="1" fill="currentColor"></circle>
              </svg>
              <svg v-if="feature.svg === 'connect'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
              <svg v-if="feature.svg === 'education'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
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
          <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Finally, an AI that
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">works for you</span>
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
    <section class="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-white mb-6">
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
.modern-button {
  position: relative;
  overflow: hidden;
}

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
