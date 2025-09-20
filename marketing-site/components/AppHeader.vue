<script setup lang="ts">
const config = useRuntimeConfig()

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Handle login redirect
function redirectToLogin() {
  window.location.href = `${config.public.appUrl}/auth/login`
}

// Handle registration redirect
function redirectToRegister() {
  window.location.href = `${config.public.appUrl}/auth/register`
}

// Toggle mobile menu
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

// Close mobile menu when clicking outside
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    if (!event.target || !isMobileMenuOpen.value) return
    const target = event.target as Element
    const mobileMenu = document.getElementById('mobile-menu')
    const menuButton = document.getElementById('mobile-menu-button')
    
    if (mobileMenu && !mobileMenu.contains(target) && !menuButton?.contains(target)) {
      isMobileMenuOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mobile-header flex justify-between items-center h-16 relative">
        <!-- Logo -->
        <div class="mobile-logo flex items-center flex-shrink-0">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <img 
              src="/logo.svg" 
              alt="HeliconTrade Logo" 
              class="h-7 sm:h-8 w-auto"
              width="32"
              height="32"
            >
            <span class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">HeliconTrade</span>
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

        <!-- Auth Buttons - Desktop Only -->
        <div class="hidden md:flex items-center space-x-4">
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

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            id="mobile-menu-button"
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors touch-target"
            aria-expanded="false"
            :aria-expanded="isMobileMenuOpen.toString()"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Hamburger icon -->
            <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Close icon -->
            <svg v-else class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu Overlay -->
    <div
      v-show="isMobileMenuOpen"
      class="mobile-menu-overlay md:hidden"
      @click="closeMobileMenu"
    ></div>
    
    <!-- Mobile Menu -->
    <div
      v-show="isMobileMenuOpen"
      id="mobile-menu"
      class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg relative z-50"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink 
          to="/features" 
          @click="closeMobileMenu"
          class="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          Features
        </NuxtLink>
        <NuxtLink 
          to="/pricing" 
          @click="closeMobileMenu"
          class="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          Pricing
        </NuxtLink>
        <NuxtLink 
          to="/about" 
          @click="closeMobileMenu"
          class="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          About
        </NuxtLink>
        <NuxtLink 
          to="/contact" 
          @click="closeMobileMenu"
          class="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          Contact
        </NuxtLink>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
        <div class="px-2 space-y-1">
          <button 
            @click="redirectToLogin(); closeMobileMenu()"
            class="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            Login
          </button>
          <button 
            @click="redirectToRegister(); closeMobileMenu()"
            class="block w-full text-left px-3 py-2 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
