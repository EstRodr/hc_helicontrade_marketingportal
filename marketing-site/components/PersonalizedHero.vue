<script setup lang="ts">
const { userContext, personalizedContent, isLoading, initializePersonalization, cleanup, variant, trackHeroInteraction, trackVariantPerformance } = usePersonalization()
const { t, locale } = useI18n()
const { getHomepageContent } = useStrapi()

// Homepage content from Strapi
const homepageContent = ref({})
const homepageLoading = ref(true)

// Track initialization status to prevent multiple calls
let initializationStarted = false

// Initialize personalization and load homepage content
// Use nextTick to avoid blocking navigation
onMounted(() => {
  if (initializationStarted) return
  initializationStarted = true
  
  nextTick(async () => {
    // Initialize personalization system
    await initializePersonalization()
    loadHomepageContent()
    
    // Track hero view after initialization
    setTimeout(() => {
      trackHeroInteraction('view', {
        component_name: 'PersonalizedHero',
        props: {
          showLocationBadge: props.showLocationBadge,
          showMarketStatus: props.showMarketStatus,
          animate: props.animate
        }
      })
    }, 1000)
  })
})

// Cleanup on component unmount
onUnmounted(() => {
  cleanup()
})

// Load homepage content from Strapi (non-blocking)
const loadHomepageContent = () => {
  // Use content from parent if provided, otherwise use fallback
  if (props.content && Object.keys(props.content).length > 0) {
    homepageContent.value = props.content
    homepageLoading.value = false
    return
  }
  
  // Set fallback content immediately
  homepageContent.value = {
    hero_headline_default: t('hero.title'),
    hero_subline_default: t('hero.subtitle')
  }
  homepageLoading.value = false
  
  // Load from Strapi in background without blocking
  getHomepageContent()
    .then(content => {
      if (content && Object.keys(content).length > 0) {
        homepageContent.value = content
      }
    })
    .catch(error => {
      console.error('Failed to load homepage content:', error)
      // Keep fallback content on error
    })
}

// Props for customization
interface Props {
  showLocationBadge?: boolean
  showMarketStatus?: boolean
  animate?: boolean
  content?: any // Content from Strapi passed from parent
}

const props = withDefaults(defineProps<Props>(), {
  showLocationBadge: false, // Keep it subtle by default
  showMarketStatus: true,
  animate: true,
  content: () => ({})
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
  // Track the CTA click with PostHog
  trackHeroInteraction('cta_click', {
    cta_text: personalizedContent.value.cta,
    button_position: 'hero_primary',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    referrer: typeof document !== 'undefined' ? document.referrer : ''
  })
  
  emit('ctaClick', {
    userContext: userContext.value,
    personalizedContent: personalizedContent.value,
    variant: variant.value
  })
}

// Simple way to control personalization in development
// Change ENABLE_PERSONALIZATION in composables/usePersonalization.ts

// Dynamic content selection using personalized content from composable
const dynamicHeadline = computed(() => {
  if (homepageLoading.value || isLoading.value) {
    return homepageContent.value.hero_headline_default || t('hero.title')
  }
  
  // Use personalized headline from the composable
  const headline = personalizedContent.value.headline || t('hero.title')
  console.log('🎨 PersonalizedHero using headline:', headline)
  return headline
})

const dynamicSubline = computed(() => {
  if (homepageLoading.value || isLoading.value) {
    return homepageContent.value.hero_subline_default || t('hero.subtitle')
  }
  
  // Use personalized subheadline from the composable
  const subheadline = personalizedContent.value.subheadline || t('hero.subtitle')
  console.log('🎨 PersonalizedHero using subheadline:', subheadline)
  return formatSubheadlineText(subheadline)
})

// Import the unified highlighting system
import { highlightHeroHeadline, highlightHeroSubheadline, getUserContextForHighlighting } from '~/utils/textHighlighting'

// Helper function to format headline text with beautiful styling
const formatHeadlineText = (text: string): string => {
  if (!text) return ''
  const highlightContext = getUserContextForHighlighting(userContext.value, locale.value)
  return highlightHeroHeadline(text, locale.value, highlightContext)
}

// Helper function to format subheadline text with uniform styling
const formatSubheadlineText = (text: string): string => {
  if (!text) return ''
  const highlightContext = getUserContextForHighlighting(userContext.value, locale.value)
  return highlightHeroSubheadline(text, locale.value, highlightContext)
}

// Get market status styling
const getMarketStatusStyling = computed(() => {
  const session = userContext.value.timing.marketSession
  if (session === 'market-open') {
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
  }
  if (session === 'pre-market') {
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
  }
  if (session === 'after-hours') {
    return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
  }
  if (session === 'market-closed') {
    return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
  }
  return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
})
</script>

<template>
  <div class="text-center">
    <!-- Dynamic Content (Client-only to prevent hydration mismatch) -->
    <ClientOnly>
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
                 'bg-green-500': userContext.market.marketHours.isOpen || userContext.timing.marketSession === 'market-open',
                 'bg-blue-500': userContext.timing.marketSession === 'pre-market',
                 'bg-purple-500': userContext.timing.marketSession === 'after-hours',
                 'bg-gray-500': userContext.timing.marketSession === 'closed' || userContext.timing.marketSession === 'market-closed'
               }"></div>
          {{ personalizedContent.marketStatus }}
        </div>
      </div>
    </ClientOnly>

    <!-- Dynamic Headline from Strapi CMS -->
    <h1 class="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-all duration-500 ease-in-out"
        :class="{ 'animate-slide-up': props.animate }">
      <!-- Always show the default headline first to prevent flickering -->
      <span v-if="isLoading || homepageLoading" v-html="formatHeadlineText(t('hero.title'))"></span>
      
      <!-- Show personalized content after loading with smooth transition -->
      <span v-else 
            v-html="formatHeadlineText(dynamicHeadline)"
            class="animate-fade-in-smooth"></span>
    </h1>
    
    <p class="hero-subtitle text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-all duration-500 ease-in-out"
       :class="{ 'animate-slide-up-delay': props.animate }">
      <span v-if="isLoading || homepageLoading" v-html="formatSubheadlineText(t('hero.subtitle'))"></span>
      <span v-else 
            v-html="dynamicSubline"
            class="animate-fade-in-smooth"></span>
    </p>
  </div>
</template>

<style scoped>
/* Gradient brand styling for non-English headlines */
.gradient-text {
  background-image: linear-gradient(90deg, #2563eb, #9333ea);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
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

.animate-fade-in-smooth {
  animation: fadeInSmooth 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInSmooth {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
