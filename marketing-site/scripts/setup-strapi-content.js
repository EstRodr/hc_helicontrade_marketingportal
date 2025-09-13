#!/usr/bin/env node

/**
 * Strapi Content Setup Script
 * 
 * This script automatically creates sample content after you've set up
 * the content types in the Strapi admin panel.
 * 
 * Prerequisites:
 * 1. Article content type created with fields: title, slug, content, excerpt, author
 * 2. Public permissions enabled for Article (find, findOne)
 * 3. API token configured
 */

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'c4375317631dd92245d66c24a1a7d9ed380791fe15aa0ad3c5486890a28c3fd95498cb26dfcfd68ee6d5de52461cda8ebe6c3ba8f94b3e97e5122ffbf54efd5fccc3ee7e848bb9239d5926b62a26e455ef3e4f90e83abce7c69978e0a2967528a76893ced80403bf34fa48617baaef51b0afbf43814bb0850f9fcfcd6c3d3ee7';

async function createArticle(data) {
  const response = await fetch(`${STRAPI_URL}/api/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create article: ${response.status} ${error}`);
  }

  return response.json();
}

async function testConnection() {
  try {
    console.log('🔄 Testing Strapi connection...');
    const response = await fetch(`${STRAPI_URL}/api/articles`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (response.ok) {
      console.log('✅ Connection successful!');
      return true;
    } else if (response.status === 404) {
      console.log('❌ Article content type not found. Please create it in the admin panel first.');
      return false;
    } else if (response.status === 403) {
      console.log('❌ Permission denied. Please enable public permissions for Article content type.');
      return false;
    } else {
      console.log(`❌ Connection failed: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Connection error:', error.message);
    return false;
  }
}

async function setupContent() {
  console.log('🚀 HeliconTrade Strapi Content Setup\n');

  // Test connection first
  const isConnected = await testConnection();
  if (!isConnected) {
    console.log('\n📋 Next steps:');
    console.log('1. Go to http://localhost:1337/admin');
    console.log('2. Create Article content type with fields: title, slug, content, excerpt, author');
    console.log('3. Enable public permissions (find, findOne) for Article');
    console.log('4. Run this script again');
    process.exit(1);
  }

  const sampleArticles = [
    {
      title: 'Getting Started with HeliconTrade',
      slug: 'getting-started-with-helicontrade',
      content: `# Welcome to HeliconTrade

HeliconTrade is the next-generation trading platform designed for Gen-Z traders who want sophisticated tools with intuitive interfaces.

## What Makes Us Different

- **AI-Powered Insights**: Get personalized trading recommendations
- **Real-Time Alerts**: Never miss market opportunities  
- **Multi-Asset Support**: Trade stocks, crypto, forex, and more
- **Educational Resources**: Learn while you trade

## Getting Started

1. Sign up for free beta access
2. Complete your profile setup
3. Start with paper trading
4. Upgrade to live trading when ready

Join thousands of traders already using HeliconTrade to make smarter investment decisions.`,
      excerpt: 'Learn how to get started with HeliconTrade, the AI-powered trading platform designed for the next generation of traders.',
      author: 'HeliconTrade Team'
    },
    {
      title: 'AI-Powered Trading: The Future is Here',
      slug: 'ai-powered-trading-future',
      content: `# The Revolution of AI in Trading

Artificial Intelligence is transforming how we approach financial markets. At HeliconTrade, we're at the forefront of this revolution.

## How AI Enhances Your Trading

### Smart Market Analysis
Our AI algorithms analyze thousands of data points in real-time, identifying patterns that human traders might miss.

### Personalized Recommendations
Get trading suggestions tailored to your risk tolerance, investment goals, and market preferences.

### Risk Management
AI-powered risk assessment helps protect your portfolio from unexpected market volatility.

## The HeliconTrade Advantage

Unlike traditional trading platforms, our AI learns from your trading behavior and continuously improves its recommendations.`,
      excerpt: 'Discover how AI-powered trading is revolutionizing financial markets and how HeliconTrade leads this transformation.',
      author: 'Sarah Chen, Head of AI'
    },
    {
      title: 'Market Volatility: Opportunity or Risk?',
      slug: 'market-volatility-opportunity-or-risk',
      content: `# Understanding Market Volatility

Market volatility can be intimidating for new traders, but with the right tools and knowledge, it becomes an opportunity.

## What Causes Volatility?

- Economic indicators
- Geopolitical events  
- Market sentiment
- Technological disruptions

## How HeliconTrade Helps

Our platform provides:
- Real-time volatility alerts
- Risk assessment tools
- Historical volatility analysis
- Hedging recommendations

## Best Practices

1. **Diversify your portfolio** across different asset classes
2. **Set stop-loss orders** to limit potential losses
3. **Stay informed** with our news integration
4. **Use our volatility indicators** to time your trades

Remember: volatility creates opportunity for prepared traders.`,
      excerpt: 'Learn how to navigate market volatility and turn uncertainty into trading opportunities with HeliconTrade.',
      author: 'Mike Rodriguez, Senior Analyst'
    }
  ];

  console.log('📝 Creating sample articles...\n');

  for (const article of sampleArticles) {
    try {
      console.log(`Creating: "${article.title}"`);
      const result = await createArticle(article);
      console.log(`✅ Created article with ID: ${result.data.id}`);
    } catch (error) {
      console.log(`❌ Failed to create "${article.title}":`, error.message);
    }
  }

  console.log('\n🎉 Content setup complete!');
  console.log('\nTest your integration at: http://helicontrade.local:3000/strapi-test');
}

// Run the script
setupContent().catch(console.error);
