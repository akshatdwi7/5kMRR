import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Star, Plus } from "lucide-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Mock data for watchlist stocks
const watchlistStocks = [
  {
    symbol: "NVDA",
    company: "NVIDIA Corporation",
    currentPrice: 875.28,
    change: 12.45,
    percentageChange: 1.44,
    isPositive: true,
    logo: "🎮",
    sector: "Technology",
    marketCap: "2.1T",
    volume: "45.2M",
  },
  {
    symbol: "META",
    company: "Meta Platforms Inc.",
    currentPrice: 485.12,
    change: -8.23,
    percentageChange: -1.67,
    isPositive: false,
    logo: "📱",
    sector: "Technology",
    marketCap: "1.2T",
    volume: "18.7M",
  },
  {
    symbol: "NFLX",
    company: "Netflix Inc.",
    currentPrice: 612.45,
    change: 5.67,
    percentageChange: 0.93,
    isPositive: true,
    logo: "🎬",
    sector: "Entertainment",
    marketCap: "270B",
    volume: "3.2M",
  },
  {
    symbol: "AMD",
    company: "Advanced Micro Devices",
    currentPrice: 142.33,
    change: -2.11,
    percentageChange: -1.46,
    isPositive: false,
    logo: "💻",
    sector: "Technology",
    marketCap: "230B",
    volume: "28.9M",
  },
  {
    symbol: "TSM",
    company: "Taiwan Semiconductor",
    currentPrice: 98.76,
    change: 1.23,
    percentageChange: 1.26,
    isPositive: true,
    logo: "🔧",
    sector: "Semiconductors",
    marketCap: "510B",
    volume: "12.4M",
  },
  {
    symbol: "COIN",
    company: "Coinbase Global Inc.",
    currentPrice: 234.56,
    change: 15.78,
    percentageChange: 7.21,
    isPositive: true,
    logo: "₿",
    sector: "Financial Services",
    marketCap: "55B",
    volume: "8.1M",
  },
];

export const Watchlist: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black border border-neutral-800 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-2xl font-bold flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-400" />
              My Watchlist
            </h1>
            <p className="text-neutral-400 text-sm mt-1">
              Monitor your favorite stocks and track their performance
            </p>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Stock</span>
          </button>
        </div>
      </div>

      {/* Watchlist Stocks */}
      <div className="bg-black border border-neutral-800 rounded-lg p-6">
        <div className="space-y-4">
          {watchlistStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 hover:bg-neutral-800 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                {/* Left side - Company info */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                    {stock.logo}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {stock.company}
                    </div>
                    <div className="text-neutral-400 text-sm">
                      {stock.symbol} • {stock.sector} • {stock.marketCap}
                    </div>
                  </div>
                </div>

                {/* Right side - Price and change info */}
                <div className="text-right">
                  <div className="text-white font-bold text-lg">
                    £{stock.currentPrice.toFixed(2)}
                  </div>
                  <div
                    className={classNames(
                      stock.isPositive ? "text-emerald-400" : "text-red-400",
                      "text-sm font-medium flex items-center justify-end"
                    )}
                  >
                    {stock.isPositive ? "+" : ""}£{stock.change.toFixed(2)}
                    <span className="ml-1">
                      ({stock.isPositive ? "+" : ""}
                      {stock.percentageChange.toFixed(2)}%)
                    </span>
                    {stock.isPositive ? (
                      <TrendingUp className="w-3 h-3 ml-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 ml-1" />
                    )}
                  </div>
                  <div className="text-neutral-400 text-xs">
                    Vol: {stock.volume}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-neutral-700">
          <div className="text-center">
            <div className="text-neutral-400 text-sm">
              Total Watchlist Stocks
            </div>
            <div className="text-white font-bold text-xl">
              {watchlistStocks.length} Stocks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
