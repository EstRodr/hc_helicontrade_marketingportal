<script setup lang="ts">
const config = useRuntimeConfig()

// SEO configuration
useHead({
  title: 'Pricing - HeliconTrade Trading Plans',
  meta: [
    { name: 'description', content: 'Choose the perfect trading plan for your needs. Free starter plan available, with professional and enterprise options.' },
    { name: 'keywords', content: 'trading plans, pricing, subscription, free trading, professional trading' }
  ]
})

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'Forever',
    description: 'Perfect for beginners learning to trade',
    features: [
      'Basic charting tools',
      'Educational resources',
      'Paper trading simulator',
      'Community access',
      'Mobile app access',
      'Email support'
    ],
    cta: 'Start Free',
    popular: false,
    color: 'gray'
  },
  {
    name: 'Professional',
    price: '$29',
    period: 'per month',
    description: 'For serious traders who need advanced tools',
    features: [
      'Advanced charting & indicators',
      'Real-time market data',
      'Portfolio analytics',
      'Risk management tools',
      'Priority support',
      'Advanced order types',
      'API access',
      'Custom alerts'
    ],
    cta: 'Start 14-Day Free Trial',
    popular: true,
    color: 'blue'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'Contact us',
    description: 'For institutions and high-volume traders',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'White-label solutions',
      'Advanced compliance tools',
      'Institutional-grade security',
      'SLA guarantees',
      'Custom training'
    ],
    cta: 'Contact Sales',
    popular: false,
    color: 'purple'
  }
]

// Use centralized redirect utilities
const { redirectToRegister } = useAppRedirects()

function contactSales() {
  // Redirect to contact form with enterprise inquiry
  window.location.href = '/contact?plan=enterprise'
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
          Simple, Transparent Pricing
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Start free and upgrade as you grow. No hidden fees, cancel anytime.
        </p>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-3 gap-8">
          <div 
            v-for="plan in plans" 
            :key="plan.name"
            class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8"
            :class="{ 'ring-2 ring-blue-500 scale-105': plan.popular }"
          >
            <!-- Popular Badge -->
            <div v-if="plan.popular" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>

            <!-- Plan Header -->
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ plan.name }}
              </h3>
              <div class="mb-4">
                <span class="text-4xl font-bold text-gray-900 dark:text-white">
                  {{ plan.price }}
                </span>
                <span v-if="plan.price !== 'Free' && plan.price !== 'Custom'" class="text-gray-500 dark:text-gray-400">
                  /{{ plan.period }}
                </span>
                <span v-else-if="plan.price === 'Custom'" class="text-gray-500 dark:text-gray-400 text-lg">
                  {{ plan.period }}
                </span>
              </div>
              <p class="text-gray-600 dark:text-gray-300">
                {{ plan.description }}
              </p>
            </div>

            <!-- Features List -->
            <ul class="space-y-4 mb-8">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA Button -->
            <button 
              @click="plan.name === 'Enterprise' ? contactSales() : redirectToRegister()"
              class="w-full py-3 px-6 rounded-lg font-semibold transition-colors"
              :class="plan.popular 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600'"
            >
              {{ plan.cta }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div class="space-y-8">
          <div class="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Can I change plans anytime?
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any charges.
            </p>
          </div>

          <div class="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Is there a free trial?
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              The Starter plan is free forever. Professional plans come with a 14-day free trial, no credit card required.
            </p>
          </div>

          <div class="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              What payment methods do you accept?
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can arrange custom payment terms.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>
