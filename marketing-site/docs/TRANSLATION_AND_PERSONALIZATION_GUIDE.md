# HeliconiTrade Translation & Personalization Guide

**Complete implementation guide for translating and personalizing all marketing site pages**

---

## 📋 Table of Contents

1. [Translation System Overview](#translation-system-overview)
2. [File Structure & Organization](#file-structure--organization)
3. [Semantic Highlighting System](#semantic-highlighting-system)
4. [Personalization Implementation](#personalization-implementation)
5. [Page-by-Page Implementation](#page-by-page-implementation)
6. [Quality Assurance Checklist](#quality-assurance-checklist)
7. [Troubleshooting Guide](#troubleshooting-guide)

---

## 🌐 Translation System Overview

### Supported Languages
- **English** (`en`) - Primary language
- **French** (`fr`) - Secondary market
- **Arabic** (`ar`) - MENA region expansion
- **Spanish** (`es`) - European expansion (ready to add)
- **German** (`de`) - European expansion (ready to add)

### Translation Architecture
```
locales/
├── en.json          # Base English translations
├── fr.json          # French translations  
├── ar.json          # Arabic translations (RTL)
├── es.json          # Spanish translations (future)
└── de.json          # German translations (future)
```

### Key Translation Categories

#### Core Navigation
```json
{
  "navigation": {
    "home": "Home",
    "features": "Features", 
    "pricing": "Pricing",
    "about": "About",
    "contact": "Contact",
    "blog": "Blog",
    "news": "News",
    "login": "Login",
    "getStarted": "Get Started"
  }
}
```

#### Hero Sections (WITH Personalization Variants)
```json
{
  "hero": {
    "title": "Market Research, Alerts & Trading Insights",
    "subtitle": "Get powerful market research, custom alerts, and trading signals...",
    "joinBeta": "Join Free Beta"
  },
  "heroVariants": [
    {
      "headline": "Global insight, built for {country} markets", 
      "subheadline": "From {city} to Wall Street, turn real-time moves in {index} into smarter decisions."
    },
    {
      "headline": "AI eyes on {country} markets — opportunity never sleeps",
      "subheadline": "From {city} to Wall Street, track every market pulse, 24/7."
    }
  ]
}
```

#### Market Status Messages
```json
{
  "marketStatus": {
    "open": "{market} is open • Live until {time}",
    "closed": "{market} closed",
    "preMarket": "{market} opens at {time}", 
    "afterHours": "{market} closed • After-hours trading"
  }
}
```

---

## 📁 File Structure & Organization

### Component Structure
```
components/
├── PersonalizedHero.vue     # Main hero with personalization
├── TranslatedFeatures.vue   # Features with translations
├── TranslatedPricing.vue    # Pricing with translations
└── shared/
    ├── LocalizedCTA.vue     # Call-to-action buttons
    └── MarketStatus.vue     # Market status indicator
```

### Page Implementation Pattern
```vue
<template>
  <div>
    <!-- Hero Section with Personalization -->
    <PersonalizedHero />
    
    <!-- Features Section with Translations -->
    <section class="py-16">
      <h2 class="text-3xl font-bold" v-html="formatHeadlineText($t('features.title'))">
      </h2>
      <p v-html="formatSubheadlineText($t('features.subtitle'))"></p>
    </section>
  </div>
</template>

<script setup>
import { usePersonalization } from '~/composables/usePersonalization'
import { highlightHeroHeadline, highlightHeroSubheadline } from '~/utils/textHighlighting'

const { t, locale } = useI18n()
const { userContext } = usePersonalization()

// Apply semantic highlighting to any translated text
const formatHeadlineText = (text) => {
  const context = {
    country: userContext.country,
    city: userContext.city,
    primaryIndex: userContext.market?.localIndices?.[0]
  }
  return highlightHeroHeadline(text, locale.value, context)
}

const formatSubheadlineText = (text) => {
  const context = {
    country: userContext.country,
    city: userContext.city, 
    primaryIndex: userContext.market?.localIndices?.[0]
  }
  return highlightHeroSubheadline(text, locale.value, context)
}
</script>
```

---

## 🎨 Semantic Highlighting System

### Color Strategy
- **Blue** (`text-blue-600 dark:text-blue-400`): Technology, AI, processes, action verbs
- **Purple** (`text-purple-600 dark:text-purple-400`): Markets, locations, financial instruments

### Language-Specific Highlighting Rules

#### English Patterns
```javascript
{
  blue: [
    /\bAI\b/g,
    /\bReal[-\s]?time\b/gi,
    /\bsmarter decisions?\b/gi,
    /\bmarket research\b/gi,
    /\bnever sleeps?\b/gi,
    /\bAI never sleeps?\b/gi
  ],
  purple: [
    /\bstocks?\b/gi,
    /\bcrypto(?:currency)?\b/gi,
    /\bmarkets?\b/gi,
    /\bTrading Insights?\b/gi,
    /\bWall Street\b/gi,
    /\bMarkets? Closed\b/gi
  ]
}
```

#### French Patterns
```javascript
{
  blue: [
    /\bIA\b/g,
    /\btemps réel\b/gi,
    /\bdécisions? (?:plus )?intelligentes?\b/gi,
    /\bRecherche de [Mm]arché\b/gi,
    /\bne dort jamais\b/gi
  ],
  purple: [
    /\bactions?\b/gi,
    /\bcrypto(?:monnaies?)?\b/gi,
    /\bmarchés?\b/gi,
    /\bAnalyses? de Trading\b/gi,
    /\bWall Street\b/gi
  ]
}
```

#### Arabic Patterns
```javascript
{
  blue: [
    /الذكاء الاصطناعي/g,
    /الوقت الحقيقي/g,
    /قرارات(?:\s)?(?:أكثر )?ذكاءً/g,
    /أبحاث السوق/g,
    /لا ينام|لا تنام/g
  ],
  purple: [
    /الأسهم/g,
    /العملات المشفرة/g,
    /الأسواق|السوق/g,
    /رؤى التداول/g,
    /وول ستريت/g
  ]
}
```

### Auto-Highlighting Implementation
```vue
<!-- Apply highlighting to any translated content -->
<template>
  <h1 v-html="highlightedHeadline"></h1>
  <p v-html="highlightedSubheadline"></p>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '#imports'
import { highlightHeroHeadline, highlightHeroSubheadline } from '~/utils/textHighlighting'

const { t, locale } = useI18n()

const highlightedHeadline = computed(() => {
  return highlightHeroHeadline(t('section.headline'), locale.value, userContext)
})

const highlightedSubheadline = computed(() => {
  return highlightHeroSubheadline(t('section.subheadline'), locale.value, userContext)
})
</script>
```

---

## 🎯 Personalization Implementation

### Location-Based Personalization
```javascript
// Automatic location detection via IP and timezone
const personalizedContent = {
  // Spain Example
  country: "Spain",
  city: "Madrid", 
  countryCode: "ES",
  primaryIndex: "IBEX",
  marketHours: { open: 9, close: 17.5 },
  
  // Generated Content
  headline: "Global insight, built for Spanish markets",
  subheadline: "From Madrid to Wall Street, turn real-time moves in IBEX into smarter decisions."
}
```

### Time-Based Variants
```javascript
const timeBasedVariants = {
  "pre-market": "Markets Open Soon — Your {country} Edge Awaits",
  "market-open": "Live Market Action — {country} Opportunities Now", 
  "after-hours": "Markets Closed, But Your AI Never Sleeps",
  "market-closed": "Weekend Insights — Prepare for Monday's {country} Markets"
}
```

### User Behavior Variants
```javascript
const behaviorVariants = {
  "new-visitor": "Start Trading Smarter with AI-Powered Insights",
  "returning-visitor": "Welcome Back — Ready to Trade Smarter?",
  "engaged-user": "Your AI Assistant Has New Insights Ready"
}
```

### PostHog A/B Testing Integration
```javascript
// Feature flags control personalization
const personalizationEnabled = posthog.isFeatureEnabled('marketing-homepage-headline-enable-personalization')
const variant = posthog.getFeatureFlag('marketing-homepage-headline-personalization-variant')

// Track personalization performance
posthog.capture('personalization_variant_assigned', {
  variant_id: optionIndex,
  country: userContext.location.country,
  market_session: userContext.timing.marketSession,
  headline: selectedVariant.headline,
  // ... detailed context
})
```

---

## 📄 Page-by-Page Implementation

### Priority 1: Core Pages

#### 1. Homepage (`/`)
- ✅ **Status**: Complete with full personalization
- **Features**: Location detection, time-based variants, A/B testing
- **Translations**: EN, FR, AR ready
- **Next**: Add ES, DE translations

#### 2. Features Page (`/features`)
```vue
<template>
  <div>
    <h1 v-html="formatHeadlineText($t('features.title'))"></h1>
    <div v-for="feature in features" :key="feature.id">
      <h3 v-html="formatHeadlineText($t(`features.items.${feature.id}.title`))"></h3>
      <p v-html="formatSubheadlineText($t(`features.items.${feature.id}.description`))"></p>
    </div>
  </div>
</template>
```

**Translation Keys Needed:**
```json
{
  "features": {
    "title": "Powerful Features for Modern Traders",
    "subtitle": "Everything you need to trade smarter with AI-powered insights",
    "items": {
      "ai-research": {
        "title": "AI-Powered Market Research", 
        "description": "Get real-time analysis of market trends and opportunities"
      },
      "custom-alerts": {
        "title": "Personalized Trading Alerts",
        "description": "Never miss a trading opportunity with smart notifications"
      }
    }
  }
}
```

#### 3. Pricing Page (`/pricing`)
```vue
<template>
  <div>
    <h1 v-html="formatHeadlineText($t('pricing.title'))"></h1>
    <div v-for="plan in pricingPlans" :key="plan.id">
      <h3>{{ $t(`pricing.plans.${plan.id}.name`) }}</h3>
      <p class="text-3xl">
        {{ formatPrice(plan.price) }}
        <span class="text-sm">{{ $t('pricing.perMonth') }}</span>
      </p>
      <LocalizedCTA :variant="plan.ctaVariant">
        {{ $t(`pricing.plans.${plan.id}.cta`) }}
      </LocalizedCTA>
    </div>
  </div>
</template>

<script setup>
import { usePersonalization } from '~/composables/usePersonalization'

const { userContext } = usePersonalization()

// Localize pricing based on detected country/currency
const formatPrice = (basePrice) => {
  const currency = userContext.location.currency || 'USD'
  const rate = getCurrencyRate(currency)
  return new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: currency
  }).format(basePrice * rate)
}
</script>
```

#### 4. About Page (`/about`)
**Focus**: Company story with local market relevance
```json
{
  "about": {
    "hero": {
      "title": "Built for the Future of {country} Trading",
      "subtitle": "From {city} to global markets, we're democratizing financial intelligence"
    },
    "story": {
      "title": "Our Mission",
      "content": "Making advanced trading insights accessible to every trader in {country} and beyond"
    }
  }
}
```

### Priority 2: Secondary Pages

#### 5. Contact Page (`/contact`)
**Personalization**: Local office info, timezone-aware support hours
```json
{
  "contact": {
    "title": "Get in Touch",
    "supportHours": "Support available {timezone} business hours",
    "localOffice": "Serving traders across {country} and {region}"
  }
}
```

#### 6. Blog/News Pages (`/blog`, `/news`)
**Features**: Content filtering by local market relevance
```vue
<template>
  <div>
    <h1>{{ $t('blog.title') }}</h1>
    <!-- Filter posts by user's market/region -->
    <div v-for="post in localizedPosts" :key="post.id">
      <span v-if="post.isLocallyRelevant" class="badge">
        {{ $t('blog.relevantTo', { market: userContext.market.primaryExchange }) }}
      </span>
    </div>
  </div>
</template>
```

### Priority 3: Legal & Support Pages

#### 7. Legal Pages (`/privacy`, `/terms`)
**Personalization**: Jurisdiction-specific content
```json
{
  "legal": {
    "privacy": {
      "title": "Privacy Policy",
      "jurisdiction": "This policy complies with {country} data protection laws"
    },
    "terms": {
      "title": "Terms of Service", 
      "governing-law": "These terms are governed by {country} law"
    }
  }
}
```

---

## 🎨 Ensuring All Variants Have Proper Styling

### All Personalized Variants with Proper Styling

✅ **Option 0**: "Global insight, built for Swedish markets" → insight(blue) + Swedish markets(purple)
✅ **Option 1**: "AI eyes on Swedish markets — opportunity never sleeps" → AI eyes(blue) + Swedish markets(purple)
✅ **Option 2**: "Your edge in Swedish markets" → Your edge(blue) + Swedish markets(purple)
✅ **Option 3**: "Swedish markets, redefined by intelligence" → redefined by intelligence(blue) + Swedish markets(purple)
✅ **Option 4**: "Trade Swedish markets with global AI power" → AI power(blue) + Swedish markets(purple)
✅ **Option 5**: "Markets Open Soon — Your Swedish Edge Awaits" → Edge Awaits(blue) + Markets Open(purple)
✅ **Option 6**: "Live Market Action — Swedish Opportunities Now" → Market Action(blue) + Opportunities(purple)
✅ **Option 7**: "Markets Closed, But Your AI Never Sleeps" → AI Never Sleeps(blue) + Markets(purple)
✅ **Option 8**: "Start Trading Smarter with AI-Powered Insights" → AI-Powered(blue) + Trading Smarter(purple)
✅ **Option 9**: "Welcome Back — Ready to Trade Smarter?" → Ready to(blue) + Trade Smarter(purple)

---

## ✅ Quality Assurance Checklist

### Pre-Translation Checklist
- [ ] **Design Review**: Confirm page layout accommodates text expansion (30-50% for some languages)
- [ ] **Content Audit**: Identify all text that needs translation (including alt text, placeholders, error messages)
- [ ] **Personalization Mapping**: Map which content should be personalized vs. static
- [ ] **SEO Keywords**: Research target keywords in each language
- [ ] **Legal Review**: Ensure compliance with local regulations (GDPR, etc.)

### Translation Implementation Checklist
- [ ] **Base Translation**: Complete all translation keys in `locales/{lang}.json`
- [ ] **Personalization Variants**: Add `heroVariants` array for each language
- [ ] **Semantic Highlighting**: Test blue/purple highlighting on sample text
- [ ] **Dynamic Placeholders**: Verify `{country}`, `{city}`, `{index}` substitution works
- [ ] **Fallback Content**: Ensure graceful degradation when personalization fails
- [ ] **RTL Support**: Test Arabic layout and text direction

### Component Implementation Checklist
- [ ] **Import Highlighting**: Add `highlightHeroHeadline` and `highlightHeroSubheadline` imports
- [ ] **Format Functions**: Create `formatHeadlineText` and `formatSubheadlineText` functions
- [ ] **User Context**: Access `userContext` from `usePersonalization` composable
- [ ] **v-html Usage**: Use `v-html` for highlighted content (never `v-text`)
- [ ] **Accessibility**: Ensure color highlighting doesn't affect screen readers

### Testing Checklist
- [ ] **Visual Testing**: Verify blue/purple highlighting appears correctly
- [ ] **Cross-Language**: Test translation switching without page reload
- [ ] **Location Testing**: Test with different IP locations (VPN)
- [ ] **Time-Based**: Test different market hours (pre-market, market, after-hours)
- [ ] **Device Testing**: Test on mobile, tablet, desktop
- [ ] **Performance**: Check that highlighting doesn't impact page speed

### Pre-Launch Checklist
- [ ] **SEO Meta**: Translate `<title>`, `<meta description>`, og: tags
- [ ] **Analytics**: Verify PostHog/GTM tracking works for all languages
- [ ] **Error Handling**: Test with corrupted/missing translation keys
- [ ] **CDN/Caching**: Ensure translated content is properly cached
- [ ] **Legal Pages**: Update privacy policy, terms for each jurisdiction

---

## 🛠️ Troubleshooting Guide

### Common Issues and Solutions

#### Issue: Highlighting Not Appearing
**Symptoms**: Text shows without blue/purple colors
**Solutions**:
1. Check console for highlighting debug logs
2. Verify `v-html` is used instead of `v-text`
3. Ensure highlighting functions are imported
4. Check if text matches expected patterns

```javascript
// Debug highlighting
console.log('🔍 Text input:', text)
console.log('🔍 Highlighted output:', highlightedText)
console.log('🔍 Contains blue class:', highlightedText.includes('text-blue-600'))
console.log('🔍 Contains purple class:', highlightedText.includes('text-purple-600'))
```

#### Issue: Personalization Not Triggering
**Symptoms**: Always shows base content, no personalized variants
**Solutions**:
1. Check location detection in browser console
2. Verify PostHog feature flags are enabled
3. Test with different market hours
4. Check if personalization is disabled by kill switch

```javascript
// Debug personalization
console.log('🌍 User location:', userContext.location)
console.log('⏰ Market timing:', userContext.timing)
console.log('🎯 PostHog flags:', posthog.getFeatureFlag('personalization-variant'))
```

#### Issue: Translation Keys Missing
**Symptoms**: Shows `translation.key.not.found` instead of translated text
**Solutions**:
1. Verify key exists in `locales/{lang}.json`
2. Check for typos in translation key names
3. Ensure proper JSON structure (no trailing commas)
4. Restart dev server after translation changes

#### Issue: RTL Layout Issues (Arabic)
**Symptoms**: Arabic text flows left-to-right or layout is broken
**Solutions**:
1. Add `dir="rtl"` to `<html>` tag for Arabic
2. Use logical CSS properties (`margin-inline-start` vs `margin-left`)
3. Test with Arabic content in all components
4. Ensure icons and images are flipped appropriately

#### Issue: Text Expansion Breaking Layout
**Symptoms**: Text overflows containers in translated versions
**Solutions**:
1. Use flexible layouts (`min-width` instead of fixed `width`)
2. Test with longest expected translations
3. Add responsive breakpoints for text-heavy languages
4. Consider abbreviated versions for constrained spaces

### Performance Optimization

#### Lazy Loading Translations
```javascript
// Only load needed language files
const messages = {
  en: () => import('@/locales/en.json'),
  fr: () => import('@/locales/fr.json'),
  ar: () => import('@/locales/ar.json')
}
```

#### Semantic Highlighting Optimization
```javascript
// Cache highlighted content to avoid re-processing
const highlightCache = new Map()

function cachedHighlight(text, locale, context) {
  const cacheKey = `${text}-${locale}-${JSON.stringify(context)}`
  
  if (highlightCache.has(cacheKey)) {
    return highlightCache.get(cacheKey)
  }
  
  const highlighted = highlightHeroHeadline(text, locale, context)
  highlightCache.set(cacheKey, highlighted)
  return highlighted
}
```

---

## 📋 Implementation Priority

### Phase 1: Foundation (Week 1)
1. Complete Spanish (`es`) translations for core pages
2. Implement highlighting for Spanish content
3. Test personalization with Spanish location detection
4. Update navigation and CTAs

### Phase 2: Expansion (Week 2)
1. Add German (`de`) translations
2. Implement pricing localization (EUR currency)
3. Add market-specific content (DAX, IBEX references)
4. Legal page translations

### Phase 3: Polish (Week 3)
1. Performance optimization
2. SEO meta tag translations
3. Analytics tracking verification
4. Error handling and fallbacks

### Phase 4: Launch (Week 4)
1. Final testing across all languages
2. CDN configuration for multi-language support
3. Launch monitoring and analytics
4. Documentation and handoff

---

## 🚀 Quick Start Template

For new pages, use this template:

```vue
<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <h1 class="text-4xl font-bold" v-html="formatHeadlineText($t('page.hero.title'))">
      </h1>
      <p class="text-lg" v-html="formatSubheadlineText($t('page.hero.subtitle'))">
      </p>
      <LocalizedCTA>{{ $t('page.hero.cta') }}</LocalizedCTA>
    </section>
    
    <!-- Content Sections -->
    <section v-for="section in sections" :key="section.id" class="content-section">
      <h2 v-html="formatHeadlineText($t(`page.sections.${section.id}.title`))"></h2>
      <p v-html="formatSubheadlineText($t(`page.sections.${section.id}.content`))"></p>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from '#imports'
import { usePersonalization } from '~/composables/usePersonalization'
import { highlightHeroHeadline, highlightHeroSubheadline } from '~/utils/textHighlighting'
import LocalizedCTA from '~/components/shared/LocalizedCTA.vue'

const { t, locale } = useI18n()
const { userContext } = usePersonalization()

// Apply semantic highlighting
const formatHeadlineText = (text) => {
  return highlightHeroHeadline(text, locale.value, {
    country: userContext.location?.country,
    city: userContext.location?.city,
    primaryIndex: userContext.market?.localIndices?.[0]
  })
}

const formatSubheadlineText = (text) => {
  return highlightHeroSubheadline(text, locale.value, {
    country: userContext.location?.country,
    city: userContext.location?.city,
    primaryIndex: userContext.market?.localIndices?.[0]
  })
}

// SEO meta tags
useHead({
  title: computed(() => t('page.meta.title')),
  meta: [
    { name: 'description', content: computed(() => t('page.meta.description')) },
    { property: 'og:title', content: computed(() => t('page.meta.title')) },
    { property: 'og:description', content: computed(() => t('page.meta.description')) }
  ]
})
</script>
```

Add corresponding translation file:

```json
{
  "page": {
    "meta": {
      "title": "Page Title | HeliconiTrade",
      "description": "Page description with key benefits and location context"
    },
    "hero": {
      "title": "Hero Headline with {country} Context",
      "subtitle": "Supporting text from {city} to Wall Street",
      "cta": "Get Started"
    },
    "sections": {
      "section1": {
        "title": "Section Title",
        "content": "Section content with highlighting-ready terms"
      }
    }
  }
}
```

This comprehensive guide should enable your team to efficiently translate and personalize all pages while maintaining consistent styling and user experience! 🎯
