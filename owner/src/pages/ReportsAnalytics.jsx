import React from "react";
import { FiBarChart2, FiTrendingUp, FiPieChart, FiUsers } from "react-icons/fi";
import OccupancyRevenueChart from "../components/OccupancyRevenueChart";
import RoomOccupancyDonut from "../components/RoomOccupancyDonut";
import RevenueSummaryCard from "../components/RevenueSummaryCard";

const ReportsAnalytics = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto text-xs">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#17233D] tracking-tight">
          Performance & Occupancy Analytics
        </h2>
        <p className="text-[#64748B] text-xs mt-0.5">
          Detailed metrics for The Pine Retreat (Lansdowne, Uttarakhand).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <OccupancyRevenueChart />
        </div>
        <div className="lg:col-span-4 space-y-4">
          <RoomOccupancyDonut />
          <RevenueSummaryCard />
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;

