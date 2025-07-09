import { supabaseService } from './supabaseService';
import { supabase } from '../lib/supabase';

export interface AIAnalysisRequest {
  stockSymbol?: string;
  query: string;
  stockData?: any; // Current stock data from Upstox API
}

export interface AIAnalysisResponse {
  response: string;
  confidence: number;
  sources: string[];
  recommendations?: {
    action: 'BUY' | 'SELL' | 'HOLD';
    targetPrice?: number;
    stopLoss?: number;
    reasoning: string;
  };
}

// Mock AI responses for development - replace with actual AI service
const mockAIResponses = {
  'RELIANCE': {
    response: `Based on current market analysis, Reliance Industries shows strong fundamentals:

**Key Highlights:**
• Revenue growth of 12% YoY with strong petrochemical margins
• Jio subscriber base growing at 8% quarterly
• Retail business expanding rapidly with 15,000+ stores
• Debt reduction of ₹1.5L crore in last 2 years

**Technical Analysis:**
• Stock trading above 200-day moving average
• RSI at 58 (neutral zone)
• Support at ₹2,750, Resistance at ₹2,950

**Recommendation:** HOLD with a target of ₹3,100 in 6-12 months. Consider buying on dips below ₹2,800.`,
    confidence: 85,
    sources: ['NSE', 'BSE', 'Company Financials', 'Technical Analysis'],
    recommendations: {
      action: 'HOLD' as const,
      targetPrice: 3100,
      stopLoss: 2650,
      reasoning: 'Strong fundamentals with reasonable valuation at current levels'
    }
  },
  'TCS': {
    response: `TCS analysis shows mixed signals in current market:

**Strengths:**
• Strong Q3 results with 16.8% net margin
• Consistent dividend payout history
• Leading position in digital transformation
• Strong order book of $8.1 billion

**Concerns:**
• Slower growth in key markets (US/Europe)
• Increased competition in cloud services
• Currency headwinds affecting margins

**Technical View:**
• Stock consolidating in ₹3,700-₹3,900 range
• Volume below average indicating lack of conviction
• MACD showing bearish crossover

**Recommendation:** HOLD for long-term investors. Wait for better entry below ₹3,700.`,
    confidence: 78,
    sources: ['Company Results', 'Industry Reports', 'Technical Charts'],
    recommendations: {
      action: 'HOLD' as const,
      targetPrice: 4200,
      stopLoss: 3500,
      reasoning: 'Quality stock but expensive at current levels'
    }
  },
  'HDFCBANK': {
    response: `HDFC Bank remains a top pick in the banking sector:

**Positives:**
• Consistent ROE of 17%+ over past 5 years
• Strong asset quality with GNPA at 1.26%
• Digital banking initiatives gaining traction
• Merger with HDFC Ltd creating synergies

**Key Metrics:**
• P/E: 19.2x (reasonable for quality)
• P/B: 2.8x (premium but justified)
• Credit growth: 18% YoY
• CASA ratio: 41% (healthy)

**Technical Outlook:**
• Breakout above ₹1,700 resistance
• Strong momentum with rising volumes
• All moving averages in uptrend

**Recommendation:** BUY on dips around ₹1,650. Target: ₹1,850 in 3-6 months.`,
    confidence: 92,
    sources: ['RBI Data', 'Bank Financials', 'Credit Rating Agencies'],
    recommendations: {
      action: 'BUY' as const,
      targetPrice: 1850,
      stopLoss: 1580,
      reasoning: 'Best-in-class bank with strong fundamentals and technical breakout'
    }
  }
};

export const aiService = {
  async analyzeStock(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    // In production, this would call your AI service (OpenAI, Claude, etc.)
    // For now, using mock responses
    
    const { stockSymbol, query } = request;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get mock response or generate generic one
    let response: AIAnalysisResponse;
    
    if (stockSymbol && mockAIResponses[stockSymbol as keyof typeof mockAIResponses]) {
      response = mockAIResponses[stockSymbol as keyof typeof mockAIResponses];
    } else {
      // Generic response for unknown stocks or general queries
      response = {
        response: `I understand you're asking about "${query}". Here's my analysis:

Based on current market conditions and available data, I recommend conducting thorough research before making any investment decisions. 

**General Market Outlook:**
• Indian markets showing resilience despite global uncertainties
• IT and Banking sectors leading the recovery
• Retail participation at all-time highs

**Key Considerations:**
• Always diversify your portfolio
• Consider your risk tolerance
• Invest for long-term wealth creation
• Stay updated with company fundamentals

For specific stock analysis, please provide the stock symbol and I'll give you detailed insights.`,
        confidence: 70,
        sources: ['Market Data', 'General Analysis'],
      };
    }
    
    // Save query to database
    try {
      // Only save if Supabase is configured
      if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_project_url') {
        await supabaseService.saveAIQuery(stockSymbol, query, response.response);
      }
    } catch (error) {
      console.error('Error saving AI query:', error);
    }
    
    return response;
  },

  async getQueryHistory(limit: number = 10) {
    try {
      // Mock data for development
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'your_supabase_project_url') {
        return [];
      }
      return await supabaseService.getAIQueryHistory(limit);
    } catch (error) {
      console.error('Error fetching query history:', error);
      return [];
    }
  },

  // Helper function to check if user can make AI query
  async canMakeQuery(userId: string, subscriptionTier: string): Promise<boolean> {
    if (subscriptionTier !== 'free') return true;
    
    // Mock for development
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'your_supabase_project_url') {
      return true;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    try {
      const { data, error } = await supabase
        .from('ai_queries')
        .select('id')
        .eq('user_id', userId)
        .gte('created_at', today.toISOString());
      
      if (error) throw error;
      
      return (data?.length || 0) < 10; // Free tier: 10 queries per day
    } catch (error) {
      console.error('Error checking query limit:', error);
      return false;
    }
  }
};