import { supabase } from '../lib/supabase';

export interface WatchlistItem {
  id: string;
  stock_symbol: string;
  stock_name: string;
  added_at: string;
}

export interface PortfolioItem {
  id: string;
  stock_symbol: string;
  stock_name: string;
  quantity: number;
  avg_price: number;
  current_price: number;
  invested_amount: number;
  current_value: number;
  gain_loss: number;
  gain_loss_percent: number;
  updated_at: string;
}

export interface AIQuery {
  id: string;
  stock_symbol?: string;
  query: string;
  response: string;
  created_at: string;
}

export const supabaseService = {
  // Watchlist operations
  async getWatchlist(): Promise<WatchlistItem[]> {
    // Mock data for development
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'your_supabase_project_url') {
      return [
        {
          id: '1',
          stock_symbol: 'RELIANCE',
          stock_name: 'Reliance Industries Ltd.',
          added_at: new Date().toISOString(),
        },
        {
          id: '2',
          stock_symbol: 'TCS',
          stock_name: 'Tata Consultancy Services',
          added_at: new Date().toISOString(),
        },
      ];
    }

    const { data, error } = await supabase
      .from('watchlists')
      .select('*')
      .order('added_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addToWatchlist(stockSymbol: string, stockName: string): Promise<void> {
    // Mock for development - always use demo mode for now
    console.log('Demo mode: Added to watchlist:', stockSymbol, stockName);
    return;

    // Commented out real implementation to prevent auth issues
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) throw new Error('User not authenticated');
    // const { error } = await supabase
    //   .from('watchlists')
    //   .insert({
    //     user_id: user.id,
    //     stock_symbol: stockSymbol,
    //     stock_name: stockName,
    //   });
    // if (error) throw error;
  },

  async removeFromWatchlist(stockSymbol: string): Promise<void> {
    const { error } = await supabase
      .from('watchlists')
      .delete()
      .eq('stock_symbol', stockSymbol);

    if (error) throw error;
  },

  // Portfolio operations
  async getPortfolio(): Promise<PortfolioItem[]> {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addToPortfolio(portfolioItem: Omit<PortfolioItem, 'id' | 'updated_at'>): Promise<void> {
    // Demo mode - prevent auth calls
    console.log('Demo mode: Added to portfolio:', portfolioItem.stock_symbol);
    return;

    // Commented out to prevent auth issues
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) throw new Error('User not authenticated');
    // const { error } = await supabase.from('portfolios').upsert({...});
    // if (error) throw error;
  },

  async updatePortfolioItem(stockSymbol: string, updates: Partial<PortfolioItem>): Promise<void> {
    const { error } = await supabase
      .from('portfolios')
      .update(updates)
      .eq('stock_symbol', stockSymbol);

    if (error) throw error;
  },

  async removeFromPortfolio(stockSymbol: string): Promise<void> {
    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('stock_symbol', stockSymbol);

    if (error) throw error;
  },

  // AI Query operations
  async saveAIQuery(stockSymbol: string | undefined, query: string, response: string): Promise<void> {
    // Demo mode - prevent auth calls
    console.log('Demo mode: Saved AI query:', { stockSymbol, query: query.substring(0, 50) + '...' });
    return;

    // Commented out to prevent auth issues
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) throw new Error('User not authenticated');
    // const { error } = await supabase.from('ai_queries').insert({...});
    // if (error) throw error;
  },

  async getAIQueryHistory(limit: number = 50): Promise<AIQuery[]> {
    const { data, error } = await supabase
      .from('ai_queries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Subscription operations
  async createSubscription(planId: string, razorpaySubscriptionId: string): Promise<void> {
    // Demo mode - prevent auth calls
    console.log('Demo mode: Created subscription:', { planId, razorpaySubscriptionId });
    return;

    // Commented out to prevent auth issues
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) throw new Error('User not authenticated');
    // const { error } = await supabase.from('subscriptions').insert({...});
    // if (error) throw error;
  },

  async updateSubscriptionStatus(subscriptionId: string, status: 'active' | 'cancelled' | 'expired'): Promise<void> {
    const { error } = await supabase
      .from('subscriptions')
      .update({ status })
      .eq('razorpay_subscription_id', subscriptionId);

    if (error) throw error;
  },

  async getUserSubscription(): Promise<any> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
    return data;
  },

  // Analytics
  async getAIQueryCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('ai_queries')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) throw error;
    return count || 0;
  },

  async getPortfolioSummary(): Promise<{
    totalInvested: number;
    totalCurrent: number;
    totalGainLoss: number;
    totalGainLossPercent: number;
  }> {
    // Mock data for development
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'your_supabase_project_url') {
      return {
        totalInvested: 500000,
        totalCurrent: 547500,
        totalGainLoss: 47500,
        totalGainLossPercent: 9.5,
      };
    }

    const { data, error } = await supabase
      .from('portfolios')
      .select('invested_amount, current_value, gain_loss');

    if (error) throw error;

    const summary = (data || []).reduce(
      (acc, item) => ({
        totalInvested: acc.totalInvested + Number(item.invested_amount),
        totalCurrent: acc.totalCurrent + Number(item.current_value),
        totalGainLoss: acc.totalGainLoss + Number(item.gain_loss),
      }),
      { totalInvested: 0, totalCurrent: 0, totalGainLoss: 0 }
    );

    const totalGainLossPercent = summary.totalInvested > 0 
      ? (summary.totalGainLoss / summary.totalInvested) * 100 
      : 0;

    return {
      ...summary,
      totalGainLossPercent,
    };
  },

  // Daily query reset function
  async resetDailyQueries(): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({ ai_queries_used: 0 })
      .eq('subscription_tier', 'free');

    if (error) throw error;
  },
};