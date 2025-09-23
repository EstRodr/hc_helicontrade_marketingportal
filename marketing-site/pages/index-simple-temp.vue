<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <AppHeader />
    
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          HeliconTrade - Simplified Homepage
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Testing navigation with minimal homepage
        </p>
        <div class="space-x-4">
          <NuxtLink to="/features" class="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Go to Features
          </NuxtLink>
          <NuxtLink to="/pricing" class="bg-green-600 text-white px-6 py-3 rounded-lg">
            Go to Pricing
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <AppFooter />
  </div>
</template>

<script setup>
// Minimal setup, no async data, no complex logic
useHead({
  title: 'HeliconTrade - Simple Test',
  meta: [
    { name: 'description', content: 'Simple test page for navigation' }
  ]
})
</script>