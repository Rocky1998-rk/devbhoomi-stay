import React from "react";
import { FiX, FiUser, FiPhone, FiCalendar, FiDollarSign, FiFileText, FiCheckCircle } from "react-icons/fi";

const BookingDetailsModal = ({ booking, isOpen, onClose, onUpdateStatus }) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-[#F8FAFF]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EFF4FF] text-[#3B6EF5] flex items-center justify-center font-bold">
              <FiFileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#17233D]">
                Booking Reference: {booking.id}
              </h3>
              <p className="text-[11px] text-[#64748B]">DevBhoomi Stay Verified Guest</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Guest Card */}
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <img
              src={booking.avatar}
              alt={booking.guestName}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <div className="flex-1">
              <h4 className="font-bold text-[#17233D] text-sm">{booking.guestName}</h4>
              <p className="text-[11px] text-[#64748B] flex items-center gap-1.5 mt-0.5">
                <FiPhone className="w-3 h-3 text-[#16A36A]" />
                +91 98765 43210 (WhatsApp Connected)
              </p>
            </div>
            <a
              href={`https://wa.me/919876543210?text=Hello%20${encodeURIComponent(booking.guestName)},%20greetings%20from%20The%20Pine%20Retreat!`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-[#16A36A] hover:bg-[#128354] text-white rounded-lg font-bold flex items-center gap-1 shadow-xs transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <span className="text-[#64748B] font-medium block">Room Category</span>
              <span className="font-bold text-[#17233D] text-sm mt-0.5 block">{booking.roomCategory}</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <span className="text-[#64748B] font-medium block">Stay Dates</span>
              <span className="font-bold text-[#17233D] text-sm mt-0.5 block">{booking.stayDates}</span>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#64748B]">Total Room Tariff:</span>
              <span className="font-bold text-[#17233D]">{booking.amount}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#64748B]">25% Online Advance (Razorpay):</span>
              <span className="font-bold text-emerald-600">
                {booking.paymentStatus === "Paid" ? "100% Settled" : "₹ 1,500 Received"}
              </span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between items-center font-bold text-xs">
              <span className="text-amber-700">Remaining Balance Due at Counter:</span>
              <span className="text-red-600 font-extrabold text-sm">
                {booking.paymentStatus === "Paid" ? "₹ 0 (Fully Paid)" : "₹ 4,500"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => alert("Downloading PDF Voucher for " + booking.id)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <FiFileText className="w-4 h-4 text-[#3B6EF5]" />
              Download Voucher
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (onUpdateStatus) onUpdateStatus(booking.id, "Checked-In");
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-[#16A36A] hover:bg-[#128354] text-white font-bold transition-all shadow-xs"
              >
                Mark Checked-In
              </button>
              <button
                onClick={() => {
                  if (onUpdateStatus) onUpdateStatus(booking.id, "Checked-Out");
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-[#17233D] hover:bg-slate-800 text-white font-bold transition-all shadow-xs"
              >
                Complete Check-Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
