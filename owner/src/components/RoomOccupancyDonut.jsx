import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FiPieChart } from "react-icons/fi";

const RoomOccupancyDonut = () => {
  const data = [
    { name: "Occupied", value: 7, color: "#3B6EF5" },
    { name: "Available", value: 5, color: "#CADBFD" },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between h-full">
      {/* Title with clean outline icon matching reference image */}
      <div className="flex items-center gap-2 mb-3">
        <FiPieChart className="w-5 h-5 text-[#1E293B] shrink-0" />
        <h3 className="text-sm sm:text-[15.5px] font-bold text-[#1E293B] tracking-tight">
          Room Occupancy
        </h3>
      </div>

      {/* Chart and Legend Row - Perfectly centered & balanced across the card */}
      <div className="flex items-center justify-center sm:justify-around gap-6 sm:gap-8 my-auto py-1">
        {/* Donut Chart with Center Text */}
        <div className="relative w-[136px] h-[136px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={64}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Percentage Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[19px] font-black text-[#1E293B] leading-tight">
              58.33%
            </span>
            <span className="text-[11px] text-[#64748B] font-semibold mt-0.5">
              Occupied
            </span>
          </div>
        </div>

        {/* Legend Right - Proportional, cleanly aligned */}
        <div className="flex flex-col space-y-2.5 text-xs">
          {/* Occupied */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B6EF5] shrink-0"></span>
            <span className="text-[13px] font-bold text-[#1E293B] whitespace-nowrap">
              Occupied (7)
            </span>
          </div>

          {/* Available */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CADBFD] shrink-0"></span>
            <span className="text-[13px] font-bold text-[#1E293B] whitespace-nowrap">
              Available (5)
            </span>
          </div>

          {/* Divider & Total Rooms */}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <span className="text-[13px] font-bold text-[#1E293B] whitespace-nowrap">
              Total Rooms: 12
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomOccupancyDonut;
