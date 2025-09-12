<script setup lang="ts">
const config = useRuntimeConfig()

// Handle login redirect
function redirectToLogin() {
  window.location.href = `${config.public.appUrl}/auth/login`
}

// Handle registration redirect
function redirectToRegister() {
  window.location.href = `${config.public.appUrl}/auth/register`
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <img 
              src="/logo.svg" 
              alt="HeliconTrade Logo" 
              class="h-8 w-auto"
              width="32"
              height="32"
            >
            <span class="text-xl font-bold text-gray-900 dark:text-white">HeliconTrade</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/features" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Features
          </NuxtLink>
          <NuxtLink to="/pricing" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Pricing
          </NuxtLink>
          <NuxtLink to="/about" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Contact
          </NuxtLink>
        </div>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <button 
            @click="redirectToLogin"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Login
          </button>
          <button 
            @click="redirectToRegister"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </button>
        </div>

        <!-- Mobile menu button (optional for future mobile menu) -->
        <div class="md:hidden">
          <!-- Mobile menu button can be added here if needed -->
        </div>
      </div>
    </div>
  </nav>
</template>
