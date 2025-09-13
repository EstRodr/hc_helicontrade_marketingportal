/**
 * Core tracking types for server-side analytics
 */

/**
 * Common properties shared by all tracking events
 */
export interface BaseTrackingEvent {
  /** Unique event ID */
  eventId: string
  /** Event timestamp in ISO format */
  timestamp: string
  /** Event name/type */
  eventName: string
  /** User identifier */
  userId?: string
  /** Session identifier */
  sessionId?: string
  /** Source of the event */
  source: 'web' | 'api' | 'system'
  /** Additional properties */
  properties?: Record<string, any>
}

/**
 * Page view tracking event
 */
export interface PageViewEvent extends BaseTrackingEvent {
  eventName: 'page_view'
  properties: {
    /** Page path */
    path: string
    /** Page title */
    title?: string
    /** Referrer */
    referrer?: string
    /** UTM parameters */
    utm?: {
      source?: string
      medium?: string
      campaign?: string
      term?: string
      content?: string
    }
  }
}

/**
 * Symbol interaction tracking event
 */
export interface SymbolEvent extends BaseTrackingEvent {
  eventName: 'symbol_interaction'
  properties: {
    /** Symbol identifier */
    symbol: string
    /** Type of interaction */
    interactionType: 'search' | 'view' | 'select' | 'analyze'
    /** Search query if applicable */
    searchQuery?: string
    /** Number of results if applicable */
    resultCount?: number
    /** Time spent in milliseconds */
    durationMs?: number
  }
}

/**
 * Error tracking event
 */
export interface ErrorEvent extends BaseTrackingEvent {
  eventName: 'error'
  properties: {
    /** Error type/name */
    errorType: string
    /** Error message */
    message: string
    /** Error stack trace */
    stack?: string
    /** HTTP status code if applicable */
    statusCode?: number
    /** Page/component where error occurred */
    location?: string
  }
}

/**
 * Performance tracking event
 */
export interface PerformanceEvent extends BaseTrackingEvent {
  eventName: 'performance'
  properties: {
    /** Metric name */
    metric: string
    /** Metric value */
    value: number
    /** Metric unit */
    unit: 'ms' | 'bytes' | 'count'
    /** Navigation type if applicable */
    navigationType?: 'navigate' | 'reload' | 'back_forward' | 'prerender'
  }
}

/** Union type of all tracking events */
export type TrackingEvent = 
  | PageViewEvent 
  | SymbolEvent 
  | ErrorEvent 
  | PerformanceEvent

/**
 * Tracking provider interface that must be implemented by each analytics service
 */
export interface TrackingProvider {
  /** Provider name */
  readonly name: string
  
  /** Initialize the tracking provider */
  initialize(): Promise<void>
  
  /** Track an event */
  track(event: TrackingEvent): Promise<void>
  
  /** Identify a user */
  identify(userId: string, traits?: Record<string, any>): Promise<void>
  
  /** Reset tracking state */
  reset(): Promise<void>
}

/**
 * Configuration for tracking providers
 */
export interface TrackingConfig {
  /** Whether tracking is enabled */
  enabled: boolean
  
  /** Google Analytics configuration */
  googleAnalytics?: {
    /** Measurement ID */
    measurementId: string
    /** API secret */
    apiSecret: string
    /** Whether to use debug mode */
    debug?: boolean
  }
  
  /** PostHog configuration */
  postHog?: {
    /** Project API key */
    apiKey: string
    /** API host */
    host: string
    /** Whether to enable feature flags */
    enableFeatureFlags?: boolean
  }
  
  /** General configuration */
  options?: {
    /** Maximum events to batch */
    batchSize?: number
    /** Maximum retry attempts */
    maxRetries?: number
    /** Whether to enable debug logging */
    debug?: boolean
  }
}
