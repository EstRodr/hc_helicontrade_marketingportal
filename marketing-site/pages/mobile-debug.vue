<script setup lang="ts">
// Mobile debugging page to test iPhone specific issues
useHead({
  title: 'Mobile Debug - HeliconTrade',
  meta: [
    { name: 'description', content: 'Mobile debugging page for testing iPhone rendering issues' }
  ]
})

// Test data for mobile rendering
const testData = {
  deviceInfo: ref(''),
  viewportSize: ref(''),
  userAgent: ref(''),
  touchSupport: ref(false),
  pixelRatio: ref(1),
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    testData.deviceInfo.value = `${window.innerWidth}x${window.innerHeight}`
    testData.viewportSize.value = `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`
    testData.userAgent.value = navigator.userAgent
    testData.touchSupport.value = 'ontouchstart' in window
    testData.pixelRatio.value = window.devicePixelRatio || 1
  }
})

const testSections = [
  {
    title: 'Typography Test',
    description: 'Testing text sizing and readability',
  },
  {
    title: 'Button Touch Targets',
    description: 'Testing minimum 44px touch targets',
  },
  {
    title: 'Layout & Spacing',
    description: 'Testing responsive layout behavior',
  },
  {
    title: 'Forms & Inputs',
    description: 'Testing form inputs without zoom',
  }
]
</script>

