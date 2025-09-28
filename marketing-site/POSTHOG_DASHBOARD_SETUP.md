# 🔥 PostHog Dashboard Setup - Next Priority Actions

## ✅ **Already Completed**
- [x] **Kill Switch Flag:** `marketing-homepage-headline-enable-personalization` ✅ 
- [x] **Semantic Highlighting Fix:** All variants now have consistent blue-purple styling ✅

---

## 🎯 **NEXT: Create A/B Testing Flag** ⏱️ 5 minutes

Since you have the kill switch ready, the next critical step is creating the main A/B testing flag:

### **Step 1: Create Main Variant Flag**

**Go to PostHog Dashboard → Feature Flags → Create Feature Flag**

**Configuration:**
```
Key: marketing-homepage-headline-personalization-variant
Name: Homepage Headline A/B Test  
Description: Test 10 different headline personalization approaches with semantic highlighting
```

**Add 10 Variants (click "Add variant" for each):**
```
Variant Key: empowerment        | Payload: {"value": "0"} | Rollout: 10%
Variant Key: momentum          | Payload: {"value": "1"} | Rollout: 10%  
Variant Key: user_centric      | Payload: {"value": "2"} | Rollout: 10%
Variant Key: modern            | Payload: {"value": "3"} | Rollout: 10%
Variant Key: action_oriented   | Payload: {"value": "4"} | Rollout: 10%
Variant Key: pre_market_urgency| Payload: {"value": "5"} | Rollout: 10%
Variant Key: market_open_urgency| Payload: {"value": "6"} | Rollout: 10%
Variant Key: after_hours_urgency| Payload: {"value": "7"} | Rollout: 10%
Variant Key: new_visitor       | Payload: {"value": "8"} | Rollout: 10%  
Variant Key: returning_visitor | Payload: {"value": "9"} | Rollout: 10%
```

**Important:** Make sure to include the **Payload** for each variant - this is how the code knows which option to use!

---

## 📊 **ESSENTIAL: Create PostHog Dashboards** ⏱️ 10 minutes

### **Dashboard 1: Personalization Performance Overview**

**Go to PostHog → Insights → Create Dashboard → "Personalization Performance"**

**Add these charts:**

#### **Chart 1: Variant Distribution** 
- **Chart Type:** Pie Chart
- **Event:** `personalization_variant_assigned` 
- **Breakdown by:** `variant_type`
- **Date Range:** Last 7 days
- **Purpose:** Verify equal 10% distribution across variants

#### **Chart 2: Personalization Events Over Time**
- **Chart Type:** Line Chart  
- **Event:** `personalization_variant_assigned`
- **Date Range:** Last 30 days
- **Purpose:** Monitor daily personalization volume

#### **Chart 3: Top Performing Variants**
- **Chart Type:** Bar Chart
- **Event:** `hero_cta_click` (or your main CTA event)
- **Breakdown by:** `variant_type` 
- **Date Range:** Last 14 days
- **Purpose:** Identify winning personalization variants

#### **Chart 4: New vs Returning Visitor Performance**  
- **Chart Type:** Bar Chart
- **Event:** `hero_cta_click`
- **Breakdown by:** `is_new_visitor`
- **Filter:** Where `personalization_enabled` = `true`
- **Purpose:** Compare new visitor vs returning visitor conversion

### **Dashboard 2: Technical Health Monitor**

#### **Chart 5: Location Detection Success Rate**
- **Chart Type:** Number
- **Event:** `personalization_variant_assigned`
- **Formula:** `Count where country != 'United States'` / `Total Count` * 100
- **Purpose:** Monitor location detection accuracy (higher = better personalization)

#### **Chart 6: Market Session Targeting**
- **Chart Type:** Pie Chart
- **Event:** `personalization_variant_assigned`  
- **Breakdown by:** `market_session`
- **Purpose:** Verify time-based personalization is working

#### **Chart 7: Device Type Performance**
- **Chart Type:** Bar Chart
- **Event:** `hero_cta_click`
- **Breakdown by:** `device_type`
- **Purpose:** Monitor mobile vs desktop highlighting performance

