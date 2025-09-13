import { defineEventHandler, getRequestHeaders, getRequestURL } from 'h3'
import { TrackingService } from '../tracking/service'
import type { TrackingConfig } from '../tracking/types'

let trackingService: TrackingService | null = null

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // Initialize tracking service if not already initialized
  if (!trackingService) {
    const trackingConfig: TrackingConfig = {
      enabled: true,
      googleAnalytics: {
        measurementId: config.public.gaMeasurementId,
        apiSecret: config.gaApiSecret,
        debug: process.dev
      },
      postHog: {
        apiKey: config.public.posthogPublicKey,
        host: config.public.posthogHost,
        enableFeatureFlags: true
      },
      options: {
        batchSize: 10,
        maxRetries: 3,
        debug: process.dev
      }
    }

    trackingService = new TrackingService(trackingConfig)
    await trackingService.initialize()
  }

  // Skip tracking for assets and API routes
  const url = getRequestURL(event)
  if (url.pathname.startsWith('/_nuxt/') || url.pathname.startsWith('/api/')) {
    return
  }

  const startTime = Date.now()
  const headers = getRequestHeaders(event)
  const userAgent = headers['user-agent']
  const referrer = headers['referer'] || ''
  const sessionId = headers['x-session-id'] || crypto.randomUUID()
  const userId = headers['x-user-id']

  try {
    // Track page view
    await trackingService.track({
      eventId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      eventName: 'page_view',
      sessionId,
      userId,
      source: 'web',
      properties: {
        path: url.pathname,
        referrer,
        userAgent,
        host: url.host,
        protocol: url.protocol,
        query: Object.fromEntries(url.searchParams),
        utm: extractUtmParams(url.searchParams)
      }
    })

    // Handle response
    const response = await event.handle()
    
    // Track response metrics
    const duration = Date.now() - startTime
    await trackingService.track({
      eventId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      eventName: 'performance',
      sessionId,
      userId,
      source: 'system',
      properties: {
        metric: 'server_response_time',
        value: duration,
        unit: 'ms',
        status: response.status
      }
    })

    return response
  } catch (error) {
    // Track error
    await trackingService.track({
      eventId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      eventName: 'error',
      sessionId,
      userId,
      source: 'system',
      properties: {
        errorType: error.name,
        message: error.message,
        stack: process.dev ? error.stack : undefined,
        path: url.pathname
      }
    })

    throw error
  }
})

/**
 * Extract UTM parameters from URL search params
 */
function extractUtmParams(searchParams: URLSearchParams): Record<string, string> {
  const utmParams: Record<string, string> = {}
  
  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith('utm_')) {
      utmParams[key.replace('utm_', '')] = value
    }
  }
  
  return utmParams
}
