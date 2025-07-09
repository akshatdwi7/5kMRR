import { Stock, StockData, PricePoint, NewsItem } from '../types';

// Enhanced mock data for Indian stock market
const mockStocks: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    price: 2847.65,
    change: 34.20,
    changePercent: 1.22,
    volume: 8450000,
    marketCap: 19250000000000,
    pe: 24.8,
    dividend: 8.0,
    sector: 'Energy',
    industry: 'Oil & Gas',
    beta: 1.1,
    eps: 114.85,
    revenue: 8920000000000,
    netIncome: 680000000000,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd.',
    price: 3842.30,
    change: -45.60,
    changePercent: -1.17,
    volume: 2340000,
    marketCap: 14100000000000,
    pe: 28.5,
    dividend: 22.0,
    sector: 'Technology',
    industry: 'IT Services',
    beta: 0.8,
    eps: 134.75,
    revenue: 2250000000000,
    netIncome: 420000000000,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    price: 1687.45,
    change: 12.80,
    changePercent: 0.76,
    volume: 5670000,
    marketCap: 12800000000000,
    pe: 19.2,
    dividend: 19.0,
    sector: 'Financials',
    industry: 'Banking',
    beta: 1.0,
    eps: 87.90,
    revenue: 1890000000000,
    netIncome: 380000000000,
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    price: 1456.75,
    change: 23.45,
    changePercent: 1.64,
    volume: 4230000,
    marketCap: 6100000000000,
    pe: 26.8,
    dividend: 17.0,
    sector: 'Technology',
    industry: 'IT Services',
    beta: 0.9,
    eps: 54.35,
    revenue: 1820000000000,
    netIncome: 240000000000,
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd.',
    price: 1089.60,
    change: -8.30,
    changePercent: -0.76,
    volume: 7890000,
    marketCap: 7650000000000,
    pe: 16.5,
    dividend: 5.0,
    sector: 'Financials',
    industry: 'Banking',
    beta: 1.2,
    eps: 66.05,
    revenue: 1560000000000,
    netIncome: 280000000000,
  },
  {
    symbol: 'HINDUNILVR',
    name: 'Hindustan Unilever Ltd.',
    price: 2634.85,
    change: 18.90,
    changePercent: 0.72,
    volume: 1890000,
    marketCap: 6200000000000,
    pe: 58.4,
    dividend: 18.0,
    sector: 'Consumer Goods',
    industry: 'FMCG',
    beta: 0.6,
    eps: 45.12,
    revenue: 520000000000,
    netIncome: 85000000000,
  },
  {
    symbol: 'ITC',
    name: 'ITC Ltd.',
    price: 456.30,
    change: 5.60,
    changePercent: 1.24,
    volume: 12340000,
    marketCap: 5680000000000,
    pe: 28.9,
    dividend: 12.75,
    sector: 'Consumer Goods',
    industry: 'Tobacco & FMCG',
    beta: 0.7,
    eps: 15.78,
    revenue: 580000000000,
    netIncome: 180000000000,
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    price: 623.45,
    change: -7.85,
    changePercent: -1.24,
    volume: 15670000,
    marketCap: 5560000000000,
    pe: 12.8,
    dividend: 8.8,
    sector: 'Financials',
    industry: 'Banking',
    beta: 1.4,
    eps: 48.72,
    revenue: 3890000000000,
    netIncome: 310000000000,
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd.',
    price: 1234.70,
    change: 28.40,
    changePercent: 2.36,
    volume: 6780000,
    marketCap: 7200000000000,
    pe: 45.6,
    dividend: 2.75,
    sector: 'Telecom',
    industry: 'Telecommunications',
    beta: 1.1,
    eps: 27.08,
    revenue: 1340000000000,
    netIncome: 160000000000,
  },
  {
    symbol: 'ASIANPAINT',
    name: 'Asian Paints Ltd.',
    price: 3156.80,
    change: -42.30,
    changePercent: -1.32,
    volume: 890000,
    marketCap: 3020000000000,
    pe: 52.3,
    dividend: 15.4,
    sector: 'Consumer Discretionary',
    industry: 'Paints',
    beta: 0.8,
    eps: 60.35,
    revenue: 320000000000,
    netIncome: 58000000000,
  },
];

