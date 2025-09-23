# Quick Integration Setup

## 🚀 **Step-by-Step Integration**

### **Step 1: Copy Files to Main App**

Copy these files from marketing-site to your main app (`localhost:5173`):

```bash
# 1. Admin Page
cp integration/admin-page-component.vue /path/to/main-app/pages/admin/marketing-page/personalization.vue

# 2. Admin Panel Component (extract from existing admin page)
cp pages/admin/personalization.vue /path/to/main-app/components/PersonalizationAdminPanel.vue

# 3. Composables
cp composables/usePersonalization.ts /path/to/main-app/composables/
cp composables/useProductionPersonalization.ts /path/to/main-app/composables/
cp config/production-personalization.ts /path/to/main-app/config/
```

### **Step 2: Update Marketing Site Links**

In `marketing-site/components/AppHeader.vue`, update the redirect functions:

```typescript
// Handle login redirect
function redirectToLogin() {
  window.location.href = `http://localhost:5173/login`
}

// Handle registration redirect
function redirectToRegister() {
  window.location.href = `http://localhost:5173/register`
}
```

### **Step 3: Environment Variables**

#### Main App (.env)
```bash
# Marketing Site Integration
NUXT_PUBLIC_MARKETING_SITE_URL=http://localhost:3002
NUXT_PUBLIC_POSTHOG_PUBLIC_KEY=your_posthog_key
NUXT_PUBLIC_STRAPI_URL=https://your-strapi.com
NUXT_PUBLIC_STRAPI_TOKEN=your_token
```

#### Marketing Site (.env)
```bash
# Main App Integration
NUXT_PUBLIC_APP_URL=http://localhost:5173
```

### **Step 4: Authentication Setup**

Choose your authentication method:

#### Option A: Supabase
```vue
<script setup lang="ts">
const user = useSupabaseUser()
const isAuthenticated = computed(() => !!user.value)

watchEffect(() => {
  if (!user.value) {
    return navigateTo('/login')
  }
})
</script>
```

#### Option B: Custom Auth
```vue
<script setup lang="ts">
const { $auth } = useNuxtApp()
const isAuthenticated = computed(() => $auth.isLoggedIn)

if (!isAuthenticated.value) {
  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized'
  })
}
</script>
```

### **Step 5: Test the Integration**

1. **Start both apps:**
   ```bash
   # Terminal 1: Marketing Site
   cd marketing-site && pnpm run dev
   
   # Terminal 2: Main App
   cd main-app && pnpm run dev
   ```

2. **Test the flow:**
   - Visit `http://localhost:3002` (marketing site)
   - Click "Login" → should redirect to `http://localhost:5173/login`
   - Login to main app
   - Visit `http://localhost:5173/admin/marketing-page/personalization`
   - Should see the admin panel

3. **Test personalization:**
   - Make changes in admin panel
   - Check PostHog dashboard
   - Verify changes on marketing site

## 🔐 **Security Checklist**

- [ ] Admin route requires authentication
- [ ] Marketing site redirects to correct login URL
- [ ] PostHog keys are in environment variables
- [ ] Admin panel is not publicly accessible
- [ ] CORS is configured for cross-origin requests
- [ ] API endpoints have proper validation

## 📋 **Production Deployment**

### **Environment Variables (Production)**
```bash
# Main App
NUXT_PUBLIC_MARKETING_SITE_URL=https://yourdomain.com
NUXT_PUBLIC_APP_URL=https://app.yourdomain.com
NUXT_PUBLIC_POSTHOG_PUBLIC_KEY=phc_your_production_key

# Marketing Site  
NUXT_PUBLIC_APP_URL=https://app.yourdomain.com
```

### **DNS Setup**
- `yourdomain.com` → Marketing Site
- `app.yourdomain.com` → Main App
- Admin panel: `app.yourdomain.com/admin/marketing-page/personalization`

## 🎯 **Final Result**

✅ **Marketing Site** (`yourdomain.com`)
- PostHog A/B testing with 5 variants
- Swedish market detection (OMX)
- Login/Register buttons → Main app

✅ **Main App** (`app.yourdomain.com`)
- Protected admin panel at `/admin/marketing-page/personalization`
- Full control over marketing site personalization
- PostHog integration for analytics

✅ **Admin Experience**
- Login to main app
- Navigate to admin panel
- Configure personalization
- See changes on marketing site immediately

This gives you a secure, integrated system where marketing personalization is controlled from your authenticated main app! 🚀
