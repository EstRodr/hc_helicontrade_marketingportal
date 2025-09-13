import { PostHog } from 'posthog-node'
import type { TrackingProvider, TrackingEvent, TrackingConfig } from '../types'

/**
 * PostHog Server-Side Implementation
 */
export class PostHogProvider implements TrackingProvider {
  public readonly name = 'posthog'
  
  private client: PostHog | null = null
  private config: TrackingConfig['postHog']
  private initialized: boolean = false

  constructor(config: TrackingConfig['postHog']) {
    if (!config) {
      throw new Error('PostHog configuration is required')
    }
    this.config = config
  }

  /**
   * Initialize the PostHog client
   */
  public async initialize(): Promise<void> {
    if (!this.config.apiKey || !this.config.host) {
      throw new Error('Invalid PostHog configuration')
    }

    this.client = new PostHog(this.config.apiKey, {
      host: this.config.host,
      flushAt: 1, // Immediate flush for server-side
      flushInterval: 0
    })

    this.initialized = true
  }

  /**
   * Track an event using PostHog
   */
  public async track(event: TrackingEvent): Promise<void> {
    if (!this.initialized || !this.client) {
      throw new Error('PostHog provider not initialized')
    }

    const phEvent = this.mapToPostHogEvent(event)
    
    try {
      await this.client.capture({
        distinctId: event.userId || event.sessionId || 'anonymous',
        event: phEvent.name,
        properties: phEvent.properties,
        timestamp: new Date(event.timestamp)
      })
    } catch (error) {
      console.error('Failed to send event to PostHog:', error)
      throw error
    }
  }

  /**
   * Identify a user in PostHog
   */
  public async identify(userId: string, traits?: Record<string, any>): Promise<void> {
    if (!this.initialized || !this.client) {
      throw new Error('PostHog provider not initialized')
    }

    try {
      await this.client.identify({
        distinctId: userId,
        properties: traits
      })
    } catch (error) {
      console.error('Failed to identify user in PostHog:', error)
      throw error
    }
  }

  /**
   * Reset tracking state
   */
  public async reset(): Promise<void> {
    if (this.client) {
      await this.client.shutdown()
      this.client = null
      this.initialized = false
    }
  }

  /**
   * Map internal event format to PostHog event format
   */
  private mapToPostHogEvent(event: TrackingEvent): { name: string; properties: any } {
    // Common properties for all events
    const baseProperties = {
      distinct_id: event.userId || event.sessionId || 'anonymous',
      session_id: event.sessionId,
      source: event.source,
      event_id: event.eventId
    }

    switch (event.eventName) {
      case 'page_view':
        return {
          name: '$pageview',
          properties: {
            ...baseProperties,
            $current_url: event.properties.path,
            $referrer: event.properties.referrer,
            title: event.properties.title,
            ...this.mapUtmParams(event.properties.utm)
          }
        }

      case 'symbol_interaction':
        return {
          name: 'Symbol Interaction',
          properties: {
            ...baseProperties,
            symbol: event.properties.symbol,
            interaction_type: event.properties.interactionType,
            search_query: event.properties.searchQuery,
            result_count: event.properties.resultCount,
            duration_ms: event.properties.durationMs
          }
        }

      case 'error':
        return {
          name: '$exception',
          properties: {
            ...baseProperties,
            $exception_message: event.properties.message,
            $exception_type: event.properties.errorType,
            $exception_stack_trace: event.properties.stack,
            status_code: event.properties.statusCode,
            location: event.properties.location
          }
        }

      case 'performance':
        return {
          name: 'Performance Metric',
          properties: {
            ...baseProperties,
            metric_name: event.properties.metric,
            value: event.properties.value,
            unit: event.properties.unit,
            navigation_type: event.properties.navigationType
          }
        }

      default:
        // Generic event mapping
        return {
          name: event.eventName,
          properties: {
            ...baseProperties,
            ...event.properties
          }
        }
    }
  }

  /**
   * Map UTM parameters to PostHog format
   */
  private mapUtmParams(utm?: Record<string, string>): Record<string, string> {
    if (!utm) return {}

    return {
      utm_source: utm.source,
      utm_medium: utm.medium,
      utm_campaign: utm.campaign,
      utm_term: utm.term,
      utm_content: utm.content
    }
  }
}
