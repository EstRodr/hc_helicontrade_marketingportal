<script setup lang="ts">
const config = useRuntimeConfig()
const { t } = useI18n()

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Use centralized redirect utilities
const { redirectToLogin, redirectToRegister } = useAppRedirects()

// Toggle mobile menu
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <img 
              src="/logo.svg" 
              :alt="t('brand.logoAlt')"
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
            {{ t('navigation.features') }}
          </NuxtLink>
          <NuxtLink to="/pricing" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {{ t('navigation.pricing') }}
          </NuxtLink>
          <NuxtLink to="/blog" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {{ t('navigation.blog') }}
          </NuxtLink>
          <NuxtLink to="/news" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {{ t('navigation.news') }}
          </NuxtLink>
          <NuxtLink to="/about" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {{ t('navigation.about') }}
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {{ t('navigation.contact') }}
          </NuxtLink>
        </div>

        <!-- Desktop Auth Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <button 
            @click="redirectToLogin"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {{ t('navigation.login') }}
          </button>
          <button 
            @click="redirectToRegister"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {{ t('navigation.getStarted') }}
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="mobile-menu"
            :aria-expanded="isMobileMenuOpen"
          >
            <span class="sr-only">{{ t('navigation.openMenu') }}</span>
            <!-- Hamburger icon -->
            <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Close icon -->
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <NuxtLink 
          to="/features" 
          @click="closeMobileMenu"
          class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          {{ t('navigation.features') }}
        </NuxtLink>
        
        <NuxtLink 
          to="/pricing" 
          @click="closeMobileMenu"
          class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          {{ t('navigation.pricing') }}
        </NuxtLink>
        
        <NuxtLink 
          to="/blog" 
          @click="closeMobileMenu"
          class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          {{ t('navigation.blog') }}
        </NuxtLink>
        
        <NuxtLink 
          to="/news" 
          @click="closeMobileMenu"
          class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          {{ t('navigation.news') }}
        </NuxtLink>
        
        <NuxtLink 
          to="/about" 
          @click="closeMobileMenu"
          class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          {{ t('navigation.about') }}
        </NuxtLink>
        
        <NuxtLink 
          to="/contact" 
          @click="closeMobileMenu"
          class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          {{ t('navigation.contact') }}
        </NuxtLink>
        
        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          
          <button 
            @click="redirectToLogin(); closeMobileMenu()"
            class="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            {{ t('navigation.login') }}
          </button>
          
          <button 
            @click="redirectToRegister(); closeMobileMenu()"
            class="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left mt-2"
          >
            {{ t('navigation.getStarted') }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
