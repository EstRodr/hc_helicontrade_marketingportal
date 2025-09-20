<script setup lang="ts">
interface AIInsight {
  id: string
  type: 'bullish' | 'bearish' | 'neutral' | 'alert' | 'pattern'
  symbol: string
  message: string
  confidence: number
  timestamp: Date
  priority: 'high' | 'medium' | 'low'
  icon: string
}

// Real-time AI insights data
const insights = ref<AIInsight[]>([])
const isVisible = ref(true)
const isPaused = ref(false)

// Simulated AI insights pool
const insightTemplates = [
  {
    type: 'bullish',
    symbols: ['BTC', 'ETH', 'AAPL', 'TSLA', 'NVDA', 'MSFT'],
    messages: [
      'Strong bullish divergence detected',
      'Breaking above key resistance level',
      'Golden cross formation spotted',
      'Volume surge indicates upward momentum',
      'AI confidence in uptrend increasing'
    ],
    icon: '📈'
  },
  {
    type: 'bearish',
    symbols: ['SPY', 'META', 'GOOGL', 'AMZN'],
    messages: [
      'Bearish pattern formation detected',
      'Support level showing weakness',
      'Death cross pattern emerging',
      'Volume declining on rallies',
      'Overbought conditions present'
    ],
    icon: '📉'
  },
  {
    type: 'pattern',
    symbols: ['AAPL', 'TSLA', 'BTC', 'ETH', 'NVDA', 'AMD'],
    messages: [
      'Cup and handle pattern forming',
      'Triangle breakout imminent',
      'Double bottom pattern confirmed',
      'Head and shoulders pattern detected',
      'Ascending triangle spotted'
    ],
    icon: '📊'
  },
  {
    type: 'alert',
    symbols: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'GOLD', 'OIL'],
    messages: [
      'High volatility expected ahead',
      'Key economic event approaching',
      'Unusual options activity detected',
      'Institutional buying pressure noticed',
      'Market sentiment shift identified'
    ],
    icon: '🚨'
  }
]

// Generate random AI insight
function generateInsight(): AIInsight {
  const template = insightTemplates[Math.floor(Math.random() * insightTemplates.length)]
  const symbol = template.symbols[Math.floor(Math.random() * template.symbols.length)]
  const message = template.messages[Math.floor(Math.random() * template.messages.length)]
  const confidence = Math.floor(Math.random() * 30) + 70 // 70-99%
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: template.type as AIInsight['type'],
    symbol,
    message,
    confidence,
    timestamp: new Date(),
    priority: confidence > 90 ? 'high' : confidence > 80 ? 'medium' : 'low',
    icon: template.icon
  }
}

// Add new insight to feed
function addInsight() {
  if (isPaused.value) return
  
  const newInsight = generateInsight()
  insights.value.unshift(newInsight)
  
  // Keep only last 20 insights for performance
  if (insights.value.length > 20) {
    insights.value = insights.value.slice(0, 20)
  }
}

// Initialize feed and start real-time updates
onMounted(() => {
  // Add initial insights
  for (let i = 0; i < 8; i++) {
    insights.value.push(generateInsight())
  }
  
  // Start real-time updates
  const interval = setInterval(() => {
    addInsight()
  }, 3000) // New insight every 3 seconds
  
  // Cleanup on unmount
  onUnmounted(() => {
    clearInterval(interval)
  })
})

// Pause/resume feed
function toggleFeed() {
  isPaused.value = !isPaused.value
}

// Get insight styling based on type
function getInsightStyling(insight: AIInsight) {
  const baseClasses = 'flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] border-l-4'
  
  switch (insight.type) {
    case 'bullish':
      return `${baseClasses} bg-green-50 dark:bg-green-900/20 border-l-green-500 hover:bg-green-100 dark:hover:bg-green-900/30`
    case 'bearish':
      return `${baseClasses} bg-red-50 dark:bg-red-900/20 border-l-red-500 hover:bg-red-100 dark:hover:bg-red-900/30`
    case 'pattern':
      return `${baseClasses} bg-blue-50 dark:bg-blue-900/20 border-l-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30`
    case 'alert':
      return `${baseClasses} bg-orange-50 dark:bg-orange-900/20 border-l-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/30`
    default:
      return `${baseClasses} bg-gray-50 dark:bg-gray-900/20 border-l-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900/30`
  }
}

