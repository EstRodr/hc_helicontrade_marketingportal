<script setup lang="ts">
const config = useRuntimeConfig()

// SEO configuration
useHead({
  title: 'HeliconTrade — Join the Trading Community',
  meta: [
    { name: 'description', content: 'Join 50,000+ traders sharing insights, strategies, and growing together. Learn from the best and build your trading skills.' },
    { name: 'keywords', content: 'trading community, learn trading, trading education, trading strategies, social trading' }
  ]
})

// Community stats
const communityStats = [
  { label: 'Community Members', value: '50K+', growth: '+1.2K this week' },
  { label: 'Trading Ideas Shared', value: '1.2M+', growth: '+847 today' },
  { label: 'Success Stories', value: '12K+', growth: '+23 this week' },
  { label: 'Countries', value: '85+', growth: '+3 this month' }
]

// Featured traders/educators
const featuredTraders = [
  {
    name: 'Sarah Chen',
    title: 'Options Specialist',
    avatar: '👩‍💼',
    performance: '+127% this year',
    followers: '12.4K',
    badge: 'Pro Trader'
  },
  {
    name: 'Marcus Rodriguez',
    title: 'Swing Trader',
    avatar: '👨‍💻',
    performance: '+89% this year',
    followers: '8.7K',
    badge: 'Top Educator'
  },
  {
    name: 'Emma Watson',
    title: 'Crypto Expert',
    avatar: '👩‍🔬',
    performance: '+156% this year',
    followers: '15.2K',
    badge: 'Community MVP'
  }
]

// Recent community activity
const recentActivity = [
  {
    user: 'TraderMike_92',
    action: 'shared a new trading idea',
    target: 'AAPL Long Setup',
    time: '2 minutes ago',
    likes: 47,
    type: 'idea'
  },
  {
    user: 'CryptoQueen',
    action: 'posted market analysis',
    target: 'Bitcoin Weekly Outlook',
    time: '5 minutes ago',
    likes: 89,
    type: 'analysis'
  },
  {
    user: 'SwingTraderPro',
    action: 'achieved milestone',
    target: '100% Portfolio Growth',
    time: '12 minutes ago',
    likes: 156,
    type: 'milestone'
  },
  {
    user: 'TechAnalyst_AI',
    action: 'shared market update',
    target: 'S&P 500 Key Levels',
    time: '18 minutes ago',
    likes: 23,
    type: 'update'
  }
]

// Learning paths
const learningPaths = [
  {
    title: 'Trading Fundamentals',
    description: 'Master the basics of technical and fundamental analysis',
    lessons: 12,
    duration: '3 weeks',
    level: 'Beginner',
    color: 'blue'
  },
  {
    title: 'Options Trading Mastery',
    description: 'Advanced options strategies and risk management',
    lessons: 18,
    duration: '6 weeks',
    level: 'Intermediate',
    color: 'purple'
  },
  {
    title: 'AI-Assisted Trading',
    description: 'Leverage artificial intelligence for better decisions',
    lessons: 8,
    duration: '2 weeks',
    level: 'Advanced',
    color: 'green'
  }
]

function redirectToApp() {
  window.location.href = `${config.public.appUrl}/auth/register`
}

