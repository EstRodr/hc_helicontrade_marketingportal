# PostHog Setup for A/B Testing

## Feature Flags to Create in PostHog

### 1. Personalization Variant
**Flag Key:** `personalization-variant`
**Type:** String
**Values:** `"0"`, `"1"`, `"2"`, `"3"`, `"4"`

**Rollout Strategy:**
- 20% get variant "0" (Global Insight)
- 20% get variant "1" (AI Eyes) 
- 20% get variant "2" (Your Edge)
- 20% get variant "3" (Redefined Intelligence)
- 20% get variant "4" (Global AI Power)

### 2. Enable Personalization
**Flag Key:** `enable-personalization`
**Type:** Boolean
**Default:** `true`

**Use Case:** Kill switch to disable all personalization

### 3. Smooth Transitions
**Flag Key:** `smooth-transitions`
**Type:** Boolean
**Default:** `true`

**Use Case:** Control transition animations

## Events to Track

### Personalization Events
```javascript
// Variant assignment
posthog.capture('personalization_variant_assigned', {
  variant: 2,
  source: 'posthog',
  country: 'Sweden',
  market_session: 'market-open'
})

// Content view
posthog.capture('personalized_content_viewed', {
  variant: 2,
  headline: 'Your edge in Sweden\'s markets',
  time_to_show: 2000 // milliseconds
})

// CTA interaction
posthog.capture('personalized_cta_clicked', {
  variant: 2,
  cta_text: 'Start Trading',
  position: 'hero'
})
```

### Conversion Events
```javascript
// User engagement
posthog.capture('hero_engagement', {
  variant: 2,
  action: 'scroll_past_fold',
  time_on_page: 15000
})

// Sign up conversion
posthog.capture('signup_conversion', {
  variant: 2,
  source: 'personalized_hero',
  conversion_time: 45000
})
```

## User Properties

Set these properties for better targeting:

```javascript
posthog.identify(user_id, {
  // Geographic
  country: 'Sweden',
  city: 'Stockholm',
  timezone: 'Europe/Stockholm',
  
  // Market Interest
  primary_market: 'OMXS30',
  trading_experience: 'intermediate',
  preferred_session: 'market-open',
  
  // Engagement
  visit_count: 5,
  last_visit: '2024-01-15',
  engagement_level: 'engaged',
  
  // Personalization
  personalization_enabled: true,
  preferred_variant: 2
})
```

## Cohorts for Targeting

### Geographic Cohorts
- **Nordic Users:** Country = Sweden, Norway, Denmark, Finland
- **European Users:** Continent = Europe
- **US Users:** Country = United States

### Behavioral Cohorts
- **New Visitors:** Visit count = 1
- **Engaged Users:** Visit count >= 3 AND time on site > 60s
- **Returning Users:** Visit count >= 5

### Market Interest Cohorts
- **Pre-market Traders:** Most active during pre-market hours
- **Day Traders:** Most active during market hours
- **After-hours Traders:** Most active during after-hours

## A/B Test Setup

### Test 1: Headline Variants
**Hypothesis:** Different headline styles will have different conversion rates

**Variants:**
- Control (0): "Global insight, built for Sweden markets"
- Variant A (1): "AI eyes on Sweden markets — opportunity never sleeps"
- Variant B (2): "Your edge in Sweden's markets"

**Success Metrics:**
- Primary: Sign-up conversion rate
- Secondary: Time on page, scroll depth, CTA clicks

**Duration:** 2 weeks minimum
**Sample Size:** 1000+ users per variant

### Test 2: Market Session Targeting
**Hypothesis:** Different messages work better for different market sessions

**Setup:**
- Pre-market: Always show variant 1 (AI Eyes)
- Market hours: A/B test variants 0, 2, 3
- After-hours: Always show variant 2 (Your Edge)

## Analytics Dashboard

Create a PostHog dashboard with:

1. **Variant Performance**
   - Conversion rate by variant
   - Time to conversion
   - Bounce rate by variant

2. **Geographic Performance**
   - Conversion rate by country
   - Preferred variants by region
   - Market session activity

3. **Engagement Metrics**
   - Time on page by variant
   - Scroll depth by variant
   - CTA click rate by variant

## Integration Code

The marketing site automatically integrates with PostHog:

```typescript
// Automatic variant assignment
const variant = posthog.getFeatureFlag('personalization-variant')

// Automatic event tracking
posthog.capture('personalization_variant_assigned', {
  variant,
  source: 'posthog'
})
```

## Rollout Strategy

### Phase 1: Testing (Week 1-2)
- 10% of traffic gets A/B test
- Monitor for any issues
- Collect baseline metrics

### Phase 2: Expansion (Week 3-4)
- 50% of traffic gets A/B test
- Analyze preliminary results
- Adjust variants if needed

### Phase 3: Full Rollout (Week 5+)
- 100% of traffic gets personalization
- Winner variant gets higher allocation
- Continue optimizing based on data