const generatePriceData = (basePrice: number, symbol: string): PricePoint[] => {
  const data: PricePoint[] = [];
  let price = basePrice;
  
  for (let i = 90; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const volatility = ['RELIANCE', 'BHARTIARTL'].includes(symbol) ? 0.03 : 0.02;
    const change = (Math.random() - 0.5) * volatility;
    const open = price;
    const close = price * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * 0.015);
    const low = Math.min(open, close) * (1 - Math.random() * 0.015);
    
    data.push({
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 20000000) + 1000000,
    });
    
    price = close;
  }
  
  return data;
};

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Reliance Industries Reports Strong Q3 Results',
    summary: 'RIL posted a net profit of ₹18,549 crore for Q3FY24, beating analyst estimates on strong petrochemical margins.',
    url: '#',
    publishedAt: '2024-01-15T10:30:00Z',
    source: 'Economic Times',
  },
  {
    id: '2',
    title: 'TCS Announces Digital Transformation Deal',
    summary: 'Tata Consultancy Services wins a multi-billion dollar contract for digital transformation services.',
    url: '#',
    publishedAt: '2024-01-14T14:20:00Z',
    source: 'Business Standard',
  },
  {
    id: '3',
    title: 'HDFC Bank Maintains Strong Asset Quality',
    summary: 'HDFC Bank reports improved asset quality with gross NPA ratio declining to 1.26% in Q3FY24.',
    url: '#',
    publishedAt: '2024-01-13T09:15:00Z',
    source: 'Mint',
  },
  {
    id: '4',
    title: 'Infosys Raises FY24 Revenue Guidance',
    summary: 'Infosys raises its FY24 revenue growth guidance to 1.5-2.5% in constant currency terms.',
    url: '#',
    publishedAt: '2024-01-12T16:45:00Z',
    source: 'Moneycontrol',
  },
];

export const stockApi = {
  getAllStocks: (): Promise<Stock[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockStocks), 300);
    });
  },
  
  getStock: (symbol: string): Promise<Stock | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stock = mockStocks.find(s => s.symbol === symbol);
        resolve(stock);
      }, 200);
    });
  },
  
  getStockData: (symbol: string): Promise<StockData | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stock = mockStocks.find(s => s.symbol === symbol);
        if (!stock) {
          resolve(undefined);
          return;
        }
        
        const data: StockData = {
          symbol,
          prices: generatePriceData(stock.price, symbol),
          fundamentals: {
            pe: stock.pe,
            eps: stock.eps,
            marketCap: stock.marketCap,
            revenue: stock.revenue,
            netIncome: stock.netIncome,
            debtToEquity: Math.random() * 1.5,
            roe: Math.random() * 0.25,
            roa: Math.random() * 0.15,
            currentRatio: 1 + Math.random() * 2,
            quickRatio: 0.5 + Math.random() * 1.5,
          },
          news: mockNews,
        };
        
        resolve(data);
      }, 400);
    });
  },
  
  getTopMovers: (): Promise<Stock[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sorted = [...mockStocks].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
        resolve(sorted.slice(0, 6));
      }, 200);
    });
  },
  
  searchStocks: (query: string): Promise<Stock[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockStocks.filter(stock => 
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  },

  getMarketOverview: (): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          indices: [
            { name: 'NIFTY 50', value: 21737.60, change: 1.2, volume: 234567890 },
            { name: 'SENSEX', value: 71595.49, change: 0.8, volume: 345678901 },
            { name: 'BANK NIFTY', value: 46816.35, change: -0.3, volume: 123456789 },
            { name: 'NIFTY IT', value: 35842.15, change: 2.1, volume: 98765432 },
          ],
          sectors: [
            { name: 'IT', change: 2.1, stocks: 45 },
            { name: 'Banking', change: 0.5, stocks: 32 },
            { name: 'FMCG', change: -0.8, stocks: 28 },
            { name: 'Auto', change: 1.4, stocks: 24 },
          ],
          marketStats: {
            totalTurnover: 89234567890,
            advancesDeclines: { advances: 1247, declines: 892, unchanged: 156 },
            newHighsLows: { highs: 89, lows: 23 },
          }
        });
      }, 300);
    });
  },
};