function joinCommunity() {
  window.location.href = `${config.public.appUrl}/community`
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Standardized Header -->
    <AppHeader />

    <!-- Hero Section - Community Focused -->
    <section class="relative pt-16 pb-24 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Where traders
            <span class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              thrive together
            </span>
          </h1>
          
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join 50,000+ traders sharing strategies, learning from experts, and growing their portfolios. 
            The future of trading is collaborative.
          </p>

          <!-- Community proof -->
          <div class="flex flex-wrap justify-center items-center gap-6 mb-12">
            <div v-for="stat in communityStats.slice(0, 3)" :key="stat.label" 
                 class="text-center">
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ stat.value }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</div>
              <div class="text-xs text-green-600 dark:text-green-400">{{ stat.growth }}</div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              @click="redirectToApp"
              class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
            >
              Join the Community
            </button>
            <button 
              @click="joinCommunity"
              class="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all"
            >
              Explore Ideas
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Community Activity -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Live community activity
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            See what's happening right now in our trading community
          </p>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.user + activity.time" 
                 class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {{ activity.user.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="text-gray-900 dark:text-white">
                    <span class="font-semibold">{{ activity.user }}</span>
                    <span class="text-gray-600 dark:text-gray-300"> {{ activity.action }} </span>
                    <span class="font-semibold text-blue-600 dark:text-blue-400">{{ activity.target }}</span>
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">{{ activity.likes }}</span>
                </div>
                <span class="px-2 py-1 text-xs rounded-full"
                      :class="{
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300': activity.type === 'idea',
                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300': activity.type === 'analysis',
                        'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300': activity.type === 'milestone',
                        'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300': activity.type === 'update'
                      }">
                  {{ activity.type }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-6">
            <button class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View All Activity →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Traders Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Learn from the best
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Follow top-performing traders and learn their strategies
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="trader in featuredTraders" :key="trader.name" 
               class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:scale-105">
            <div class="text-6xl mb-4">{{ trader.avatar }}</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ trader.name }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ trader.title }}</p>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{{ trader.performance }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Portfolio Return</div>
            </div>
            
            <div class="flex items-center justify-between mb-6">
              <div class="text-center">
                <div class="font-bold text-gray-900 dark:text-white">{{ trader.followers }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Followers</div>
              </div>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                {{ trader.badge }}
              </span>
            </div>
            
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              Follow
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Paths -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Structured learning paths
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            From beginner to expert, we guide your trading education journey
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="path in learningPaths" :key="path.title" 
               class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 text-sm font-medium rounded-full"
                    :class="{
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300': path.color === 'blue',
                      'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300': path.color === 'purple',
                      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300': path.color === 'green'
                    }">
                {{ path.level }}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ path.duration }}</span>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ path.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">{{ path.description }}</p>
            
            <div class="flex items-center justify-between mb-6">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ path.lessons }} lessons</span>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="text-sm text-gray-600 dark:text-gray-300">4.8</span>
              </div>
            </div>
            
            <button class="w-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-600 hover:text-white text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium transition-all group-hover:bg-blue-600 group-hover:text-white">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Success stories from our community
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Testimonial Cards -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                J
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">James Wilson</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Retail Trader</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              "The AI alerts helped me identify a breakout pattern I would have missed. 
              Made 15% profit in just two weeks!"
            </p>
            <div class="flex items-center justify-between">
              <span class="text-green-600 dark:text-green-400 font-semibold">+187% this year</span>
              <div class="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                M
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Maria Garcia</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Day Trader</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              "The community taught me risk management. I went from losing money 
              to consistent profits. Game changer!"
            </p>
            <div class="flex items-center justify-between">
              <span class="text-green-600 dark:text-green-400 font-semibold">+92% this year</span>
              <div class="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Alex Kim</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Options Trader</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              "Started as a complete beginner. The learning paths and mentorship 
              program got me profitable in 3 months."
            </p>
            <div class="flex items-center justify-between">
              <span class="text-green-600 dark:text-green-400 font-semibold">+134% this year</span>
              <div class="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Features -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Features list -->
          <div>
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              More than just a platform
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We're building a community where traders support each other's growth and success.
            </p>
            
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Mentorship</h3>
                  <p class="text-gray-600 dark:text-gray-300">Get guidance from profitable traders with years of experience</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">💬</span>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Live Discussions</h3>
                  <p class="text-gray-600 dark:text-gray-300">Real-time chat during market hours with instant trade alerts</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Trading Competitions</h3>
                  <p class="text-gray-600 dark:text-gray-300">Monthly contests with real prizes to test your skills</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Community preview -->
          <div class="relative">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Community Chat</h3>
                <span class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              </div>
              
              <div class="space-y-4 mb-6">
                <div class="flex items-start space-x-3">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">S</div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-900 dark:text-white"><span class="font-semibold">Sarah</span>: AAPL looking bullish on the 4H chart 📈</p>
                    <span class="text-xs text-gray-500 dark:text-gray-400">just now</span>
                  </div>
                </div>
                
                <div class="flex items-start space-x-3">
                  <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">M</div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-900 dark:text-white"><span class="font-semibold">Mike</span>: Agreed! Just entered a position at 189.20</p>
                    <span class="text-xs text-gray-500 dark:text-gray-400">1 min ago</span>
                  </div>
                </div>
                
                <div class="flex items-start space-x-3">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-900 dark:text-white"><span class="font-semibold">Alex</span>: AI alert triggered for NVDA breakout 🚀</p>
                    <span class="text-xs text-gray-500 dark:text-gray-400">2 min ago</span>
                  </div>
                </div>
              </div>
              
              <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div class="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Join the conversation..." 
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-white mb-6">
          Your trading journey starts here
        </h2>
        <p class="text-xl text-purple-100 mb-8">
          Join a community that's committed to your success. Learn, grow, and profit together.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="redirectToApp"
            class="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-lg"
          >
            Join Free Today
          </button>
          <button class="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all">
            Explore Community
          </button>
        </div>
        
        <p class="text-purple-100 text-sm mt-6">
          Free forever • No credit card required • Join 50K+ traders
        </p>
      </div>
    </section>

    <!-- Standardized Footer -->
    <AppFooter />
  </div>
</template>
