<script setup lang="ts">
const config = useRuntimeConfig()

// SEO configuration
useHead({
  title: 'HeliconTrade — Advanced Trading Analytics & AI',
  meta: [
    { name: 'description', content: 'Professional trading platform with advanced analytics, AI-powered insights, and real-time market data. Join thousands of traders worldwide.' },
    { name: 'keywords', content: 'trading platform, market analysis, AI trading, financial analytics, real-time data' }
  ]
})

// Mock market data (in production, this would come from a real API)
const marketData = ref([
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.34, change: +2.45, changePercent: +1.31 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 875.22, change: +12.87, changePercent: +1.49 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.91, change: -3.42, changePercent: -1.35 },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.67, change: +8.23, changePercent: +2.02 },
  { symbol: 'GOOGL', name: 'Alphabet', price: 142.38, change: +1.89, changePercent: +1.35 },
  { symbol: 'META', name: 'Meta Platforms', price: 523.45, change: -5.67, changePercent: -1.07 }
])

// Platform stats
const stats = [
  { label: 'Active Traders', value: '50K+', icon: '👥' },
  { label: 'Daily Trades', value: '2M+', icon: '📈' },
  { label: 'Markets Covered', value: '25+', icon: '🌍' },
  { label: 'AI Accuracy', value: '94%', icon: '🤖' }
]

// Key features with TradingView-inspired presentation
const features = [
  {
    title: 'Advanced Charting',
    description: 'Professional-grade charts with 100+ technical indicators',
    icon: '📊',
    color: 'blue'
  },
  {
    title: 'AI-Powered Alerts',
    description: 'Smart notifications based on market patterns and your portfolio',
    icon: '🔔',
    color: 'purple'
  },
  {
    title: 'Real-Time Data',
    description: 'Live market feeds from global exchanges',
    icon: '⚡',
    color: 'green'
  },
  {
    title: 'Community Insights',
    description: 'Learn from top traders and share your strategies',
    icon: '💡',
    color: 'orange'
  }
]

function redirectToApp() {
  window.location.href = `${config.public.appUrl}/auth/register`
}

