<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const showDropdown = ref(false)

const currentLocale = computed(() => {
  return locales.value.find(l => l.code === locale.value)
})

function switchLanguage(localeCode: string) {
  console.log('Switching to language:', localeCode)
  setLocale(localeCode)
  showDropdown.value = false
}

function toggleDropdown() {
  console.log('Toggle dropdown clicked, current state:', showDropdown.value)
  showDropdown.value = !showDropdown.value
  console.log('New dropdown state:', showDropdown.value)
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target?.closest('.simple-language-selector')) {
      showDropdown.value = false
    }
  })
})
</script>

<template>
  <div class="relative simple-language-selector">
    <button 
      @click="toggleDropdown"
      class="inline-flex items-center gap-2 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <!-- Globe Icon -->
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
      </svg>
      <span class="ml-1">{{ currentLocale?.flag }}</span>
      <!-- Chevron -->
      <svg class="-mr-1 h-4 w-4 text-gray-400 transition-transform" :class="{ 'rotate-180': showDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div 
        v-show="showDropdown"
        class="absolute right-0 z-50 bottom-full mb-2 w-48 origin-bottom-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 focus:outline-none"
      >
        <div class="py-1">
          <button
            v-for="availableLocale in locales"
            :key="availableLocale.code"
            @click="switchLanguage(availableLocale.code)"
            :class="[
              'group flex w-full items-center px-4 py-2 text-sm transition-colors',
              locale === availableLocale.code 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            <span class="mr-3 text-lg">{{ availableLocale.flag }}</span>
            <span>{{ availableLocale.name }}</span>
            <svg 
              v-if="locale === availableLocale.code"
              class="ml-auto h-4 w-4 text-blue-600 dark:text-blue-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
