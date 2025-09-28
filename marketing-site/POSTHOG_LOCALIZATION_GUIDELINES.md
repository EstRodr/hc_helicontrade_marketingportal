# PostHog Configuration & Localization Guidelines

## 🎯 **PostHog Feature Flag Configuration**

### **Step 1: Create Master Kill Switch**
```
Flag Key: marketing-homepage-headline-enable-personalization
Name: Master Personalization Switch
Description: Global switch to enable/disable all homepage personalization
Default Value: true
Rollout: 100% (for all users)
```

### **Step 2: Create A/B Test Flag**
```
Flag Key: marketing-homepage-headline-personalization-variant  
Name: Homepage Headline A/B Test
Description: Test different headline personalization approaches
Rollout Strategy: Equal distribution

Variants (10% each):
├── empowerment         | Payload: {"value": "0"} | 10%
├── momentum           | Payload: {"value": "1"} | 10%  
├── user_centric       | Payload: {"value": "2"} | 10%
├── modern             | Payload: {"value": "3"} | 10%
├── action_oriented    | Payload: {"value": "4"} | 10%
├── pre_market_urgency | Payload: {"value": "5"} | 10%
├── market_open_urgency| Payload: {"value": "6"} | 10%
├── after_hours_urgency| Payload: {"value": "7"} | 10%
├── new_visitor        | Payload: {"value": "8"} | 10%
└── returning_visitor  | Payload: {"value": "9"} | 10%
```

### **Step 3: Advanced Targeting (Optional)**
Create condition groups for better targeting:

**New Visitor Targeting:**
```
Condition: visit_count equals 1
Override: new_visitor (100%)
```

**Returning Visitor Targeting:**  
```
Condition: visit_count greater than 3
Override: returning_visitor (100%)
```

**Market Session Targeting:**
```
Pre-market: market_session equals 'pre-market' → pre_market_urgency (100%)
Market Open: market_session equals 'market' → market_open_urgency (100%)  
After Hours: market_session equals 'after-hours' → after_hours_urgency (100%)
```

---

## 🎨 **CRITICAL: Styling & Font Rules**

### **Typography Rules**
```scss
// Headlines
font-family: Inter, system-ui, -apple-system, sans-serif
font-weight: 700 (Bold)
font-size: 
  - Mobile: 2.5rem (40px)
  - Tablet: 3rem (48px) 
  - Desktop: 3.75rem (60px)
line-height: 1.1 (tight)
color: gray-900 (dark mode: white)
```

### **Color Highlighting Rules**
**MANDATORY: Every headline MUST have exactly 1 blue + 1 purple highlight**

```scss
// Blue Highlighting (Action/Process Terms)
.text-blue-600.dark:text-blue-400 {
  color: #2563eb; // Light mode
}
@media (prefers-color-scheme: dark) {
  color: #60a5fa; // Dark mode  
}

// Purple Highlighting (Entities/Markets/Locations)  
.text-purple-600.dark:text-purple-400 {
  color: #9333ea; // Light mode
}
@media (prefers-color-scheme: dark) {
  color: #a78bfa; // Dark mode
}
```

### **Allowed Color Patterns**
```
Pattern 1: Neutral Blue Neutral Purple Neutral
Pattern 2: Blue Neutral Purple  
Pattern 3: Neutral Blue Neutral Purple
Pattern 4: Blue Neutral Purple Neutral
```

**❌ FORBIDDEN:**
- No highlights (all neutral)
- Only blue or only purple  
- More than 1 blue or 1 purple
- Wrong color assignment (blue for markets, purple for actions)

---

## 🌍 **Localization Implementation Guide**

### **Language Structure**
```
locales/
├── en.json     # English (primary)
├── fr.json     # French  
├── ar.json     # Arabic (RTL)
└── es.json     # Spanish (future)
```

### **Translation Keys Structure**
```json
{
  "hero": {
    "title": "Base headline (neutral, no personalization)",
    "subtitle": "Base subheadline (neutral)",
    "joinBeta": "Get Started",
    "viewDemo": "Watch Demo"
  },
  "heroVariants": [
    {
      "headline": "Personalized headline template with {country} placeholder", 
      "subheadline": "Personalized subheadline with {city} and {index} placeholders"
    }
  ],
  "marketStatus": {
    "open": "{market} is open • Live until {time}",
    "closed": "{market} closed",
    "preMarket": "{market} opens at {time}",
    "afterHours": "{market} closed • After-hours trading"
  }
}
```

### **Dynamic Placeholder System**
Use consistent placeholders across all languages:
- `{country}` - Localized country name (Sverige, Espagne, España)
- `{city}` - City name (Stockholm, Valencia, Paris)
- `{index}` - Local market index (OMXS30, IBEX, CAC)
- `{market}` - Market exchange name (OMX, BME, EPA)
- `{time}` - Localized time format

