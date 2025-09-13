# Environment Configuration Guide

This document explains how to manage different configurations for local development and Cloudflare Pages deployment.

## The Problem

You need different configurations for:
- **Local Development**: SSR enabled, local URLs, development tools
- **Cloudflare Pages**: Static generation, production URLs, optimized build

## Solution Options

### Option 1: Single Config with Environment Detection (Recommended)

The main `nuxt.config.ts` automatically detects the build environment and configures accordingly.

#### How it works:
```typescript
// Detect environment
const isProduction = process.env.NODE_ENV === 'production'
const isStaticBuild = process.env.NUXT_STATIC === 'true' || process.argv.includes('generate')

export default defineNuxtConfig({
  // Enable SSR for dev, disable for static builds
  ssr: !isStaticBuild,
  
  nitro: {
    // Use different presets based on build type
    preset: isStaticBuild ? 'cloudflare-pages' : 'node-server',
  },
  
  runtimeConfig: {
    public: {
      // Environment-specific URLs
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 
        (isProduction ? 'https://helicontrade-marketing-portal.pages.dev' : 'http://helicontrade.local:3002'),
    }
  }
})
```

#### Available Commands:
```bash
# Local development (SSR enabled)
pnpm run dev

# Build for Cloudflare (static generation)
pnpm run build:cloudflare

# Alternative: Use environment variables
NODE_ENV=production NUXT_STATIC=true pnpm run generate
```

#### Deployment:
```bash
# Uses environment detection
./upload_page_marketing.sh
```

### Option 2: Separate Configuration Files

Keep separate config files for different environments.

#### Files:
- `nuxt.config.ts` - Main config for local development
- `nuxt.config.cloudflare.ts` - Cloudflare-specific config

#### Available Commands:
```bash
# Local development
pnpm run dev

# Build using separate Cloudflare config
pnpm run build:cloudflare-config
```

#### Deployment:
```bash
# Uses separate config file
./upload_page_marketing_alt.sh
```

## Configuration Differences

### Local Development
```typescript
{
  ssr: true,                    // Enable SSR for better dev experience
  preset: 'node-server',        // Node.js development server
  devtools: { enabled: true },  // Enable Vue devtools
  siteUrl: 'http://helicontrade.local:3002',
  apiBase: 'http://api.helicontrade.local:8000'
}
```

### Cloudflare Pages
```typescript
{
  ssr: false,                   // Static generation
  preset: 'cloudflare-pages',   // Cloudflare Pages preset
  devtools: { enabled: false }, // Disable for production
  siteUrl: 'https://helicontrade-marketing-portal.pages.dev',
  apiBase: 'https://api.helicontrade.com'
}
```

## Environment Variables

You can override any configuration using environment variables:

### Development
```bash
# .env.local
NUXT_PUBLIC_SITE_URL=http://localhost:3002
NUXT_PUBLIC_API_BASE=http://localhost:8000
```

### Production
```bash
# Cloudflare Pages environment variables
NUXT_PUBLIC_SITE_URL=https://marketing.helicontrade.com
NUXT_PUBLIC_API_BASE=https://api.helicontrade.com
NUXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Testing the Configuration

### Test Local Development:
```bash
pnpm run dev
# Should start with SSR enabled at http://helicontrade.local:3002
```

### Test Cloudflare Build:
```bash
pnpm run build:cloudflare
# Should generate static files in dist/ folder
```

### Test Generated Site Locally:
```bash
cd dist
python3 -m http.server 8000
# Visit http://localhost:8000 to test static site
```

## Deployment Scripts Summary

| Script | Purpose | Config Used |
|--------|---------|-------------|
| `upload_page_marketing.sh` | Environment detection approach | `nuxt.config.ts` with env vars |
| `upload_page_marketing_alt.sh` | Separate config approach | `nuxt.config.cloudflare.ts` |
| `deploy.sh` | Quick deploy existing build | Any |

## Recommended Workflow

### For Development:
```bash
# Start development server
pnpm run dev

# The config automatically uses:
# - SSR enabled
# - Local URLs
# - Development tools enabled
```

### For Deployment:
```bash
# Build and deploy (recommended)
./upload_page_marketing.sh

# Or manually:
pnpm run build:cloudflare
wrangler pages deploy dist --project-name=helicontrade-marketing-portal
```

## Benefits of Each Approach

### Option 1 (Environment Detection):
✅ Single config file to maintain  
✅ Automatic environment detection  
✅ Less duplication  
✅ Easier to keep in sync  

### Option 2 (Separate Configs):
✅ Clear separation of concerns  
✅ No conditional logic in config  
✅ Easy to understand what each environment uses  
✅ Can have completely different configurations  

## Recommendation

Use **Option 1 (Environment Detection)** for most cases as it's easier to maintain and keeps configurations in sync. Use **Option 2 (Separate Configs)** if you need drastically different configurations or prefer explicit separation.