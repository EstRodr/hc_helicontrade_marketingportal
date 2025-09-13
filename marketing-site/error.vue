<script setup lang="ts">
import { ref, computed } from 'vue'

interface ErrorProps {
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
    url?: string
  }
}

const props = defineProps<ErrorProps>()

const errorCode = computed(() => props.error?.statusCode || 500)
const errorMessage = computed(() => props.error?.statusMessage || props.error?.message || 'Something went wrong')
const isNotFound = computed(() => errorCode.value === 404)

const errorDetails = computed(() => {
  if (isNotFound.value) {
    return {
      title: 'Page Not Found',
      description: 'The page you\'re looking for doesn\'t exist or has been moved.',
      icon: '🔍',
      suggestions: [
        'Check the URL for typos',
        'Go back to the homepage',
        'Use the navigation menu'
      ]
    }
  } else if (errorCode.value >= 500) {
    return {
      title: 'Server Error',
      description: 'We\'re experiencing technical difficulties. Please try again later.',
      icon: '⚡',
      suggestions: [
        'Refresh the page',
        'Try again in a few minutes',
        'Contact support if the issue persists'
      ]
    }
  } else {
    return {
      title: 'Oops! Something went wrong',
      description: errorMessage.value,
      icon: '⚠️',
      suggestions: [
        'Go back to the previous page',
        'Return to homepage',
        'Try refreshing the page'
      ]
    }
  }
})

function goHome() {
  navigateTo('/')
}

function goBack() {
  if (typeof window !== 'undefined') {
    window.history.back()
  } else {
    navigateTo('/')
  }
}

function refresh() {
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}

// SEO
useHead({
  title: `${errorCode.value} - ${errorDetails.value.title} | HeliconTrade`,
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 flex items-center justify-center px-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 opacity-10 dark:opacity-5">
        <div class="grid-pattern"></div>
      </div>
    </div>
    
    <div class="relative z-10 text-center max-w-lg w-full">
      <!-- Error Icon with Animation -->
      <div class="mb-8">
        <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl animate-pulse">
          {{ errorDetails.icon }}
        </div>
        
        <!-- Error Code -->
        <div class="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {{ errorCode }}
        </div>
        
        <!-- Error Title -->
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ errorDetails.title }}
        </h1>
        
        <!-- Error Description -->
        <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {{ errorDetails.description }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <!-- Primary Actions -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            @click="goHome"
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            Go Home
          </button>
          
          <button
            @click="goBack"
            class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Go Back
          </button>
        </div>

        <!-- Secondary Action for Server Errors -->
        <div v-if="!isNotFound" class="pt-2">
          <button
            @click="refresh"
            class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors inline-flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Refresh Page
          </button>
        </div>
      </div>

      <!-- Help Text -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          What you can do:
        </h2>
        <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li v-for="suggestion in errorDetails.suggestions" :key="suggestion" class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            {{ suggestion }}
          </li>
        </ul>
      </div>

      <!-- Footer -->
      <div class="mt-12 text-xs text-gray-500 dark:text-gray-400">
        <p>Need help? 
          <NuxtLink to="/contact" class="text-blue-600 dark:text-blue-400 hover:underline">
            Contact our support team
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Grid Pattern */
.grid-pattern {
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0);
  background-size: 20px 20px;
  width: 100%;
  height: 100%;
}

.dark .grid-pattern {
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0);
}

/* Hover animations */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:-translate-y-0\.5:hover {
  transform: translateY(-2px);
}

/* Responsive improvements */
@media (max-width: 640px) {
  .text-6xl {
    font-size: 4rem;
  }
  
  .text-7xl {
    font-size: 5rem;
  }
}
</style>
