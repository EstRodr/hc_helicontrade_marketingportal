<script setup lang="ts">
const route = useRoute()
const { getSymbol } = useSymbols()

// Get symbol from route parameter
const symbolCode = route.params.symbol as string
const symbol = getSymbol(symbolCode)

// Handle symbol not found
if (!symbol) {
  throw createError({
    statusCode: 404,
    statusMessage: `Symbol "${symbolCode}" not found`
  })
}

// SEO configuration
useHead({
  title: `${symbol.symbol} - ${symbol.name} | HeliconTrade`,
  meta: [
    { name: 'description', content: `Real-time analysis and AI insights for ${symbol.name} (${symbol.symbol}). ${symbol.description}` },
    { name: 'keywords', content: `${symbol.symbol}, ${symbol.name}, ${symbol.tags.join(', ')}, trading, analysis, AI insights` }
  ]
})

// Generate mock chart data
const generateChartData = () => {
  const data = []
  const basePrice = symbol.price - symbol.change
  const timePoints = 100
  
  for (let i = 0; i < timePoints; i++) {
    const variance = (Math.random() - 0.5) * 0.05 // ±2.5% variance
    const trend = (symbol.change / basePrice) * (i / timePoints) // Apply overall trend
    const price = basePrice * (1 + trend + variance)
    
    data.push({
      time: Date.now() - (timePoints - i) * 60000, // 1 minute intervals
      price: Math.round(price * 100) / 100
    })
  }
  
  return data
}

const chartData = generateChartData()
const currentPrice = ref(symbol.price)
const currentChange = ref(symbol.change)
const currentChangePercent = ref(symbol.changePercent)

// Simulate real-time price updates
onMounted(() => {
  const interval = setInterval(() => {
    const variance = (Math.random() - 0.5) * 0.002 // ±0.1% movement
    const newPrice = currentPrice.value * (1 + variance)
    const change = newPrice - symbol.price
    const changePercent = (change / symbol.price) * 100
    
    currentPrice.value = Math.round(newPrice * 100) / 100
    currentChange.value = Math.round(change * 100) / 100
    currentChangePercent.value = Math.round(changePercent * 100) / 100
    
    // Add new data point to chart
    chartData.push({
      time: Date.now(),
      price: currentPrice.value
    })
    
    // Keep only last 100 points
    if (chartData.length > 100) {
      chartData.shift()
    }
  }, 2000) // Update every 2 seconds
  
  onUnmounted(() => {
    clearInterval(interval)
  })
})

// Get symbol type styling
const getTypeColor = (type: string) => {
  const colors = {
    stock: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    crypto: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    forex: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    etf: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    commodity: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
  }
  return colors[type as keyof typeof colors] || colors.stock
}

// Format large numbers
const formatNumber = (num: number) => {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T'
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
  return num.toLocaleString()
}

