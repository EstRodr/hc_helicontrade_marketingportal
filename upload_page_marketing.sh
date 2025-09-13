#!/bin/bash

# Build the Nuxt.js marketing site
echo "Building marketing site for Cloudflare Pages..."
cd marketing-site

# Build specifically for Cloudflare Pages
pnpm run build:cloudflare

# Deploy to Cloudflare Pages
echo "Deploying to Cloudflare Pages..."
wrangler pages deploy dist --project-name=helicontrade-marketing-portal

echo "Deployment complete!"
echo "Site URL: https://helicontrade-marketing-portal.pages.dev"
echo "Latest deployment: https://$(cd dist && ls -1t | head -1).helicontrade-marketing-portal.pages.dev"
