// 'use client';

import { AreaChart, BarChart, CategoryBar } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 24",
    Investors: 4250,
    Returns: 4680,
  },
  {
    date: "Feb 24",
    Investors: 4890,
    Returns: 5420,
  },
  {
    date: "Mar 24",
    Investors: 5320,
    Returns: 5950,
  },
  {
    date: "Apr 24",
    Investors: 5780,
    Returns: 6580,
  },
  {
    date: "May 24",
    Investors: 6240,
    Returns: 7150,
  },
  {
    date: "Jun 24",
    Investors: 6850,
    Returns: 7890,
  },
  {
    date: "Jul 24",
    Investors: 7420,
    Returns: 8640,
  },
  {
    date: "Aug 24",
    Investors: 7980,
    Returns: 9350,
  },
  {
    date: "Sep 24",
    Investors: 8650,
    Returns: 10180,
  },
  {
    date: "Oct 24",
    Investors: 9320,
    Returns: 11040,
  },
  {
    date: "Nov 24",
    Investors: 10150,
    Returns: 12150,
  },
  {
    date: "Dec 24",
    Investors: 11240,
    Returns: 13580,
  },
];

export default function Example() {
  return (
    <>
      <div className="mx-auto w-full max-w-4xl px-3 py-20 sm:text-center">
        <span className="block bg-gradient-to-b from-gray-700 to-gray-400 bg-clip-text text-lg font-semibold text-transparent dark:from-blue-200 dark:to-blue-400 sm:text-xl">
          Analytics
        </span>
        <h2
          id="features-title"
          className="mt-2 inline-block bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text py-2 text-4xl font-bold tracking-tighter text-transparent dark:from-gray-50 dark:to-gray-300 sm:text-6xl"
        >
          Insights made for everyone
        </h2>
        <div className="group relative mt-12 h-[30rem] transition">
          <div className="absolute top-12 h-80 w-full scale-90 transform-gpu rounded-lg bg-gray-100 dark:bg-gray-950 shadow-md shadow-black/5 ring-1 ring-black/5 dark:ring-gray-700 transition-all delay-75 duration-300 ease-&lsqb;cubic-bezier(0.34,1.56,0.64,1)&rsqb; group-hover:top-52 group-hover:rotate-6">
            <div className="relative flex size-full items-center">
              <div className="absolute left-2.5 top-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <div className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <AreaChart
                className="mx-auto h-60 px-3 sm:px-10 [&_.recharts-text]:fill-gray-800 dark:[&_.recharts-text]:fill-gray-100 [&_.recharts-cartesian-axis-tick-value]:fill-gray-700 dark:[&_.recharts-cartesian-axis-tick-value]:fill-gray-200"
                data={chartdata}
                index="date"
                categories={["Investors", "Returns"]}
                colors={["blue", "emerald"]}
              />
            </div>
          </div>
          <div className="delay-50 absolute top-6 h-80 w-full scale-95 transform-gpu rounded-lg bg-gray-100 dark:bg-gray-950 shadow-md shadow-black/5 ring-1 ring-black/5 dark:ring-gray-700 transition-all duration-300 ease-&lsqb;cubic-bezier(0.34,1.56,0.64,1)&rsqb; group-hover:top-16 group-hover:-rotate-3">
            <div className="relative flex size-full items-end">
              <div className="absolute left-2.5 top-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <div className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <CategoryBar
                values={[30, 40, 30]}
                colors={["emerald", "blue", "amber"]}
                className="mb-12 w-full px-3 sm:px-10 [&_.tremor-CategoryBar-label]:text-gray-800 dark:[&_.tremor-CategoryBar-label]:text-gray-100"
              />
            </div>
          </div>
          <div className="absolute top-0 flex h-80 w-full transform-gpu items-center rounded-lg bg-gray-100 dark:bg-gray-950 shadow-xl shadow-black/5 ring-1 ring-black/5 dark:ring-gray-700 transition-all duration-300 ease-&lsqb;cubic-bezier(0.34,1.56,0.64,1)&rsqb; group-hover:-top-6 group-hover:rotate-3 group-hover:scale-95">
            <div className="relative flex size-full items-center">
              <div className="absolute left-2.5 top-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <div className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-gray-300 shadow-inner dark:bg-gray-500" />
              <BarChart
                className="mx-auto h-60 px-3 sm:px-10 [&_.recharts-text]:fill-gray-800 dark:[&_.recharts-text]:fill-gray-100 [&_.recharts-cartesian-axis-tick-value]:fill-gray-700 dark:[&_.recharts-cartesian-axis-tick-value]:fill-gray-200"
                data={chartdata}
                showTooltip={true}
                index="date"
                categories={["Investors", "Returns"]}
                colors={["blue", "emerald"]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
