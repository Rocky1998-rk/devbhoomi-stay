import React from "react";
import {
  FiCheckCircle,
  FiClock,
  FiArrowRight,
  FiLogOut,
  FiPieChart,
} from "react-icons/fi";

/* SVG Custom Bed Icon */
const BedIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 4v16" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" />
    <path d="M2 17h20" />
    <path d="M6 8v9" />
  </svg>
);

/* SVG Transfer / Arrivals Arrows */
const TransferArrowsIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 16V4m0 0L3 8m4-4l4 4" />
    <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

/* SVG Wallet Icon */
const WalletIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    <path d="M16 3H4a2 2 0 0 0-2 2v2" />
    <circle cx="16" cy="14" r="1" />
  </svg>
);

/* SVG Circular Progress / Donut Icon */
const DonutIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
    <path d="M12 3a9 9 0 0 1 9 9" />
  </svg>
);

const OwnerKpiCards = () => {
  // Row 1: 5 Small Metric Cards
  const topRowCards = [
    {
      id: "total_rooms",
      value: "12",
      label: "Total Rooms",
      iconBg: "bg-[#EFF4FF]",
      iconColor: "text-[#3B6EF5]",
      icon: BedIcon,
    },
    {
      id: "occupied_rooms",
      value: "7",
      label: "Occupied Rooms",
      iconBg: "bg-[#EAF5FF]",
      iconColor: "text-[#0284C7]",
      icon: BedIcon,
    },
    {
      id: "available_rooms",
      value: "5",
      label: "Available Rooms",
      iconBg: "bg-[#E8F8F0]",
      iconColor: "text-[#16A36A]",
      icon: BedIcon,
    },
    {
      id: "todays_arrivals",
      value: "3",
      label: "Today's Arrivals",
      iconBg: "bg-[#FFF3E5]",
      iconColor: "text-[#F59E0B]",
      icon: TransferArrowsIcon,
    },
    {
      id: "todays_departures",
      value: "2",
      label: "Today's Departures",
      iconBg: "bg-[#F1EDFF]",
      iconColor: "text-[#805AD5]",
      icon: FiLogOut,
    },
  ];

  // Row 2: 4 Secondary Metric Cards
  const secondRowCards = [
    {
      id: "collected_today",
      value: "₹ 24,500",
      label: "Collected Today",
      iconBg: "bg-[#E8F8F0]",
      iconColor: "text-[#16A36A]",
      icon: ({ className }) => <span className={`font-extrabold text-lg leading-none ${className}`}>₹</span>,
    },
    {
      id: "pending_dues",
      value: "₹ 18,000",
      label: "Pending Dues",
      iconBg: "bg-[#FFF0F0]",
      iconColor: "text-[#EF4444]",
      icon: WalletIcon,
    },
    {
      id: "pending_bookings",
      value: "4",
      label: "Pending Bookings",
      iconBg: "bg-[#F1EDFF]",
      iconColor: "text-[#805AD5]",
      icon: FiClock,
    },
    {
      id: "occupancy_rate",
      value: "58.33%",
      label: "Occupancy Rate",
      iconBg: "bg-[#EFF4FF]",
      iconColor: "text-[#3B6EF5]",
      icon: DonutIcon,
      trend: "+12.5%",
    },
  ];

  return (
    <div className="space-y-3">
      {/* 1. TOP ROW: 5 Small Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-1.5">
        {topRowCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-lg p-2.5 sm:p-3 border border-[#E3E8F2] shadow-xs hover:shadow-md transition-all flex items-center gap-2.5 sm:gap-3 group"
            >
              {/* Left Squircle Icon */}
              <div
                className={`w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor} group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>

              {/* Right Values */}
              <div className="min-w-0 flex-1">
                <div className="text-[19px] sm:text-[21px] font-extrabold text-[#17233D] tracking-tight leading-tight">
                  {card.value}
                </div>
                <div className="text-[11px] sm:text-[11.5px] text-[#64748B] font-medium whitespace-nowrap mt-0.5">
                  {card.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. SECOND ROW: 4 Wider Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-1.5">
        {secondRowCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="relative bg-white rounded-lg p-3 sm:p-3.5 border border-[#E3E8F2] shadow-xs hover:shadow-md transition-all flex items-center gap-3 group"
            >
              {/* Left Squircle Icon */}
              <div
                className={`w-10.5 h-10.5 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor} group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Values */}
              <div className="min-w-0 flex-1">
                <div className="text-[20px] sm:text-[22px] font-extrabold text-[#17233D] tracking-tight leading-tight">
                  {card.value}
                </div>
                <div className="text-[11px] sm:text-[11.5px] text-[#64748B] font-medium whitespace-nowrap mt-0.5">
                  {card.label}
                </div>
              </div>

              {/* Top-Right Trend Pill (For Occupancy Rate) - Absolute so it never squashes text */}
              {card.trend && (
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-0.5 bg-[#E8F8F0] text-[#16A36A] px-2 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-bold shadow-2xs">
                  <span>↑</span>
                  <span>{card.trend}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OwnerKpiCards;