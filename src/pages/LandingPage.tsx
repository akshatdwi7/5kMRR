import React, { useState, Suspense, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ButtonRotatingBackgroundGradient, {
  ButtonShadowGradient,
  Keyboardgenbutton,
  Button,
} from "../components/ui/Button";
import MovingGradientPill from "../components/ui/pill";
import { TextLoopCustomVariantsTransition } from "../components/ui/TEXTloop";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { InfiniteSliderHoverSpeed } from "../components/ui/sliderlogos";
import MorphingDialogBasicOne from "../components/ui/morphing-dialog";
import { TabsExample } from "../components/ui/tabssolid";
import CardAnimatedBorderGradient from "../components/ui/boxgradient";
import BorderTrailTextarea from "../components/ui/border";
import {
  TrendingUp,
  BarChart3,
  Search,
  MessageCircle,
  Star,
  Shield,
  Zap,
  Users,
  Check,
  X,
  Award,
} from "lucide-react";
import { Input } from "../components/ui/Input";
import ss from "../assets/logos/ss.png";
import { ShootingStars } from "../components/ui/shooting-stars";
import { useAuth } from "../contexts/AuthContext";
import { StarsBackground } from "../components/ui/stars-background";
import { Blackbutton } from "../components/ui/buttonnew";

import { Link } from "react-router-dom";

// Lazy load heavy components
const Example = React.lazy(() => import("../components/ui/feature1"));
const Example2 = React.lazy(() => import("../components/ui/feature2"));
const Example3 = React.lazy(() => import("../components/ui/feature3"));
const Example4 = React.lazy(() => import("../components/ui/feature4"));
const Example5 = React.lazy(() => import("../components/ui/feature5"));
const Revenue = React.lazy(() => import("../components/ui/revenue"));

const ChartLineInteractive = React.lazy(() =>
  import("../components/ui/charts-line").then((module) => ({
    default: module.ChartLineInteractive,
  }))
);

// Memoize heavy, non-interactive components to prevent re-renders
const MemoizedStarsBackground = memo(StarsBackground);
const MemoizedShootingStars = memo(ShootingStars);

const handleUpstoxLogin = () => {
  const apiKey = import.meta.env.VITE_UPSTOX_API_KEY;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const authUrl = `https://api-v2.upstox.com/login/authorization/dialog?response_type=code&client_id=${apiKey}&redirect_uri=${redirectUri}`;
  window.location.href = authUrl;
};

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

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
      setAuthError(
        error instanceof Error ? error.message : "Authentication failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      <MemoizedStarsBackground />
      <MemoizedShootingStars />

      {/* Hero Section */}
      <section className="relative flex flex-col min-h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        {/* RESPONSIVE NAVBAR */}
        <nav className="sticky top-2 sm:top-4 z-50 flex items-center justify-between w-[95%] max-w-3xl px-3 sm:px-6 py-2 mx-auto bg-black/80 shadow-lg backdrop-blur-md rounded-full">
          <ThemeToggle />
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={ss} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
            <a
              href="#features"
              className="px-3 py-2 text-lg font-thin transition-colors duration-200 cursor-pointer text-white/80 rounded-full hover:text-blue-400"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="px-3 py-2 text-lg font-thin transition-colors duration-200 cursor-pointer text-white/80 rounded-full hover:text-blue-400"
            >
              Pricing
            </a>
            <div className="hidden lg:block">
              <ButtonRotatingBackgroundGradient
                onClick={() => {
                  setIsLoginMode(false);
                  setShowAuthModal(true);
                }}
              >
                Get started
              </ButtonRotatingBackgroundGradient>
            </div>
            <Blackbutton onClick={handleUpstoxLogin}>Sign In</Blackbutton>
          </div>
          <div className="sm:hidden">
            <Blackbutton
              onClick={() => {
                setIsLoginMode(true);
                setShowAuthModal(true);
              }}
            >
              Sign In
            </Blackbutton>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center flex-1 pt-12 pb-20 text-center px-4">
          <MovingGradientPill />
          <h1 className="mt-10 mb-8 text-4xl leading-tight sm:text-6xl lg:text-7xl font-arimo font-medium text-white sm:leading-[1.08]">
            Invest With
            <span className="font-instrument italic bg-gradient-to-br from-blue-700 to-blue-300 bg-clip-text text-transparent">
              {" "}
              Data
            </span>
            ,
            <br className="hidden sm:block" /> Not
            <span className="font-instrument italic bg-gradient-to-br from-blue-700 to-blue-300 bg-clip-text text-transparent">
              {" "}
              Emotion
            </span>
            .
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-base sm:text-lg leading-relaxed text-gray-500">
            The only platform where you can chat with AI about any Indian stock
            and get intelligent, data-driven insights instantly.
          </p>
          <ButtonShadowGradient
            onClick={() => {
              setIsLoginMode(false);
              setShowAuthModal(true);
            }}
          >
            Start your free trial
          </ButtonShadowGradient>
          <div className="mt-2 text-sm font-thin text-gray-400">
            Know thy creater /{" "}
            <Link
              to="/about"
              className="underline cursor-pointer font-arimo italic text-blue-300"
            >
              about
            </Link>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-96 bg-amber-50 text-gray-500">
            Loading Interactive Components...
          </div>
        }
      >
        <div className="bg-amber-50 dark:bg-black">
          <Example />
          <Example3 />
          <Example2 />
          <Example4 />
          <Example5 />
        </div>
      </Suspense>
      <div className=" h-52 bg-amber-50 dark:bg-black">
        <TabsExample />
      </div>
      <div className=" flex items-center justify-center bg-amber-50 dark:bg-black">
        {" "}
        <CardAnimatedBorderGradient />
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-96 bg-amber-50 text-gray-500">
            Loading Interactive Components...
          </div>
        }
      >
        <div className="bg-amber-50 dark:bg-black ">
          <div className="bg-amber-50 dark:bg-black flex  items-center justify-center px-4 sm:px-10">
            <TextLoopCustomVariantsTransition />
          </div>
          <Revenue />
        </div>
      </Suspense>
      <div className=" bg-amber-50 dark:bg-black ">
        <InfiniteSliderHoverSpeed />
      </div>

      <section className="pb-20 bg-amber-50 dark:bg-black overflow-hidden">
        <div className="justify-center px-2 sm:px-5 pt-4 ">
          <Suspense fallback={<div>Loading Chart...</div>}>
            <ChartLineInteractive />
          </Suspense>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 bg-amber-50 dark:bg-black px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Pricing Plans That Scale With You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Find the perfect plan tailored to your needs. Start small, scale
              big.
            </p>
            <div className="flex items-center justify-center space-x-3">
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
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="bg-gray-100 rounded-lg p-1 inline-flex">
              <button
                onClick={() => setIsYearlyBilling(false)}
                className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  !isYearlyBilling
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearlyBilling(true)}
                className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isYearlyBilling
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Annually
              </button>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative h-full"
            >
              <div className="relative bg-white rounded-xl p-8 shadow-lg border-2 border-blue-500 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
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
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
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
                      Custom pricing
                    </span>
                    <div className="text-sm text-blue-600 font-medium mt-1">
                      Contact us for enterprise plans
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  >
                    Contact Us
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
      <footer className="px-4 sm:px-6 py-12 text-white bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4 space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Screeno</span>
              </div>
              <p className="mb-4 text-gray-400">
                India's most intelligent stock screening platform powered by AI.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Stock Screener</div>
                <div>AI Analysis</div>
                <div>Portfolio Tracker</div>
                <div>Market Data</div>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About Us</div>
                <div>Careers</div>
                <div>Contact</div>
                <div>Blog</div>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>API Docs</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-12 text-center text-gray-400 border-t border-gray-800">
            <p>&copy; 2024 Screeno. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 sm:p-8 bg-white shadow-2xl rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-gray-900 font-instrument italic">
                  {isLoginMode ? "Welcome Back ⛵︎" : "Create Account ☂︎"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              {authError && (
                <div className="p-3 mt-4 border border-red-200 rounded-lg bg-red-50">
                  <p className="text-sm text-red-700">{authError}</p>
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
                <Keyboardgenbutton
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Please wait..."
                    : isLoginMode
                    ? "Sign In"
                    : "Create Account"}
                </Keyboardgenbutton>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
