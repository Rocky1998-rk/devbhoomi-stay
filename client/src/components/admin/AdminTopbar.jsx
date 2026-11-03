import { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiBell,
  FiMapPin,
  FiChevronDown,
  FiMenu,
  FiUser,
  FiSettings,
  FiLogOut,
  FiCheckCircle,
  FiCreditCard,
  FiCalendar,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const notificationsList = [
  {
    id: 1,
    title: "New WhatsApp Booking",
    desc: "Priya Rawat booked Deluxe Room at Green Valley Resort",
    time: "5m ago",
    tag: "Lansdowne",
    icon: FiCalendar,
    color: "text-[#16A34A] bg-[#DCFCE7]",
    unread: true,
  },
  {
    id: 2,
    title: "Advance Deposit Paid",
    desc: "₹1,500 token captured via Razorpay for DBS12658",
    time: "18m ago",
    tag: "Kotdwar",
    icon: FiCreditCard,
    color: "text-[#D97706] bg-[#FEF3C7]",
    unread: true,
  },
  {
    id: 3,
    title: "Room 301 Locked",
    desc: "Walk-in lock updated for Lansdowne Heights",
    time: "1h ago",
    tag: "Inventory",
    icon: FiCheckCircle,
    color: "text-[#2563EB] bg-[#DBEAFE]",
    unread: true,
  },
  {
    id: 4,
    title: "Guest Check-in Due",
    desc: "Amit Sharma arriving today at The Oak Resort (2 nights)",
    time: "2h ago",
    tag: "Arrival",
    icon: FiCalendar,
    color: "text-[#0E4D3C] bg-[#ECF7F1]",
    unread: false,
  },
  {
    id: 5,
    title: "Owner Settlement Ready",
    desc: "Weekly payout of ₹1,24,000 verified for 4 homestays",
    time: "5h ago",
    tag: "Payouts",
    icon: FiCreditCard,
    color: "text-[#7C3AED] bg-[#EDE9FE]",
    unread: false,
  },
];

const AdminTopbar = ({
  onMenuClick,
  selectedLocation,
  setSelectedLocation,
}) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");

  const locationRef = useRef(null);
  const profileRef = useRef(null);

  const adminName = user?.name || "Rocky";
  const userInitial = adminName.charAt(0).toUpperCase();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scroll when notification drawer is open on mobile
  useEffect(() => {
    if (notificationsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [notificationsOpen]);

  const locations = ["All Locations", "Lansdowne", "Kotdwar"];

  return (
    <>
      <header className="sticky top-0 z-30 h-[70px] bg-white border-b border-[#E2E8F0] px-5 sm:px-7 lg:px-4 flex items-center justify-between gap-6 md:gap-10 font-['Inter'] shadow-xs">
        {/* Left: Search Input (Fixed max-width with ample separation) */}
        <div className="flex items-center gap-3 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] shrink-0">
          {/* Mobile menu trigger */}
          <button
            onClick={onMenuClick}
            className="p-2 -ml-1 text-[#475569] hover:text-[#0E4D3C] hover:bg-[#F1F5F9] rounded-lg lg:hidden transition-colors"
            aria-label="Toggle mobile menu"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          {/* Search Bar Input */}
          <div className="relative w-full">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hotels, bookings, users..."
              className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl placeholder-[#94A3B8] text-[#0F172A] focus:outline-none focus:border-[#0E4D3C] focus:bg-white focus:ring-2 focus:ring-[#0E4D3C]/10 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Right Controls (Separated with ml-auto and shrink-0) */}
        <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4 shrink-0 ml-auto">
          {/* Location Dropdown */}
          <div className="relative" ref={locationRef}>
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-xs font-semibold text-[#0F172A] transition-colors shadow-2xs cursor-pointer"
            >
              <FiMapPin className="w-3.5 h-3.5 text-[#0E4D3C]" />
              <span className="hidden sm:inline">
                {selectedLocation || "All Locations"}
              </span>
              <FiChevronDown
                className={`w-3.5 h-3.5 text-[#64748B] transition-transform duration-200 ${
                  locationOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {locationOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-[#E2E8F0] py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#94A3B8] uppercase">
                  Filter by Region
                </div>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      if (setSelectedLocation) setSelectedLocation(loc);
                      setLocationOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#F8FAFC] transition-colors ${
                      (selectedLocation || "All Locations") === loc
                        ? "text-[#0E4D3C] font-semibold bg-[#ECF7F1]"
                        : "text-[#475569]"
                    }`}
                  >
                    {loc}
                    {(selectedLocation || "All Locations") === loc && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3C]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell Trigger Button */}
          <button
            onClick={() => setNotificationsOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] hover:text-[#0E4D3C] transition-colors shadow-2xs cursor-pointer"
            aria-label="Open notifications drawer"
          >
            <FiBell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
              3
            </span>
          </button>

          {/* Admin Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 h-10 pl-2 pr-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors shadow-2xs cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0E4D3C] to-[#D97706] text-white font-bold flex items-center justify-center text-xs shadow-xs border border-[#D97706]/40 shrink-0">
                {userInitial}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-[#0F172A] leading-tight truncate max-w-[100px]">
                  {adminName}
                </div>
                <div className="text-[10px] font-medium text-[#D97706] tracking-wide leading-none mt-0.5">
                  Super Admin
                </div>
              </div>
              <FiChevronDown
                className={`w-3.5 h-3.5 text-[#64748B] transition-transform duration-200 hidden sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-[#E2E8F0] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2.5 border-b border-[#E2E8F0]">
                  <div className="text-sm font-bold text-[#0F172A] truncate">
                    {adminName}
                  </div>
                  <div className="text-xs text-[#64748B] truncate">
                    {user?.email || "admin@devbhoomistay.com"}
                  </div>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="w-full text-left px-4 py-2 text-xs text-[#334155] hover:bg-[#F8FAFC] flex items-center gap-2.5 transition-colors font-medium cursor-pointer"
                  >
                    <FiUser className="w-3.5 h-3.5 text-[#64748B]" />
                    Admin Profile
                  </button>
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="w-full text-left px-4 py-2 text-xs text-[#334155] hover:bg-[#F8FAFC] flex items-center gap-2.5 transition-colors font-medium cursor-pointer"
                  >
                    <FiSettings className="w-3.5 h-3.5 text-[#64748B]" />
                    System Settings
                  </button>
                </div>
                <div className="border-t border-[#E2E8F0] pt-1">
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors font-semibold cursor-pointer"
                  >
                    <FiLogOut className="w-3.5 h-3.5 text-red-500" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* NOTIFICATIONS RIGHT SIDEBAR DRAWER WITH SMOOTH SLIDE-OVER */}
      {/* ======================================================== */}

      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300 ease-in-out ${
          notificationsOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setNotificationsOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Slide-Over Right Sidebar Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out font-['Inter'] ${
          notificationsOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Notifications Drawer"
      >
        {/* Right Drawer Header */}
        <div className="h-[70px] px-6 border-b border-[#E2E8F0] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ECF7F1] flex items-center justify-center text-[#0E4D3C]">
              <FiBell className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-bold text-[#0F172A] leading-tight flex items-center gap-2">
                Notifications
                <span className="px-2 py-0.5 rounded-full bg-[#ECF7F1] text-[#0E4D3C] text-[11px] font-semibold">
                  3 New
                </span>
              </div>
              <div className="text-[11px] text-[#64748B] mt-0.5">
                Real-time WhatsApp & Booking Updates
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setNotificationsOpen(false)}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            aria-label="Close notifications drawer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-6 py-3 border-b border-[#F1F5F9] bg-[#F8FAFC] flex items-center gap-2 shrink-0">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === "all"
                ? "bg-[#0E4D3C] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A] bg-white border border-[#E2E8F0]"
            }`}
          >
            All (5)
          </button>
          <button
            onClick={() => setFilterType("unread")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === "unread"
                ? "bg-[#0E4D3C] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A] bg-white border border-[#E2E8F0]"
            }`}
          >
            Unread (3)
          </button>
          <button
            onClick={() => setFilterType("bookings")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === "bookings"
                ? "bg-[#0E4D3C] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#0F172A] bg-white border border-[#E2E8F0]"
            }`}
          >
            Bookings
          </button>
        </div>

        {/* Notifications Scrollable List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#F1F5F9] p-2">
          {notificationsList
            .filter((notif) => {
              if (filterType === "unread") return notif.unread;
              if (filterType === "bookings")
                return (
                  notif.tag === "Lansdowne" ||
                  notif.tag === "Arrival" ||
                  notif.tag === "Kotdwar"
                );
              return true;
            })
            .map((notif) => {
              const Icon = notif.icon;
              return (
                <div
                  key={notif.id}
                  className={`p-4 rounded-xl hover:bg-[#F8FAFC] transition-all cursor-pointer flex gap-3.5 items-start relative group my-0.5 ${
                    notif.unread ? "bg-[#F8FAF9]/80" : ""
                  }`}
                >
                  {/* Icon badge */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${notif.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#0F172A] leading-tight">
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-[#94A3B8] font-medium shrink-0">
                        {notif.time}
                      </span>
                    </div>

                    <p className="text-xs text-[#475569] mt-1 leading-snug">
                      {notif.desc}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-[#0E4D3C] bg-[#ECF7F1] px-2 py-0.5 rounded-md">
                        {notif.tag}
                      </span>
                      {notif.unread && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Right Drawer Footer */}
        <div className="p-4 border-t border-[#E2E8F0] bg-white flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => setNotificationsOpen(false)}
            className="flex-1 py-2.5 px-3 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FiCheck className="w-3.5 h-3.5" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={() => setNotificationsOpen(false)}
            className="py-2.5 px-4 rounded-xl bg-[#0E4D3C] hover:bg-[#072B22] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminTopbar;
