# 🚀 Strapi Production Server Setup

Your Strapi server is running at: **http://142.132.205.187/admin/**

## ⚡ Quick Start (5 minutes)

### Step 1: Generate API Token (2 minutes)

1. **Open Strapi Admin**: http://142.132.205.187/admin/
2. **Login** to your admin panel
3. Go to **Settings** → **API Tokens**
4. Click **"Create new API Token"**
5. Configure:
   - **Name**: `Marketing Site Production`
   - **Description**: `API access for HeliconTrade marketing site`
   - **Token duration**: `Unlimited`
   - **Token type**: `Full access`
6. Click **"Save"**
7. **COPY THE TOKEN** (you'll only see it once!)

### Step 2: Update Environment (30 seconds)

Replace the token in your `.env` file:

```bash
# Replace YOUR_NEW_TOKEN_HERE with the token from Step 1
NUXT_PUBLIC_STRAPI_URL=http://142.132.205.187
NUXT_PUBLIC_STRAPI_TOKEN=YOUR_ACTUAL_TOKEN_HERE
```

### Step 3: Test Connection (30 seconds)

```bash
node test-strapi-connection.js YOUR_ACTUAL_TOKEN_HERE
```

Expected output:
```
✅ Connection successful!
✅ Features endpoint working
🎉 Testing complete!
```

### Step 4: Create Content Types (2 minutes)

If the test shows "Homepage content type not found", create it:

1. In Strapi admin, go to **Content-Types Builder**
2. Click **"Create new single type"**
3. Name it **"Homepage"** (UID: `homepage`)
4. **Save** and wait for restart

Then create these fields (click "Add another field" after each):

**Hero Fields:**
- `hero_headline_default` (Text - Long text)
- `hero_subline_default` (Text - Long text) 
- `cta_primary` (Text - Short text)
- `cta_secondary` (Text - Short text)

**Value Props:**
- `value_prop_1` (Text - Short text)
- `value_prop_2` (Text - Short text)
- `value_prop_3` (Text - Short text)

**SEO Fields:**
- `page_title` (Text - Long text)
- `meta_description` (Text - Long text)

Click **"Save"** and wait for Strapi to restart.

### Step 5: Set Permissions (30 seconds)

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. For **Homepage**, enable:
   - ✅ **find**
   - ✅ **findOne**
3. Click **"Save"**

### Step 6: Populate Content (30 seconds)

```bash
# Update the token in setup script first
node setup-homepage-cms.cjs
```

Expected output:
```
✅ Created homepage content successfully
📄 Content includes:
- Hero headlines and sublines
- CTA buttons and disclaimer text
- Value propositions
- SEO metadata
```

### Step 7: Test Your Site (30 seconds)

1. **Start your dev server**: `npm run dev`
2. **Visit**: http://localhost:3002/
3. **Check**: Content should load from Strapi
4. **Test navigation**: Should be fast and smooth

---

## 🔧 Troubleshooting

### Token Issues
```bash
# Test with your token
node test-strapi-connection.js YOUR_TOKEN

# Common responses:
# 401 = Invalid token → Generate new one
# 404 = Content type missing → Create Homepage type  
# 403 = Permissions issue → Enable public find/findOne
```

### Firewall Issues
Your server should allow:
- ✅ **Port 80** (HTTP) - Currently working
- ✅ **Port 443** (HTTPS) - Optional for SSL

### Content Not Loading
1. **Check permissions**: Public role has find/findOne for Homepage
2. **Check content**: Content Manager → Single Types → Homepage → Add content
3. **Check token**: Use fresh token from API Tokens section

---

## 📋 Verification Checklist

- [ ] API token generated and copied
- [ ] `.env` file updated with new token
- [ ] `node test-strapi-connection.js` passes
- [ ] Homepage content type created with required fields
- [ ] Public permissions enabled (find, findOne)
- [ ] Homepage content populated via script
- [ ] Marketing site loads content at http://localhost:3002/
- [ ] Navigation works smoothly

---

## 🎯 Expected Results

**Before Setup:**
- ❌ 403/404 errors from Strapi API
- ❌ Homepage shows static fallback content
- ❌ Strapi test page shows connection errors

**After Setup:**
- ✅ API returns homepage content
- ✅ Homepage shows dynamic content from Strapi  
- ✅ Fast navigation (thanks to our optimizations!)
- ✅ Strapi test page shows "Connected" status

---

## 📞 Need Help?

If you encounter issues:

1. **Run diagnostics**: `node test-strapi-connection.js YOUR_TOKEN`
2. **Check Strapi logs** in your server console
3. **Verify content** in Strapi admin panel
4. **Test API directly** with curl:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        "http://142.132.205.187/api/homepage"
   ```

The setup should take **~5 minutes** total. Most of the time is spent creating the content type fields in the Strapi admin interface.