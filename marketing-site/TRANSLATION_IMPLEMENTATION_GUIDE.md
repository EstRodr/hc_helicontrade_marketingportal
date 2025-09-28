# 🌍 Translation Implementation Guide - Marketing Site

## 📋 **Overview**

Complete guide for implementing consistent translations and internationalization across all marketing site pages, based on our successful homepage personalization implementation.

---

## 🗝️ **Translation Key Structure & Best Practices**

### **File Organization**
```
locales/
├── en.json     # English (primary) - 100% complete
├── fr.json     # French - implement next
├── ar.json     # Arabic (RTL) - future
└── es.json     # Spanish - future
```

### **Key Naming Convention**
```json
{
  "page": {
    "section": {
      "component": "Translation text with {placeholder} support"
    }
  }
}
```

**Examples:**
```json
{
  "hero": {
    "title": "Base headline text",
    "subtitle": "Base subheadline text",
    "cta": "Call to action text"
  },
  "features": {
    "title": "Features section title",
    "items": [
      {
        "title": "Feature 1 title",
        "description": "Feature 1 description"
      }
    ]
  },
  "pricing": {
    "title": "Pricing Plans",
    "monthly": "Monthly",
    "yearly": "Yearly"
  }
}
```

---

## 🎨 **Semantic Highlighting Implementation**

### **Required Functions**
Import these highlighting functions on every page:
```typescript
import { highlightHeroHeadline, highlightHeroSubheadline, getUserContextForHighlighting } from '~/utils/textHighlighting'
```

### **Page Implementation Pattern**
```vue
<!-- Any marketing page -->
<template>
  <section class="hero">
    <h1 v-html="highlightedTitle" class="text-4xl font-bold"></h1>
    <p v-html="highlightedSubtitle" class="text-xl"></p>
  </section>
</template>

<script setup>
const { t, locale } = useI18n()
const { userContext } = usePersonalization()

// Get translations
const rawTitle = t('page.hero.title')
const rawSubtitle = t('page.hero.subtitle')

// Apply semantic highlighting
const highlightContext = getUserContextForHighlighting(userContext, locale.value)
const highlightedTitle = highlightHeroHeadline(rawTitle, locale.value, highlightContext)
const highlightedSubtitle = highlightHeroSubheadline(rawSubtitle, locale.value, highlightContext)
</script>
```

### **Color Rules - MANDATORY**
Every page MUST follow the blue-purple highlighting pattern:
- **Blue** (`text-blue-600 dark:text-blue-400`): Action/Process/Technology terms
- **Purple** (`text-purple-600 dark:text-purple-400`): Market/Location/Entity terms
- **Every headline needs exactly 1 blue + 1 purple highlight**

---

## 📄 **Page-by-Page Implementation Checklist**

### **✅ Homepage** - COMPLETED
- [x] Semantic highlighting working
- [x] Personalization variants
- [x] Multi-language support (EN/FR/AR)
- [x] PostHog A/B testing integration

### **📋 Pages to Implement:**

#### **1. About Page (`/about`)**
```json
// locales/en.json
{
  "about": {
    "hero": {
      "title": "About {companyName}",
      "subtitle": "Building the future of {industry} with {technology}"
    },
    "mission": {
      "title": "Our Mission",
      "description": "Empowering traders with AI-powered insights"
    },
    "team": {
      "title": "Meet the Team",
      "description": "Experienced professionals from {locations}"
    }
  }
}
```

#### **2. Features Page (`/features`)**
```json
// locales/en.json
{
  "features": {
    "hero": {
      "title": "Powerful Features for Modern Traders",
      "subtitle": "Everything you need to trade smarter with AI"
    },
    "list": [
      {
        "title": "Real-time Market Analysis",
        "description": "AI scans markets 24/7"
      },
      {
        "title": "Smart Alerts",
        "description": "Get notified of opportunities instantly"
      }
    ]
  }
}
```

#### **3. Pricing Page (`/pricing`)**
```json
// locales/en.json
{
  "pricing": {
    "hero": {
      "title": "Simple Pricing for Everyone",
      "subtitle": "Start free, upgrade when you're ready"
    },
    "plans": [
      {
        "name": "Free",
        "price": "0",
        "features": ["Basic alerts", "Limited analysis"]
      },
      {
        "name": "Pro",
        "price": "29",
        "features": ["Unlimited alerts", "Full AI analysis"]
      }
    ]
  }
}
```

#### **4. Contact Page (`/contact`)**
```json
// locales/en.json
{
  "contact": {
    "hero": {
      "title": "Get in Touch",
      "subtitle": "We'd love to hear from you"
    },
    "form": {
      "name": "Your Name",
      "email": "Email Address",
      "message": "Message",
      "send": "Send Message"
    }
  }
}
```

---

## 🔧 **Implementation Steps for Each Page**

