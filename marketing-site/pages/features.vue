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
          {{ $t('features.hero.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ $t('features.hero.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="index" class="feature-card">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full flex flex-col">
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ feature.category }}</h3>
            <div class="space-y-4 mt-4 flex-grow">
              <div v-for="(item, itemIndex) in feature.items" :key="itemIndex" class="flex items-start">
                <div class="text-2xl mr-3 mt-1">{{ item.icon }}</div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ item.title }}</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">{{ item.description }}</p>
                </div>
              </div>
            </div>
            <button
              @click="redirectToRegister"
              class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
        <p class="text-xl mb-8">Join thousands of traders using our platform to make better trading decisions.</p>
        <button
          @click="redirectToRegister"
          class="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Create Free Account
        </button>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
