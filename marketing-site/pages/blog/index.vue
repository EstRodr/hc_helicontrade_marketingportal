<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    
    <!-- Hero Section -->
    <div class="bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Trading Insights & Education
          </h1>
          <p class="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay informed with expert analysis, trading strategies, and educational content 
            to help you master the financial markets.
          </p>
        </div>
      </div>
    </div>

    <!-- Blog Posts Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-blue-600 bg-blue-50 transition ease-in-out duration-150">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading articles...
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
          <h3 class="text-lg font-semibold text-red-900 dark:text-red-100">Unable to load articles</h3>
          <p class="text-red-700 dark:text-red-300 mt-2">{{ error }}</p>
          <button 
            @click="loadArticles" 
            class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-else-if="articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="article in articles" 
          :key="article.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <div class="p-6">
            <!-- Article Meta -->
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
              <span v-if="article.author" class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                {{ article.author }}
              </span>
            </div>

            <!-- Article Title -->
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              <NuxtLink 
                :to="`/blog/${article.slug}`"
                class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {{ article.title }}
              </NuxtLink>
            </h2>

            <!-- Article Excerpt -->
            <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {{ article.excerpt || 'No excerpt available' }}
            </p>

            <!-- Read More Link -->
            <NuxtLink 
              :to="`/blog/${article.slug}`"
              class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Read Article
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No articles yet</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Check back soon for expert trading insights and educational content.
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
  title: 'Trading Blog & Insights - HeliconTrade',
  meta: [
    { name: 'description', content: 'Expert trading insights, market analysis, and educational content to help you master financial markets with HeliconTrade.' },
    { name: 'keywords', content: 'trading blog, market analysis, trading education, financial insights, investment strategies' },
    
    // Open Graph
    { property: 'og:title', content: 'Trading Blog & Insights - HeliconTrade' },
    { property: 'og:description', content: 'Expert trading insights, market analysis, and educational content.' },
    { property: 'og:type', content: 'website' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Trading Blog & Insights - HeliconTrade' },
    { name: 'twitter:description', content: 'Expert trading insights, market analysis, and educational content.' }
  ]
})

// Reactive state
const articles = ref([])
const loading = ref(false)
const error = ref(null)

// Load articles function
const loadArticles = async () => {
  loading.value = true
  error.value = null

  try {
    const { fetchArticles } = useStrapi()
    const data = await fetchArticles()
    articles.value = data || []
  } catch (err) {
    error.value = err.message || 'Failed to load articles'
    console.error('Blog articles loading error:', err)
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
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return 'Invalid date'
  }
}

// Load articles on mount
onMounted(() => {
  loadArticles()
})
</script>