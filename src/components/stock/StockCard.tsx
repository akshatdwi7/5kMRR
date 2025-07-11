import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Stock } from '../../types';
import { Card } from '../ui/Card';
import { useNavigate } from 'react-router-dom';

interface StockCardProps {
  stock: Stock;
}

export const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const navigate = useNavigate();
  const isPositive = stock.change > 0;

  const formatNumber = (num: number) => {
    if (num >= 1e12) return '₹' + (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return '₹' + (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e7) return '₹' + (num / 1e7).toFixed(1) + 'Cr';
    if (num >= 1e5) return '₹' + (num / 1e5).toFixed(1) + 'L';
    return '₹' + num.toLocaleString('en-IN');
  };

  const formatVolume = (num: number) => {
    if (num >= 1e7) return (num / 1e7).toFixed(1) + 'Cr';
    if (num >= 1e5) return (num / 1e5).toFixed(1) + 'L';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full p-3 sm:p-4"
        onClick={() => navigate(`/stock/${stock.symbol}`)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex flex-col space-y-1 mb-2">
              <h3 className="text-sm sm:text-lg font-bold text-gray-900">{stock.symbol}</h3>
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                stock.sector === 'Technology' ? 'bg-blue-100 text-blue-700' :
                stock.sector === 'Financials' ? 'bg-green-100 text-green-700' :
                stock.sector === 'Energy' ? 'bg-orange-100 text-orange-700' :
                stock.sector === 'Consumer Goods' ? 'bg-purple-100 text-purple-700' :
                'bg-gray-100 text-gray-700'
              } self-start`}>
                {stock.sector}
              </span>
            </div>
            <p className="text-xs text-gray-600 truncate pr-2 leading-tight">{stock.name}</p>
          </div>
          <div className="text-right">
            <div className="text-sm sm:text-xl font-bold text-gray-900">₹{stock.price.toFixed(2)}</div>
            <div className={`flex items-center justify-end space-x-1 text-xs font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              <span>{isPositive ? '+' : ''}₹{Math.abs(stock.change).toFixed(2)}</span>
              <span>({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="flex items-center space-x-2 mb-1">
              <DollarSign className="h-3 w-3 text-blue-600" />
              <span className="text-xs text-gray-600">Market Cap</span>
            </div>
            <div className="text-xs font-semibold text-gray-900">{formatNumber(stock.marketCap)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="flex items-center space-x-2 mb-1">
              <BarChart3 className="h-3 w-3 text-purple-600" />
              <span className="text-xs text-gray-600">P/E Ratio</span>
            </div>
            <div className="text-xs font-semibold text-gray-900">{stock.pe.toFixed(1)}</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Volume:</span>
            <span className="text-gray-900 font-medium">{formatVolume(stock.volume)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Beta:</span>
            <span className="text-gray-900 font-medium">{stock.beta.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">EPS:</span>
            <span className="text-gray-900 font-medium">₹{stock.eps.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Dividend:</span>
            <span className="text-gray-900 font-medium">
              {stock.dividend > 0 ? `₹${stock.dividend.toFixed(2)}` : 'N/A'}
            </span>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Performance</span>
            <div className={`flex items-center space-x-1 text-xs font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isPositive ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span>{isPositive ? 'Bullish' : 'Bearish'}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};