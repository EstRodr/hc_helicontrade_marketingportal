# Strapi Integration Guide - Complete Setup

## 🎯 **Current Status**
- ✅ **Strapi Server**: Running on `142.132.205.187:1337`
- ✅ **Marketing Site**: Configured to connect to your server
- ⏳ **Next**: Complete the integration setup

---

## 🚀 **Step 1: Access Your Strapi Admin Panel**

### **URL to Access**
```
http://142.132.205.187:1337/admin
```

### **First Time Setup**
1. **Open browser** and go to the URL above
2. **Create admin account** (if you haven't already)
3. **Login** with your credentials

---

## 🔑 **Step 2: Create API Token**

### **Generate Read-Only API Token**
1. **In Strapi Admin**: Go to **Settings** → **API Tokens**
2. **Click**: "Create new API Token"
3. **Fill in details**:
   - **Name**: `HeliconTrade Marketing Site`
   - **Description**: `Read-only access for marketing site content`
   - **Token duration**: `Unlimited`
   - **Token type**: `Read-only`
4. **Click**: "Save"
5. **Copy the token** (it starts with something like `7a8b9c...`)

### **Add Token to Your Marketing Site**
1. **Open**: `.env` file in your marketing site
2. **Update the line**:
   ```bash
   # Before
   NUXT_PUBLIC_STRAPI_TOKEN=
   
   # After (paste your actual token)
   NUXT_PUBLIC_STRAPI_TOKEN=your-copied-token-here
   ```
3. **Save the file**

---

## 📋 **Step 3: Create Content Types**

### **Content Type 1: Article (for Blog Posts)**
1. **Go to**: Content-Type Builder → Create new collection type
2. **Display name**: `Article`
3. **Add these fields**:
   ```
   - title (Text, required)
   - slug (UID, attached to title, required)
   - content (Rich text)
   - excerpt (Text)
   - featured_image (Media, single image)
   - author (Text)
   - publish_date (Date)
   - published (Boolean, default: true)
   ```
4. **Save** and **Finish**

### **Content Type 2: Landing Section**
1. **Create new collection type**: `Landing Section`
2. **Add these fields**:
   ```
   - section_name (Text, required)
   - title (Text)
   - subtitle (Text) 
   - content (Rich text)
   - cta_text (Text)
   - cta_link (Text)
   - background_image (Media, single image)
   - order (Number, integer)
   ```

### **Content Type 3: Feature**
1. **Create new collection type**: `Feature`
2. **Add these fields**:
   ```
   - name (Text, required)
   - description (Rich text)
   - icon (Media, single image)
   - category (Enumeration: trading, research, education, alerts)
   - is_core_feature (Boolean)
   - coming_soon (Boolean)
   ```

### **Content Type 4: Team Member**
1. **Create new collection type**: `Team Member`
2. **Add these fields**:
   ```
   - name (Text, required)
   - position (Text)
   - bio (Rich text)
   - photo (Media, single image)
   - linkedin_url (Text)
   - twitter_url (Text)
   - order (Number, integer)
   ```

### **Content Type 5: Legal Page**
1. **Create new collection type**: `Legal Page`
2. **Add these fields**:
   ```
   - page_type (Enumeration: privacy, terms, cookies, user-agreement)
   - title (Text, required)
   - content (Rich text, required)
   - last_updated (Date)
   - version (Text)
   ```

---

## 🔐 **Step 4: Configure Permissions**

### **Public Access for Marketing Site**
1. **Go to**: Settings → Users & Permissions → Roles → Public
2. **For each content type** (Article, Landing Section, Feature, etc.):
   - ✅ **Enable**: `find` (to list all)
   - ✅ **Enable**: `findOne` (to get individual items)
   - ❌ **Leave disabled**: create, update, delete
3. **Save**

---

## 🌐 **Step 5: Configure CORS**

### **Allow Marketing Site Access**
1. **In your Strapi server**, edit the CORS configuration
2. **File location**: `config/middleware.js` (or similar)
3. **Add your domains**:
   ```javascript
   module.exports = {
     settings: {
       cors: {
         enabled: true,
         credentials: true,
         origin: [
           'http://helicontrade.local:3002',  // Development
           'https://helicontrade.com',        // Production
           'http://localhost:3000'            // Backup dev
         ],
       },
     },
   };
   ```

---

## 🧪 **Step 6: Test the Connection**

### **Create Test Content**
1. **In Strapi Admin**: Go to Content Manager
2. **Create a test Article**:
   - Title: "Welcome to HeliconTrade"
   - Content: "This is a test article from Strapi"
   - Published: true
3. **Save & Publish**

### **Test from Marketing Site**
1. **Restart your dev server**:
   ```bash
   # Stop current server (Ctrl+C)
   pnpm dev
   ```
2. **Create test page**: `pages/strapi-test.vue`

Let me create this test page for you:

```vue
<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">Strapi Integration Test</h1>
    
    <!-- Connection Status -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 border mb-8">
      <h2 class="text-xl font-semibold mb-4">Connection Status</h2>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>Strapi URL:</span>
          <code class="text-blue-600">{{ config.public.strapiUrl }}</code>
        </div>
        <div class="flex justify-between">
          <span>API Token:</span>
          <span :class="config.public.strapiToken ? 'text-green-600' : 'text-red-600'">
            {{ config.public.strapiToken ? '✅ Configured' : '❌ Missing' }}
          </span>
        </div>
        <div class="flex justify-between">
          <span>Connection:</span>
          <span :class="connectionStatus === 'success' ? 'text-green-600' : 'text-red-600'">
            {{ connectionStatus === 'success' ? '✅ Connected' : '❌ Failed' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Test Articles -->
    <div v-if="articles.length > 0" class="bg-white dark:bg-gray-800 rounded-lg p-6 border">
      <h2 class="text-xl font-semibold mb-4">Articles from Strapi</h2>
      <div class="space-y-4">
        <div v-for="article in articles" :key="article.id" class="border-b pb-4">
          <h3 class="font-semibold">{{ article.attributes.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400">{{ article.attributes.excerpt || 'No excerpt' }}</p>
          <p class="text-sm text-gray-500">Published: {{ article.attributes.publish_date || 'No date' }}</p>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
      <h2 class="text-xl font-semibold text-red-900 dark:text-red-100 mb-4">Connection Error</h2>
      <pre class="text-sm text-red-800 dark:text-red-200">{{ error }}</pre>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const articles = ref([])
const connectionStatus = ref('testing')
const error = ref(null)

onMounted(async () => {
  try {
    const { fetchArticles } = useStrapi()
    const data = await fetchArticles()
    articles.value = data
    connectionStatus.value = 'success'
  } catch (err) {
    error.value = err.message
    connectionStatus.value = 'failed'
    console.error('Strapi connection error:', err)
  }
})
</script>
```

---

## ✅ **Step 7: Verification Checklist**

### **Before Testing**
- [ ] Strapi admin panel accessible at `http://142.132.205.187:1337/admin`
- [ ] API token created and added to `.env` file
- [ ] At least one content type created (Article recommended)
- [ ] Public permissions enabled for content types
- [ ] Test content created and published

### **Testing Steps**
1. **Visit**: `http://helicontrade.local:3002/strapi-test`
2. **Expected results**:
   - Connection: ✅ Connected
   - Articles displayed from Strapi
   - No error messages

---

## 🚀 **Next Steps After Success**

1. **Create all content types** (Article, Feature, Team Member, etc.)
2. **Add real content** for your marketing site
3. **Update marketing pages** to use Strapi content
4. **Set up automated deployments** (optional)

---

## 🆘 **Common Issues & Solutions**

### **CORS Error**
- **Error**: "Access to fetch blocked by CORS policy"
- **Solution**: Update CORS config in Strapi to allow your domain

### **401 Unauthorized**
- **Error**: "Request failed with status 401"
- **Solution**: Check API token in `.env` file

### **Connection Refused**
- **Error**: "Connection refused" or timeout
- **Solution**: Verify firewall allows port 1337, check Strapi is running

### **No Content Returned**
- **Error**: Empty arrays returned
- **Solution**: Check content is published, verify permissions for Public role

---

**Ready to proceed with these steps?** 🎯
