import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, SlidersHorizontal, Download, Star } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { StockCard } from '../components/stock/StockCard';
import { Stock, ScreenerFilter } from '../types';
import { stockApi } from '../services/stockApi';

export const Screener: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [filters, setFilters] = useState<ScreenerFilter>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const allStocks = await stockApi.getAllStocks();
        setStocks(allStocks);
        setFilteredStocks(allStocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    let filtered = stocks;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(stock =>
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price filters
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(stock => stock.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(stock => stock.price <= filters.maxPrice!);
    }

    // Apply market cap filters
    if (filters.minMarketCap !== undefined) {
      filtered = filtered.filter(stock => stock.marketCap >= filters.minMarketCap!);
    }
    if (filters.maxMarketCap !== undefined) {
      filtered = filtered.filter(stock => stock.marketCap <= filters.maxMarketCap!);
    }

    // Apply P/E filters
    if (filters.minPE !== undefined) {
      filtered = filtered.filter(stock => stock.pe >= filters.minPE!);
    }
    if (filters.maxPE !== undefined) {
      filtered = filtered.filter(stock => stock.pe <= filters.maxPE!);
    }

    // Apply sector filter
    if (filters.sector) {
      filtered = filtered.filter(stock => stock.sector === filters.sector);
    }

    // Apply volume filter
    if (filters.minVolume !== undefined) {
      filtered = filtered.filter(stock => stock.volume >= filters.minVolume!);
    }

    setFilteredStocks(filtered);
  }, [stocks, filters, searchQuery]);

  const updateFilter = (key: keyof ScreenerFilter, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const presetFilters = [
    {
      name: 'Large Cap',
      filters: { minMarketCap: 1e12 },
      description: 'Market cap > ₹1T'
    },
    {
      name: 'High Dividend',
      filters: { minPE: 0, maxPE: 25 },
      description: 'P/E < 25'
    },
    {
      name: 'High Volume',
      filters: { minVolume: 5000000 },
      description: 'Volume > 50L'
    },
    {
      name: 'Tech Stocks',
      filters: { sector: 'Technology' },
      description: 'Technology sector'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 px-4 sm:px-0 pt-4 sm:pt-0">
        <div>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Stock Screener
          </h1>
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-base">Find stocks that match your investment criteria</p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
          <div className="text-xs sm:text-sm text-gray-400 bg-gray-800 px-3 sm:px-4 py-2 rounded-lg flex-1 sm:flex-none text-center">
            {filteredStocks.length} of {stocks.length} stocks
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <Card className="bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600 mx-4 sm:mx-0 p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-sm sm:text-lg font-semibold text-white flex items-center">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-2" />
            Quick Filters
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {presetFilters.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="justify-start text-left h-auto py-2 px-2 sm:px-3"
              onClick={() => setFilters(preset.filters)}
            >
              <div>
                <div className="text-xs sm:text-base font-medium">{preset.name}</div>
                <div className="text-xs text-gray-400 truncate">{preset.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 mx-4 sm:mx-0 p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search stocks by symbol or company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-4 w-4" />}
                className="bg-gray-700/50 border-gray-600 focus:border-blue-500 text-sm"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 sm:space-x-2 flex-1 sm:flex-none"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm">Advanced</span>
              </Button>
              <Button onClick={clearFilters} variant="outline" size="sm" className="flex-1 sm:flex-none">
                <span className="text-sm">Clear All</span>
              </Button>
            </div>
          </div>

          {/* Basic Filters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">Min Price (₹)</label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', parseFloat(e.target.value))}
                className="bg-gray-700/50 border-gray-600 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">Max Price (₹)</label>
              <Input
                type="number"
                placeholder="10000"
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', parseFloat(e.target.value))}
                className="bg-gray-700/50 border-gray-600 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">Min P/E</label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minPE || ''}
                onChange={(e) => updateFilter('minPE', parseFloat(e.target.value))}
                className="bg-gray-700/50 border-gray-600 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">Max P/E</label>
              <Input
                type="number"
                placeholder="100"
                value={filters.maxPE || ''}
                onChange={(e) => updateFilter('maxPE', parseFloat(e.target.value))}
                className="bg-gray-700/50 border-gray-600 text-sm"
              />
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 sm:space-y-4 border-t border-gray-600 pt-3 sm:pt-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">Sector</label>
                  <select
                    value={filters.sector || ''}
                    onChange={(e) => updateFilter('sector', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 text-white focus:border-blue-500 text-sm"
                  >
                    <option value="">All Sectors</option>
                    <option value="Technology">Technology</option>
                    <option value="Financials">Financials</option>
                    <option value="Energy">Energy</option>
                    <option value="Consumer Goods">Consumer Goods</option>
                    <option value="Consumer Discretionary">Consumer Discretionary</option>
                    <option value="Telecom">Telecom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">Market Cap Range</label>
                  <select
                    value={filters.minMarketCap ? (filters.minMarketCap >= 1e12 ? 'large' : filters.minMarketCap >= 1e9 ? 'mid' : 'small') : ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 'large') {
                        updateFilter('minMarketCap', 1e12);
                        updateFilter('maxMarketCap', undefined);
                      } else if (value === 'mid') {
                        updateFilter('minMarketCap', 1e9);
                        updateFilter('maxMarketCap', 1e12);
                      } else if (value === 'small') {
                        updateFilter('minMarketCap', 0);
                        updateFilter('maxMarketCap', 1e9);
                      } else {
                        updateFilter('minMarketCap', undefined);
                        updateFilter('maxMarketCap', undefined);
                      }
                    }}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 text-white focus:border-blue-500 text-sm"
                  >
                    <option value="">All Caps</option>
                    <option value="large">Large Cap ({'>'}₹1T)</option>
                    <option value="mid">Mid Cap (₹1B-₹1T)</option>
                    <option value="small">Small Cap ({'<'}₹1B)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Min Volume</label>
                <Input
                  type="number"
                  placeholder="1000000"
                  value={filters.minVolume || ''}
                  onChange={(e) => updateFilter('minVolume', parseFloat(e.target.value))}
                  className="bg-gray-700/50 border-gray-600 text-sm"
                />
              </div>
            </motion.div>
          )}
        </div>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-4 sm:px-0">
        {filteredStocks.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <StockCard stock={stock} />
          </motion.div>
        ))}
      </div>

      {filteredStocks.length === 0 && (
        <Card className="text-center py-8 sm:py-12 lg:py-16 mx-4 sm:mx-0 p-6">
          <Filter className="h-10 w-10 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base sm:text-xl font-semibold text-gray-300 mb-2">No stocks match your criteria</h3>
          <p className="text-xs sm:text-base text-gray-400 mb-4 sm:mb-6 px-4">Try adjusting your filters or search terms to find more results</p>
          <Button onClick={clearFilters} variant="outline">
            Clear All Filters
          </Button>
        </Card>
      )}
    </div>
  );
};