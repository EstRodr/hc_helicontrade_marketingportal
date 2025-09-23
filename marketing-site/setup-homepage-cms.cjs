// Read token from .env file
const fs = require('fs');
const path = require('path');

// Load .env file
const envPath = path.join(__dirname, '.env');
let STRAPI_TOKEN = null;

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const tokenMatch = envContent.match(/NUXT_PUBLIC_STRAPI_TOKEN=(.+)/);
  STRAPI_TOKEN = tokenMatch ? tokenMatch[1].trim() : null;
} catch (error) {
  console.error('❌ Could not read .env file:', error.message);
}

const STRAPI_URL = 'http://142.132.205.187';

if (!STRAPI_TOKEN || STRAPI_TOKEN === 'YOUR_NEW_TOKEN_HERE') {
  console.error('❌ No valid Strapi token found in .env file');
  console.log('Make sure NUXT_PUBLIC_STRAPI_TOKEN is set in your .env file');
  process.exit(1);
}

// Homepage content structure
const homepageContent = {
  // Hero Section
  hero_headline_default: "AI finds the opportunities, you make the decisions",
  hero_headline_live: "Markets are LIVE — AI is watching for opportunities", 
  hero_headline_premarket: "Pre-market is heating up — Get ready for the open",
  hero_headline_afterhours: "After-hours action continues — AI never stops",
  
  hero_subline_default: "Sleep better, trade smarter with 24/7 AI market monitoring.",
  hero_subline_live: "Your AI trading assistant is scanning global markets right now for opportunities that match your strategy.",
  hero_subline_premarket: "Get positioned before the market opens with AI-powered pre-market analysis and opportunity detection.", 
  hero_subline_afterhours: "Extended hours trading continues with AI monitoring overnight markets and global opportunities.",
  
  // CTA Section
  cta_primary: "Get started for free",
  cta_secondary: "View demo", 
  cta_disclaimer: "Start free — No credit card required",
  
  // Value Propositions
  value_prop_1: "AI-powered opportunity discovery",
  value_prop_2: "24/7 market scanning", 
  value_prop_3: "Personalized to your strategy",
  
  // Platform Stats (for the stats section)
  stat_1_value: "24/7",
  stat_1_label: "Market Monitoring", 
  stat_1_subtext: "never stops watching",
  
  stat_2_value: "10,000+",
  stat_2_label: "Assets Scanned",
  stat_2_subtext: "across global markets",
  
  stat_3_value: "95%+", 
  stat_3_label: "Pattern Accuracy",
  stat_3_subtext: "AI-powered detection",
  
  stat_4_value: "<0.3ms",
  stat_4_label: "Alert Speed", 
  stat_4_subtext: "lightning-fast notifications",
  
  // SEO Meta
  page_title: "HeliconTrade — Where Traders Research, Then Commit",
  meta_description: "AI-powered trading platform that monitors global markets 24/7 to find opportunities matching your strategy. Sleep better while AI watches the markets for you.",
  meta_keywords: "trading platform, market analysis, charts, real-time data, trading community, financial markets",
  
  // Published state
  published: true
};

console.log('🚀 Setting up Homepage CMS content...\n');

async function createHomepageContent() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/homepage`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({
        data: homepageContent
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Created homepage content successfully');
    console.log('📄 Content includes:');
    console.log('- Hero headlines (4 variations based on market status)');
    console.log('- Hero sublines (4 matching variations)'); 
    console.log('- CTA buttons and disclaimer text');
    console.log('- Value propositions (3 key points)');
    console.log('- Platform statistics (4 metrics)');
    console.log('- SEO metadata (title, description, keywords)');
    
    return result;
  } catch (error) {
    console.error('❌ Failed to create homepage content:', error.message);
    
    if (error.message.includes('404')) {
      console.log('\n🔧 Next steps:');
      console.log('1. Create "Homepage" content type in Strapi admin');
      console.log('2. Add the following fields:');
      console.log('   - All fields as Text (Short text) type');
      console.log('   - published as Boolean (default: true)');
      console.log('3. Set permissions for Public role (find, findOne)');
      console.log('4. Run this script again');
    }
    return null;
  }
}

createHomepageContent().catch(console.error);