import type { TrackingProvider, TrackingEvent, TrackingConfig } from '../types'

/**
 * Google Analytics 4 Server-Side Implementation
 * Using GA4 Measurement Protocol
 */
export class GoogleAnalyticsProvider implements TrackingProvider {
  public readonly name = 'google-analytics'
  
  private measurementId: string
  private apiSecret: string
  private debug: boolean
  private initialized: boolean = false
  private baseUrl = 'https://www.google-analytics.com'

  constructor(config: TrackingConfig['googleAnalytics']) {
    if (!config) {
      throw new Error('Google Analytics configuration is required')
    }
    
    this.measurementId = config.measurementId
    this.apiSecret = config.apiSecret
    this.debug = config.debug || false
  }

  /**
   * Initialize the GA4 provider
   */
  public async initialize(): Promise<void> {
    // Validate configuration
    if (!this.measurementId || !this.apiSecret) {
      throw new Error('Invalid Google Analytics configuration')
    }

    // Set up validation endpoint for debug mode
    if (this.debug) {
      this.baseUrl = 'https://www.google-analytics.com/debug'
    }

    this.initialized = true
  }

  /**
   * Track an event using GA4 Measurement Protocol
   */
  public async track(event: TrackingEvent): Promise<void> {
    if (!this.initialized) {
      throw new Error('Google Analytics provider not initialized')
    }

    const ga4Event = this.mapToGA4Event(event)
    
    try {
      const response = await fetch(`${this.baseUrl}/mp/collect?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ga4Event),
      })

      if (!response.ok) {
        throw new Error(`GA4 tracking failed: ${response.statusText}`)
      }

      // Handle validation response in debug mode
      if (this.debug) {
        const validation = await response.json()
        if (validation.validationMessages?.length > 0) {
          console.warn('GA4 validation messages:', validation.validationMessages)
        }
      }
    } catch (error) {
      console.error('Failed to send event to GA4:', error)
      throw error
    }
  }

  /**
   * Identify a user in GA4
   */
  public async identify(userId: string, traits?: Record<string, any>): Promise<void> {
    await this.track({
      eventId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      eventName: 'user_identify',
      userId,
      source: 'system',
      properties: {
        user_id: userId,
        ...traits,
      },
    })
  }

  /**
   * Reset tracking state
   */
  public async reset(): Promise<void> {
    // GA4 doesn't require explicit reset
    return
  }

  /**
   * Map internal event format to GA4 event format
   */
  private mapToGA4Event(event: TrackingEvent): any {
    const baseEvent = {
      client_id: event.sessionId || 'anonymous',
      user_id: event.userId,
      timestamp_micros: new Date(event.timestamp).getTime() * 1000,
      non_personalized_ads: false,
    }

    switch (event.eventName) {
      case 'page_view':
        return {
          ...baseEvent,
          events: [{
            name: 'page_view',
            params: {
              page_location: event.properties.path,
              page_title: event.properties.title,
              page_referrer: event.properties.referrer,
              ...event.properties.utm,
            },
          }],
        }

      case 'symbol_interaction':
        return {
          ...baseEvent,
          events: [{
            name: 'symbol_interaction',
            params: {
              symbol: event.properties.symbol,
              interaction_type: event.properties.interactionType,
              search_term: event.properties.searchQuery,
              result_count: event.properties.resultCount,
              duration: event.properties.durationMs,
            },
          }],
        }

      case 'error':
        return {
          ...baseEvent,
          events: [{
            name: 'exception',
            params: {
              error_type: event.properties.errorType,
              error_message: event.properties.message,
              error_location: event.properties.location,
              status_code: event.properties.statusCode,
            },
          }],
        }

      case 'performance':
        return {
          ...baseEvent,
          events: [{
            name: 'performance_metric',
            params: {
              metric_name: event.properties.metric,
              metric_value: event.properties.value,
              metric_unit: event.properties.unit,
              navigation_type: event.properties.navigationType,
            },
          }],
        }

      default:
        // Generic event mapping
        return {
          ...baseEvent,
          events: [{
            name: event.eventName,
            params: event.properties,
          }],
        }
    }
  }
}
