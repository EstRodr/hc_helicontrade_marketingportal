/**
 * Unified Text Highlighting System for HeliconTrade
 * 
 * Consistent blue/purple styling across all languages targeting young financial services users.
 * 
 * Color Strategy:
 * - Blue (text-blue-600 dark:text-blue-400): Action words, technology, and processes
 * - Purple (text-purple-600 dark:text-purple-400): Geographic locations, markets, and entities
 */

interface HighlightingRules {
  blue: (RegExp | string)[]
  purple: (RegExp | string)[]
}

interface LocalizedRules {
  [languageCode: string]: HighlightingRules
}

const BLUE_CLASS = 'text-blue-600 dark:text-blue-400'
const PURPLE_CLASS = 'text-purple-600 dark:text-purple-400'

/**
 * Language-specific highlighting rules
 * Blue = Action/Tech/Process terms that young traders find engaging
 * Purple = Geographic/Market/Entity terms that establish credibility
 */
const HIGHLIGHTING_RULES: LocalizedRules = {
  en: {
    blue: [
      // Core technology terms
      /\bAI\b/g,
      /\bArtificial Intelligence\b/gi,
      /\bGlobal insight\b/gi,
      /\bReal[-\s]?time\b/gi,
      /\b24\/7\b/g,
      
      // Action verbs that resonate with young traders
      /\bturn\b|\btransform\b|\bconvert\b/gi,
      /\bsmarter decisions?\b/gi,
      /\bmarket research\b/gi,
      /\bcustom alerts?\b/gi,
      /\bpersonalized\b/gi,
      /\btrade smarter\b/gi,
      
      // Emotional appeals for better sleep/lifestyle
      /\bsleep better\b/gi,
      /\bnever sleeps?\b/gi,
      /\bopportunity never sleeps\b/gi,
    ],
    purple: [
      // Financial instruments young traders use
      /\bstocks?\b/gi,
      /\bcrypto(?:currency)?\b/gi,
      /\bindices\b/gi,
      /\bcommodities\b/gi,
      /\bforex\b/gi,
      /\boptions\b/gi,
      
      // Trading platforms and markets
      /\bTrading Insights?\b/gi,
      /\bWall Street\b/gi,
      /\bmarkets?\b/gi,
      
      // Will be dynamically added: countries, cities, indices
    ]
  },
  
  fr: {
    blue: [
      // Core technology terms
      /\bIA\b/g,
      /\bIntelligence Artificielle\b/gi,
      /\bVision globale\b/gi,
      /\btemps réel\b/gi,
      /\b24\/7\b/g,
      
      // Action verbs
      /\btransforme(?:z|r)?\b/gi,
      /\bdécisions? (?:plus )?intelligentes?\b/gi,
      /\bRecherche de [Mm]arché\b/gi,
      /\balertes? personnalisées?\b/gi,
      /\bpersonnalisé(?:e)?\b/gi,
      /\btrader (?:plus )?intelligemment\b/gi,
      
      // Lifestyle appeals
      /\bdormez mieux\b/gi,
      /\bne dort jamais\b/gi,
      /\bl'opportunité ne dort jamais\b/gi,
    ],
    purple: [
      // Financial instruments
      /\bactions?\b/gi,
      /\bcrypto(?:monnaies?)?\b/gi,
      /\bindices?\b/gi,
      /\bmatières premières\b/gi,
      /\bchange\b/gi, // forex in French
      
      // Markets and platforms
      /\bAnalyses? de Trading\b/gi,
      /\bWall Street\b/gi,
      /\bmarchés?\b/gi,
    ]
  },
  
  ar: {
    blue: [
      // Core technology terms
      /الذكاء الاصطناعي/g,
      /رؤية عالمية/g,
      /الوقت الحقيقي/g,
      /24\/7/g,
      
      // Action verbs
      /حوِّل|تحويل|حوّل|قم بتحويل/g,
      /قرارات(?:\s)?(?:أكثر )?ذكاءً|قرارات أذكى/g,
      /أبحاث السوق/g,
      /تنبيهات(?:\s)?مخصصة/g,
      /مخصص|مُخصص/g,
      /تتداول بذكاء/g,
      
      // Lifestyle appeals
      /نم أفضل|تنام بشكل أفضل/g,
      /لا ينام|لا تنام/g,
      /الفرص لا تنام/g,
    ],
    purple: [
      // Financial instruments
      /الأسهم/g,
      /العملات المشفرة/g,
      /المؤشرات/g,
      /السلع/g,
      /الفوركس/g,
      
      // Markets and platforms
      /رؤى التداول/g,
      /وول ستريت/g,
      /الأسواق|السوق/g,
    ]
  }
}

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Apply highlighting rules to text with specified CSS class
 */
