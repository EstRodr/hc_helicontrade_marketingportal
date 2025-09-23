# Fix Strapi Permissions (403 Forbidden Error)

## Current Status ✅
- ✅ Authentication working (200 OK)
- ✅ API token configured correctly  
- ✅ Connection successful
- ❌ Getting 403 Forbidden when creating content

## Issue
The API token has access but lacks permissions to create articles. This typically happens when:
1. The Article content type doesn't exist yet
2. The permissions aren't configured for the API token role

## Fix Steps

### Step 1: Access Strapi Admin
1. Open: http://localhost:1337/admin
2. Login with your admin credentials

### Step 2: Create Article Content Type (if missing)
1. Click **"Content-Type Builder"** in the left sidebar
2. Click **"Create new collection type"** 
3. **Display name:** `Article`
4. Click **"Continue"**
5. Add these fields by clicking **"Add another field"**:

   **Field 1: Title**
   - Type: **Text**
   - Name: `title`
   - Click **"Finish"**

   **Field 2: Slug** 
   - Type: **UID**
   - Name: `slug`
   - Attached field: `title`
   - Click **"Finish"**

   **Field 3: Content**
   - Type: **Rich text (Markdown)**
   - Name: `content`
   - Click **"Finish"**

   **Field 4: Excerpt**
   - Type: **Text**
   - Name: `excerpt`  
   - Click **"Finish"**

   **Field 5: Author**
   - Type: **Text**
   - Name: `author`
   - Click **"Finish"**

6. Click **"Save"** (this will restart Strapi)

### Step 3: Configure Permissions
1. Go to **Settings** (gear icon) → **Users & Permissions Plugin** → **Roles**
2. Click **"Authenticated"** (this is for API tokens)
3. Scroll down to find **"Article"** section
4. Check these permissions:
   - ✅ **create**
   - ✅ **find** 
   - ✅ **findOne**
   - ✅ **update**
   - ✅ **delete**
5. Click **"Save"**

### Step 4: Also Configure Public Role (for frontend)
1. Still in **Roles**, click **"Public"**
2. Under **"Article"** section, check:
   - ✅ **find**
   - ✅ **findOne**
3. Click **"Save"**

### Step 5: Test the Fix
Run the content setup script again:
```bash
node scripts/setup-strapi-content.js
```

### Expected Output ✅
```
🚀 HeliconTrade Strapi Content Setup

🔄 Testing Strapi connection...
✅ Connection successful!
📝 Creating sample articles...

Creating: "Getting Started with HeliconTrade"
✅ Created article with ID: 1
Creating: "AI-Powered Trading: The Future is Here"  
✅ Created article with ID: 2
Creating: "Market Volatility: Opportunity or Risk?"
✅ Created article with ID: 3

🎉 Content setup complete!
```

### Step 6: Test Marketing Site Integration
1. Go to: http://helicontrade.local:3000/strapi-test
2. Should show the created articles
3. Connection status should be green ✅

## Troubleshooting

**If still getting 403:**
- Make sure you configured the **"Authenticated"** role (not just Public)
- Verify the Article content type was created successfully
- Try refreshing/restarting Strapi after permission changes

**If Strapi is in production mode:**
- Content types can't be created in production mode
- You'll need to restart Strapi in development mode:
  ```bash
  # In your Strapi directory
  npm run develop
  ```

## Next Steps After Fix
1. ✅ Create additional content types (Feature, Team Member, etc.)
2. ✅ Test marketing site integration fully
3. ✅ Configure CORS for production domains