// Get confidence color
function getConfidenceColor(confidence: number) {
  if (confidence >= 90) return 'text-green-600 dark:text-green-400'
  if (confidence >= 80) return 'text-blue-600 dark:text-blue-400'
  return 'text-orange-600 dark:text-orange-400'
}

// Format time ago
function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}
</script>

<template>
  <div class="ai-insights-feed bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden max-w-full">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-3 sm:p-4 text-white">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div class="relative flex-shrink-0">
            <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div class="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <h3 class="font-bold text-base sm:text-lg truncate">AI Insights Live Feed</h3>
        </div>
        <button 
          @click="toggleFeed"
          class="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
        >
          {{ isPaused ? 'Resume' : 'Pause' }}
        </button>
      </div>
      <p class="text-blue-100 text-xs sm:text-sm mt-1">Real-time AI analysis • {{ insights.length }} active insights</p>
    </div>

    <!-- Feed Container -->
    <div class="h-80 sm:h-96 overflow-y-auto scroll-smooth" :class="{ 'opacity-50': isPaused }">
      <div class="p-3 sm:p-4 space-y-3">
        <!-- Insights List -->
        <TransitionGroup 
          name="insight"
          tag="div"
          class="space-y-3"
        >
          <div
            v-for="insight in insights"
            :key="insight.id"
            :class="getInsightStyling(insight)"
          >
            <!-- Icon & Symbol -->
            <div class="flex-shrink-0">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-sm sm:text-lg">
                {{ insight.icon }}
              </div>
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                <span class="font-bold text-sm sm:text-base text-gray-900 dark:text-white">{{ insight.symbol }}</span>
                <span class="text-xs px-1 sm:px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {{ insight.type.toUpperCase() }}
                </span>
                <span :class="`text-xs font-semibold ${getConfidenceColor(insight.confidence)}`">
                  {{ insight.confidence }}% confident
                </span>
              </div>
              <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ insight.message }}
              </p>
              <div class="flex items-center justify-between mt-2 gap-2">
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {{ timeAgo(insight.timestamp) }}
                </span>
                <div class="flex items-center gap-1 text-xs text-gray-400">
                  <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="whitespace-nowrap">AI Verified</span>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Loading State -->
        <div v-if="insights.length === 0" class="text-center py-8">
          <div class="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p class="text-gray-500 dark:text-gray-400">AI is analyzing markets...</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800">
      <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Powered by HeliconTrade AI</span>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live Analysis</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800 rounded;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-gray-400 dark:bg-gray-600 rounded hover:bg-gray-500 dark:hover:bg-gray-500;
}

/* Insight transition animations */
.insight-enter-active {
  transition: all 0.5s ease;
}

.insight-leave-active {
  transition: all 0.3s ease;
}

.insight-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.insight-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}

.insight-move {
  transition: transform 0.5s ease;
}

/* Hover glow effect */
.ai-insights-feed:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.dark .ai-insights-feed:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.2);
}

/* Pulse animation for high priority insights */
.border-l-green-500 {
  animation: pulse-green 2s infinite;
}

.border-l-red-500 {
  animation: pulse-red 2s infinite;
}

@keyframes pulse-green {
  0%, 100% { border-left-color: rgb(34, 197, 94); }
  50% { border-left-color: rgb(74, 222, 128); }
}

@keyframes pulse-red {
  0%, 100% { border-left-color: rgb(239, 68, 68); }
  50% { border-left-color: rgb(248, 113, 113); }
}
</style>
