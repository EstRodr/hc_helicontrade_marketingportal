# HeliconTrade Analytics & Tracking Guide

This guide covers the analytics and tracking implementation for HeliconTrade's marketing site. We use a combination of client-side and server-side tracking to provide comprehensive analytics while respecting user privacy.

## Overview

The tracking system combines:
- Google Analytics 4 (GA4) for general analytics
- Google Tag Manager (GTM) for tag management
- PostHog for product analytics and feature flags

## Environment Variables

### Required Variables

```bash
# Google Analytics
NUXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # GA4 Measurement ID
NUXT_GA_API_SECRET=XXXXXXXXXX               # GA4 API Secret (server-side)

# Google Tag Manager
NUXT_PUBLIC_GTM_ID=GTM-XXXXXXXXXX          # GTM Container ID

# PostHog
NUXT_PUBLIC_POSTHOG_PUBLIC_KEY=phc_XXXX    # PostHog Project API Key
NUXT_PUBLIC_POSTHOG_HOST=https://...        # PostHog Instance Host
```

### Optional Variables

```bash
# Tracking Configuration
NUXT_TRACKING_ENABLED=true                  # Enable/disable all tracking (default: true)
NUXT_TRACKING_DEBUG=false                   # Enable debug logging (default: false)
NUXT_TRACKING_BATCH_SIZE=10                 # Event batch size (default: 10)
NUXT_TRACKING_MAX_RETRIES=3                 # Max retry attempts (default: 3)

# PostHog Options
NUXT_PUBLIC_POSTHOG_RECORDING=false         # Enable session recording (default: false)
NUXT_PUBLIC_TRACKING_FEATURE_FLAGS=true     # Enable feature flags (default: false)
```

## Event Types

### Page Views
```typescript
{
  eventName: 'page_view',
  properties: {
    path: string
    title?: string
    referrer?: string
    utm?: {
      source?: string
      medium?: string
      campaign?: string
      term?: string
      content?: string
    }
  }
}
```

### Symbol Interactions
```typescript
{
  eventName: 'symbol_interaction',
  properties: {
    symbol: string
    interactionType: 'search' | 'view' | 'select' | 'analyze'
    searchQuery?: string
    resultCount?: number
    durationMs?: number
  }
}
```

### Error Events
```typescript
{
  eventName: 'error',
  properties: {
    errorType: string
    message: string
    stack?: string
    statusCode?: number
    location?: string
  }
}
```

### Performance Events
```typescript
{
  eventName: 'performance',
  properties: {
    metric: string
    value: number
    unit: 'ms' | 'bytes' | 'count'
    navigationType?: 'navigate' | 'reload' | 'back_forward' | 'prerender'
  }
}
```

## Usage Examples

### Tracking Page Views (Server-Side)
Page views are automatically tracked by the server middleware for all non-asset requests.

### Tracking Symbol Interactions (Client-Side)
```typescript
const { trackSymbolSearch, trackSymbolSelect } = useGTM()

// Track symbol search
trackSymbolSearch('AAPL', 5)  // Search term and result count

// Track symbol selection
trackSymbolSelect('AAPL', 'popular')  // Symbol and source
```

### Tracking Errors (Both)
Server-side errors are automatically tracked. For client-side:

```typescript
const { trackError } = useGTM()

try {
  // Some operation
} catch (error) {
  trackError('API Error', error.message)
}
```

## Development

### Debug Mode
Set `NUXT_TRACKING_DEBUG=true` to enable:
- Detailed console logging
- GA4 validation messages
- Event queue monitoring

### Testing
Mock tracking services are available for testing:
```typescript
import { MockTrackingProvider } from '~/server/tracking/testing'
```

### Local Development
1. Create `.env` file with required variables
2. Set debug mode: `NUXT_TRACKING_DEBUG=true`
3. (Optional) Disable tracking: `NUXT_TRACKING_ENABLED=false`

## Production Safeguards

The tracking system includes several safeguards:
- Event batching to reduce API calls
- Exponential backoff for retries
- Error isolation (tracking errors don't affect app)
- Stack trace redaction in production
- Asset request filtering
- Queue size limits

## Best Practices

1. **Use Semantic Event Names**
   - Good: `symbol_search`, `trade_execute`
   - Bad: `button_click`, `page_2_view`

2. **Include Relevant Context**
   - Add source/location for interactions
   - Include result counts for searches
   - Add duration for timed operations

3. **Handle Errors Gracefully**
   - Track errors but don't block user flow
   - Include enough context to debug
   - Sanitize sensitive information

4. **Respect User Privacy**
   - Honor do-not-track settings
   - Don't track PII or sensitive data
   - Use appropriate anonymization

5. **Performance Considerations**
   - Use batching for high-volume events
   - Don't block rendering on tracking
   - Cache tracking check results

## Support

For issues or questions:
1. Check debug logs (`NUXT_TRACKING_DEBUG=true`)
2. Review tracked events in GA4/PostHog
3. Contact #dev-analytics on Slack
