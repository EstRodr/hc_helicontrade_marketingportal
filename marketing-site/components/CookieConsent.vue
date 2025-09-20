<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const preferences = ref({
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  functional: false
})

const showPreferences = ref(false)

// Check if user has already made a choice
onMounted(() => {
  const consent = localStorage.getItem('helicontrade-cookie-consent')
  if (!consent) {
    isVisible.value = true
  } else {
    // Load saved preferences
    const saved = JSON.parse(consent)
    preferences.value = { ...preferences.value, ...saved }
    initializeAnalytics()
  }
})

const acceptAll = () => {
  preferences.value = {
    necessary: true,
    analytics: true,
    marketing: true,
    functional: true
  }
  saveConsent()
}

const acceptSelected = () => {
  saveConsent()
}

const rejectAll = () => {
  preferences.value = {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  }
  saveConsent()
}

const saveConsent = () => {
  localStorage.setItem('helicontrade-cookie-consent', JSON.stringify({
    ...preferences.value,
    timestamp: new Date().toISOString(),
    version: '1.0'
  }))
  
  isVisible.value = false
  showPreferences.value = false
  initializeAnalytics()
}

const initializeAnalytics = () => {
  // Only initialize analytics if user has consented
  if (preferences.value.analytics) {
    // Analytics will be loaded by the plugins based on consent
    window.dispatchEvent(new CustomEvent('analytics-consent-granted'))
  }
  
  if (preferences.value.marketing) {
    window.dispatchEvent(new CustomEvent('marketing-consent-granted'))
  }
}

const togglePreferences = () => {
  showPreferences.value = !showPreferences.value
}

// Allow external access to reset consent (for testing or user preference changes)
defineExpose({
  resetConsent: () => {
    localStorage.removeItem('helicontrade-cookie-consent')
    isVisible.value = true
    preferences.value = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
  }
})
</script>

<template>
  <!-- Minimalistic Cookie Consent Banner -->
  <Transition
    enter-active-class="transition ease-out duration-500 transform"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-300 transform"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div
      v-if="isVisible"
      class="fixed inset-x-0 bottom-0 z-50 backdrop-blur-md bg-white/95 dark:bg-gray-900/95 border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div class="max-w-7xl mx-auto p-4 sm:p-6">
        <!-- Minimalistic Consent View -->
        <div v-if="!showPreferences">
          <!-- Mobile-first layout -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <div class="flex items-start gap-3 flex-1">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 id="cookie-consent-title" class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base leading-tight">
                  We use cookies to improve your experience
                </h3>
                <p id="cookie-consent-description" class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                  Accept all cookies for the best experience or customize your preferences.
                </p>
              </div>
            </div>
            
            <!-- Action Buttons - Mobile optimized -->
            <div class="flex flex-row sm:flex-col lg:flex-row items-stretch sm:items-end lg:items-center gap-2 sm:gap-3">
              <button
                @click="togglePreferences"
                class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap touch-target"
              >
                Settings
              </button>
              <button
                @click="acceptAll"
                class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap touch-target"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>

        <!-- Detailed Preferences View -->
        <div v-else class="space-y-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Cookie Preferences
            </h3>
            <button
              @click="togglePreferences"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-target"
              aria-label="Close preferences"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>

          <!-- Cookie Categories - Compact Design -->
          <div class="space-y-3">
            <!-- Necessary Cookies -->
            <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white text-sm flex items-center gap-2">
                  <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                  Necessary
                </h4>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Essential for website functionality
                </p>
              </div>
              <div class="w-10 h-6 bg-green-100 dark:bg-green-900 rounded-full relative opacity-75">
                <div class="w-4 h-4 bg-green-500 rounded-full absolute top-1 right-1 transition-all"></div>
              </div>
            </div>

            <!-- Analytics Cookies -->
            <div class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 transition-colors">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white text-sm flex items-center gap-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Analytics
                </h4>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Help us improve your experience
                </p>
              </div>
              <button
                @click="preferences.analytics = !preferences.analytics"
                class="w-10 h-6 rounded-full relative transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                :class="preferences.analytics ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'"
              >
                <div class="w-4 h-4 bg-white rounded-full absolute top-1 transition-all"
                     :class="preferences.analytics ? 'right-1' : 'left-1'"></div>
              </button>
            </div>

            <!-- Marketing Cookies -->
            <div class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 transition-colors">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white text-sm flex items-center gap-2">
                  <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Marketing
                </h4>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Personalized ads and content
                </p>
              </div>
              <button
                @click="preferences.marketing = !preferences.marketing"
                class="w-10 h-6 rounded-full relative transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                :class="preferences.marketing ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'"
              >
                <div class="w-4 h-4 bg-white rounded-full absolute top-1 transition-all"
                     :class="preferences.marketing ? 'right-1' : 'left-1'"></div>
              </button>
            </div>

            <!-- Functional Cookies -->
            <div class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 transition-colors">
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white text-sm flex items-center gap-2">
                  <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Functional
                </h4>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Enhanced features and personalization
                </p>
              </div>
              <button
                @click="preferences.functional = !preferences.functional"
                class="w-10 h-6 rounded-full relative transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                :class="preferences.functional ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600'"
              >
                <div class="w-4 h-4 bg-white rounded-full absolute top-1 transition-all"
                     :class="preferences.functional ? 'right-1' : 'left-1'"></div>
              </button>
            </div>
          </div>

          <!-- Action Buttons - Mobile optimized -->
          <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <button
              @click="acceptSelected"
              class="w-full sm:w-auto px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-target order-2 sm:order-1"
            >
              Save Selected
            </button>
            <button
              @click="acceptAll"
              class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 shadow-lg touch-target order-1 sm:order-2"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
