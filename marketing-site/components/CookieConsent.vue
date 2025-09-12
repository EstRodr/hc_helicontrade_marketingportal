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
  <!-- Cookie Consent Banner -->
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    <div
      v-if="isVisible"
      class="fixed inset-x-0 bottom-0 z-50 p-4"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div class="mx-auto max-w-7xl">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
          <!-- Basic Consent View -->
          <div v-if="!showPreferences">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <span class="text-2xl">🍪</span>
              </div>
              <div class="flex-1">
                <h3 id="cookie-consent-title" class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  We value your privacy
                </h3>
                <p id="cookie-consent-description" class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                  You can choose which cookies to accept below.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-3">
                  <button
                    @click="acceptAll"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    @click="rejectAll"
                    class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    @click="togglePreferences"
                    class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Customize
                  </button>
                </div>
                
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  By continuing to use our site, you consent to our 
                  <NuxtLink to="/legal/privacy" class="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</NuxtLink>
                  and 
                  <NuxtLink to="/legal/cookies" class="text-blue-600 dark:text-blue-400 hover:underline">Cookie Policy</NuxtLink>.
                </p>
              </div>
              
              <button
                @click="isVisible = false"
                class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close cookie consent"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Detailed Preferences View -->
          <div v-else class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Cookie Preferences
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Manage your cookie preferences. You can enable or disable different categories below.
              </p>
            </div>

            <!-- Cookie Categories -->
            <div class="space-y-4">
              <!-- Necessary Cookies -->
              <div class="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                    Necessary Cookies
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Essential for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <div class="ml-4">
                  <input
                    type="checkbox"
                    :checked="preferences.necessary"
                    disabled
                    class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 opacity-50"
                  >
                </div>
              </div>

              <!-- Analytics Cookies -->
              <div class="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                    Analytics Cookies
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Help us understand how visitors interact with our website (Google Analytics, PostHog).
                  </p>
                </div>
                <div class="ml-4">
                  <input
                    v-model="preferences.analytics"
                    type="checkbox"
                    class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
                  >
                </div>
              </div>

              <!-- Marketing Cookies -->
              <div class="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                    Marketing Cookies
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Used to deliver personalized advertisements and measure campaign effectiveness.
                  </p>
                </div>
                <div class="ml-4">
                  <input
                    v-model="preferences.marketing"
                    type="checkbox"
                    class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
                  >
                </div>
              </div>

              <!-- Functional Cookies -->
              <div class="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                    Functional Cookies
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Enable enhanced functionality like chat widgets and personalized content.
                  </p>
                </div>
                <div class="ml-4">
                  <input
                    v-model="preferences.functional"
                    type="checkbox"
                    class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
                  >
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                @click="acceptSelected"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Save Preferences
              </button>
              <button
                @click="acceptAll"
                class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Accept All
              </button>
              <button
                @click="togglePreferences"
                class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
