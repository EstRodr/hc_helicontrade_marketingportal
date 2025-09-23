<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Authentication Check -->
    <div v-if="!isAuthenticated" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="mb-6">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          You need admin privileges to access the marketing personalization panel.
        </p>
        <div class="space-x-4">
          <NuxtLink to="/login" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Login
          </NuxtLink>
          <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Go Home
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Admin Panel Content -->
    <div v-else class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <nav class="flex mb-4" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-4">
            <li>
              <NuxtLink to="/admin" class="text-gray-400 hover:text-gray-500">
                Admin
              </NuxtLink>
            </li>
            <li>
              <svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </li>
            <li>
              <span class="text-gray-500">Marketing Page</span>
            </li>
            <li>
              <svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </li>
            <li>
              <span class="text-gray-900 dark:text-white font-medium">Personalization</span>
            </li>
          </ol>
        </nav>

        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Marketing Page Personalization
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Configure A/B testing, market settings, and personalization options for the marketing site
            </p>
          </div>
          
          <!-- Quick Actions -->
          <div class="flex space-x-3">
            <a href="http://localhost:3002" target="_blank" 
               class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              View Marketing Site
            </a>
            <a href="https://app.posthog.com" target="_blank"
               class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
              PostHog Dashboard
            </a>
          </div>
        </div>
      </div>

      <!-- Status Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- PostHog Status -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">PostHog A/B Testing</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">5 variants • 20% each</p>
            </div>
          </div>
        </div>

        <!-- Market Status -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Multi-Market Support</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">5 markets • Real-time hours</p>
            </div>
          </div>
        </div>

        <!-- Fallback Status -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M9 12a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Fallback Systems</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">4 layers • Production ready</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Admin Panel -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Personalization Configuration
          </h2>
        </div>
        
        <div class="p-6">
          <!-- Embed the actual admin panel component here -->
          <PersonalizationAdminPanel />
        </div>
      </div>

      <!-- Documentation Links -->
      <div class="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-4">
          Documentation & Resources
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-medium text-blue-800 dark:text-blue-200 mb-2">Setup Guides</h4>
            <ul class="space-y-1 text-sm text-blue-700 dark:text-blue-300">
              <li><a href="#" class="hover:underline">PostHog A/B Testing Setup</a></li>
              <li><a href="#" class="hover:underline">Strapi CMS Configuration</a></li>
              <li><a href="#" class="hover:underline">Production Deployment</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-blue-800 dark:text-blue-200 mb-2">External Tools</h4>
            <ul class="space-y-1 text-sm text-blue-700 dark:text-blue-300">
              <li><a href="https://app.posthog.com" target="_blank" class="hover:underline">PostHog Dashboard ↗</a></li>
              <li><a href="#" target="_blank" class="hover:underline">Strapi Admin ↗</a></li>
              <li><a href="http://localhost:3002" target="_blank" class="hover:underline">Marketing Site ↗</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Authentication check - Replace with your actual auth logic
const { $auth } = useNuxtApp() // Adjust based on your auth system

const isAuthenticated = computed(() => {
  // Replace with your actual authentication logic
  // Examples:
  // return $auth?.user?.value != null
  // return useSupabaseUser().value != null
  // return useCookie('auth-token').value != null
  
  // For now, always return true for development
  // TODO: Implement proper authentication check
  return true
})

// Redirect if not authenticated
watchEffect(() => {
  if (!isAuthenticated.value) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Admin access required'
    })
  }
})

// Page metadata
useHead({
  title: 'Marketing Personalization Admin | HeliconTrade',
  meta: [
    { name: 'description', content: 'Configure A/B testing and personalization for the marketing site' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Page meta for middleware
definePageMeta({
  layout: 'admin', // Use admin layout if you have one
  // middleware: 'auth' // Uncomment if you have auth middleware
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
