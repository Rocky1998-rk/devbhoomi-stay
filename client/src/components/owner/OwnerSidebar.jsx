import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiHome,
  FiTag,
  FiCalendar,
  FiUserCheck,
  FiCreditCard,
  FiBarChart2,
  FiBell,
  FiSettings,
} from "react-icons/fi";

/* Custom SVGs matching Image 2 Icons */
const BuildingHotelIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M12 6h.01M12 10h.01M12 14h.01" />
  </svg>
);

const SingleBedIcon = ({ className = "w-4 h-4" }) => (
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

const DoubleBedIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 4v16M22 4v16M2 17h20" />
    <path d="M2 9h20M7 9v8M17 9v8" />
  </svg>
);

const WalletIcon = ({ className = "w-4 h-4" }) => (
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

const OwnerSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/owner/dashboard",
      altPath: "/dashboard",
      icon: FiHome,
    },
    {
      name: "My Hotel",
      path: "/owner/hotel",
      icon: BuildingHotelIcon,
    },
    {
      name: "Room Categories",
      path: "/owner/room-categories",
      icon: SingleBedIcon,
    },
    {
      name: "Rooms & Inventory",
      path: "/owner/rooms",
      icon: DoubleBedIcon,
    },
    {
      name: "Pricing & Tariffs",
      path: "/owner/pricing",
      icon: FiTag,
    },
    {
      name: "Bookings & Guests",
      path: "/owner/bookings",
      icon: FiCalendar,
    },
    {
      name: "Check-In / Check-Out",
      path: "/owner/check-in-out",
      icon: FiUserCheck,
    },
    {
      name: "Payouts & Settlements",
      path: "/owner/payouts",
      icon: WalletIcon,
    },
    {
      name: "Reports & Analytics",
      path: "/owner/reports",
      icon: FiBarChart2,
    },
    {
      name: "Notifications",
      path: "/owner/notifications",
      icon: FiBell,
      badge: 3,
    },
    {
      name: "Settings",
      path: "/owner/settings",
      icon: FiSettings,
    },
  ];

  const isActive = (item) => {
    if (item.name === "Dashboard") {
      return (
        location.pathname === "/owner/dashboard" ||
        location.pathname === "/owner" ||
        location.pathname === "/dashboard" ||
        location.pathname === "/"
      );
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Sidebar - STRICTLY NO SCROLLBAR (overflow-hidden) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-[230px] bg-[#111C35] text-white z-40 lg:z-30 flex flex-col justify-between transition-transform duration-300 ease-in-out select-none overflow-hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } shadow-xl border-r border-[#1B2947]`}
      >
        {/* 1. Distinct Brand Header Section with Official Logo (Same as Admin) */}
        <div className="h-[56px] px-3.5 flex items-center justify-between border-b border-[#1B2947] shrink-0">
          <Link
            to="/dashboard"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-2 group overflow-hidden"
            title="DevBhoomi Stay Owner"
          >
            {/* Official Logo from Admin */}
            <img
              src="/images/devbhoomi-official-logo.png"
              alt="DevBhoomi Logo"
              className="w-9 h-9 object-contain shrink-0 transition-transform group-hover:scale-105"
            />

            {/* Brand Text */}
            <div className="min-w-0">
              <span className="text-[15px] font-extrabold tracking-tight text-white leading-tight block">
                DevBhoomi Stay
              </span>
            </div>
          </Link>
        </div>

        {/* 2. Navigation Container - STRICTLY NO SCROLLBAR */}
        <div className="flex-1 flex flex-col pt-2 pb-1 px-3 overflow-hidden no-scrollbar">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`group flex items-center justify-between px-3 py-1.5 rounded-xl text-[12.5px] transition-all duration-150 ${
                    active
                      ? "bg-gradient-to-r from-[#FFD18A] to-[#FFA940] text-[#17233D] shadow-md shadow-orange-500/15 font-bold py-2"
                      : "text-[#B8C4D9] hover:bg-[#1B2947] hover:text-white font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        active
                          ? "text-[#17233D] stroke-[2.4]"
                          : "text-[#8DA0C2] group-hover:text-white"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="w-4 h-4 rounded-full bg-[#EF4444] text-white text-[9.5px] font-extrabold flex items-center justify-center leading-none shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 3. Bottom Mountain Image (Reduced height, perfectly seamless) */}
        <div className="relative w-full h-[110px] shrink-0 mt-auto overflow-hidden pointer-events-none select-none">
          <img
            src="/images/sidebar-mountain-footer.png"
            alt="Himalayan Sunset Ridge"
            className="w-full h-full object-cover object-bottom block"
          />

          {/* Smooth Fade Gradient from #111C35 at top into the mountain illustration */}
          <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#111C35] via-[#111C35]/60 to-transparent pointer-events-none" />
        </div>
      </aside>
    </>
  );
};

export default OwnerSidebar;