---

## ✅ **Content Compliance Audit**

### **Current Variants Analysis**

#### **✅ COMPLIANT Variants:**
```
1. "Market Research, Alerts & Trading Insights"
   └── Blue: "Market Research" | Purple: "Trading Insights" ✅

2. Base marketing text with proper highlighting ✅
```

#### **❌ NON-COMPLIANT Variants (NEEDS FIXING):**
```
1. "Swedish markets, redefined by intelligence"
   └── Current: Only "Swedish" purple ❌
   └── SHOULD BE: "intelligence" (blue) + "Swedish markets" (purple)

2. "AI eyes on Swedish markets — opportunity never sleeps"  
   └── Current: Only "AI" blue ❌
   └── SHOULD BE: "AI eyes" (blue) + "Swedish markets" (purple)

3. "From Stockholm to Wall Street, track every market pulse, 24/7"
   └── Current: Only "Wall Street" purple ❌  
   └── SHOULD BE: "track" (blue) + "Stockholm" (purple)
```

---

## 🔧 **Implementation Checklist**

### **PostHog Setup:**
- [ ] Master kill switch created and enabled
- [ ] A/B test flag created with 10 variants
- [ ] Payloads configured correctly ({"value": "0"} to {"value": "9"})
- [ ] Advanced targeting rules set up (optional)
- [ ] Events tracking properly (`personalization_variant_assigned`)

### **Styling Compliance:**
- [ ] All headlines use Inter font, 700 weight
- [ ] Responsive font sizes implemented
- [ ] Every headline has exactly 1 blue + 1 purple highlight
- [ ] Color classes use correct dark mode variants
- [ ] Patterns follow approved combinations

### **Localization Quality:**
- [ ] All locales have complete translations
- [ ] Placeholder system works across languages
- [ ] Country names properly localized using `Intl.DisplayNames`
- [ ] Market data matches local exchanges
- [ ] RTL support working for Arabic

### **Personalization Logic:**
- [ ] Location detection working (IP + timezone fallback)
- [ ] Market mapping covers 50+ countries  
- [ ] US fallback active for unknown locations
- [ ] No personalization shown if location fails
- [ ] Templates inject dynamic data correctly

---

## 🧪 **Testing Protocol**

### **PostHog Testing:**
1. **Check flag distribution**: Verify 10% traffic to each variant
2. **Test targeting rules**: New vs returning visitors
3. **Verify tracking**: Monitor `personalization_variant_assigned` events
4. **Kill switch test**: Disable personalization, confirm fallback

### **Localization Testing:**
1. **Browser language test**: Set browser to fr/ar, verify content
2. **Location simulation**: VPN to different countries
3. **Placeholder injection**: Verify {country}, {city}, {index} work
4. **Market hours**: Test pre-market, open, closed states

### **Styling QA:**
1. **Color audit**: Every headline has 1 blue + 1 purple
2. **Font consistency**: Inter 700 across all variants
3. **Dark mode**: Colors work in both light/dark
4. **Mobile responsive**: Font sizes scale correctly

---

## 🚨 **Common Mistakes to Avoid**

### **PostHog Configuration:**
- ❌ Missing payloads in variants
- ❌ Unequal traffic distribution
- ❌ Forgetting to enable kill switch  
- ❌ Not tracking variant assignments

### **Styling Issues:**
- ❌ Headlines with no highlighting
- ❌ Only blue or only purple highlights
- ❌ Wrong font family (not Inter)
- ❌ Hardcoded colors (not dark mode compatible)

### **Localization Problems:**
- ❌ Hardcoded country names  
- ❌ Missing translations for new variants
- ❌ Broken placeholder replacement
- ❌ Assuming timezone = location accuracy

---

## 📊 **Success Metrics**

### **Performance KPIs:**
- **Conversion Rate**: >3% improvement over control
- **Engagement**: +25% time on page
- **Mobile Optimization**: Desktop/mobile parity within 10%
- **International**: Non-English locales perform within 15% of English

### **Technical Health:**
- **Error Rate**: <1% location detection failures
- **Load Performance**: <100ms impact on page load
- **A/B Test Balance**: Each variant gets 8-12% traffic
- **Dark Mode**: 100% visual consistency

---

## 🔄 **Maintenance & Updates**

### **Monthly Reviews:**
- Audit variant performance, pause underperformers
- Review new market additions (expand coverage)
- Update translations for new locales
- Check styling compliance across variants

### **Quarterly Enhancements:**
- Add new personalization variants based on data
- Expand to new languages/markets
- Optimize based on conversion data
- Refresh creative content

**This system provides worldwide coverage, maintains design consistency, and enables data-driven optimization through PostHog.**