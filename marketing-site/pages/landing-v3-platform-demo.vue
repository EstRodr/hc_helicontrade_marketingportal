<script setup lang="ts">
const config = useRuntimeConfig()

// SEO configuration
useHead({
  title: 'HeliconTrade — Experience the Future of Trading',
  meta: [
    { name: 'description', content: 'See our advanced trading platform in action. Interactive demo, real-time charts, AI-powered insights, and professional tools.' },
    { name: 'keywords', content: 'trading platform demo, interactive charts, trading tools, platform preview, trading software' }
  ]
})

// Demo sections/tabs
const demoTabs = ref([
  { id: 'charts', label: 'Advanced Charts', active: true },
  { id: 'alerts', label: 'AI Alerts', active: false },
  { id: 'portfolio', label: 'Portfolio', active: false },
  { id: 'community', label: 'Community', active: false }
])

const activeTab = ref('charts')

// Platform capabilities
const capabilities = [
  {
    title: 'Real-Time Charts',
    description: 'Professional-grade charting with 100+ technical indicators',
    icon: '📊',
    highlight: 'Used by 95% of our traders daily'
  },
  {
    title: 'AI-Powered Alerts',
    description: 'Smart notifications that learn from your trading patterns',
    icon: '🤖',
    highlight: '94% accuracy rate'
  },
  {
    title: 'Risk Management',
    description: 'Advanced tools to protect and optimize your portfolio',
    icon: '🛡️',
    highlight: 'Reduce losses by 67%'
  },
  {
    title: 'Market Scanner',
    description: 'Find opportunities across global markets in real-time',
    icon: '🔍',
    highlight: 'Scan 10,000+ instruments'
  }
]

// Mock trading data for demo
const demoData = {
  charts: {
    symbol: 'AAPL',
    price: '189.34',
    change: '+2.45',
    changePercent: '+1.31%',
    indicators: ['RSI', 'MACD', 'Moving Averages', 'Bollinger Bands']
  },
  alerts: [
    { symbol: 'NVDA', type: 'Breakout', confidence: '94%', status: 'active' },
    { symbol: 'TSLA', type: 'Support Level', confidence: '87%', status: 'triggered' },
    { symbol: 'MSFT', type: 'Volume Spike', confidence: '91%', status: 'monitoring' }
  ],
  portfolio: {
    totalValue: '$125,847',
    dayChange: '+$2,347',
    dayChangePercent: '+1.9%',
    positions: 8,
    winRate: '73%'
  }
}

function setActiveTab(tabId: string) {
  activeTab.value = tabId
  demoTabs.value.forEach(tab => {
    tab.active = tab.id === tabId
  })
}

function redirectToApp() {
  window.location.href = `${config.public.appUrl}/auth/register`
}

function startDemo() {
  // In production, this would open a full demo modal
  console.log('Starting full platform demo...')
}

