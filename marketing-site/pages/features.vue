<script setup lang="ts">
const config = useRuntimeConfig()

// SEO configuration
useHead({
  title: 'Features - HeliconTrade Trading Platform',
  meta: [
    { name: 'description', content: 'Discover powerful trading features including advanced charts, real-time data, portfolio management, and educational resources.' },
    { name: 'keywords', content: 'trading features, charts, portfolio, analytics, education, crypto trading, stock trading' }
  ]
})

const features = [
  {
    category: 'Trading Tools',
    icon: '📈',
    items: [
      {
        title: 'Advanced Charting',
        description: 'Professional-grade charts with 100+ technical indicators, drawing tools, and custom timeframes.',
        icon: '📊'
      },
      {
        title: 'Real-Time Data',
        description: 'Live market data with millisecond latency for accurate trading decisions.',
        icon: '⚡'
      },
      {
        title: 'Order Management',
        description: 'Advanced order types including stop-loss, take-profit, and algorithmic trading.',
        icon: '🎯'
      }
    ]
  },
  {
    category: 'Portfolio Management',
    icon: '💼',
    items: [
      {
        title: 'Portfolio Tracking',
        description: 'Real-time portfolio performance with detailed analytics and risk metrics.',
        icon: '📊'
      },
      {
        title: 'Risk Management',
        description: 'Built-in risk assessment tools and position sizing calculators.',
        icon: '🛡️'
      },
      {
        title: 'Performance Analytics',
        description: 'Comprehensive reports on your trading performance and strategy effectiveness.',
        icon: '📈'
      }
    ]
  },
  {
    category: 'Education & Research',
    icon: '🎓',
    items: [
      {
        title: 'Learning Center',
        description: 'Structured courses from beginner to advanced trading strategies.',
        icon: '📚'
      },
      {
        title: 'Market Analysis',
        description: 'Daily market insights, news, and expert analysis to inform your trades.',
        icon: '🔍'
      },
      {
        title: 'Trading Simulator',
        description: 'Practice trading with virtual money in real market conditions.',
        icon: '🎮'
      }
    ]
  }
]

function redirectToRegister() {
  window.location.href = `${config.public.appUrl}/auth/register`
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Powerful Trading Features
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Everything you need to trade successfully, from beginner-friendly tools to advanced analytics.
        </p>
      </div>
    </section>

    <!-- Features Sections -->
    <section class="pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div v-for="(section, index) in features" :key="section.category" class="mb-20">
          <!-- Section Header -->
          <div class="text-center mb-12">
            <div class="text-4xl mb-4">{{ section.icon }}</div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {{ section.category }}
            </h2>
          </div>

          <!-- Features Grid -->
          <div class="grid md:grid-cols-3 gap-8">
            <div 
              v-for="feature in section.items" 
              :key="feature.title"
              class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div class="text-3xl mb-4">{{ feature.icon }}</div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Experience These Features?
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Start trading today and discover why thousands choose HeliconTrade.
        </p>
        <button 
          @click="redirectToRegister"
          class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
        >
          Start Free Trial
        </button>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>
