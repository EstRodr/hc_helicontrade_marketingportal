/**
 * GTM (Google Tag Manager) composable for tracking events
 */
export const useGTM = () => {
  const config = useRuntimeConfig()
  const gtmId = config.public.gtmId

  /**
   * Check if GTM is available
   */
  const isGTMAvailable = () => {
    return typeof window !== 'undefined' && window.gtag && gtmId
  }

  /**
   * Track a custom event
   */
  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (!isGTMAvailable()) {
      console.warn('GTM is not available')
      return
    }

    try {
      window.gtag('event', eventName, {
        ...parameters,
        // Add default parameters
        event_category: parameters.event_category || 'engagement',
        event_label: parameters.event_label || '',
        value: parameters.value || 0
      })

      // Development logging
      if (process.dev) {
        console.log('GTM Event Tracked:', eventName, parameters)
      }
    } catch (error) {
      console.error('Error tracking GTM event:', error)
    }
  }

  /**
   * Track page views
   */
  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (!isGTMAvailable()) {
      console.warn('GTM is not available')
      return
    }

    try {
      window.gtag('config', gtmId, {
        page_path: pagePath,
        page_title: pageTitle || document.title,
        page_location: window.location.href
      })

      if (process.dev) {
        console.log('GTM Page View Tracked:', pagePath, pageTitle)
      }
    } catch (error) {
      console.error('Error tracking GTM page view:', error)
    }
  }

  /**
   * Track symbol search events
   */
  const trackSymbolSearch = (searchTerm: string, resultCount?: number) => {
    trackEvent('symbol_search', {
      event_category: 'symbol_interaction',
      event_label: searchTerm,
      search_term: searchTerm,
      result_count: resultCount || 0,
      value: searchTerm.length
    })
  }

  /**
   * Track symbol selection events
   */
  const trackSymbolSelect = (symbol: string, source: 'search' | 'popular' | 'suggested' = 'search') => {
    trackEvent('symbol_select', {
      event_category: 'symbol_interaction',
      event_label: symbol,
      symbol: symbol,
      selection_source: source,
      value: 1
    })
  }

  /**
   * Track navigation events
   */
  const trackNavigation = (destination: string, source: string = 'navigation') => {
    trackEvent('navigation_click', {
      event_category: 'navigation',
      event_label: destination,
      destination: destination,
      source: source,
      value: 1
    })
  }

  /**
   * Track button clicks
   */
  const trackButtonClick = (buttonName: string, location: string = 'unknown') => {
    trackEvent('button_click', {
      event_category: 'engagement',
      event_label: buttonName,
      button_name: buttonName,
      button_location: location,
      value: 1
    })
  }

  /**
   * Track form submissions
   */
  const trackFormSubmit = (formName: string, success: boolean = true) => {
    trackEvent('form_submit', {
      event_category: 'form_interaction',
      event_label: formName,
      form_name: formName,
      form_success: success,
      value: success ? 1 : 0
    })
  }

  /**
   * Track errors
   */
  const trackError = (errorType: string, errorMessage: string, errorPage?: string) => {
    trackEvent('error_occurred', {
      event_category: 'error',
      event_label: errorType,
      error_type: errorType,
      error_message: errorMessage,
      error_page: errorPage || window.location.pathname,
      value: 0
    })
  }

  /**
   * Track user engagement time
   */
  const trackEngagementTime = (timeInSeconds: number, page?: string) => {
    trackEvent('engagement_time', {
      event_category: 'engagement',
      event_label: 'time_on_page',
      engagement_time_msec: timeInSeconds * 1000,
      page: page || window.location.pathname,
      value: Math.round(timeInSeconds)
    })
  }

  return {
    isGTMAvailable,
    trackEvent,
    trackPageView,
    trackSymbolSearch,
    trackSymbolSelect,
    trackNavigation,
    trackButtonClick,
    trackFormSubmit,
    trackError,
    trackEngagementTime
  }
}
