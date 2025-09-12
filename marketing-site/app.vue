<script setup lang="ts">
const colorMode = useColorMode()

// Set HTML attributes for proper theme support
useHead({
  htmlAttrs: {
    lang: 'en',
    class: computed(() => colorMode.value === 'dark' ? 'dark' : '')
  },
})
</script>

<template>
  <div class="min-h-screen">
    <NuxtPage />
    
    <!-- Cookie Consent Banner -->
    <CookieConsent />
  </div>
</template>
