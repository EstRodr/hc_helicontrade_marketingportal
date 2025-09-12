# Analytics & CMS Integration

This document outlines the analytics and content management system integration for the HeliconTrade marketing site.

## 🔍 Analytics Stack

### Google Analytics 4 (GA4)
- **Purpose**: Web analytics, conversion tracking, audience insights
- **Implementation**: Custom plugin with consent management
- **Privacy**: GDPR compliant with user consent

### PostHog
- **Purpose**: Product analytics, feature flags, A/B testing, session recordings
- **Implementation**: Dynamic import to avoid build conflicts
- **Privacy**: Respects user consent and Do Not Track

## 🍪 Cookie Consent & GDPR Compliance

### Cookie Consent Banner
- **Component**: `CookieConsent.vue`
- **Features**: 
  - Granular consent (necessary, analytics, marketing, functional)
  - Persistent storage of user preferences
  - Customizable preferences panel
  - Links to Privacy and Cookie policies

### Privacy Features
- **IP Anonymization**: Enabled for GA4
- **Do Not Track**: Respected by PostHog
- **Consent-based Loading**: Analytics only load after user consent
- **Data Retention**: Configurable per platform

## 📊 Analytics Usage

### Basic Tracking
```typescript
const { track } = useAnalytics()

// Track custom events
track.ctaClick('Get Started', 'homepage-hero')
track.registrationStart()
track.newsletterSubscribe('footer')
```

### Advanced Tracking
```typescript
const { trackEvent, identifyUser } = useAnalytics()

// Custom event with properties
trackEvent('feature_used', {
  feature_name: 'trading_simulator',
  user_type: 'free_tier'
})

// User identification
identifyUser('user_123', {
  plan: 'professional',
  signup_date: '2024-01-01'
})
```

### Available Tracking Methods

#### Business Events
- `track.ctaClick(ctaName, location)` - CTA interactions
- `track.registrationStart()` - Registration funnel start
- `track.registrationComplete(method)` - Registration completion
- `track.demoStart(type)` - Demo interactions
- `track.newsletterSubscribe(location)` - Newsletter signups
- `track.contactForm(type)` - Contact form submissions

#### Content & Navigation
- `track.contentView(type, id)` - Content engagement
- `track.navigationClick(destination)` - Navigation tracking

#### Technical
- `track.error(type, message)` - Error tracking

## 🎛️ Configuration

### Environment Variables
```bash
# Google Analytics
NUXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# PostHog
NUXT_PUBLIC_POSTHOG_PUBLIC_KEY=phc_xxxxxxxxx
NUXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NUXT_PUBLIC_POSTHOG_RECORDING=false

# Strapi CMS
NUXT_PUBLIC_STRAPI_URL=http://cms.helicontrade.local:1337
NUXT_PUBLIC_STRAPI_TOKEN=your-api-token
```

### Runtime Config
Analytics configuration is automatically loaded from environment variables and made available through Nuxt's runtime config.

## 📝 Strapi CMS Integration

### Content Types
The Strapi integration supports these content types:
- **Articles/Blog Posts**: Dynamic blog content
- **Pages**: Landing pages and static content
- **Team Members**: About page team profiles
- **Testimonials**: Customer reviews and feedback
- **Features**: Product feature listings
- **Pricing Plans**: Dynamic pricing tables
- **FAQs**: Frequently asked questions
- **Global Settings**: Site-wide configuration

### Usage Examples

#### Fetching Articles
```typescript
const { getArticles, getArticle } = useStrapi()

// Get all articles
const articles = await getArticles({
  populate: ['author', 'featured_image'],
  sort: ['publishedAt:desc'],
  pagination: { page: 1, pageSize: 10 }
})

// Get specific article
const article = await getArticle('trading-101-guide', ['author', 'featured_image'])
```

#### Dynamic Pages
```typescript
const { getPage } = useStrapi()

const pageContent = await getPage('about-us', ['sections', 'hero'])
```

#### Global Content
```typescript
const { getGlobalSettings } = useStrapi()

const globalSettings = await getGlobalSettings()
```

## 🚀 Setup Instructions

### 1. Copy Environment File
```bash
cp .env.example .env
```

### 2. Configure Analytics
1. **Google Analytics**: Create GA4 property and get Measurement ID
2. **PostHog**: Sign up and get public key from project settings
3. **Strapi**: Set up Strapi instance and configure API token

### 3. Install Dependencies
The analytics packages are loaded dynamically to avoid conflicts, but you can install them explicitly:
```bash
npm install posthog-js
```

### 4. Test Analytics
Visit `/analytics-example` (if added to router) to test analytics integration with interactive examples.

## 🛡️ Privacy & Security

### Data Protection
- **Consent-based**: No tracking without explicit user consent
- **IP Anonymization**: Enabled by default
- **Secure Storage**: Cookies use secure flags in production
- **Data Minimization**: Only collect necessary analytics data

### Cookie Categories
- **Necessary**: Required for site functionality (always enabled)
- **Analytics**: Website usage statistics (GA4, PostHog)
- **Marketing**: Advertising and retargeting (future use)
- **Functional**: Enhanced features like chat widgets

## 🔧 Development

### Testing Analytics
1. Open browser developer tools
2. Check Network tab for analytics requests
3. Use analytics debugger extensions
4. Monitor console for any errors

### Cookie Consent Testing
- Clear localStorage to reset consent
- Test different consent combinations
- Verify analytics load only after consent

### PostHog Development
- Events appear in PostHog dashboard with ~5 minute delay
- Use PostHog's debugging mode for real-time testing
- Check browser console for PostHog initialization logs

## 📈 Analytics Best Practices

### Event Naming
- Use snake_case for event names
- Be consistent with property names
- Include context (page, location, user type)

### Performance
- Analytics load asynchronously
- Consent is checked before tracking
- Failed analytics requests won't break site functionality

### Privacy
- Always respect user consent
- Don't track sensitive information
- Provide clear opt-out mechanisms

## 🔍 Troubleshooting

### Analytics Not Working
1. Check environment variables are set
2. Verify user has given consent
3. Check browser console for errors
4. Ensure analytics IDs are correct

### Cookie Consent Issues
1. Clear localStorage to reset
2. Check console for JavaScript errors
3. Verify cookie policy pages exist

### Strapi Connection Issues
1. Verify Strapi URL and API token
2. Check CORS settings in Strapi
3. Ensure API endpoints exist

## 📚 Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [PostHog Documentation](https://posthog.com/docs)
- [Strapi Documentation](https://docs.strapi.io/)
- [GDPR Compliance Guide](https://gdpr.eu/)
