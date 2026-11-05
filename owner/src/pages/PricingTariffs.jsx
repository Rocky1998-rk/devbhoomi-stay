import React, { useState } from "react";
import { FiTag, FiPlus, FiCalendar, FiCheck } from "react-icons/fi";
import UpdatePricingModal from "../components/modals/UpdatePricingModal";

const PricingTariffs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rules, setRules] = useState([
    {
      id: "rule-1",
      name: "Standard Base Weekday Tariff",
      type: "normal",
      category: "All Categories",
      dates: "Year-Round (Mon-Thu)",
      price: "₹ 3,000 / night",
      status: "Active",
      priority: 1,
    },
    {
      id: "rule-2",
      name: "Autumn Long Weekend Surge",
      type: "season",
      category: "Deluxe & Family Suite",
      dates: "29 Oct 2026 – 03 Nov 2026",
      price: "₹ 4,500 / night",
      status: "Active",
      priority: 5,
    },
    {
      id: "rule-3",
      name: "Christmas & New Year Snow Rush",
      type: "season",
      category: "Cottages & Suites",
      dates: "23 Dec 2026 – 03 Jan 2027",
      price: "₹ 6,500 / night",
      status: "Scheduled",
      priority: 8,
    },
    {
      id: "rule-4",
      name: "Private Wedding Bulk Blockout",
      type: "blackout",
      category: "All 12 Rooms",
      dates: "14 Nov 2026 – 16 Nov 2026",
      price: "Sold Out / Blocked",
      status: "Active",
      priority: 10,
    },
  ]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#17233D] tracking-tight">
            Dynamic Seasonal Pricing & Tariff Engine
          </h2>
          <p className="text-[#64748B] text-xs mt-0.5">
            Configure Uttarakhand holiday surge tariffs, weekend rates and blackout dates.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#805AD5] hover:bg-[#6B46C1] text-white font-bold transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto"
        >
          <FiPlus className="w-4 h-4" />
          <span>+ Create Pricing Rule</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E3E8F2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B]">
                <th className="py-3 px-4">Rule Name</th>
                <th className="py-3 px-4">Rule Type</th>
                <th className="py-3 px-4">Applies To</th>
                <th className="py-3 px-4">Date Range</th>
                <th className="py-3 px-4">Effective Price</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {rules.map((r) => (
                <tr key={r.id} className="hover:bg-[#F8FAFF] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17233D]">{r.name}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        r.type === "season"
                          ? "bg-[#FFF5E5] text-[#D97706]"
                          : r.type === "blackout"
                          ? "bg-[#FFF0F0] text-[#DC2626]"
                          : "bg-[#EFF4FF] text-[#2563EB]"
                      }`}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#64748B] font-medium">{r.category}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#17233D]">{r.dates}</td>
                  <td className="py-3.5 px-4 font-extrabold text-[#17233D]">{r.price}</td>
                  <td className="py-3.5 px-4 text-[#64748B] font-bold">Lvl {r.priority}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F8F0] text-[#16A36A]">
                      ● {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UpdatePricingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PricingTariffs;

