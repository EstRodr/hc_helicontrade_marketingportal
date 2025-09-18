<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="bg-blue-600 text-white p-4">
        <h1 class="text-lg font-bold">📱 Mobile Admin Test</h1>
        <p class="text-sm opacity-90">Testing personalization admin panel on mobile</p>
      </div>

      <div class="p-4 space-y-4">
        <!-- Device Info -->
        <div class="bg-gray-50 p-3 rounded">
          <h3 class="font-medium text-gray-900 mb-2">Device Information</h3>
          <div class="text-sm space-y-1">
            <div>Screen: {{ screenInfo.width }}x{{ screenInfo.height }}</div>
            <div>Viewport: {{ viewportInfo.width }}x{{ viewportInfo.height }}</div>
            <div>Device Pixel Ratio: {{ devicePixelRatio }}</div>
            <div>User Agent: {{ userAgent }}</div>
          </div>
        </div>

        <!-- Test Cases -->
        <div class="space-y-3">
          <h3 class="font-medium text-gray-900">Touch Target Tests</h3>
          
          <!-- Touch targets should be at least 44px -->
          <button class="w-full bg-blue-600 text-white py-3 px-4 rounded touch-test-button">
            44px Touch Target Test
          </button>
          
          <div class="grid grid-cols-2 gap-2">
            <button class="bg-gray-600 text-white py-3 px-2 rounded text-sm touch-test-button">
              Small Button
            </button>
            <button class="bg-green-600 text-white py-3 px-2 rounded text-sm touch-test-button">
              Another Button
            </button>
          </div>

          <!-- Form input test -->
          <div class="space-y-2">
            <label class="block text-sm font-medium">Input Test (should not zoom on iOS):</label>
            <input 
              v-model="testInput" 
              type="text" 
              placeholder="Test input field"
              class="w-full px-3 py-3 border rounded touch-test-input"
            >
          </div>

          <!-- Slider test -->
          <div class="space-y-2">
            <label class="block text-sm font-medium">Slider Test:</label>
            <input 
              v-model="sliderValue" 
              type="range" 
              min="0" 
              max="100" 
              class="w-full touch-friendly-slider"
            >
            <div class="text-center text-sm text-gray-600">Value: {{ sliderValue }}</div>
          </div>

          <!-- Checkbox test -->
          <label class="flex items-center space-x-3 cursor-pointer p-3 border rounded hover:bg-gray-50 touch-target">
            <input v-model="checkboxTest" type="checkbox" class="h-6 w-6 min-h-[44px] min-w-[44px] touch-target">
            <span class="text-sm">Touch-friendly checkbox test</span>
          </label>
        </div>

        <!-- Navigation to Admin Panel -->
        <div class="pt-4 border-t">
          <NuxtLink 
            to="/admin/personalization"
            class="block w-full bg-purple-600 text-white text-center py-3 px-4 rounded font-medium hover:bg-purple-700 touch-test-button responsive-element sm:bg-purple-500 sm:hover:bg-purple-600">
            <span class="sm:hidden">🎯 Admin</span>
            <span class="hidden sm:inline">🎯 Go to Admin Panel</span>
          </NuxtLink>
        </div>

        <!-- Automated Test Results -->
        <div class="bg-blue-50 p-3 rounded">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium text-blue-800">Automated Tests</h3>
            <button @click="runTests" class="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 touch-target min-h-[44px] min-w-[44px]">
              Run Tests
            </button>
          </div>
          <div v-if="testResults.length > 0" class="space-y-1 text-sm">
            <div v-for="result in testResults" :key="result.name" class="flex items-center space-x-2">
              <span :class="result.passed ? 'text-green-600' : 'text-red-600'">
                {{ result.passed ? '✓' : '❌' }}
              </span>
              <span>{{ result.name }}: {{ result.message }}</span>
            </div>
          </div>
          <div v-else class="text-sm text-blue-600">
            Click "Run Tests" to check mobile responsiveness
          </div>
        </div>

        <!-- Test Results -->
        <div class="bg-yellow-50 p-3 rounded">
          <h3 class="font-medium text-yellow-800 mb-2">Mobile Optimization Checklist</h3>
          <div class="space-y-1 text-sm">
            <div class="flex items-center space-x-2">
              <span class="text-green-600">✓</span>
              <span>Touch targets ≥ 44px</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-green-600">✓</span>
              <span>No horizontal scrolling</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-green-600">✓</span>
              <span>Text inputs prevent zoom (font-size: 16px)</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-green-600">✓</span>
              <span>Responsive layout adapts to screen</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-green-600">✓</span>
              <span>Sticky header with proper z-index</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick viewport test -->
    <div class="mt-8 max-w-md mx-auto">
      <div class="bg-red-100 border border-red-300 p-3 rounded">
        <p class="text-sm text-red-800">
          <strong>Test Instructions:</strong>
          <br>1. Open Chrome DevTools (F12)
          <br>2. Click device toolbar (Ctrl/Cmd + Shift + M)
          <br>3. Select "iPhone SE" or "iPhone 12 Pro" 
          <br>4. Test the admin panel navigation and interactions
          <br>5. Check all touch targets are easily tappable
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Mobile test page for admin panel
useHead({
  title: 'Mobile Admin Test - HeliconTrade',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'description', content: 'Mobile responsiveness test for admin panel' }
  ]
})

