// Strapi CMS composable for content management
export const useStrapi = () => {
  const config = useRuntimeConfig()
  const strapiUrl = config.public.strapiUrl
  const strapiToken = config.public.strapiToken
  
  // Import mock data for fallback when Strapi is not available
  const { fetchArticles: fetchMockArticles } = useMockStrapi()

  // Generic function to fetch from Strapi API
  const fetchFromStrapi = async <T = any>(
    endpoint: string, 
    options: {
      query?: Record<string, any>
      headers?: Record<string, string>
      method?: string
    } = {}
  ): Promise<T> => {
    try {
      const { query = {}, headers = {}, method = 'GET' } = options
      
      // Build query string
      const queryParams = new URLSearchParams()
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
      
      const queryString = queryParams.toString()
      const url = `${strapiUrl}/api${endpoint}${queryString ? '?' + queryString : ''}`

      // Build headers
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers
      }

      if (strapiToken) {
        requestHeaders.Authorization = `Bearer ${strapiToken}`
      }

      const response = await $fetch<T>(url, {
        method,
        headers: requestHeaders,
        timeout: 5000, // 5 second timeout to prevent blocking
        retry: 1 // Only retry once to avoid delays
      })
      return response
  } catch (error) {
    console.warn(`Strapi API error for ${endpoint}:`, error)
    // Don't throw error, let individual functions handle fallbacks
    throw error
  }
  }

  // Blog/Articles
  const getArticles = async (options?: {
    populate?: string[]
    filters?: Record<string, any>
    sort?: string[]
    pagination?: { page?: number; pageSize?: number }
    locale?: string
  }) => {
    const query: Record<string, any> = {}
    
    if (options?.populate) {
      query['populate'] = options.populate.join(',')
    }
    
    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query[`filters[${key}]`] = value
      })
    }
    
    if (options?.sort) {
      query['sort'] = options.sort.join(',')
    }
    
    if (options?.pagination) {
      if (options.pagination.page) query['pagination[page]'] = options.pagination.page
      if (options.pagination.pageSize) query['pagination[pageSize]'] = options.pagination.pageSize
    }
    
    if (options?.locale) {
      query['locale'] = options.locale
    }

    return fetchFromStrapi('/articles', { query })
  }

  const getArticle = async (slug: string, populate: string[] = []) => {
    const query: Record<string, any> = {
      'filters[slug][$eq]': slug
    }
    
    if (populate.length) {
      query['populate'] = populate.join(',')
    }

    const response = await fetchFromStrapi('/articles', { query })
    return response?.data?.[0] || null
  }

  // Page content (for dynamic pages)
  const getPage = async (slug: string, populate: string[] = []) => {
    const query: Record<string, any> = {
      'filters[slug][$eq]': slug
    }
    
    if (populate.length) {
      query['populate'] = populate.join(',')
    }

    const response = await fetchFromStrapi('/pages', { query })
    return response?.data?.[0] || null
  }

  // Global settings (footer, header, etc.)
  const getGlobalSettings = async () => {
    return fetchFromStrapi('/global', {
      query: {
        populate: 'deep'
      }
    })
  }

  // Homepage content (single type)
  const getHomepageContent = async () => {
    try {
      const response = await fetchFromStrapi('/homepage')
      // For single types, return the data directly
      return response?.data || response || {}
    } catch (error) {
      console.warn('Homepage content not available from Strapi, using fallback:', error)
      // Return fallback content
      return {
        hero_headline_default: "AI finds the opportunities, you make the decisions",
        hero_subline_default: "Sleep better, trade smarter with 24/7 AI market monitoring.",
        cta_primary: "Get started for free",
        cta_secondary: "View demo",
        cta_disclaimer: "Start free — No credit card required",
        value_prop_1: "AI-powered opportunity discovery",
        value_prop_2: "24/7 market scanning",
        value_prop_3: "Personalized to your strategy",
        page_title: "HeliconTrade — Where Traders Research, Then Commit",
        meta_description: "AI-powered trading platform that monitors global markets 24/7 to find opportunities matching your strategy. Sleep better while AI watches the markets for you."
      }
    }
  }

  // Team members
  const getTeamMembers = async () => {
    return fetchFromStrapi('/team-members', {
      query: {
        populate: ['avatar'],
        sort: ['order:asc']
      }
    })
  }

  // Testimonials
  const getTestimonials = async (featured = false) => {
    const query: Record<string, any> = {
      populate: ['avatar']
    }
    
    if (featured) {
      query['filters[featured][$eq]'] = true
    }

    return fetchFromStrapi('/testimonials', { query })
  }

  // FAQ
  const getFaqs = async (category?: string) => {
    const query: Record<string, any> = {
      sort: ['order:asc']
    }
    
    if (category) {
      query['filters[category][$eq]'] = category
    }

    return fetchFromStrapi('/faqs', { query })
  }

  // Features
  const getFeatures = async (featured?: boolean) => {
    const query: Record<string, any> = {
      populate: ['icon'],
      sort: ['order:asc']
    }
    
    if (featured !== undefined) {
      query['filters[featured][$eq]'] = featured
    }
    
    const response = await fetchFromStrapi('/nfeatures', { query })
    return response?.data || response || []
  }

  // Pricing plans
  const getPricingPlans = async () => {
    return fetchFromStrapi('/pricing-plans', {
      query: {
        populate: ['features'],
        sort: ['order:asc']
      }
    })
  }

  // Newsletter subscription
  const subscribeToNewsletter = async (email: string, additionalData?: Record<string, any>) => {
    return fetchFromStrapi('/newsletter-subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  // Contact form submission
  const submitContactForm = async (data: {
    name: string
    email: string
    subject?: string
    message: string
    company?: string
    phone?: string
  }) => {
    return fetchFromStrapi('/contact-submissions', {
      method: 'POST'
    })
  }

  // Simple fetchArticles method for compatibility with strapi-test page
  const fetchArticles = async () => {
    try {
      const response = await getArticles()
      return response?.data || []
    } catch (error) {
      console.warn('Strapi API not available, using mock data:', error)
      // Fallback to mock data when Strapi is not available
      return await fetchMockArticles()
    }
  }

  // News functions
  const getNews = async (options?: {
    populate?: string[]
    filters?: Record<string, any>
    sort?: string[]
    pagination?: { page?: number; pageSize?: number }
    locale?: string
  }) => {
    const query: Record<string, any> = {
      sort: ['publishedAt:desc'] // Default to newest first
    }
    
    if (options?.populate) {
      query['populate'] = options.populate.join(',')
    }
    
    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query[`filters[${key}]`] = value
      })
    }
    
    if (options?.sort) {
      query['sort'] = options.sort.join(',')
    }
    
    if (options?.pagination) {
      if (options.pagination.page) query['pagination[page]'] = options.pagination.page
      if (options.pagination.pageSize) query['pagination[pageSize]'] = options.pagination.pageSize
    }
    
    if (options?.locale) {
      query['locale'] = options.locale
    }

    const response = await fetchFromStrapi('/nnews', { query })
    // Handle both Strapi v4 (response.data) and v5 (response.data) formats
    return response?.data || response || []
  }

  const getNewsArticle = async (slug: string, populate: string[] = []) => {
    const query: Record<string, any> = {
      'filters[slug][$eq]': slug
    }
    
    if (populate.length) {
      query['populate'] = populate.join(',')
    }

    const response = await fetchFromStrapi('/nnews', { query })
    return response?.data?.[0] || null
  }

  return {
    // Core API function
    fetchFromStrapi,
    
    // Simple compatibility method
    fetchArticles,
    
    // Content fetchers
    getArticles,
    getArticle,
    getNews,
    getNewsArticle,
    getPage,
    getGlobalSettings,
    getHomepageContent,
    getTeamMembers,
    getTestimonials,
    getFaqs,
    getFeatures,
    getPricingPlans,
    
    // Form submissions
    subscribeToNewsletter,
    submitContactForm
  }
}
