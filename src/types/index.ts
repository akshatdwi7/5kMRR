export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  dividend: number;
  sector: string;
  industry: string;
  beta: number;
  eps: number;
  revenue: number;
  netIncome: number;
  logo?: string;
}

export interface StockData {
  symbol: string;
  prices: PricePoint[];
  fundamentals: Fundamentals;
  news: NewsItem[];
}

export interface PricePoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Fundamentals {
  pe: number;
  eps: number;
  marketCap: number;
  revenue: number;
  netIncome: number;
  debtToEquity: number;
  roe: number;
  roa: number;
  currentRatio: number;
  quickRatio: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  source: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  stockSymbol?: string;
}

export interface ScreenerFilter {
  minPrice?: number;
  maxPrice?: number;
  minMarketCap?: number;
  maxMarketCap?: number;
  minPE?: number;
  maxPE?: number;
  sector?: string;
  industry?: string;
  minVolume?: number;
}