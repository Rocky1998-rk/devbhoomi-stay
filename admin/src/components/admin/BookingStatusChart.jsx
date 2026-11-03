import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const statusData = [
  { name: "Confirmed", value: 132, color: "#16A34A", bg: "bg-[#DCFCE7]" },
  { name: "Pending", value: 48, color: "#D97706", bg: "bg-[#FEF3C7]" },
  { name: "Cancelled", value: 36, color: "#DC2626", bg: "bg-[#FEE2E2]" },
  { name: "Completed", value: 30, color: "#2563EB", bg: "bg-[#DBEAFE]" },
];

const totalBookings = 246;

const CustomDonutTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const percentage = ((data.value / totalBookings) * 100).toFixed(1);
    return (
      <div className="bg-[#072B22] text-white px-3 py-2 rounded-lg shadow-xl border border-[#0E4D3C] text-xs font-['Inter']">
        <p className="font-semibold text-[#FEF3C7]">{data.name}</p>
        <p className="text-white font-bold text-sm mt-0.5">
          {data.value} Bookings ({percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const BookingStatusChart = () => {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between font-['Inter'] h-full">
      {/* Card Header with Single-Line Badge */}
      <div className="pb-3 border-b border-[#F1F5F9] mb-2 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-[#0F172A] tracking-tight leading-tight whitespace-nowrap">
            Booking Status
          </h3>
          <p className="text-xs text-[#64748B] font-normal mt-0.5 whitespace-nowrap truncate">
            Status distribution of 246 total reservations
          </p>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#ECF7F1] text-[#0E4D3C] border border-[#0E4D3C]/20 whitespace-nowrap shrink-0">
          246 Total
        </span>
      </div>

      {/* Donut Chart with Centered Total */}
      <div className="relative h-44 sm:h-48 w-full flex items-center justify-center my-auto py-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomDonutTooltip />} />
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={54}
              outerRadius={78}
              paddingAngle={3}
              dataKey="value"
            >
              {statusData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Count Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-none">
            {totalBookings}
          </span>
          <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider mt-0.5">
            Total
          </span>
        </div>
      </div>

      {/* Legend Grid Below - Compact & Zero Wrap */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#F1F5F9] text-xs">
        {statusData.map((item) => {
          const percent = ((item.value / totalBookings) * 100).toFixed(1);
          return (
            <div
              key={item.name}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#F1F5F9] min-w-0"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-[#334155] whitespace-nowrap truncate text-xs">
                  {item.name}
                </span>
              </div>
              <div className="text-right shrink-0 font-bold text-[#0F172A] text-xs ml-1 whitespace-nowrap">
                {item.value} <span className="text-[10px] text-[#94A3B8] font-normal">({percent}%)</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Matching WhatsApp Funnel */}
      <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B] whitespace-nowrap">
        <span className="truncate">246 Total Reservations</span>
        <span className="font-semibold text-[#16A34A] shrink-0 ml-2">
          53.7% Confirmed
        </span>
      </div>
    </div>
  );
};

export default BookingStatusChart;
