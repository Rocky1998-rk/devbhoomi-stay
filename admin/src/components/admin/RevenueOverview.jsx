import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { FiChevronDown, FiTrendingUp, FiBarChart2 } from "react-icons/fi";

const fullYearData = [
  { month: "Jan", revenue: 320000, bookings: 95, prevRevenue: 240000, prevBookings: 72 },
  { month: "Feb", revenue: 360000, bookings: 105, prevRevenue: 275000, prevBookings: 80 },
  { month: "Mar", revenue: 420000, bookings: 120, prevRevenue: 330000, prevBookings: 96 },
  { month: "Apr", revenue: 510000, bookings: 145, prevRevenue: 395000, prevBookings: 115 },
  { month: "May", revenue: 640000, bookings: 180, prevRevenue: 490000, prevBookings: 140 },
  { month: "Jun", revenue: 720000, bookings: 205, prevRevenue: 560000, prevBookings: 162 },
  { month: "Jul", revenue: 540000, bookings: 155, prevRevenue: 420000, prevBookings: 120 },
  { month: "Aug", revenue: 580000, bookings: 165, prevRevenue: 450000, prevBookings: 130 },
  { month: "Sep", revenue: 690000, bookings: 195, prevRevenue: 535000, prevBookings: 152 },
  { month: "Oct", revenue: 842500, bookings: 246, prevRevenue: 655000, prevBookings: 188 },
  { month: "Nov", revenue: 610000, bookings: 170, prevRevenue: 470000, prevBookings: 132 },
  { month: "Dec", revenue: 750000, bookings: 215, prevRevenue: 580000, prevBookings: 168 },
];

