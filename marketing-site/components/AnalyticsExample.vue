<script setup lang="ts">
// Example component demonstrating analytics usage
const { track } = useAnalytics()

// Track different types of events
const handleCTAClick = () => {
  track.ctaClick('Get Started Free', 'homepage-hero')
  // Redirect or perform action
  window.location.href = useRuntimeConfig().public.appUrl + '/auth/register'
}

const handleDemoStart = () => {
  track.demoStart('interactive')
  // Start demo functionality
  console.log('Starting demo...')
}

const handleNewsletterSubscribe = (email: string) => {
  track.newsletterSubscribe('footer')
  // Submit newsletter subscription
  console.log('Newsletter subscription for:', email)
}

const handleNavigationClick = (destination: string) => {
  track.navigationClick(destination)
}

const handleContentView = () => {
  track.contentView('blog-post', 'trading-101-guide')
}

const handleError = (error: Error) => {
  track.error('javascript', error.message)
}

// Example of tracking page views manually (usually handled automatically)
onMounted(() => {
  const { trackPageView } = useAnalytics()
  trackPageView('/example-page', 'Analytics Example Page')
})
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Analytics Integration Example</h2>
    
    <div class="space-y-4">
      <div class="p-4 border rounded-lg">
        <h3 class="font-semibold mb-2">CTA Tracking</h3>
        <button
          @click="handleCTAClick"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Get Started Free (Tracked)
        </button>
      </div>

      <div class="p-4 border rounded-lg">
        <h3 class="font-semibold mb-2">Demo Tracking</h3>
        <button
          @click="handleDemoStart"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Start Demo (Tracked)
        </button>
      </div>

      <div class="p-4 border rounded-lg">
        <h3 class="font-semibold mb-2">Navigation Tracking</h3>
        <div class="space-x-2">
          <NuxtLink
            to="/features"
            @click="handleNavigationClick('features')"
            class="text-blue-600 hover:underline"
          >
            Features (Tracked)
          </NuxtLink>
          <NuxtLink
            to="/pricing"
            @click="handleNavigationClick('pricing')"
            class="text-blue-600 hover:underline"
          >
            Pricing (Tracked)
          </NuxtLink>
        </div>
      </div>

      <div class="p-4 border rounded-lg">
        <h3 class="font-semibold mb-2">Content Engagement</h3>
        <button
          @click="handleContentView"
          class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
        >
          View Trading Guide (Tracked)
        </button>
      </div>

      <div class="p-4 border rounded-lg">
        <h3 class="font-semibold mb-2">Error Tracking</h3>
        <button
          @click="handleError(new Error('Example error for testing'))"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Trigger Error (Tracked)
        </button>
      </div>

      <div class="p-4 border rounded-lg">
        <h3 class="font-semibold mb-2">Newsletter Subscription</h3>
        <div class="flex gap-2">
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            class="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <button
            @click="handleNewsletterSubscribe(email)"
            class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Subscribe (Tracked)
          </button>
        </div>
      </div>
    </div>

    <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 class="font-semibold mb-2">Usage Notes:</h3>
      <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-300">
        <li>• Events are sent to both Google Analytics and PostHog (if configured)</li>
        <li>• Analytics only work if user has given consent via cookie banner</li>
        <li>• Check browser dev tools Network tab to see outgoing analytics requests</li>
        <li>• Events include additional context like page URL and timestamp</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  }
}
</script>
