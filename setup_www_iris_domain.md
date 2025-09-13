# Setup www.iris.thetradingcat.com Domain

The marketing portal has been deployed to the `www-iris-admintrade` project, but the custom domain needs to be manually configured.

## Current Status

✅ **Deployed to**: https://www-iris-admintrade.pages.dev  
❌ **Custom Domain**: www.iris.thetradingcat.com (needs manual setup)

## Manual Setup Steps

### Option 1: Using Cloudflare Dashboard (Recommended)

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Navigate to Pages > www-iris-admintrade

2. **Add Custom Domain**
   - Click on "Custom domains" tab
   - Click "Set up a custom domain"
   - Enter: `www.iris.thetradingcat.com`
   - Click "Continue"

3. **Configure DNS**
   - Make sure your DNS has a CNAME record:
     ```
     Type: CNAME
     Name: www
     Target: www-iris-admintrade.pages.dev
     ```

### Option 2: Using Cloudflare API (Advanced)

If you have API access, you can use curl:

```bash
# Get your Zone ID and API Token first
ZONE_ID="your_zone_id"
API_TOKEN="your_api_token"

# Add the custom domain
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/www-iris-admintrade/domains" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"name":"www.iris.thetradingcat.com"}'
```

## Verification

After setup, test both URLs:
- ✅ https://www-iris-admintrade.pages.dev (should work immediately)
- ✅ https://www.iris.thetradingcat.com (should work after DNS propagation)

## Notes

- DNS propagation can take up to 24 hours
- SSL certificates are automatically provisioned by Cloudflare
- The domain was previously working on this project, so it should be straightforward to add back

## Deployment Commands

```bash
# Deploy updates to the www-iris project
./upload_page_marketing.sh

# Or manually
cd marketing-site
wrangler pages deploy dist --project-name=www-iris-admintrade
```