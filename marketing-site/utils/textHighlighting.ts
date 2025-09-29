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
      /\bAI never sleeps?\b/gi,
      /\bopportunity never sleeps\b/gi,
      /\bAI never stops\b/gi,
      /\bnever stops\b/gi,
      
      // Action-oriented and engagement terms
      /\bEdge Awaits\b/gi,
      /\bMarket Action\b/gi,
      /\bAI-Powered\b/gi,
      /\bReady to\b/gi,
      /\bbuilt for\b/gi,
      /\bredefined by\b/gi,
      /\bYour edge\b/gi,
      /\bTrade.*with.*AI\b/gi,
      /\bStart.*Smarter\b/gi,
      
      // Time-sensitive and urgency terms
      /\bOpen Soon\b/gi,
      /\bAction continues\b/gi,
      /\bheating up\b/gi,
      /\bGet ready\b/gi,
      
      // Additional personalization variant terms (blue = action/technology)
      /\bPre-market intelligence\b/gi,
      /\bReal-time signals\b/gi,
      /\bovernight analysis\b/gi,
      /\bAI finds opportunities\b/gi,
      /\bpersonalized\b/gi,
      /\bsmarter decisions\b/gi,
      /\bAI scanning\b/gi,
      /\bAI keeps an eye\b/gi,
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
      /\bMarkets? Closed\b/gi,
      /\bAfter[-\s]hours\b/gi,
      /\bOpportunities\b/gi,
      /\bMarkets Open\b/gi,
      /\bTrading Smarter\b/gi,
      
      // Geographic locations and market-specific terms
      /\bSwedish\s+markets\b/gi,
      /\bSpanish\s+markets\b/gi,
      /\bGerman\s+markets\b/gi,
      /\bFrench\s+markets\b/gi,
      /\bUS\s+markets\b/gi,
      /\bUK\s+markets\b/gi,
      
      // Market indices
      /\bOMXS30\b/gi,
      /\bIBEX\b/gi,
      /\bDAX\b/gi,
      /\bCAC\b/gi,
      /\bFTSE\b/gi,
      /\bSPY\b/gi,
      /\bQQQ\b/gi,
      
      // Additional personalization variant terms (purple = markets/trading/entities)
      /\btraders\b/gi,
      /\bactive.*?traders\b/gi,
      /\btrading insights\b/gi,
      /\bglobal markets\b/gi,
      /\bTrading Smarter\b/gi,
      /\bTrade\b/gi,
      
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
  
  // Skip highlighting if text already contains highlight spans
  if (text.includes('<span class="text-blue-') || text.includes('<span class="text-purple-')) {
    console.log('🚫 HEADLINE already highlighted, skipping:', text.substring(0, 100) + '...')
    return text
  }
  
  let result = text
  console.log('🏆 Processing HEADLINE for highlighting:', text)
  
  // ENFORCE EXACT HIGHLIGHTING RULES FOR SPECIFIC HEADLINES
  if (text.includes('Swedish markets') && text.includes('intelligence')) {
    // "Swedish markets, redefined by intelligence" → intelligence(blue) + Swedish markets(purple)
    result = text.replace(/\bintelligence\b/gi, `<span class="${BLUE_CLASS}">intelligence</span>`)
    result = result.replace(/Swedish markets/gi, `<span class="${PURPLE_CLASS}">Swedish markets</span>`)
    console.log('✅ HEADLINE: intelligence(blue) + Swedish markets(purple)')
    return result
  }
  
  if (text.includes('AI eyes') && text.includes('opportunity never sleeps')) {
    // "AI eyes on Swedish markets — opportunity never sleeps" → AI eyes(blue) + Swedish markets(purple)  
    result = text.replace(/AI eyes/gi, `<span class="${BLUE_CLASS}">AI eyes</span>`)
    result = result.replace(/Swedish markets/gi, `<span class="${PURPLE_CLASS}">Swedish markets</span>`)
    console.log('✅ HEADLINE: AI eyes(blue) + Swedish markets(purple)')
    return result
  }
  
  if (text.includes('Market Research') && text.includes('Trading Insights')) {
    // "Market Research, Alerts & Trading Insights" → Market Research(blue) + Trading Insights(purple)
    result = text.replace(/Market Research/gi, `<span class="${BLUE_CLASS}">Market Research</span>`)
    result = result.replace(/Trading Insights/gi, `<span class="${PURPLE_CLASS}">Trading Insights</span>`)
    console.log('✅ HEADLINE: Market Research(blue) + Trading Insights(purple)')
    return result
  }
  
  if (text.includes('Markets Closed') && text.includes('AI Never Sleeps')) {
    // "Markets Closed, But Your AI Never Sleeps" → AI Never Sleeps(blue) + Markets(purple)
    result = text.replace(/AI Never Sleeps/gi, `<span class="${BLUE_CLASS}">AI Never Sleeps</span>`)
    result = result.replace(/\bMarkets\b/gi, `<span class="${PURPLE_CLASS}">Markets</span>`)
    console.log('✅ HEADLINE: AI Never Sleeps(blue) + Markets(purple)')
    return result
  }
  
  if (text.includes('Markets Open Soon') && text.includes('Edge Awaits')) {
    // "Markets Open Soon — Your Swedish Edge Awaits" → Edge Awaits(blue) + Markets(purple)
    result = text.replace(/Edge Awaits/gi, `<span class="${BLUE_CLASS}">Edge Awaits</span>`)
    result = result.replace(/\bMarkets Open\b/gi, `<span class="${PURPLE_CLASS}">Markets Open</span>`)
    console.log('✅ HEADLINE: Edge Awaits(blue) + Markets Open(purple)')
    return result
  }
  
  if (text.includes('Live Market Action') && text.includes('Opportunities Now')) {
    // "Live Market Action — Swedish Opportunities Now" → Market Action(blue) + Opportunities(purple)
    result = text.replace(/Market Action/gi, `<span class="${BLUE_CLASS}">Market Action</span>`)
    result = result.replace(/\bOpportunities\b/gi, `<span class="${PURPLE_CLASS}">Opportunities</span>`)
    console.log('✅ HEADLINE: Market Action(blue) + Opportunities(purple)')
    return result
  }
  
  if (text.includes('Start Trading Smarter') && text.includes('AI-Powered')) {
    // "Start Trading Smarter with AI-Powered Insights" → AI-Powered(blue) + Trading Smarter(purple)
    result = text.replace(/AI-Powered/gi, `<span class="${BLUE_CLASS}">AI-Powered</span>`)
    result = result.replace(/Trading Smarter/gi, `<span class="${PURPLE_CLASS}">Trading Smarter</span>`)
    console.log('✅ HEADLINE: AI-Powered(blue) + Trading Smarter(purple)')
    return result
  }
  
  if (text.includes('Welcome Back') && text.includes('Trade Smarter')) {
    // "Welcome Back — Ready to Trade Smarter?" → Ready to(blue) + Trade Smarter(purple) 
    result = text.replace(/Ready to/gi, `<span class="${BLUE_CLASS}">Ready to</span>`)
    result = result.replace(/Trade Smarter/gi, `<span class="${PURPLE_CLASS}">Trade Smarter</span>`)
    console.log('✅ HEADLINE: Ready to(blue) + Trade Smarter(purple)')
    return result
  }
  
  // Additional personalization variant rules
  if (text.includes('Global insight') && text.includes('built for')) {
    // "Global insight, built for {country} markets" → Global insight(blue) + markets(purple)
    result = text.replace(/Global insight/gi, `<span class="${BLUE_CLASS}">Global insight</span>`)
    result = result.replace(/\bmarkets\b/gi, `<span class="${PURPLE_CLASS}">markets</span>`)
    console.log('✅ HEADLINE: Global insight(blue) + markets(purple)')
    return result
  }
  
  if (text.includes('Your edge in') && text.includes('markets')) {
    // "Your edge in {countryAdjective} markets" → Your edge(blue) + markets(purple)
    result = text.replace(/Your edge/gi, `<span class="${BLUE_CLASS}">Your edge</span>`)
    result = result.replace(/\bmarkets\b/gi, `<span class="${PURPLE_CLASS}">markets</span>`)
    console.log('✅ HEADLINE: Your edge(blue) + markets(purple)')
    return result
  }
  
  if (text.includes('Trade') && text.includes('with global AI power')) {
    // "Trade {countryAdjective} markets with global AI power" → AI power(blue) + Trade(purple)
    result = text.replace(/AI power/gi, `<span class="${BLUE_CLASS}">AI power</span>`)
    result = result.replace(/\bTrade\b/gi, `<span class="${PURPLE_CLASS}">Trade</span>`)
    console.log('✅ HEADLINE: AI power(blue) + Trade(purple)')
    return result
  }
  
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
        // Europe
        'Sweden': 'Swedish',
        'Spain': 'Spanish',
        'Germany': 'German',
        'France': 'French',
        'Italy': 'Italian',
        'United Kingdom': 'UK',
        'Netherlands': 'Dutch',
        'Portugal': 'Portuguese',
        'Belgium': 'Belgian',
        'Switzerland': 'Swiss',
        'Austria': 'Austrian',
        'Norway': 'Norwegian',
        'Denmark': 'Danish',
        'Finland': 'Finnish',
        'Poland': 'Polish',
        'Czech Republic': 'Czech',
        'Greece': 'Greek',
        
        // Americas
        'United States': 'US',
        'Canada': 'Canadian',
        'Mexico': 'Mexican',
        'Brazil': 'Brazilian',
        'Argentina': 'Argentine',
        'Chile': 'Chilean',
        'Colombia': 'Colombian',
        'Peru': 'Peruvian',
        
        // Asia-Pacific
        'Japan': 'Japanese',
        'China': 'Chinese',
        'India': 'Indian',
        'Australia': 'Australian',
        'New Zealand': 'New Zealand',
        'South Korea': 'Korean',
        'Singapore': 'Singaporean',
        'Hong Kong': 'Hong Kong',
        'Thailand': 'Thai',
        'Malaysia': 'Malaysian',
        'Indonesia': 'Indonesian',
        'Philippines': 'Filipino',
        'Vietnam': 'Vietnamese',
        
        // Middle East & Africa
        'United Arab Emirates': 'UAE',
        'Saudi Arabia': 'Saudi',
        'Israel': 'Israeli',
        'Turkey': 'Turkish',
        'South Africa': 'South African',
        'Egypt': 'Egyptian',
        'Morocco': 'Moroccan',
        'Nigeria': 'Nigerian',
        'Kenya': 'Kenyan'
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
  
  // FINAL FALLBACK: Apply general blue/purple rules if no specific highlighting was applied
  if (!result.includes(BLUE_CLASS) || !result.includes(PURPLE_CLASS)) {
    // Apply blue highlighting rules first
    result = applyHighlightingRules(result, rules.blue, BLUE_CLASS)
    
    // Apply purple highlighting rules second  
    result = applyHighlightingRules(result, rules.purple, PURPLE_CLASS)
    
    console.log('🔧 Applied general blue/purple rules as fallback')
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
  
  // Skip highlighting if text already contains highlight spans
  if (text.includes('<span class="text-blue-') || text.includes('<span class="text-purple-')) {
    console.log('🚫 SUBHEADLINE already highlighted, skipping:', text.substring(0, 100) + '...')
    return text
  }
  
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
      'research': ['research', 'recherche', 'بحوث', 'أبحاث', 'Market Research'],
      'market_research': ['market research', 'Market Research', 'recherche de marché', 'بحوث السوق', 'أبحاث السوق'],
      'powerful': ['powerful', 'puissante', 'قوية'],
      'get': ['get', 'Get', 'obtenez', 'احصل', 'احصلوا'],
      'start': ['start', 'Start', 'commencez', 'ابدأ', 'ابدأوا'],
      'real_time': ['real-time', 'real time', 'temps réel', 'الوقت الحقيقي'],
      'ai': ['AI', 'IA', 'الذكاء الاصطناعي'],
      'insight': ['insight', 'vision globale', 'رؤية عالمية'],
      'smart_decisions': ['smarter decisions', 'décisions intelligentes', 'قرارات ذكية', 'قرارات أذكى'],
      'custom': ['custom', 'Custom', 'personnalisées', 'مخصصة'],
      'free_beta': ['free beta', 'bêta gratuite', 'بيتا مجانية'],
      'ready': ['ready', 'prêt', 'جاهز', 'مستعد'],
      'redefined': ['redefined', 'redéfini', 'مُعاد تعريف'],
      'intelligence': ['intelligence', 'Intelligence', 'intelligence', 'ذكاء'],
      'connected': ['connected', 'connecté', 'متصل'],
      'stay_connected': ['stay connected', 'restez connecté', 'ابق متصلاً']
    },
    // Purple keywords (entities/instruments/services)
    purple: {
      'trading_signals': ['trading signals', 'Trading Signals', 'signaux de trading', 'إشارات التداول'],
      'trading_insights': ['trading insights', 'Trading Insights', 'analyses de trading', 'رؤى التداول'],
      'alerts': ['alerts', 'Alerts', 'alertes', 'تنبيهات'],
      'custom_alerts': ['custom alerts', 'alertes personnalisées', 'تنبيهات مخصصة'],
      'markets': ['markets', 'Markets', 'Swedish markets', 'marchés', 'الأسواق', 'السوق'],
      'stocks': ['stocks', 'actions', 'الأسهم'],
      'crypto': ['crypto', 'crypto', 'العملات المشفرة'],
      'indices': ['indices', 'indices', 'المؤشرات'],
      'commodities': ['commodities', 'matières premières', 'السلع'],
      'trade_execution': ['trade execution', 'exécution des trades', 'تنفيذ الصفقات'],
      'execution': ['execution', 'exécution', 'تنفيذ'],
      'wall_street': ['Wall Street', 'وول ستريت'],
      'omxs30': ['OMXS30', 'OMX', 'OMXS'],
      'swing': ['swing', 'mouvement', 'تحرك'],
      'every_swing': ['every swing', 'chaque mouvement', 'كل تحرك']
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
        if (regex.test(text) && !result.includes(`>${translation.toLowerCase()}<`) && !result.includes(`>${translation}<`)) {
          // Match the actual case in the text
          const matches = text.match(regex)
          if (matches && matches[0]) {
            const actualMatch = matches[0]
            result = result.replace(regex, `<span class="${cssClass}">${actualMatch}</span>`)
            highlightCount++
            console.log(`✨ Highlighted '${actualMatch}' with ${cssClass}`)
            break // Move to next concept once we find a match
          }
        }
      }
    }
    
    return { result, count: highlightCount }
  }
  
  // ENFORCE EXACT HIGHLIGHTING RULES FOR SPECIFIC CONTENT
  console.log('🌎 Processing text for highlighting:', text)
  
  // Handle specific personalized headlines with exact rules
  if (text.includes('Swedish markets') && text.includes('intelligence')) {
    // "Swedish markets, redefined by intelligence" → markets(purple) + intelligence(blue)
    result = text.replace(/Swedish markets/gi, `<span class="${PURPLE_CLASS}">Swedish markets</span>`)
    result = result.replace(/intelligence/gi, `<span class="${BLUE_CLASS}">intelligence</span>`)
    console.log('✅ Applied specific rule: Swedish markets(purple) + intelligence(blue)')
    return result
  }
  
  if (text.includes('Stockholm') && text.includes('Wall Street')) {
    // "From Stockholm to Wall Street, track every market pulse, 24/7." → track(blue) + Stockholm(purple)
    result = text.replace(/\btrack\b/gi, `<span class="${BLUE_CLASS}">track</span>`)
    result = result.replace(/Stockholm/gi, `<span class="${PURPLE_CLASS}">Stockholm</span>`)
    console.log('✅ Applied specific rule: track(blue) + Stockholm(purple)')
    return result
  }
  
  if (text.includes('AI eyes') && text.includes('opportunity never sleeps')) {
    // "AI eyes on Swedish markets — opportunity never sleeps" → AI(blue) + markets(purple)  
    result = text.replace(/\bAI\b/gi, `<span class="${BLUE_CLASS}">AI</span>`)
    result = result.replace(/Swedish markets/gi, `<span class="${PURPLE_CLASS}">Swedish markets</span>`)
    console.log('✅ Applied specific rule: AI(blue) + Swedish markets(purple)')
    return result
  }
  
  // Additional personalization variant subheadline rules
  if (text.includes('smarter decisions')) {
    // "From {city} to Wall Street, turn real-time moves into smarter decisions." → smarter decisions(blue) + Wall Street(purple)
    result = text.replace(/smarter decisions/gi, `<span class="${BLUE_CLASS}">smarter decisions</span>`)
    result = result.replace(/Wall Street/gi, `<span class="${PURPLE_CLASS}">Wall Street</span>`)
    console.log('✅ Applied rule: smarter decisions(blue) + Wall Street(purple)')
    return result
  }
  
  if (text.includes('AI scanning') && text.includes('confident moves')) {
    // "With AI scanning global markets day and night, you focus on making confident moves." → AI scanning(blue) + markets(purple)
    result = text.replace(/AI scanning/gi, `<span class="${BLUE_CLASS}">AI scanning</span>`)
    result = result.replace(/global markets/gi, `<span class="${PURPLE_CLASS}">global markets</span>`)
    console.log('✅ Applied rule: AI scanning(blue) + global markets(purple)')
    return result
  }
  
  if (text.includes('AI keeps an eye on') && text.includes('miss a beat')) {
    // "From {city} to Wall Street, our AI keeps an eye on markets so you don't miss a beat." → AI keeps an eye(blue) + markets(purple)
    result = text.replace(/AI keeps an eye/gi, `<span class="${BLUE_CLASS}">AI keeps an eye</span>`)
    result = result.replace(/\bmarkets\b/gi, `<span class="${PURPLE_CLASS}">markets</span>`)
    console.log('✅ Applied rule: AI keeps an eye(blue) + markets(purple)')
    return result
  }
  
  if (text.includes('Pre-market intelligence')) {
    // "Pre-market intelligence for {city} traders. Get positioned before the opening bell." → Pre-market intelligence(blue) + traders(purple)
    result = text.replace(/Pre-market intelligence/gi, `<span class="${BLUE_CLASS}">Pre-market intelligence</span>`)
    result = result.replace(/\btraders\b/gi, `<span class="${PURPLE_CLASS}">traders</span>`)
    console.log('✅ Applied rule: Pre-market intelligence(blue) + traders(purple)')
    return result
  }
  
  if (text.includes('Real-time signals') && text.includes('active')) {
    // "Real-time signals and insights for active {city} traders during market hours." → Real-time signals(blue) + traders(purple)
    result = text.replace(/Real-time signals/gi, `<span class="${BLUE_CLASS}">Real-time signals</span>`)
    result = result.replace(/active.*?traders/gi, `<span class="${PURPLE_CLASS}">$&</span>`)
    console.log('✅ Applied rule: Real-time signals(blue) + active traders(purple)')
    return result
  }
  
  if (text.includes('After-hours insights') && text.includes('overnight analysis')) {
    // "After-hours insights and overnight analysis for {city} traders who never rest." → overnight analysis(blue) + traders(purple)
    result = text.replace(/overnight analysis/gi, `<span class="${BLUE_CLASS}">overnight analysis</span>`)
    result = result.replace(/\btraders\b/gi, `<span class="${PURPLE_CLASS}">traders</span>`)
    console.log('✅ Applied rule: overnight analysis(blue) + traders(purple)')
    return result
  }
  
  if (text.includes('AI finds opportunities') && text.includes('you make the decisions')) {
    // "Welcome to the future of trading. AI finds opportunities, you make the decisions." → AI finds opportunities(blue) + trading(purple)
    result = text.replace(/AI finds opportunities/gi, `<span class="${BLUE_CLASS}">AI finds opportunities</span>`)
    result = result.replace(/\btrading\b/gi, `<span class="${PURPLE_CLASS}">trading</span>`)
    console.log('✅ Applied rule: AI finds opportunities(blue) + trading(purple)')
    return result
  }
  
  if (text.includes('personalized') && text.includes('trading insights')) {
    // "Your personalized trading insights are waiting. Let's pick up where we left off." → personalized(blue) + trading insights(purple)
    result = text.replace(/personalized/gi, `<span class="${BLUE_CLASS}">personalized</span>`)
    result = result.replace(/trading insights/gi, `<span class="${PURPLE_CLASS}">trading insights</span>`)
    console.log('✅ Applied rule: personalized(blue) + trading insights(purple)')
    return result
  }
  
  // Check if this is base marketing text (no personalization)
  const isBaseMarketingText = 
    /powerful market research.*custom alerts.*trading signals/i.test(text) ||
    /market research.*alerts.*trading insights/i.test(text) ||
    /recherche.*alertes.*analyses/i.test(text) ||
    /recherche de marché.*alertes.*signaux de trading/i.test(text) ||
    /obtenez.*recherche de marché.*alertes.*signaux/i.test(text) ||
    /بحوث.*تنبيهات.*رؤى/i.test(text)
  
  if (isBaseMarketingText) {
    // Base marketing: research(blue) + trading signals(purple)
    result = result.replace(/\bresearch\b/gi, `<span class="${BLUE_CLASS}">research</span>`)
    result = result.replace(/trading signals/gi, `<span class="${PURPLE_CLASS}">trading signals</span>`)
    console.log('✅ Applied base marketing rule: research(blue) + trading signals(purple)')
    return result
  }
  
  // Apply semantic highlighting (language-agnostic) for other cases
  const blueResult = highlightSemanticKeywords(result, SEMANTIC_KEYWORDS.blue, BLUE_CLASS, 1)
  result = blueResult.result
  console.log('🔵 After blue highlighting:', result)
  
  const purpleResult = highlightSemanticKeywords(result, SEMANTIC_KEYWORDS.purple, PURPLE_CLASS, 1)  
  result = purpleResult.result
  console.log('🟪 After purple highlighting:', result)
  
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