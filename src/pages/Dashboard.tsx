import React, { useState, useEffect } from "react";

import { ChartAreaInteractive101 } from "../components/ui/dashchart";
import { ChartRadialSimple } from "../components/ui/piechat";
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <ChartAreaInteractive101 />
        <ChartRadialSimple />
      </div>
    </div>
  );
};
