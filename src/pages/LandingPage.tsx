import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ButtonRotatingBackgroundGradient from "../components/ui/Button";
import { ButtonShadowGradient } from "../components/ui/Button";
import filter from "../assets/logos/filter.png";
import search from "../assets/logos/search.png";
import markets from "../assets/logos/markets.png";
import ai from "../assets/logos/ai.png";
import MovingGradientPill from "../components/ui/pill";

import {
  TrendingUp,
  BarChart3,
  Search,
  MessageCircle,
  Star,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Play,
  Check,
  X,
  Sparkles,
  Target,
  Globe,
  Award,
  Link,
  Brain,
  Clock,
  DollarSign,
  Activity,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import zerodha from "../assets/logos/zerodha.png";
import upstocks from "../assets/logos/upstocks.png";
import angelone from "../assets/logos/angelone.png";
import graph from "../assets/logos/graph.png";
import groww from "../assets/logos/groww.png";
import icicidirect from "../assets/logos/icicidirect.png";
import hdfc from "../assets/logos/hdfc.png";
import tap from "../assets/logos/tap.png";
import kotak from "../assets/logos/kotak.png";
import ss from "../assets/logos/ss.png";
import { ShootingStars } from "../components/ui/shooting-stars";
import { useAuth } from "../contexts/AuthContext";
import { StarsBackground } from "../components/ui/stars-background";
import shield from "../assets/logos/shield.png";

export const LandingPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isYearlyBilling, setIsYearlyBilling] = useState(true);
  const { login, signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");

    try {
      if (isLoginMode) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name);
      }
      setShowAuthModal(false);
    } catch (error) {
      console.error("Auth error:", error);
      setAuthError(
        error instanceof Error ? error.message : "Authentication failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setAuthError("");

    try {
      await loginWithGoogle();
      // The redirect will happen automatically
    } catch (error) {
      console.error("Google auth error:", error);
      setAuthError(
        error instanceof Error ? error.message : "Google authentication failed"
      );
      setIsLoading(false);
    }
  };
  type Broker = {
    name: string;
    logo: string;
    connected: boolean;
  };

  const brokers: Broker[] = [
    { name: "Zerodha", logo: zerodha, connected: true },
    { name: "Upstox", logo: upstocks, connected: true },
    { name: "Angel One", logo: angelone, connected: true },
    { name: "ICICI Direct", logo: icicidirect, connected: true },
    { name: "HDFC Securities", logo: hdfc, connected: true },
    { name: "Kotak Securities", logo: kotak, connected: true },
    { name: "Groww", logo: groww, connected: true },
  ];

  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Stock Analysis",
      description:
        "Get instant insights on any stock with our advanced AI that analyzes fundamentals, technicals, and market sentiment in real-time.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Save 5+ Hours Daily",
      description:
        "Automate your research process. Our AI does the heavy lifting, screening thousands of stocks and presenting only the best opportunities.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "Precision Stock Screening",
      description:
        "Filter 5000+ Indian stocks with 50+ parameters. Find hidden gems that match your exact investment criteria in seconds.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: DollarSign,
      title: "Maximize Returns",
      description:
        "Make data-driven decisions with real-time market data, AI recommendations, and advanced portfolio analytics.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description:
        "Advanced risk analysis tools help you protect your capital with intelligent stop-loss suggestions and portfolio diversification insights.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Activity,
      title: "Real-Time Alerts",
      description:
        "Never miss an opportunity with smart alerts for price movements, earnings announcements, and AI-detected patterns.",
      color: "from-teal-500 to-blue-500",
    },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Stock Screener",
      description:
        "Filter 5000+ Indian stocks with 50+ parameters including fundamentals, technicals, and custom ratios",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageCircle,
      title: "AI Chat Assistant",
      description:
        "Ask any stock-related question and get instant, intelligent answers powered by advanced AI",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      title: "Real-time Market Data",
      description:
        "Live NSE & BSE data with minimal delay for lightning-fast trading decisions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Search,
      title: "Smart Discovery",
      description:
        "Discover hidden gems with intelligent search across all Indian listed companies",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { number: "5,000+", label: "Indian Stocks", icon: filter },
    { number: "50+", label: "Screening Filters", icon: search },
    { number: "99.9%", label: "Uptime SLA", icon: markets },
    { number: "25K+", label: "Active Traders", icon: ai },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Day Trader",
      content:
        "Screeno has transformed my trading strategy. The AI insights are incredibly accurate!",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "Priya Sharma",
      role: "Investment Advisor",
      content:
        "The best stock screener for Indian markets. My clients love the detailed analysis.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9e0e4b0?w=64&h=64&fit=crop&crop=face",
    },
    {
      name: "Amit Patel",
      role: "Portfolio Manager",
      content:
        "Real-time data and advanced filters help me make better investment decisions daily.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <StarsBackground />
      <ShootingStars />
      <section className="relative min-h-screen flex flex-col">
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        {/* Navbar (inside hero section, not sticky) */}
        <nav className="flex items-center justify-between bg-black/80 backdrop-blur-md rounded-full px-6 py-2 mx-auto max-w-3xl shadow-lg sticky top-0 z-50">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={ss} alt="Logo" className="h-10 w-10" />
          </div>
          {/* Links */}
          <div className="flex items-center space-x-8">
            <a
              href="#features"
              className="text-white/80 font-thin px-3 py-2 rounded-full transition-colors duration-200 hover:text-blue-400 cursor-pointer"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-white/80 font-thin px-3 py-2 rounded-full transition-colors duration-200 hover:text-blue-400 cursor-pointer"
            >
              Pricing
            </a>
            <ButtonRotatingBackgroundGradient
              onClick={() => {
                setIsLoginMode(false);
                setShowAuthModal(true);
              }}
            >
              Get started
            </ButtonRotatingBackgroundGradient>
            <button
              className="ml-2 border border-white/30 text-white font-semibold px-6 py-2 rounded-full hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
              onClick={() => {
                setIsLoginMode(true);
                setShowAuthModal(true);
              }}
            >
              Sign in
            </button>
          </div>
        </nav>

        {/* Centered Hero Content */}

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 flex flex-col items-center justify-center text-center"
        >
          <MovingGradientPill></MovingGradientPill>

          <h1 className="text-5xl lg:text-6xl font-regular text-white-900 mb-6 leading-tight">
            Invest With Data,
            <span className=" bg-gradient-to-r  from-purple-700 to-indigo-500 text-5xl lg:text-6xl  bg-clip-text text-transparent font-serif  mb-6 leading-tight ">
              {" "}
              Not Emotion{" "}
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            The only platform where you can chat with AI about any Indian stock
            and get intelligent, data-driven insights instantly. Connect your
            favorite broker and start investing smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <ButtonShadowGradient
              onClick={() => {
                setIsLoginMode(false);
                setShowAuthModal(true);
              }}
            >
              Start your free trial
            </ButtonShadowGradient>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <Check className="h-4 w-4 text-green-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <Check className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16  rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <img src={stat.icon} alt={stat.label} className="h-12 w-12" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Broker Integration Section */}
      <section id="brokers" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Link className="h-4 w-4" />
              <span>Broker Integration</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Connect Your Favorite Broker
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seamlessly integrate with all major Indian brokers. Execute trades
              directly from our platform while getting AI-powered insights and
              recommendations.
            </p>
          </div>

          <div className="overflow-hidden mb-12">
            <div className="flex animate-marquee space-x-6 w-max">
              {[...brokers, ...brokers].map((broker, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[160px] bg-white rounded-2xl p-6 hover: transition-all duration-300 text-center group hover:-translate-y-2 flex-shrink-0"
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform">
                    <img
                      src={broker.logo}
                      alt={broker.name}
                      className="mx-auto w-16 h-16 object-contain rounded-full"
                    />
                  </div>

                  <div className="font-semibold text-gray-900 text-sm mb-2">
                    {broker.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16  rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <img src={tap} alt="your logo" className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  One-Click Integration
                </h3>
                <p className="text-gray-600">
                  Connect your broker account in seconds with our secure OAuth
                  integration.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16  rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <img src={shield} alt="your logo" className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Bank-Grade Security
                </h3>
                <p className="text-gray-600">
                  Your credentials are encrypted and never stored on our
                  servers.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16  rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <img src={graph} alt="your logo" className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Instant Execution
                </h3>
                <p className="text-gray-600">
                  Execute trades directly from our platform with real-time order
                  updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section id="benefits" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Target className="h-4 w-4" />
              <span>Why Choose Screeno</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Invest Better Daily with AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Screeno transforms your investment journey with
              intelligent insights, automated research, and data-driven decision
              making.
            </p>
          </div>

          <div className="space-y-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } gap-16`}
              >
                <div className="flex-1">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-3xl flex items-center justify-center mb-6`}
                  >
                    <benefit.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 shadow-lg">
                    <div className="space-y-4">
                      {index === 0 && (
                        <>
                          <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                            <span className="font-medium text-gray-900">
                              RELIANCE
                            </span>
                            <span className="text-green-600 font-bold">
                              BUY
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                            <span className="font-medium text-gray-900">
                              TCS
                            </span>
                            <span className="text-blue-600 font-bold">
                              HOLD
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                            <span className="font-medium text-gray-900">
                              HDFC BANK
                            </span>
                            <span className="text-red-600 font-bold">SELL</span>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <div className="text-center py-8">
                          <div className="text-4xl font-bold text-blue-600 mb-2">
                            5.2 hrs
                          </div>
                          <div className="text-gray-600">Time saved daily</div>
                          <div className="mt-4 text-sm text-gray-500">
                            vs manual research
                          </div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              5,000+
                            </div>
                            <div className="text-sm text-gray-600">
                              Stocks Screened
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              50+
                            </div>
                            <div className="text-sm text-gray-600">
                              Parameters
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 3 && (
                        <div className="text-center py-8">
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            +23.4%
                          </div>
                          <div className="text-gray-600">
                            Average user returns
                          </div>
                          <div className="mt-4 text-sm text-gray-500">
                            vs market benchmark
                          </div>
                        </div>
                      )}
                      {index === 4 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <span className="text-sm text-gray-600">
                              Portfolio Risk
                            </span>
                            <span className="text-green-600 font-medium">
                              Low
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <span className="text-sm text-gray-600">
                              Diversification
                            </span>
                            <span className="text-blue-600 font-medium">
                              Optimal
                            </span>
                          </div>
                        </div>
                      )}
                      {index === 5 && (
                        <div className="space-y-3">
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="text-sm font-medium text-green-800">
                              Price Alert: TCS ↗ ₹3,850
                            </div>
                          </div>
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="text-sm font-medium text-blue-800">
                              Earnings: RELIANCE tomorrow
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="px-6 py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Award className="h-4 w-4" />
              <span>Powerful Features</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and AI-driven insights to help you make better
              investment decisions in the Indian stock market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full group-hover:-translate-y-2">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Play className="h-4 w-4" />
              <span>How It Works</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              See Screeno in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how easy it is to find, analyze, and invest in the best
              stocks with our AI-powered platform
            </p>
          </div>

          <div className="relative">
            {/* Main Application Demo */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-2xl border border-gray-300 max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Browser Header */}
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-lg px-4 py-1 mx-4">
                    <span className="text-sm text-gray-600">
                      screeno.com/dashboard
                    </span>
                  </div>
                </div>

                {/* Application Interface */}
                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-80 bg-gray-50 border-r border-gray-200 p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                          Screeno
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 p-3 bg-blue-100 text-blue-700 rounded-lg">
                          <BarChart3 className="h-4 w-4" />
                          <span className="font-medium">Dashboard</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Search className="h-4 w-4" />
                          <span>Screener</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Star className="h-4 w-4" />
                          <span>Watchlist</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <MessageCircle className="h-4 w-4" />
                          <span>AI Chat</span>
                        </div>
                      </div>

                      <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Market Indices
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              NIFTY 50
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              +1.2%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              SENSEX
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              +0.8%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              BANK NIFTY
                            </span>
                            <span className="text-sm font-medium text-red-600">
                              -0.3%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-6">
                    {/* Search Bar */}
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-500"
                          placeholder="Search stocks by symbol or company name..."
                          value="RELIANCE"
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Stock Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900">
                              RELIANCE
                            </h4>
                            <p className="text-sm text-gray-600">
                              Reliance Industries Ltd.
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              ₹2,847.65
                            </div>
                            <div className="text-sm font-medium text-green-600">
                              +1.22%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Energy • P/E: 24.8
                          </span>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>Ask AI</span>
                          </button>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900">TCS</h4>
                            <p className="text-sm text-gray-600">
                              Tata Consultancy Services
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              ₹3,842.30
                            </div>
                            <div className="text-sm font-medium text-red-600">
                              -1.17%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Technology • P/E: 28.5
                          </span>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>Ask AI</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* AI Chat Preview */}
                    <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <Brain className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-semibold text-purple-900">
                          AI Analysis
                        </span>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-600">Live</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 mb-2">
                        <p className="text-sm text-gray-700">
                          <strong>RELIANCE:</strong> Strong fundamentals with
                          revenue growth of 12% YoY. Current P/E of 24.8 is
                          reasonable for the energy sector. Consider buying on
                          dips below ₹2,800.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Ask about any stock..."
                          readOnly
                        />
                        <button className="bg-purple-600 text-white px-3 py-2 rounded-lg">
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  1. Search Stocks
                </h3>
                <p className="text-gray-600 text-sm">
                  Search from 5000+ Indian stocks using symbols, company names,
                  or sectors
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  2. Ask AI
                </h3>
                <p className="text-gray-600 text-sm">
                  Get instant AI analysis on fundamentals, technicals, and
                  market sentiment
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  3. Analyze Data
                </h3>
                <p className="text-gray-600 text-sm">
                  View real-time data, charts, and comprehensive financial
                  metrics
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  4. Make Decisions
                </h3>
                <p className="text-gray-600 text-sm">
                  Execute trades through your connected broker with confidence
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Trusted by 25,000+ Traders
            </h2>
            <p className="text-xl text-gray-600">
              See what our users say about their experience with Screeno
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-200"
                  />
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Clean Modern Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Pricing Plans That Scale With Your Business
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Find the perfect plan tailored to your needs. Start small, scale
              big—our pricing grows with you.
            </motion.p>

            {/* Customer Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center justify-center space-x-3"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-sm font-medium text-gray-900">4.8</span>
                <span className="text-sm text-gray-500">From 500+ reviews</span>
              </div>
            </motion.div>
          </div>

          {/* Billing Toggle */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="bg-gray-100 rounded-lg p-1 inline-flex">
              <button
                onClick={() => setIsYearlyBilling(false)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  !isYearlyBilling
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearlyBilling(true)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isYearlyBilling
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Annually
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Standard Plan */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="group relative h-full"
            >
              <div className="relative bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Standard
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Perfect for individual investors and small teams getting
                    started.
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {isYearlyBilling ? "₹399" : "₹499"}
                    </span>
                    <span className="text-gray-500">/month</span>
                    {isYearlyBilling && (
                      <div className="text-sm text-blue-600 font-medium mt-1">
                        Billed annually (₹4,788/year)
                      </div>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  >
                    Get Started
                  </motion.button>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">
                      AI-Powered Stock Analysis
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">
                      Advanced Stock Screener
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Real-time Market Data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Portfolio Tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Basic Alerts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Email Support</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium Plan - Highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="group relative h-full"
            >
              <div className="relative bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Premium
                  </h3>
                  <p className="text-gray-600 mb-6">
                    For professional traders and growing investment teams.
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {isYearlyBilling ? "₹639" : "₹799"}
                    </span>
                    <span className="text-gray-500">/month</span>
                    {isYearlyBilling && (
                      <div className="text-sm text-blue-600 font-medium mt-1">
                        Billed annually (₹7,668/year)
                      </div>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
                  >
                    Get Started
                  </motion.button>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">
                      Everything in Standard
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Advanced AI Insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">
                      Custom Alerts & Notifications
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Priority Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Advanced Analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">API Access</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="group relative h-full"
            >
              <div className="relative bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Enterprise
                  </h3>
                  <p className="text-gray-600 mb-6">
                    For large organizations requiring advanced features and
                    dedicated support.
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {isYearlyBilling ? "Custom pricing" : "Let's chat"}
                    </span>
                    {isYearlyBilling && (
                      <div className="text-sm text-blue-600 font-medium mt-1">
                        Contact us for yearly enterprise plans
                      </div>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  >
                    Get Started
                  </motion.button>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Everything in Premium</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">
                      Dedicated Account Manager
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Custom Integrations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">24/7 Priority Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Advanced Security</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">SLA Guarantee</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-gray-600 mb-6 text-lg">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <div className="flex justify-center space-x-12 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Bank-grade security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <span>99.9% uptime SLA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>24/7 support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Screeno</span>
              </div>
              <p className="text-gray-400 mb-4">
                India's most intelligent stock screening platform powered by AI.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Stock Screener</div>
                <div>AI Analysis</div>
                <div>Portfolio Tracker</div>
                <div>Market Data</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About Us</div>
                <div>Careers</div>
                <div>Contact</div>
                <div>Blog</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>API Docs</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Screeno. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isLoginMode ? "Welcome Back" : "Create Account"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Error Display */}
              {authError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{authError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLoginMode && (
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="border-gray-300 focus:border-blue-500"
                  />
                )}
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="border-gray-300 focus:border-blue-500"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="border-gray-300 focus:border-blue-500"
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Please wait..."
                    : isLoginMode
                    ? "Sign In"
                    : "Create Account"}
                </Button>
              </form>

              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
              {/* Divider */}
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {authError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{authError}</p>
                </div>
              )}
              {/* Google Login Button */}
              <div className="mt-6">
                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>
                    {isLoading ? "Connecting..." : "Continue with Google"}
                  </span>
                </Button>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  {isLoginMode
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
