// 'use client';

import { TrendingUp, TrendingDown } from "lucide-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Indian market indices data for the ticker
const indianIndices = [
  {
    symbol: "NIFTY 50",
    currentPrice: 23456.78,
    priceChange: 123.45,
    percentageChange: 0.53,
    isPositive: true,
  },
  {
    symbol: "BANK NIFTY",
    currentPrice: 45678.9,
    priceChange: -234.56,
    percentageChange: -0.51,
    isPositive: false,
  },
  {
    symbol: "NIFTY IT",
    currentPrice: 34567.89,
    priceChange: 456.78,
    percentageChange: 1.34,
    isPositive: true,
  },
  {
    symbol: "NIFTY AUTO",
    currentPrice: 12345.67,
    priceChange: -89.12,
    percentageChange: -0.72,
    isPositive: false,
  },
  {
    symbol: "NIFTY FMCG",
    currentPrice: 56789.01,
    priceChange: 234.56,
    percentageChange: 0.41,
    isPositive: true,
  },
  {
    symbol: "NIFTY PHARMA",
    currentPrice: 23456.78,
    priceChange: -123.45,
    percentageChange: -0.52,
    isPositive: false,
  },
];

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
      {/* Moving Ticker for Indian Indices */}
      <div className="bg-black border border-neutral-800 rounded-lg mb-4 -mt-2 overflow-hidden">
        <div
          className="flex"
          style={{
            animation: "scroll 30s linear infinite",
            width: "200%",
          }}
        >
          {[...indianIndices, ...indianIndices].map((index, idx) => (
            <div
              key={`${index.symbol}-${idx}`}
              className="flex items-center space-x-4 px-6 py-3 whitespace-nowrap border-r border-neutral-800"
            >
              <div className="text-white font-semibold text-sm">
                {index.symbol}
              </div>
              <div className="text-white text-sm font-bold">
                ₹{index.currentPrice.toFixed(2)}
              </div>
              <div
                className={classNames(
                  index.isPositive ? "text-emerald-400" : "text-red-400",
                  "text-sm font-medium flex items-center"
                )}
              >
                {index.isPositive ? "+" : ""}₹{index.priceChange.toFixed(2)}
                <span className="ml-1">
                  ({index.isPositive ? "+" : ""}
                  {index.percentageChange.toFixed(2)}%)
                </span>
                {index.isPositive ? (
                  <TrendingUp className="w-3 h-3 ml-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 ml-1" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `,
        }}
      />
    </>
  );
}
