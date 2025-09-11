import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/ui/breadcrumb";
import { TrendingUp, TrendingDown, Search } from "lucide-react";

const Sector: React.FC = () => {
  const { sectorName } = useParams<{ sectorName: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");

  // Decode the sector name from URL
  const decodedSectorName = sectorName
    ? decodeURIComponent(sectorName)
    : "Unknown Sector";

  // Mock data for sector details
  const sectorData = {
    name: decodedSectorName,
    description: `This sector represents companies involved in ${decodedSectorName.toLowerCase()} within the Indian stock market.`,
    totalCompanies: 45,
    marketCap: "₹2.5L Cr",
    avgChange: "+2.3%",
    topGainers: [
      { name: "Company A", symbol: "COMPA", change: "+12.5%", price: "₹1,250" },
      { name: "Company B", symbol: "COMPB", change: "+8.7%", price: "₹850" },
      { name: "Company C", symbol: "COMPC", change: "+6.2%", price: "₹420" },
    ],
    topLosers: [
      { name: "Company D", symbol: "COMPD", change: "-5.8%", price: "₹320" },
      { name: "Company E", symbol: "COMPE", change: "-4.2%", price: "₹180" },
      { name: "Company F", symbol: "COMPF", change: "-3.1%", price: "₹95" },
    ],
    companies: [
      {
        name: "Reliance Industries",
        symbol: "RELIANCE",
        price: "₹2,450",
        change: "+2.1%",
        marketCap: "₹16.5L Cr",
        volume: "2.5M",
      },
      {
        name: "TCS",
        symbol: "TCS",
        price: "₹3,850",
        change: "+1.8%",
        marketCap: "₹14.2L Cr",
        volume: "1.8M",
      },
      {
        name: "HDFC Bank",
        symbol: "HDFCBANK",
        price: "₹1,650",
        change: "+0.9%",
        marketCap: "₹12.8L Cr",
        volume: "3.2M",
      },
      {
        name: "Infosys",
        symbol: "INFY",
        price: "₹1,420",
        change: "+1.5%",
        marketCap: "₹5.9L Cr",
        volume: "2.1M",
      },
      {
        name: "ICICI Bank",
        symbol: "ICICIBANK",
        price: "₹980",
        change: "+2.3%",
        marketCap: "₹6.7L Cr",
        volume: "4.1M",
      },
      {
        name: "Bharti Airtel",
        symbol: "BHARTIARTL",
        price: "₹1,180",
        change: "+0.7%",
        marketCap: "₹6.5L Cr",
        volume: "1.9M",
      },
    ],
  };

  const filteredCompanies = sectorData.companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case "marketCap":
        return (
          parseFloat(b.marketCap.replace(/[₹,L Cr]/g, "")) -
          parseFloat(a.marketCap.replace(/[₹,L Cr]/g, ""))
        );
      case "change":
        return (
          parseFloat(b.change.replace(/[+%]/g, "")) -
          parseFloat(a.change.replace(/[+%]/g, ""))
        );
      case "price":
        return (
          parseFloat(b.price.replace(/[₹,]/g, "")) -
          parseFloat(a.price.replace(/[₹,]/g, ""))
        );
      default:
        return 0;
    }
  });

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Screener", path: "/screener" },
    { label: sectorData.name, isActive: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Breadcrumb */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Sector Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {sectorData.name}
              </h1>
              <p className="text-gray-600 mt-2">{sectorData.description}</p>
            </div>
          </div>

          {/* Sector Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">
                Total Companies
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {sectorData.totalCompanies}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600 font-medium">
                Market Cap
              </div>
              <div className="text-2xl font-bold text-green-900">
                {sectorData.marketCap}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-purple-600 font-medium">
                Avg Change
              </div>
              <div className="text-2xl font-bold text-purple-900">
                {sectorData.avgChange}
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-orange-600 font-medium">
                Sector Performance
              </div>
              <div className="text-2xl font-bold text-orange-900">+2.3%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Gainers & Losers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Gainers */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Top Gainers
              </h3>
            </div>
            <div className="space-y-3">
              {sectorData.topGainers.map((stock, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {stock.name}
                    </div>
                    <div className="text-sm text-gray-600">{stock.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      {stock.change}
                    </div>
                    <div className="text-sm text-gray-600">{stock.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Losers */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Top Losers
              </h3>
            </div>
            <div className="space-y-3">
              {sectorData.topLosers.map((stock, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {stock.name}
                    </div>
                    <div className="text-sm text-gray-600">{stock.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">
                      {stock.change}
                    </div>
                    <div className="text-sm text-gray-600">{stock.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                All Companies
              </h3>
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="marketCap">Market Cap</option>
                  <option value="change">Change %</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Cap
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCompanies.map((company, index) => (
                  <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {company.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {company.symbol}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {company.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          company.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {company.change}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {company.marketCap}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {company.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sector;
