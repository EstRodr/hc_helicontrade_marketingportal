# Production Personalization Deployment Guide

## 🚀 Recommended Production Setup

### Architecture Overview
```
PostHog (A/B Testing) → Marketing Site ← Strapi (Content Management)
                            ↓
                    Your Main Admin App (Control Center)
```

## 🎯 Step-by-Step Deployment

### Step 1: PostHog Setup (A/B Testing)
1. **Create Feature Flags in PostHog:**
   - `personalization-variant` (String: "0", "1", "2", "3", "4")
   - `enable-personalization` (Boolean: true/false)
   - `smooth-transitions` (Boolean: true/false)

2. **Set Rollout Percentages:**
   ```
   Variant 0: 20% (Global Insight)
   Variant 1: 20% (AI Eyes)
   Variant 2: 20% (Your Edge)
   Variant 3: 20% (Redefined Intelligence)
   Variant 4: 20% (Global AI Power)
   ```

3. **Configure Environment Variables:**
   ```bash
   NUXT_PUBLIC_POSTHOG_PUBLIC_KEY=your_posthog_key
   NUXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

### Step 2: Strapi CMS Setup (Content Management)
1. **Create Content Types** (see `strapi-setup.md`)
2. **Add Sample Data:**
   ```json
   // Personalization Config
   {
     "variant": null, // Let PostHog control
     "enabled": true,
     "smooth_transitions": true,
     "delay_seconds": 2
   }
   ```

3. **Configure Environment Variables:**
   ```bash
   NUXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
   NUXT_PUBLIC_STRAPI_TOKEN=your_strapi_token
   ```

### Step 3: Marketing Site Configuration
1. **Update nuxt.config.ts:**
   ```typescript
   export default defineNuxtConfig({
     runtimeConfig: {
       public: {
         // PostHog
         posthogPublicKey: process.env.NUXT_PUBLIC_POSTHOG_PUBLIC_KEY,
         posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST,
         
         // Strapi
         strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL,
         strapiToken: process.env.NUXT_PUBLIC_STRAPI_TOKEN,
         
         // Personalization (fallback only)
         personalizationOption: process.env.NUXT_PUBLIC_PERSONALIZATION_OPTION || null,
       }
     }
   })
   ```

2. **Deploy with Environment Variables:**
   ```bash
   # Netlify/Vercel deployment settings
   NUXT_PUBLIC_POSTHOG_PUBLIC_KEY=phc_your_key
   NUXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   NUXT_PUBLIC_STRAPI_URL=https://your-strapi.com
   NUXT_PUBLIC_STRAPI_TOKEN=your_token
   ```

### Step 4: Main Admin App Integration (Optional)
1. **API Endpoints to Create:**
   ```
   GET  /api/personalization/config
   POST /api/personalization/config
   POST /api/personalization/metrics
   ```

2. **Environment Variables:**
   ```bash
   NUXT_PUBLIC_ADMIN_API_URL=https://your-admin-app.com/api
   NUXT_PUBLIC_ADMIN_AUTH_TOKEN=your_admin_token
   ```

## 🎛️ Control Hierarchy (Priority Order)

1. **PostHog A/B Testing** (Highest Priority)
   - Real-time A/B testing
   - Automatic user assignment
   - Analytics and conversion tracking

2. **Strapi CMS** (Content Management)
   - Manual content overrides
   - Scheduled content changes
   - Market-specific configurations

3. **Runtime Config** (Emergency Override)
   - Environment variable fallback
   - Emergency kill switch
   - Development/staging control

4. **Intelligent Defaults** (Automatic)
   - Market session-based
   - Country-based defaults
   - Time-based fallbacks

## 📊 Monitoring & Analytics

### Key Metrics to Track
- **Conversion Rate by Variant**
- **Time to Conversion**
- **Bounce Rate by Variant**
- **Geographic Performance**
- **Market Session Performance**

### PostHog Events
```javascript
// Automatically tracked by the system
'personalization_variant_assigned'
'personalized_content_viewed'
'personalized_cta_clicked'
'hero_engagement'
'signup_conversion'
```

### Alerts to Set Up
- Personalization system errors
- Conversion rate drops > 10%
- High bounce rate on specific variants
- API failures (PostHog/Strapi)

## 🔧 Management Interfaces

### 1. PostHog Dashboard
- **URL:** https://app.posthog.com
- **Use For:** A/B testing, analytics, user targeting
- **Access:** Marketing team, data analysts

### 2. Strapi Admin Panel
- **URL:** https://your-strapi-instance.com/admin
- **Use For:** Content management, manual overrides
- **Access:** Content team, marketing managers

### 3. Marketing Site Admin
- **URL:** https://yourdomain.com/admin/personalization
- **Use For:** Real-time monitoring, quick changes
- **Access:** Technical team, marketing managers

### 4. Main Admin App (Future)
- **URL:** https://your-admin-app.com/personalization
- **Use For:** High-level control, reporting
- **Access:** C-level, product managers

## 🚨 Emergency Procedures

### Disable Personalization
```bash
# Method 1: PostHog (Instant)
Set feature flag 'enable-personalization' to false

# Method 2: Environment Variable (Requires deployment)
NUXT_PUBLIC_PERSONALIZATION_OPTION=0

# Method 3: Strapi (Quick)
Set personalization config 'enabled' to false
```

### Rollback to Specific Variant
```bash
# PostHog: Set 'personalization-variant' to single value
# Environment: Set NUXT_PUBLIC_PERSONALIZATION_OPTION=2
# Strapi: Set variant field to desired number
```

## 🧪 Testing Strategy

### Pre-Production Testing
1. **Staging Environment:**
   ```bash
   NUXT_PUBLIC_PERSONALIZATION_OPTION=0  # Test variant 0
   NUXT_PUBLIC_PERSONALIZATION_OPTION=1  # Test variant 1
   # etc.
   ```

2. **PostHog Test Mode:**
   - Create test feature flags
   - Use development PostHog project
   - Test with small user percentage

### Production Rollout
1. **Week 1:** 10% traffic, monitor for issues
2. **Week 2:** 25% traffic, collect baseline data
3. **Week 3:** 50% traffic, analyze results
4. **Week 4:** 100% traffic, optimize based on data

## 📈 Success Metrics

### Primary KPIs
- **Conversion Rate:** Target +15% improvement
- **Time to Conversion:** Target -20% reduction
- **User Engagement:** Target +25% time on page

### Secondary KPIs
- **Bounce Rate:** Target -10% reduction
- **CTA Click Rate:** Target +30% improvement
- **Geographic Performance:** Consistent across regions

## 🔄 Maintenance

### Daily
- Monitor PostHog dashboard for anomalies
- Check error logs for integration issues

### Weekly
- Review conversion metrics by variant
- Analyze geographic performance
- Update content in Strapi if needed

### Monthly
- Comprehensive performance review
- A/B test result analysis
- Plan next optimization cycle

## 🎯 Next Steps

1. **Immediate (This Week):**
   - Set up PostHog feature flags
   - Configure Strapi content types
   - Deploy with environment variables

2. **Short Term (Next Month):**
   - Analyze A/B test results
   - Optimize winning variants
   - Expand to more markets

3. **Long Term (Next Quarter):**
   - Integrate with main admin app
   - Advanced user segmentation
   - Machine learning optimization
