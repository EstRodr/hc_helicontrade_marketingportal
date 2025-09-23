# Strapi Integration Troubleshooting

## Current Issue: 401 Unauthorized Error

The API token is returning a 401 error when trying to access `/api/articles`. This typically means:

1. **API Token is invalid or expired**
2. **Article content type doesn't exist** 
3. **Permissions not configured correctly**
4. **Strapi running in production mode** (content types can't be created)

## Step-by-Step Fix

### 1. Verify Strapi Admin Access
- Go to http://localhost:1337/admin
- Log in with your admin credentials
- Navigate to Settings → API Tokens

### 2. Check/Recreate API Token
- Delete the existing token if present
- Create a new Full Access token
- Copy the new token and update `.env` file

### 3. Create Article Content Type (if missing)
**Note: This only works in development mode**

If Strapi is in production mode:
- Stop Strapi server
- Restart in development mode: `npm run develop` or `yarn develop`

Then in admin panel:
1. Go to Content-Type Builder
2. Create Collection Type: "Article"
3. Add fields:
   - `title` (Text)
   - `slug` (UID, linked to title)
   - `content` (Rich Text)
   - `excerpt` (Text)
   - `author` (Text)
4. Save and restart

### 4. Configure Permissions
1. Go to Settings → Users & Permissions Plugin → Roles
2. Click on "Public" role
3. Under Article permissions, enable:
   - `find` (to list articles)
   - `findOne` (to get single article)
4. Save

### 5. Test API Access
```bash
curl -H "Authorization: Bearer YOUR_NEW_TOKEN" http://localhost:1337/api/articles
```

## Alternative: Mock Data Fallback

If you want to continue development while fixing Strapi, the marketing site has a mock data fallback that should work automatically when the real API fails.

## Current Environment
- Strapi URL: `http://localhost:1337`
- Current Token: `c437531...` (truncated)
- Status: 401 Unauthorized

## Next Steps
1. Check admin panel access
2. Verify/recreate API token  
3. Ensure Article content type exists
4. Configure proper permissions
5. Test API connection