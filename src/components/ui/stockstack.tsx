import { TrendingUp, TrendingDown } from "lucide-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Mock data for user's stock holdings
const userHoldings = [
  {
    symbol: "TSLA",
    company: "Tesla Inc.",
    shares: 25,
    investedAmount: 20000.0,
    currentPrice: 801.0,
    currentValue: 20025.0,
    profitLoss: 25.0,
    percentageChange: 0.13,
    isPositive: true,
    logo: "🚗",
    sector: "Automotive",
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    shares: 100,
    investedAmount: 18000.0,
    currentPrice: 185.5,
    currentValue: 18550.0,
    profitLoss: 550.0,
    percentageChange: 3.06,
    isPositive: true,
    logo: "🍎",
    sector: "Technology",
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corp.",
    shares: 50,
    investedAmount: 20000.0,
    currentPrice: 420.75,
    currentValue: 21037.5,
    profitLoss: 1037.5,
    percentageChange: 5.19,
    isPositive: true,
    logo: "🪟",
    sector: "Technology",
  },
  {
    symbol: "GOOGL",
    company: "Alphabet Inc.",
    shares: 20,
    investedAmount: 25000.0,
    currentPrice: 1200.0,
    currentValue: 24000.0,
    profitLoss: -1000.0,
    percentageChange: -4.0,
    isPositive: false,
    logo: "🔍",
    sector: "Technology",
  },
  {
    symbol: "AMZN",
    company: "Amazon.com Inc.",
    shares: 15,
    investedAmount: 15000.0,
    currentPrice: 950.0,
    currentValue: 14250.0,
    profitLoss: -750.0,
    percentageChange: -5.0,
    isPositive: false,
    logo: "📦",
    sector: "E-commerce",
  },
];

export default function StockStack() {
  const totalInvested = userHoldings.reduce(
    (sum, stock) => sum + stock.investedAmount,
    0
  );
  const totalCurrentValue = userHoldings.reduce(
    (sum, stock) => sum + stock.currentValue,
    0
  );
  const totalProfitLoss = totalCurrentValue - totalInvested;
  const totalPercentageChange = (totalProfitLoss / totalInvested) * 100;

  return (
    <div className="bg-black border border-neutral-800 rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Your Holdings</h2>
          <p className="text-neutral-400 text-sm">Portfolio overview</p>
        </div>
        <div className="text-right">
          <div className="text-white text-lg font-bold">
            £
            {totalCurrentValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div
            className={classNames(
              totalProfitLoss >= 0 ? "text-emerald-400" : "text-red-400",
              "text-sm font-medium flex items-center justify-end"
            )}
          >
            {totalProfitLoss >= 0 ? "+" : ""}£
            {totalProfitLoss.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <span className="ml-1">
              ({totalProfitLoss >= 0 ? "+" : ""}
              {totalPercentageChange.toFixed(2)}%)
            </span>
            {totalProfitLoss >= 0 ? (
              <TrendingUp className="w-4 h-4 ml-1" />
            ) : (
              <TrendingDown className="w-4 h-4 ml-1" />
            )}
          </div>
        </div>
      </div>

      {/* Stock Holdings List */}
      <div className="space-y-4">
        {userHoldings.map((stock) => (
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
                    {stock.symbol} • {stock.shares} shares • {stock.sector}
                  </div>
                </div>
              </div>

              {/* Right side - Financial info */}
              <div className="text-right">
                <div className="text-white font-bold">
                  £
                  {stock.currentValue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-neutral-400 text-sm">
                  Invested: £
                  {stock.investedAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div
                  className={classNames(
                    stock.isPositive ? "text-emerald-400" : "text-red-400",
                    "text-sm font-medium flex items-center justify-end"
                  )}
                >
                  {stock.isPositive ? "+" : ""}£
                  {stock.profitLoss.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
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

            {/* Progress bar showing profit/loss */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Invested: £{stock.investedAmount.toLocaleString()}</span>
                <span>Current: £{stock.currentValue.toLocaleString()}</span>
              </div>
              <div className="w-full bg-neutral-700 rounded-full h-2">
                <div
                  className={classNames(
                    stock.isPositive ? "bg-emerald-500" : "bg-red-500",
                    "h-2 rounded-full transition-all duration-300"
                  )}
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        (stock.currentValue / stock.investedAmount) * 100
                      )
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-neutral-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-neutral-400 text-sm">Total Invested</div>
            <div className="text-white font-bold">
              £
              {totalInvested.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div>
            <div className="text-neutral-400 text-sm">Current Value</div>
            <div className="text-white font-bold">
              £
              {totalCurrentValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div>
            <div className="text-neutral-400 text-sm">Total P&L</div>
            <div
              className={classNames(
                totalProfitLoss >= 0 ? "text-emerald-400" : "text-red-400",
                "font-bold"
              )}
            >
              {totalProfitLoss >= 0 ? "+" : ""}£
              {totalProfitLoss.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