function watchDemo() {
  // In production, this would play a demo video
  console.log('Playing demo video...')
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <!-- Hero Section - Platform Demo Focus -->
    <section class="relative pt-16 pb-12 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-cyan-900/20"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Experience the
            <span class="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              future of trading
            </span>
          </h1>
          
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            See our platform in action. Advanced analytics, AI-powered insights, 
            and professional tools that adapt to your trading style.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              @click="startDemo"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
            >
              Try Interactive Demo
            </button>
            <button 
              @click="watchDemo"
              class="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all"
            >
              Watch 2-Min Demo
            </button>
          </div>

          <!-- Key metrics -->
          <div class="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-300">
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>99.9% Uptime</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>< 50ms Latency</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Bank-Grade Security</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Platform Demo -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Demo Navigation -->
        <div class="flex justify-center mb-8">
          <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 flex space-x-1">
            <button v-for="tab in demoTabs" :key="tab.id"
                    @click="setActiveTab(tab.id)"
                    class="px-6 py-3 rounded-lg font-medium transition-all"
                    :class="tab.active 
                      ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'">
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Demo Content -->
        <div class="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          <!-- Demo Header -->
          <div class="bg-gray-800 px-6 py-4 border-b border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span class="text-white font-medium">HeliconTrade Platform</span>
              </div>
              <span class="text-green-400 text-sm">● LIVE</span>
            </div>
          </div>

          <!-- Charts Tab Content -->
          <div v-show="activeTab === 'charts'" class="p-6">
            <div class="grid lg:grid-cols-3 gap-6">
              <!-- Main Chart Area -->
              <div class="lg:col-span-2">
                <div class="bg-gray-800 rounded-xl p-4 mb-4">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <span class="text-white font-bold text-lg">{{ demoData.charts.symbol }}</span>
                      <span class="text-white text-lg">${{ demoData.charts.price }}</span>
                      <span class="text-green-400 text-sm">{{ demoData.charts.change }} ({{ demoData.charts.changePercent }})</span>
                    </div>
                    <div class="flex space-x-2">
                      <button class="px-3 py-1 bg-indigo-600 text-white text-xs rounded">1D</button>
                      <button class="px-3 py-1 text-gray-400 hover:text-white text-xs rounded">1W</button>
                      <button class="px-3 py-1 text-gray-400 hover:text-white text-xs rounded">1M</button>
                    </div>
                  </div>
                  
                  <!-- Mock Chart -->
                  <div class="h-64 bg-gradient-to-br from-indigo-900/50 to-cyan-900/50 rounded-lg flex items-center justify-center">
                    <div class="text-center text-white">
                      <div class="text-4xl mb-2">📈</div>
                      <p class="text-sm opacity-75">Interactive TradingView-style Chart</p>
                      <p class="text-xs opacity-50 mt-1">Live market data • Professional indicators</p>
                    </div>
                  </div>
                </div>
                
                <!-- Chart Tools -->
                <div class="flex items-center justify-between bg-gray-800 rounded-xl p-4">
                  <div class="flex space-x-4">
                    <span v-for="indicator in demoData.charts.indicators" :key="indicator"
                          class="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                      {{ indicator }}
                    </span>
                  </div>
                  <button class="text-indigo-400 hover:text-indigo-300 text-sm">+ Add Indicator</button>
                </div>
              </div>

              <!-- Sidebar -->
              <div class="space-y-4">
                <div class="bg-gray-800 rounded-xl p-4">
                  <h4 class="text-white font-semibold mb-3">Watchlist</h4>
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-gray-300">AAPL</span>
                      <span class="text-green-400">+1.31%</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-gray-300">NVDA</span>
                      <span class="text-green-400">+1.49%</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-gray-300">TSLA</span>
                      <span class="text-red-400">-1.35%</span>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-800 rounded-xl p-4">
                  <h4 class="text-white font-semibold mb-3">AI Insights</h4>
                  <div class="space-y-3">
                    <div class="p-3 bg-indigo-900/50 rounded-lg">
                      <p class="text-indigo-300 text-sm">🤖 AAPL showing bullish divergence</p>
                      <p class="text-xs text-gray-400">Confidence: 87%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- AI Alerts Tab Content -->
          <div v-show="activeTab === 'alerts'" class="p-6">
            <div class="max-w-2xl mx-auto">
              <h3 class="text-white text-xl font-bold mb-6 text-center">Smart Alert System</h3>
              <div class="space-y-4">
                <div v-for="alert in demoData.alerts" :key="alert.symbol"
                     class="bg-gray-800 rounded-xl p-4 flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <span class="text-white font-bold text-sm">{{ alert.symbol.charAt(0) }}</span>
                    </div>
                    <div>
                      <h4 class="text-white font-semibold">{{ alert.symbol }} {{ alert.type }}</h4>
                      <p class="text-gray-400 text-sm">AI Confidence: {{ alert.confidence }}</p>
                    </div>
                  </div>
                  <span class="px-3 py-1 text-xs rounded-full"
                        :class="{
                          'bg-green-600 text-white': alert.status === 'active',
                          'bg-yellow-600 text-white': alert.status === 'triggered',
                          'bg-blue-600 text-white': alert.status === 'monitoring'
                        }">
                    {{ alert.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Portfolio Tab Content -->
          <div v-show="activeTab === 'portfolio'" class="p-6">
            <div class="max-w-4xl mx-auto">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-gray-800 rounded-xl p-6">
                  <h4 class="text-white font-bold text-lg mb-4">Portfolio Overview</h4>
                  <div class="space-y-4">
                    <div class="flex justify-between">
                      <span class="text-gray-400">Total Value</span>
                      <span class="text-white font-bold">{{ demoData.portfolio.totalValue }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Day Change</span>
                      <span class="text-green-400 font-bold">{{ demoData.portfolio.dayChange }} ({{ demoData.portfolio.dayChangePercent }})</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Active Positions</span>
                      <span class="text-white">{{ demoData.portfolio.positions }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Win Rate</span>
                      <span class="text-green-400 font-bold">{{ demoData.portfolio.winRate }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-800 rounded-xl p-6">
                  <h4 class="text-white font-bold text-lg mb-4">Performance Chart</h4>
                  <div class="h-32 bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-lg flex items-center justify-center">
                    <div class="text-center text-white">
                      <div class="text-2xl mb-1">📈</div>
                      <p class="text-xs opacity-75">Portfolio Growth: +23.7%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Community Tab Content -->
          <div v-show="activeTab === 'community'" class="p-6">
            <div class="max-w-2xl mx-auto">
              <h3 class="text-white text-xl font-bold mb-6 text-center">Live Community Feed</h3>
              <div class="space-y-4">
                <div class="bg-gray-800 rounded-xl p-4">
                  <div class="flex items-center space-x-3 mb-3">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">S</div>
                    <div>
                      <span class="text-white font-semibold">Sarah_Trader</span>
                      <span class="text-gray-400 text-sm ml-2">• 2 min ago</span>
                    </div>
                  </div>
                  <p class="text-gray-300 mb-2">Just caught a perfect AAPL breakout! AI alert was spot on 🎯</p>
                  <div class="flex items-center space-x-4 text-sm">
                    <span class="text-gray-400">❤️ 24</span>
                    <span class="text-gray-400">💬 8</span>
                    <span class="text-gray-400">🔄 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Platform Capabilities -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Built for professional traders
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Every feature designed to give you an edge in the markets
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="capability in capabilities" :key="capability.title" 
               class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all group">
            <div class="flex items-start space-x-4">
              <div class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {{ capability.icon }}
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ capability.title }}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">{{ capability.description }}</p>
                <div class="inline-flex items-center px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-full">
                  ✨ {{ capability.highlight }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Platform Preview Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Content -->
          <div>
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              See the difference professional tools make
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our platform combines the power of institutional-grade analytics 
              with an intuitive interface that anyone can master.
            </p>
            
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mt-1">
                  <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Lightning-fast execution</h4>
                  <p class="text-gray-600 dark:text-gray-300">Sub-50ms latency for time-sensitive trades</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mt-1">
                  <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Advanced order types</h4>
                  <p class="text-gray-600 dark:text-gray-300">Stop-loss, take-profit, trailing stops, and more</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mt-1">
                  <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Multi-timeframe analysis</h4>
                  <p class="text-gray-600 dark:text-gray-300">Analyze trends across multiple timeframes simultaneously</p>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <button 
                @click="startDemo"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              >
                Try Full Demo
              </button>
            </div>
          </div>

          <!-- Platform Screenshot/Preview -->
          <div class="relative">
            <div class="bg-gray-900 rounded-2xl shadow-2xl p-4 border border-gray-700">
              <div class="grid grid-cols-2 gap-4">
                <!-- Mini chart widgets -->
                <div class="bg-gray-800 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-white text-sm font-semibold">AAPL</span>
                    <span class="text-green-400 text-xs">+1.31%</span>
                  </div>
                  <div class="h-16 bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded flex items-center justify-center">
                    <span class="text-green-400 text-lg">📈</span>
                  </div>
                </div>
                
                <div class="bg-gray-800 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-white text-sm font-semibold">NVDA</span>
                    <span class="text-green-400 text-xs">+1.49%</span>
                  </div>
                  <div class="h-16 bg-gradient-to-r from-green-900/50 to-purple-900/50 rounded flex items-center justify-center">
                    <span class="text-green-400 text-lg">📊</span>
                  </div>
                </div>
                
                <div class="col-span-2 bg-gray-800 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-white text-sm font-semibold">Portfolio Performance</span>
                    <span class="text-green-400 text-xs">+23.7% YTD</span>
                  </div>
                  <div class="h-12 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded flex items-center justify-center">
                    <span class="text-cyan-400 text-sm">Interactive Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Floating demo badge -->
            <div class="absolute -top-4 -right-4 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              Live Demo
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Comparison -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Why traders choose HeliconTrade
          </h2>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          <div class="grid md:grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
            <!-- Basic Platforms -->
            <div class="p-8 text-center">
              <h3 class="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-6">Basic Platforms</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <span class="text-gray-400">❌</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">Limited indicators</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-gray-400">❌</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">No AI insights</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-gray-400">❌</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">Basic alerts</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-gray-400">❌</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">No community</span>
                </div>
              </div>
            </div>

            <!-- HeliconTrade -->
            <div class="p-8 text-center bg-indigo-50 dark:bg-indigo-900/20 relative">
              <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span class="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  HeliconTrade
                </span>
              </div>
              <h3 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-6 mt-2">Our Platform</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <span class="text-green-600">✅</span>
                  <span class="text-gray-900 dark:text-white text-sm font-medium">100+ pro indicators</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-green-600">✅</span>
                  <span class="text-gray-900 dark:text-white text-sm font-medium">AI-powered insights</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-green-600">✅</span>
                  <span class="text-gray-900 dark:text-white text-sm font-medium">Smart alerts</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-green-600">✅</span>
                  <span class="text-gray-900 dark:text-white text-sm font-medium">Vibrant community</span>
                </div>
              </div>
            </div>

            <!-- Enterprise -->
            <div class="p-8 text-center">
              <h3 class="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-6">Enterprise Platforms</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <span class="text-green-600">✅</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">Advanced features</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-gray-400">⚠️</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">$500+/month</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-gray-400">❌</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">Complex interface</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-gray-400">❌</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">No learning support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo CTA Section -->
    <section class="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-white mb-6">
          Ready to trade like a pro?
        </h2>
        <p class="text-xl text-indigo-100 mb-8">
          Experience the platform that's changing how people trade. No installation required.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="redirectToApp"
            class="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-lg"
          >
            Start Trading Now
          </button>
          <button 
            @click="startDemo"
            class="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all"
          >
            Try Full Demo
          </button>
        </div>
        
        <p class="text-indigo-100 text-sm mt-6">
          Full platform access • No credit card required • 14-day premium trial
        </p>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
/* Custom animations for demo elements */
@keyframes pulse-glow {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
</style>
