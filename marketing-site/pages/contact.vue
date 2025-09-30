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
  title: computed(() => t('contact.meta.title')),
  meta: [
    { name: 'description', content: computed(() => t('contact.meta.description')) },
    { name: 'keywords', content: computed(() => t('contact.meta.keywords')) }
  ]
})

// Form state
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  plan: ''
})

const isSubmitting = ref(false)
const submitStatus = ref('')

// Check for plan query parameter
onMounted(() => {
  const route = useRoute()
  if (route.query.plan) {
    form.value.plan = route.query.plan as string
    form.value.subject = `${t('contact.form.fields.subjectPlaceholder')} ${route.query.plan}`
  }
})

async function submitForm() {
  isSubmitting.value = true
  submitStatus.value = ''
  
  try {
    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    submitStatus.value = 'success'
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
      plan: ''
    }
  } catch (error) {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

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
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6" v-html="formatHeadlineText($t('contact.hero.title'))">
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8" v-html="formatSubheadlineText($t('contact.hero.subtitle'))">
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {{ $t('contact.form.title') }}
            </h2>

            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ $t('contact.form.fields.fullName') }}
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  :placeholder="$t('contact.form.fields.fullNamePlaceholder')"
                >
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ $t('contact.form.fields.email') }}
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  :placeholder="$t('contact.form.fields.emailPlaceholder')"
                >
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ $t('contact.form.fields.subject') }}
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  :placeholder="$t('contact.form.fields.subjectPlaceholder')"
                >
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ $t('contact.form.fields.message') }}
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none"
                  :placeholder="$t('contact.form.fields.messagePlaceholder')"
                ></textarea>
              </div>

              <!-- Success/Error Messages -->
              <div v-if="submitStatus === 'success'" class="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                <p class="text-green-700 dark:text-green-300">
                  {{ $t('contact.form.submit.success') }}
                </p>
              </div>

              <div v-if="submitStatus === 'error'" class="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                <p class="text-red-700 dark:text-red-300">
                  {{ $t('contact.form.submit.error') }}
                </p>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                {{ isSubmitting ? $t('contact.form.submit.sending') : $t('contact.form.submit.button') }}
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {{ $t('contact.info.title') }}
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('contact.info.email.label') }}</p>
                    <p class="text-gray-900 dark:text-white">{{ $t('contact.info.email.value') }}</p>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('contact.info.office.label') }}</p>
                    <p class="text-gray-900 dark:text-white">{{ $t('contact.info.office.value') }}</p>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('contact.info.support.label') }}</p>
                    <p class="text-gray-900 dark:text-white">{{ $t('contact.info.support.value') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {{ $t('contact.quickHelp.title') }}
              </h3>
              
              <div class="space-y-4">
                <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <span class="text-sm">📚</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ $t('contact.quickHelp.helpCenter.title') }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('contact.quickHelp.helpCenter.description') }}</p>
                  </div>
                </a>

                <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <span class="text-sm">💬</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ $t('contact.quickHelp.liveChat.title') }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('contact.quickHelp.liveChat.description') }}</p>
                  </div>
                </a>

                <a href="#" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <span class="text-sm">📖</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ $t('contact.quickHelp.documentation.title') }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('contact.quickHelp.documentation.description') }}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>
