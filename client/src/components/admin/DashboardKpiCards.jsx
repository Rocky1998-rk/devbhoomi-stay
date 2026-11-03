import React from "react";
import { FiHome, FiCalendar, FiUsers, FiArrowUpRight } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const kpiData = [
  {
    id: "hotels",
    title: "Total Hotels",
    value: "10",
    trend: "+2 this month",
    isPositive: true,
    icon: FiHome,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
  {
    id: "bookings",
    title: "Total Bookings",
    value: "246",
    trend: "+18% vs last month",
    isPositive: true,
    icon: FiCalendar,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
  },
  {
    id: "revenue",
    title: "Total Revenue",
    value: "₹8,42,500",
    trend: "+27% vs last month",
    isPositive: true,
    icon: FaRupeeSign,
    iconBg: "bg-[#FEE2E2]",
    iconColor: "text-[#DC2626]",
  },
  {
    id: "users",
    title: "Active Users",
    value: "32",
    trend: "+4 new owners",
    isPositive: true,
    icon: FiUsers,
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#2563EB]",
  },
];

const DashboardKpiCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 font-['Inter']">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className="bg-white rounded-xl p-5 border border-[#e3e3e6] hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#64748B] tracking-wide uppercase">
                {kpi.title}
              </span>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${kpi.iconBg} ${kpi.iconColor} shadow-2xs`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight leading-none">
                {kpi.value}
              </div>

              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="inline-flex items-center text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                  <FiArrowUpRight className="w-3 h-3 mr-0.5" />
                  {kpi.trend.split(" ")[0]}
                </span>
                <span className="text-xs text-[#64748B] truncate font-normal">
                  {kpi.trend.substring(kpi.trend.indexOf(" ") + 1)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardKpiCards;
