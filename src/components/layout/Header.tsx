import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Bell, User, TrendingUp, LogOut, BarChart3, MessageCircle, Star, Settings, Crown, Activity, PieChart, Calendar, BookOpen, ChevronDown } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { name: 'Dashboard', icon: BarChart3, path: '/' },
  { name: 'Screener', icon: Search, path: '/screener' },
  { name: 'Watchlist', icon: Star, path: '/watchlist' },
  { name: 'Portfolio', icon: PieChart, path: '/portfolio' },
  { name: 'AI Chat', icon: MessageCircle, path: '/chat' },
  { name: 'News', icon: BookOpen, path: '/news' },
  { name: 'Calendar', icon: Calendar, path: '/calendar' },
];

const toolsItems = [
  { name: 'Stock Screener', path: '/screener' },
  { name: 'Portfolio Tracker', path: '/portfolio' },
  { name: 'Watchlist Manager', path: '/watchlist' },
  { name: 'AI Analysis', path: '/chat' },
  { name: 'Market Calendar', path: '/calendar' },
  { name: 'News Feed', path: '/news' },
];

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, profile, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Screeno
            </span>
          </div>
          
          {/* Search */}
          <div className="flex-1 max-w-xl mx-8">
            <Input
              placeholder="Search for a company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4 text-gray-400" />}
              className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white"
            />
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Market Status */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Market Open</span>
            </div>
            
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative text-gray-600 hover:text-gray-900">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            
            {/* Premium Button */}
            {profile?.subscription_tier === 'free' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 border-none text-white hover:from-yellow-600 hover:to-orange-600"
              >
                <Crown className="h-4 w-4 mr-1" />
                Go Pro
              </Button>
            )}
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.full_name}
                    className="w-7 h-7 rounded-full border-2 border-blue-200"
                  />
                ) : (
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                <span className="text-gray-900 font-medium hidden md:block">
                  {profile?.full_name || 'User'}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              
              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">{profile?.full_name}</div>
                    <div className="text-xs text-gray-500">{profile?.email}</div>
                    <div className="text-xs text-blue-600 capitalize">{profile?.subscription_tier} Plan</div>
                  </div>
                  <NavLink
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </NavLink>
                  <NavLink
                    to="/premium"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="flex items-center px-6">
          {/* Main Navigation */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
          
          {/* Tools Dropdown */}
          <div className="relative ml-4">
            <button
              onClick={() => setShowToolsDropdown(!showToolsDropdown)}
              className="flex items-center space-x-1 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-all duration-200"
            >
              <span>TOOLS</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {/* Tools Dropdown Menu */}
            {showToolsDropdown && (
              <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  Analysis Tools
                </div>
                {toolsItems.map((tool) => (
                  <NavLink
                    key={tool.name}
                    to={tool.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowToolsDropdown(false)}
                  >
                    {tool.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          
          {/* AI Button */}
          <div className="ml-auto">
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                }`
              }
            >
              <MessageCircle className="h-4 w-4" />
              <span>AI</span>
            </NavLink>
          </div>
        </nav>
      </div>
      
      {/* Click outside handlers */}
      {(showToolsDropdown || showUserDropdown) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowToolsDropdown(false);
            setShowUserDropdown(false);
          }}
        />
      )}
    </header>
  );
};