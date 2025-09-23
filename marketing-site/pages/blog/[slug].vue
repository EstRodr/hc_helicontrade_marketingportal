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
          Loading article...
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-8 border border-red-200 dark:border-red-800">
          <h1 class="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">Article Not Found</h1>
          <p class="text-red-700 dark:text-red-300 mb-6">{{ error }}</p>
          <NuxtLink 
            to="/blog"
            class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Article Content -->
    <article v-else-if="article" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <NuxtLink to="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</NuxtLink>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
        <NuxtLink to="/blog" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</NuxtLink>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
        <span class="text-gray-900 dark:text-white">{{ article.title }}</span>
      </nav>

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

          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ readingTime }} min read</span>
          </div>
        </div>

        <!-- Article Excerpt -->
        <p v-if="article.excerpt" class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
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
            This article's content is being updated. Please check back soon for the full article.
          </p>
        </div>
      </div>

      <!-- Back to Blog -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <NuxtLink 
          to="/blog"
          class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Articles
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

// Load article function
const loadArticle = async () => {
  if (!slug) {
    error.value = 'No article slug provided'
    return
  }

  loading.value = true
  error.value = null

  try {
    const { getArticle } = useStrapi()
    const data = await getArticle(slug)
    
    if (!data) {
      error.value = 'Article not found'
      return
    }
    
    article.value = data
  } catch (err) {
    error.value = err.message || 'Failed to load article'
    console.error('Article loading error:', err)
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

// Calculate reading time (rough estimate)
const readingTime = computed(() => {
  if (!article.value?.content) return 5
  const words = article.value.content.split(/\s+/).length
  return Math.ceil(words / 200) // Average reading speed: 200 words per minute
})

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
      title: `${article.value.title} - HeliconTrade Blog`,
      meta: [
        { name: 'description', content: article.value.excerpt || 'Read this insightful article on HeliconTrade blog.' },
        { name: 'keywords', content: 'trading, finance, education, blog, investment, market analysis' },
        
        // Open Graph
        { property: 'og:title', content: `${article.value.title} - HeliconTrade` },
        { property: 'og:description', content: article.value.excerpt || 'Read this insightful article on HeliconTrade blog.' },
        { property: 'og:type', content: 'article' },
        { property: 'article:author', content: article.value.author || 'HeliconTrade Team' },
        { property: 'article:published_time', content: article.value.publishedAt },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${article.value.title} - HeliconTrade` },
        { name: 'twitter:description', content: article.value.excerpt || 'Read this insightful article on HeliconTrade blog.' }
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
/* Enhanced prose styles for article content */
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