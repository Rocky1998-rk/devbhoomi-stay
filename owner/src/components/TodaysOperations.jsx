import React from "react";
import { FiCalendar, FiChevronRight } from "react-icons/fi";

/* Custom SVGs strictly matching Reference Image */
const BedIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
  </svg>
);

const BidirectionalArrowsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="M5 12h14M5 12l3.5-3.5M5 12l3.5 3.5M19 12l-3.5-3.5M19 12l3.5 3.5" />
  </svg>
);

const UserSilhouetteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CalendarPendingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <circle cx="12" cy="15" r="2.5" />
    <path d="M12 14v1.5l1 1" />
  </svg>
);

const TodaysOperations = ({ onSelectOperation }) => {
  const operations = [
    {
      id: "checkin",
      title: "Check-In (Arrivals)",
      count: 3,
      icon: BedIcon,
      iconBg: "bg-[#E6F7ED]",
      iconColor: "text-[#16A34A]",
    },
    {
      id: "checkout",
      title: "Check-Out (Departures)",
      count: 2,
      icon: BidirectionalArrowsIcon,
      iconBg: "bg-[#EBF2FF]",
      iconColor: "text-[#2563EB]",
    },
    {
      id: "walkin",
      title: "Walk-In Bookings",
      count: 1,
      icon: UserSilhouetteIcon,
      iconBg: "bg-[#FFF4E6]",
      iconColor: "text-[#F59E0B]",
    },
    {
      id: "pending",
      title: "Pending Confirmations",
      count: 4,
      icon: CalendarPendingIcon,
      iconBg: "bg-[#FEEAEA]",
      iconColor: "text-[#DC2626]",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between h-full min-h-[250px]">
      {/* Title - Clean outline calendar icon next to text */}
      <div className="flex items-center gap-2 mb-3">
        <FiCalendar className="w-4 h-4 text-[#0F172A]" />
        <h3 className="text-sm sm:text-[15px] font-bold text-[#0F172A] tracking-tight">
          Today's Operations
        </h3>
      </div>

      {/* 4 Capsule Rows matching Reference Image exactly */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        {operations.map((op) => {
          const Icon = op.icon;
          return (
            <div
              key={op.id}
              onClick={() => onSelectOperation && onSelectOperation(op.id)}
              className="bg-[#F4F6FA] hover:bg-[#EDF1F7] border border-slate-100/60 rounded-xl px-3 py-2 sm:py-2.5 flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Pill/Circle Icon Container */}
                <div
                  className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center shrink-0 ${op.iconBg} ${op.iconColor} group-hover:scale-105 transition-transform`}
                >
                  <Icon />
                </div>
                <span className="text-[12.5px] sm:text-[13px] font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors whitespace-nowrap">
                  {op.title}
                </span>
              </div>

              {/* Count and Chevron right-aligned */}
              <div className="flex items-center gap-2.5 shrink-0 ml-3">
                <span className="text-[13.5px] sm:text-[14px] font-bold text-[#0F172A]">
                  {op.count}
                </span>
                <FiChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodaysOperations;
