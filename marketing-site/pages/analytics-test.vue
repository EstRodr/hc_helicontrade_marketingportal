<script setup lang="ts">
const config = useRuntimeConfig()

// SEO for test page
useHead({
  title: 'Analytics Test - HeliconTrade',
  meta: [
    { name: 'robots', content: 'noindex,nofollow' }
  ]
})

// Test data
const testEmail = ref('')
const testResults = ref({
  ga4: { configured: false, working: false },
  posthog: { configured: false, working: false },
  consent: { given: false }
})

// Check configuration on mount
onMounted(() => {
  checkAnalyticsConfig()
  checkConsent()
  startConsentMonitoring()
})

const checkAnalyticsConfig = () => {
  // Check GA4
  testResults.value.ga4.configured = !!config.public.gaMeasurementId
  testResults.value.ga4.working = !!(window.gtag && typeof window.gtag === 'function')
  
  // Check PostHog
  testResults.value.posthog.configured = !!config.public.posthogPublicKey
  const { $posthog } = useNuxtApp()
  testResults.value.posthog.working = !!$posthog
}

const checkConsent = () => {
  const consent = localStorage.getItem('helicontrade-cookie-consent')
  if (consent) {
    const parsed = JSON.parse(consent)
    testResults.value.consent.given = parsed.analytics === true
  } else {
    testResults.value.consent.given = false
  }
}

// Add real-time consent monitoring
const startConsentMonitoring = () => {
  // Check consent every 2 seconds
  setInterval(() => {
    checkConsent()
    checkAnalyticsConfig()
  }, 2000)
  
  // Listen for storage changes (when user updates consent in another tab)
  window.addEventListener('storage', (e) => {
    if (e.key === 'helicontrade-cookie-consent') {
      checkConsent()
      checkAnalyticsConfig()
    }
  })
}

// Test functions
const testGA4Event = () => {
  if (window.gtag && typeof window.gtag === 'function') {
    window.gtag('event', 'test_event', {
      event_category: 'testing',
      event_label: 'ga4_test',
      value: 1
    })
    alert('GA4 test event sent! Check Network tab in dev tools.')
  } else {
    alert('GA4 not loaded. Check configuration and consent.')
  }
}

const testPostHogEvent = () => {
  const { $posthog } = useNuxtApp()
  if ($posthog) {
    $posthog.capture('test_event', {
      category: 'testing',
      label: 'posthog_test',
      timestamp: new Date().toISOString()
    })
    alert('PostHog test event sent! Check Network tab in dev tools.')
  } else {
    alert('PostHog not loaded. Check configuration and consent.')
  }
}

const testUnifiedTracking = () => {
  try {
    const { track } = useAnalytics()
    track.ctaClick('Test CTA', 'analytics-test-page')
    alert('Unified tracking test sent to both GA4 and PostHog!')
  } catch (error) {
    alert('Error with unified tracking: ' + error.message)
  }
}

const resetConsent = () => {
  localStorage.removeItem('helicontrade-cookie-consent')
  location.reload()
}

const quickAcceptAnalytics = () => {
  const consentData = {
    necessary: true,
    analytics: true,
    marketing: false,
    functional: false,
    timestamp: new Date().toISOString(),
    version: '1.0'
  }
  
  localStorage.setItem('helicontrade-cookie-consent', JSON.stringify(consentData))
  
  // Trigger the analytics consent event
  window.dispatchEvent(new CustomEvent('analytics-consent-granted'))
  
  // Force check immediately
  setTimeout(() => {
    checkConsent()
    checkAnalyticsConfig()
  }, 1000)
}

