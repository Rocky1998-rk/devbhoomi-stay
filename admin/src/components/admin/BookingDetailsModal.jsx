import React from "react";
import {
  FiX,
  FiUser,
  FiPhone,
  FiCalendar,
  FiHome,
  FiCreditCard,
  FiCheckCircle,
  FiClock,
  FiDownload,
} from "react-icons/fi";

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const isConfirmed = booking.status === "Confirmed" || booking.status === "Check-in";
  const isPending = booking.status === "Pending" || booking.status === "Arriving";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-['Inter'] animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#072B22] text-white">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🛎️</span>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                Reservation Details
              </h3>
              <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
                Ref: {booking.id || "DBS-REV"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Guest Card */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0E4D3C] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {booking.guestName ? booking.guestName.charAt(0) : "G"}
              </div>
              <div>
                <div className="text-sm font-bold text-[#0F172A]">
                  {booking.guestName}
                </div>
                <div className="text-xs text-[#64748B] flex items-center gap-1.5 mt-0.5">
                  <FiPhone className="w-3 h-3 text-[#0E4D3C]" />
                  <span>{booking.phone || "+91 98765 43210"}</span>
                </div>
              </div>
            </div>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                isConfirmed
                  ? "bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20"
                  : isPending
                  ? "bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/20"
                  : "bg-[#FEE2E2] text-[#DC2626] border border-[#DC2626]/20"
              }`}
            >
              {booking.status}
            </span>
          </div>

          {/* Hotel & Stay Information */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Stay Itinerary
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]">
                <div className="text-[#64748B] flex items-center gap-1.5 mb-1 font-medium">
                  <FiHome className="w-3.5 h-3.5 text-[#0E4D3C]" />
                  Property
                </div>
                <div className="font-bold text-[#0F172A] truncate">
                  {booking.hotel}
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">
                  Lansdowne, Uttarakhand
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]">
                <div className="text-[#64748B] flex items-center gap-1.5 mb-1 font-medium">
                  <FiCalendar className="w-3.5 h-3.5 text-[#0E4D3C]" />
                  Dates
                </div>
                <div className="font-bold text-[#0F172A]">
                  {booking.checkIn || "26 Oct 2026"}
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">
                  Duration: {booking.nights || 2} Night(s)
                </div>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Financial Breakdown
            </div>
            <div className="p-4 rounded-xl bg-[#ECF7F1]/60 border border-[#0E4D3C]/20 space-y-2 text-xs">
              <div className="flex justify-between text-[#475569]">
                <span>Total Room Tariff</span>
                <span className="font-bold text-[#0F172A]">
                  {booking.amount || "₹6,000"}
                </span>
              </div>
              <div className="flex justify-between text-[#16A34A] font-medium">
                <span>Advance Paid (25% Token)</span>
                <span>
                  {booking.advance || "₹1,500"} (Razorpay Verified)
                </span>
              </div>
              <div className="pt-2 border-t border-[#0E4D3C]/20 flex justify-between font-bold text-[#0F172A] text-sm">
                <span>Balance Due at Hotel</span>
                <span className="text-[#D97706]">
                  {booking.balance || "₹4,500"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between gap-3">
          <button
            onClick={() => alert("Downloading PDF Voucher...")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#0E4D3C] text-[#0E4D3C] text-xs font-bold hover:bg-[#ECF7F1] transition-colors"
          >
            <FiDownload className="w-3.5 h-3.5" />
            Download Voucher
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#0E4D3C] text-white text-xs font-bold hover:bg-[#0A382C] transition-colors shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
