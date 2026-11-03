import React from "react";
import { useAuth } from "../../context/AuthContext";
import himalayanHeroBanner from "../../assets/himalayan_hero_banner.png";

/**
 * Custom SVG Icons matching Reference Image 2 exactly:
 * 1. Hotel: Building with windows & door
 * 2. Bookings: Rounded square with 'A' emblem
 * 3. Revenue: Indian Rupee ₹ symbol
 * 4. Active Users: Solid filled two-person silhouette
 */
const HotelBuildingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M12 6h.01M12 10h.01M12 14h.01" />
  </svg>
);

const BookingsBrandIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 17l4-9 4 9" />
    <path d="M9.5 13.5h5" />
  </svg>
);

const RupeeIcon = () => (
  <span className="text-xl sm:text-[23px] font-extrabold select-none leading-none">
    ₹
  </span>
);

const UsersSolidIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const kpiData = [
  {
    id: "hotels",
    title: "Total Hotels",
    value: "10",
    trend: "+2 this month",
    icon: HotelBuildingIcon,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
  {
    id: "bookings",
    title: "Total Bookings",
    value: "246",
    trend: "+18% vs last month",
    icon: BookingsBrandIcon,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
  },
  {
    id: "revenue",
    title: "Total Revenue",
    value: "₹ 8,42,500",
    trend: "+27% vs last month",
    icon: RupeeIcon,
    iconBg: "bg-[#FEE2E2]",
    iconColor: "text-[#DC2626]",
  },
  {
    id: "users",
    title: "Active Users",
    value: "32",
    trend: "+4 new owners",
    icon: UsersSolidIcon,
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#2563EB]",
  },
];

const HimalayanGreetingBanner = () => {
  const { user } = useAuth();
  const adminName = user?.name ? user.name.split(" ")[0] : "Rocky";

  return (
    <div className="w-full font-['Inter']">
      {/* ========================================================================= */}
      {/* 1. FULL-BLEED PANORAMIC HIMALAYAN HERO BANNER (SLIM COMPACT HEIGHT)        */}
      {/* Attached directly to Topbar, Sidebar, and Right edge without any card box */}
      {/* ========================================================================= */}
      <div className="relative w-full h-[145px] sm:h-[155px] lg:h-[165px] overflow-hidden select-none">
        {/* Panoramic Mountain Landscape with Blue Sky, Snow Peaks & Pagoda Temple (HD Cropped Banner) */}
        <div
          className="absolute inset-0 bg-cover bg-[position:right_center] bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url(${himalayanHeroBanner})` }}
        />

        {/* 1. Left Pure White Morning Fog (Ensures crystal clear greeting text, fades seamlessly into mountains) */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 via-[24%] via-white/39 via-[12%] to-transparent pointer-events-none" />

        {/* 2. Soft Bottom Pure White Mist (Subtle fade right behind cards, leaves mountains & temple 100% clear) */}
        <div className="absolute inset-x-0 bottom-0 h-8 sm:h-10 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none" />

        {/* Content Row inside Banner: Greeting (Left) & Script (Right) - Reduced padding */}
        <div className="relative z-10 pt-3 sm:pt-3.5 lg:pt-4 px-4 sm:px-5 lg:px-6 flex items-start justify-between">
          {/* Left Side: Greeting */}
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-[30px] font-extrabold text-[#0F172A] tracking-tight leading-tight flex items-center gap-2">
              <span>Good Morning, {adminName}</span>
              <span className="inline-block text-xl sm:text-2xl animate-bounce-subtle cursor-default">
                👋
              </span>
            </h1>
            <p className="text-[11px] sm:text-xs lg:text-[13px] text-[#475569] mt-0.5 font-normal tracking-wide">
              Here's what's happening with DevBhoomi Stay today.
            </p>
          </div>

          {/* Right Side: Discover Uttarakhand Script (Stacked like Reference Image) */}
          {/* <div className="text-right pr-14 sm:pr-18 lg:pr-22 hidden sm:block select-none">
            <div className="font-['Caveat',_cursive] text-2xl sm:text-[28px] lg:text-[34px] text-[#0F172A] font-bold leading-[0.88] tracking-wide -rotate-2 select-none drop-shadow-xs">
              <span className="block pr-2">Discover</span>
              <span className="block">Uttarakhand</span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-[#475569] tracking-wider mt-0.5 select-none">
              Lansdowne | Kotdwar
            </div>
          </div> */}

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. FOUR KPI CARDS OVERLAPPING THE BOTTOM OF THE BANNER                    */}
      {/* Tight top space, reduced rounded corners (rounded-xl), smaller gap        */}
      {/* ========================================================================= */}
      <div className="relative z-20 -mt-9 sm:-mt-10 lg:-mt-8 px-2 sm:px-2.5 lg:px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2 lg:gap-2">
          {kpiData.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.id}
                className="bg-white rounded-lg sm:rounded-[10px] p-3 sm:p-3.5 lg:p-3.5 border border-[#E2E8F0]  transition-all duration-200 flex items-center gap-2.5 sm:gap-3 group"
              >
                {/* Left Squircle Icon */}
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${kpi.iconBg} ${kpi.iconColor} shadow-2xs group-hover:scale-105 transition-transform`}
                >
                  <Icon />
                </div>

                {/* Right Details: High width, unclipped values & trends */}
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] sm:text-xs lg:text-[13px] font-semibold text-[#64748B] whitespace-nowrap leading-tight">
                    {kpi.title}
                  </div>
                  <div className="text-lg sm:text-xl lg:text-[22px] xl:text-[24px] font-extrabold text-[#0F172A] tracking-tight leading-none mt-1 whitespace-nowrap">
                    {kpi.value}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] lg:text-xs font-semibold text-[#16A34A] mt-1 whitespace-nowrap">
                    <span className="text-[#16A34A] font-bold text-xs lg:text-sm leading-none">
                      ↑
                    </span>
                    <span>{kpi.trend}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HimalayanGreetingBanner;
