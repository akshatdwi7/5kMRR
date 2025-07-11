import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, TrendingUp, ArrowUpRight, ArrowDownRight, Sparkles, DollarSign, Target, Activity, Plus, Star } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AIQueryInterface } from '../components/ai/AIQueryInterface';
import { Stock } from '../types';
import { stockApi } from '../services/stockApi';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [topMovers, setTopMovers] = useState<Stock[]>([]);
  const [portfolioSummary, setPortfolioSummary] = useState({
    totalInvested: 500000,
    totalCurrent: 547500,
    totalGainLoss: 47500,
    totalGainLossPercent: 9.5,
  });
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movers, summary] = await Promise.all([
          stockApi.getTopMovers(),
          supabaseService.getPortfolioSummary().catch(() => portfolioSummary) // Fallback to mock data
        ]);
        setTopMovers(movers);
        setPortfolioSummary(summary);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const searchStocks = async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        try {
          const results = await stockApi.searchStocks(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching stocks:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setSelectedStock(null);
      }
    };

    const debounceTimer = setTimeout(searchStocks, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
  };

  const handleAddToWatchlist = async (stock: Stock) => {
    try {
      await supabaseService.addToWatchlist(stock.symbol, stock.name);
      // Show success message
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 px-2">
          Ask AI About Any Stock
        </h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-2">Get instant, intelligent answers about Indian stocks</p>
      </div>

      {/* Portfolio Summary - Simplified */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-blue-200 mx-1 sm:mx-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="text-center">
            <div className="text-xs sm:text-sm lg:text-base text-gray-600 mb-1">Invested</div>
            <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">
              ₹{(portfolioSummary.totalInvested / 100000).toFixed(1)}L
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm lg:text-base text-gray-600 mb-1">Current</div>
            <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">
              ₹{(portfolioSummary.totalCurrent / 100000).toFixed(1)}L
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm lg:text-base text-gray-600 mb-1">Gain</div>
            <div className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold ${portfolioSummary.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioSummary.totalGainLoss >= 0 ? '+' : ''}₹{(Math.abs(portfolioSummary.totalGainLoss) / 1000).toFixed(1)}K
            <div className="text-xs text-gray-600 mb-1">Returns</div>
            <div className={`text-sm sm:text-lg lg:text-2xl font-bold flex items-center justify-center ${portfolioSummary.totalGainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Returns</div>
            <div className={`text-lg sm:text-xl lg:text-2xl font-bold flex items-center justify-center ${portfolioSummary.totalGainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioSummary.totalGainLossPercent >= 0 ? (
                <ArrowUpRight className="h-3 w-3 sm:h-5 sm:w-5 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 sm:h-5 sm:w-5 mr-1" />
              )}
              {portfolioSummary.totalGainLossPercent >= 0 ? '+' : ''}{portfolioSummary.totalGainLossPercent.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Main Stock Search - Core Feature */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200 mx-4 sm:mx-0">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-xl">
              <MessageCircle className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Stock Query Assistant</h2>
          </div>
          <p className="text-xs sm:text-base text-gray-600 px-4 sm:px-0">Search any Indian stock and ask AI anything about it</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative mb-4 sm:mb-6">
            <Input
              placeholder="Search stocks (e.g., RELIANCE, TCS, HDFC Bank)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-5 w-5 text-gray-400" />}
              className="text-sm sm:text-lg py-3 sm:py-4 bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white"
            />
            
            {isSearching && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-3 mb-6 sm:mb-8">
              {searchResults.slice(0, 4).map((stock) => (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors space-y-3 sm:space-y-0"
                >
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">{stock.symbol}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{stock.name}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-base sm:text-lg font-bold text-gray-900">₹{stock.price.toFixed(2)}</div>
                        <div className={`text-xs sm:text-sm font-medium ${stock.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.change > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddToWatchlist(stock)}
                      className="border-gray-300 text-gray-600 hover:bg-gray-50 text-xs sm:text-sm"
                    >
                      <Star className="h-3 w-3 sm:mr-1" />
                      <span className="hidden sm:inline">Watch</span>
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                      onClick={() => handleStockSelect(stock)}
                    >
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Ask AI</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Quick Examples */}
          {!selectedStock && searchResults.length === 0 && (
            <div className="text-center">
              <p className="text-gray-500 text-xs mb-3 sm:mb-4">Try asking:</p>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {[
                  "Should I buy RELIANCE?",
                  "TCS vs Infosys comparison",
                  "HDFC Bank analysis",
                  "Best IT stocks today"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(example.split(' ')[2] || example.split(' ')[0])}
                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition-colors"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Query Interface */}
      {selectedStock && (
        <AIQueryInterface
          stockSymbol={selectedStock.symbol}
          stockName={selectedStock.name}
          onUpgrade={() => {
            // Navigate to premium page
            window.location.href = '/premium';
          }}
        />
      )}

      {/* General AI Query Interface (when no stock selected) */}
      {!selectedStock && searchQuery === '' && searchResults.length === 0 && (
        <AIQueryInterface
          onUpgrade={() => {
            window.location.href = '/premium';
          }}
        />
      )}

      {/* Top Movers - Secondary Feature */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 mx-4 sm:mx-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 mr-2" />
            Top Movers Today
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm text-green-600 font-medium">Live</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {topMovers.slice(0, 6).map((stock, index) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => handleStockSelect(stock)}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{stock.symbol}</h4>
                  <p className="text-xs text-gray-600 truncate">{stock.sector}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stock.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stock.change > 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">₹{stock.price.toFixed(2)}</span>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs px-2">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  <span className="hidden xs:inline">Ask AI</span>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Usage Stats for Free Users */}
      {profile?.subscription_tier === 'free' && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 sm:p-6 border border-yellow-200 mx-4 sm:mx-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
            <div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2">Daily Usage</h3>
              <p className="text-xs sm:text-base text-gray-600">
                You've used {profile.ai_queries_used} of {profile.ai_queries_limit} free AI queries today
              </p>
              <div className="w-full sm:w-80 bg-gray-200 rounded-full h-2 mt-2 sm:mt-3">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(profile.ai_queries_used / profile.ai_queries_limit) * 100}%` }}
                />
              </div>
            </div>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white w-full sm:w-auto text-xs sm:text-sm"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Upgrade to Pro
            </Button>
          </div>
        </div>
      )}
    </div>
  );