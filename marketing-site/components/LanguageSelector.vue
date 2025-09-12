<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon, LanguageIcon } from '@heroicons/vue/24/outline'

const { locale, locales, setLocale } = useI18n()

const currentLocale = computed(() => {
  return locales.value.find(l => l.code === locale.value)
})

function switchLanguage(localeCode: string) {
  setLocale(localeCode)
}
</script>

<template>
  <div class="relative">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <LanguageIcon class="h-4 w-4" aria-hidden="true" />
          <span class="ml-1">{{ currentLocale?.flag }}</span>
          <ChevronDownIcon class="-mr-1 h-4 w-4 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <MenuItem
              v-for="availableLocale in locales"
              :key="availableLocale.code"
              v-slot="{ active }"
            >
              <button
                @click="switchLanguage(availableLocale.code)"
                :class="[
                  active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300',
                  locale === availableLocale.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : '',
                  'group flex w-full items-center px-4 py-2 text-sm transition-colors'
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
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
