import React from "react";
import { TrendingUp, TrendingDown, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Mock data for watchlist stocks (showing only top 3 for dashboard)
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
  },
];

export default function WatchlistSection() {
  const navigate = useNavigate();

  const handleWatchlistClick = () => {
    navigate("/watchlist");
  };

  return (
    <div className="bg-black border border-neutral-800 rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleWatchlistClick}
        >
          <div className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            <h2 className="text-white text-xl font-bold">Watchlist</h2>
          </div>
          <ChevronRight className="w-4 h-4 ml-2 text-neutral-400" />
        </div>
        <div className="text-right">
          <div className="text-white text-sm font-medium">
            {watchlistStocks.length} stocks
          </div>
          <p className="text-neutral-400 text-xs">Track favorites</p>
        </div>
      </div>

      {/* Watchlist Stocks List */}
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
                    {stock.symbol} • {stock.sector}
                  </div>
                </div>
              </div>

              {/* Right side - Price and change info */}
              <div className="text-right">
                <div className="text-white font-bold">
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-neutral-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-neutral-400 text-sm">Total Stocks</div>
            <div className="text-white font-bold">{watchlistStocks.length}</div>
          </div>
          <div>
            <div className="text-neutral-400 text-sm">Avg Change</div>
            <div className="text-emerald-400 font-bold">+1.23%</div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleWatchlistClick}
            className="w-full text-center text-pink-400 hover:text-pink-300 text-sm font-medium transition-colors"
          >
            View all watchlist stocks →
          </button>
        </div>
      </div>
    </div>
  );
}
