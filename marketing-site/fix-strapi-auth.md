# Quick Strapi Authentication Fix

## Problem
Getting 401 Unauthorized when accessing `/api/articles` in Strapi.

## Solution Steps

### 1. Access Strapi Admin
Go to: http://localhost:1337/admin

### 2. Check API Tokens
1. Click Settings (gear icon) in the left sidebar
2. Click "API Tokens" under "Global settings"
3. You should see your current token listed

### 3. Create New Token (if needed)
1. Click "Create new API Token"
2. Name: `Marketing Site`
3. Description: `Token for HeliconTrade marketing site`
4. Token duration: `Unlimited`
5. Token type: `Full access` (for now, can restrict later)
6. Click "Save"
7. **COPY THE TOKEN IMMEDIATELY** (you can't see it again)

### 4. Update Environment
Replace the token in `.env`:
```bash
NUXT_PUBLIC_STRAPI_TOKEN=your_new_token_here
```

### 5. Create Article Content Type (if missing)
**Note: Only works in development mode**

1. In Strapi admin, click "Content-Type Builder" (left sidebar)
2. Click "Create new collection type"
3. Display name: `Article`
4. Click "Continue"
5. Add fields:
   - Click "Add another field"
   - Select "Text" → Name: `title` → Click "Finish"
   - Select "UID" → Name: `slug` → Attached field: `title` → Click "Finish"
   - Select "Rich text" → Name: `content` → Click "Finish"
   - Select "Text" → Name: `excerpt` → Click "Finish"
   - Select "Text" → Name: `author` → Click "Finish"
6. Click "Save" (this will restart Strapi)

### 6. Configure Permissions
1. Go to Settings → Users & Permissions Plugin → Roles
2. Click "Public"
3. Under "Article", check:
   - ✅ find
   - ✅ findOne
4. Click "Save"

### 7. Test Connection
Run the setup script again:
```bash
node scripts/setup-strapi-content.js
```

## Expected Output
```
🚀 HeliconTrade Strapi Content Setup
🔄 Testing Strapi connection...
✅ Connection successful!
📝 Creating sample articles...
Creating: "Getting Started with HeliconTrade"
✅ Created article with ID: 1
...
🎉 Content setup complete!
```

## If Still Getting Errors

**Production Mode Issue:**
If Strapi is in production mode, you can't create content types. Restart Strapi in development mode:
```bash
# In your Strapi directory
npm run develop
# or
yarn develop
```

**Quick Test:**
```bash
curl -H "Authorization: Bearer YOUR_NEW_TOKEN" http://localhost:1337/api/articles
```

Should return: `{"data":[],"meta":{"pagination":{...}}}` (empty array is OK)
Should NOT return: `{"error":{"status":401,...}}`