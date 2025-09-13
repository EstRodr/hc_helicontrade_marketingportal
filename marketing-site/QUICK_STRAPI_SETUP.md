# 🚀 Quick Strapi Setup (2 minutes)

## Step 1: Create Article Content Type (1 minute)

1. **Open**: http://localhost:1337/admin
2. **Click**: "Content-Type Builder" (left sidebar)
3. **Click**: "Create new collection type"
4. **Type**: `Article` (Display name)
5. **Click**: "Continue"

### Add Fields (30 seconds each):

**Field 1 - Title:**
- Click: "Text"
- Name: `title`
- ✅ Check "Required field" 
- Click: "Add another field"

**Field 2 - Slug:**
- Click: "UID"  
- Name: `slug`
- Attached field: `title`
- Click: "Add another field"

**Field 3 - Content:**
- Click: "Rich text"
- Name: `content`
- Click: "Add another field"

**Field 4 - Excerpt:**
- Click: "Text"
- Name: `excerpt`
- Click: "Add another field"

**Field 5 - Author:**
- Click: "Text" 
- Name: `author`
- Click: "Finish"

**Wait for restart** (10 seconds)

## Step 2: Enable Public Permissions (30 seconds)

1. **Click**: "Settings" (left sidebar)
2. **Click**: "Users & Permissions Plugin" → "Roles"
3. **Click**: "Public"
4. **Scroll down to**: "Article" section
5. **Check**: ✅ find
6. **Check**: ✅ findOne
7. **Click**: "Save"

## Step 3: Test Integration

Run the automated script:
```bash
node scripts/setup-strapi-content.js
```

Should show:
- ✅ Connection successful!
- ✅ Created 3 sample articles
- 🎉 Content setup complete!

Then visit: http://helicontrade.local:3000/strapi-test

## 🎯 Expected Result

Your test page should show:
- ✅ **API Token**: Configured
- ✅ **Connection**: Connected  
- 📰 **Articles from Strapi (3 found)**

---

**Total time**: ~2 minutes + 30 seconds for automation script
