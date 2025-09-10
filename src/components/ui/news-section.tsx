import React, { useState } from "react";
import {
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Clock,
  Star,
} from "lucide-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Mock news data for holdings and watchlist stocks
const newsData = [
  {
    id: 1,
    title: "Tesla Reports Record Q4 Deliveries, Stock Surges 3.2%",
    summary:
      "Tesla delivered 484,507 vehicles in Q4, beating analyst expectations and driving stock price higher.",
    source: "Reuters",
    publishedAt: "2 hours ago",
    sentiment: "positive",
    stockSymbol: "TSLA",
    stockName: "Tesla Inc.",
    logo: "🚗",
    category: "Earnings",
    readTime: "3 min read",
  },
  {
    id: 2,
    title: "Apple's iPhone 15 Sales Exceed Expectations in China",
    summary:
      "Strong demand for iPhone 15 series in Chinese market boosts Apple's revenue projections for Q1.",
    source: "Bloomberg",
    publishedAt: "4 hours ago",
    sentiment: "positive",
    stockSymbol: "AAPL",
    stockName: "Apple Inc.",
    logo: "🍎",
    category: "Sales",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "NVIDIA Announces New AI Chip Architecture for 2024",
    summary:
      "NVIDIA reveals next-generation AI processors expected to revolutionize machine learning workloads.",
    source: "TechCrunch",
    publishedAt: "6 hours ago",
    sentiment: "positive",
    stockSymbol: "NVDA",
    stockName: "NVIDIA Corporation",
    logo: "🎮",
    category: "Product Launch",
    readTime: "5 min read",
  },
  {
    id: 4,
    title: "Microsoft Azure Revenue Growth Slows in Q4",
    summary:
      "Microsoft's cloud division shows slower growth compared to previous quarters, raising investor concerns.",
    source: "CNBC",
    publishedAt: "8 hours ago",
    sentiment: "negative",
    stockSymbol: "MSFT",
    stockName: "Microsoft Corp.",
    logo: "🪟",
    category: "Earnings",
    readTime: "3 min read",
  },
  {
    id: 5,
    title: "Meta's Reality Labs Division Reports $4.3B Loss",
    summary:
      "Meta's metaverse investments continue to weigh on profitability despite strong advertising revenue.",
    source: "Wall Street Journal",
    publishedAt: "10 hours ago",
    sentiment: "negative",
    stockSymbol: "META",
    stockName: "Meta Platforms Inc.",
    logo: "📱",
    category: "Earnings",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "Netflix Adds 13M Subscribers in Q4, Beats Forecasts",
    summary:
      "Strong content lineup and password-sharing crackdown drive subscriber growth beyond expectations.",
    source: "Variety",
    publishedAt: "12 hours ago",
    sentiment: "positive",
    stockSymbol: "NFLX",
    stockName: "Netflix Inc.",
    logo: "🎬",
    category: "Subscriber Growth",
    readTime: "4 min read",
  },
];

export default function NewsSection() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { key: "all", label: "All News" },
    { key: "holdings", label: "My Holdings" },
    { key: "watchlist", label: "Watchlist" },
    { key: "positive", label: "Positive" },
    { key: "negative", label: "Negative" },
  ];

  const filteredNews = newsData.filter((news) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "holdings") {
      return ["TSLA", "AAPL", "MSFT", "GOOGL", "AMZN"].includes(
        news.stockSymbol
      );
    }
    if (selectedFilter === "watchlist") {
      return ["NVDA", "META", "NFLX"].includes(news.stockSymbol);
    }
    if (selectedFilter === "positive") return news.sentiment === "positive";
    if (selectedFilter === "negative") return news.sentiment === "negative";
    return true;
  });

  const getSentimentIcon = (sentiment: string) => {
    return sentiment === "positive" ? (
      <TrendingUp className="w-3 h-3 text-emerald-400" />
    ) : (
      <TrendingDown className="w-3 h-3 text-red-400" />
    );
  };

  const getSentimentColor = (sentiment: string) => {
    return sentiment === "positive" ? "text-emerald-400" : "text-red-400";
  };

  return (
    <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-neutral-900 dark:text-white text-xl font-bold flex items-center">
            <Star className="w-5 h-5 mr-2 text-blue-400" />
            Market News
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Latest updates for your stocks
          </p>
        </div>
        <div className="text-right">
          <div className="text-neutral-900 dark:text-white text-sm font-medium">
            {filteredNews.length} articles
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs">
            Updated 2h ago
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSelectedFilter(filter.key)}
            className={classNames(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              selectedFilter === filter.key
                ? "bg-pink-600 text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-300"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              {/* Left side - News content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    {news.logo}
                  </div>
                  <span className="text-neutral-600 dark:text-neutral-400 text-xs font-medium">
                    {news.stockSymbol}
                  </span>
                  <span className="text-neutral-500 text-xs">•</span>
                  <span className="text-neutral-600 dark:text-neutral-400 text-xs">
                    {news.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getSentimentIcon(news.sentiment)}
                    <span
                      className={classNames(
                        "text-xs font-medium",
                        getSentimentColor(news.sentiment)
                      )}
                    >
                      {news.sentiment}
                    </span>
                  </div>
                </div>

                <h3 className="text-neutral-900 dark:text-white font-semibold text-sm mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-colors">
                  {news.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 text-xs mb-3 line-clamp-2">
                  {news.summary}
                </p>

                <div className="flex items-center space-x-4 text-xs text-neutral-500 dark:text-neutral-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{news.publishedAt}</span>
                  </div>
                  <span>{news.readTime}</span>
                  <span className="text-neutral-600">•</span>
                  <span>{news.source}</span>
                </div>
              </div>

              {/* Right side - External link */}
              <div className="ml-4 flex-shrink-0">
                <button className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors opacity-0 group-hover:opacity-100">
                  <ExternalLink className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <button className="w-full text-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 text-sm font-medium transition-colors">
          View all market news →
        </button>
      </div>
    </div>
  );
}
