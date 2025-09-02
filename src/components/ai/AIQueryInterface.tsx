import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Crown,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";
import { aiService, AIAnalysisResponse } from "../../services/aiService";

interface AIQueryInterfaceProps {
  stockSymbol?: string;
  stockName?: string;
  onUpgrade?: () => void;
}

export const AIQueryInterface: React.FC<AIQueryInterfaceProps> = ({
  stockSymbol,
  stockName,
  onUpgrade,
}) => {
  // Demo mode - simulate user profile
  const profile = {
    subscription_tier: "free" as const,
    ai_queries_used: 3,
    ai_queries_limit: 10,
  };

  const canMakeAIQuery = () =>
    profile.ai_queries_used < profile.ai_queries_limit;
  const incrementAIQuery = () => console.log("Demo: AI query counted");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<AIAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    if (!canMakeAIQuery()) {
      setError(
        "You have reached your daily query limit. Upgrade to Pro for unlimited queries."
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await aiService.analyzeStock({
        stockSymbol,
        query: stockSymbol ? `${query} for ${stockSymbol}` : query,
      });

      setResponse(result);
      await incrementAIQuery();
      setQuery("");
    } catch (err) {
      setError("Failed to get AI analysis. Please try again.");
      console.error("AI query error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQueries = stockSymbol
    ? [
        `Should I buy ${stockSymbol}?`,
        `What's the target price for ${stockSymbol}?`,
        `Technical analysis of ${stockSymbol}`,
        `Compare ${stockSymbol} with peers`,
      ]
    : [
        "Best stocks to buy today",
        "Market outlook for next month",
        "Top IT stocks analysis",
        "Banking sector overview",
      ];

  // Show simplified interface if no profile (not authenticated)
  if (!profile) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            AI Stock Analysis
          </h3>
          <p className="text-gray-600 mb-4">
            Sign in to ask AI about any stock
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Sign In to Continue
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Query Interface */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 p-4 sm:p-6 mx-4 sm:mx-0">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <MessageCircle className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
              AI Stock Analysis
              {stockSymbol && (
                <span className="text-blue-600"> - {stockSymbol}</span>
              )}
            </h3>
            <p className="text-xs text-gray-600">
              {profile.subscription_tier === "free"
                ? `${profile.ai_queries_used}/${profile.ai_queries_limit} queries used today`
                : "Unlimited queries"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              placeholder={
                stockSymbol
                  ? `Ask anything about ${stockSymbol}...`
                  : "Ask about any stock or market trend..."
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-blue-200 focus:border-blue-500 text-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!query.trim() || isLoading || !canMakeAIQuery()}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              size="sm"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </Button>
          </div>

          {/* Suggested Queries */}
          <div className="flex flex-wrap gap-1">
            {suggestedQueries.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 sm:mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mx-4 sm:mx-0"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-red-700 text-xs">{error}</span>
            </div>
            {error.includes("query limit") && onUpgrade && (
              <Button
                size="sm"
                onClick={onUpgrade}
                className="w-full sm:w-auto sm:ml-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-xs px-3"
              >
                <Crown className="h-3 w-3 mr-1" />
                Upgrade
              </Button>
            )}
          </motion.div>
        )}
      </Card>

      {/* AI Response */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-white border-gray-200 p-4 sm:p-6 mx-4 sm:mx-0">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                <div className="p-1.5 bg-purple-100 rounded-lg">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
                    AI Analysis
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs text-gray-600">
                    <span>Confidence: {response.confidence}%</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Sources: {response.sources.join(", ")}</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-sm sm:text-base">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed text-xs sm:text-sm">
                  {response.response}
                </div>
              </div>

              {/* Recommendations */}
              {response.recommendations && (
                <div className="mt-4 sm:mt-6 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-xs sm:text-base font-semibold text-gray-900">
                      AI Recommendation
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-xs">
                    <div>
                      <span className="text-gray-600">Action:</span>
                      <div
                        className={`font-semibold ${
                          response.recommendations.action === "BUY"
                            ? "text-green-600"
                            : response.recommendations.action === "SELL"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        {response.recommendations.action}
                      </div>
                    </div>
                    {response.recommendations.targetPrice && (
                      <div>
                        <span className="text-gray-600">Target Price:</span>
                        <div className="font-semibold text-gray-900">
                          ₹{response.recommendations.targetPrice}
                        </div>
                      </div>
                    )}
                    {response.recommendations.stopLoss && (
                      <div>
                        <span className="text-gray-600">Stop Loss:</span>
                        <div className="font-semibold text-gray-900">
                          ₹{response.recommendations.stopLoss}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-3 text-xs text-gray-600">
                    <strong>Reasoning:</strong>{" "}
                    {response.recommendations.reasoning}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
