#!/bin/bash

# Build the Nuxt.js marketing site
echo "Building marketing site for Cloudflare Pages..."
cd marketing-site

# Build specifically for Cloudflare Pages
pnpm run build:cloudflare

# Deploy to Cloudflare Pages
echo "Deploying to Cloudflare Pages..."
wrangler pages deploy dist --project-name=www-iris-admintrade

echo "Deployment complete!"
echo "Site URL: https://www-iris-admintrade.pages.dev"
echo "Custom domain: https://www.iris.thetradingcat.com (if configured)"
echo "You may need to manually add the custom domain in Cloudflare dashboard"