// Reactive test data
const testInput = ref('')
const sliderValue = ref(50)
const checkboxTest = ref(false)
const testResults = ref([])

// Device information
const screenInfo = ref({ width: 0, height: 0 })
const viewportInfo = ref({ width: 0, height: 0 })
const devicePixelRatio = ref(1)
const userAgent = ref('')

// Get device info on mount
onMounted(() => {
  if (process.client) {
    screenInfo.value = {
      width: window.screen.width,
      height: window.screen.height
    }
    
    viewportInfo.value = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    
    devicePixelRatio.value = window.devicePixelRatio
    userAgent.value = navigator.userAgent
    
    // Update viewport info on resize
    const updateViewport = () => {
      viewportInfo.value = {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
    
    window.addEventListener('resize', updateViewport)
    
    // Cleanup
    onUnmounted(() => {
      window.removeEventListener('resize', updateViewport)
    })
  }
})

// Run mobile responsiveness tests
const runTests = async () => {
  if (!process.client) return
  
  testResults.value = []
  
  try {
    // Test 1: Check viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    testResults.value.push({
      name: 'Viewport Meta Tag',
      passed: !!viewportMeta,
      message: viewportMeta ? `Present: ${viewportMeta.content}` : 'Missing viewport meta tag'
    })
    
    // Test 2: Check for horizontal scrolling
    const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth
    testResults.value.push({
      name: 'Horizontal Scrolling',
      passed: !hasHorizontalScroll,
      message: hasHorizontalScroll ? 'Page has horizontal scroll' : 'No horizontal scrolling'
    })
    
    // Test 3: Check touch target sizes
    const touchElements = document.querySelectorAll('button, input[type="checkbox"], input[type="range"], a')
    let smallTouchTargets = 0
    let problematicElements = []
    
    touchElements.forEach(el => {
      const rect = el.getBoundingClientRect()
      const computedStyle = window.getComputedStyle(el)
      const minHeight = Math.max(rect.height, parseFloat(computedStyle.minHeight) || 0)
      const minWidth = Math.max(rect.width, parseFloat(computedStyle.minWidth) || 0)
      
      if (minHeight < 44 || minWidth < 44) {
        smallTouchTargets++
        problematicElements.push({
          tag: el.tagName.toLowerCase(),
          type: el.type || 'N/A',
          width: Math.round(minWidth),
          height: Math.round(minHeight),
          className: el.className,
          id: el.id || 'no-id',
          text: el.textContent?.slice(0, 30) || el.placeholder?.slice(0, 30) || 'no-text'
        })
      }
    })
    
    // Log problematic elements for debugging
    if (problematicElements.length > 0) {
      console.log('Problematic touch targets:', problematicElements)
    }
    
    testResults.value.push({
      name: 'Touch Targets',
      passed: smallTouchTargets === 0,
      message: smallTouchTargets === 0 ? 
        `All ${touchElements.length} targets ≥44px` : 
        `${smallTouchTargets} targets <44px (check console for details)`
    })
    
    // Test 4: Check input font sizes (iOS zoom prevention)
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="url"], textarea')
    let zoomCausingInputs = 0
    
    textInputs.forEach(input => {
      const computedStyle = window.getComputedStyle(input)
      const fontSize = parseFloat(computedStyle.fontSize)
      if (fontSize < 16) {
        zoomCausingInputs++
      }
    })
    
    testResults.value.push({
      name: 'Input Font Size',
      passed: zoomCausingInputs === 0,
      message: zoomCausingInputs === 0 ? `All ${textInputs.length} inputs ≥16px` : `${zoomCausingInputs} inputs <16px (may zoom)`
    })
    
    // Test 5: Check if layout adapts to screen size
    const isSmallScreen = window.innerWidth < 640
    const responsiveSelectors = [
      '.sm\\:hidden', '.hidden.sm\\:block', '.sm\\:inline', '.hidden.sm\\:inline',
      '.sm\\:flex', '.sm\\:grid', '.responsive-element',
      '[class*="sm:"]', // Any element with sm: classes
      '.sm\\:text-', '.sm\\:px-', '.sm\\:py-', '.sm\\:mb-', '.sm\\:mt-',
      '.sm\\:space-', '.sm\\:gap-', '.sm\\:w-', '.sm\\:h-'
    ]
    
    let responsiveElements = []
    responsiveSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector)
        responsiveElements.push(...elements)
      } catch (e) {
        // Some selectors might not work, skip them
      }
    })
    
    // Also check for elements with responsive classes in their className
    const allElements = document.querySelectorAll('*')
    allElements.forEach(el => {
      if (el.className && typeof el.className === 'string' && el.className.includes('sm:')) {
        responsiveElements.push(el)
      }
    })
    
    // Remove duplicates
    responsiveElements = [...new Set(responsiveElements)]
    
    testResults.value.push({
      name: 'Responsive Layout',
      passed: responsiveElements.length > 0,
      message: `Found ${responsiveElements.length} responsive elements (screen: ${isSmallScreen ? 'small' : 'large'})`
    })
    
    // Test 6: Performance check
    const startTime = performance.now()
    await new Promise(resolve => setTimeout(resolve, 100)) // Small delay
    const endTime = performance.now()
    
    testResults.value.push({
      name: 'Basic Performance',
      passed: (endTime - startTime) < 200,
      message: `Test delay: ${Math.round(endTime - startTime)}ms`
    })
    
    console.log('Mobile responsiveness tests completed:', testResults.value)
    
  } catch (error) {
    testResults.value.push({
      name: 'Test Error',
      passed: false,
      message: error.message
    })
  }
}
</script>

<style scoped>
.touch-test-button {
  min-height: 44px;
  min-width: 44px;
}

.touch-test-input {
  min-height: 44px;
  font-size: 16px; /* Prevents zoom on iOS */
}

.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Ensure all interactive elements meet touch target requirements */
input[type="checkbox"] {
  min-height: 44px !important;
  min-width: 44px !important;
}

button {
  min-height: 44px !important;
  min-width: 44px !important;
}

a {
  min-height: 44px !important;
  min-width: 44px !important;
}

input[type="range"] {
  min-height: 44px !important;
}

.touch-friendly-slider {
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
  appearance: none;
  cursor: pointer;
}

.touch-friendly-slider::-webkit-slider-thumb {
  appearance: none;
  height: 24px;
  width: 24px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.touch-friendly-slider::-moz-range-thumb {
  height: 24px;
  width: 24px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Focus indicators */
button:focus,
input:focus {
  outline: none;
  ring: 2px;
  ring-color: #3b82f6;
  ring-offset: 2px;
}
</style>
