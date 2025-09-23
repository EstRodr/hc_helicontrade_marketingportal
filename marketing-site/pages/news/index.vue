<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    
    <!-- Hero Section -->
    <div class="bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Market News & Updates
          </h1>
          <p class="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay ahead with the latest market updates, company announcements, and breaking financial news.
          </p>
        </div>
      </div>
    </div>

    <!-- News Posts Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-blue-600 bg-blue-50 transition ease-in-out duration-150">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading news...
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
          <h3 class="text-lg font-semibold text-red-900 dark:text-red-100">Unable to load news</h3>
          <p class="text-red-700 dark:text-red-300 mt-2">{{ error }}</p>
          <button 
            @click="loadNews" 
            class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- News Grid -->
      <div v-else-if="news.length > 0">
        <!-- Featured News (if any) -->
        <div v-if="featuredNews.length > 0" class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Breaking News</h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <article 
              v-for="article in featuredNews" 
              :key="article.id"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div class="p-6">
                <!-- News Meta -->
                <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                    {{ article.category || 'General' }}
                  </span>
                  <time :datetime="article.published_at_time || article.publishedAt">{{ formatDate(article.published_at_time || article.publishedAt) }}</time>
                  <span v-if="article.author">by {{ article.author }}</span>
                </div>

                <!-- News Title -->
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                  <NuxtLink 
                    :to="`/news/${article.slug}`"
                    class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {{ article.title }}
                  </NuxtLink>
                </h3>

                <!-- News Excerpt -->
                <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {{ article.excerpt || 'Read more...' }}
                </p>

                <!-- Read More Link -->
                <NuxtLink 
                  :to="`/news/${article.slug}`"
                  class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Read Full Story
                  <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </article>
          </div>
        </div>

        <!-- Regular News -->
        <div v-if="regularNews.length > 0">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Updates</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article 
              v-for="article in regularNews" 
              :key="article.id"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div class="p-6">
                <!-- News Meta -->
                <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs font-medium">
                    {{ article.category || 'General' }}
                  </span>
                  <time :datetime="article.published_at_time || article.publishedAt">{{ formatDate(article.published_at_time || article.publishedAt) }}</time>
                </div>

                <!-- News Title -->
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight">
                  <NuxtLink 
                    :to="`/news/${article.slug}`"
                    class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {{ article.title }}
                  </NuxtLink>
                </h3>

                <!-- News Excerpt -->
                <p class="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                  {{ truncateText(article.excerpt || '', 120) }}
                </p>

                <!-- Read More -->
                <NuxtLink 
                  :to="`/news/${article.slug}`"
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Read more →
                </NuxtLink>
              </div>
            </article>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No news available</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Check back soon for the latest market updates and company news.
          </p>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
// SEO
useHead({
  title: 'Market News & Updates - HeliconTrade',
  meta: [
    { name: 'description', content: 'Stay informed with the latest market news, trading updates, and financial announcements from HeliconTrade.' },
    { name: 'keywords', content: 'market news, trading news, financial updates, market analysis, company announcements' },
    
    // Open Graph
    { property: 'og:title', content: 'Market News & Updates - HeliconTrade' },
    { property: 'og:description', content: 'Stay informed with the latest market news and trading updates.' },
    { property: 'og:type', content: 'website' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Market News & Updates - HeliconTrade' },
    { name: 'twitter:description', content: 'Stay informed with the latest market news and trading updates.' }
  ]
})

// Reactive state
const news = ref([])
const loading = ref(false)
const error = ref(null)

// Computed properties for news categories
const featuredNews = computed(() => {
  return news.value.filter(article => 
    article.priority === 'Critical' || article.priority === 'High'
  ).slice(0, 4) // Limit featured news
})

const regularNews = computed(() => {
  return news.value.filter(article => 
    article.priority !== 'Critical' && article.priority !== 'High'
  )
})

// Load news function
const loadNews = async () => {
  loading.value = true
  error.value = null

  try {
    const { getNews } = useStrapi()
    const data = await getNews()
    news.value = data || []
  } catch (err) {
    error.value = err.message || 'Failed to load news'
    console.error('News loading error:', err)
  } finally {
    loading.value = false
  }
}

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return 'No date'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'Invalid date'
  }
}

// Truncate text helper
const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Load news on mount
onMounted(() => {
  loadNews()
})
</script>