# HeliconTrade Development Setup

## Overview
This workspace contains the separated HeliconTrade architecture with dedicated marketing and trading applications.

## Project Structure
```
helicontrade-workspace/
├── marketing-site/          # Nuxt 3 marketing website (helicontrade.local:3002)
├── shared/                  # Shared utilities between projects
└── DEVELOPMENT_SETUP.md     # This file
```

## Local Development URLs
- **Marketing Site**: http://helicontrade.local:3002
- **Trading App**: http://app.helicontrade.local:5173 (original Vue app)

## Prerequisites
1. Node.js 18+ installed
2. pnpm installed globally
3. Local DNS entries configured (should be done already):
   ```
   127.0.0.1 helicontrade.local
   127.0.0.1 app.helicontrade.local
   ```

## Getting Started

### 1. Start Marketing Site
```bash
cd marketing-site
pnpm install
pnpm run dev
```
The marketing site will be available at: http://helicontrade.local:3002

### 2. Start Trading App (Original)
```bash
cd /Users/manalishashikantsawant/repo/heliconTradeVue
npm run dev
```
The trading app will be available at: http://app.helicontrade.local:5173

## Marketing Site Features

### Pages Available
- **Homepage** (`/`) - Hero section, features overview, stats
- **Features** (`/features`) - Detailed platform capabilities
- **Pricing** (`/pricing`) - Plan tiers and pricing information
- **About** (`/about`) - Company mission and values
- **Contact** (`/contact`) - Contact form and information
- **Privacy Policy** (`/legal/privacy`) - Privacy and data protection
- **Login** (`/login`) - Redirects to app.helicontrade.local:5173/auth/login
- **Register** (`/register`) - Redirects to app.helicontrade.local:5173/auth/register

### Key Features
✅ **SEO Optimized** - Proper meta tags, structured data ready
✅ **Responsive Design** - Mobile-first with Tailwind CSS
✅ **Dark Mode Support** - Automatic theme switching
✅ **Internationalization** - English, French, Arabic support
✅ **Marketing Attribution** - UTM tracking, referral codes
✅ **Performance Optimized** - Fast loading, minimal bundle
✅ **Authentication Flow** - Seamless redirect to trading app

### Technology Stack
- **Framework**: Nuxt 3 (SSR/SSG)
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Internationalization**: @nuxtjs/i18n
- **Dark Mode**: @nuxtjs/color-mode

## Authentication Flow

### User Journey
1. **Marketing Site Visit**: User lands on helicontrade.local:3002
2. **Attribution Tracking**: UTM params and referrals automatically tracked
3. **CTA Click**: User clicks "Get Started" or "Login"
4. **Redirect**: Seamless redirect to app.helicontrade.local:5173
5. **Authentication**: User completes auth on trading app
6. **Attribution Processing**: Marketing data processed for analytics

### Technical Implementation
```typescript
// Marketing site redirects
function redirectToLogin() {
  // Store marketing attribution
  const attribution = extractMarketingParams()
  setMarketingAttribution(attribution)
  
  // Redirect to app
  window.location.href = 'http://app.helicontrade.local:5173/auth/login'
}

// Trading app processes attribution
onAuthSuccess((token) => {
  // Store auth token
  setAuthToken(token)
  
  // Process marketing attribution
  const attribution = getMarketingAttribution()
  if (attribution) {
    sendToAnalytics(attribution)
    clearMarketingAttribution()
  }
  
  // Redirect to dashboard
  router.push('/dashboard')
})
```

## Development Workflow

### Daily Development
```bash
# Terminal 1 - Marketing Site
cd helicontrade-workspace/marketing-site
pnpm run dev

# Terminal 2 - Trading App (when needed)
cd /Users/manalishashikantsawant/repo/heliconTradeVue
npm run dev
```

### Testing the Flow
1. Visit http://helicontrade.local:3002
2. Navigate through marketing pages
3. Click "Get Started" or "Login"
4. Verify redirect to app.helicontrade.local:5173
5. Test attribution tracking in browser console

### Adding Marketing Content
1. **New Pages**: Create in `marketing-site/pages/`
2. **Components**: Add to `marketing-site/components/`
3. **Styling**: Use Tailwind classes + custom CSS in `assets/css/base.css`
4. **SEO**: Add proper meta tags using `useHead()`

## Performance Optimizations

### Built-in Optimizations
- **Static Site Generation** for marketing pages
- **Image Optimization** (ready for @nuxt/image)
- **CSS Purging** via Tailwind
- **Bundle Splitting** automatic with Nuxt
- **Preloading** for critical resources

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

## Next Steps (Phase 2)

### When Ready to Clean Vue App
1. Remove public routes from Vue router
2. Remove marketing components from Vue app
3. Simplify authentication flow in Vue app
4. Test complete separation

### Future Enhancements
- [ ] Add CMS integration (Strapi)
- [ ] Implement Google Analytics
- [ ] Add cookie consent management
- [ ] Set up A/B testing
- [ ] Add blog functionality
- [ ] Implement lead scoring

## Troubleshooting

### Common Issues
1. **DNS not working**: Verify `/etc/hosts` entries
2. **Port conflicts**: Ensure ports 3002 and 5173 are available
3. **Module not found**: Run `pnpm install` in marketing-site
4. **Redirect not working**: Check runtime config URLs

### Development Tools
- **Nuxt DevTools**: Available at http://helicontrade.local:3002
- **Vue DevTools**: For debugging components
- **Tailwind Inspector**: For styling debugging

## Production Readiness

### Current Status ✅
- [x] Local development environment
- [x] Modern Nuxt 3 setup  
- [x] Responsive design
- [x] SEO foundation
- [x] Authentication integration
- [x] Performance optimized

### Production TODO 🚧
- [ ] CMS integration
- [ ] Analytics implementation  
- [ ] Cookie consent
- [ ] SSL certificates
- [ ] CDN configuration
- [ ] Monitoring setup

This setup provides a solid foundation for enterprise-ready marketing and trading applications with clean separation of concerns and optimized user experience.
