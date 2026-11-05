import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { FiChevronDown } from "react-icons/fi";

// Outline chart/document icon matching reference image exactly
const ChartIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="6" width="14" height="15" rx="3" />
    <path d="M7 6V4a3 3 0 0 1 6 0v2" />
    <path d="M9 2h9a3 3 0 0 1 3 3v11" />
  </svg>
);

// Precise 7-Day data matching reference image visually
const chartData7Days = [
  { date: "23 Oct", occupancy: 24, revenue: 17000 },
  { date: "24 Oct", occupancy: 40, revenue: 24000 },
  { date: "25 Oct", occupancy: 46, revenue: 26500 },
  { date: "26 Oct", occupancy: 33, revenue: 20500 },
  { date: "27 Oct", occupancy: 47, revenue: 29500 },
  { date: "28 Oct", occupancy: 53, revenue: 27500 },
  { date: "29 Oct", occupancy: 60, revenue: 34500 },
];

const chartData30Days = [
  { date: "Week 1", occupancy: 42, revenue: 84000 },
  { date: "Week 2", occupancy: 56, revenue: 98000 },
  { date: "Week 3", occupancy: 60, revenue: 105000 },
  { date: "Week 4", occupancy: 66, revenue: 120000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111C35] text-white p-2.5 rounded-xl shadow-xl border border-[#1B2947] text-xs">
        <p className="font-bold text-[#F8FAFC] mb-1">{label}</p>
        <div className="flex items-center gap-2 text-[#93C5FD]">
          <span className="w-2 h-2 rounded-full bg-[#818CF8]"></span>
          <span>Occupancy: {payload[0]?.value}%</span>
        </div>
        <div className="flex items-center gap-2 text-[#FDBA74] mt-0.5">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
          <span>Revenue: ₹ {payload[1]?.value?.toLocaleString("en-IN")}</span>
        </div>
      </div>
    );
  }
  return null;
};

const OccupancyRevenueChart = () => {
  const [timeRange, setTimeRange] = useState("7days");
  const is7Days = timeRange === "7days";
  const data = is7Days ? chartData7Days : chartData30Days;
  const maxRevenue = is7Days ? 50000 : 150000;
  const revenueTicks = is7Days
    ? [0, 10000, 20000, 30000, 40000, 50000]
    : [0, 30000, 60000, 90000, 120000, 150000];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between h-full">
      {/* Header with Title, Center Legend & Right Dropdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        {/* Title with clean outline icon */}
        <div className="flex items-center gap-2.5">
          <ChartIcon className="w-5 h-5 text-[#0F172A] shrink-0" />
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0F172A] tracking-tight">
            Occupancy & Revenue Trend
          </h3>
        </div>

        {/* Center Legend & Dropdown */}
        <div className="flex items-center flex-wrap gap-4 sm:gap-6 text-xs font-semibold">
          {/* Occupancy Legend */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]"></span>
            <span className="text-[#0F172A] font-medium text-xs">Occupancy %</span>
          </div>

          {/* Revenue Legend */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
            <span className="text-[#0F172A] font-medium text-xs">Revenue (₹)</span>
          </div>

          {/* Time range switcher */}
          <div className="relative">
            <button
              onClick={() =>
                setTimeRange(timeRange === "7days" ? "30days" : "7days")
              }
              className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-[#E2E8F0] px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0F172A] transition-all shadow-2xs"
            >
              <span>{is7Days ? "Last 7 Days" : "Last 30 Days"}</span>
              <FiChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-[250px] sm:h-[270px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 15, right: 5, left: -5, bottom: 0 }}
          >
            {/* SVG Gradient Definition for Purple Pillars */}
            <defs>
              <linearGradient id="occupancyBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818CF8" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#C7D2FE" stopOpacity={0.35} />
              </linearGradient>
            </defs>

            {/* Dotted Grid Lines matching reference image */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />

            {/* X Axis: Crisp black font with axisLine and tick marks */}
            <XAxis
              dataKey="date"
              tickLine={{ stroke: "#CBD5E1", strokeWidth: 1 }}
              axisLine={{ stroke: "#CBD5E1", strokeWidth: 1 }}
              tick={{ fill: "#0F172A", fontSize: 11, fontWeight: 600 }}
              dy={4}
            />

            {/* Left Y Axis for Occupancy %: Crisp black font with axisLine and tick marks */}
            <YAxis
              yAxisId="left"
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(val) => `${val}%`}
              tickLine={{ stroke: "#CBD5E1", strokeWidth: 1 }}
              axisLine={{ stroke: "#CBD5E1", strokeWidth: 1 }}
              tick={{ fill: "#0F172A", fontSize: 11, fontWeight: 600 }}
              width={42}
            />

            {/* Right Y Axis for Revenue in ₹: Crisp black font with axisLine and tick marks */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, maxRevenue]}
              ticks={revenueTicks}
              tickFormatter={(val) => (val === 0 ? "0" : `${val / 1000}K`)}
              tickLine={{ stroke: "#CBD5E1", strokeWidth: 1 }}
              axisLine={{ stroke: "#CBD5E1", strokeWidth: 1 }}
              tick={{ fill: "#0F172A", fontSize: 11, fontWeight: 600 }}
              width={40}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Purple Pillars with Linear Gradient and Rounded Top */}
            <Bar
              yAxisId="left"
              dataKey="occupancy"
              fill="url(#occupancyBarGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />

            {/* Smooth Orange Revenue Line with Hollow White Circles & Orange Ring */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#F59E0B"
              strokeWidth={2.8}
              dot={{
                r: 4.5,
                fill: "#FFFFFF",
                stroke: "#F59E0B",
                strokeWidth: 2.5,
              }}
              activeDot={{
                r: 6.5,
                fill: "#FFFFFF",
                stroke: "#F59E0B",
                strokeWidth: 3,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OccupancyRevenueChart;
