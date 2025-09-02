import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import { Button } from "../components/ui/Button";

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Mock data for the dashboard
  const stockCards = [
    {
      symbol: "AAPL",
      company: "Apple, Inc",
      price: 1232.0,
      change: 11.01,
      isPositive: true,
      logo: "🍎",
    },
    {
      symbol: "PYPL",
      company: "Paypal, Inc",
      price: 965.0,
      change: -9.05,
      isPositive: false,
      logo: "💙",
    },
    {
      symbol: "TSLA",
      company: "Tesla, Inc",
      price: 1232.0,
      change: 11.01,
      isPositive: true,
      logo: "⚡",
    },
    {
      symbol: "AMZN",
      company: "Amazon.com, Inc",
      price: 2567.99,
      change: 11.01,
      isPositive: true,
      logo: "📦",
    },
  ];

  const watchlistStocks = [
    {
      symbol: "AAPL",
      company: "Apple, Inc",
      price: 4008.65,
      change: 11.01,
      isPositive: true,
      logo: "🍎",
    },
    {
      symbol: "SPOT",
      company: "Spotify.com",
      price: 11689.0,
      change: 9.48,
      isPositive: true,
      logo: "🎵",
    },
    {
      symbol: "ABNB",
      company: "Airbnb, Inc",
      price: 32227.0,
      change: -0.29,
      isPositive: false,
      logo: "🏠",
    },
    {
      symbol: "ENVT",
      company: "Envato, Inc",
      price: 13895.0,
      change: 3.79,
      isPositive: true,
      logo: "🌱",
    },
    {
      symbol: "QIWI",
      company: "qiwi.com, Inc",
      price: 6008.65,
      change: 4.52,
      isPositive: true,
      logo: "💳",
    },
  ];

  const trendingStocks = [
    {
      symbol: "TSLA",
      company: "Tesla, Inc",
      price: 192.53,
      change: 1.01,
      isPositive: true,
      logo: "⚡",
    },
    {
      symbol: "AAPL",
      company: "Apple, Inc",
      price: 192.53,
      change: 3.59,
      isPositive: true,
      logo: "🍎",
    },
    {
      symbol: "SPOT",
      company: "Spotify.com",
      price: 192.53,
      change: 2.48,
      isPositive: true,
      logo: "🎵",
    },
  ];

  const transactions = [
    {
      id: 1,
      action: "Bought",
      symbol: "PYPL",
      date: "Nov 23, 01:00 PM",
      price: 2567.88,
      category: "Finance",
      status: "Success",
      logo: "💙",
    },
    {
      id: 2,
      action: "Bought",
      symbol: "AAPL",
      date: "Nov 22, 09:00 PM",
      price: 2567.88,
      category: "Technology",
      status: "Pending",
      logo: "🍎",
    },
  ];

  const dividendData = [
    { month: "Jan", amount: 150 },
    { month: "Feb", amount: 400 },
    { month: "Mar", amount: 200 },
    { month: "Apr", amount: 300 },
    { month: "May", amount: 180 },
    { month: "Jun", amount: 200 },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stock Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stockCards.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-gray-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-700 flex items-center justify-center text-lg">
                  {stock.logo}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {stock.symbol}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stock.company}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ${stock.price.toFixed(2)}
              </div>
              <div
                className={`flex items-center text-sm font-medium ${
                  stock.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {stock.isPositive ? "+" : ""}
                {stock.change.toFixed(2)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Portfolio Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Portfolio Performance Chart */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Portfolio Performance
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Here is your performance stats of each month
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-neutral-700 rounded-lg text-gray-600 dark:text-gray-400">
                  Monthly
                </button>
                <button className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                  Quarterly
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-neutral-700 rounded-lg text-gray-600 dark:text-gray-400">
                  Annually
                </button>
              </div>
            </div>

            {/* Placeholder for chart - you'll replace this with your chart library */}
            <div className="h-64 bg-gray-50 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">
                  Portfolio Performance Chart
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Chart component will go here
                </p>
              </div>
            </div>
          </div>

          {/* Trending Stocks */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Trending Stocks
              </h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg">
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400 rotate-180" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg">
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trendingStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="bg-gray-50 dark:bg-neutral-700 rounded-xl p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm">
                        {stock.logo}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {stock.symbol}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {stock.company}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        ${stock.price}
                      </div>
                      <div className="text-xs text-green-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        {stock.change}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs border-gray-300 dark:border-neutral-600"
                    >
                      Short Stock
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs"
                    >
                      Buy Stock
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Transactions */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Latest Transactions
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg text-sm"
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-neutral-700">
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Name
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Date
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Price
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Category
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Status
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400"></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 dark:border-neutral-700 last:border-0"
                    >
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-700 flex items-center justify-center">
                            {transaction.logo}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {transaction.action} {transaction.symbol}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                        {transaction.date}
                      </td>
                      <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">
                        ${transaction.price}
                      </td>
                      <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                        {transaction.category}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.status === "Success"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-6">
          {/* Dividend Chart */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Dividend
              </h2>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Simple Bar Chart */}
            <div className="space-y-4">
              <div className="flex items-end justify-between h-32">
                {dividendData.map((data) => (
                  <div
                    key={data.month}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div
                      className="bg-blue-500 rounded-t w-6 transition-all duration-300 hover:bg-blue-600"
                      style={{
                        height: `${(data.amount / 400) * 100}%`,
                        minHeight: "8px",
                      }}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Watchlist */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                My Watchlist
              </h2>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {watchlistStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-700 flex items-center justify-center text-sm">
                      {stock.logo}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {stock.symbol}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {stock.company}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      ${stock.price.toLocaleString()}
                    </div>
                    <div
                      className={`text-xs flex items-center ${
                        stock.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stock.isPositive ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {stock.isPositive ? "+" : ""}
                      {stock.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
