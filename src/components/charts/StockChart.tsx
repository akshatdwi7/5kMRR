import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PricePoint } from '../../types';

interface StockChartProps {
  data: PricePoint[];
  height?: number;
}

export const StockChart: React.FC<StockChartProps> = ({ data, height = 400 }) => {
  const formatTooltip = (value: any, name: string) => {
    if (name === 'close') {
      return [`$${value.toFixed(2)}`, 'Price'];
    }
    return [value, name];
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="date" 
          stroke="#9CA3AF"
          fontSize={12}
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis 
          stroke="#9CA3AF"
          fontSize={12}
          tickFormatter={(value) => `$${value.toFixed(0)}`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937', 
            border: '1px solid #374151',
            borderRadius: '6px',
            color: '#F3F4F6'
          }}
          formatter={formatTooltip}
        />
        <Line 
          type="monotone" 
          dataKey="close" 
          stroke="#3B82F6" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};