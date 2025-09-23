<script setup lang="ts">
const config = useRuntimeConfig()

// SEO configuration
useHead({
  title: 'About Us — HeliconTrade Mission & Team',
  meta: [
    { name: 'description', content: 'Learn about HeliconTrade\'s mission to democratize trading education and provide powerful tools for the next generation of traders.' },
    { name: 'keywords', content: 'about HeliconTrade, mission, team, company, trading platform, fintech' }
  ]
})

const values = [
  {
    icon: '🎯',
    title: 'Mission Driven',
    description: 'We believe everyone deserves access to quality financial education and trading tools.'
  },
  {
    icon: '🔒',
    title: 'Security First',
    description: 'Your funds and data are protected with bank-grade security and encryption.'
  },
  {
    icon: '🚀',
    title: 'Innovation',
    description: 'We continuously evolve our platform with cutting-edge technology and user feedback.'
  },
  {
    icon: '🤝',
    title: 'Community',
    description: 'Building a supportive community where traders learn, grow, and succeed together.'
  }
]

const stats = [
  { label: 'Founded', value: '2024' },
  { label: 'Active Users', value: '2,500+' },
  { label: 'Countries', value: '25+' },
  { label: 'Support Rating', value: '4.9/5' }
]

// Use centralized redirect utilities
const { redirectToRegister } = useAppRedirects()
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Democratizing Trading for Everyone
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          We're building the future of trading education and technology, making financial markets accessible to the next generation.
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Traditional trading platforms are complex, expensive, and designed for institutional investors. 
              We're changing that by creating an intuitive, educational, and accessible platform for everyone.
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-300">
              Whether you're a complete beginner or an experienced trader, our platform grows with you, 
              providing the tools and knowledge you need at every stage of your trading journey.
            </p>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <div class="grid grid-cols-2 gap-6">
              <div v-for="stat in stats" :key="stat.label" class="text-center">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {{ stat.value }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-300">
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Values
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            The principles that guide everything we do
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="value in values" :key="value.title" class="text-center">
            <div class="text-4xl mb-4">{{ value.icon }}</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ value.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Our Story
        </h2>
        <div class="text-lg text-gray-600 dark:text-gray-300 space-y-6">
          <p>
            Founded in 2024, HeliconTrade emerged from a simple observation: traditional trading platforms 
            were built for institutions, not individuals. Complex interfaces, hidden fees, and poor educational 
            resources created barriers for everyday people wanting to participate in financial markets.
          </p>
          <p>
            We set out to change this by building a platform that puts education first, maintains transparency 
            in pricing, and provides institutional-grade tools in an intuitive interface. Today, we're proud 
            to serve thousands of traders worldwide.
          </p>
          <p>
            Our team combines decades of experience in finance, technology, and education to create a platform 
            that truly serves our users' needs. We're not just building software – we're building the future 
            of financial education.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
          Join Our Mission
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Be part of the trading revolution. Start your journey with us today.
        </p>
        <button 
          @click="redirectToRegister"
          class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
        >
          Start Trading Free
        </button>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>
