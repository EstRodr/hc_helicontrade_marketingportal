<script setup lang="ts">
const config = useRuntimeConfig()
const { t } = useI18n()

// SEO configuration
useHead({
  title: t('pricing.meta.title'),
  meta: [
    { name: 'description', content: t('pricing.meta.description') },
    { name: 'keywords', content: t('pricing.meta.keywords') }
  ]
})

const plans = [
  {
    name: t('pricing.plans.starter.name'),
    price: t('pricing.plans.starter.price'),
    period: t('pricing.plans.starter.period'),
    description: t('pricing.plans.starter.description'),
    tokensIncluded: 100,
    features: [
      t('pricing.plans.starter.features.allFeatures'),
      t('pricing.plans.starter.features.research'),
      t('pricing.plans.starter.features.alerts'),
      t('pricing.plans.starter.features.backtesting'),
      t('pricing.plans.starter.features.charting'),
      t('pricing.plans.starter.features.emailSupport')
    ],
    cta: t('pricing.plans.starter.cta'),
    popular: false,
    color: 'gray',
    badge: null
  },
  {
    name: t('pricing.plans.trader.name'),
    price: '$19',
    period: t('pricing.plans.trader.period'),
    description: t('pricing.plans.trader.description'),
    tokensIncluded: 1000,
    features: [
      t('pricing.plans.trader.features.allFeatures'),
      t('pricing.plans.trader.features.moreTokens'),
      t('pricing.plans.trader.features.portfolioTracking'),
      t('pricing.plans.trader.features.prioritySupport'),
      t('pricing.plans.trader.features.tokenBundles'),
      t('pricing.plans.trader.features.mobileApp')
    ],
    cta: t('pricing.plans.trader.cta'),
    popular: true,
    color: 'blue',
    badge: t('pricing.mostPopular')
  },
  {
    name: t('pricing.plans.pro.name'),
    price: '$99',
    period: t('pricing.plans.pro.period'),
    description: t('pricing.plans.pro.description'),
    tokensIncluded: 10000,
    features: [
      t('pricing.plans.pro.features.allFeatures'),
      t('pricing.plans.pro.features.moreTokens'),
      t('pricing.plans.pro.features.betaAccess'),
      t('pricing.plans.pro.features.apiAccess'),
      t('pricing.plans.pro.features.advancedAI'),
      t('pricing.plans.pro.features.tokenBundles')
    ],
    cta: t('pricing.plans.pro.cta'),
    popular: false,
    color: 'purple',
    badge: null
  },
  {
    name: t('pricing.plans.enterprise.name'),
    price: t('pricing.plans.enterprise.price'),
    period: t('pricing.plans.enterprise.period'),
    description: t('pricing.plans.enterprise.description'),
    tokensIncluded: null,
    features: [
      t('pricing.plans.enterprise.features.everything'),
      t('pricing.plans.enterprise.features.customIntegrations'),
      t('pricing.plans.enterprise.features.whiteLabel'),
      t('pricing.plans.enterprise.features.dedicatedSupport'),
      t('pricing.plans.enterprise.features.slaGuarantees'),
      t('pricing.plans.enterprise.features.customTraining')
    ],
    cta: t('pricing.plans.enterprise.cta'),
    popular: false,
    color: 'indigo',
    badge: null
  }
]

const tokenPricing = [
  {
    type: t('pricing.tokens.research.title'),
    description: t('pricing.tokens.research.description'),
    cost: t('pricing.tokens.research.cost'),
    icon: '📊'
  },
  {
    type: t('pricing.tokens.alerts.title'),
    description: t('pricing.tokens.alerts.description'),
    cost: t('pricing.tokens.alerts.cost'),
    icon: '🔔'
  },
  {
    type: t('pricing.tokens.backtesting.title'),
    description: t('pricing.tokens.backtesting.description'),
    cost: t('pricing.tokens.backtesting.cost'),
    icon: '📈'
  }
]

// Usage calculator state
const calculatorData = ref({
  researchPerMonth: 50,
  alertsPerMonth: 200,
  backtestsPerMonth: 10
})

const calculatedTokens = computed(() => {
  return calculatorData.value.researchPerMonth * 2 + 
         calculatorData.value.alertsPerMonth * 1 + 
         calculatorData.value.backtestsPerMonth * 5
})

const bundlesNeeded = computed(() => {
  return Math.ceil(calculatedTokens.value / 1000)
})