function applyHighlightingRules(
  text: string, 
  patterns: (RegExp | string)[], 
  cssClass: string
): string {
  let result = text
  
  for (const pattern of patterns) {
    const regex = pattern instanceof RegExp 
      ? pattern 
      : new RegExp(`\\b${escapeRegex(pattern)}\\b`, 'gi')
    
    result = result.replace(regex, `<span class="${cssClass}">$&</span>`)
  }
  
  return result
}

/**
 * Get highlighting rules for a specific language
 */
function getLanguageRules(locale: string): HighlightingRules {
  const lang = locale.split('-')[0].toLowerCase()
  return HIGHLIGHTING_RULES[lang] || HIGHLIGHTING_RULES.en
}

/**
 * Main function to highlight hero headline text with consistent styling
 * 
 * @param text - The text to highlight
 * @param locale - The current locale (e.g., 'en', 'fr', 'ar')
 * @param userContext - Optional context for dynamic highlighting (country, city, index)
 */
export function highlightHeroHeadline(
  text: string, 
  locale: string = 'en',
  userContext?: {
    country?: string
    city?: string
    localizedCountryName?: string
    primaryIndex?: string
  }
): string {
  if (!text) return ''
  
  let result = text
  const rules = getLanguageRules(locale)
  
  // Special handling for base marketing headlines per language
  const lang = locale.split('-')[0].toLowerCase()
  
  // Language-specific base headline highlighting
  // Follow strict pattern: max 1 blue + 1 purple per headline
  // Allowed combinations: (neutral blue neutral purple neutral), (blue, neutral, purple), (neutral, blue, neutral, purple), (blue, neutral, purple, neutral)
  switch (lang) {
    case 'en':
      // "Market Research, Alerts & Trading Insights" -> Research(blue) + Trading Insights(purple)
      // Pattern: Market Research(blue), Alerts & Trading Insights(purple)
      result = result.replace(
        /\b(Market\s+)?(Research)\b/gi,
        '$1<span class="' + BLUE_CLASS + '">$2</span>'
      )
      result = result.replace(
        /\bTrading Insights?\b/gi,
        `<span class="${PURPLE_CLASS}">$&</span>`
      )
      break
      
    case 'fr':
      // "Recherche de Marché, Alertes et Analyses de Trading" -> Recherche(blue) + Analyses de Trading(purple)
      // Pattern: Recherche(blue) de Marché, Alertes et Analyses de Trading(purple)
      result = result.replace(
        /\bRecherche\b/gi,
        `<span class="${BLUE_CLASS}">Recherche</span>`
      )
      result = result.replace(
        /\bAnalyses? de Trading\b/gi,
        `<span class="${PURPLE_CLASS}">$&</span>`
      )
      break
      
    case 'ar':
      // "بحوث السوق والتنبيهات ورؤى التداول" -> بحوث(blue) + رؤى التداول(purple)
      // Pattern: بحوث(blue) السوق والتنبيهات ورؤى التداول(purple)
      result = result.replace(
        /بحوث(?=\s)/g,
        `<span class="${BLUE_CLASS}">بحوث</span>`
      )
      result = result.replace(
        /رؤى التداول/g,
        `<span class="${PURPLE_CLASS}">رؤى التداول</span>`
      )
      break
  }
  
  // Apply specific highlighting for personalized variants
  // Skip if this looks like a base marketing headline to avoid double highlighting
  const isBaseHeadline = 
    /Market\s+Research.*Trading\s+Insights?/i.test(text) ||
    /Recherche.*Analyses?\s+de\s+Trading/i.test(text) ||
    /بحوث.*رؤى\s+التداول/i.test(text)
    
  if (!isBaseHeadline) {
    // Apply BOTH blue AND purple highlights for ALL languages to ensure consistency
    // MUST follow allowed patterns: (neutral blue neutral purple neutral), (blue neutral purple), etc.
    switch (lang) {
      case 'en':
        // "Global insight, built for Swedish markets" -> insight(blue) + Swedish(purple)
        // Pattern: neutral blue neutral purple neutral ✅
        result = result.replace(/\b(Global\s+)?(insight)\b/gi, '$1<span class="' + BLUE_CLASS + '">$2</span>')
        break
        
      case 'fr':
        // "Vision globale, pensée pour les marchés de Suède" -> Vision globale(blue) + Suède(purple)
        // Pattern: blue neutral purple ✅ 
        result = result.replace(/\bVision\s+globale\b/gi, `<span class="${BLUE_CLASS}">Vision globale</span>`)
        break
        
      case 'ar':
        // "رؤية عالمية مصمّمة لأسواق السويد" -> رؤية عالمية(blue) + السويد(purple)
        // Pattern: neutral blue neutral purple ✅
        result = result.replace(/رؤية\s+عالمية/g, `<span class="${BLUE_CLASS}">رؤية عالمية</span>`)
        break
    }
  }
  
  // CRITICAL: Add purple highlights for country names to ensure ALL languages have BOTH colors
  if (userContext && !isBaseHeadline) {
    // Helper to get country adjective from country name
    const getCountryAdjective = (country: string): string => {
      const countryAdjectiveMap: Record<string, string> = {
        'Sweden': 'Swedish',
        'United States': 'US', 
        'United Kingdom': 'UK',
        'Germany': 'German',
        'France': 'French',
        'Japan': 'Japanese',
        'Canada': 'Canadian',
        'Australia': 'Australian',
        'India': 'Indian',
        'Brazil': 'Brazilian'
      }
      return countryAdjectiveMap[country] || country
    }
    
    // ENSURE purple highlight is added for ALL languages
    if (userContext.country) {
      const countryAdjective = getCountryAdjective(userContext.country)
      
      // For English: highlight "Swedish" in "Swedish markets"
      if (lang === 'en' && countryAdjective !== userContext.country) {
        const adjectiveRegex = new RegExp(`\\b${escapeRegex(countryAdjective)}\\b`, 'gi')
        result = result.replace(adjectiveRegex, `<span class="${PURPLE_CLASS}">${countryAdjective}</span>`)
      }
    }
    
    // For French and Arabic: highlight localized country names (Suède, السويد)
    if (userContext.localizedCountryName) {
      console.log('Attempting to highlight country name:', userContext.localizedCountryName, 'in text:', text)
      const countryRegex = new RegExp(`\\b${escapeRegex(userContext.localizedCountryName)}\\b`, 'gi')
      const beforeReplace = result
      result = result.replace(countryRegex, `<span class="${PURPLE_CLASS}">${userContext.localizedCountryName}</span>`)
      console.log('Before replace:', beforeReplace)
      console.log('After replace:', result)
    }
    
    // FALLBACK: If localized country name didn't work, try common country names directly
    if (!result.includes(PURPLE_CLASS) && lang === 'fr') {
      // French country names that should be highlighted
      const frenchCountries = ['Suède', 'Allemagne', 'France', 'Italie', 'Espagne']
      for (const countryName of frenchCountries) {
        if (text.includes(countryName)) {
          const countryRegex = new RegExp(`\\b${escapeRegex(countryName)}\\b`, 'gi')
          result = result.replace(countryRegex, `<span class="${PURPLE_CLASS}">${countryName}</span>`)
          break
        }
      }
    }
    
    // FALLBACK: If localized country name didn't work, try common Arabic country names directly  
    if (!result.includes(PURPLE_CLASS) && lang === 'ar') {
      // Arabic country names that should be highlighted
      const arabicCountries = ['السويد', 'ألمانيا', 'فرنسا', 'إيطاليا']
      for (const countryName of arabicCountries) {
        if (text.includes(countryName)) {
          const countryRegex = new RegExp(escapeRegex(countryName), 'gi')
          result = result.replace(countryRegex, `<span class="${PURPLE_CLASS}">${countryName}</span>`)
          break
        }
      }
    }
  }
  
  return result
}

