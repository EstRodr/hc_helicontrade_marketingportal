# HeliconTrade Marketing Site - Asset Guidelines

## 📐 Image Formats & Sizes

### **Logo Assets**
- **Primary Logo**: SVG format (already in `/public/helicontrade-logo.svg`)
- **Favicon**: 32x32px SVG or PNG
- **Apple Touch Icon**: 180x180px PNG
- **Social Media Logo**: 400x400px PNG (square)

### **Hero Section Images**
- **Main Hero Background**: 1920x1080px WebP/PNG
- **Hero Product Screenshots**: 1200x800px WebP/PNG
- **Mobile Hero Images**: 800x600px WebP/PNG

### **Feature Section Icons**
- **Custom Feature Icons**: 64x64px SVG (scalable)
- **Product Screenshots**: 600x400px WebP/PNG
- **Diagram/Infographic Images**: 800x600px SVG/WebP

### **Content Images**
- **Blog Post Featured Images**: 1200x630px WebP/PNG
- **Team Photos**: 400x400px WebP/PNG (square)
- **Testimonial Avatars**: 80x80px WebP/PNG (circular)

## 🎨 Animation Guidelines

### **Recommended Animation Types**
1. **Subtle Hover Effects**: Scale (1.02-1.05x), opacity changes
2. **Loading Animations**: Skeleton screens, progress indicators
3. **Scroll Animations**: Fade in, slide up (use `@nuxt/aos` or similar)
4. **Micro-interactions**: Button press feedback, form validation

### **Performance Guidelines**
- **File Size Limits**: 
  - Images: < 500KB each
  - Animations: < 200KB each
  - Total page assets: < 2MB
- **Animation Duration**: 200-500ms for micro-interactions
- **Use CSS transforms** (translateX, scale, opacity) over changing layout properties

### **Animation Libraries**
- **Recommended**: Framer Motion for Vue, AOS (Animate On Scroll)
- **CSS-only**: Tailwind CSS animations, custom CSS transitions
- **Avoid**: Heavy JavaScript animation libraries that impact performance

## 📱 Responsive Considerations

### **Breakpoints** (matches Tailwind CSS)
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

### **Image Optimization Strategy**
1. **Use `<picture>` elements** for art direction
2. **WebP format** with PNG/JPG fallbacks
3. **Responsive images** with `srcset` and `sizes`
4. **Lazy loading** for below-the-fold images

```html
<!-- Example responsive image -->
<picture>
  <source media="(min-width: 1024px)" srcset="/images/hero-desktop.webp" type="image/webp">
  <source media="(min-width: 768px)" srcset="/images/hero-tablet.webp" type="image/webp">
  <source srcset="/images/hero-mobile.webp" type="image/webp">
  <img src="/images/hero-mobile.jpg" alt="HeliconTrade Platform" loading="lazy">
</picture>
```

## 🔄 Asset Organization

### **Directory Structure**
```
/public/
├── images/
│   ├── hero/           # Hero section images
│   ├── features/       # Feature screenshots/icons
│   ├── team/          # Team photos
│   ├── logos/         # Brand assets
│   └── icons/         # UI icons
├── videos/            # Background videos (if any)
├── animations/        # Lottie files, GIFs
└── favicon.svg        # Site favicon
```

### **Naming Conventions**
- **Use kebab-case**: `trading-dashboard-screenshot.webp`
- **Include dimensions**: `hero-banner-1920x1080.webp`
- **Specify purpose**: `feature-alerts-mobile-600x400.webp`
- **Version control**: `logo-v2.svg`, `icon-trading-updated.svg`

## ⚡ Performance Optimization

### **Image Optimization Tools**
- **Squoosh** (web tool): https://squoosh.app/
- **ImageOptim** (Mac app): Automatic compression
- **TinyPNG** (web tool): PNG/JPG compression
- **SVGOMG** (web tool): SVG optimization

### **Technical Specifications**
- **WebP Quality**: 80-85% for photos, 90-95% for graphics
- **PNG**: Use for transparency, icons, simple graphics
- **JPG**: Use for complex photos without transparency
- **SVG**: Use for logos, icons, simple illustrations

### **Loading Strategy**
1. **Critical images**: Preload with `<link rel="preload">`
2. **Above-the-fold**: Load immediately
3. **Below-the-fold**: Lazy load with `loading="lazy"`
4. **Background images**: Use CSS with media queries

## 🎯 SEO & Accessibility

### **Alt Text Guidelines**
- **Descriptive**: "Trading dashboard showing real-time alerts"
- **Contextual**: Relate to surrounding content
- **Concise**: Under 125 characters
- **No redundancy**: Don't repeat image caption text

### **Image SEO Best Practices**
- **Descriptive filenames**: `trading-alerts-dashboard.webp`
- **Structured data**: Add JSON-LD for product images
- **Open Graph images**: 1200x630px for social sharing
- **Image sitemaps**: Include in sitemap.xml

## 🌐 Internationalization

### **Text in Images**
- **Avoid text in images** when possible for i18n
- **Use overlay text** in HTML instead
- **Create separate versions** if text in images is necessary:
  - `hero-en.webp`, `hero-fr.webp`, `hero-ar.webp`

### **Cultural Considerations**
- **Color meanings**: Research color significance in target markets
- **Image content**: Ensure culturally appropriate imagery
- **Reading direction**: Consider RTL layouts for Arabic

## 📊 Asset Pipeline Integration

### **Nuxt Image Module** (recommended for future)
```bash
pnpm add @nuxt/image
```

### **Usage Examples**
```vue
<!-- Optimized image with Nuxt Image -->
<NuxtImg 
  src="/images/trading-dashboard.jpg"
  alt="HeliconTrade dashboard"
  width="800"
  height="600"
  format="webp"
  quality="85"
  loading="lazy"
/>

<!-- Responsive image -->
<NuxtPicture 
  src="/images/hero-banner.jpg"
  alt="Join HeliconTrade"
  sizes="sm:400px md:600px lg:800px xl:1200px"
  format="webp"
/>
```

## 🎪 Animation Best Practices

### **CSS Animations** (preferred)
```css
/* Smooth hover effects */
.trading-card {
  @apply transition-all duration-300 ease-out;
  transform: translateY(0);
}

.trading-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

/* Loading animations */
@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.loading-pulse {
  animation: pulse-glow 1.5s ease-in-out infinite;
}
```

### **JavaScript Animations** (when needed)
- **Use Intersection Observer** for scroll-triggered animations
- **Prefer `requestAnimationFrame`** over setInterval
- **Respect `prefers-reduced-motion`** media query

## 🚀 Next Steps

1. **Create brand asset folder** with logo variations
2. **Design hero section images** showing platform features
3. **Create feature screenshots** of actual app functionality
4. **Optimize all images** before deployment
5. **Test performance** with Lighthouse after adding assets
6. **Set up monitoring** for Core Web Vitals

---

**Need Help?** Contact the development team for asset integration assistance or performance optimization guidance.
