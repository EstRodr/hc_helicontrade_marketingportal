<script setup lang="ts">
// No additional logic needed for footer
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <!-- Main Footer Content -->
    <div class="bg-gray-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8">
          <!-- Branding & Newsletter -->
          <div class="col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <img 
                src="/logo.svg" 
                alt="HeliconTrade Logo" 
                class="h-8 w-auto"
                width="32"
                height="32"
              >
              <span class="text-xl font-bold">HeliconTrade</span>
            </div>
            <p class="text-gray-400 mb-6 max-w-md">
              Empowering the next generation of traders with cutting-edge technology, research, and education. Join our beta for free access to all features.
            </p>
            
            <!-- Newsletter Signup -->
            <div class="mb-6">
              <h4 class="font-semibold mb-2">Stay Updated</h4>
              <div class="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  class="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <button class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <!-- Services -->
          <div>
            <h3 class="font-semibold mb-4">Services</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Trading Symbols</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Market Indicators</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Custom Alerts</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Trading Strategies</a></li>
            </ul>
          </div>
          
          <!-- Download App -->
          <div>
            <h3 class="font-semibold mb-4">Download App</h3>
            <div class="space-y-3">
              <a href="#" class="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <img 
                  src="/images/front-pages/landing-page/apple-icon.png" 
                  alt="iOS App" 
                  class="w-8 h-8"
                  width="34"
                  height="34"
                >
                <div>
                  <div class="text-xs text-gray-300">Download on the</div>
                  <div class="text-sm font-medium">App Store</div>
                </div>
              </a>
              <a href="#" class="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <img 
                  src="/images/front-pages/landing-page/google-play-icon.png" 
                  alt="Android App" 
                  class="w-8 h-8"
                  width="34"
                  height="34"
                >
                <div>
                  <div class="text-xs text-gray-300">Get it on</div>
                  <div class="text-sm font-medium">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer Bottom with Language Picker and Theme Toggle -->
    <div class="bg-gray-900 py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row justify-between items-center gap-6">
          <!-- Left: Copyright -->
          <p class="text-gray-400 text-sm">
            &copy; 2024 HeliconTrade. All rights reserved.
          </p>
          
          <!-- Center: Legal Links -->
          <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <NuxtLink to="/legal/privacy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink>
            <NuxtLink to="/legal/terms" class="hover:text-white transition-colors">Terms of Service</NuxtLink>
            <NuxtLink to="/legal/cookies" class="hover:text-white transition-colors">Cookie Policy</NuxtLink>
            <NuxtLink to="/about" class="hover:text-white transition-colors">About Us</NuxtLink>
          </div>
          
          <!-- Right: Theme Toggle, Language Picker & Social Links -->
          <div class="flex items-center gap-4">
            <!-- Language Picker & Theme Toggle -->
            <div class="flex items-center gap-2 border-r border-gray-700 pr-4">
              <LanguagePicker />
              <ThemeToggle />
            </div>
            
            <!-- Social Links -->
            <div class="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
