/**
 * Mock Strapi Data for Development
 * 
 * This provides sample data that matches Strapi's API format
 * so we can continue development while waiting for Strapi dev mode
 */

export const useMockStrapi = () => {
  const mockArticles = [
    {
      id: 1,
      attributes: {
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
        author: 'HeliconTrade Team',
        publish_date: '2024-01-15',
        createdAt: '2024-01-15T10:00:00.000Z',
        updatedAt: '2024-01-15T10:00:00.000Z',
        publishedAt: '2024-01-15T10:00:00.000Z'
      }
    },
    {
      id: 2,
      attributes: {
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
        author: 'Sarah Chen, Head of AI',
        publish_date: '2024-01-20',
        createdAt: '2024-01-20T10:00:00.000Z',
        updatedAt: '2024-01-20T10:00:00.000Z',
        publishedAt: '2024-01-20T10:00:00.000Z'
      }
    },
    {
      id: 3,
      attributes: {
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
        author: 'Mike Rodriguez, Senior Analyst',
        publish_date: '2024-01-25',
        createdAt: '2024-01-25T10:00:00.000Z',
        updatedAt: '2024-01-25T10:00:00.000Z',
        publishedAt: '2024-01-25T10:00:00.000Z'
      }
    }
  ]

  const mockFeatures = [
    {
      id: 1,
      attributes: {
        name: 'Real-Time Market Data',
        description: 'Access live market data from multiple exchanges with millisecond precision',
        icon: 'chart-line',
        category: 'data',
        is_core_feature: true,
        coming_soon: false
      }
    },
    {
      id: 2,
      attributes: {
        name: 'AI Trading Signals',
        description: 'Get personalized trading signals powered by machine learning algorithms',
        icon: 'brain',
        category: 'ai',
        is_core_feature: true,
        coming_soon: false
      }
    },
    {
      id: 3,
      attributes: {
        name: 'Multi-Asset Portfolio',
        description: 'Trade stocks, crypto, forex, and commodities from a single interface',
        icon: 'layers',
        category: 'trading',
        is_core_feature: true,
        coming_soon: false
      }
    }
  ]

  const mockPages = [
    {
      id: 1,
      attributes: {
        title: 'Privacy Policy',
        slug: 'privacy',
        content: `# Privacy Policy

Last updated: January 1, 2024

HeliconTrade respects your privacy and is committed to protecting your personal information.

## Information We Collect

We collect information you provide directly to us, such as when you create an account, use our services, or contact us.

## How We Use Your Information

We use the information we collect to provide, maintain, and improve our services.

## Data Security

We implement appropriate security measures to protect your personal information.`,
        meta_title: 'Privacy Policy - HeliconTrade',
        meta_description: 'Learn how HeliconTrade protects and uses your personal information.'
      }
    }
  ]

  const fetchArticles = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockArticles
  }

  const fetchFeatures = async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockFeatures
  }

  const fetchPages = async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockPages
  }

  const fetchArticleBySlug = async (slug) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return mockArticles.find(article => article.attributes.slug === slug) || null
  }

  return {
    fetchArticles,
    fetchFeatures,
    fetchPages,
    fetchArticleBySlug,
    mockArticles,
    mockFeatures,
    mockPages
  }
}
