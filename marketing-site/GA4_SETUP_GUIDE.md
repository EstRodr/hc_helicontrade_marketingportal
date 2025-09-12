# Google Analytics 4 (GA4) Setup Guide for HeliconTrade

## 🎯 Your Current Status

- **Google Analytics Account ID**: `366963690` ✅
- **Account Access**: You have an empty GA account
- **Next Step**: Create a GA4 property

---

## 📋 Step-by-Step Setup

### Step 1: Access Google Analytics
1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. You should see your account with ID `366963690`

### Step 2: Create a GA4 Property
1. Click **Admin** (gear icon in the bottom left)
2. In the **Property** column, click **Create Property**
3. Fill in the details:
   - **Property name**: `HeliconTrade Marketing`
   - **Reporting time zone**: Choose your timezone (e.g., `United States - Pacific Time`)
   - **Currency**: `US Dollar` (or your preferred currency)
4. Click **Next**

### Step 3: Business Information
1. **Industry Category**: Select `Finance & Insurance`
2. **Business Size**: Select your company size
3. **How do you intend to use Google Analytics**: Check:
   - ☑️ Examine user behavior
   - ☑️ Measure advertising ROI
   - ☑️ Get to know your customers
4. Click **Create**

### Step 4: Accept Terms of Service
1. Select your country/region
2. Read and accept the Google Analytics Terms of Service
3. Accept data processing terms
4. Click **I Accept**

### Step 5: Create a Data Stream
1. You'll be automatically redirected to create a data stream
2. Click **Web** (since you're setting up a website)
3. Enter the website details:
   - **Website URL**: `https://helicontrade.com`
   - **Stream name**: `HeliconTrade Website`
4. Click **Create stream**

### Step 6: Get Your Measurement ID
1. After creating the stream, you'll see the **Web stream details**
2. **Copy the Measurement ID** (it looks like `G-XXXXXXXXXX`)
3. This is what you need for your `.env` file!

---

## 🔧 Configure Your Marketing Site

### Add Measurement ID to Environment
1. Open your `.env` file in the marketing site
2. Replace the empty GA measurement ID:
   ```bash
   # Before
   NUXT_PUBLIC_GA_MEASUREMENT_ID=
   
   # After (use YOUR actual measurement ID)
   NUXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-MEASUREMENT-ID
   ```

### Test the Setup
1. Save the `.env` file
2. Restart your development server:
   ```bash
   # Stop current server (Ctrl+C)
   pnpm dev
   ```
3. Visit: `http://helicontrade.local:3002/analytics-test`
4. Check that GA4 shows as "Configured: ✅ Yes"

---

## 🧪 Testing Your GA4 Setup

### 1. Real-time Reports
1. In Google Analytics, go to **Reports** → **Real-time**
2. Visit your website: `http://helicontrade.local:3002`
3. You should see yourself as an active user!

### 2. Test Events
1. Go to the analytics test page: `http://helicontrade.local:3002/analytics-test`
2. Accept cookies for analytics
3. Click "Test GA4 Event"
4. Check the browser Network tab for outgoing requests to Google Analytics

### 3. Event Debugging
- In GA4, go to **Configure** → **DebugView**
- Enable debug mode by adding `?debug_mode=true` to your URL
- You'll see events in real-time as they're sent

---

## 🚀 Production Setup

When you're ready to go live:

### Update URLs
In GA4 Admin → Data Streams → Web stream:
1. Add your production domain: `https://helicontrade.com`
2. You can keep the same Measurement ID for both dev and production

### Referrer Exclusions
In GA4 Admin → Data Streams → Configure tag settings:
1. Add `app.helicontrade.com` to referral exclusions
2. This prevents counting navigation between your marketing site and app as separate sessions

---

## 📊 Recommended Reports & Goals

### Key Metrics to Track
- **Page views**: Homepage, features, pricing
- **Conversions**: Sign-ups, demo requests
- **User flow**: How users navigate your site
- **Traffic sources**: Where users come from

### Set Up Conversions
1. Go to **Configure** → **Conversions**
2. Create custom events for:
   - Newsletter signup
   - Demo request
   - Registration link clicks
   - Contact form submissions

---

## 🔍 Troubleshooting

### GA4 Not Working?
- ✅ Check Measurement ID in `.env` file
- ✅ Restart dev server after changing `.env`
- ✅ Accept analytics cookies on your site
- ✅ Check browser console for JavaScript errors
- ✅ Disable ad blockers while testing

### No Data in Reports?
- Real-time data appears immediately
- Standard reports can take 24-48 hours
- Use Real-time reports for immediate feedback

---

Once you complete these steps, your GA4 will be fully operational! 🎉
