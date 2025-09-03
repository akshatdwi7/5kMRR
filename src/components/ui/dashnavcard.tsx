// 'use client';

import { TrendingUp, TrendingDown } from "lucide-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const stockData = [
  {
    symbol: "TSLA",
    company: "Tesla Inc.",
    currentPrice: 801.0,
    priceChange: 0.92,
    percentageChange: 1.24,
    isPositive: true,
    logo: "🚗", // Using emoji as placeholder for logo
    updated: "2m ago",
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    currentPrice: 185.5,
    priceChange: -2.3,
    percentageChange: -1.22,
    isPositive: false,
    logo: "🍎",
    updated: "1m ago",
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corp.",
    currentPrice: 420.75,
    priceChange: 8.45,
    percentageChange: 2.05,
    isPositive: true,
    logo: "🪟",
    updated: "3m ago",
  },
];

// Mock chart data for the line chart
const generateChartData = (isPositive: boolean) => {
  const baseValue = 100;
  const data = [];

  for (let i = 0; i < 20; i++) {
    const randomChange = (Math.random() - 0.5) * 10;
    const value = baseValue + randomChange + (isPositive ? 5 : -5);
    data.push({ value: Math.max(0, value) });
  }

  return data;
};

export default function Dashnavcard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stockData.map((stock) => (
          <div
            key={stock.symbol}
            className="bg-black border border-neutral-800 rounded-10xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Header with Logo, Ticker, Company Name, and Update Status */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500 rounded-3xl flex items-center justify-center text-white text-2xl font-bold">
                  {stock.logo}
                </div>
                <div>
                  <div className="text-neutral-400 text-sm font-medium">
                    {stock.symbol}
                  </div>
                  <div className="text-white font-semibold">
                    {stock.company}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-neutral-400 text-xs">updated</div>
                <div className="text-white text-sm font-medium">
                  {stock.updated}
                </div>
              </div>
            </div>

            {/* Price and Change Section */}
            <div className="flex items-end justify-between mb-6">
              <div className="flex items-baseline space-x-3">
                <div className="text-white text-3xl font-bold">
                  £{stock.currentPrice.toFixed(2)}
                </div>
                <div className="flex flex-col">
                  <div
                    className={classNames(
                      stock.isPositive ? "text-emerald-400" : "text-red-400",
                      "text-lg font-semibold"
                    )}
                  >
                    {stock.isPositive ? "+" : ""}£{stock.priceChange.toFixed(2)}
                  </div>
                  <div
                    className={classNames(
                      stock.isPositive ? "text-emerald-400" : "text-red-400",
                      "text-sm font-medium flex items-center"
                    )}
                  >
                    {stock.isPositive ? "+" : ""}
                    {stock.percentageChange.toFixed(2)}%
                    {stock.isPositive ? (
                      <TrendingUp className="w-4 h-4 ml-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-700 border-dashed border-neutral-600"></div>
              <div className="relative h-16">
                <svg className="w-full h-full" viewBox="0 0 200 64">
                  <path
                    d={generateChartData(stock.isPositive)
                      .map((point, index) => {
                        const x = (index / 19) * 200;
                        const y = 64 - (point.value / 110) * 64;
                        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
                      })
                      .join(" ")}
                    stroke={stock.isPositive ? "#10B981" : "#EF4444"}
                    strokeWidth="2"
                    fill="none"
                    className="drop-shadow-lg"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
