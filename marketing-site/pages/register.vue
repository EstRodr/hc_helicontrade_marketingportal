<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()

// SEO configuration
useHead({
  title: 'Register - HeliconTrade',
  meta: [
    { name: 'robots', content: 'noindex,nofollow' },
    { name: 'description', content: 'Create your HeliconTrade account and start your trading journey today.' }
  ]
})

// Redirect to app domain for registration
const { getAppUrl } = useAppRedirects()

onMounted(() => {
  // Preserve any query parameters (like referral codes)
  const queryString = new URLSearchParams(route.query as Record<string, string>).toString()
  const redirectUrl = `${getAppUrl()}/register${queryString ? '?' + queryString : ''}`
  
  // Add a small delay to show the redirect message
  setTimeout(() => {
    window.location.href = redirectUrl
  }, 2000)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 flex items-center justify-center">
    <div class="max-w-md mx-auto text-center p-8">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
          H
        </div>
      </div>
      
      <!-- Loading Message -->
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Creating Your Account
      </h1>
      
      <p class="text-gray-600 dark:text-gray-300 mb-8">
        Taking you to our secure registration form...
      </p>
      
      <!-- Loading Spinner -->
      <div class="flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
      
      <!-- Fallback Link -->
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-8">
        Not redirected automatically? 
        <a :href="`${getAppUrl()}/register`" class="text-blue-600 hover:text-blue-700 underline">
          Click here to register
        </a>
      </p>
    </div>
  </div>
</template>