// Reactive debug info
const debugInfo = computed(() => {
  if (process.client) {
    const stored = localStorage.getItem('helicontrade-cookie-consent')
    return stored ? JSON.parse(stored) : {}
  }
  return {}
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Analytics Integration Test
      </h1>

      <!-- Configuration Status -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- GA4 Status -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Google Analytics 4
          </h3>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-300">Configured:</span>
              <span :class="testResults.ga4.configured ? 'text-green-600' : 'text-red-600'">
                {{ testResults.ga4.configured ? '✅ Yes' : '❌ No' }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-300">Working:</span>
              <span :class="testResults.ga4.working ? 'text-green-600' : 'text-red-600'">
                {{ testResults.ga4.working ? '✅ Yes' : '❌ No' }}
              </span>
            </div>
            <!-- Privacy Info -->
            <div v-if="!testResults.ga4.working" class="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p class="text-xs text-blue-700 dark:text-blue-300">
                <strong>Privacy-First Design:</strong> GA4 only loads after analytics consent is granted. This is the correct behavior for GDPR compliance.
              </p>
            </div>
            <div class="mt-4">
              <button
                @click="testGA4Event"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Test GA4 Event
              </button>
            </div>
          </div>
        </div>

        <!-- PostHog Status -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            PostHog Analytics
          </h3>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-300">Configured:</span>
              <span :class="testResults.posthog.configured ? 'text-green-600' : 'text-red-600'">
                {{ testResults.posthog.configured ? '✅ Yes' : '❌ No' }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-300">Working:</span>
              <span :class="testResults.posthog.working ? 'text-green-600' : 'text-red-600'">
                {{ testResults.posthog.working ? '✅ Yes' : '❌ No' }}
              </span>
            </div>
            <div class="mt-4">
              <button
                @click="testPostHogEvent"
                class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Test PostHog Event
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Consent Status -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Cookie Consent Status
        </h3>
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm text-gray-600 dark:text-gray-300">Analytics Consent:</span>
          <span :class="testResults.consent.given ? 'text-green-600' : 'text-red-600'">
            {{ testResults.consent.given ? '✅ Granted' : '❌ Not Given' }}
          </span>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            @click="resetConsent"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Reset Consent (Reload Page)
          </button>
          <button
            v-if="!testResults.consent.given"
            @click="quickAcceptAnalytics"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Quick Accept Analytics (Testing)
          </button>
        </div>
      </div>

      <!-- Test Actions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Test Analytics Events
        </h3>
        
        <div class="grid md:grid-cols-2 gap-4">
          <button
            @click="testUnifiedTracking"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded font-medium transition-colors"
          >
            Test Unified Tracking
          </button>
          
          <div class="flex gap-2">
            <input
              v-model="testEmail"
              type="email"
              placeholder="test@example.com"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
            <button
              @click="useAnalytics().track.newsletterSubscribe('test-page')"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
            >
              Test Newsletter
            </button>
          </div>
        </div>
      </div>

      <!-- Analytics Behavior Explanation -->
      <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800 mb-8">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
          ✅ Why GA4 Shows "Working: No" Initially
        </h3>
        <div class="text-sm space-y-3 text-green-800 dark:text-green-200">
          <p>
            <strong>This is correct privacy-compliant behavior!</strong> Our analytics system only loads Google Analytics after the user explicitly consents to analytics cookies.
          </p>
          <div class="bg-green-100 dark:bg-green-800/30 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">How it works:</h4>
            <ol class="list-decimal list-inside space-y-1">
              <li>User visits the site → No analytics loaded</li>
              <li>User accepts analytics consent → GA4 script loads</li>
              <li>"Working: Yes" appears → Analytics active</li>
            </ol>
          </div>
          <p class="font-medium">
            To test: Use the "Quick Accept Analytics" button above, then watch the "Working" status change to ✅ Yes!
          </p>
        </div>
      </div>
      
      <!-- Configuration Instructions -->
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          📋 Next Steps to Complete Setup
        </h3>
        
        <div class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">1. Google Analytics 4</h4>
            <ul class="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
              <li>Go to Google Analytics → Admin → Data Streams</li>
              <li>Copy your Measurement ID (G-XXXXXXXXXX)</li>
              <li>Add to .env: <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">NUXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX</code></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">2. PostHog</h4>
            <ul class="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
              <li>Go to PostHog → Project Settings → API Keys</li>
              <li>Copy your Public Key (phc_xxxxxxxxxxxxxxxxxxxx)</li>
              <li>Install package: <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">pnpm add posthog-js</code></li>
              <li>Add to .env: <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">NUXT_PUBLIC_POSTHOG_PUBLIC_KEY=phc_xxxxxxxxxx</code></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">3. Strapi CMS (Optional)</h4>
            <ul class="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
              <li><strong>Option A:</strong> Strapi Cloud (Recommended) - Quick setup at strapi.io</li>
              <li><strong>Option B:</strong> Self-hosted - Use your remote server</li>
              <li>Once setup, add: <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">NUXT_PUBLIC_STRAPI_URL=your-strapi-url</code></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Current Configuration -->
      <div class="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Current Configuration
        </h3>
        <div class="text-sm space-y-2 font-mono">
          <div>GA4 ID: <span class="text-blue-600">{{ config.public.gaMeasurementId || 'Not configured' }}</span></div>
          <div>PostHog Key: <span class="text-purple-600">{{ config.public.posthogPublicKey ? 'Configured ✅' : 'Not configured' }}</span></div>
          <div>Strapi URL: <span class="text-green-600">{{ config.public.strapiUrl || 'Not configured' }}</span></div>
        </div>
      </div>
      
      <!-- Debug Information -->
      <div class="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
        <h3 class="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
          🐛 Debug Information
        </h3>
        <div class="text-sm space-y-2">
          <div><strong>LocalStorage Key:</strong> <code class="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">helicontrade-cookie-consent</code></div>
          <div><strong>Current Value:</strong></div>
          <pre class="bg-yellow-100 dark:bg-yellow-800 p-3 rounded text-xs overflow-x-auto mt-2">{{ JSON.stringify(debugInfo, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>
