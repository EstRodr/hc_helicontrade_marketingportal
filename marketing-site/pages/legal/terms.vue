<script setup lang="ts">
useHead({
  title: 'Terms of Service — HeliconTrade',
  meta: [
    { name: 'description', content: 'HeliconTrade Terms of Service - Terms and conditions for using our trading platform and services.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 lg:p-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        
        <div class="prose prose-gray dark:prose-invert max-w-none">
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            <strong>Last updated:</strong> December 2024
          </p>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              By accessing or using HeliconTrade's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Description of Services</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              HeliconTrade provides trading research, market analysis, alerts, and related financial services. Our platform is designed for educational and informational purposes, and we do not provide personalized investment advice.
            </p>
            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-4">
              <p class="text-yellow-800 dark:text-yellow-200">
                <strong>Risk Warning:</strong> Trading financial instruments involves significant risk and may result in the loss of your capital. You should not invest money that you cannot afford to lose.
              </p>
            </div>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Responsibilities</h2>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-3">Account Security</h3>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Use strong passwords and enable two-factor authentication</li>
              <li>Ensure your contact information is current and accurate</li>
            </ul>
            
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-3">Prohibited Activities</h3>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Market manipulation or insider trading</li>
              <li>Sharing false or misleading information</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Using our services for illegal activities</li>
              <li>Reverse engineering or copying our software</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Financial Regulations</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              HeliconTrade operates in compliance with applicable financial regulations. Users must:
            </p>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Complete identity verification as required</li>
              <li>Comply with anti-money laundering (AML) requirements</li>
              <li>Report suspicious activities</li>
              <li>Adhere to trading limits and restrictions</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Intellectual Property</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              All content, features, and functionality of our services are owned by HeliconTrade and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Disclaimers and Limitations</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Our services are provided "as is" without warranties of any kind. We do not guarantee the accuracy of market data or the profitability of trading strategies. Trading involves risk, and past performance does not guarantee future results.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Termination</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              We may terminate or suspend your account at any time for violations of these terms or for any other reason. Upon termination, your right to use our services will cease immediately.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Governing Law</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              These terms are governed by and construed in accordance with the laws of the State of New York, without regard to conflict of law principles.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Contact Information</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p class="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> legal@helicontrade.com<br>
                <strong>Address:</strong> HeliconTrade Legal Department<br>
                123 Trading Street, Financial District<br>
                New York, NY 10001, United States
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
    
    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>
