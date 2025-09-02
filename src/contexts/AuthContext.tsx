import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  subscription_tier: "free" | "pro" | "premium";
  ai_queries_used: number;
  ai_queries_limit: number;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  canMakeAIQuery: () => boolean;
  incrementAIQuery: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Set mock user for demo mode (no authentication required)
  const [user, setUser] = useState<User | null>({
    id: "demo-user-id",
    email: "demo@screeno.in",
    user_metadata: { full_name: "Demo User" },
  } as User);
  const [profile, setProfile] = useState<Profile | null>({
    id: "demo-user-id",
    email: "demo@screeno.in",
    full_name: "Demo User",
    subscription_tier: "free",
    ai_queries_used: 3,
    ai_queries_limit: 10,
  });
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false); // Set to false since we're using demo data

  useEffect(() => {
    // Demo mode - no authentication required
    // All authentication logic is bypassed for development
    console.log("Demo mode: Authentication bypassed");
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      // Check if Supabase is properly configured
      if (
        !import.meta.env.VITE_SUPABASE_URL ||
        import.meta.env.VITE_SUPABASE_URL === "your_supabase_project_url"
      ) {
        console.warn("Supabase not configured, using mock profile");
        setProfile({
          id: userId,
          email: "demo@screeno.in",
          full_name: "Demo User",
          subscription_tier: "free",
          ai_queries_used: 3,
          ai_queries_limit: 10,
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // Mock login for development
    if (
      !import.meta.env.VITE_SUPABASE_URL ||
      import.meta.env.VITE_SUPABASE_URL === "your_supabase_project_url"
    ) {
      const mockUser = {
        id: "mock-user-id",
        email,
        user_metadata: { full_name: "Demo User" },
      } as User;

      setUser(mockUser);
      setProfile({
        id: "mock-user-id",
        email,
        full_name: "Demo User",
        subscription_tier: "free",
        ai_queries_used: 3,
        ai_queries_limit: 10,
      });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      throw error;
    }

    console.log("Login successful:", data);
  };

  const signup = async (email: string, password: string, fullName: string) => {
    // Mock signup for development
    if (
      !import.meta.env.VITE_SUPABASE_URL ||
      import.meta.env.VITE_SUPABASE_URL === "your_supabase_project_url"
    ) {
      const mockUser = {
        id: "mock-user-id",
        email,
        user_metadata: { full_name: fullName },
      } as User;

      setUser(mockUser);
      setProfile({
        id: "mock-user-id",
        email,
        full_name: fullName,
        subscription_tier: "free",
        ai_queries_used: 0,
        ai_queries_limit: 10,
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      console.error("Signup error:", error);
      throw error;
    }

    console.log("Signup successful:", data);

    // For development, you might want to show a message about email confirmation
    if (data.user && !data.session) {
      console.log("Please check your email to confirm your account");
    }
  };

  const loginWithGoogle = async () => {
    // Mock Google login for development
    if (
      !import.meta.env.VITE_SUPABASE_URL ||
      import.meta.env.VITE_SUPABASE_URL === "your_supabase_project_url"
    ) {
      const mockUser = {
        id: "mock-user-id",
        email: "demo@screeno.in",
        user_metadata: { full_name: "Demo User" },
      } as User;

      setUser(mockUser);
      setProfile({
        id: "mock-user-id",
        email: "demo@screeno.in",
        full_name: "Demo User",
        subscription_tier: "free",
        ai_queries_used: 0,
        ai_queries_limit: 10,
      });
      return;
    }

    const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${siteUrl}/`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("Google login error:", error);
      throw error;
    }

    console.log("Google login initiated:", data);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    // Mock update for development
    if (
      !import.meta.env.VITE_SUPABASE_URL ||
      import.meta.env.VITE_SUPABASE_URL === "your_supabase_project_url"
    ) {
      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (error) {
      throw error;
    }

    // Update local profile state
    setProfile((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const canMakeAIQuery = () => {
    if (!profile) return false;
    return (
      profile.ai_queries_used < profile.ai_queries_limit ||
      profile.subscription_tier !== "free"
    );
  };

  const incrementAIQuery = async () => {
    if (!user || !profile) return;

    const newCount = profile.ai_queries_used + 1;
    await updateProfile({ ai_queries_used: newCount });
  };

  const value = {
    user,
    profile,
    session,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    updateProfile,
    canMakeAIQuery,
    incrementAIQuery,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
