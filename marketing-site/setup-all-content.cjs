const fs = require('fs');
const path = require('path');

// Read token from .env file
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
  process.exit(1);
}

console.log('🚀 Setting up ALL Strapi content...\n');

// Sample blog articles
const blogArticles = [
  {
    title: "Getting Started with AI-Powered Trading",
    slug: "getting-started-ai-trading",
    content: `# Welcome to the Future of Trading

AI-powered trading is revolutionizing how we approach financial markets. At HeliconTrade, we combine cutting-edge artificial intelligence with intuitive design to help traders of all levels make smarter decisions.

## What Makes AI Trading Different?

Traditional trading relies on manual analysis and gut instinct. AI trading uses:

- **Pattern Recognition**: AI can identify complex market patterns that humans might miss
- **24/7 Monitoring**: Never miss an opportunity while you sleep
- **Risk Management**: Automated stop-losses and position sizing
- **Emotion-Free Decisions**: Remove fear and greed from your trading

## Getting Started

1. **Sign up** for your free HeliconTrade account
2. **Set your preferences** - risk tolerance, trading style, favorite assets
3. **Start paper trading** to test the AI recommendations
4. **Go live** when you're comfortable with the system

## Key Features for Beginners

### Smart Alerts
Get notified when the AI spots opportunities that match your criteria.

### Educational Resources
Learn while you trade with our built-in educational content.

### Risk Management
Our AI helps you size positions appropriately for your account.

Join thousands of traders who are already using AI to improve their trading results!`,
    excerpt: "Discover how AI-powered trading can help you make smarter investment decisions with 24/7 market monitoring and intelligent pattern recognition.",
    author: "HeliconTrade Team",
    publishedAt: new Date().toISOString()
  },
  {
    title: "5 Essential Trading Patterns Every Trader Should Know",
    slug: "essential-trading-patterns",
    content: `# Master These 5 Trading Patterns

Understanding chart patterns is crucial for successful trading. Here are the 5 most reliable patterns that our AI actively monitors.

## 1. Head and Shoulders

A reversal pattern that signals the end of an uptrend.

**What to look for:**
- Three peaks, with the middle one being the highest
- Equal volume on both shoulders
- Break below the neckline for confirmation

## 2. Double Top/Bottom

Strong reversal patterns that indicate trend changes.

**Double Top characteristics:**
- Two peaks at approximately the same level
- Significant decline between peaks
- Break below support confirms reversal

## 3. Triangle Patterns

Continuation patterns that signal the trend will resume.

**Types:**
- **Ascending Triangle**: Bullish continuation
- **Descending Triangle**: Bearish continuation
- **Symmetrical Triangle**: Breakout direction unclear

## 4. Cup and Handle

A bullish continuation pattern resembling a tea cup.

**Formation:**
- Initial decline (cup formation)
- Rounding bottom
- Small pullback (handle)
- Breakout above resistance

## 5. Flag Patterns

Short-term continuation patterns after strong moves.

**Bull Flag:**
- Strong upward move (flagpole)
- Small consolidation (flag)
- Breakout continues uptrend

## How AI Helps

Our AI can spot these patterns automatically across thousands of assets simultaneously, alerting you to high-probability setups 24/7.`,
    excerpt: "Learn the 5 most important chart patterns that professional traders use to identify high-probability trading opportunities.",
    author: "Sarah Chen, Head of Research",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    title: "Risk Management: The Key to Long-Term Trading Success",
    slug: "risk-management-guide",
    content: `# Risk Management: Your Trading Lifeline

The difference between successful traders and those who blow up their accounts? Risk management.

## The Golden Rules

### 1. Never Risk More Than 2% Per Trade
This is the most important rule. Even with a 50% win rate, you can be profitable long-term.

### 2. Use Stop Losses Always
Set your stop loss before you enter the trade. Emotions run high when money is on the line.

### 3. Position Sizing Matters
Calculate your position size based on your stop loss distance and risk per trade.

**Formula:**
\`\`\`
Position Size = (Account Risk %) / (Entry Price - Stop Loss Price)
\`\`\`

### 4. Diversify Your Trades
Don't put all your risk in one asset or sector. Spread it across different opportunities.

## AI-Powered Risk Management

HeliconTrade's AI helps with:

- **Automatic position sizing** based on your risk preferences
- **Dynamic stop losses** that adjust with market volatility
- **Portfolio correlation analysis** to avoid over-concentration
- **Risk alerts** when you're approaching your limits

## Common Risk Management Mistakes

1. **Moving stop losses** in the wrong direction
2. **Risking too much** on "sure thing" trades
3. **Not having a plan** before entering trades
4. **Ignoring correlation** between positions

Remember: You can't control the market, but you can control your risk!`,
    excerpt: "Master the art of risk management with proven strategies that separate successful traders from the rest.",
    author: "Mike Rodriguez, Senior Trader",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Sample news articles
const newsArticles = [
  {
    title: "HeliconTrade Launches Advanced AI Pattern Recognition",
    slug: "ai-pattern-recognition-launch",
    content: `# HeliconTrade Unveils Next-Generation AI Trading Technology

**NEW YORK** - HeliconTrade today announced the launch of its most advanced AI pattern recognition system, capable of identifying profitable trading opportunities with 95%+ accuracy across global markets.

## Revolutionary Technology

The new system processes over 10,000 data points per second, analyzing:

- Technical chart patterns
- Market sentiment indicators  
- Volume and flow data
- Macroeconomic factors
- Social media sentiment

## Key Features

### Lightning-Fast Analysis
The AI can scan thousands of assets simultaneously, identifying opportunities in real-time.

### Personalized Recommendations
Each user receives customized alerts based on their trading style and risk preferences.

### 24/7 Monitoring
Never miss an opportunity - the AI works around the clock, even when markets are closed in your timezone.

## Market Impact

"This technology represents a paradigm shift in retail trading," said CEO John Smith. "We're democratizing access to institutional-grade analysis tools."

Early beta users have reported:
- 40% improvement in win rates
- 60% reduction in time spent on analysis  
- 25% better risk-adjusted returns

The new features are available to all HeliconTrade users starting today.`,
    excerpt: "HeliconTrade unveils breakthrough AI technology that delivers 95%+ accuracy in pattern recognition across global markets.",
    category: "Company News",
    priority: "High",
    author: "PR Team",
    published_at_time: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  {
    title: "Federal Reserve Signals Interest Rate Changes Ahead",
    slug: "fed-interest-rate-signals",
    content: `# Fed Chair Indicates Potential Policy Shift in Economic Climate

**WASHINGTON** - Federal Reserve Chair Jerome Powell hinted at potential monetary policy adjustments in response to evolving economic conditions, sending ripples through financial markets.

## Key Highlights

### Powell's Statement
"We remain data-dependent and will adjust our policy stance as conditions warrant," Powell stated during the quarterly monetary policy briefing.

### Market Reaction
- **S&P 500**: +1.2% following the announcement
- **10-Year Treasury**: Yield dropped to 4.1%
- **Dollar Index**: Declined 0.8%

## Impact on Trading

### Sector Implications
**Winners:**
- Financial services stocks rallied on rate sensitivity
- Real estate investment trusts (REITs) saw increased activity
- Growth stocks benefited from lower rate expectations

**Under Pressure:**
- Utility stocks faced headwinds
- High-dividend sectors saw mixed reactions

### AI Trading Advantage
HeliconTrade's AI system identified the policy shift probability 48 hours before the official announcement, alerting users to:
- Optimal positioning strategies
- Volatility opportunities
- Risk management adjustments

## What's Next?

Markets are now pricing in a 70% probability of policy changes at the next FOMC meeting. Traders should monitor:
- Employment data releases
- Inflation indicators
- Consumer spending patterns

Stay tuned to HeliconTrade for real-time analysis and AI-powered insights.`,
    excerpt: "Fed Chair Powell's latest comments suggest potential monetary policy shifts, creating new trading opportunities across multiple sectors.",
    category: "Market Update",
    priority: "Critical",
    author: "Market Analysis Team",
    published_at_time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
  {
    title: "Cryptocurrency Markets Show Strong Momentum",
    slug: "crypto-markets-momentum",
    content: `# Bitcoin Leads Cryptocurrency Rally as Institutional Adoption Grows

**Market Update** - Cryptocurrency markets are experiencing significant upward momentum, with Bitcoin leading the charge as institutional adoption continues to accelerate.

## Market Performance

### Top Performers (24h)
- **Bitcoin (BTC)**: +5.8% to $67,400
- **Ethereum (ETH)**: +4.2% to $3,680  
- **Cardano (ADA)**: +7.1% to $0.52
- **Solana (SOL)**: +6.9% to $145

### Volume Analysis
Total crypto market volume exceeded $95 billion in the past 24 hours, indicating strong trader interest across the ecosystem.

## Driving Factors

### Institutional Inflows
- Major corporations adding Bitcoin to treasury reserves
- New crypto ETF applications filed with SEC
- Pension funds exploring digital asset allocations

### Technical Breakouts
HeliconTrade's AI identified key technical levels being broken:
- Bitcoin cleared $65,000 resistance with strong volume
- Ethereum approaching all-time highs near $4,000
- Altcoins showing broad-based strength

## Risk Considerations

While momentum is strong, traders should be aware of:
- High volatility in crypto markets
- Regulatory uncertainty in some jurisdictions
- Profit-taking opportunities after strong runs

## AI Trading Insights

Our AI system is tracking:
- Optimal entry and exit points
- Cross-asset correlation changes
- Risk management strategies for crypto exposure

The current setup suggests continued strength, but proper risk management remains essential.`,
    excerpt: "Bitcoin leads a strong cryptocurrency rally as institutional adoption drives market momentum higher across major digital assets.",
    category: "Market Update",
    priority: "Medium",
    author: "Crypto Analysis Team",
    published_at_time: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  }
];

// Sample features
const features = [
  {
    title: "AI-Powered Opportunity Discovery",
    description: "Our advanced AI continuously scans global markets to find trading opportunities that match your specific strategy and risk preferences. Never miss a profitable setup again.",
    short_description: "AI finds opportunities that match your style",
    category: "Analysis",
    featured: true,
    order: 1
  },
  {
    title: "Smart Alerts & Notifications",
    description: "Get instant notifications when market conditions align with your trading criteria. Sleep better knowing our AI is watching the markets 24/7 on your behalf.",
    short_description: "Sleep better with smart notifications",
    category: "Trading",
    featured: true,
    order: 2,
    
  },
  {
    title: "Global Market Coverage",
    description: "Monitor stocks, forex, commodities, and crypto across all major global exchanges. Our AI tracks opportunities wherever they emerge in the worldwide marketplace.",
    short_description: "Complete global market monitoring",
    category: "Trading",
    featured: true,
    order: 3,
    
  },
  {
    title: "Personalized Intelligence",
    description: "The AI learns from your trading behavior and preferences to deliver increasingly personalized recommendations that match your unique style and risk tolerance.",
    short_description: "AI that learns your trading style",
    category: "Analysis",
    featured: true,
    order: 4,
    
  },
  {
    title: "Advanced Risk Management",
    description: "Protect your capital with AI-powered risk assessment tools, automated position sizing, and intelligent stop-loss recommendations based on market volatility.",
    short_description: "Intelligent risk protection",
    category: "Security",
    featured: false,
    order: 5,
    
  },
  {
    title: "Real-Time Market Data",
    description: "Access professional-grade market data feeds with real-time pricing, volume analysis, and institutional flow information from global exchanges.",
    short_description: "Professional market data feeds",
    category: "Trading",
    featured: false,
    order: 6,
    
  }
];

// Functions to create content
async function createContent(endpoint, data, name) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({ data })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Created ${name}: "${data.title}"`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to create ${name}: ${data.title}`, error.message);
    return null;
  }
}

// Main function to populate all content
async function populateAllContent() {
  console.log('📝 Creating blog articles...\n');
  for (const article of blogArticles) {
    await createContent('articles', article, 'blog article');
  }

  console.log('\n📰 Creating news articles...\n');
  for (const news of newsArticles) {
    await createContent('nnews', news, 'news article');
  }

  console.log('\n⚡ Creating features...\n');
  for (const feature of features) {
    await createContent('nfeatures', feature, 'feature');
  }

  console.log('\n🎉 Content population complete!');
  console.log('\n📊 Summary:');
  console.log(`- Blog articles: ${blogArticles.length} created`);
  console.log(`- News articles: ${newsArticles.length} created`);
  console.log(`- Features: ${features.length} created`);
  console.log('\n🔗 Test your content:');
  console.log('- Blog: http://localhost:3001/blog');
  console.log('- News: http://localhost:3001/news');
  console.log('- Features: http://localhost:3001/features');
}

populateAllContent().catch(console.error);