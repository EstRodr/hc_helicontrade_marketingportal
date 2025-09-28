<script setup lang="ts">
const colorMode = useColorMode()
const { locale } = useI18n()

// Set HTML attributes for proper theme and RTL support
useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
    dir: computed(() => locale.value === 'ar' ? 'rtl' : 'ltr'),
    class: computed(() => colorMode.value === 'dark' ? 'dark' : '')
  },
})
</script>

<template>
  <div class="mobile-vh-fix mobile-container prevent-scroll">
    <NuxtPage />
    
    <!-- Cookie Consent Banner - Client-side only to prevent hydration issues -->
    <ClientOnly>
      <CookieConsent />
    </ClientOnly>
  </div>
</template>
