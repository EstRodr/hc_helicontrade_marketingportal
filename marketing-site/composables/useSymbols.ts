interface TradingSymbol {
  symbol: string
  name: string
  type: 'stock' | 'crypto' | 'forex' | 'index' | 'commodity' | 'etf'
  exchange: string
  currency: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap?: number
  description: string
  sector?: string
  tags: string[]
  country: string
  isActive: boolean
  lastUpdated: Date
}

interface SearchResult {
  symbol: TradingSymbol
  matchScore: number
  matchType: 'symbol' | 'name' | 'tag'
}

// Comprehensive symbols database
const symbolsDatabase: TradingSymbol[] = [
  // Major US Stocks
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    price: 189.34,
    change: 2.45,
    changePercent: 1.31,
    volume: 52000000,
    marketCap: 2800000000000,
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
    sector: 'Technology',
    tags: ['technology', 'consumer electronics', 'iphone', 'mac', 'blue chip', 'dividend'],
    country: 'US',
    isActive: true,
    lastUpdated: new Date()
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    price: 415.67,
    change: 8.23,
    changePercent: 2.02,
    volume: 28000000,
    marketCap: 3100000000000,
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.',
    sector: 'Technology',
    tags: ['technology', 'software', 'cloud', 'azure', 'office', 'blue chip', 'dividend'],
    country: 'US',
    isActive: true,
    lastUpdated: new Date()
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    price: 142.38,
    change: 1.89,
    changePercent: 1.35,
    volume: 35000000,
    marketCap: 1800000000000,
    description: 'Alphabet Inc. provides online advertising services in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.',
    sector: 'Technology',
    tags: ['technology', 'search', 'advertising', 'cloud', 'ai', 'youtube'],
    country: 'US',
    isActive: true,
    lastUpdated: new Date()
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    price: 248.91,
    change: -3.42,
    changePercent: -1.35,
    volume: 95000000,
    marketCap: 780000000000,
    description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.',
    sector: 'Consumer Cyclical',
    tags: ['electric vehicles', 'ev', 'energy', 'solar', 'autonomous driving', 'innovation'],
    country: 'US',
    isActive: true,
    lastUpdated: new Date()
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    price: 875.22,
    change: 12.87,
    changePercent: 1.49,
    volume: 42000000,
    marketCap: 2150000000000,
    description: 'NVIDIA Corporation operates as a computing company in the United States, Taiwan, China, and internationally.',
    sector: 'Technology',
    tags: ['semiconductors', 'gpu', 'ai', 'gaming', 'data center', 'machine learning'],
    country: 'US',
    isActive: true,
    lastUpdated: new Date()
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    price: 523.45,
    change: -5.67,
    changePercent: -1.07,
    volume: 18000000,
    marketCap: 1300000000000,
    description: 'Meta Platforms, Inc. develops products that enable people to connect and share with friends and family through mobile devices, personal computers, virtual reality headsets, and wearables.',
    sector: 'Technology',
    tags: ['social media', 'facebook', 'instagram', 'whatsapp', 'vr', 'metaverse'],
    country: 'US',
    isActive: true,
    lastUpdated: new Date()
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    type: 'stock',
    exchange: 'NASDAQ',
    currency: 'USD',
    price: 145.78,
    change: 2.34,
    changePercent: 1.63,
    volume: 32000000,
    marketCap: 1500000000000,
    description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.',
    sector: 'Consumer Cyclical',
    tags: ['ecommerce', 'cloud', 'aws', 'retail', 'logistics', 'streaming'],
    country: 'US',
    isActive: true,
    lastUpdated: new Date()
  },

  // Major Indices
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    type: 'etf',
    exchange: 'NYSE',
    currency: 'USD',
    price: 445.67,
    change: 2.34,
    changePercent: 0.53,
    volume: 85000000,
    description: 'The investment seeks to provide investment results that, before expenses, correspond generally to the price and yield performance of the S&P 500 Index.',
    tags: ['s&p 500', 'index', 'broad market', 'large cap', 'diversified'],
    country: 'US',
    isActive: true,
    lastUpdated: new Date()
  },
  {
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust',
    type: 'etf',
    exchange: 'NASDAQ',
    currency: 'USD',
    price: 378.92,
    change: 1.87,
    changePercent: 0.50,
    volume: 45000000,
    description: 'The investment seeks investment results that correspond generally to the price and yield performance of the NASDAQ-100 Index.',
    tags: ['nasdaq 100', 'technology', 'growth', 'large cap'],
    country: 'US',
    isActive: true,
    lastUpdated: new Date()
  },
  {
    symbol: 'DIA',
    name: 'SPDR Dow Jones Industrial Average ETF',
    type: 'etf',
    exchange: 'NYSE',
    currency: 'USD',
    price: 347.23,
    change: -0.45,
    changePercent: -0.13,
    volume: 8500000,
    description: 'The investment seeks to provide investment results that, before expenses, correspond generally to the price and yield performance of the Dow Jones Industrial Average.',
    tags: ['dow jones', 'industrial', 'blue chip', 'dividend'],
    country: 'US',
    isActive: true,
    lastUpdated: new Date()
  },

  // Major Cryptocurrencies
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    exchange: 'Crypto',
    currency: 'USD',
    price: 67234,
    change: 1240,
    changePercent: 1.88,
    volume: 2500000000,
    description: 'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network.',
    tags: ['cryptocurrency', 'digital currency', 'blockchain', 'store of value', 'decentralized'],
    country: 'Global',
    isActive: true,
    lastUpdated: new Date()
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    exchange: 'Crypto',
    currency: 'USD',
    price: 3456,
    change: -89,
    changePercent: -2.51,
    volume: 1800000000,
    description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.',
    tags: ['cryptocurrency', 'smart contracts', 'defi', 'blockchain', 'ethereum'],
    country: 'Global',
    isActive: true,
    lastUpdated: new Date()
  },

  // Major Forex Pairs
  {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    type: 'forex',
    exchange: 'FX',
    currency: 'USD',
    price: 1.0756,
    change: -0.0023,
    changePercent: -0.21,
    volume: 0,
    description: 'The EUR/USD currency pair represents the euro versus the US dollar and is one of the most traded currency pairs in the forex market.',
    tags: ['forex', 'currency', 'euro', 'dollar', 'major pair'],
    country: 'Global',
    isActive: true,
    lastUpdated: new Date()
  },
  {
    symbol: 'GBPUSD',
    name: 'British Pound / US Dollar',
    type: 'forex',
    exchange: 'FX',
    currency: 'USD',
    price: 1.2645,
    change: 0.0034,
    changePercent: 0.27,
    volume: 0,
    description: 'The GBP/USD currency pair represents the British pound versus the US dollar, also known as "Cable".',
    tags: ['forex', 'currency', 'pound', 'dollar', 'cable', 'major pair'],
    country: 'Global',
    isActive: true,
    lastUpdated: new Date()
  },

  // Commodities
  {
    symbol: 'GOLD',
    name: 'Gold Futures',
    type: 'commodity',
    exchange: 'COMEX',
    currency: 'USD',
    price: 2034.50,
    change: 15.20,
    changePercent: 0.75,
    volume: 125000,
    description: 'Gold futures contracts for physical delivery of gold bullion.',
    tags: ['precious metals', 'gold', 'safe haven', 'inflation hedge', 'commodity'],
    country: 'Global',
    isActive: true,
    lastUpdated: new Date()
  },
  {
    symbol: 'OIL',
    name: 'Crude Oil Futures',
    type: 'commodity',
    exchange: 'NYMEX',
    currency: 'USD',
    price: 87.45,
    change: -1.23,
    changePercent: -1.39,
    volume: 285000,
    description: 'West Texas Intermediate (WTI) crude oil futures contracts.',
    tags: ['energy', 'oil', 'crude', 'commodity', 'energy sector'],
    country: 'Global',
    isActive: true,
    lastUpdated: new Date()
  }
]

