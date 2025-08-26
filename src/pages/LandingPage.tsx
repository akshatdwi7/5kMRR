import React, { useState, Suspense, memo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ButtonRotatingBackgroundGradient, {
  ButtonShadowGradient,
  Button,
} from "../components/ui/Button";
import MovingGradientPill from "../components/ui/pill";
import { TextLoopCustomVariantsTransition } from "../components/ui/TEXTloop";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { TabsExample } from "../components/ui/tabssolid";
import ThreeDMarqueeDemo from "../components/ui/threeDmac";
import LampDemo from "../components/ui/lamp";
import Accordion from "../components/ui/FAQ";
import { TrendingUp, Check, X } from "lucide-react";
import { Input } from "../components/ui/Input";
import ss from "../assets/logos/ss.png";
import { ShootingStars } from "../components/ui/shooting-stars";
import { useAuth } from "../contexts/AuthContext";
import { StarsBackground } from "../components/ui/stars-background";
import { Blackbutton } from "../components/ui/buttonnew";
import { Link } from "react-router-dom";

// Lazy load heavy components with better chunking
const Example = React.lazy(() =>
  import("../components/ui/feature1").then((module) => ({
    default: module.default || module,
  }))
);
const Example2 = React.lazy(() =>
  import("../components/ui/feature2").then((module) => ({
    default: module.default || module,
  }))
);
const Example3 = React.lazy(() =>
  import("../components/ui/feature3").then((module) => ({
    default: module.default || module,
  }))
);
const Example4 = React.lazy(() =>
  import("../components/ui/feature4").then((module) => ({
    default: module.default || module,
  }))
);
const Example5 = React.lazy(() =>
  import("../components/ui/feature5").then((module) => ({
    default: module.default || module,
  }))
);
const Revenue = React.lazy(() =>
  import("../components/ui/revenue").then((module) => ({
    default: module.default || module,
  }))
);
const MacbookScrollDemo = React.lazy(() =>
  import("../components/ui/mac").then((module) => ({
    default: module.default || module,
  }))
);

const ChartLineInteractive = React.lazy(() =>
  import("../components/ui/charts-line").then((module) => ({
    default: module.ChartLineInteractive,
  }))
);

// Memoize heavy, non-interactive components to prevent re-renders
const MemoizedStarsBackground = memo(StarsBackground);
const MemoizedShootingStars = memo(ShootingStars);
const MemoizedExample = memo(Example);
const MemoizedExample2 = memo(Example2);
const MemoizedExample3 = memo(Example3);
const MemoizedExample4 = memo(Example4);
const MemoizedExample5 = memo(Example5);
const MemoizedRevenue = memo(Revenue);
const MemoizedMacbookScrollDemo = memo(MacbookScrollDemo);
const MemoizedChartLineInteractive = memo(ChartLineInteractive);
const MemoizedThreeDMarqueeDemo = memo(ThreeDMarqueeDemo);
const MemoizedTabsExample = memo(TabsExample);
const MemoizedLampDemo = memo(LampDemo);
const MemoizedAccordion = memo(Accordion);
const MemoizedTextLoop = memo(TextLoopCustomVariantsTransition);

// Chrome-specific performance optimizations
const isChrome = () => {
  return (
    /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent)
  );
};

const handleUpstoxLogin = () => {
  const apiKey = import.meta.env.VITE_UPSTOX_API_KEY;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const authUrl = `https://api-v2.upstox.com/login/authorization/dialog?response_type=code&client_id=${apiKey}&redirect_uri=${redirectUri}`;
  window.location.href = authUrl;
};

