import React from "react";
import { FiBarChart2, FiDownload, FiTrendingUp } from "react-icons/fi";

const Reports = () => {
  return (
    <div className="space-y-6 font-['Inter']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Reports & Business Analytics
          </h1>
          <p className="text-sm text-[#64748B]">
            Financial reconciliation, property performance metrics, and customer acquisition
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0E4D3C] hover:bg-[#072B22] text-white text-xs font-bold transition-colors shadow-xs">
          <FiDownload className="w-4 h-4" />
          <span>Export Monthly PDF Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs">
          <h3 className="font-bold text-[#0F172A] text-sm mb-1">
            Lansdowne Region Performance
          </h3>
          <p className="text-xs text-[#64748B] mb-4">
            Occupancy rate 82.4% with 10 listed boutique stays
          </p>
          <div className="h-32 bg-[#F8FAFC] rounded-lg border border-[#F1F5F9] flex items-center justify-center text-xs text-[#64748B] font-medium">
            📈 Lansdowne Tourism Growth Trend (+24% YoY)
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs">
          <h3 className="font-bold text-[#0F172A] text-sm mb-1">
            Kotdwar Region Performance
          </h3>
          <p className="text-xs text-[#64748B] mb-4">
            Occupancy rate 68.2% with 4 listed homestays
          </p>
          <div className="h-32 bg-[#F8FAFC] rounded-lg border border-[#F1F5F9] flex items-center justify-center text-xs text-[#64748B] font-medium">
            📈 Kotdwar Gateway Transit Stays (+18% YoY)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
