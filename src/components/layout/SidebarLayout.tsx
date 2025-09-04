import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IconSearch,
  IconMessageCircle,
  IconStar,
  IconCrown,
  IconSettings,
  IconUser,
  IconSun,
  IconMoon,
  IconBell,
  IconHomeFilled,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import ssLogo from "../../assets/logos/ss.png";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconHomeFilled className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Screener",
      href: "/screener",
      icon: (
        <IconSearch className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Watchlist",
      href: "/watchlist",
      icon: (
        <IconStar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "AI Chat",
      href: "/chat",
      icon: (
        <IconMessageCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Premium",
      href: "/premium",
      icon: (
        <IconCrown className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You can implement actual theme toggling logic here
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-full flex-1 flex-col overflow-hidden bg-gray-50 md:flex-row dark:bg-black",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto ">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    ...link,
                    href: "#",
                  }}
                  className={cn(
                    "cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900 rounded-lg py-2.5 px-3 ",
                    location.pathname === link.href &&
                      "bg-neutral-200 dark:bg-neutral-900"
                  )}
                  onClick={() => handleNavigation(link.href)}
                />
              ))}
            </div>
          </div>

          {/* User Profile Section */}
          <div className="space-y-2 ">
            <SidebarLink
              link={{
                label: "Demo User",
                href: "#",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full  flex items-center justify-center">
                    <IconUser className="h-6 w-6 text-white" />
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex h-full w-full flex-1 flex-col rounded-tl-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black overflow-y-auto">
          {/* Header Section */}
          <div className="border-b border-neutral-200 dark:border-neutral-700 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl  text-neutral-900 dark:text-neutral-100 font-thin ">
                  {getCurrentPageTitle(location.pathname)}
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {getCurrentPageDescription(location.pathname)}
                </p>
              </div>

              {/* Header Controls */}
              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                  <input
                    type="text"
                    placeholder="Search any company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-80 pl-10 pr-12 py-2 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none  focus:ring-0  dark:focus:ring-pink-900 dark:focus:border-pink-900 focus:border-pink-400 focus:ring-pink-400 dark:text-neutral-200"
                  />
                  <IconSearch className="h-4 w-4 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <kbd className="px-2 py-1 text-xs bg-neutral-200 dark:bg-black rounded border text-neutral-600 dark:text-neutral-400">
                      ⌘+K
                    </kbd>
                  </div>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  title="Toggle theme"
                >
                  {isDarkMode ? (
                    <IconSun className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                  ) : (
                    <IconMoon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                  )}
                </button>

                {/* Notifications */}
                <button className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors relative">
                  <IconBell className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>

                {/* Demo Badge */}
                <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <IconCrown className="h-4 w-4" />
                  <span>Demo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 p-4 md:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 py-1 text-sm font-thin text-black dark:text-white">
      <div className="h-8 w-8 shrink-0 rounded-lg  flex items-center justify-center">
        <img src={ssLogo} alt="Screeno Logo" className="h-10 w-10" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-lg whitespace-pre text-black dark:text-white"
      >
        Screeno
      </motion.span>
    </div>
  );
};

const LogoIcon = () => {
  return (
    <div className="flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white">
      <div className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center">
        <img src={ssLogo} alt="Screeno Logo" className=" h-10 w-10" />
      </div>
    </div>
  );
};

const getCurrentPageTitle = (pathname: string): string => {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/screener":
      return "Stock Screener";
    case "/watchlist":
      return "Watchlist";
    case "/chat":
      return "AI Assistant";
    case "/premium":
      return "Premium Plans";
    case "/settings":
      return "Settings";
    default:
      return "Dashboard";
  }
};

const getCurrentPageDescription = (pathname: string): string => {
  switch (pathname) {
    case "/":
      return "Your personalized stock market overview";
    case "/screener":
      return "Find and analyze stocks with advanced filters";
    case "/watchlist":
      return "Monitor your favorite stocks";
    case "/chat":
      return "Get AI-powered stock insights and analysis";
    case "/premium":
      return "Unlock advanced features and unlimited queries";
    case "/settings":
      return "Manage your account and preferences";
    default:
      return "Welcome to Screeno";
  }
};
