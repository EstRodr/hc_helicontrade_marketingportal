<script setup lang="ts">
// SEO configuration
useHead({
  title: 'Privacy Policy — HeliconTrade',
  meta: [
    { name: 'description', content: 'HeliconTrade Privacy Policy - Learn how we collect, use, and protect your personal information.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <!-- Content -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 lg:p-12">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>
          
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              <strong>Last updated:</strong> August 31, 2024
            </p>

            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support. This includes:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Financial information required for trading (bank account details, trading preferences)</li>
              <li>Identity verification documents as required by financial regulations</li>
              <li>Trading activity and transaction history</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              We use the information we collect to:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
              <li>Provide, maintain, and improve our trading platform</li>
              <li>Process transactions and send related information</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Communicate with you about your account and our services</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              3. Information Sharing
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              except as described in this policy. We may share your information:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
              <li>With service providers who assist in operating our platform</li>
              <li>When required by law or to respond to legal requests</li>
              <li>To protect the rights, property, or safety of HeliconTrade, our users, or others</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              4. Data Security
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and employee training</li>
              <li>Compliance with financial industry security standards</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              5. Your Rights
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
              <li>Access and receive a copy of your personal information</li>
              <li>Rectify inaccurate or incomplete information</li>
              <li>Delete your personal information under certain circumstances</li>
              <li>Object to or restrict processing of your information</li>
              <li>Data portability rights</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              6. Contact Us
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul class="list-none text-gray-600 dark:text-gray-300 mb-6">
              <li><strong>Email:</strong> privacy@helicontrade.com</li>
              <li><strong>Address:</strong> HeliconTrade Privacy Office, New York, NY</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>
