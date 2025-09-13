# HeliconTrade Marketing Portal - Cloudflare Pages Deployment

This document explains how to deploy the HeliconTrade Marketing Portal to Cloudflare Pages.

## Project Structure

```
hc_helicontrade_marketingportal/
├── marketing-site/          # Nuxt.js application
│   ├── nuxt.config.ts      # Configured for Cloudflare Pages
│   ├── package.json
│   └── dist/               # Build output (generated)
├── upload_page_marketing.sh # Full build and deploy script
├── deploy.sh               # Quick deploy script (assumes build exists)
├── setup_domain_marketing.sh # Custom domain setup
└── DEPLOYMENT.md           # This file
```

## Prerequisites

1. **Wrangler CLI** - Cloudflare's command-line tool
   ```bash
   npm install -g wrangler
   # or
   pnpm install -g wrangler
   ```

2. **Authentication** - Login to Cloudflare
   ```bash
   wrangler login
   ```

3. **Dependencies** - Install project dependencies
   ```bash
   cd marketing-site
   pnpm install
   ```

## Deployment Options

### Option 1: Full Build and Deploy (Recommended)

Use this script for complete builds from scratch:

```bash
./upload_page_marketing.sh
```

This script will:
1. Navigate to the `marketing-site` directory
2. Run `pnpm run generate` to build the static site
3. Deploy the `dist` directory to Cloudflare Pages
4. Display the deployment URLs

### Option 2: Quick Deploy

If you've already built the site and just want to redeploy:

```bash
./deploy.sh
```

### Option 3: Manual Commands

```bash
# Build the site
cd marketing-site
pnpm run generate

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=helicontrade-marketing-portal
```

## Cloudflare Pages Configuration

The project is configured with:

- **Project Name**: `helicontrade-marketing-portal`
- **Build Command**: `pnpm run generate`
- **Build Output Directory**: `dist`
- **Framework Preset**: Nuxt.js (static)

### Nuxt.js Configuration

The `nuxt.config.ts` is configured for Cloudflare Pages with:

```typescript
{
  nitro: {
    preset: 'cloudflare-pages',
    compatibilityDate: '2025-08-26',
  },
  ssr: false,
  target: 'static',
}
```

## Custom Domain Setup

To add a custom domain (e.g., `marketing.helicontrade.com`):

1. **Update the domain in the script**:
   Edit `setup_domain_marketing.sh` and change:
   ```bash
   CUSTOM_DOMAIN="your-domain.com"
   ```

2. **Run the domain setup script**:
   ```bash
   ./setup_domain_marketing.sh
   ```

3. **Update DNS records**:
   Add a CNAME record in your DNS provider:
   ```
   Type: CNAME
   Name: marketing (or @ for root domain)
   Value: helicontrade-marketing-portal.pages.dev
   ```

## Access URLs

- **Default Cloudflare URL**: https://helicontrade-marketing-portal.pages.dev
- **Latest Deployment**: The deployment command will show the specific URL
- **Custom Domain**: https://your-custom-domain.com (after DNS setup)

## Environment Variables

If you need environment variables for different environments:

```bash
# Set environment variables
wrangler pages secret put VARIABLE_NAME --project-name=helicontrade-marketing-portal
```

## Troubleshooting

### Build Issues

1. **Node.js compatibility warning**: This is expected for Cloudflare Pages and can be ignored
2. **Prerendering warnings**: Normal for static sites with `ssr: false`

### Deployment Issues

1. **Authentication**: Make sure you're logged in with `wrangler login`
2. **Project name conflicts**: Each project name must be unique across Cloudflare
3. **Build errors**: Check the `marketing-site/dist` directory exists after build

### Performance Optimization

The current build generates:
- ~80+ static files
- Optimized assets with gzip compression
- Route-based code splitting
- Static HTML for all pages

## Comparison with heliconTradeVue

This deployment setup mirrors the heliconTradeVue project:
- Uses the same Cloudflare Pages approach
- Similar script structure (`upload_page_*.sh`)
- Compatible domain management
- Same deployment patterns

## Next Steps

1. **Test the deployment**: Visit https://helicontrade-marketing-portal.pages.dev
2. **Set up custom domain**: Run `./setup_domain_marketing.sh` and configure DNS
3. **Set up CI/CD**: Consider connecting to Git for automatic deployments
4. **Configure environments**: Set up separate projects for staging/production if needed