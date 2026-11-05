import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  FiBell,
  FiX,
  FiCheck,
  FiCalendar,
  FiClock,
  FiCreditCard,
  FiCheckCircle,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";

export const initialNotifications = [
  {
    id: 1,
    title: "New WhatsApp Booking Received",
    desc: "Amit Sharma booked Deluxe Room for 29 Oct – 31 Oct. ₹1,500 advance deposit captured via Razorpay.",
    time: "5m ago",
    category: "bookings",
    tag: "Booking #DBS-10458",
    icon: FiCalendar,
    iconColor: "text-[#16A36A]",
    iconBg: "bg-[#E8F8F0]",
    unread: true,
  },
  {
    id: 2,
    title: "Guest Arrival Due Today",
    desc: "Priya Verma (Family Suite) is scheduled to check-in around 02:00 PM today.",
    time: "35m ago",
    category: "bookings",
    tag: "Arrival",
    icon: FiClock,
    iconColor: "text-[#3B6EF5]",
    iconBg: "bg-[#EFF4FF]",
    unread: true,
  },
  {
    id: 3,
    title: "Advance Settlement Dispatched",
    desc: "₹42,500 weekly bank payout successfully transferred to HDFC Bank A/c ending 4821.",
    time: "2h ago",
    category: "payouts",
    tag: "Bank Payout",
    icon: FiCreditCard,
    iconColor: "text-[#7C3AED]",
    iconBg: "bg-[#EDE9FE]",
    unread: true,
  },
  {
    id: 4,
    title: "Weekend Dynamic Tariff Active",
    desc: "15% seasonal surge tariff is active for upcoming Friday-Sunday bookings across all categories.",
    time: "1d ago",
    category: "pricing",
    tag: "Surge Tariff",
    icon: FiTrendingUp,
    iconColor: "text-[#D97706]",
    iconBg: "bg-[#FFF3E5]",
    unread: false,
  },
  {
    id: 5,
    title: "Room 204 Cleaned & Ready",
    desc: "Housekeeping completed inspection for Deluxe Room 204. Ready for instant walk-in assignment.",
    time: "1d ago",
    category: "operations",
    tag: "Inventory",
    icon: FiCheckCircle,
    iconColor: "text-[#475569]",
    iconBg: "bg-[#F1F5F9]",
    unread: false,
  },
];

const OwnerNotificationDrawer = ({
  isOpen,
  onClose,
  notifications = initialNotifications,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  const [filterType, setFilterType] = useState("all");

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === "unread") return n.unread;
    if (filterType === "bookings") return n.category === "bookings";
    if (filterType === "payouts") return n.category === "payouts";
    return true;
  });

  const isOwnerPrefix =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/owner");
  const fullNotificationsPath = isOwnerPrefix
    ? "/owner/notifications"
    : "/notifications";

  const content = (
    <>
      {/* 1. Backdrop Overlay covering entire viewport (including left sidebar) */}
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-xs z-[60] transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Slide-Over Right Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out font-['Inter',_sans-serif] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Notifications Drawer"
      >
        {/* Drawer Header */}
        <div className="h-[72px] px-5 sm:px-6 border-b border-[#E2E8F0] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EFF4FF] flex items-center justify-center text-[#3B6EF5] shrink-0">
              <FiBell className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-[15.5px] font-bold text-[#17233D] leading-tight flex items-center gap-2">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#EFF4FF] text-[#3B6EF5] text-[11px] font-bold">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <div className="text-[11px] text-[#64748B] mt-0.5">
                Real-time WhatsApp & guest alerts
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#17233D] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            aria-label="Close notifications drawer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 sm:px-6 py-2.5 border-b border-[#F1F5F9] bg-[#F8FAFC] flex items-center gap-2 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              filterType === "all"
                ? "bg-[#3B6EF5] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#17233D] bg-white border border-[#E2E8F0]"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilterType("unread")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              filterType === "unread"
                ? "bg-[#3B6EF5] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#17233D] bg-white border border-[#E2E8F0]"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilterType("bookings")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              filterType === "bookings"
                ? "bg-[#3B6EF5] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#17233D] bg-white border border-[#E2E8F0]"
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setFilterType("payouts")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              filterType === "payouts"
                ? "bg-[#3B6EF5] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#17233D] bg-white border border-[#E2E8F0]"
            }`}
          >
            Payouts
          </button>
        </div>

        {/* Scrollable Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#F1F5F9] p-3 sm:p-4 space-y-1">
          {filteredNotifications.length === 0 ? (
            <div className="py-16 text-center text-[#64748B]">
              <FiBell className="w-8 h-8 mx-auto text-[#CBD5E1] mb-2" />
              <p className="text-sm font-semibold text-[#17233D]">No notifications</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  onClick={() => onNotificationClick && onNotificationClick(n.id)}
                  className={`p-3.5 rounded-xl transition-all cursor-pointer flex items-start gap-3 group ${
                    n.unread
                      ? "bg-[#EFF4FF]/30 hover:bg-[#EFF4FF]/50 border border-[#DBEAFE]/60"
                      : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.iconBg} ${n.iconColor} group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  {/* Body */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`text-[12.5px] leading-tight truncate ${
                          n.unread
                            ? "font-bold text-[#17233D]"
                            : "font-semibold text-[#334155]"
                        }`}
                      >
                        {n.title}
                      </h4>
                      {n.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#3B6EF5] shrink-0"></span>
                      )}
                    </div>
                    <p className="text-[11.5px] text-[#475569] mt-1 leading-relaxed">
                      {n.desc}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-[#E2E8F0] text-[#64748B]">
                        {n.tag}
                      </span>
                      <span className="text-[10.5px] text-[#94A3B8] font-medium">
                        {n.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#E2E8F0] bg-white flex items-center justify-between shrink-0">
          <button
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
            className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${
              unreadCount > 0
                ? "text-[#3B6EF5] hover:text-[#1D4ED8] cursor-pointer"
                : "text-[#94A3B8] cursor-not-allowed"
            }`}
          >
            <FiCheck className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>

          <Link
            to={fullNotificationsPath}
            onClick={onClose}
            className="text-xs font-bold text-[#17233D] hover:text-[#3B6EF5] flex items-center gap-1 transition-colors group"
          >
            <span>View All</span>
            <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </aside>
    </>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
};

export default OwnerNotificationDrawer;
