<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    
    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-blue-600 bg-blue-50 transition ease-in-out duration-150">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading news article...
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-8 border border-red-200 dark:border-red-800">
          <h1 class="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">News Article Not Found</h1>
          <p class="text-red-700 dark:text-red-300 mb-6">{{ error }}</p>
          <NuxtLink 
            to="/news"
            class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- News Article Content -->
    <article v-else-if="article" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <NuxtLink to="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</NuxtLink>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
        <NuxtLink to="/news" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">News</NuxtLink>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
        <span class="text-gray-900 dark:text-white">{{ article.title }}</span>
      </nav>

      <!-- Priority Alert -->
      <div v-if="article.priority === 'Critical'" class="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-4 mb-6">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span class="text-red-800 dark:text-red-200 font-semibold">🔴 Breaking News Alert</span>
        </div>
      </div>
      <div v-else-if="article.priority === 'High'" class="bg-orange-100 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800 rounded-lg p-4 mb-6">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <span class="text-orange-800 dark:text-orange-200 font-semibold">⚡ Urgent Market Update</span>
        </div>
      </div>

      <!-- Article Header -->
      <header class="mb-8">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
          {{ article.title }}
        </h1>
        
        <!-- Article Meta -->
        <div class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
          </div>
          
          <div v-if="article.author" class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            <span>{{ article.author }}</span>
          </div>

          <div v-if="article.category" class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
            <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
              {{ article.category }}
            </span>
          </div>

          <div v-if="article.expires_at" class="flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm">Updated until {{ formatDate(article.expires_at) }}</span>
          </div>
        </div>

        <!-- Article Excerpt -->
        <p v-if="article.excerpt" class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          {{ article.excerpt }}
        </p>
      </header>

      <!-- Article Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <!-- If content exists, render it as Markdown -->
        <div v-if="article.content" v-html="renderMarkdown(article.content)"></div>
        
        <!-- Fallback if no content -->
        <div v-else class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
          <p class="text-yellow-800 dark:text-yellow-200">
            This news article's content is being updated. Please check back soon for the full story.
          </p>
        </div>
      </div>

      <!-- Back to News -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <NuxtLink 
          to="/news"
          class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to All News
        </NuxtLink>
      </div>
    </article>

    <AppFooter />
  </div>
</template>

<script setup>
import { marked } from 'marked'

const route = useRoute()
const slug = route.params.slug

// Reactive state
const article = ref(null)
const loading = ref(false)
const error = ref(null)

// Load news article function
const loadArticle = async () => {
  if (!slug) {
    error.value = 'No news article slug provided'
    return
  }

  loading.value = true
  error.value = null

  try {
    const { getNewsArticle } = useStrapi()
    const data = await getNewsArticle(slug)
    
    if (!data) {
      error.value = 'News article not found'
      return
    }
    
    article.value = data
  } catch (err) {
    error.value = err.message || 'Failed to load news article'
    console.error('News article loading error:', err)
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'Invalid date'
  }
}

// Render Markdown content
const renderMarkdown = (content) => {
  if (!content) return ''
  try {
    return marked(content)
  } catch {
    return content
  }
}

// Dynamic SEO
watchEffect(() => {
  if (article.value) {
    useHead({
      title: `${article.value.title} - HeliconTrade News`,
      meta: [
        { name: 'description', content: article.value.excerpt || 'Latest news update from HeliconTrade.' },
        { name: 'keywords', content: `news, ${article.value.category || 'market'}, trading, finance, updates` },
        
        // Open Graph
        { property: 'og:title', content: `${article.value.title} - HeliconTrade` },
        { property: 'og:description', content: article.value.excerpt || 'Latest news update from HeliconTrade.' },
        { property: 'og:type', content: 'article' },
        { property: 'article:author', content: article.value.author || 'HeliconTrade Team' },
        { property: 'article:published_time', content: article.value.publishedAt },
        { property: 'article:section', content: article.value.category || 'News' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${article.value.title} - HeliconTrade` },
        { name: 'twitter:description', content: article.value.excerpt || 'Latest news update from HeliconTrade.' }
      ]
    })
  }
})

// Load article on mount
onMounted(() => {
  loadArticle()
})
</script>

<style>
/* Enhanced prose styles for news content */
.prose {
  @apply text-gray-900 dark:text-white;
}

.prose h1 {
  @apply text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4;
}

.prose h2 {
  @apply text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3;
}

.prose h3 {
  @apply text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2;
}

.prose p {
  @apply text-gray-700 dark:text-gray-300 leading-relaxed mb-4;
}

.prose ul, .prose ol {
  @apply mb-4 pl-6;
}

.prose li {
  @apply text-gray-700 dark:text-gray-300 mb-2;
}

.prose blockquote {
  @apply border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 py-2 my-4;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm;
}

.prose pre {
  @apply bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4;
}

.prose a {
  @apply text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline;
}

.prose strong {
  @apply font-bold text-gray-900 dark:text-white;
}
</style>