import React, { useState } from "react";
import { FiX, FiCalendar, FiUser, FiPhone, FiMail, FiCheck } from "react-icons/fi";

const NewBookingModal = ({ isOpen, onClose, onBookingCreated }) => {
  const [formData, setFormData] = useState({
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    roomCategory: "Deluxe Room",
    checkIn: "2026-10-30",
    checkOut: "2026-11-01",
    totalAmount: "6000",
    advanceCollected: "1500",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onBookingCreated) {
      onBookingCreated({
        id: `DBS-${Math.floor(10000 + Math.random() * 90000)}`,
        guestName: formData.guestName || "Walk-In Guest",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        roomCategory: formData.roomCategory,
        stayDates: `${formData.checkIn.slice(5)} – ${formData.checkOut.slice(5)}`,
        amount: `₹ ${Number(formData.totalAmount).toLocaleString("en-IN")}`,
        paymentStatus: Number(formData.advanceCollected) >= Number(formData.totalAmount) ? "Paid" : "Partial",
        status: "Confirmed",
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-[#F8FAFF]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EFF4FF] text-[#3B6EF5] flex items-center justify-center font-bold">
              <FiCalendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#17233D]">Create New Walk-In Booking</h3>
              <p className="text-[11px] text-[#64748B]">Immediate counter registration for guests</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#17233D] font-semibold mb-1">Guest Full Name *</label>
              <input
                type="text"
                required
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="e.g. Vikram Rawat"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3B6EF5]"
              />
            </div>
            <div>
              <label className="block text-[#17233D] font-semibold mb-1">WhatsApp / Phone *</label>
              <input
                type="tel"
                required
                value={formData.guestPhone}
                onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3B6EF5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#17233D] font-semibold mb-1">Room Category</label>
              <select
                value={formData.roomCategory}
                onChange={(e) => setFormData({ ...formData, roomCategory: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3B6EF5] bg-white"
              >
                <option value="Deluxe Room">Deluxe Room (Max 2)</option>
                <option value="Family Suite">Family Suite (Max 4)</option>
                <option value="Cottage">Cottage (Max 3)</option>
              </select>
            </div>
            <div>
              <label className="block text-[#17233D] font-semibold mb-1">Total Room Tariff (₹) *</label>
              <input
                type="number"
                required
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                placeholder="6000"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3B6EF5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#17233D] font-semibold mb-1">Check-In Date</label>
              <input
                type="date"
                required
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3B6EF5]"
              />
            </div>
            <div>
              <label className="block text-[#17233D] font-semibold mb-1">Check-Out Date</label>
              <input
                type="date"
                required
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3B6EF5]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#17233D] font-semibold mb-1">Advance Collected at Counter (₹)</label>
            <input
              type="number"
              value={formData.advanceCollected}
              onChange={(e) => setFormData({ ...formData, advanceCollected: e.target.value })}
              placeholder="1500"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3B6EF5]"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#3B6EF5] hover:bg-[#2855D9] text-white font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <FiCheck className="w-4 h-4" />
              Confirm Walk-In Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBookingModal;

