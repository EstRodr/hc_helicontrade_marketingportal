<script setup lang="ts">
const config = useRuntimeConfig()

// SEO configuration
useHead({
  title: 'How It Works — AI-Powered Trading Platform | HeliconTrade',
  meta: [
    { name: 'description', content: 'Discover how our AI scans global markets 24/7 to find trading opportunities matching your strategy. Learn about our 4-step process from setup to smart alerts.' },
    { name: 'keywords', content: 'AI trading, how it works, automated alerts, market scanning, trading strategy, AI assistant' }
  ]
})

// The 4-step process
const steps = [
  {
    number: 1,
    title: 'Define Your Strategy',
    subtitle: 'Tell us what you\'re looking for',
    description: 'Set your preferred assets (stocks, crypto, forex), timeframes, risk tolerance, and trading patterns. Our AI learns your unique style.',
    features: [
      'Asset class selection (stocks, crypto, indices, forex)',
      'Risk tolerance and position sizing preferences', 
      'Technical patterns and setups you prefer',
      'Fundamental criteria that matter to you'
    ],
    color: 'blue'
  },
  {
    number: 2,
    title: 'AI Takes Over',
    subtitle: 'We monitor everything, everywhere',
    description: 'Our AI scans 10,000+ instruments across global markets 24/7, analyzing millions of data points to find opportunities matching your criteria.',
    features: [
      '24/7 market monitoring across all global exchanges',
      'Real-time technical analysis on multiple timeframes',
      'Fundamental data analysis and news sentiment',
      'Pattern recognition using advanced algorithms'
    ],
    color: 'purple'
  },
  {
    number: 3,
    title: 'Smart Alerts',
    subtitle: 'Only the setups that matter',
    description: 'When conditions align perfectly with your strategy, you get instant notifications with all the context you need to make informed decisions.',
    features: [
      'Instant push notifications and email alerts',
      'Complete setup analysis with charts and data',
      'Risk/reward calculations and position suggestions',
      'Market context and reasoning behind each alert'
    ],
    color: 'green'
  },
  {
    number: 4,
    title: 'You Decide',
    subtitle: 'AI finds, you trade',
    description: 'Review the opportunity with all our research, then execute the trade through your preferred broker. You maintain complete control.',
    features: [
      'Direct integration with major brokers',
      'One-click trade execution (optional)',
      'Portfolio tracking and performance analytics',
      'Continuous strategy optimization based on results'
    ],
    color: 'orange'
  }
]

// Technology highlights
const techFeatures = [
  {
    title: 'Advanced Pattern Recognition',
    description: 'Our AI identifies complex technical patterns across multiple timeframes that human traders might miss.',
    icon: 'brain'
  },
  {
    title: 'Real-Time Data Processing',
    description: 'Process millions of market data points every second to identify opportunities as they develop.',
    icon: 'lightning'
  },
  {
    title: 'Multi-Asset Coverage',
    description: 'Monitor stocks, crypto, forex, indices, and commodities simultaneously across global markets.',
    icon: 'globe'
  },
  {
    title: 'Smart Filtering',
    description: 'Eliminate noise and false signals by learning from your trading preferences and feedback.',
    icon: 'filter'
  }
]

// Redirect functions
function startTrading() {
  window.location.href = `${config.public.appUrl}/auth/register`
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clip-rule="evenodd"></path>
          </svg>
          Behind the Scenes
        </div>
        
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          How Our AI
          <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Works for You
          </span>
        </h1>
        
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          From strategy setup to smart alerts, discover how our AI transforms your trading approach 
          by monitoring global markets 24/7 so you don't have to.
        </p>
      </div>
    </section>

    <!-- 4-Step Process -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Four Simple Steps to 
            <span class="text-blue-600 dark:text-blue-400">Smarter Trading</span>
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Set it up once, then let AI handle the heavy lifting while you focus on making decisions.
          </p>
        </div>

        <div class="space-y-16 lg:space-y-20">
          <div 
            v-for="(step, index) in steps" 
            :key="step.number"
            :class="['flex flex-col items-center gap-8 lg:gap-12', index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse']"
          >
            <!-- Step Content -->
            <div class="flex-1 space-y-4 lg:space-y-6 text-center lg:text-left">
              <div class="flex flex-col lg:flex-row items-center lg:items-center gap-4">
                <div 
                  class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  :class="{
                    'bg-gradient-to-br from-blue-500 to-blue-600': step.color === 'blue',
                    'bg-gradient-to-br from-purple-500 to-purple-600': step.color === 'purple',
                    'bg-gradient-to-br from-green-500 to-green-600': step.color === 'green',
                    'bg-gradient-to-br from-orange-500 to-orange-600': step.color === 'orange'
                  }"
                >
                  {{ step.number }}
                </div>
                <div class="text-center lg:text-left">
                  <h3 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {{ step.title }}
                  </h3>
                  <p 
                    class="text-sm font-medium mt-1"
                    :class="{
                      'text-blue-600 dark:text-blue-400': step.color === 'blue',
                      'text-purple-600 dark:text-purple-400': step.color === 'purple', 
                      'text-green-600 dark:text-green-400': step.color === 'green',
                      'text-orange-600 dark:text-orange-400': step.color === 'orange'
                    }"
                  >
                    {{ step.subtitle }}
                  </p>
                </div>
              </div>

              <p class="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed px-4 lg:px-0">
                {{ step.description }}
              </p>

              <ul class="space-y-3 max-w-md lg:max-w-none mx-auto lg:mx-0">
                <li 
                  v-for="feature in step.features" 
                  :key="feature"
                  class="flex items-start gap-3 text-left"
                >
                  <svg class="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm lg:text-base text-gray-700 dark:text-gray-300">{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- Step Visual -->
            <div class="flex-1 flex justify-center w-full">
              <div 
                class="w-full max-w-sm h-48 lg:w-80 lg:h-64 rounded-2xl bg-gradient-to-br p-6 lg:p-8 flex items-center justify-center"
                :class="{
                  'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20': step.color === 'blue',
                  'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20': step.color === 'purple',
                  'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20': step.color === 'green',
                  'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20': step.color === 'orange'
                }"
              >
                <!-- Placeholder for step visualization -->
                <div class="text-center">
                  <div 
                    class="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    :class="{
                      'bg-blue-500': step.color === 'blue',
                      'bg-purple-500': step.color === 'purple',
                      'bg-green-500': step.color === 'green',
                      'bg-orange-500': step.color === 'orange'
                    }"
                  >
                    <span class="text-2xl font-bold text-white">{{ step.number }}</span>
                  </div>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Step {{ step.number }} Visualization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Features -->
    <section class="py-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 dark:from-gray-800 dark:via-blue-900/10 dark:to-purple-900/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powered by Advanced 
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Technology</span>
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform combines cutting-edge artificial intelligence with proven trading strategies.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center max-w-6xl mx-auto">
          <div 
            v-for="feature in techFeatures" 
            :key="feature.title"
            class="bg-white dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow"
          >
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg v-if="feature.icon === 'brain'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <svg v-if="feature.icon === 'lightning'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <svg v-if="feature.icon === 'globe'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
              <svg v-if="feature.icon === 'filter'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-white mb-6">
          Ready to Let AI Work for You?
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Join thousands of traders who've upgraded from manual market watching to AI-powered precision.
        </p>
        
        <button
          @click="startTrading"
          class="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          Start Free Trial
        </button>
        
        <p class="text-blue-100 text-sm mt-4">
          No credit card required • AI-powered alerts • 24/7 monitoring
        </p>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>