### **Step 1: Create Translation Keys**
Add translation keys to all locale files (`en.json`, `fr.json`, `ar.json`)

### **Step 2: Update Page Component**
```vue
<script setup>
// Add i18n and personalization
const { t, locale } = useI18n()
const { userContext } = usePersonalization()

// Import highlighting functions
import { highlightHeroHeadline, highlightHeroSubheadline, getUserContextForHighlighting } from '~/utils/textHighlighting'

// Get user context for highlighting
const highlightContext = computed(() => 
  getUserContextForHighlighting(userContext, locale.value)
)

// Create highlighted content
const highlightedTitle = computed(() => 
  highlightHeroHeadline(t('page.hero.title'), locale.value, highlightContext.value)
)

const highlightedSubtitle = computed(() => 
  highlightHeroSubheadline(t('page.hero.subtitle'), locale.value, highlightContext.value)
)
</script>
```

### **Step 3: Update Template**
```vue
<template>
  <div>
    <!-- Use v-html for highlighted content -->
    <h1 v-html="highlightedTitle" class="text-4xl font-bold text-gray-900 dark:text-white"></h1>
    <p v-html="highlightedSubtitle" class="text-xl text-gray-600 dark:text-gray-300"></p>
    
    <!-- Regular translations without highlighting -->
    <button>{{ t('page.cta.button') }}</button>
  </div>
</template>
```

### **Step 4: Test Multi-language**
- Test with English, French, Arabic
- Verify highlighting works in all languages
- Check RTL layout for Arabic

---

## 🌐 **Placeholder System**

### **Dynamic Placeholders**
Use consistent placeholders across all languages:
```json
{
  "welcome": "Welcome to {siteName}",
  "location": "Serving {city}, {country}",
  "market": "Track {index} and {marketCount} other markets",
  "time": "Markets open in {timeUntil}"
}
```

### **Usage in Components**
```vue
<script setup>
const { t } = useI18n()
const { userContext } = usePersonalization()

const dynamicTitle = computed(() => 
  t('page.hero.title', {
    city: userContext.location.city,
    country: userContext.location.country,
    index: userContext.market.localIndices[0]
  })
)
</script>
```

---

## 📱 **Responsive & RTL Support**

### **Arabic (RTL) Specific Considerations**
```vue
<template>
  <div :class="{ 'rtl': locale === 'ar' }">
    <!-- Content automatically flips for Arabic -->
  </div>
</template>

<style>
.rtl {
  direction: rtl;
  text-align: right;
}

/* Flip specific elements for RTL */
.rtl .flex {
  flex-direction: row-reverse;
}
</style>
```

### **Mobile Responsiveness**
Ensure all translated text works on mobile:
- Test long German/Arabic text
- Verify button text fits
- Check highlighting on small screens

---

## 🧪 **Testing Checklist for Each Page**

### **Functionality Testing**
- [ ] All translation keys resolve (no missing translations)
- [ ] Placeholders inject correctly
- [ ] Highlighting shows blue + purple colors
- [ ] Dark mode highlighting works
- [ ] Mobile layout doesn't break

### **Language Testing**
- [ ] English: Full functionality
- [ ] French: Text displays correctly
- [ ] Arabic: RTL layout works properly
- [ ] Placeholder injection works in all languages

### **Visual Testing**
- [ ] Headlines have exactly 1 blue + 1 purple highlight
- [ ] Colors match design system
- [ ] Text doesn't overflow containers
- [ ] Line heights work with highlighted text

---

## 🚀 **Rollout Strategy**

### **Phase 1: Core Pages (This Week)**
1. About page
2. Features page  
3. Pricing page
4. Contact page

### **Phase 2: Extended Pages (Next Week)**
1. Blog pages
2. Legal pages (Privacy, Terms)
3. FAQ page
4. Documentation pages

### **Phase 3: Advanced Features (Future)**
1. Search page with translated results
2. User dashboard pages
3. Help/Support pages
4. Admin pages

---

## 📊 **Success Metrics**

### **Translation Quality**
- **100% key coverage** - No missing translations
- **<5 second load time** - Even with multiple languages
- **Zero layout breaks** - Text fits in all languages

### **User Engagement**
- **+20% international traffic** - Better multi-language SEO
- **+15% conversion rate** - Localized content performs better
- **+30% French/Arabic engagement** - Language-specific improvements

---

## 🔍 **Maintenance & Updates**

### **Adding New Translation Keys**
1. Add to `en.json` first (source of truth)
2. Add to all other language files
3. Update components to use new keys
4. Test in all languages

### **Updating Existing Translations**
1. Update English version first
2. Mark other languages for review
3. Use professional translators for accuracy
4. Test highlighting still works

### **Quality Assurance**
- Monthly translation audits
- Native speaker reviews
- A/B testing of different translations
- User feedback integration

This guide ensures consistent, high-quality translations across your entire marketing site with proper semantic highlighting! 🌟