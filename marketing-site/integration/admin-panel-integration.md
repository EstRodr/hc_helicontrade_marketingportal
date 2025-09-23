# Admin Panel Integration Guide

## 🎯 Move Admin Panel to Main App (localhost:5173)

### **New Protected Route:**
`http://localhost:5173/admin/marketing-page/personalization`

### **Required Files to Copy:**

#### 1. Admin Page Component
**Location:** `/pages/admin/marketing-page/personalization.vue`

```vue
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Protected Route - Requires Authentication -->
    <div v-if="!isAuthenticated" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          You need to be logged in to access this page.
        </p>
        <NuxtLink to="/login" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Login
        </NuxtLink>
      </div>
    </div>

    <!-- Admin Panel Content -->
    <div v-else class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Marketing Page Personalization
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Configure A/B testing, market settings, and personalization options
        </p>
      </div>

      <!-- Copy the entire admin panel content from marketing-site -->
      <PersonalizationAdminPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
// Authentication check
const { $auth } = useNuxtApp() // Adjust based on your auth system
const isAuthenticated = computed(() => {
  // Replace with your actual authentication logic
  return $auth?.user?.value != null
})

// Redirect if not authenticated
if (!isAuthenticated.value) {
  await navigateTo('/login')
}

// SEO
useHead({
  title: 'Marketing Personalization Admin | HeliconTrade',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
```

#### 2. Admin Panel Component
**Location:** `/components/PersonalizationAdminPanel.vue`

Copy the entire admin panel component from:
`/Users/manalishashikantsawant/repo/helicontrade-workspace/marketing-site/pages/admin/personalization.vue`

#### 3. Composables
Copy these files to your main app:
- `composables/usePersonalization.ts`
- `composables/useProductionPersonalization.ts`
- `config/production-personalization.ts`

### **Authentication Integration:**

#### Option A: Supabase Auth
```typescript
// In the admin page
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const isAuthenticated = computed(() => !!user.value)

// Redirect if not authenticated
watchEffect(() => {
  if (!user.value) {
    return navigateTo('/login')
  }
})
```

#### Option B: Custom Auth
```typescript
// In the admin page
const { $auth } = useNuxtApp()
const isAuthenticated = computed(() => $auth.isLoggedIn)

// Redirect if not authenticated
if (!isAuthenticated.value) {
  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized - Please login first'
  })
}
```

#### Option C: Middleware Protection
**Create:** `/middleware/admin.ts`
```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  // Replace with your auth logic
  const { $auth } = useNuxtApp()
  
  if (!$auth.isLoggedIn) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Access denied - Admin only'
    })
  }
})
```

**Use in page:**
```vue
<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})
</script>
```

### **Step 2: Update Marketing Site Links**

#### Update Login/Register Links
In your marketing site (`localhost:3002`), update these components:

**AppHeader.vue:**
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

**Or use environment variables:**
```typescript
const config = useRuntimeConfig()

function redirectToLogin() {
  window.location.href = `${config.public.appUrl}/login`
}

function redirectToRegister() {
  window.location.href = `${config.public.appUrl}/register`
}
```

**nuxt.config.ts:**
```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:5173'
    }
  }
})
```

### **Step 3: API Integration**

#### Create API Endpoints in Main App
**Location:** `/server/api/admin/personalization/[...].ts`

```typescript
export default defineEventHandler(async (event) => {
  // Authentication check
  const user = await requireAuthenticatedUser(event)
  if (!user || !user.isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required'
    })
  }

  const method = getMethod(event)
  const url = getRouterParam(event, 'slug')

  switch (method) {
    case 'GET':
      return await getPersonalizationConfig()
    case 'POST':
      const body = await readBody(event)
      return await updatePersonalizationConfig(body)
    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed'
      })
  }
})
```

### **Step 4: Environment Configuration**

#### Production Environment Variables
```bash
# Main App (localhost:5173)
NUXT_PUBLIC_MARKETING_SITE_URL=https://yourdomain.com
NUXT_PUBLIC_POSTHOG_PUBLIC_KEY=your_posthog_key
NUXT_PUBLIC_STRAPI_URL=https://your-strapi.com
NUXT_PUBLIC_STRAPI_TOKEN=your_token

# Marketing Site (localhost:3002)
NUXT_PUBLIC_APP_URL=https://app.yourdomain.com
```

## 🔐 **Security Considerations:**

1. **Admin Route Protection**: Always check authentication
2. **CORS Configuration**: Allow requests from marketing site
3. **API Rate Limiting**: Protect admin endpoints
4. **Environment Separation**: Different configs for dev/prod
5. **Audit Logging**: Track admin changes

## 📋 **Migration Checklist:**

- [ ] Copy admin panel components to main app
- [ ] Set up protected route with authentication
- [ ] Update login/register links in marketing site
- [ ] Create API endpoints for admin functionality
- [ ] Configure environment variables
- [ ] Test authentication flow
- [ ] Test personalization admin panel
- [ ] Deploy and verify production setup
