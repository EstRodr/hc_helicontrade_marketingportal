<script setup lang="ts">
import { useI18n } from '#imports'
import { usePersonalization } from '~/composables/usePersonalization'
import { highlightHeroHeadline, highlightHeroSubheadline, getUserContextForHighlighting } from '~/utils/textHighlighting'

const config = useRuntimeConfig()
const { t, locale } = useI18n()
const { userContext } = usePersonalization()

// Get highlighting context for personalization
const highlightContext = computed(() => 
  getUserContextForHighlighting(userContext, locale.value)
)

// Highlighting functions
const formatHeadlineText = (text) => highlightHeroHeadline(text, locale.value, highlightContext.value)
const formatSubheadlineText = (text) => highlightHeroSubheadline(text, locale.value, highlightContext.value)

// SEO configuration
useHead({
  title: computed(() => t('features.meta.title')),
  meta: [
    { name: 'description', content: computed(() => t('features.meta.description')) },
    { name: 'keywords', content: computed(() => t('features.meta.keywords')) }
  ]
})

// Features structure now uses translation keys
const featureCategories = [
  {
    key: 'tradingTools',
    icon: '📈'
  },
  {
    key: 'portfolioManagement', 
    icon: '💼'
  },
  {
    key: 'education',
    icon: '🎓'
  }
]

// Use centralized redirect utilities
const { redirectToRegister } = useAppRedirects()
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6" v-html="formatHeadlineText($t('features.hero.title'))">
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8" v-html="formatSubheadlineText($t('features.hero.subtitle'))">
        </p>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Trading Tools -->
        <div class="feature-card">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full flex flex-col">
            <div class="text-4xl mb-4">{{ $t('features.categories.tradingTools.icon') }}</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ $t('features.categories.tradingTools.title') }}
            </h3>
            <div class="space-y-4 mt-4 flex-grow">
              <div class="flex items-start">
                <div class="text-2xl mr-3 mt-1">{{ $t('features.categories.tradingTools.items.advancedCharting.icon') }}</div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    {{ $t('features.categories.tradingTools.items.advancedCharting.title') }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    {{ $t('features.categories.tradingTools.items.advancedCharting.description') }}
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-2xl mr-3 mt-1">{{ $t('features.categories.tradingTools.items.realTimeData.icon') }}</div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    {{ $t('features.categories.tradingTools.items.realTimeData.title') }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    {{ $t('features.categories.tradingTools.items.realTimeData.description') }}
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-2xl mr-3 mt-1">{{ $t('features.categories.tradingTools.items.orderManagement.icon') }}</div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    {{ $t('features.categories.tradingTools.items.orderManagement.title') }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    {{ $t('features.categories.tradingTools.items.orderManagement.description') }}
                  </p>
                </div>
              </div>
            </div>
            <button
              @click="redirectToRegister"
              class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {{ $t('common.cta.getStarted') }}
            </button>
          </div>
        </div>

        <!-- Portfolio Management -->
        <div class="feature-card">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full flex flex-col">
            <div class="text-4xl mb-4">{{ $t('features.categories.portfolioManagement.icon') }}</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ $t('features.categories.portfolioManagement.title') }}
            </h3>
            <div class="space-y-4 mt-4 flex-grow">
              <div class="flex items-start">
                <div class="text-2xl mr-3 mt-1">{{ $t('features.categories.portfolioManagement.items.portfolioTracking.icon') }}</div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    {{ $t('features.categories.portfolioManagement.items.portfolioTracking.title') }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    {{ $t('features.categories.portfolioManagement.items.portfolioTracking.description') }}
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-2xl mr-3 mt-1">{{ $t('features.categories.portfolioManagement.items.riskManagement.icon') }}</div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    {{ $t('features.categories.portfolioManagement.items.riskManagement.title') }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    {{ $t('features.categories.portfolioManagement.items.riskManagement.description') }}
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-2xl mr-3 mt-1">{{ $t('features.categories.portfolioManagement.items.performanceAnalytics.icon') }}</div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    {{ $t('features.categories.portfolioManagement.items.performanceAnalytics.title') }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    {{ $t('features.categories.portfolioManagement.items.performanceAnalytics.description') }}
                  </p>
                </div>
              </div>
            </div>
            <button
              @click="redirectToRegister"
              class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {{ $t('common.cta.getStarted') }}
            </button>
          </div>
        </div>

        <!-- Education & Research -->
        <div class="feature-card">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full flex flex-col">
            <div class="text-4xl mb-4">{{ $t('features.categories.education.icon') }}</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ $t('features.categories.education.title') }}
            </h3>
            <div class="space-y-4 mt-4 flex-grow">
              <div class="flex items-start">
                <div class="text-2xl mr-3 mt-1">{{ $t('features.categories.education.items.tradingAcademy.icon') }}</div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    {{ $t('features.categories.education.items.tradingAcademy.title') }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    {{ $t('features.categories.education.items.tradingAcademy.description') }}
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-2xl mr-3 mt-1">{{ $t('features.categories.education.items.webinars.icon') }}</div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    {{ $t('features.categories.education.items.webinars.title') }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    {{ $t('features.categories.education.items.webinars.description') }}
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="text-2xl mr-3 mt-1">{{ $t('features.categories.education.items.community.icon') }}</div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    {{ $t('features.categories.education.items.community.title') }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    {{ $t('features.categories.education.items.community.description') }}
                  </p>
                </div>
              </div>
            </div>
            <button
              @click="redirectToRegister"
              class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {{ $t('common.cta.getStarted') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4" v-html="formatHeadlineText($t('features.cta.title'))">
        </h2>
        <p class="text-xl mb-8" v-html="formatSubheadlineText($t('features.cta.subtitle'))">
        </p>
        <button
          @click="redirectToRegister"
          class="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg text-lg transition-colors"
        >
          {{ $t('common.cta.createAccount') }}
        </button>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