function startDemo() {
  // In production, this would open a demo modal or redirect to demo page
  console.log('Starting demo...')
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <!-- Hero Section - TradingView inspired -->
    <section class="relative pt-16 pb-24 overflow-hidden">
      <!-- Background gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Column - Hero Content -->
          <div class="text-center lg:text-left">
            <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Where smart trades
              <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                begin
              </span>
            </h1>
            
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Advanced analytics, AI-powered insights, and real-time data. 
              Join thousands of traders making informed decisions every day.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button 
                @click="redirectToApp"
                class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                Start Trading Free
              </button>
              <button 
                @click="startDemo"
                class="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                Try Demo
              </button>
            </div>

            <!-- Social Proof -->
            <div class="text-center lg:text-left">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Trusted by traders worldwide
              </p>
              <div class="flex justify-center lg:justify-start items-center space-x-6">
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">50K+</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Active Users</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400">94%</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">25+</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Markets</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Market Data Preview -->
          <div class="relative">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Live Markets</h3>
                <span class="text-sm text-gray-500 dark:text-gray-400">Real-time</span>
              </div>
              
              <div class="space-y-3">
                <div v-for="stock in marketData.slice(0, 4)" :key="stock.symbol" 
                     class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <span class="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {{ stock.symbol.charAt(0) }}
                      </span>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900 dark:text-white">{{ stock.symbol }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ stock.name }}</div>
                    </div>
                  </div>
                  
                  <div class="text-right">
                    <div class="font-semibold text-gray-900 dark:text-white">${{ stock.price }}</div>
                    <div class="text-sm" :class="stock.change >= 0 ? 'text-green-600' : 'text-red-600'">
                      {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }} ({{ stock.changePercent >= 0 ? '+' : '' }}{{ stock.changePercent }}%)
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button class="w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors">
                  View All Markets →
                </button>
              </div>
            </div>
            
            <!-- Floating elements for visual appeal -->
            <div class="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
            <div class="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Market Ticker -->
    <section class="bg-gray-100 dark:bg-gray-800 py-4 border-t border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-8 overflow-x-auto scrollbar-hide">
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">Markets:</span>
          <div v-for="stock in marketData" :key="stock.symbol" 
               class="flex items-center space-x-2 whitespace-nowrap">
            <span class="font-semibold text-gray-900 dark:text-white">{{ stock.symbol }}</span>
            <span class="text-gray-600 dark:text-gray-300">${{ stock.price }}</span>
            <span :class="stock.change >= 0 ? 'text-green-600' : 'text-red-600'" class="text-sm">
              {{ stock.change >= 0 ? '+' : '' }}{{ stock.changePercent }}%
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Platform Features with Data Focus -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Built for serious traders
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional-grade tools and real-time data that institutional traders use, 
            now accessible to everyone.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="feature in features" :key="feature.title" 
               class="group text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:scale-105">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl"
                 :class="{
                   'bg-blue-100 dark:bg-blue-900/30': feature.color === 'blue',
                   'bg-purple-100 dark:bg-purple-900/30': feature.color === 'purple', 
                   'bg-green-100 dark:bg-green-900/30': feature.color === 'green',
                   'bg-orange-100 dark:bg-orange-900/30': feature.color === 'orange'
                 }">
              {{ feature.icon }}
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Market Analysis Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Chart Preview -->
          <div class="order-2 lg:order-1">
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white">AAPL • Apple Inc.</h4>
                <span class="text-green-600 text-sm font-medium">+1.31%</span>
              </div>
              
              <!-- Mock chart area -->
              <div class="h-48 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg flex items-center justify-center">
                <div class="text-center">
                  <div class="text-4xl mb-2">📈</div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Interactive Chart Preview</p>
                </div>
              </div>
              
              <!-- Chart controls -->
              <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex space-x-2">
                  <button class="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">1D</button>
                  <button class="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded">1W</button>
                  <button class="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded">1M</button>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400">Real-time data</span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="order-1 lg:order-2">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              See what moves the markets
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our advanced analytics engine processes millions of data points in real-time, 
              giving you the edge you need to make informed trading decisions.
            </p>
            
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-1">
                  <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Real-time market data</h4>
                  <p class="text-gray-600 dark:text-gray-300">Live feeds from major exchanges worldwide</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-1">
                  <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">AI-powered insights</h4>
                  <p class="text-gray-600 dark:text-gray-300">Machine learning algorithms analyze patterns for you</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-1">
                  <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Professional tools</h4>
                  <p class="text-gray-600 dark:text-gray-300">Advanced charting and technical analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Trading Ideas Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Today's trading opportunities
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Real-time insights from our AI and top traders in the community
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Trading Idea Cards -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-full">
                BULLISH
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">2 mins ago</span>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">NVDA Breaking Resistance</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Technical analysis suggests a potential breakout above $880 resistance level...
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500 dark:text-gray-400">AI Confidence: 87%</span>
              <button class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                View Analysis →
              </button>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium rounded-full">
                BEARISH
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">5 mins ago</span>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">TSLA Overbought Signal</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
              RSI indicates overbought conditions, potential pullback to $240 support...
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500 dark:text-gray-400">AI Confidence: 91%</span>
              <button class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                View Analysis →
              </button>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                NEUTRAL
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">8 mins ago</span>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">SPY Range Trading</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Market consolidating between key levels, waiting for directional break...
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500 dark:text-gray-400">AI Confidence: 76%</span>
              <button class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                View Analysis →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Platform Stats -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Trusted by traders worldwide
          </h2>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" 
               class="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
            <div class="text-4xl mb-3">{{ stat.icon }}</div>
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{{ stat.value }}</div>
            <div class="text-gray-600 dark:text-gray-300 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-white mb-6">
          Ready to elevate your trading?
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Join thousands of traders using AI-powered analytics to make smarter decisions.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="redirectToApp"
            class="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-lg"
          >
            Start Free Today
          </button>
          <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all">
            Watch Demo
          </button>
        </div>
        
        <p class="text-blue-100 text-sm mt-6">
          No credit card required • Free forever plan available
        </p>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
