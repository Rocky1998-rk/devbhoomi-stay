import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiCalendar, FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import OwnerNotificationDrawer, { initialNotifications } from "./OwnerNotificationDrawer";

const OwnerHeroBanner = ({ onMenuClick }) => {
  const { user, selectedHotel, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const profileRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const firstName = user?.name ? user.name.split(" ")[0] : "Rocky";
  const fullName = user?.name || "Rocky Kumar";
  const hotelName = selectedHotel?.name || "The Pine Retreat";

  const isOwnerPrefix = typeof window !== "undefined" && window.location.pathname.startsWith("/owner");
  const hotelPath = isOwnerPrefix ? "/owner/hotel" : "/hotel";
  const settingsPath = isOwnerPrefix ? "/owner/settings" : "/settings";

  return (
    <div className="relative z-30 w-full h-[68px] sm:h-[71px] lg:h-[73px] select-none shadow-xs">
      {/* Background Mountain Panoramic Banner Image (Exact from user reference) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/images/himalayan_hero_banner.png')`,
        }}
      />

      {/* Main Header Row */}
      <div className="relative z-10 h-full flex items-center justify-between px-3 sm:px-3.5">
        {/* Left Greeting & Subtitle */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Open navigation menu"
            >
              <FiMenu className="w-4 h-4" />
            </button>
          )}

          <div>
            <h1 className="text-[16px] sm:text-[18px] lg:text-[19px] font-bold text-white tracking-tight leading-tight flex items-center gap-2 drop-shadow-sm">
              <span>Good Afternoon, {firstName}</span>
              <span className="inline-block text-base sm:text-lg animate-bounce-subtle cursor-default">
                👋
              </span>
            </h1>
            <p className="text-[11px] sm:text-[11.5px] text-white/90 mt-0.5 font-normal tracking-normal drop-shadow-xs">
              Here's what's happening at <span className="font-bold text-white">{hotelName}</span> today.
            </p>
          </div>
        </div>

        {/* Right Controls: Date Pill, Notification Bell & Profile Badge (Matching User Reference Image Exactly) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Date Pill with Calendar Icon */}
          <div className="hidden md:flex items-center gap-2 bg-white hover:bg-slate-50 text-[#1E293B] px-3.5 py-1.5 rounded-lg text-[12px] font-semibold shadow-xs border border-white/80 transition-all cursor-pointer">
            <FiCalendar className="w-3.5 h-3.5 text-[#1E293B]" />
            <span>Wed, 29 Oct 2026</span>
            <FiChevronDown className="w-3.5 h-3.5 text-[#1E293B]" />
          </div>

          {/* Notification Bell with Red Badge & Slide-over Drawer Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(true)}
              className="w-8.5 h-8.5 rounded-full bg-white hover:bg-slate-50 text-[#1E293B] flex items-center justify-center shadow-xs border border-white/80 transition-all relative cursor-pointer"
              aria-label="Open notifications drawer"
            >
              <FiBell className="w-4 h-4 text-[#1E293B]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white"></span>
              )}
            </button>
          </div>

          {/* Profile Section (Vibrant Blue Avatar circle + Name/Role beside it) */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex items-center gap-2.5 cursor-pointer focus:outline-hidden py-1 px-1.5 rounded-xl hover:bg-white/20 transition-all"
            >
              {/* Initials Avatar - Vibrant Royal Blue */}
              <div className="w-8.5 h-8.5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-[12px] font-bold tracking-tight shadow-xs shrink-0 select-none">
                RK
              </div>

              {/* Name & Role */}
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[12.5px] font-bold text-[#0F172A] leading-tight">
                  {fullName}
                </span>
                <div className="flex items-center gap-1 text-[10.5px] font-medium text-[#475569] leading-tight mt-0.5">
                  <span>Property Owner</span>
                  <FiChevronDown className={`w-3 h-3 text-[#475569] transition-transform duration-200 ${showProfileMenu ? "rotate-180" : ""}`} />
                </div>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 text-xs">
                <div className="px-3.5 py-2.5 border-b border-slate-100">
                  <p className="font-bold text-[#17233D]">{fullName}</p>
                  <p className="text-[11px] text-[#64748B] truncate">{user?.email || "owner@devbhoomistay.com"}</p>
                </div>
                <Link
                  to={hotelPath}
                  className="block px-3.5 py-2 text-[#334155] hover:bg-slate-50 hover:text-[#3B6EF5] font-medium transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Manage Hotel Profile
                </Link>
                <Link
                  to={settingsPath}
                  className="block px-3.5 py-2 text-[#334155] hover:bg-slate-50 hover:text-[#3B6EF5] font-medium transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Account Settings
                </Link>
                <div className="border-t border-slate-100 my-1"></div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (logout) logout();
                  }}
                  className="w-full text-left px-3.5 py-2 text-[#EF4444] hover:bg-red-50 font-semibold cursor-pointer transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Smooth Slide-over Right Notifications Drawer */}
      <OwnerNotificationDrawer
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onNotificationClick={handleNotificationClick}
      />
    </div>
  );
};

export default OwnerHeroBanner;
