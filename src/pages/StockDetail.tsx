import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MessageCircle, Star } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StockChart } from '../components/charts/StockChart';
import { Stock, StockData } from '../types';
import { stockApi } from '../services/stockApi';

export const StockDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [stock, setStock] = useState<Stock | null>(null);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      if (!symbol) return;

      try {
        const [stockInfo, data] = await Promise.all([
          stockApi.getStock(symbol),
          stockApi.getStockData(symbol)
        ]);

        if (stockInfo) setStock(stockInfo);
        if (data) setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!stock || !stockData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-300">Stock not found</h2>
        <p className="text-gray-400 mt-2">The stock symbol "{symbol}" was not found.</p>
      </div>
    );
  }

  const isPositive = stock.change > 0;
  const formatNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{stock.name}</h1>
          <p className="text-gray-400 text-lg">{stock.symbol} • {stock.sector}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Star className="h-4 w-4 mr-2" />
            Add to Watchlist
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Ask AI
          </Button>
        </div>
      </div>

      {/* Price and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-4xl font-bold text-white">${stock.price.toFixed(2)}</div>
                  <div className={`flex items-center space-x-2 text-lg ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                    <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)</span>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-400">
                  <div>Volume: {formatNumber(stock.volume)}</div>
                  <div>Market Cap: ${formatNumber(stock.marketCap)}</div>
                </div>
              </div>
            </div>
            <StockChart data={stockData.prices} height={400} />
          </Card>
        </div>

        <div className="space-y-6">
          {/* Key Metrics */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">P/E Ratio</span>
                <span className="text-white font-medium">{stock.pe.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">EPS</span>
                <span className="text-white font-medium">${stock.eps.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Beta</span>
                <span className="text-white font-medium">{stock.beta.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Dividend</span>
                <span className="text-white font-medium">{stock.dividend > 0 ? `$${stock.dividend.toFixed(2)}` : 'N/A'}</span>
              </div>
            </div>
          </Card>

          {/* Fundamentals */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Fundamentals</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Revenue</span>
                <span className="text-white font-medium">${formatNumber(stockData.fundamentals.revenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Net Income</span>
                <span className="text-white font-medium">${formatNumber(stockData.fundamentals.netIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ROE</span>
                <span className="text-white font-medium">{(stockData.fundamentals.roe * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ROA</span>
                <span className="text-white font-medium">{(stockData.fundamentals.roa * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Ratio</span>
                <span className="text-white font-medium">{stockData.fundamentals.currentRatio.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* News */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Recent News</h3>
        <div className="space-y-4">
          {stockData.news.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-gray-700 pb-4 last:border-b-0"
            >
              <h4 className="text-white font-medium mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm mb-2">{item.summary}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{item.source}</span>
                <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};