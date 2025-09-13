<script setup lang="ts">
const languages = [
  { code: 'en', name: 'English', region: 'US' },
  { code: 'fr', name: 'Français', region: 'FR' },
  { code: 'ar', name: 'العربية', region: 'SA' },
  { code: 'es', name: 'Español', region: 'ES' },
  { code: 'de', name: 'Deutsch', region: 'DE' },
  { code: 'ja', name: '日本語', region: 'JP' }
]

const currentLang = ref('en')
const showDropdown = ref(false)

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === currentLang.value) || languages[0]
})

function setLanguage(langCode: string) {
  currentLang.value = langCode
  showDropdown.value = false
  // Here you would typically also update the i18n locale
  // Example: $i18n.locale = langCode
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-picker')) {
      showDropdown.value = false
    }
  })
})
</script>

<template>
  <div class="relative language-picker">
    <button 
      @click="toggleDropdown"
      class="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200"
    >
      <!-- Globe Icon -->
      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
      </svg>
      <span class="hidden sm:inline font-medium">{{ currentLanguage.code.toUpperCase() }}</span>
      <!-- Chevron Up/Down -->
      <svg class="w-4 h-4 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': !showDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
      </svg>
    </button>

    <!-- Dropdown with improved styling -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0 translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 translate-y-2"
    >
      <div 
        v-show="showDropdown"
        class="absolute right-0 z-50 bottom-full mb-2 w-48 origin-bottom-right rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-white/10 border border-gray-200 dark:border-gray-700"
      >
        <div class="p-2">
          <button
            v-for="language in languages"
            :key="language.code"
            @click="setLanguage(language.code)"
            :class="[
              'group flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150',
              currentLang === language.code 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            ]"
          >
            <!-- Language Icon Placeholder -->
            <div class="w-5 h-5 mr-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center flex-shrink-0">
              <svg class="w-3 h-3 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="flex-1 text-left">
              <div class="font-medium">{{ language.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ language.region }}</div>
            </div>
            <!-- Selected Indicator -->
            <svg 
              v-if="currentLang === language.code" 
              class="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
