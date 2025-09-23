<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Strapi Integration Test
      </h1>
      
      <!-- Connection Status -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Connection Status</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Strapi URL:</span>
            <code class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
              {{ config.public.strapiUrl }}
            </code>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">API Token:</span>
            <span :class="config.public.strapiToken ? 'text-green-600' : 'text-red-600'">
              {{ config.public.strapiToken ? '✅ Configured' : '❌ Missing' }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Connection:</span>
            <span v-if="loading" class="text-yellow-600">⏳ Testing...</span>
            <span v-else :class="connectionStatus === 'success' ? 'text-green-600' : 'text-red-600'">
              {{ connectionStatus === 'success' ? '✅ Connected' : '❌ Failed' }}
            </span>
          </div>
        </div>

        <!-- Retry Button -->
        <div class="mt-4" v-if="connectionStatus === 'failed'">
          <button
            @click="testConnection"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>

      <!-- Test Articles -->
      <div v-if="articles.length > 0" class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Articles from Strapi ({{ articles.length }} found)
        </h2>
        <div class="space-y-4">
          <div v-for="article in articles" :key="article.id" class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
            <h3 class="font-semibold text-gray-900 dark:text-white">{{ article.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              {{ article.excerpt || 'No excerpt available' }}
            </p>
            <div class="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span>ID: {{ article.id }}</span>
              <span v-if="article.author">Author: {{ article.author }}</span>
              <span v-if="article.publishedAt">Published: {{ formatDate(article.publishedAt) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- No Content Message -->
      <div v-else-if="connectionStatus === 'success' && !loading" class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800 mb-8">
        <h2 class="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-4">No Content Found</h2>
        <p class="text-yellow-800 dark:text-yellow-200 mb-4">
          Connection successful, but no articles were found. This could mean:
        </p>
        <ul class="list-disc list-inside text-yellow-800 dark:text-yellow-200 space-y-1">
          <li>No Article content type has been created yet</li>
          <li>No articles have been published</li>
          <li>Public permissions are not enabled for the Article content type</li>
        </ul>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800 mb-8">
        <h2 class="text-xl font-semibold text-red-900 dark:text-red-100 mb-4">Connection Error</h2>
        <div class="space-y-4">
          <p class="text-red-800 dark:text-red-200">{{ error }}</p>
          <details class="text-sm">
            <summary class="cursor-pointer font-semibold text-red-900 dark:text-red-100">Technical Details</summary>
            <pre class="mt-2 p-3 bg-red-100 dark:bg-red-800/30 rounded text-red-800 dark:text-red-200 overflow-x-auto">{{ fullError }}</pre>
          </details>
        </div>
      </div>

      <!-- Instructions -->
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h2 class="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Next Steps</h2>
        <div class="text-blue-800 dark:text-blue-200 space-y-3">
          <div v-if="!config.public.strapiToken" class="font-semibold">
            🔑 Create an API token in your Strapi admin panel and add it to the .env file
          </div>
          <div v-else-if="connectionStatus !== 'success'">
            🔧 Check the connection troubleshooting guide in STRAPI_INTEGRATION_STEPS.md
          </div>
          <div v-else-if="articles.length === 0">
            📝 Create some test content in your Strapi admin panel
          </div>
          <div v-else>
            🎉 Everything is working! You can now integrate Strapi content into your marketing pages.
          </div>
        </div>
      </div>
    </div>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
// SEO
useHead({
  title: 'Strapi Integration Test - HeliconTrade',
  meta: [
    { name: 'robots', content: 'noindex,nofollow' }
  ]
})

const config = useRuntimeConfig()

// Reactive state
const articles = ref([])
const connectionStatus = ref('testing')
const loading = ref(false)
const error = ref(null)
const fullError = ref(null)

// Test connection function
const testConnection = async () => {
  loading.value = true
  error.value = null
  fullError.value = null
  connectionStatus.value = 'testing'

  try {
    const { fetchArticles } = useStrapi()
    const data = await fetchArticles()
    articles.value = data
    connectionStatus.value = 'success'
  } catch (err) {
    error.value = err.message || 'Unknown error occurred'
    fullError.value = JSON.stringify(err, null, 2)
    connectionStatus.value = 'failed'
    console.error('Strapi connection error:', err)
    console.error('Error details:', {
      strapiUrl: config.public.strapiUrl,
      hasToken: !!config.public.strapiToken,
      tokenLength: config.public.strapiToken?.length || 0,
      errorType: err.constructor.name,
      errorMessage: err.message,
      errorStatus: err.response?.status
    })
  } finally {
    loading.value = false
  }
}

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return 'No date'
  try {
    return new Date(dateString).toLocaleDateString()
  } catch {
    return 'Invalid date'
  }
}

// Test connection on mount
onMounted(() => {
  testConnection()
})
</script>
