import React, { useState, useEffect } from "react";
import Dashnavcard from "../components/ui/dashnavcard";
import { ChartAreaInteractive101 } from "../components/ui/dashchart";
import { ChartRadialSimple } from "../components/ui/piechat";
import StockStack from "../components/ui/stockstack";
export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="-mt-2">
        <Dashnavcard />
        <div className="flex gap-6 mb-6">
          <div className="w-1/3">
            <ChartRadialSimple />
          </div>
          <div className="flex-1">
            <div className="w-full">
              <ChartAreaInteractive101 />
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="w-1/3">
            {/* Empty space to align with radial chart */}
          </div>
          <div className="flex-1">
            <StockStack />
          </div>
        </div>
      </div>
    </div>
  );
};
