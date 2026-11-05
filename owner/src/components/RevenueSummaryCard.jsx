import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

// Custom 3-bar ascending chart icon matching reference image exactly
const RevenueTrendIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="14" width="4.5" height="8" rx="2" />
    <rect x="9.5" y="8" width="4.5" height="14" rx="2" />
    <rect x="17" y="2" width="4.5" height="20" rx="2" />
  </svg>
);

const RevenueSummaryCard = () => {
  const [period, setPeriod] = useState("This Month");

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between h-full">
      {/* Header: Exact 3-bar icon + Bold Title + Pill Dropdown */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <RevenueTrendIcon className="w-5 h-5 text-[#1E293B] shrink-0" />
          <h3 className="text-sm sm:text-[15.5px] font-bold text-[#1E293B] tracking-tight">
            Revenue Summary
          </h3>
        </div>

        {/* Dropdown Pill Button */}
        <button
          onClick={() =>
            setPeriod(period === "This Month" ? "Last Month" : "This Month")
          }
          className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#1E293B] transition-all shadow-2xs cursor-pointer"
        >
          <span>{period}</span>
          <FiChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
        </button>
      </div>

      {/* 3 Metric Columns with Vertical Dividers (Exact match to reference image) */}
      <div className="grid grid-cols-3 divide-x divide-[#CBD5E1] my-auto py-2">
        {/* Total Revenue */}
        <div className="text-center px-2">
          <div className="text-[18px] sm:text-[20px] font-extrabold text-[#1E293B] tracking-tight leading-tight">
            ₹ 3,42,000
          </div>
          <div className="text-[12px] text-[#64748B] font-medium mt-1">
            Total Revenue
          </div>
        </div>

        {/* Collected */}
        <div className="text-center px-2">
          <div className="text-[18px] sm:text-[20px] font-extrabold text-[#1E293B] tracking-tight leading-tight">
            ₹ 2,64,500
          </div>
          <div className="text-[12px] text-[#64748B] font-medium mt-1">
            Collected
          </div>
        </div>

        {/* Pending Dues */}
        <div className="text-center px-2">
          <div className="text-[18px] sm:text-[20px] font-extrabold text-[#1E293B] tracking-tight leading-tight">
            ₹ 77,500
          </div>
          <div className="text-[12px] text-[#64748B] font-medium mt-1">
            Pending Dues
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueSummaryCard;
