<script setup lang="ts">
const config = useRuntimeConfig()
const colorMode = useColorMode()

// SEO configuration
useHead({
  title: 'HeliconTrade — Market Research, Alerts & Trading Insights',
  meta: [
    { name: 'description', content: 'Join the next generation of traders with HeliconTrade. Get market research, trading alerts, signals, and insights for stocks, crypto, indices, and commodities.' },
    { name: 'keywords', content: 'trading alerts, market research, trading signals, stocks, crypto, indices, commodities, trading insights, financial news' },
    { property: 'og:title', content: 'HeliconTrade — Market Research & Trading Alerts' },
    { property: 'og:description', content: 'Get market research, trading alerts, and signals for stocks, crypto, indices, and commodities.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: config.public.siteUrl },
    { property: 'og:image', content: `${config.public.siteUrl}/images/front-pages/landing-page/hero-dashboard-light.png` }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
  ]
})

// Current language selection
const currentLang = ref('en')
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
]

// Beta user stats
const stats = [
  { label: 'Beta Users', value: '2,500+' },
  { label: 'Assets Tracked', value: '10,000+' },
  { label: 'Daily Alerts', value: '50,000+' },
  { label: 'Research Reports', value: '1,000+' }
]

// Core platform features (from original CoreFeatures.vue)
const coreFeatures = [
  {
    image: '/images/front-pages/landing-page/apple-icon.png',
    title: 'iOS App',
    description: 'Trade on the go with our intuitive iOS application.',
    width: 60,
    height: 60
  },
  {
    image: '/images/front-pages/landing-page/google-play-icon.png', 
    title: 'Android App',
    description: 'Access your portfolio anywhere with our Android app.',
    width: 60,
    height: 60
  }
]

// Trust indicators - realistic and achievable
const trustFeatures = [
  {
    title: 'Real-Time Market Data',
    description: 'Live price feeds and market updates when markets are open'
  },
  {
    title: 'Secure Platform', 
    description: 'Industry-standard encryption and secure data handling'
  },
  {
    title: 'Smart Alerts',
    description: 'Customizable notifications for price movements and market events'
  }
]

// How It Works steps (from HowItWorks.vue)
const howItWorksSteps = [
  {
    title: 'Sign Up & Connect',
    description: 'Create your account and connect your preferred data sources and trading platforms'
  },
  {
    title: 'Configure Alerts',
    description: 'Set up custom alerts based on your trading strategy and risk preferences'
  },
  {
    title: 'Start Trading',
    description: 'Receive real-time notifications and execute trades with confidence'
  },
  {
    title: 'Optimize & Grow',
    description: 'Analyze performance and refine your strategy using our advanced analytics'
  }
]

// Complete Trading Toolkit
const tradingToolkit = [
  {
    category: 'Research & Analysis',
    tools: [
      'Market Research Reports',
      'Technical Analysis Tools', 
      'Fundamental Analysis',
      'Economic Calendar',
      'Earnings Calendar'
    ]
  },
  {
    category: 'Alerts & Notifications',
    tools: [
      'Price Movement Alerts',
      'Volume Spike Alerts',
      'Technical Indicator Alerts',
      'News-Based Alerts',
      'Custom Formula Alerts'
    ]
  },
  {
    category: 'Trading Signals',
    tools: [
      'Buy/Sell Signals',
      'Options Strategies',
      'Swing Trading Signals',
      'Day Trading Signals',
      'Long-term Investment Signals'
    ]
  },
  {
    category: 'Portfolio Management',
    tools: [
      'Portfolio Tracking',
      'Risk Management',
      'Performance Analytics',
      'Diversification Analysis',
      'Tax Optimization'
    ]
  }
]

// Key benefits (from KeyBenefits.vue)
const keyBenefits = [
  {
    title: 'Smart Alerts',
    description: 'Get notified instantly when your custom conditions are met'
  },
  {
    title: 'AI Trading Assistant',
    description: 'Let our AI help you identify profitable trading opportunities'
  },
  {
    title: 'Market News',
    description: 'Stay ahead with real-time financial news and market updates'
  }
]

