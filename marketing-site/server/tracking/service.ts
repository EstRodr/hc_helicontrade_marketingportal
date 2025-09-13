import type { TrackingProvider, TrackingEvent, TrackingConfig } from './types'
import { GoogleAnalyticsProvider } from './providers/google-analytics'
import { PostHogProvider } from './providers/posthog'

/**
 * Unified tracking service that manages multiple providers
 */
export class TrackingService {
  private providers: Map<string, TrackingProvider> = new Map()
  private eventQueue: TrackingEvent[] = []
  private isProcessing: boolean = false
  private readonly config: TrackingConfig
  private initialized: boolean = false
  private maxRetries: number
  private batchSize: number
  private debug: boolean

  constructor(config: TrackingConfig) {
    this.config = config
    this.maxRetries = config.options?.maxRetries || 3
    this.batchSize = config.options?.batchSize || 10
    this.debug = config.options?.debug || false
  }

  /**
   * Initialize the tracking service and providers
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      return
    }

    if (!this.config.enabled) {
      console.warn('Tracking is disabled')
      return
    }

    try {
      // Initialize Google Analytics if configured
      if (this.config.googleAnalytics) {
        const ga4Provider = new GoogleAnalyticsProvider(this.config.googleAnalytics)
        await ga4Provider.initialize()
        this.providers.set(ga4Provider.name, ga4Provider)
      }

      // Initialize PostHog if configured
      if (this.config.postHog) {
        const postHogProvider = new PostHogProvider(this.config.postHog)
        await postHogProvider.initialize()
        this.providers.set(postHogProvider.name, postHogProvider)
      }

      this.initialized = true
      
      // Start processing any queued events
      this.processEventQueue()
    } catch (error) {
      console.error('Failed to initialize tracking service:', error)
      throw error
    }
  }

  /**
   * Track an event across all providers
   */
  public async track(event: TrackingEvent): Promise<void> {
    if (!this.config.enabled) {
      return
    }

    // Add event to queue
    this.eventQueue.push(event)

    // Log event in debug mode
    if (this.debug) {
      console.debug('Queued tracking event:', {
        eventName: event.eventName,
        userId: event.userId,
        properties: event.properties
      })
    }

    // Process queue if not already processing
    if (!this.isProcessing) {
      await this.processEventQueue()
    }
  }

  /**
   * Identify a user across all providers
   */
  public async identify(userId: string, traits?: Record<string, any>): Promise<void> {
    if (!this.config.enabled || !this.initialized) {
      return
    }

    const promises = Array.from(this.providers.values()).map(provider =>
      provider.identify(userId, traits).catch(error => {
        console.error(`Failed to identify user in ${provider.name}:`, error)
      })
    )

    await Promise.all(promises)
  }

  /**
   * Reset all providers
   */
  public async reset(): Promise<void> {
    const promises = Array.from(this.providers.values()).map(provider =>
      provider.reset().catch(error => {
        console.error(`Failed to reset ${provider.name}:`, error)
      })
    )

    await Promise.all(promises)
    this.providers.clear()
    this.initialized = false
  }

  /**
   * Process queued events
   */
  private async processEventQueue(): Promise<void> {
    if (this.isProcessing || !this.initialized) {
      return
    }

    this.isProcessing = true

    try {
      while (this.eventQueue.length > 0) {
        // Get batch of events to process
        const batch = this.eventQueue.splice(0, this.batchSize)
        
        // Process each event in the batch
        const promises = batch.map(event => this.processEvent(event))
        
        // Wait for batch to complete
        await Promise.all(promises)
      }
    } finally {
      this.isProcessing = false
    }
  }

  /**
   * Process a single event with retries
   */
  private async processEvent(event: TrackingEvent, attempt: number = 1): Promise<void> {
    try {
      const promises = Array.from(this.providers.values()).map(provider =>
        provider.track(event).catch(error => {
          console.error(`Failed to track event in ${provider.name}:`, error)
          throw error
        })
      )

      await Promise.all(promises)
    } catch (error) {
      if (attempt < this.maxRetries) {
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000)
        await new Promise(resolve => setTimeout(resolve, delay))
        
        // Retry
        await this.processEvent(event, attempt + 1)
      } else {
        console.error('Failed to process event after retries:', {
          event,
          error
        })
      }
    }
  }
}
