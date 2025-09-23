const fs = require('fs');

// Test current token and create sample news
async function setupNewsContent() {
  console.log('🚀 HeliconTrade News Content Setup\n');
  
  // Read token from .env
  const envContent = fs.readFileSync('.env', 'utf8');
  const tokenMatch = envContent.match(/NUXT_PUBLIC_STRAPI_TOKEN=(.+)/);
  const token = tokenMatch ? tokenMatch[1].trim() : null;
  
  if (!token) {
    console.log('❌ No token found in .env file');
    return;
  }
  
  console.log(`📝 Found token: ${token.substring(0, 20)}...`);
  
  const STRAPI_URL = 'http://localhost:1337';
  
  // Test connection first
  try {
    console.log('🔄 Testing news API endpoint...');
    const testResponse = await fetch(`${STRAPI_URL}/api/news`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`📊 News API Status: ${testResponse.status}`);
    
    if (testResponse.status === 404) {
      console.log('❌ News content type not found or permissions not set');
      console.log('\n📋 Next steps:');
      console.log('1. Go to http://localhost:1337/admin');
      console.log('2. Go to Settings → Users & Permissions → Roles → Public');
      console.log('3. Enable "find" and "findOne" permissions for News');
      console.log('4. Go to Settings → Users & Permissions → Roles → Authenticated');
      console.log('5. Enable all permissions for News');
      console.log('6. Run this script again');
      return;
    }
    
    if (testResponse.status === 403) {
      console.log('❌ Permission denied for news endpoint');
      console.log('Need to enable permissions in Strapi admin');
      return;
    }
    
    if (testResponse.ok) {
      console.log('✅ News API endpoint accessible!');
      
      // Create sample news articles
      const sampleNews = [
        {
          title: 'Market Opens Higher on Strong Economic Data',
          slug: 'market-opens-higher-strong-economic-data',
          content: `# Market Rally Continues

The markets opened significantly higher today following the release of stronger-than-expected economic indicators.

## Key Highlights:
- GDP growth exceeded forecasts at 3.2%
- Unemployment dropped to 3.8%
- Consumer confidence index reached 6-month high

## Market Response:
- S&P 500 up 2.1%
- Technology sector leading gains
- Volume above average indicating strong investor interest

*This is a developing story and will be updated throughout the trading day.*`,
          excerpt: 'Markets surge on positive economic data with S&P 500 gaining over 2% in early trading.',
          author: 'HeliconTrade Market Desk',
          category: 'Market Update',
          priority: 'High'
        },
        {
          title: 'New Trading Features Released in Platform Update',
          slug: 'new-trading-features-released-platform-update',
          content: `# HeliconTrade Platform Enhancement

We're excited to announce the release of new advanced trading features designed to enhance your trading experience.

## New Features Include:
- **Advanced Charting Tools**: Enhanced technical analysis capabilities
- **Smart Alerts**: AI-powered market movement notifications  
- **Portfolio Analytics**: Detailed performance tracking and insights
- **Mobile Optimization**: Improved trading experience on mobile devices

## Rollout Timeline:
The updates will be rolled out to all users over the next 48 hours.

For questions about the new features, please contact our support team.`,
          excerpt: 'Enhanced trading tools and analytics now available for all HeliconTrade users.',
          author: 'HeliconTrade Development Team',
          category: 'Company News',
          priority: 'Medium'
        },
        {
          title: 'Federal Reserve Announces Interest Rate Decision',
          slug: 'federal-reserve-announces-interest-rate-decision',
          content: `# Fed Holds Rates Steady at 5.25-5.50%

The Federal Reserve announced today that it will maintain the federal funds rate at its current range of 5.25% to 5.50%.

## Key Points from the Announcement:
- Inflation showing signs of cooling
- Labor market remains robust
- Economic growth steady but slowing

## Market Impact:
- Bond yields declining across the curve
- Dollar strengthening against major currencies
- Financial sector stocks mixed

**Analysis**: This decision aligns with market expectations and suggests a more measured approach to monetary policy going forward.`,
          excerpt: 'Federal Reserve keeps interest rates unchanged at 5.25-5.50% as inflation shows signs of moderating.',
          author: 'Financial News Wire',
          category: 'Breaking News',
          priority: 'Critical'
        },
        {
          title: 'Weekly Market Outlook: Key Events to Watch',
          slug: 'weekly-market-outlook-key-events-watch',
          content: `# This Week in the Markets

Here's what traders should be watching in the upcoming trading week.

## Economic Calendar Highlights:
- **Monday**: Manufacturing PMI data
- **Wednesday**: FOMC meeting minutes release
- **Friday**: Non-farm payrolls report

## Earnings Reports:
Several major technology companies report quarterly results this week.

## Technical Levels to Watch:
- S&P 500: Support at 4,200, resistance at 4,350
- NASDAQ: Key level at 13,000
- VIX: Currently elevated above 20

Stay tuned for our daily market updates and analysis.`,
          excerpt: 'Your guide to the key events and data releases that could move markets this week.',
          author: 'HeliconTrade Research Team',
          category: 'Market Update',
          priority: 'Low'
        }
      ];
      
      console.log('📝 Creating sample news articles...\n');
      
      for (const news of sampleNews) {
        try {
          console.log(`Creating: "${news.title}"`);
          const response = await fetch(`${STRAPI_URL}/api/news`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ data: news }),
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log(`✅ Created news with ID: ${result.data.id}`);
          } else {
            const error = await response.text();
            console.log(`❌ Failed to create "${news.title}": ${response.status} ${error}`);
          }
        } catch (error) {
          console.log(`❌ Error creating "${news.title}":`, error.message);
        }
      }
      
      console.log('\n🎉 News content setup complete!');
      console.log('Test your news integration at: http://helicontrade.local:3002/news');
    }
    
  } catch (error) {
    console.log('❌ Connection error:', error.message);
  }
}

setupNewsContent().catch(console.error);