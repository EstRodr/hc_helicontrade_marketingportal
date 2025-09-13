<script setup lang="ts">
const { userContext, personalizedContent, isLoading, initializePersonalization } = usePersonalization()

// Initialize personalization on component mount
onMounted(() => {
  initializePersonalization()
})

// Props for customization
interface Props {
  showLocationBadge?: boolean
  showMarketStatus?: boolean
  animate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLocationBadge: false, // Keep it subtle by default
  showMarketStatus: true,
  animate: true
})

// Emit events for tracking
const emit = defineEmits<{
  ctaClick: [context: any]
  locationDetected: [location: any]
}>()

// Watch for location detection
watch(() => userContext.value.location.city, (newCity) => {
  if (newCity) {
    emit('locationDetected', userContext.value.location)
  }
})

// Handle CTA click with context
const handleCtaClick = () => {
  emit('ctaClick', {
    userContext: userContext.value,
    personalizedContent: personalizedContent.value
  })
}

// Get market status styling
const getMarketStatusStyling = computed(() => {
  if (userContext.value.market.marketHours.isOpen) {
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
  } else if (userContext.value.timing.marketSession === 'pre-market') {
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
  } else if (userContext.value.timing.marketSession === 'after-hours') {
    return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
  }
  return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
})
</script>

<template>
  <div class="text-center">
    <!-- Subtle Location Badge (only if enabled) -->
    <div v-if="props.showLocationBadge && userContext.location.city && !isLoading" 
         class="flex justify-center mb-4"
         :class="{ 'animate-fade-in': props.animate }">
      <div class="inline-flex items-center px-3 py-1 bg-gray-100/80 dark:bg-gray-800/80 rounded-full text-xs text-gray-600 dark:text-gray-400 backdrop-blur-sm">
        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
        </svg>
        {{ personalizedContent.greeting }}
      </div>
    </div>

    <!-- Market Status Alert (subtle) -->
    <div v-if="props.showMarketStatus && personalizedContent.marketStatus && !isLoading" 
         class="flex justify-center mb-6"
         :class="{ 'animate-fade-in-delay': props.animate }">
      <div :class="`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getMarketStatusStyling} transition-all duration-300`">
        <div class="w-1.5 h-1.5 rounded-full mr-2 animate-pulse"
             :class="{
               'bg-green-500': userContext.market.marketHours.isOpen,
               'bg-blue-500': userContext.timing.marketSession === 'pre-market',
               'bg-purple-500': userContext.timing.marketSession === 'after-hours',
               'bg-gray-500': userContext.timing.marketSession === 'closed'
             }"></div>
        {{ personalizedContent.marketStatus }}
      </div>
    </div>

    <!-- Enhanced Headline (dynamic based on personalization with styling) -->
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
        :class="{ 'animate-slide-up': props.animate }">
      <!-- Markets are LIVE headline -->
      <span v-if="!isLoading && personalizedContent.headline.includes('Markets are LIVE')">
        <span class="text-green-600 dark:text-green-400">Markets are LIVE</span> — AI is watching 
        <span class="text-blue-600 dark:text-blue-400">{{ userContext.location.currency }}</span> 
        <span class="text-purple-600 dark:text-purple-400">opportunities</span>
      </span>
      
      <!-- Pre-market headline -->
      <span v-else-if="!isLoading && personalizedContent.headline.includes('Pre-market')">
        <span class="text-blue-600 dark:text-blue-400">Pre-market</span> is heating up — 
        <br>
        Get ready for the <span class="text-purple-600 dark:text-purple-400">open</span>
      </span>
      
      <!-- After-hours headline -->
      <span v-else-if="!isLoading && personalizedContent.headline.includes('After-hours')">
        <span class="text-purple-600 dark:text-purple-400">After-hours</span> action continues — 
        <br>
        <span class="text-blue-600 dark:text-blue-400">AI never stops</span>
      </span>
      
      <!-- Default/fallback headline with original styling -->
      <span v-else>
        AI finds the opportunities,
        <br>
        <span class="text-blue-600 dark:text-blue-400">you make</span> the 
        <span class="text-purple-600 dark:text-purple-400">decisions</span>
      </span>
    </h1>
    
    <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
       :class="{ 'animate-slide-up-delay': props.animate }">
      <span v-if="!isLoading">{{ personalizedContent.subheadline }}</span>
      <span v-else>Sleep better, trade smarter with 24/7 AI market monitoring.</span>
    </p>
  </div>
</template>

<style scoped>
/* Animation classes */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.8s ease-out 0.2s both;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

.animate-slide-up-delay {
  animation: slideUp 0.8s ease-out 0.2s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Subtle backdrop blur for badges */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
