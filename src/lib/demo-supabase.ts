// Demo mode wrapper for Supabase to prevent authentication issues
import { supabase } from './supabase';

// Create a wrapper that prevents authentication calls in demo mode
export const demoSupabase = {
  ...supabase,
  auth: {
    ...supabase.auth,
    getUser: async () => {
      console.log('Demo mode: Prevented getUser() call');
      return {
        data: {
          user: {
            id: 'demo-user-id',
            email: 'demo@screeno.in',
            user_metadata: { full_name: 'Demo User' }
          }
        },
        error: null
      };
    },
    getSession: async () => {
      console.log('Demo mode: Prevented getSession() call');
      return {
        data: { session: null },
        error: null
      };
    },
    signOut: async () => {
      console.log('Demo mode: Prevented signOut() call');
      return { error: null };
    },
    onAuthStateChange: () => {
      console.log('Demo mode: Prevented auth state change listener');
      return {
        data: {
          subscription: {
            unsubscribe: () => console.log('Demo mode: Prevented unsubscribe')
          }
        }
      };
    }
  }
};

export default demoSupabase;