// Chrome-optimized fadeInUp animation
const getFadeInUp = (isChrome: boolean) => {
  if (isChrome) {
    return {
      hidden: { opacity: 0, y: 20 }, // Reduced movement for Chrome
      visible: {
        opacity: 1,
        y: 0,
      },
    };
  }
  return {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
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
  const [isChromeBrowser, setIsChromeBrowser] = useState(false);
  const { login, signup } = useAuth();

  // Chrome-specific performance optimizations (preserving interactivity)
  useEffect(() => {
    setIsChromeBrowser(isChrome());

    // Chrome-specific CSS optimizations - only for non-interactive elements
    if (isChrome()) {
      // Only apply to specific sections that don't need interactivity
      const nonInteractiveSections = document.querySelectorAll(
        ".chrome-optimize-only"
      );
      nonInteractiveSections.forEach((section) => {
        if (section instanceof HTMLElement) {
          section.style.setProperty("transform", "translate3d(0,0,0)");
          section.style.setProperty("backface-visibility", "hidden");
          section.style.setProperty("perspective", "1000px");
        }
      });

      // Optimize scroll performance without interfering with interactions
      document.body.style.setProperty("overflow-x", "hidden");
    }

    // Cleanup function
    return () => {
      if (isChrome()) {
        const nonInteractiveSections = document.querySelectorAll(
          ".chrome-optimize-only"
        );
        nonInteractiveSections.forEach((section) => {
          if (section instanceof HTMLElement) {
            section.style.removeProperty("transform");
            section.style.removeProperty("backface-visibility");
            section.style.removeProperty("perspective");
          }
        });
        document.body.style.removeProperty("overflow-x");
      }
    };
  }, []);

  // Memoize event handlers to prevent re-renders
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
    },
    [isLoginMode, formData, login, signup]
  );

  const handleModalOpen = useCallback((mode: boolean) => {
    console.log("Opening modal with mode:", mode);
    setIsLoginMode(mode);
    setShowAuthModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  const toggleBilling = useCallback((yearly: boolean) => {
    setIsYearlyBilling(yearly);
  }, []);

  // Memoize form data handlers
  const handleFormChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Scroll to section handlers
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToFeatures = useCallback(() => {
    console.log("Scrolling to features section");
    scrollToSection("features");
  }, [scrollToSection]);

  const scrollToPricing = useCallback(() => {
    console.log("Scrolling to pricing section");
    scrollToSection("pricing");
  }, [scrollToSection]);

  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      {/* Optimize background animations - only render one at a time */}
      <MemoizedStarsBackground />

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
            <button
              onClick={scrollToFeatures}
              className="px-3 py-2 text-lg font-thin transition-colors duration-200 cursor-pointer text-white/80 rounded-full hover:text-blue-400"
            >
              Features
            </button>
            <button
              onClick={scrollToPricing}
              className="px-3 py-2 text-lg font-thin transition-colors duration-200 cursor-pointer text-white/80 rounded-full hover:text-blue-400"
            >
              Pricing
            </button>
            <div className="hidden lg:block">
              <ButtonRotatingBackgroundGradient
                onClick={() => handleModalOpen(false)}
              >
                Get started
              </ButtonRotatingBackgroundGradient>
            </div>
            <Blackbutton onClick={handleUpstoxLogin}>Sign In</Blackbutton>
          </div>
          <div className="sm:hidden">
            <Blackbutton onClick={() => handleModalOpen(true)}>
              Sign In
            </Blackbutton>
          </div>
        </nav>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 pt-12 pb-20 text-center px-4">
          <MovingGradientPill
            onClick={() => {
              console.log("Hero pill button clicked!");
              handleModalOpen(false);
            }}
          />
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
          <ButtonShadowGradient onClick={() => handleModalOpen(false)}>
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

      {/* Optimized component loading with better chunking */}
      <div id="features" className="bg-amber-50 dark:bg-black">
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-96 bg-amber-50 dark:bg-black text-gray-500">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading amazing features...</p>
              </div>
            </div>
          }
        >
          <div className="feature1">
            <MemoizedExample />
          </div>
        </Suspense>

        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-96 bg-amber-50 dark:bg-black text-gray-500">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading insights...</p>
              </div>
            </div>
          }
        >
          <div className="feature3">
            <MemoizedExample3 />
          </div>
        </Suspense>

        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-96 bg-amber-50 dark:bg-black text-gray-500">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading features...</p>
              </div>
            </div>
          }
        >
          <div className="lamp">
            <MemoizedLampDemo />
          </div>
        </Suspense>

        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-96 bg-amber-50 dark:bg-black text-gray-500">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading analysis...</p>
              </div>
            </div>
          }
        >
          <div className="feature2">
            <MemoizedExample2 />
          </div>
        </Suspense>

        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-96 bg-amber-50 dark:bg-black text-gray-500">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading tools...</p>
              </div>
            </div>
          }
        >
          <div className="feature4">
            <MemoizedExample4 />
          </div>
        </Suspense>

        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-96 bg-amber-50 dark:bg-black text-gray-500">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading demo...</p>
              </div>
            </div>
          }
        >
          <div className="mac">
            <MemoizedMacbookScrollDemo />
          </div>
        </Suspense>

        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-96 bg-amber-50 dark:bg-black text-gray-500">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading experience...</p>
              </div>
            </div>
          }
        >
          <div className="feature5">
            <MemoizedExample5 />
          </div>
        </Suspense>
      </div>

      <section className="pb-20 bg-amber-50 dark:bg-black overflow-hidden">
        <div className="justify-center px-2 sm:px-5 pt-4">
          <Suspense
            fallback={
              <div className="flex items-center justify-center w-full h-96 bg-amber-50 dark:bg-black text-gray-500">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading charts...</p>
                </div>
              </div>
            }
          >
            <div className="charts-line">
              <MemoizedChartLineInteractive />
            </div>
          </Suspense>
        </div>
      </section>

      <div className="h-52 bg-amber-50 dark:bg-black">
        <div className="tabs">
          <MemoizedTabsExample />
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-black">
        <div className="bg-amber-50 dark:bg-black flex items-center justify-center px-4 sm:px-10">
          <div className="textloop">
            <MemoizedTextLoop />
          </div>
        </div>
        <div className="pt-20 pb-14 px-4 sm:px-10">
          <Suspense
            fallback={
              <div className="flex items-center justify-center w-full h-96 bg-amber-50 dark:bg-black text-gray-500">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading revenue insights...</p>
                </div>
              </div>
            }
          >
            <div className="revenue">
              <MemoizedRevenue />
              <MemoizedThreeDMarqueeDemo />
            </div>
          </Suspense>
        </div>
      </div>

      <div className="threeDmac"></div>

      {/* Features */}
      <section id="pricing" className="overflow-hidden bg-white dark:bg-black">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Title */}
          <div className="mx-auto max-w-2xl mb-8 lg:mb-14 text-center">
            <h2 className="text-3xl lg:text-4xl text-gray-800 dark:text-white font-bold">
              Solo, agency or team? We've got you covered.
            </h2>
          </div>
          {/* End Title */}

          <div className="relative xl:w-10/12 xl:mx-auto">
            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                {/* Card */}
                <div className="p-4 relative z-10 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl md:p-10">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Professional
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Everything a small team needs.
                  </div>

                  <div className="mt-5">
                    <span className="text-6xl font-bold text-gray-800 dark:text-white">
                      $18
                    </span>
                    <span className="text-lg font-bold text-gray-800 dark:text-white">
                      .00
                    </span>
                    <span className="ms-3 text-gray-500 dark:text-gray-400">
                      USD / monthly
                    </span>
                  </div>

                  <div className="mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0">
                    {/* List */}
                    <ul className="space-y-2 text-sm sm:text-base">
                      <li className="flex gap-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Up to 10 people
                        </span>
                      </li>

                      <li className="flex gap-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Collect data
                        </span>
                      </li>

                      <li className="flex gap-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Code extensibility
                        </span>
                      </li>
                    </ul>
                    {/* End List */}

                    {/* List */}
                    <ul className="space-y-2 text-sm sm:text-base">
                      <li className="flex gap-x-3">
                        <span className="size-5 flex justify-center items-center rounded-full bg-gray-50 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Custom reports
                        </span>
                      </li>

                      <li className="flex gap-x-3">
                        <span className="size-5 flex justify-center items-center rounded-full bg-gray-50 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Product support
                        </span>
                      </li>

                      <li className="flex gap-x-3">
                        <span className="size-5 flex justify-center items-center rounded-full bg-gray-50 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Activity reporting
                        </span>
                      </li>
                    </ul>
                    {/* End List */}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-x-4 py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Cancel anytime.
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No card required.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                      >
                        Start free trial
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Card */}
              </div>

              <div>
                {/* Card */}
                <div className="shadow-xl shadow-gray-200 dark:shadow-gray-800 p-5 relative z-10 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl md:p-10">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Teams
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    For growing businesses.
                  </div>
                  <span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3">
                    Most popular
                  </span>

                  <div className="mt-5">
                    <span className="text-6xl font-bold text-gray-800 dark:text-white">
                      $36
                    </span>
                    <span className="text-lg font-bold text-gray-800 dark:text-white">
                      .99
                    </span>
                    <span className="ms-3 text-gray-500 dark:text-gray-400">
                      USD / monthly
                    </span>
                  </div>

                  <div className="mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0">
                    {/* List */}
                    <ul className="space-y-2 text-sm sm:text-base">
                      <li className="flex gap-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Up to 10 people
                        </span>
                      </li>

                      <li className="flex gap-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Collect data
                        </span>
                      </li>

                      <li className="flex gap-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Code extensibility
                        </span>
                      </li>
                    </ul>
                    {/* End List */}

                    {/* List */}
                    <ul className="space-y-2 text-sm sm:text-base">
                      <li className="flex gap-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Custom reports
                        </span>
                      </li>

                      <li className="flex gap-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Product support
                        </span>
                      </li>

                      <li className="flex gap-x-3">
                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <svg
                            className="shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          Activity reporting
                        </span>
                      </li>
                    </ul>
                    {/* End List */}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-x-4 py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Cancel anytime.
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No card required.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Start free trial
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Card */}
              </div>
            </div>
            {/* End Grid */}

            {/* SVG Element */}
            <div className="hidden md:block absolute top-0 end-0 translate-y-16 translate-x-16">
              <svg
                className="w-16 h-auto text-orange-500"
                width="121"
                height="135"
                viewBox="0 0 121 135"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {/* End SVG Element */}

            {/* SVG Element */}
            <div className="hidden md:block absolute bottom-0 start-0 translate-y-16 -translate-x-16">
              <svg
                className="w-56 h-auto text-cyan-500"
                width="347"
                height="188"
                viewBox="0 0 347 188"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {/* End SVG Element */}
          </div>

          <div className="mt-7 text-center">
            <p className="text-xs text-gray-400">
              Prices in USD. Taxes may apply.
            </p>
          </div>
        </div>
      </section>
      {/* End Features */}

      {/* Comparison Table */}
      <section className="relative bg-white dark:bg-black">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 md:py-14 lg:py-20 mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl font-bold md:text-3xl md:leading-tight text-gray-800 dark:text-white">
              Compare plans
            </h2>
          </div>

          {/* Header */}
          <div className="hidden lg:block sticky top-0 start-0 py-2 bg-white/60 dark:bg-black/60 backdrop-blur-md">
            {/* Grid */}
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-2">
                <span className="font-semibold text-lg text-gray-800 dark:text-white">
                  Features
                </span>
              </div>
              {/* End Col */}

              <div className="col-span-1">
                <span className="font-semibold text-lg text-gray-800 dark:text-white">
                  Free
                </span>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Free forever
                </p>
              </div>
              {/* End Col */}

              <div className="col-span-1">
                <span className="font-semibold text-lg text-gray-800 dark:text-white">
                  Startup
                </span>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  $39 per month billed annually
                </p>
              </div>
              {/* End Col */}

              <div className="col-span-1">
                <span className="font-semibold text-lg text-gray-800 dark:text-white">
                  Team
                </span>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  $89 per month billed annually
                </p>
              </div>
              {/* End Col */}

              <div className="col-span-1">
                <span className="font-semibold text-lg text-gray-800 dark:text-white">
                  Enterprise
                </span>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  $149 per month billed annually
                </p>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Header */}

          {/* Section */}
          <div className="space-y-4 lg:space-y-0">
            {/* List */}
            <ul className="grid lg:grid-cols-6 lg:gap-6">
              {/* Item */}
              <li className="lg:col-span-2 lg:py-3">
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  General
                </span>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="hidden lg:block lg:col-span-1 py-1.5 lg:py-3 px-4 lg:px-0 lg:text-center"></li>
              {/* End Item */}

              {/* Item */}
              <li className="hidden lg:block lg:col-span-1 py-1.5 lg:py-3 px-4 lg:px-0 lg:text-center"></li>
              {/* End Item */}

              {/* Item */}
              <li className="hidden lg:block lg:col-span-1 py-1.5 lg:py-3 px-4 lg:px-0 lg:text-center"></li>
              {/* End Item */}

              {/* Item */}
              <li className="hidden lg:block lg:col-span-1 py-1.5 lg:py-3 px-4 lg:px-0 lg:text-center"></li>
              {/* End Item */}
            </ul>
            {/* End List */}

            {/* List */}
            <ul className="grid lg:grid-cols-6 lg:gap-6">
              {/* Item */}
              <li className="lg:col-span-2 pb-1.5 lg:py-3">
                <span className="font-semibold lg:font-normal text-sm text-gray-800 dark:text-white">
                  Number of seats
                </span>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Free
                  </span>
                  <span className="text-sm text-gray-800 dark:text-white">
                    1
                  </span>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Startup
                  </span>
                  <span className="text-sm text-gray-800 dark:text-white">
                    Up to 3
                  </span>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Team
                  </span>
                  <span className="text-sm text-gray-800 dark:text-white">
                    Up to 10
                  </span>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Enterprise
                  </span>
                  <span className="text-sm text-gray-800 dark:text-white">
                    Unlimited
                  </span>
                </div>
              </li>
              {/* End Item */}
            </ul>
            {/* End List */}

            {/* List */}
            <ul className="grid lg:grid-cols-6 lg:gap-6">
              {/* Item */}
              <li className="lg:col-span-2 pb-1.5 lg:py-3">
                <span className="font-semibold lg:font-normal text-sm text-gray-800 dark:text-white">
                  Storage
                </span>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Free
                  </span>
                  <span className="text-sm text-gray-800 dark:text-white">
                    15 GB
                  </span>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Startup
                  </span>
                  <span className="text-sm text-gray-800 dark:text-white">
                    1 TB
                  </span>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Team
                  </span>
                  <span className="text-sm text-gray-800 dark:text-white">
                    15 TB
                  </span>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Enterprise
                  </span>
                  <span className="text-sm text-gray-800 dark:text-white">
                    Unlimited
                  </span>
                </div>
              </li>
              {/* End Item */}
            </ul>
            {/* End List */}

            {/* List */}
            <ul className="grid lg:grid-cols-6 lg:gap-6">
              {/* Item */}
              <li className="lg:col-span-2 pb-1.5 lg:py-3">
                <span className="font-semibold lg:font-normal text-sm text-gray-800 dark:text-white">
                  Email sharing
                </span>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Free
                  </span>
                  <svg
                    className="shrink-0 size-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Startup
                  </span>
                  <svg
                    className="shrink-0 size-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Team
                  </span>
                  <svg
                    className="shrink-0 size-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Enterprise
                  </span>
                  <svg
                    className="shrink-0 size-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </li>
              {/* End Item */}
            </ul>
            {/* End List */}

            {/* List */}
            <ul className="grid lg:grid-cols-6 lg:gap-6">
              {/* Item */}
              <li className="lg:col-span-2 pb-1.5 lg:py-3">
                <span className="font-semibold lg:font-normal text-sm text-gray-800 dark:text-white">
                  Any time, anywhere access
                </span>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Free
                  </span>
                  <svg
                    className="shrink-0 size-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Startup
                  </span>
                  <svg
                    className="shrink-0 size-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Team
                  </span>
                  <svg
                    className="shrink-0 size-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </li>
              {/* End Item */}

              {/* Item */}
              <li className="col-span-1 py-1.5 lg:py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-6 lg:block">
                  <span className="lg:hidden md:col-span-2 text-sm text-gray-800 dark:text-white">
                    Enterprise
                  </span>
                  <svg
                    className="shrink-0 size-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </li>
              {/* End Item */}
            </ul>
            {/* End List */}
          </div>
          {/* End Section */}

          {/* Header */}
          <div className="hidden lg:block mt-6">
            {/* Grid */}
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-2"></div>
              {/* End Col */}

              <div className="col-span-1">
                <a
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-black dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                  href="#"
                >
                  Get started
                </a>
              </div>
              {/* End Col */}

              <div className="col-span-1">
                <a
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  Get started
                </a>
              </div>
              {/* End Col */}

              <div className="col-span-1">
                <a
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-black dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                  href="#"
                >
                  Get started
                </a>
              </div>
              {/* End Col */}

              <div className="col-span-1">
                <a
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-black dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                  href="#"
                >
                  Get started
                </a>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Header */}

          {/* Button Group */}
          <div className="mt-8 md:mt-12 flex justify-center items-center gap-x-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need a custom plan?
            </p>

            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-black dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              Contact us
            </button>
          </div>
          {/* End Button Group */}
        </div>
      </section>
      {/* End Comparison Table */}

      {/* FAQ section */}
      <section>
        <div>
          <div className="accordion">
            <MemoizedAccordion />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-12 text-white bg-black">
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

      {/* Optimized Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={handleModalClose}
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
                  onClick={handleModalClose}
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
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    required
                    className="border-gray-300 focus:border-blue-500"
                  />
                )}
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  required
                  className="border-gray-300 focus:border-blue-500"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                  required
                  className="border-gray-300 focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading
                    ? "Please wait..."
                    : isLoginMode
                    ? "Sign In"
                    : "Create Account"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add shooting stars only when needed for performance */}
      <MemoizedShootingStars />
    </div>
  );
};