<template>
  <div class="mobile-container mobile-vh-fix">
    <!-- Mobile Debug Header -->
    <div class="bg-blue-600 text-white p-4 safe-area-inset-x">
      <h1 class="text-xl font-bold mb-2">Mobile Debug Test</h1>
      <p class="text-blue-100 text-sm">Test page for iPhone rendering issues</p>
    </div>

    <!-- Device Information -->
    <div class="bg-gray-100 dark:bg-gray-800 p-4 border-b">
      <h2 class="font-semibold mb-3">Device Information</h2>
      <div class="grid grid-cols-1 gap-2 text-sm">
        <div><strong>Window Size:</strong> {{ testData.deviceInfo.value }}</div>
        <div><strong>Viewport:</strong> {{ testData.viewportSize.value }}</div>
        <div><strong>Pixel Ratio:</strong> {{ testData.pixelRatio.value }}</div>
        <div><strong>Touch Support:</strong> {{ testData.touchSupport.value ? 'Yes' : 'No' }}</div>
        <div><strong>User Agent:</strong></div>
        <div class="text-xs text-gray-600 break-all">{{ testData.userAgent.value }}</div>
      </div>
    </div>

    <!-- Typography Test Section -->
    <section class="p-4 border-b">
      <h2 class="text-lg font-semibold mb-4">Typography & Text Scaling</h2>
      
      <div class="space-y-4">
        <div>
          <h3 class="responsive-heading">Large Heading Text</h3>
          <p class="text-gray-600">This should scale properly on mobile devices</p>
        </div>
        
        <div>
          <h4 class="responsive-subheading">Medium Heading</h4>
          <p class="responsive-text">Regular paragraph text that should be easily readable on iPhone screens without requiring zoom.</p>
        </div>
        
        <div class="text-xs">Very small text (12px)</div>
        <div class="text-sm">Small text (14px)</div>
        <div class="text-base">Base text (16px)</div>
        <div class="text-lg">Large text (18px)</div>
      </div>
    </section>

    <!-- Button & Touch Target Test -->
    <section class="p-4 border-b">
      <h2 class="text-lg font-semibold mb-4">Touch Targets & Buttons</h2>
      
      <div class="space-y-4">
        <div class="flex flex-wrap gap-3">
          <button class="btn-primary">Primary Button</button>
          <button class="btn-secondary">Secondary Button</button>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <button class="touch-target bg-green-500 text-white rounded tap-highlight-none">
            Touch Target (44px)
          </button>
          <button class="px-3 py-2 bg-red-500 text-white rounded text-sm">
            Small Button
          </button>
        </div>
        
        <div class="flex items-center space-x-4">
          <button class="w-12 h-12 bg-blue-500 text-white rounded-full touch-manipulation tap-highlight-none">
            +
          </button>
          <span>Icon Button Test</span>
        </div>
      </div>
    </section>

    <!-- Layout & Responsive Test -->
    <section class="p-4 border-b">
      <h2 class="text-lg font-semibold mb-4">Layout & Spacing</h2>
      
      <div class="grid grid-cols-2 mobile:grid-cols-1 gap-4 mb-4">
        <div class="card p-4">
          <h3 class="font-medium mb-2">Card 1</h3>
          <p class="text-sm text-gray-600">This card should stack on mobile</p>
        </div>
        <div class="card p-4">
          <h3 class="font-medium mb-2">Card 2</h3>
          <p class="text-sm text-gray-600">And be side by side on desktop</p>
        </div>
      </div>
      
      <!-- Horizontal scroll test -->
      <div class="overflow-x-auto">
        <div class="flex space-x-4 pb-4" style="width: max-content;">
          <div class="w-32 h-20 bg-blue-200 rounded flex-shrink-0 flex items-center justify-center">1</div>
          <div class="w-32 h-20 bg-green-200 rounded flex-shrink-0 flex items-center justify-center">2</div>
          <div class="w-32 h-20 bg-yellow-200 rounded flex-shrink-0 flex items-center justify-center">3</div>
          <div class="w-32 h-20 bg-purple-200 rounded flex-shrink-0 flex items-center justify-center">4</div>
          <div class="w-32 h-20 bg-pink-200 rounded flex-shrink-0 flex items-center justify-center">5</div>
        </div>
      </div>
    </section>

    <!-- Form Input Test -->
    <section class="p-4 border-b">
      <h2 class="text-lg font-semibold mb-4">Form Input Test</h2>
      
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email (should not zoom on focus):</label>
          <input 
            type="email" 
            class="form-input" 
            placeholder="your@email.com"
            style="font-size: 16px;"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">Search:</label>
          <input 
            type="search" 
            class="form-input" 
            placeholder="Search something..."
            style="font-size: 16px;"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">Message:</label>
          <textarea 
            class="form-input" 
            rows="3" 
            placeholder="Type your message..."
            style="font-size: 16px;"
          ></textarea>
        </div>
        
        <button type="submit" class="btn-primary w-full">
          Submit Form
        </button>
      </form>
    </section>

    <!-- Safe Area Test -->
    <section class="p-4 safe-area-inset">
      <h2 class="text-lg font-semibold mb-4">Safe Area Test</h2>
      <p class="text-sm text-gray-600 mb-4">This section should respect iPhone safe areas (notch, home indicator, etc.)</p>
      
      <div class="bg-orange-100 border-l-4 border-orange-500 p-4">
        <p class="text-orange-700">This content should never be hidden behind iPhone UI elements.</p>
      </div>
    </section>

    <!-- Scroll Test -->
    <section class="p-4">
      <h2 class="text-lg font-semibold mb-4">Scroll Behavior Test</h2>
      <div class="space-y-8 pb-20">
        <p>Scroll down to test smooth scrolling behavior...</p>
        <div class="h-32 bg-gradient-to-b from-blue-100 to-blue-200 rounded flex items-center justify-center">
          Gradient Box 1
        </div>
        <div class="h-32 bg-gradient-to-b from-green-100 to-green-200 rounded flex items-center justify-center">
          Gradient Box 2
        </div>
        <div class="h-32 bg-gradient-to-b from-purple-100 to-purple-200 rounded flex items-center justify-center">
          Gradient Box 3
        </div>
        <div class="h-32 bg-gradient-to-b from-orange-100 to-orange-200 rounded flex items-center justify-center">
          Gradient Box 4
        </div>
      </div>
    </section>

    <!-- Back to Home -->
    <div class="p-4 bg-gray-50 dark:bg-gray-900 safe-area-inset-x safe-area-inset-y">
      <NuxtLink to="/" class="btn-primary block text-center">
        ← Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Additional mobile-specific styles for debugging */
.debug-info {
  font-family: 'Courier New', monospace;
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}

/* Ensure proper mobile styling */
@media (max-width: 640px) {
  .card {
    margin-bottom: 1rem;
  }
}
</style>
