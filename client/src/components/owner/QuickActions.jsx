import React from "react";

/* Custom SVGs strictly matching Reference Image media_1793790620862_094303f7.jpg */
const CalendarPlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-[#2563EB]"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M12 14v4M10 16h4" />
  </svg>
);

const UserPlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-[#16A34A]"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <path d="M20 8v6M23 11h-6" />
  </svg>
);

const LockSparkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-[#D97706]"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1.5" />
  </svg>
);

const PriceTagIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-[#7C3AED]"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <circle cx="7" cy="7" r="1.5" />
  </svg>
);

const LightningBoltIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-[#F59E0B]"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const QuickActions = ({
  onNewBooking,
  onCheckInGuest,
  onBlockRoom,
  onUpdatePricing,
}) => {
  const actions = [
    {
      id: "new_booking",
      title: "New Booking",
      icon: CalendarPlusIcon,
      bg: "bg-[#F0F5FF]",
      border: "border-[#DBEAFE]",
      onClick: onNewBooking,
    },
    {
      id: "checkin_guest",
      title: "Check-In Guest",
      icon: UserPlusIcon,
      bg: "bg-[#F0FDF4]",
      border: "border-[#DCFCE7]",
      onClick: onCheckInGuest,
    },
    {
      id: "block_room",
      title: "Block / Unlock Room",
      icon: LockSparkIcon,
      bg: "bg-[#FFFBEB]",
      border: "border-[#FEF3C7]",
      onClick: onBlockRoom,
    },
    {
      id: "update_pricing",
      title: "Update Pricing",
      icon: PriceTagIcon,
      bg: "bg-[#FAF5FF]",
      border: "border-[#F3E8FF]",
      onClick: onUpdatePricing,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between h-full min-h-[250px]">
      {/* Title - Clean outline lightning bolt next to text */}
      <div className="flex items-center gap-2 mb-3">
        <LightningBoltIcon />
        <h3 className="text-sm sm:text-[15px] font-bold text-[#0F172A] tracking-tight">
          Quick Actions
        </h3>
      </div>

      {/* 2x2 Grid of Rounded Pastel Cards matching Reference Image exactly */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className={`${act.bg} border ${act.border} rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-center gap-2 hover:scale-[1.02] hover:shadow-xs transition-all duration-150 cursor-pointer group`}
            >
              {/* Icon floating directly on pastel card with zero white box */}
              <div className="transition-transform group-hover:scale-110">
                <Icon />
              </div>
              <span className="text-[12px] sm:text-[12.5px] font-bold text-[#0F172A] group-hover:text-black whitespace-nowrap">
                {act.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