/**
 * Highlight hero subheadline text with consistent styling
 * 
 * @param text - The text to highlight  
 * @param locale - The current locale
 * @param userContext - Optional context for dynamic highlighting
 */
export function highlightHeroSubheadline(
  text: string,
  locale: string = 'en', 
  userContext?: {
    country?: string
    city?: string
    localizedCountryName?: string
    primaryIndex?: string
  }
): string {
  if (!text) return ''
  
  let result = text
  const rules = getLanguageRules(locale)
  
  // Apply same consistency rules as headlines: EXACTLY 1 blue + 1 purple
  // Highlight personalizations: cities and market indices
  const lang = locale.split('-')[0].toLowerCase()
  
  // LANGUAGE-AGNOSTIC APPROACH: Use semantic keyword mapping instead of language-specific patterns
  
  // Define semantic keywords that should be highlighted (language-agnostic)
  const SEMANTIC_KEYWORDS = {
    // Blue keywords (action/process terms) - add translations for each language
    blue: {
      // Research/Analysis terms
      'research': ['research', 'recherche', 'بحوث', 'أبحاث'],
      'market_research': ['market research', 'recherche de marché', 'بحوث السوق', 'أبحاث السوق'],
      'powerful': ['powerful', 'puissante', 'قوية'],
      'get': ['get', 'obtenez', 'احصل', 'احصلوا'],
      'start': ['start', 'commencez', 'ابدأ', 'ابدأوا'],
      'real_time': ['real-time', 'real time', 'temps réel', 'الوقت الحقيقي'],
      'ai': ['AI', 'IA', 'الذكاء الاصطناعي'],
      'insight': ['insight', 'vision globale', 'رؤية عالمية'],
      'smart_decisions': ['smarter decisions', 'décisions intelligentes', 'قرارات ذكية', 'قرارات أذكى'],
      'custom': ['custom', 'personnalisées', 'مخصصة'],
      'free_beta': ['free beta', 'bêta gratuite', 'بيتا مجانية'],
      'ready': ['ready', 'prêt', 'جاهز', 'مستعد']
    },
    // Purple keywords (entities/instruments/services)
    purple: {
      'trading_signals': ['trading signals', 'signaux de trading', 'إشارات التداول'],
      'trading_insights': ['trading insights', 'analyses de trading', 'رؤى التداول'],
      'alerts': ['alerts', 'alertes', 'تنبيهات'],
      'custom_alerts': ['custom alerts', 'alertes personnalisées', 'تنبيهات مخصصة'],
      'markets': ['markets', 'marchés', 'الأسواق', 'السوق'],
      'stocks': ['stocks', 'actions', 'الأسهم'],
      'crypto': ['crypto', 'crypto', 'العملات المشفرة'],
      'indices': ['indices', 'indices', 'المؤشرات'],
      'commodities': ['commodities', 'matières premières', 'السلع'],
      'trade_execution': ['trade execution', 'exécution des trades', 'تنفيذ الصفقات'],
      'execution': ['execution', 'exécution', 'تنفيذ']
    }
  }
  
  // Function to find and highlight semantic keywords
  const highlightSemanticKeywords = (text: string, keywords: any, cssClass: string, maxHighlights: number = 1): { result: string, count: number } => {
    let result = text
    let highlightCount = 0
    
    // Go through each semantic concept and its translations
    for (const [concept, translations] of Object.entries(keywords)) {
      if (highlightCount >= maxHighlights) break
      
      // Try each translation for this concept
      for (const translation of translations as string[]) {
        if (highlightCount >= maxHighlights) break
        
        // Check if this translation exists in the text and isn't already highlighted
        const regex = new RegExp(`\\b${escapeRegex(translation)}\\b`, 'gi')
        if (regex.test(text) && !result.includes(`>${translation}<`)) {
          result = result.replace(regex, `<span class="${cssClass}">${translation}</span>`)
          highlightCount++
          break // Move to next concept once we find a match
        }
      }
    }
    
    return { result, count: highlightCount }
  }
  
  // Check if this is base marketing text (no personalization)
  const isBaseMarketingText = 
    /powerful market research.*custom alerts.*trading signals/i.test(text) ||
    /market research.*alerts.*trading insights/i.test(text) ||
    /recherche.*alertes.*analyses/i.test(text) ||
    /recherche de marché.*alertes.*signaux de trading/i.test(text) ||
    /obtenez.*recherche de marché.*alertes.*signaux/i.test(text) ||
    /بحوث.*تنبيهات.*رؤى/i.test(text)
  
  // Apply semantic highlighting (language-agnostic)
  const blueResult = highlightSemanticKeywords(result, SEMANTIC_KEYWORDS.blue, BLUE_CLASS, 1)
  result = blueResult.result
  
  const purpleResult = highlightSemanticKeywords(result, SEMANTIC_KEYWORDS.purple, PURPLE_CLASS, 1)  
  result = purpleResult.result
  
  // CRITICAL: Highlight ALL personalizations when available (but still follow color pattern rules)
  if (userContext && !isBaseMarketingText) {
    const availablePersonalizations = []
    
    // Collect all available personalizations in order of importance
    if (userContext.primaryIndex && text.includes(String(userContext.primaryIndex))) {
      availablePersonalizations.push({
        text: String(userContext.primaryIndex),
        type: 'index'
      })
    }
    
    if (userContext.city && text.includes(userContext.city)) {
      availablePersonalizations.push({
        text: userContext.city,
        type: 'city'
      })
    }
    
    // If we have multiple personalizations, highlight ALL of them in purple
    if (availablePersonalizations.length >= 2) {
      for (const personalization of availablePersonalizations) {
        const regex = new RegExp(`\\b${escapeRegex(personalization.text)}\\b`, 'gi')
        result = result.replace(regex, `<span class="${PURPLE_CLASS}">${personalization.text}</span>`)
      }
    }
    // If we have only 1 personalization, highlight it in purple
    else if (availablePersonalizations.length === 1) {
      const personalization = availablePersonalizations[0]
      const regex = new RegExp(`\\b${escapeRegex(personalization.text)}\\b`, 'gi')
      result = result.replace(regex, `<span class="${PURPLE_CLASS}">${personalization.text}</span>`)
    }
    // Fallback: Highlight common financial centers if no personalization found
    else {
      const financialCenters = ['Wall Street', 'Stockholm', 'London', 'Frankfurt', 'Tokyo', 'Singapore']
      for (const center of financialCenters) {
        if (text.includes(center)) {
          const centerRegex = new RegExp(`\\b${escapeRegex(center)}\\b`, 'gi')
          result = result.replace(centerRegex, `<span class="${PURPLE_CLASS}">${center}</span>`)
          break
        }
      }
    }
  }
  
  return result
}

/**
 * Helper to get user context for highlighting from personalization data
 */
export function getUserContextForHighlighting(
  userContext: any,
  locale: string = 'en'
): {
  country?: string
  city?: string
  localizedCountryName?: string
  primaryIndex?: string
} {
  const countryCode = (userContext?.location?.countryCode || '').toUpperCase()
  let localizedCountryName = ''
  
  try {
    if (countryCode) {
      const displayNames = new Intl.DisplayNames([locale], { type: 'region' })
      localizedCountryName = displayNames.of(countryCode) || ''
    }
  } catch (e) {
    // Fallback to country name from userContext
    localizedCountryName = userContext?.location?.country || ''
  }
  
  return {
    country: userContext?.location?.country,
    city: userContext?.location?.city,
    localizedCountryName,
    primaryIndex: userContext?.market?.localIndices?.[0]
  }
}