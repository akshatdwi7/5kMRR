import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

// For development, provide fallback values to prevent errors
const finalSupabaseUrl = supabaseUrl || 'https://placeholder.supabase.co';
const finalSupabaseAnonKey = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(finalSupabaseUrl, finalSupabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string;
          subscription_tier: 'free' | 'pro' | 'premium';
          ai_queries_used: number;
          ai_queries_limit: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string;
          subscription_tier?: 'free' | 'pro' | 'premium';
          ai_queries_used?: number;
          ai_queries_limit?: number;
        };
        Update: {
          full_name?: string;
          avatar_url?: string;
          subscription_tier?: 'free' | 'pro' | 'premium';
          ai_queries_used?: number;
          ai_queries_limit?: number;
          updated_at?: string;
        };
      };
      watchlists: {
        Row: {
          id: string;
          user_id: string;
          stock_symbol: string;
          stock_name: string;
          added_at: string;
        };
        Insert: {
          user_id: string;
          stock_symbol: string;
          stock_name: string;
        };
        Update: {
          stock_symbol?: string;
          stock_name?: string;
        };
      };
      ai_queries: {
        Row: {
          id: string;
          user_id: string;
          stock_symbol?: string;
          query: string;
          response: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          stock_symbol?: string;
          query: string;
          response: string;
        };
        Update: {
          response?: string;
        };
      };
      portfolios: {
        Row: {
          id: string;
          user_id: string;
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
        };
        Insert: {
          user_id: string;
          stock_symbol: string;
          stock_name: string;
          quantity: number;
          avg_price: number;
          current_price: number;
          invested_amount: number;
          current_value: number;
          gain_loss: number;
          gain_loss_percent: number;
        };
        Update: {
          quantity?: number;
          avg_price?: number;
          current_price?: number;
          invested_amount?: number;
          current_value?: number;
          gain_loss?: number;
          gain_loss_percent?: number;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string;
          status: 'active' | 'cancelled' | 'expired';
          current_period_start: string;
          current_period_end: string;
          razorpay_subscription_id?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          plan_id: string;
          status: 'active' | 'cancelled' | 'expired';
          current_period_start: string;
          current_period_end: string;
          razorpay_subscription_id?: string;
        };
        Update: {
          status?: 'active' | 'cancelled' | 'expired';
          current_period_start?: string;
          current_period_end?: string;
          updated_at?: string;
        };
      };
    };
  };
}