export const useSymbols = () => {
  const symbols = ref<TradingSymbol[]>(symbolsDatabase)
  const searchResults = ref<SearchResult[]>([])
  const isSearching = ref(false)

  // Search symbols with regex matching and scoring
  const searchSymbols = (query: string, limit: number = 10): SearchResult[] => {
    if (!query || query.length < 1) {
      return []
    }

    const results: SearchResult[] = []
    const queryLower = query.toLowerCase()
    const queryRegex = new RegExp(query, 'gi')

    for (const symbol of symbols.value) {
      if (!symbol.isActive) continue

      let matchScore = 0
      let matchType: 'symbol' | 'name' | 'tag' = 'symbol'

      // Exact symbol match (highest priority)
      if (symbol.symbol.toLowerCase() === queryLower) {
        matchScore = 100
        matchType = 'symbol'
      }
      // Symbol starts with query
      else if (symbol.symbol.toLowerCase().startsWith(queryLower)) {
        matchScore = 90
        matchType = 'symbol'
      }
      // Symbol contains query
      else if (symbol.symbol.toLowerCase().includes(queryLower)) {
        matchScore = 80
        matchType = 'symbol'
      }
      // Exact name match
      else if (symbol.name.toLowerCase() === queryLower) {
        matchScore = 75
        matchType = 'name'
      }
      // Name starts with query
      else if (symbol.name.toLowerCase().startsWith(queryLower)) {
        matchScore = 70
        matchType = 'name'
      }
      // Name contains query
      else if (symbol.name.toLowerCase().includes(queryLower)) {
        matchScore = 60
        matchType = 'name'
      }
      // Tag exact match
      else if (symbol.tags.some(tag => tag.toLowerCase() === queryLower)) {
        matchScore = 55
        matchType = 'tag'
      }
      // Tag contains query
      else if (symbol.tags.some(tag => tag.toLowerCase().includes(queryLower))) {
        matchScore = 45
        matchType = 'tag'
      }
      // Regex match in symbol or name
      else if (queryRegex.test(symbol.symbol) || queryRegex.test(symbol.name)) {
        matchScore = 40
        matchType = symbol.symbol.match(queryRegex) ? 'symbol' : 'name'
      }

      if (matchScore > 0) {
        // Boost score for popular symbols
        const popularSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'BTC', 'ETH', 'SPY', 'QQQ']
        if (popularSymbols.includes(symbol.symbol)) {
          matchScore += 10
        }

        // Boost score based on type
        const typeBoosts = { stock: 5, etf: 3, crypto: 4, forex: 2, commodity: 1 }
        matchScore += typeBoosts[symbol.type] || 0

        results.push({
          symbol,
          matchScore,
          matchType
        })
      }
    }

    // Sort by match score (descending) and return limited results
    return results
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)
  }

  // Get symbol by symbol code
  const getSymbol = (symbolCode: string): TradingSymbol | null => {
    return symbols.value.find(s => s.symbol.toLowerCase() === symbolCode.toLowerCase()) || null
  }

  // Get symbols by type
  const getSymbolsByType = (type: TradingSymbol['type']): TradingSymbol[] => {
    return symbols.value.filter(s => s.type === type && s.isActive)
  }

  // Get popular symbols
  const getPopularSymbols = (limit: number = 10): TradingSymbol[] => {
    const popular = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'META', 'AMZN', 'BTC', 'ETH', 'SPY']
    return symbols.value
      .filter(s => popular.includes(s.symbol) && s.isActive)
      .sort((a, b) => popular.indexOf(a.symbol) - popular.indexOf(b.symbol))
      .slice(0, limit)
  }

  // Search with debouncing
  const debouncedSearch = debounce((query: string, callback: (results: SearchResult[]) => void) => {
    isSearching.value = true
    const results = searchSymbols(query)
    searchResults.value = results
    callback(results)
    isSearching.value = false
  }, 300)

  // Update symbol price (for real-time updates simulation)
  const updateSymbolPrice = (symbolCode: string, newPrice: number, change: number) => {
    const symbol = getSymbol(symbolCode)
    if (symbol) {
      symbol.price = newPrice
      symbol.change = change
      symbol.changePercent = (change / (newPrice - change)) * 100
      symbol.lastUpdated = new Date()
    }
  }

  return {
    symbols: readonly(symbols),
    searchResults: readonly(searchResults),
    isSearching: readonly(isSearching),
    searchSymbols,
    debouncedSearch,
    getSymbol,
    getSymbolsByType,
    getPopularSymbols,
    updateSymbolPrice
  }
}

// Simple debounce utility
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
