<script setup lang="ts">
// Admin Panel for Personalization Configuration Management
import { defaultPersonalizationConfig, marketConfigurations, contentVariations, posthogFeatureFlags } from '~/config/personalization'

// Page metadata
useHead({
  title: 'Personalization Admin - HeliconTrade',
  meta: [
    { name: 'description', content: 'Admin panel for managing personalization settings' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Reactive configuration state
const config = ref({ ...defaultPersonalizationConfig })
const markets = ref({ ...marketConfigurations })
const variations = ref({ ...contentVariations })

// UI state
const activeTab = ref('features')
const isLoading = ref(false)
const saveStatus = ref('')
const showAdvanced = ref(false)

// PostHog integration
const posthogIntegration = usePostHogPersonalization()
const strapiIntegration = useStrapiPersonalization()

// Load current configuration
onMounted(async () => {
  await loadConfiguration()
})

// Load configuration from various sources
const loadConfiguration = async () => {
  isLoading.value = true
  
  try {
    // Try to load from PostHog first
    await posthogIntegration.initializePostHog()
    if (posthogIntegration.config.value) {
      config.value = { ...posthogIntegration.config.value }
    }
    
    // Try to load from Strapi if enabled
    if (config.value.integrations.strapi.enabled) {
      const strapiContent = await strapiIntegration.initializeStrapi()
      if (strapiContent?.config) {
        config.value = { ...strapiContent.config }
      }
      if (strapiContent?.markets) {
        markets.value = { ...strapiContent.markets }
      }
      if (strapiContent?.variations) {
        variations.value = { ...strapiContent.variations }
      }
    }
    
    saveStatus.value = 'Configuration loaded successfully'
  } catch (error) {
    console.error('Failed to load configuration:', error)
    saveStatus.value = 'Failed to load configuration'
  } finally {
    isLoading.value = false
  }
}

// Save configuration
const saveConfiguration = async () => {
  isLoading.value = true
  
  try {
    // Save to Strapi if enabled
    if (config.value.integrations.strapi.enabled) {
      await strapiIntegration.updatePersonalizationConfig(config.value)
    }
    
    // Override PostHog configuration for testing
    if (showAdvanced.value) {
      posthogIntegration.overrideConfig(config.value)
    }
    
    saveStatus.value = 'Configuration saved successfully'
    setTimeout(() => { saveStatus.value = '' }, 3000)
  } catch (error) {
    console.error('Failed to save configuration:', error)
    saveStatus.value = 'Failed to save configuration'
  } finally {
    isLoading.value = false
  }
}

// Reset to defaults
const resetToDefaults = () => {
  config.value = { ...defaultPersonalizationConfig }
  markets.value = { ...marketConfigurations }
  variations.value = { ...contentVariations }
  saveStatus.value = 'Configuration reset to defaults'
}

// Add new market configuration
const addMarketConfig = () => {
  const newCountryCode = prompt('Enter country code (e.g., NO for Norway):')
  if (newCountryCode && !markets.value[newCountryCode]) {
    markets.value[newCountryCode] = {
      exchange: 'New Exchange',
      indices: ['INDEX1'],
      currency: 'USD',
      timezone: 'UTC',
      marketHours: {
        open: '09:00',
        close: '17:00',
        preMarketStart: '08:00',
        afterHoursEnd: '18:00'
      },
      holidays: [],
      languages: ['en']
    }
  }
}

// Remove market configuration
const removeMarketConfig = (countryCode: string) => {
  if (countryCode !== 'default' && confirm(`Remove market configuration for ${countryCode}?`)) {
    delete markets.value[countryCode]
  }
}

// Tabs configuration
const tabs = [
  { id: 'features', label: 'Feature Flags', icon: 'mdi-flag' },
  { id: 'timing', label: 'Timing', icon: 'mdi-timer' },
  { id: 'markets', label: 'Markets', icon: 'mdi-earth' },
  { id: 'content', label: 'Content', icon: 'mdi-text' },
  { id: 'integrations', label: 'Integrations', icon: 'mdi-connection' },
  { id: 'testing', label: 'A/B Testing', icon: 'mdi-test-tube' }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
          <div class="text-center sm:text-left">
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              🎯 Personalization Admin
            </h1>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Configure personalization features, markets, and content
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <!-- Status indicator -->
            <div v-if="saveStatus" 
                 class="px-3 py-1 text-xs sm:text-sm rounded-full text-center min-w-0"
                 :class="{
                   'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': saveStatus.includes('success'),
                   'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': saveStatus.includes('Failed')
                 }">
              {{ saveStatus }}
            </div>
            
            <!-- Advanced mode toggle -->
            <label class="flex items-center space-x-2 cursor-pointer touch-target">
              <input v-model="showAdvanced" type="checkbox" class="rounded touch-target">
              <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Advanced Mode</span>
            </label>
            
            <!-- Action buttons -->
            <div class="flex space-x-2 w-full sm:w-auto">
              <button @click="resetToDefaults" 
                      class="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 touch-target">
                <span class="hidden sm:inline">Reset to Defaults</span>
                <span class="sm:hidden">Reset</span>
              </button>
              
              <button @click="saveConfiguration" 
                      :disabled="isLoading"
                      class="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 touch-target">
                <template v-if="isLoading">
                  <span>Saving...</span>
                </template>
                <template v-else>
                  <span class="hidden sm:inline">Save Configuration</span>
                  <span class="sm:hidden">Save</span>
                </template>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <!-- Tabs - Mobile responsive horizontal scroll -->
      <div class="border-b border-gray-200 dark:border-gray-700 mb-6 sm:mb-8 -mx-4 sm:mx-0">
        <nav class="-mb-px flex space-x-4 sm:space-x-8 px-4 sm:px-0 overflow-x-auto scrollbar-hide">
          <button v-for="tab in tabs" 
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  class="flex items-center py-3 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap touch-target"
                  :class="{
                    'border-blue-500 text-blue-600 dark:text-blue-400': activeTab === tab.id,
                    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300': activeTab !== tab.id
                  }">
            <i :class="tab.icon" class="mr-1 sm:mr-2 text-sm sm:text-base"></i>
            <span class="hidden sm:inline">{{ tab.label }}</span>
            <span class="sm:hidden">{{ tab.label.split(' ')[0] }}</span>
          </button>
        </nav>
      </div>

      <!-- Feature Flags Tab -->
      <div v-show="activeTab === 'features'" class="space-y-4 sm:space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">Core Features</h3>
          <div class="grid grid-cols-1 gap-3 sm:gap-4">
            <label class="flex items-start sm:items-center space-x-3 cursor-pointer p-3 sm:p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 touch-target">
              <input v-model="config.features.personalization" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <div class="min-w-0">
                <div class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Personalization</div>
                <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Enable/disable all personalization features</div>
              </div>
            </label>
            
            <label class="flex items-start sm:items-center space-x-3 cursor-pointer p-3 sm:p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 touch-target">
              <input v-model="config.features.smoothTransition" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <div class="min-w-0">
                <div class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Smooth Transitions</div>
                <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Show default content first, then personalize</div>
              </div>
            </label>
            
            <label class="flex items-start sm:items-center space-x-3 cursor-pointer p-3 sm:p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 touch-target">
              <input v-model="config.features.locationDetection" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <div class="min-w-0">
                <div class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Location Detection</div>
                <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Detect user location from timezone</div>
              </div>
            </label>
            
            <label class="flex items-start sm:items-center space-x-3 cursor-pointer p-3 sm:p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 touch-target">
              <input v-model="config.features.marketHours" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <div class="min-w-0">
                <div class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Market Hours</div>
                <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Show market status and hours</div>
              </div>
            </label>
            
            <label class="flex items-start sm:items-center space-x-3 cursor-pointer p-3 sm:p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 touch-target">
              <input v-model="config.features.greetings" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <div class="min-w-0">
                <div class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Personal Greetings</div>
                <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Time and location-based greetings</div>
              </div>
            </label>
            
            <label class="flex items-start sm:items-center space-x-3 cursor-pointer p-3 sm:p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 touch-target">
              <input v-model="config.features.adaptiveCTAs" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <div class="min-w-0">
                <div class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Adaptive CTAs</div>
                <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Change CTAs based on user engagement</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Timing Tab -->
      <div v-show="activeTab === 'timing'" class="space-y-4 sm:space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">Timing Configuration</h3>
          <div class="grid grid-cols-1 gap-4 sm:gap-6">
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Transition Delay (seconds)
              </label>
              <input v-model.number="config.timing.transitionDelayMs" 
                     type="range" min="0" max="10000" step="500"
                     class="w-full touch-friendly-slider">
              <div class="text-sm text-gray-500 text-center">{{ config.timing.transitionDelayMs / 1000 }}s</div>
            </div>
            
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Update Interval (minutes)
              </label>
              <input v-model.number="config.timing.updateIntervalMs" 
                     type="range" min="30000" max="300000" step="30000"
                     class="w-full touch-friendly-slider">
              <div class="text-sm text-gray-500 text-center">{{ config.timing.updateIntervalMs / 60000 }}m</div>
            </div>
            
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location Timeout (seconds)
              </label>
              <input v-model.number="config.timing.locationTimeoutMs" 
                     type="range" min="1000" max="15000" step="1000"
                     class="w-full touch-friendly-slider">
              <div class="text-sm text-gray-500 text-center">{{ config.timing.locationTimeoutMs / 1000 }}s</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Markets Tab -->
      <div v-show="activeTab === 'markets'" class="space-y-4 sm:space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0">
            <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Market Configurations</h3>
            <button @click="addMarketConfig" 
                    class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 touch-target">
              Add Market
            </button>
          </div>
          
          <div class="grid grid-cols-1 gap-4">
            <div v-for="(market, countryCode) in markets" :key="countryCode" 
                 class="border rounded-lg p-3 sm:p-4 dark:border-gray-600">
              <div class="flex justify-between items-start mb-3">
                <h4 class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{{ countryCode }}</h4>
                <button v-if="countryCode !== 'default'" 
                        @click="removeMarketConfig(countryCode)"
                        class="text-red-600 hover:text-red-800 text-sm touch-target px-2 py-1">
                  Remove
                </button>
              </div>
              
              <div class="space-y-3">
                <div>
                  <label class="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Exchange:</label>
                  <input v-model="market.exchange" 
                         class="w-full text-sm border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 touch-target">
                </div>
                <div>
                  <label class="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Currency:</label>
                  <input v-model="market.currency" 
                         class="w-full text-sm border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 touch-target">
                </div>
                <div>
                  <label class="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Indices:</label>
                  <input :value="market.indices.join(', ')" 
                         @input="market.indices = ($event.target.value).split(', ').map(s => s.trim())"
                         class="w-full text-sm border rounded px-3 py-2 dark:bg-gray-700 dark:border-gray-600 touch-target"
                         placeholder="INDEX1, INDEX2">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Integrations Tab -->
      <div v-show="activeTab === 'integrations'" class="space-y-4 sm:space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">PostHog Integration</h3>
          <div class="space-y-3 sm:space-y-4">
            <label class="flex items-start sm:items-center space-x-3 cursor-pointer p-2 sm:p-0 touch-target">
              <input v-model="config.integrations.posthog.enabled" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300">Enable PostHog Integration</span>
            </label>
            <label class="flex items-start sm:items-center space-x-3 ml-3 sm:ml-6 cursor-pointer p-2 sm:p-0 touch-target">
              <input v-model="config.integrations.posthog.featureFlags" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300">Use PostHog Feature Flags</span>
            </label>
            <label class="flex items-start sm:items-center space-x-3 ml-3 sm:ml-6 cursor-pointer p-2 sm:p-0 touch-target">
              <input v-model="config.integrations.posthog.analytics" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300">Track Analytics Events</span>
            </label>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">Strapi CMS Integration</h3>
          <div class="space-y-3 sm:space-y-4">
            <label class="flex items-start sm:items-center space-x-3 cursor-pointer p-2 sm:p-0 touch-target">
              <input v-model="config.integrations.strapi.enabled" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300">Enable Strapi CMS</span>
            </label>
            <div class="ml-3 sm:ml-6 space-y-2">
              <label class="block text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Strapi Endpoint:</label>
              <input v-model="config.integrations.strapi.endpoint" 
                     placeholder="http://localhost:1337"
                     class="w-full px-3 py-2 sm:py-3 border rounded dark:bg-gray-700 dark:border-gray-600 touch-target">
            </div>
            <label class="flex items-start sm:items-center space-x-3 ml-3 sm:ml-6 cursor-pointer p-2 sm:p-0 touch-target">
              <input v-model="config.integrations.strapi.contentSync" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <span class="text-sm sm:text-base text-gray-700 dark:text-gray-300">Auto-sync Content</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Testing Tab -->
      <div v-show="activeTab === 'testing'" class="space-y-4 sm:space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">A/B Testing Experiments</h3>
          <div class="space-y-3 sm:space-y-4">
            <label class="flex items-start sm:items-center space-x-3 cursor-pointer p-2 sm:p-0 touch-target">
              <input v-model="config.experiments.headlineVariants" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <div class="min-w-0">
                <div class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Headline Variants</div>
                <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Test different headline variations</div>
              </div>
            </label>
            <label class="flex items-start sm:items-center space-x-3 cursor-pointer p-2 sm:p-0 touch-target">
              <input v-model="config.experiments.ctaVariants" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <div class="min-w-0">
                <div class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">CTA Variants</div>
                <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Test different call-to-action buttons</div>
              </div>
            </label>
            <label class="flex items-start sm:items-center space-x-3 cursor-pointer p-2 sm:p-0 touch-target">
              <input v-model="config.experiments.colorScheme" type="checkbox" class="rounded mt-1 sm:mt-0 touch-target">
              <div class="min-w-0">
                <div class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Color Scheme Testing</div>
                <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Test different color schemes</div>
              </div>
            </label>
          </div>
        </div>
        
        <!-- PostHog Feature Flags Status -->
        <div v-if="config.integrations.posthog.enabled" class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-3">PostHog Feature Flags</h4>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div v-for="(flagKey, flagName) in posthogFeatureFlags" :key="flagName" 
                 class="flex justify-between items-center">
              <span class="text-blue-800 dark:text-blue-200">{{ flagName }}:</span>
              <span class="font-mono text-blue-600 dark:text-blue-400">{{ flagKey }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mobile-optimized styling */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

.touch-friendly-slider {
  @apply h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700;
}

.touch-friendly-slider::-webkit-slider-thumb {
  @apply appearance-none h-6 w-6 bg-blue-600 rounded-full cursor-pointer shadow-lg;
}

.touch-friendly-slider::-moz-range-thumb {
  @apply h-6 w-6 bg-blue-600 rounded-full cursor-pointer border-none shadow-lg;
}

/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Ensure proper touch targets on mobile */
@media (max-width: 640px) {
  input[type="checkbox"] {
    @apply h-5 w-5;
  }
  
  button {
    @apply min-h-[44px];
  }
  
  input[type="text"], input[type="url"] {
    @apply min-h-[44px];
  }
}

/* Better focus indicators for mobile */
input:focus, button:focus {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2;
}

/* Prevent zoom on input focus on iOS */
input[type="text"],
input[type="url"],
input[type="email"],
input[type="number"],
select,
textarea {
  font-size: 16px;
}

@media (min-width: 640px) {
  input[type="text"],
  input[type="url"],
  input[type="email"],
  input[type="number"],
  select,
  textarea {
    font-size: 0.875rem;
  }
}
</style>