// Navigate to trading platform
const startTrading = () => {
  const config = useRuntimeConfig()
  window.location.href = `${config.public.appUrl}/symbol/${symbol.symbol}`
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />
    
    <!-- Symbol Detail Hero -->
    <section class="pt-20 pb-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="mb-6">
          <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <NuxtLink to="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ symbol.symbol }}</span>
            </li>
          </ol>
        </nav>
        
        <!-- Symbol Header -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8">
          <div class="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 lg:mb-0">
            <!-- Symbol Icon -->
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
              {{ symbol.symbol.charAt(0) }}
            </div>
            
            <!-- Symbol Info -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {{ symbol.symbol }}
                </h1>
                <span :class="`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getTypeColor(symbol.type)}`">
                  {{ symbol.type.toUpperCase() }}
                </span>
              </div>
              <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-1 truncate">{{ symbol.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ symbol.exchange }}</p>
            </div>
          </div>
          
          <!-- Price Info -->
          <div class="text-left lg:text-right">
            <div class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              ${{ currentPrice.toLocaleString() }}
            </div>
            <div class="flex items-center lg:justify-end gap-2">
              <span :class="`text-base sm:text-lg font-semibold ${currentChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`">
                {{ currentChange >= 0 ? '+' : '' }}{{ currentChange.toFixed(2) }}
              </span>
              <span :class="`text-base sm:text-lg font-semibold ${currentChangePercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`">
                ({{ currentChangePercent >= 0 ? '+' : '' }}{{ currentChangePercent.toFixed(2) }}%)
              </span>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Live • Updates every 2 seconds
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Main Content -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <!-- Chart and Analysis -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Price Chart -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Price Chart</h2>
                <div class="flex space-x-1 sm:space-x-2">
                  <button class="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm rounded touch-target">1D</button>
                  <button class="px-2 sm:px-3 py-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs sm:text-sm rounded touch-target">1W</button>
                  <button class="px-2 sm:px-3 py-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs sm:text-sm rounded touch-target">1M</button>
                  <button class="px-2 sm:px-3 py-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs sm:text-sm rounded touch-target">1Y</button>
                </div>
              </div>
              
              <!-- Mock Chart -->
              <div class="h-64 sm:h-80 lg:h-96 relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-2 sm:p-4">
                <svg class="w-full h-full" viewBox="0 0 800 300">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" :style="`stop-color:${currentChange >= 0 ? '#10B981' : '#EF4444'};stop-opacity:0.3`" />
                      <stop offset="100%" :style="`stop-color:${currentChange >= 0 ? '#10B981' : '#EF4444'};stop-opacity:0.1`" />
                    </linearGradient>
                  </defs>
                  
                  <!-- Grid lines -->
                  <defs>
                    <pattern id="grid" width="80" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 80 0 L 0 0 0 60" fill="none" stroke="#374151" stroke-width="0.5" opacity="0.2"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  <!-- Dynamic chart path -->
                  <path 
                    :d="`M${chartData.map((point, i) => `${(i / (chartData.length - 1)) * 780 + 10},${300 - ((point.price - Math.min(...chartData.map(p => p.price))) / (Math.max(...chartData.map(p => p.price)) - Math.min(...chartData.map(p => p.price)))) * 250 - 25}`).join(' L')}`"
                    :stroke="currentChange >= 0 ? '#10B981' : '#EF4444'"
                    stroke-width="3"
                    fill="none"
                    class="animate-pulse"
                  />
                  
                  <!-- Area fill -->
                  <path 
                    :d="`M${chartData.map((point, i) => `${(i / (chartData.length - 1)) * 780 + 10},${300 - ((point.price - Math.min(...chartData.map(p => p.price))) / (Math.max(...chartData.map(p => p.price)) - Math.min(...chartData.map(p => p.price)))) * 250 - 25}`).join(' L')} L790,275 L10,275 Z`"
                    fill="url(#chartGradient)"
                  />
                  
                  <!-- Current price point -->
                  <circle 
                    :cx="780 + 10" 
                    :cy="300 - ((currentPrice - Math.min(...chartData.map(p => p.price))) / (Math.max(...chartData.map(p => p.price)) - Math.min(...chartData.map(p => p.price)))) * 250 - 25"
                    r="6" 
                    :fill="currentChange >= 0 ? '#10B981' : '#EF4444'"
                    class="animate-pulse"
                  />
                </svg>
                
                <!-- Live indicator -->
                <div class="absolute top-4 right-4 bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/30">
                  <span class="animate-pulse">● LIVE</span>
                </div>
              </div>
            </div>
            
            <!-- AI Analysis -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
              <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">AI Analysis</h2>
              <div class="space-y-4">
                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-blue-700 dark:text-blue-300 font-semibold">Technical Signal</span>
                    <span class="text-sm text-blue-600 dark:text-blue-400">87% Confidence</span>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300 text-sm">
                    {{ currentChange >= 0 ? 'Bullish momentum detected with strong volume support.' : 'Consolidation pattern forming near support levels.' }}
                  </p>
                </div>
                
                <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-green-700 dark:text-green-300 font-semibold">Market Sentiment</span>
                    <span class="text-sm text-green-600 dark:text-green-400">Positive</span>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300 text-sm">
                    Institutional interest remains strong with above-average trading volume.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Key Statistics -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
              <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">Key Statistics</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Volume</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ formatNumber(symbol.volume) }}</span>
                </div>
                
                <div v-if="symbol.marketCap" class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Market Cap</span>
                  <span class="font-semibold text-gray-900 dark:text-white">${{ formatNumber(symbol.marketCap) }}</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Exchange</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ symbol.exchange }}</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Currency</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ symbol.currency }}</span>
                </div>
                
                <div v-if="symbol.sector" class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Sector</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ symbol.sector }}</span>
                </div>
              </div>
            </div>
            
            <!-- Description -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
              <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">About {{ symbol.name }}</h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {{ symbol.description }}
              </p>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in symbol.tags.slice(0, 6)" 
                  :key="tag"
                  class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <!-- CTA -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white">
              <h3 class="text-base sm:text-lg font-bold mb-2">Start Trading {{ symbol.symbol }}</h3>
              <p class="text-blue-100 mb-4 text-sm">
                Get AI-powered insights and alerts for {{ symbol.symbol }} on our trading platform.
              </p>
              <button 
                @click="startTrading"
                class="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors touch-target"
              >
                Trade {{ symbol.symbol }} Now
              </button>
            </div>
            
            <!-- AI Insights Feed -->
            <AIInsightsFeed />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
/* Chart animations */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Smooth transitions */
.transition-colors {
  transition: color 0.3s ease;
}

/* Responsive chart */
@media (max-width: 768px) {
  .h-96 {
    height: 20rem;
  }
}
</style>
