// Strapi CMS composable for content management
export const useStrapi = () => {
  const config = useRuntimeConfig()
  const strapiUrl = config.public.strapiUrl
  const strapiToken = config.public.strapiToken

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
        headers: requestHeaders
      })

      return response
    } catch (error) {
      console.error(`Strapi API error for ${endpoint}:`, error)
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

  // Homepage content
  const getHomepageContent = async () => {
    return fetchFromStrapi('/homepage', {
      query: {
        populate: 'deep'
      }
    })
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
  const getFeatures = async () => {
    return fetchFromStrapi('/features', {
      query: {
        populate: ['icon'],
        sort: ['order:asc']
      }
    })
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

  return {
    // Core API function
    fetchFromStrapi,
    
    // Content fetchers
    getArticles,
    getArticle,
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
