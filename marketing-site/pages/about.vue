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
  title: computed(() => t('about.meta.title')),
  meta: [
    { name: 'description', content: computed(() => t('about.meta.description')) },
    { name: 'keywords', content: computed(() => t('about.meta.keywords')) }
  ]
})

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
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6" v-html="formatHeadlineText($t('about.hero.title'))">
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8" v-html="formatSubheadlineText($t('about.hero.subtitle'))">
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {{ $t('about.mission.title') }}
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {{ $t('about.mission.description1') }}
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-300">
              {{ $t('about.mission.description2') }}
            </p>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {{ $t('about.stats.foundedValue') }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-300">
                  {{ $t('about.stats.founded') }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {{ $t('about.stats.activeUsersValue') }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-300">
                  {{ $t('about.stats.activeUsers') }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {{ $t('about.stats.countriesValue') }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-300">
                  {{ $t('about.stats.countries') }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {{ $t('about.stats.supportRatingValue') }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-300">
                  {{ $t('about.stats.supportRating') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {{ $t('about.values.title') }}
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            {{ $t('about.values.subtitle') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ $t('about.values.missionDriven.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ $t('about.values.missionDriven.description') }}
            </p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🔒</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ $t('about.values.securityFirst.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ $t('about.values.securityFirst.description') }}
            </p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🚀</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ $t('about.values.innovation.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ $t('about.values.innovation.description') }}
            </p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🤝</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ $t('about.values.community.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ $t('about.values.community.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {{ $t('about.story.title') }}
        </h2>
        <div class="text-lg text-gray-600 dark:text-gray-300 space-y-6">
          <p>
            {{ $t('about.story.description1') }}
          </p>
          <p>
            {{ $t('about.story.description2') }}
          </p>
          <p>
            {{ $t('about.story.description3') }}
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6" v-html="formatHeadlineText($t('about.cta.title'))">
        </h2>
        <p class="text-xl text-blue-100 mb-8" v-html="formatSubheadlineText($t('about.cta.subtitle'))">
        </p>
        <button 
          @click="redirectToRegister"
          class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
        >
          {{ $t('about.cta.button') }}
        </button>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>