// PricingCard Component
const PricingCard = ({
  children,
  description,
  price,
  type,
  subscription,
  buttonText,
  active,
}: {
  children: React.ReactNode;
  description: string;
  price: string;
  type: string;
  subscription: string;
  buttonText: string;
  active?: boolean;
}) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div
          className={`relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 ${
            active
              ? "border-blue-500 dark:border-blue-400 bg-white dark:bg-black"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
          } px-8 py-10 shadow-lg dark:shadow-gray-900/20 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]`}
        >
          {active && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                Most Popular
              </span>
            </div>
          )}
          <span className="mb-3 block text-lg font-semibold text-blue-600 dark:text-blue-400">
            {type}
          </span>
          <h2 className="mb-5 text-[42px] font-bold text-gray-900 dark:text-white">
            {price}
            <span className="text-base font-medium text-gray-500 dark:text-gray-400">
              {subscription && ` / ${subscription}`}
            </span>
          </h2>
          <p className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-8 text-base text-gray-600 dark:text-gray-300">
            {description}
          </p>
          <div className="mb-9 flex flex-col gap-[14px]">{children}</div>
          <a
            href="/#"
            className={`block w-full rounded-md border p-3 text-center text-base font-medium transition ${
              active
                ? "border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
                : "border-gray-200 dark:border-gray-700 bg-transparent text-blue-600 dark:text-blue-400 hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:hover:border-blue-400"
            }`}
          >
            {buttonText}
          </a>
          <div>
            <span className="absolute right-0 top-7 z-[-1]">
              <svg
                width={77}
                height={172}
                viewBox="0 0 77 172"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1={86}
                    y1={0}
                    x2={86}
                    y2={172}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3056D3" stopOpacity="0.09" />
                    <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="absolute right-4 top-4 z-[-1]">
              <svg
                width={41}
                height={89}
                viewBox="0 0 41 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="38.9138"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 38.9138 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 38.9138 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 38.9138 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 38.9138 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 38.9138 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 38.9138 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 38.9138 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="38.9138"
                  cy="1.42021"
                  r="1.42021"
                  transform="rotate(180 38.9138 1.42021)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 26.4157 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 26.4157 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 26.4157 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 26.4157 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 26.4157 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 26.4157 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 26.4157 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="26.4157"
                  cy="1.4202"
                  r="1.42021"
                  transform="rotate(180 26.4157 1.4202)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 13.9177 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 13.9177 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 13.9177 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 13.9177 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 13.9177 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 13.9177 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 13.9177 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="13.9177"
                  cy="1.42019"
                  r="1.42021"
                  transform="rotate(180 13.9177 1.42019)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="87.4849"
                  r="1.42021"
                  transform="rotate(180 1.41963 87.4849)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="74.9871"
                  r="1.42021"
                  transform="rotate(180 1.41963 74.9871)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="62.4892"
                  r="1.42021"
                  transform="rotate(180 1.41963 62.4892)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="38.3457"
                  r="1.42021"
                  transform="rotate(180 1.41963 38.3457)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="13.634"
                  r="1.42021"
                  transform="rotate(180 1.41963 13.634)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="50.2754"
                  r="1.42021"
                  transform="rotate(180 1.41963 50.2754)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="26.1319"
                  r="1.42021"
                  transform="rotate(180 1.41963 26.1319)"
                  fill="#3056D3"
                />
                <circle
                  cx="1.41963"
                  cy="1.4202"
                  r="1.42021"
                  transform="rotate(180 1.41963 1.4202)"
                  fill="#3056D3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

// List Component
const List = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-base text-gray-600 dark:text-gray-300 flex items-center">
      <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
      {children}
    </p>
  );
};