const CustomTooltip = ({ active, payload, label, compareMode }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const rev2026 = data.revenue;
    const rev2025 = data.prevRevenue;
    const diff = rev2026 - rev2025;
    const growth = ((diff / rev2025) * 100).toFixed(1);

    return (
      <div className="bg-[#0F172A] text-white p-3.5 rounded-xl shadow-2xl border border-slate-700/80 text-xs font-['Inter'] min-w-[215px]">
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/60 mb-2.5">
          <p className="font-bold text-white text-sm">
            {label} {compareMode ? "(2026 vs 2025)" : "2026"}
          </p>
          {compareMode && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              +{growth}% YoY
            </span>
          )}
        </div>

        {/* 2026 Current Year */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#087F5B] to-[#2DD4BF]" />
            <span className="text-slate-200 font-medium">2026 (Current):</span>
          </div>
          <span className="font-extrabold text-[#34D399]">
            ₹{rev2026.toLocaleString("en-IN")}
          </span>
        </div>

        {compareMode && (
          <>
            {/* 2025 Previous Year */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
                <span className="text-slate-300 font-medium">2025 (Previous):</span>
              </div>
              <span className="text-slate-200 font-bold">
                ₹{rev2025.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Growth Difference */}
            <div className="pt-2 border-t border-slate-700/60 mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
              <span>YoY Net Gain:</span>
              <span className="text-emerald-400 font-bold">
                +₹{diff.toLocaleString("en-IN")}
              </span>
            </div>
          </>
        )}

        <div className="text-[10px] text-slate-400 mt-2 pt-1.5 border-t border-slate-700/50 flex justify-between">
          <span>Bookings:</span>
          <span className="text-slate-200 font-semibold">
            {data.bookings} stays {compareMode && `(vs ${data.prevBookings})`}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const RevenueOverview = () => {
  const [compareMode, setCompareMode] = useState(true);
  const [period, setPeriod] = useState("All 12 Months");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const periods = [
    "All 12 Months",
    "Last 6 Months (Jul - Dec)",
    "Last 3 Months (Oct - Dec)",
    "Peak Summer (Apr - Jun)",
  ];

  const handlePeriodChange = (p) => {
    setPeriod(p);
    setDropdownOpen(false);
  };

  const getFilteredData = () => {
    switch (period) {
      case "Last 3 Months (Oct - Dec)":
        return fullYearData.slice(9, 12);
      case "Last 6 Months (Jul - Dec)":
        return fullYearData.slice(6, 12);
      case "Peak Summer (Apr - Jun)":
        return fullYearData.slice(3, 6);
      case "All 12 Months":
      default:
        return fullYearData;
    }
  };

  const chartData = getFilteredData();

  return (
    <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between font-['Inter'] h-full">
      {/* Header with Title and Comparison Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F1F5F9] mb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
              Revenue Overview
            </h3>
            {compareMode ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#087F5B] border border-emerald-200 animate-in fade-in">
                YoY Comparison Active
              </span>
            ) : (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#ECF7F1] text-[#087F5B] border border-[#087F5B]/20">
                FY 2026
              </span>
            )}
          </div>
          <p className="text-xs text-[#64748B] mt-0.5 font-normal">
            {compareMode
              ? "Comparative analysis: Previous Year (2025) vs Current Year (2026)"
              : "Monthly gross booking revenue from stays (Jan - Dec 2026)"}
          </p>
        </div>

        {/* Right Controls: Comparison Segmented Switch + Period Filter */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Segmented View Switch: Single vs Comparison */}
          <div className="flex items-center bg-[#F1F5F9] p-0.5 rounded-lg border border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setCompareMode(false)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                !compareMode
                  ? "bg-white text-[#0F172A] shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
              title="Show Current Year (2026) only"
            >
              <FiBarChart2 className="w-3.5 h-3.5" />
              <span>2026 Only</span>
            </button>

            <button
              type="button"
              onClick={() => setCompareMode(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                compareMode
                  ? "bg-[#087F5B] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
              title="Compare 2025 vs 2026 (YoY Analysis)"
            >
              <FiTrendingUp className="w-3.5 h-3.5" />
              <span>Compare vs 2025</span>
            </button>
          </div>

          {/* Period Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 h-7.5 px-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            >
              <span>{period}</span>
              <FiChevronDown
                className={`w-3.5 h-3.5 text-[#64748B] transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-1 z-30 animate-in fade-in duration-100">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePeriodChange(p)}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                      period === p
                        ? "text-[#087F5B] font-semibold bg-[#ECF7F1]"
                        : "text-[#475569] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            barGap={3}
            barCategoryGap={compareMode ? "16%" : "22%"}
          >
            <defs>
              {/* DevBhoomi Theme: Vibrant Mint to Forest Green Pill Gradient for Current Year in Comparison Mode */}
              <linearGradient id="compCurrentYearGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity={1} />
                <stop offset="60%" stopColor="#0D9488" stopOpacity={1} />
                <stop offset="100%" stopColor="#087F5B" stopOpacity={1} />
              </linearGradient>

              {/* Reference Image 2: Soft Light Grey Pill Gradient for Previous Year */}
              <linearGradient id="compPrevYearGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E2E8F0" stopOpacity={1} />
                <stop offset="100%" stopColor="#CBD5E1" stopOpacity={1} />
              </linearGradient>

              {/* Single Year Mode: Fresh Mountain Teal / Jade Gradient */}
              <linearGradient id="revenueBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity={0.95} />
                <stop offset="60%" stopColor="#0D9488" stopOpacity={1} />
                <stop offset="100%" stopColor="#087F5B" stopOpacity={1} />
              </linearGradient>
            </defs>

            {/* Clearly Visible Dashed Grid Lines */}
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#CBD5E1"
              strokeWidth={1}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }}
              dy={5}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }}
              tickFormatter={(val) => `₹${val / 100000}L`}
            />
            <Tooltip
              content={<CustomTooltip compareMode={compareMode} />}
              cursor={{ fill: "#ECF7F1", opacity: 0.6 }}
            />

            {/* Comparison Mode: Previous Year (2025) Capsule Bar (Left) */}
            {compareMode && (
              <Bar
                dataKey="prevRevenue"
                name="2025 (Previous Year)"
                fill="url(#compPrevYearGradient)"
                radius={[10, 10, 0, 0]}
                maxBarSize={18}
              />
            )}

            {/* Current Year (2026) Bar (Right in comparison, or Single capsule bar in default mode) */}
            <Bar
              dataKey="revenue"
              name="2026 (Current Year)"
              fill={compareMode ? "url(#compCurrentYearGradient)" : "url(#revenueBarGradient)"}
              radius={[10, 10, 0, 0]}
              maxBarSize={compareMode ? 18 : 26}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Indicator */}
      <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
        {compareMode ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
              <span className="text-[#64748B] font-medium">2025 (Previous Year)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#087F5B] to-[#2DD4BF]" />
              <span className="text-[#0F172A] font-bold">2026 (Current Year)</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-gradient-to-r from-[#087F5B] to-[#2DD4BF]" />
            <span>Gross Tariff Revenue (Jan - Dec 2026)</span>
          </div>
        )}

        <span className="font-semibold text-[#0F172A]">
          {compareMode
            ? "Annual YoY Growth: +28.6% (₹15.8L Net Increase)"
            : "Peak Month: Oct (₹8.42L)"}
        </span>
      </div>
    </div>
  );
};

export default RevenueOverview;
