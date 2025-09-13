import type { TrackingProvider, TrackingEvent } from './types'

/**
 * Mock tracking provider for testing
 */
export class MockTrackingProvider implements TrackingProvider {
  public readonly name = 'mock-provider'
  
  private events: TrackingEvent[] = []
  private users: Map<string, Record<string, any>> = new Map()
  private initialized: boolean = false
  private shouldFail: boolean = false
  private failureRate: number = 0
  private latency: number = 0

  constructor(options?: {
    shouldFail?: boolean
    failureRate?: number
    latency?: number
  }) {
    this.shouldFail = options?.shouldFail || false
    this.failureRate = options?.failureRate || 0
    this.latency = options?.latency || 0
  }

  /**
   * Initialize the mock provider
   */
  public async initialize(): Promise<void> {
    if (this.shouldFail) {
      throw new Error('Mock provider initialization failed')
    }
    this.initialized = true
  }

  /**
   * Track a mock event
   */
  public async track(event: TrackingEvent): Promise<void> {
    if (!this.initialized) {
      throw new Error('Mock provider not initialized')
    }

    // Simulate network latency
    if (this.latency > 0) {
      await new Promise(resolve => setTimeout(resolve, this.latency))
    }

    // Simulate random failures
    if (this.failureRate > 0 && Math.random() < this.failureRate) {
      throw new Error('Mock tracking failed')
    }

    this.events.push(event)
  }

  /**
   * Identify a mock user
   */
  public async identify(userId: string, traits?: Record<string, any>): Promise<void> {
    if (!this.initialized) {
      throw new Error('Mock provider not initialized')
    }

    // Simulate network latency
    if (this.latency > 0) {
      await new Promise(resolve => setTimeout(resolve, this.latency))
    }

    // Simulate random failures
    if (this.failureRate > 0 && Math.random() < this.failureRate) {
      throw new Error('Mock identify failed')
    }

    this.users.set(userId, traits || {})
  }

  /**
   * Reset the mock provider
   */
  public async reset(): Promise<void> {
    this.events = []
    this.users.clear()
    this.initialized = false
  }

  /**
   * Get all tracked events
   */
  public getEvents(): TrackingEvent[] {
    return [...this.events]
  }

  /**
   * Get events by type
   */
  public getEventsByType(eventName: string): TrackingEvent[] {
    return this.events.filter(event => event.eventName === eventName)
  }

  /**
   * Get events by user
   */
  public getEventsByUser(userId: string): TrackingEvent[] {
    return this.events.filter(event => event.userId === userId)
  }

  /**
   * Get identified user traits
   */
  public getUserTraits(userId: string): Record<string, any> | undefined {
    return this.users.get(userId)
  }

  /**
   * Get all identified users
   */
  public getIdentifiedUsers(): string[] {
    return Array.from(this.users.keys())
  }

  /**
   * Clear all tracked events
   */
  public clearEvents(): void {
    this.events = []
  }

  /**
   * Clear all identified users
   */
  public clearUsers(): void {
    this.users.clear()
  }

  /**
   * Configure mock behavior
   */
  public configure(options: {
    shouldFail?: boolean
    failureRate?: number
    latency?: number
  }): void {
    this.shouldFail = options.shouldFail ?? this.shouldFail
    this.failureRate = options.failureRate ?? this.failureRate
    this.latency = options.latency ?? this.latency
  }
}