// Testimonials (from Testimonials.vue)
const testimonials = [
  {
    rating: 5,
    review: 'HeliconTrade has completely transformed my trading strategy. The alerts are incredibly accurate!',
    user: 'Sarah Johnson',
    title: 'Professional Trader',
    avatar: '/images/avatars/avatar-1.png'
  },
  {
    rating: 5,
    review: 'The market research is top-notch. I make better decisions with their insights.',
    user: 'Michael Chen',
    title: 'Investment Analyst', 
    avatar: '/images/avatars/avatar-2.png'
  },
  {
    rating: 5,
    review: 'Finally, a platform that understands what serious traders need. Highly recommended!',
    user: 'Emma Davis',
    title: 'Portfolio Manager',
    avatar: '/images/avatars/avatar-3.png'
  }
]

// Asset classes supported
const assetClasses = [
  { name: 'Stocks', description: 'NYSE, NASDAQ, and international equities' },
  { name: 'Crypto', description: 'Bitcoin, Ethereum, and 500+ cryptocurrencies' },
  { name: 'Indices', description: 'S&P 500, FTSE, DAX, and global indices' },
  { name: 'Commodities', description: 'Gold, oil, agricultural products, and more' },
  { name: 'Forex', description: 'Major and minor currency pairs' },
  { name: 'Options', description: 'Equity and index options strategies' }
]

// Handle login redirect
function redirectToLogin() {
  window.location.href = `${config.public.appUrl}/auth/login`
}

