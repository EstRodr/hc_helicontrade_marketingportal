#!/bin/bash

# Alternative deployment script using separate Cloudflare config
# This uses nuxt.config.cloudflare.ts instead of environment variables

echo "Building marketing site for Cloudflare Pages (using separate config)..."
cd marketing-site

# Build using Cloudflare-specific config
pnpm run build:cloudflare-config

# Deploy to Cloudflare Pages
echo "Deploying to Cloudflare Pages..."
wrangler pages deploy dist --project-name=helicontrade-marketing-portal

echo "Deployment complete!"
echo "Site URL: https://helicontrade-marketing-portal.pages.dev"