---

## 🔍 **CRITICAL: Set Up Key Funnels** ⏱️ 8 minutes

### **Funnel 1: Personalization to Conversion**
```
Step 1: personalization_variant_assigned
Step 2: hero_cta_click  
Step 3: [your main conversion event - signup, trial, etc.]
```

### **Funnel 2: New Visitor Journey**
```  
Step 1: personalization_variant_assigned (where is_new_visitor = true)
Step 2: hero_view (optional)
Step 3: hero_cta_click
Step 4: [conversion event]
```

**Filter by:** `variant_type` to compare performance across variants

---

## ⚡ **TODAY'S IMMEDIATE ACTIONS** 

### **Right Now (15 minutes):**

1. **✅ Test Enhanced System** (5 mins)
   ```bash
   cd /Users/manalishashikantsawant/repo/helicontrade-workspace/marketing-site
   npm run dev
   ```
   - Visit `http://localhost:3002`
   - Check console for highlighting debug logs
   - Verify headlines show blue + purple colors

2. **🎯 Create A/B Flag** (5 mins)
   - Create `marketing-homepage-headline-personalization-variant` flag
   - Add all 10 variants with payloads
   - Set equal 10% distribution

3. **📊 Create First Dashboard** (5 mins)
   - Create "Personalization Performance" dashboard
   - Add variant distribution pie chart
   - Add events over time line chart

### **This Week (20 minutes):**

4. **📈 Complete Dashboard Setup** (10 mins)
   - Add remaining performance charts
   - Set up technical health monitoring
   - Create conversion funnels

5. **🎯 Advanced Targeting** (10 mins - Optional)
   - Add condition groups for new vs returning visitors
   - Set up market session targeting rules
   - Configure geographic targeting

---

## 📋 **Success Metrics to Watch**

### **Week 1 Targets:**
- **Equal Distribution:** Each variant gets 8-12% traffic
- **Volume:** 100+ personalization events per day
- **Highlighting Success:** Zero console errors for highlighting functions
- **Location Detection:** >80% non-US traffic gets personalized (higher = better)

### **Week 2 Performance Indicators:**
- **New Visitor Variants:** 15-25% higher conversion than baseline
- **Time-Based Urgency:** 20-35% higher engagement (pre-market, after-hours)  
- **Mobile Performance:** Desktop/mobile parity within 10%
- **Semantic Highlighting Impact:** Consistent performance across all variants

---

## 🚨 **What to Monitor Daily (5 minutes)**

**Check PostHog Live Events for:**
- ✅ `personalization_variant_assigned` events flowing in
- ✅ Proper `variant_type` values (empowerment, momentum, etc.)
- ✅ User properties being set (country, city, device_type)
- ✅ No JavaScript errors in browser console

**Red Flags to Watch For:**
- ❌ Unequal variant distribution (one variant >15% or <5%)
- ❌ Missing location data (all users showing as US)
- ❌ Console errors mentioning highlighting functions
- ❌ PostHog events not flowing

---

## 🎯 **Expected Results Timeline**

**Day 1:** See variant distribution in dashboard (should be ~10% each)  
**Day 3:** 300+ personalization events, clear performance patterns  
**Week 1:** Statistical significance on high-traffic variants  
**Week 2:** +20-35% improvement on winning variants clearly visible  

**The enhanced personalization with semantic highlighting is ready to deliver significant conversion improvements!** 🚀

---

## 📞 **Quick Reference**

**PostHog Flags:**
- ✅ `marketing-homepage-headline-enable-personalization` (Kill Switch) - **DONE**
- 🎯 `marketing-homepage-headline-personalization-variant` (A/B Test) - **CREATE NEXT**

**Key Events to Monitor:**
- `personalization_variant_assigned` - Tracks variant assignments
- `hero_cta_click` - Tracks CTA engagement  
- `hero_view` - Tracks hero section views

**Files Updated:**
- `composables/usePersonalization.ts` - Enhanced with semantic highlighting
- `utils/textHighlighting.ts` - Highlighting functions

**Your next action: Create the A/B testing flag with 10 variants!**