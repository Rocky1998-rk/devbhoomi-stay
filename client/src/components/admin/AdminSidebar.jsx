import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiHome,
  FiBox,
  FiCalendar,
  FiClipboard,
  FiUsers,
  FiCreditCard,
  FiBarChart2,
  FiFileText,
  FiSettings,
  FiX,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: FiGrid },
  { name: "Hotels & Homestays", path: "/admin/hotels", icon: FiHome },
  { name: "Inventory", path: "/admin/inventory", icon: FiBox },
  { name: "Pricing & Calendar", path: "/admin/pricing", icon: FiCalendar },
  { name: "Bookings", path: "/admin/bookings", icon: FiClipboard },
  { name: "Users & Accounts", path: "/admin/users", icon: FiUsers },
  { name: "WhatsApp Bot", path: "/admin/whatsapp", icon: FaWhatsapp },
  { name: "Transactions", path: "/admin/transactions", icon: FiCreditCard },
  { name: "Reports & Analytics", path: "/admin/reports", icon: FiBarChart2 },
  { name: "CMS & Content", path: "/admin/cms", icon: FiFileText },
  { name: "Settings", path: "/admin/settings", icon: FiSettings },
];

const AdminSidebar = ({
  mobileOpen,
  setMobileOpen,
  collapsed = false,
  setCollapsed,
}) => {
  const location = useLocation();
  const { user } = useAuth();

  const adminName = user?.name || "Rocky";
  const userInitial = adminName.charAt(0).toUpperCase();

  const handleNavClick = () => {
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#072B22] text-white flex flex-col transition-[width] duration-300 ease-in-out font-['Inter'] shadow-2xl lg:shadow-none select-none overflow-x-hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "w-[68px]" : "w-[230px]"}`}
      >
        {/* Brand Header */}
        <div
          className={`h-[54px] px-3.5 flex items-center border-b border-[#0E4D3C]/50 transition-all shrink-0 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          <Link
            to="/admin/dashboard"
            onClick={handleNavClick}
            className="flex items-center gap-2.5 group overflow-hidden"
            title="DevBhoomi Stay Admin"
          >
            {/* Mountain Crest Icon */}
            <img
              src="/images/devbhoomi-official-logo.png"
              alt="DevBhoomi Logo"
              className="w-8 h-8 rounded-full object-contain shrink-0 group-hover:scale-105 transition-transform"
            />

            {/* Brand Text with Fluid Transition */}
            <div
              className={`min-w-0 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                collapsed
                  ? "opacity-0 w-0 max-w-0 -translate-x-2 pointer-events-none"
                  : "opacity-100 w-auto max-w-[170px] translate-x-0"
              }`}
            >
              <div className="text-white font-bold text-[14px] tracking-tight leading-tight truncate">
                DevBhoomi Stay
              </div>
              <div className="text-[9.5px] font-medium text-[#94A3B8] tracking-wider uppercase truncate">
                Lansdowne | Kotdwar
              </div>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#0E4D3C]/60 lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items (Covers space down to just above profile, zero scroll) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-1.5 space-y-1 no-scrollbar scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div
            className={`px-2.5 pt-0.5 pb-1 text-[9.5px] font-bold text-[#64748B] uppercase tracking-wider transition-all duration-300 whitespace-nowrap overflow-hidden ${
              collapsed ? "opacity-0 h-0 p-0 pointer-events-none" : "opacity-100 h-auto"
            }`}
          >
            Main Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path === "/admin/dashboard" &&
                (location.pathname === "/admin" ||
                  location.pathname === "/admin/"));

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleNavClick}
                title={collapsed ? item.name : undefined}
                className={`flex items-center rounded-xl text-[13px] font-medium transition-colors duration-150 group relative ${
                  collapsed
                    ? "justify-center w-9 h-9 mx-auto p-0"
                    : "gap-2.5 px-3 py-2"
                } ${
                  isActive
                    ? "bg-[#D97706] text-white shadow-sm font-semibold"
                    : "text-[#CBD5E1] hover:text-white hover:bg-[#0E4D3C]/50"
                }`}
              >
                <Icon
                  className={`w-[17px] h-[17px] shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? "text-white" : "text-[#94A3B8] group-hover:text-white"
                  }`}
                />

                {/* Nav item label with fluid transition */}
                <span
                  className={`truncate leading-none transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                    collapsed
                      ? "opacity-0 w-0 max-w-0 pointer-events-none"
                      : "opacity-100 w-auto max-w-[155px] translate-x-0"
                  }`}
                >
                  {item.name}
                </span>

                {isActive && !collapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-in fade-in duration-200" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Profile Section (Placed just below the menu with clean spacing) */}
        <div className="p-1.5 border-t border-[#0E4D3C]/60 bg-[#05231C] shrink-0">
          {collapsed ? (
            /* Collapsed Mode: Avatar and Expand Arrow stacked cleanly */
            <div className="flex flex-col items-center justify-center gap-1.5 py-1">
              <div
                className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0E4D3C] to-[#D97706] text-white font-bold flex items-center justify-center text-[11px] shrink-0 border border-[#D97706]/40 shadow-xs cursor-pointer hover:scale-105 transition-transform"
                title={`${adminName} (Super Admin)`}
                onClick={() => setCollapsed && setCollapsed(false)}
              >
                {userInitial}
              </div>

              <button
                onClick={() => setCollapsed && setCollapsed(false)}
                title="Expand sidebar"
                className="w-7 h-6 rounded-md flex items-center justify-center text-[#D97706] hover:text-white hover:bg-[#0E4D3C]/60 transition-colors cursor-pointer"
                aria-label="Expand sidebar"
              >
                <FiChevronsRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Expanded Mode: Avatar + Name + Super Admin badge + Collapse button */
            <div className="flex items-center justify-between p-1.5 gap-2 rounded-lg hover:bg-[#0E4D3C]/40 transition-colors">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0E4D3C] to-[#D97706] text-white font-bold flex items-center justify-center text-[11px] shrink-0 border border-[#D97706]/40 shadow-xs"
                  title={`${adminName} (Super Admin)`}
                >
                  {userInitial}
                </div>

                <div className="min-w-0 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden">
                  <div className="text-xs font-semibold text-white truncate leading-tight">
                    {adminName}
                  </div>
                  <div className="text-[10px] font-medium text-[#D97706] tracking-wide flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                    Super Admin
                  </div>
                </div>
              </div>

              {/* Collapse Button */}
              <button
                onClick={() => setCollapsed && setCollapsed(true)}
                title="Collapse sidebar"
                className="p-1 rounded-md text-[#94A3B8] hover:text-white hover:bg-[#0E4D3C]/60 transition-colors shrink-0 cursor-pointer"
                aria-label="Collapse sidebar"
              >
                <FiChevronsLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
