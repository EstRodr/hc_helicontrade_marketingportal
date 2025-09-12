# HeliconTrade Marketing Site - Analytics & CMS Setup Guide

## 🎯 Current Status ✅

- ✅ **PostHog Analytics**: Configured and ready (EU region: `https://eu.i.posthog.com`)
- ✅ **Dev Server**: Running on `http://helicontrade.local:3002`
- ✅ **Cookie Consent**: Custom GDPR-compliant component (no signup needed)
- ⚠️  **Google Analytics**: Needs GA4 property setup
- ⚠️  **Strapi CMS**: Decision needed for hosting approach

---

## 🔧 Next Steps

### 1. Google Analytics 4 Setup

**You have Account ID: `366963690`**

#### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com)
2. Admin → Properties → Create Property
3. Enter property details:
   - **Property name**: "HeliconTrade Marketing"
   - **Reporting time zone**: Your timezone
   - **Currency**: USD (or your preference)

#### Step 2: Create Data Stream
1. In your new property: Admin → Data Streams → Add stream
2. Choose "Web"
3. Enter details:
   - **Website URL**: `https://helicontrade.com` (production)
   - **Stream name**: "HeliconTrade Website"

#### Step 3: Get Measurement ID
1. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Add to your `.env` file:
   ```bash
   NUXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-MEASUREMENT-ID
   ```

### 2. Local Development Testing

**Your site is now accessible at:** `http://helicontrade.local:3002`

#### Test Analytics
1. Visit: `http://helicontrade.local:3002/analytics-test`
2. Check configuration status
3. Test events (both PostHog and GA4)

#### Important Notes:
- **PostHog works on localhost** ✅
- **GA4 works on localhost** ✅ (contrary to old GA Universal)
- Use browser dev tools → Network tab to see analytics requests

---

## 📊 Cookie Consent & Privacy

### What We're Using:
- **Custom Vue Component** (`CookieConsent.vue`)
- **No external service signup required**
- **GDPR compliant**
- **Free solution**

### Features:
- ✅ Essential cookies always allowed
- ✅ Analytics cookies require consent
- ✅ Marketing cookies require consent
- ✅ User can withdraw consent anytime

---

## 🏗️ Strapi CMS Decision

### Option A: Strapi Cloud (Recommended)
**Pros:**
- Zero maintenance
- Automatic updates & security
- Built-in CDN
- Professional support

**Cons:**
- Cost: $99/month minimum
- Less control over infrastructure

### Option B: Self-Hosted on Your Server
**Pros:**
- Cost-effective (only server costs)
- Full control
- Custom configurations

**Cons:**
- Maintenance overhead
- Security updates
- Backup management
- SSL certificate management

### My Recommendation:
Start with **self-hosted on your remote server** to keep costs low during development. You can always migrate to Strapi Cloud later when revenue grows.

#### Self-Hosted Setup Guide:
```bash
# On your remote server
git clone https://github.com/strapi/strapi.git helicontrade-cms
cd helicontrade-cms
npm install
npm run develop

# Then add to your .env:
NUXT_PUBLIC_STRAPI_URL=https://cms.yourdomain.com
NUXT_PUBLIC_STRAPI_TOKEN=your-api-token
```

---

## 🧪 Testing Checklist

### Before Going Live:
- [ ] GA4 Measurement ID configured
- [ ] PostHog events tracking correctly
- [ ] Cookie consent banner appears on first visit
- [ ] Analytics work after consent given
- [ ] Test all CTA clicks, form submissions
- [ ] Verify data appears in GA4 Real-time reports
- [ ] Verify data appears in PostHog events

### Analytics Test Commands:
```bash
# Test homepage
curl -s http://helicontrade.local:3002/ | grep "HeliconTrade"

# Test analytics page
curl -s http://helicontrade.local:3002/analytics-test | grep "Analytics Test"

# Check dev server logs
tail -f dev.log
```

---

## 📞 Support

If you encounter issues:

1. **Check browser console** for JavaScript errors
2. **Check Network tab** for failed analytics requests
3. **Verify .env file** has correct values
4. **Restart dev server** after .env changes
5. **Clear browser cache** and cookies for testing

The analytics infrastructure is production-ready and will scale with your growth!
