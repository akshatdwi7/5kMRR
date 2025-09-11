"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

export const description = "A simple area chart";

// Different datasets for different time periods
const chartDataSets = {
  "1M": [
    { month: "Week 1", desktop: 186 },
    { month: "Week 2", desktop: 305 },
    { month: "Week 3", desktop: 237 },
    { month: "Week 4", desktop: 273 },
  ],
  "3M": [
    { month: "Jan", desktop: 186 },
    { month: "Feb", desktop: 305 },
    { month: "Mar", desktop: 237 },
  ],
  "6M": [
    { month: "Jan", desktop: 186 },
    { month: "Feb", desktop: 305 },
    { month: "Mar", desktop: 237 },
    { month: "Apr", desktop: 173 },
    { month: "May", desktop: 209 },
    { month: "Jun", desktop: 214 },
  ],
  "1Y": [
    { month: "Jan", desktop: 186 },
    { month: "Feb", desktop: 305 },
    { month: "Mar", desktop: 237 },
    { month: "Apr", desktop: 173 },
    { month: "May", desktop: 209 },
    { month: "Jun", desktop: 214 },
    { month: "Jul", desktop: 198 },
    { month: "Aug", desktop: 245 },
    { month: "Sep", desktop: 267 },
    { month: "Oct", desktop: 189 },
    { month: "Nov", desktop: 223 },
    { month: "Dec", desktop: 256 },
  ],
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const timePeriods = [
  { key: "1M", label: "1M" },
  { key: "3M", label: "3M" },
  { key: "6M", label: "6M" },
  { key: "1Y", label: "1Y" },
];

export function NiftyChartsDash() {
  const [selectedPeriod, setSelectedPeriod] = useState("6M");

  const currentData =
    chartDataSets[selectedPeriod as keyof typeof chartDataSets];

  const getPeriodDescription = (period: string) => {
    switch (period) {
      case "1M":
        return "Showing data for the last month";
      case "3M":
        return "Showing data for the last 3 months";
      case "6M":
        return "Showing data for the last 6 months";
      case "1Y":
        return "Showing data for the last year";
      default:
        return "Showing data for the last 6 months";
    }
  };

  const getPeriodRange = (period: string) => {
    switch (period) {
      case "1M":
        return "Last 4 weeks";
      case "3M":
        return "Jan - Mar 2024";
      case "6M":
        return "Jan - Jun 2024";
      case "1Y":
        return "Jan - Dec 2024";
      default:
        return "Jan - Jun 2024";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>
              {getPeriodDescription(selectedPeriod)}
            </CardDescription>
          </div>
          {/* Time Period Selector */}
          <div className="flex gap-1">
            {timePeriods.map((period) => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedPeriod === period.key
                    ? "bg-pink-600 text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={currentData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this{" "}
              {selectedPeriod === "1M"
                ? "month"
                : selectedPeriod === "3M"
                ? "quarter"
                : selectedPeriod === "6M"
                ? "6 months"
                : "year"}{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {getPeriodRange(selectedPeriod)}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