// Handle registration redirect
function redirectToRegister() {
  window.location.href = `${config.public.appUrl}/auth/register`
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
    <!-- Standardized Header -->
    <AppHeader />

    <!-- Enhanced Hero Section -->
    <section class="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Column: Hero Content -->
          <div class="text-center lg:text-left">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Market Research, Alerts &
              <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trading Insights
              </span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Get powerful market research, custom alerts, and trading signals for stocks, crypto, indices, and commodities. 
              Start with our free beta and be ready when trade execution launches.
            </p>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button 
                @click="redirectToRegister"
                class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Join Free Beta
              </button>
              <button 
                @click="redirectToLogin"
                class="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Login to Platform
              </button>
            </div>

            <!-- Mobile App Store Icons -->
            <div class="flex justify-center lg:justify-start items-center gap-4 mb-8">
              <img 
                src="/images/front-pages/landing-page/apple-icon.png" 
                alt="Download on App Store" 
                class="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                width="60"
                height="60"
              >
              <img 
                src="/images/front-pages/landing-page/google-play-icon.png" 
                alt="Get it on Google Play" 
                class="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                width="60"
                height="60"
              >
            </div>

            <!-- Trust Indicators -->
            <div class="flex flex-wrap justify-center lg:justify-start items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Free Beta Access</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>No Credit Card Required</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Real-Time Alerts</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Hero Dashboard Image -->
          <div class="flex justify-center lg:justify-end">
            <img 
              :src="colorMode.value === 'dark' ? '/images/front-pages/landing-page/hero-dashboard-dark.png' : '/images/front-pages/landing-page/hero-dashboard-light.png'"
              alt="HeliconTrade Dashboard" 
              class="max-w-full h-auto rounded-lg shadow-2xl"
              style="max-width: 600px;"
              width="600"
              height="400"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem/Solution Key Messaging Section -->
    <section class="py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trading Problems We Solve
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Every trader faces these common challenges. HeliconTrade provides the solutions you need.
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Problem 1: Missing Profitable Trades -->
          <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Missing Profitable Trades
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                You're constantly watching charts but still missing the best entry and exit points. Market moves happen fast, and manual monitoring isn't enough.
              </p>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
              <div class="flex items-center gap-3 text-green-600 dark:text-green-400 font-semibold mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Our Solution</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>Automated Trading Alerts</strong> that notify you instantly when your custom conditions are met, ensuring you never miss an opportunity.
              </p>
            </div>
          </div>
          
          <!-- Problem 2: Worried About Risk -->
          <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Worried About Risk
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Market volatility keeps you up at night. Without proper risk management and analysis tools, every trade feels like a gamble.
              </p>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
              <div class="flex items-center gap-3 text-green-600 dark:text-green-400 font-semibold mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Our Solution</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>AI Risk Assessment</strong> and comprehensive research tools that help you make informed decisions with confidence and proper risk management.
              </p>
            </div>
          </div>
          
          <!-- Problem 3: Managing Too Many Accounts -->
          <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Managing Too Many Accounts
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Juggling multiple brokers, apps, and data sources is overwhelming. You're spending more time managing tools than actually trading.
              </p>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
              <div class="flex items-center gap-3 text-green-600 dark:text-green-400 font-semibold mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Our Solution</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>Unified Platform</strong> that aggregates all your trading data, accounts, and tools in one place with seamless broker integrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Bar Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Traders Worldwide
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Built with security, powered by AI, delivered in real-time. Join thousands of traders who trust HeliconTrade with their success.
          </p>
          
          <!-- Trust Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">2,500+</div>
              <div class="text-sm text-gray-600 dark:text-gray-300">Active Traders</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">99.9%</div>
              <div class="text-sm text-gray-600 dark:text-gray-300">Uptime SLA</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">25+</div>
              <div class="text-sm text-gray-600 dark:text-gray-300">Countries</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">4.9/5</div>
              <div class="text-sm text-gray-600 dark:text-gray-300">User Rating</div>
            </div>
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(trust, index) in trustFeatures" :key="trust.title" class="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-all">
            <!-- Modern Trust Icons -->
            <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <!-- Clock/Real-time Icon -->
              <svg v-if="index === 0" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <!-- Shield Icon -->
              <svg v-if="index === 1" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <!-- Bell/Smart Alerts Icon -->
              <svg v-if="index === 2" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v2a6 6 0 000 12v2"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {{ trust.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              {{ trust.description }}
            </p>
          </div>
        </div>
        
      </div>
    </section>

    <!-- Core Product Features for Go-Live -->
    <section class="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            Coming Soon - Full Trading Platform
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            3 Core Features Ready for Go-Live
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Beyond research and alerts, these powerful features will launch with our full trading platform
          </p>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Feature 1: Automated Trading Alerts -->
          <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border-2 border-blue-200 dark:border-blue-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Automated Trading Alerts
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Set advanced conditional alerts that trigger automatically based on price, volume, technical indicators, or market events. Never miss a trade opportunity again.
              </p>
              
              <!-- Key Features -->
              <div class="text-left space-y-3">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">Multi-condition alert setup</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">SMS, email & push notifications</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">Real-time trigger execution</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Feature 2: Friendly AI User Interface -->
          <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border-2 border-purple-200 dark:border-purple-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Friendly AI User Interface
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Chat with our AI trading assistant to get instant market insights, trading recommendations, and personalized advice in natural language.
              </p>
              
              <!-- Key Features -->
              <div class="text-left space-y-3">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">Natural language queries</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">Personalized recommendations</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">24/7 availability</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Feature 3: Automated News Integration -->
          <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border-2 border-orange-200 dark:border-orange-700/50 hover:border-orange-300 dark:hover:border-orange-600 transition-colors">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Automated News Integration
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Stay ahead of market-moving news with our AI-powered news analysis that automatically connects breaking news to your portfolio and watchlists.
              </p>
              
              <!-- Key Features -->
              <div class="text-left space-y-3">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">AI-powered news sentiment analysis</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">Portfolio-specific news filtering</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">Real-time impact scoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Go-Live Timeline -->
        <div class="mt-16 text-center">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
            <h3 class="text-2xl font-bold mb-4">
              Full Trading Platform Launch: Q2 2024
            </h3>
            <p class="text-lg text-blue-100 mb-6">
              Join our free beta now to get early access to these features when they launch, plus exclusive beta user benefits.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                @click="redirectToRegister"
                class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-md"
              >
                Join Beta - Free Access
              </button>
              <button class="border-2 border-white/50 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
                Get Notified at Launch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get started with HeliconTrade in just four simple steps
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, index) in howItWorksSteps" :key="step.title" class="text-center relative">
            <!-- Step Number -->
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {{ index + 1 }}
            </div>
            <!-- Icon -->
            <div class="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
              <!-- User Icon -->
              <svg v-if="index === 0" class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <!-- Settings Icon -->
              <svg v-if="index === 1" class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <!-- Lightning Icon -->
              <svg v-if="index === 2" class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <!-- Trending Up Icon -->
              <svg v-if="index === 3" class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ step.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Complete Trading Toolkit Section -->
    <section class="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20 dark:from-blue-900/30 dark:to-purple-900/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Complete Trading Toolkit
          </h2>
          <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Everything you need for successful trading, from research to execution, all in one powerful platform
          </p>
        </div>
        
        <!-- Mobile: Single column, Tablet: 2 columns, Desktop: 4 columns -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div v-for="(toolkit, index) in tradingToolkit" :key="toolkit.category" class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <!-- Modern SVG Icons -->
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <!-- Search/Analysis Icon -->
              <svg v-if="index === 0" class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <!-- Bell/Notifications Icon -->
              <svg v-if="index === 1" class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM11 14l4.5 2.5V10l-4.5 2.5v1.5zM6 10v7l-3-1.5v-4L6 10z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"></path>
              </svg>
              <!-- Radio/Signals Icon -->
              <svg v-if="index === 2" class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
              </svg>
              <!-- Briefcase/Portfolio Icon -->
              <svg v-if="index === 3" class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">
              {{ toolkit.category }}
            </h3>
            <!-- Mobile-optimized list -->
            <ul class="space-y-2 sm:space-y-2">
              <li v-for="tool in toolkit.tools" :key="tool" class="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                <svg class="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-xs sm:text-sm leading-relaxed">{{ tool }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Features Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Trade Successfully
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform combines powerful trading tools with educational resources to help you succeed in the markets.
          </p>
        </div>

        <!-- Asset Classes Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div v-for="(asset, index) in assetClasses" :key="asset.name" class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <!-- Modern Asset Icons -->
            <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <!-- Stocks: Trending Up -->
              <svg v-if="index === 0" class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              <!-- Crypto: CPU/Chip -->
              <svg v-if="index === 1" class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
              <!-- Indices: Chart Bar -->
              <svg v-if="index === 2" class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <!-- Commodities: Cube -->
              <svg v-if="index === 3" class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              <!-- Forex: Currency Exchange -->
              <svg v-if="index === 4" class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <!-- Options: Document Duplicate -->
              <svg v-if="index === 5" class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ asset.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ asset.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose HeliconTrade?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover what makes HeliconTrade the preferred choice for serious traders and investors worldwide
          </p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <!-- Left Column: Key Benefits -->
          <div class="space-y-8">
            <div v-for="(benefit, index) in keyBenefits" :key="benefit.title" class="flex items-start gap-4">
              <div class="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <!-- Bell Icon -->
                <svg v-if="index === 0" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v2a6 6 0 000 12v2"></path>
                </svg>
                <!-- CPU/AI Icon -->
                <svg v-if="index === 1" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
                <!-- Newspaper Icon -->
                <svg v-if="index === 2" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {{ benefit.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ benefit.description }}
                </p>
              </div>
            </div>
            
            <!-- Additional benefits -->
            <div class="flex items-start gap-4">
              <div class="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <!-- Target Icon -->
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Precision Trading
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Advanced algorithms and data analysis for more accurate trade timing
                </p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <!-- Link Icon -->
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Multi-Platform Integration
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Connect with your favorite brokers and trading platforms seamlessly
                </p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <!-- Academic Cap Icon -->
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Educational Resources
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Learn from expert analysis, webinars, and comprehensive trading guides
                </p>
              </div>
            </div>
          </div>
          
          <!-- Right Column: Feature Highlights -->
          <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Platform Highlights
            </h3>
            
            <!-- Feature Stats -->
            <div class="grid grid-cols-2 gap-6 mb-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">99.9%</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Uptime</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">&lt;1ms</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Alert Latency</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">24/7</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Monitoring</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">100+</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Indicators</div>
              </div>
            </div>
            
            <!-- Key Features List -->
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Real-time market data from global exchanges</span>
              </div>
              <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Advanced technical and fundamental analysis</span>
              </div>
              <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Customizable alerts and notifications</span>
              </div>
              <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Portfolio tracking and performance analytics</span>
              </div>
              <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Multi-device synchronization</span>
              </div>
              <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>Enterprise-grade security and compliance</span>
              </div>
            </div>
            
            <!-- CTA in feature box -->
            <div class="mt-8 text-center">
              <button 
                @click="redirectToRegister"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Contact Us Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <img 
            src="/images/pages/section-title-icon.png" 
            alt="Section Icon" 
            class="h-8 mx-auto mb-4"
            width="32"
            height="32"
          >
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Column: Contact Card -->
          <div class="flex justify-center">
            <div class="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white max-w-md w-full shadow-2xl">
              <div class="mb-2 text-lg opacity-90">
                Let's contact with us
              </div>
              <div class="text-2xl font-bold mb-6 leading-tight">
                Share your ideas or requirement with our experts.
              </div>
              
              <!-- Team Members Row 1 -->
              <div class="flex items-center mb-3">
                <img 
                  src="/images/front-pages/landing-page/team-member-1.png" 
                  alt="Team Member 1" 
                  class="w-12 h-12 rounded-full border-3 border-white shadow-md"
                  width="48"
                  height="48"
                >
                <div class="flex-1 h-4 bg-white/25 rounded-full mx-3"></div>
                <img 
                  src="/images/front-pages/landing-page/team-member-2.png" 
                  alt="Team Member 2" 
                  class="w-12 h-12 rounded-full border-3 border-white shadow-md"
                  width="48"
                  height="48"
                >
              </div>
              
              <!-- Team Members Row 2 -->
              <div class="flex items-center mb-6">
                <img 
                  src="/images/front-pages/landing-page/team-member-3.png" 
                  alt="Team Member 3" 
                  class="w-12 h-12 rounded-full border-3 border-white shadow-md"
                  width="48"
                  height="48"
                >
                <div class="flex-1 h-4 bg-white/25 rounded-full mx-3" style="flex: 0.6;"></div>
                <img 
                  src="/images/front-pages/landing-page/team-member-4.png" 
                  alt="Team Member 4" 
                  class="w-12 h-12 rounded-full border-3 border-white shadow-md"
                  width="48"
                  height="48"
                >
              </div>
              
              <p class="text-white/85">
                Looking for more customisation, more features, and more anything? Don't worry, We've provided you with an entire team of experienced professionals.
              </p>
            </div>
          </div>
          
          <!-- Right Column: Contact Form -->
          <div class="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
            <form class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Your full name"
                >
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                >
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea 
                  id="message" 
                  rows="5" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  placeholder="Tell us about your trading needs or questions..."
                ></textarea>
              </div>
              
              <div class="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required
                  class="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <label for="terms" class="text-sm text-gray-600 dark:text-gray-300">
                  I agree to the <NuxtLink to="/legal/terms" class="text-blue-600 hover:text-blue-700 underline">Terms and Conditions</NuxtLink>
                </label>
              </div>
              
              <button 
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Start Your Trading Journey?
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Join thousands of successful traders and start building your financial future today.
        </p>
        <button 
          @click="redirectToRegister"
          class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
        >
          Create Free Account
        </button>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>

<style>
/* RTL support */
html.rtl {
  direction: rtl;
}

/* Smooth theme transitions */
html {
  @apply transition-colors duration-200;
}

/* Dark mode styles */
.dark {
  @apply bg-gray-900 text-white;
}

/* Ensure proper contrast for dark mode links */
.dark a {
  @apply text-blue-400;
}

.dark a:hover {
  @apply text-blue-300;
}
</style>
