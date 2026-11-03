import React, { useState } from "react";
import { FiPlus, FiCalendar, FiTag, FiTrendingUp, FiCheckCircle, FiEdit, FiTrash2 } from "react-icons/fi";

const initialRules = [
  {
    id: "rule-1",
    name: "Base Weekday Tariff",
    period: "Sunday - Thursday",
    appliesTo: "All Properties",
    multiplier: "1.0x (Standard)",
    multiplierBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    minStay: "1 Night",
    status: "Active",
  },
  {
    id: "rule-2",
    name: "Weekend Inflow Surge",
    period: "Friday - Saturday",
    appliesTo: "All Properties",
    multiplier: "+25% Surge",
    multiplierBadge: "bg-blue-50 text-blue-700 border-blue-200",
    minStay: "1 Night",
    status: "Active",
  },
  {
    id: "rule-3",
    name: "Himalayan Autumn & Winter",
    period: "01 Oct 2026 - 15 Jan 2027",
    appliesTo: "Lansdowne Homestays",
    multiplier: "+35% Peak Surge",
    multiplierBadge: "bg-amber-50 text-amber-700 border-amber-200",
    minStay: "1 Night",
    status: "Active",
  },
  {
    id: "rule-4",
    name: "New Year & Festival Peak",
    period: "25 Dec 2026 - 02 Jan 2027",
    appliesTo: "All Properties",
    multiplier: "+50% Surge (Blackout)",
    multiplierBadge: "bg-rose-50 text-rose-700 border-rose-200",
    minStay: "2 Nights",
    status: "Scheduled",
  },
];

const Pricing = () => {
  const [rules, setRules] = useState(initialRules);

  const toggleRuleStatus = (id) => {
    setRules((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "Active" ? "Paused" : "Active" }
          : r
      )
    );
  };

  return (
    <div className="space-y-4 md:space-y-5 font-['Inter']">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              Pricing & Seasonal Tariffs
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ECF7F1] text-[#087F5B] border border-[#087F5B]/20">
              Dynamic Pricing Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Configure base room rates, weekend surge, and Uttarakhand peak tourist season rules
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0">
          <FiPlus className="w-4 h-4" />
          <span>Add Season Rule</span>
        </button>
      </div>

      {/* 3 Overview Cards: Compact gap-3.5 and unbroken aligned headers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5 items-stretch">
        {/* Card 1: Standard Plan */}
        <div className="bg-white p-4 sm:p-4.5 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between h-full hover:border-[#087F5B]/30 hover:shadow-sm transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#16A34A] bg-[#DCFCE7] border border-[#16A34A]/20 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                Standard Plan
              </span>
              <span className="font-mono text-xs text-[#64748B] whitespace-nowrap">Default</span>
            </div>
            <h2 className="text-base font-bold text-[#0F172A] mt-2 whitespace-nowrap">
              Base Weekday Tariff
            </h2>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Regular pricing applicable Sunday night through Thursday night.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
            <span className="font-bold text-[#087F5B] text-xs sm:text-sm whitespace-nowrap">
              Avg: ₹2,800 - ₹3,500/night
            </span>
            <span className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">
              1.0x Rate
            </span>
          </div>
        </div>

        {/* Card 2: Season Surge */}
        <div className="bg-white p-4 sm:p-4.5 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between h-full hover:border-amber-300 hover:shadow-sm transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#D97706] bg-[#FEF3C7] border border-[#D97706]/20 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                Season Surge
              </span>
              <span className="font-mono text-xs text-[#64748B] whitespace-nowrap">Oct - Jan</span>
            </div>
            <h2 className="text-base font-bold text-[#0F172A] mt-2 whitespace-nowrap">
              Himalayan Autumn & Winter
            </h2>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Weekend surge (Fri-Sat) and holiday season tariff adjustments.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
            <span className="font-bold text-[#D97706] text-xs sm:text-sm whitespace-nowrap">
              Avg: ₹4,200 - ₹5,500/night
            </span>
            <span className="text-[11px] font-semibold text-amber-700 whitespace-nowrap">
              +35% Surge
            </span>
          </div>
        </div>

        {/* Card 3: Blackout Plan */}
        <div className="bg-white p-4 sm:p-4.5 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between h-full hover:border-rose-300 hover:shadow-sm transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#DC2626] bg-[#FEE2E2] border border-[#DC2626]/20 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                Blackout Plan
              </span>
              <span className="font-mono text-xs text-[#64748B] whitespace-nowrap">25 Dec - 02 Jan</span>
            </div>
            <h2 className="text-base font-bold text-[#0F172A] mt-2 whitespace-nowrap">
              New Year & Festival Peak
            </h2>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Strict advance booking with 50% non-refundable token requirement.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
            <span className="font-bold text-[#DC2626] text-xs sm:text-sm whitespace-nowrap">
              Blackout Dates Enabled
            </span>
            <span className="text-[11px] font-semibold text-rose-700 whitespace-nowrap">
              Min 2 Nights
            </span>
          </div>
        </div>
      </div>

      {/* Active Seasonal Tariff Rules Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#0F172A]">Seasonal Tariff Rules & Rate Multipliers</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Live tariff multiplier rules applied automatically during guest checkout and WhatsApp booking quotes
            </p>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar scrollbar-none">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-3.5 text-left whitespace-nowrap">Rule Name</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Applicable Date / Days</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Applies To</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Rate Adjustment</th>
                <th className="py-3 px-2.5 text-center whitespace-nowrap">Min Stay</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">Status</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  {/* Rule Name */}
                  <td className="py-3 px-3.5 font-bold text-[#0F172A] whitespace-nowrap">
                    {rule.name}
                  </td>

                  {/* Period */}
                  <td className="py-3 px-3 text-[#475569] font-medium whitespace-nowrap">
                    {rule.period}
                  </td>

                  {/* Applies To */}
                  <td className="py-3 px-3 text-[#087F5B] font-semibold whitespace-nowrap">
                    {rule.appliesTo}
                  </td>

                  {/* Rate Adjustment Badge */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap inline-flex items-center ${rule.multiplierBadge}`}
                    >
                      {rule.multiplier}
                    </span>
                  </td>

                  {/* Min Stay */}
                  <td className="py-3 px-2.5 text-center font-bold text-[#0F172A] whitespace-nowrap">
                    {rule.minStay}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => toggleRuleStatus(rule.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap inline-flex items-center cursor-pointer transition-colors ${
                        rule.status === "Active"
                          ? "bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]/20"
                          : rule.status === "Scheduled"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                      title="Click to toggle rule status"
                    >
                      {rule.status}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3.5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        title="Edit Rule"
                        className="p-1.5 rounded-md hover:bg-[#ECF7F1] text-[#087F5B] transition-colors cursor-pointer"
                      >
                        <FiEdit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Delete Rule"
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