const monthlyCost = computed(() => {
  return bundlesNeeded.value * 10
})

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
          {{ t('pricing.hero.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ t('pricing.hero.subtitle') }}
        </p>
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 max-w-lg mx-auto">
          <p class="text-sm text-blue-800 dark:text-blue-200">
            <span class="font-semibold">{{ t('pricing.hero.tokenBased') }}</span><br>
            {{ t('pricing.hero.tokenDescription') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-4">
          <div 
            v-for="plan in plans" 
            :key="plan.name"
            class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8"
            :class="{ 'ring-2 ring-blue-500 scale-105 shadow-2xl': plan.popular }"
          >
            <!-- Popular Badge -->
            <div v-if="plan.badge" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                {{ plan.badge }}
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
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                {{ plan.description }}
              </p>
              
              <!-- Token Information -->
              <div v-if="plan.tokensIncluded" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {{ plan.tokensIncluded.toLocaleString() }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('pricing.tokensIncluded') }}
                </div>
              </div>
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
              @click="plan.name.includes('Enterprise') ? contactSales() : redirectToRegister()"
              class="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200"
              :class="plan.popular 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                : 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 hover:shadow-md'"
            >
              {{ plan.cta }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Token Pricing Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('pricing.tokenPricing.title') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {{ t('pricing.tokenPricing.description') }}
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="token in tokenPricing" :key="token.type" 
               class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">{{ token.icon }}</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ token.type }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              {{ token.description }}
            </p>
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ token.cost }}
            </div>
          </div>
        </div>
        
        <!-- Additional Token Purchase -->
        <div class="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 text-center">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('pricing.additionalTokens.title') }}
          </h3>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {{ t('pricing.additionalTokens.description') }}
          </p>
          <div class="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            {{ t('pricing.additionalTokens.bundlePrice') }}
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {{ t('pricing.additionalTokens.note') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Usage Calculator -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {{ t('pricing.calculator.title') }}
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300">
              {{ t('pricing.calculator.description') }}
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('pricing.calculator.researchPerMonth') }}
              </label>
              <input 
                v-model.number="calculatorData.researchPerMonth"
                type="number" 
                min="0" 
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ calculatorData.researchPerMonth * 2 }} {{ t('pricing.calculator.tokens') }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('pricing.calculator.alertsPerMonth') }}
              </label>
              <input 
                v-model.number="calculatorData.alertsPerMonth"
                type="number" 
                min="0" 
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ calculatorData.alertsPerMonth }} {{ t('pricing.calculator.tokens') }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('pricing.calculator.backtestsPerMonth') }}
              </label>
              <input 
                v-model.number="calculatorData.backtestsPerMonth"
                type="number" 
                min="0" 
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ calculatorData.backtestsPerMonth * 5 }} {{ t('pricing.calculator.tokens') }}</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {{ calculatedTokens.toLocaleString() }} {{ t('pricing.calculator.totalTokens') }}
            </div>
            <div class="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              {{ bundlesNeeded }} {{ t('pricing.calculator.bundlesNeeded') }}
            </div>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {{ t('pricing.calculator.monthlyCost') }}: 
              <span class="font-semibold text-green-600 dark:text-green-400">${{ monthlyCost }}/month</span>
            </p>
            <button 
              @click="redirectToRegister()"
              class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {{ t('pricing.calculator.buyBundles') }}
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
            {{ t('pricing.faq.title') }}
          </h2>
        </div>

        <div class="space-y-8">
          <div class="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {{ t('pricing.faq.whatAreTokens.question') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t('pricing.faq.whatAreTokens.answer') }}
            </p>
          </div>

          <div class="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {{ t('pricing.faq.tokenExpiry.question') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t('pricing.faq.tokenExpiry.answer') }}
            </p>
          </div>

          <div class="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {{ t('pricing.faq.changePlans.question') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t('pricing.faq.changePlans.answer') }}
            </p>
          </div>

          <div class="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {{ t('pricing.faq.freeTrial.question') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t('pricing.faq.freeTrial.answer') }}
            </p>
          </div>

          <div class="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {{ t('pricing.faq.paymentMethods.question') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t('pricing.faq.paymentMethods.answer') }}
            </p>
          </div>
          
          <div class="pb-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {{ t('pricing.faq.additionalTokens.question') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t('pricing.faq.additionalTokens.answer') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>
