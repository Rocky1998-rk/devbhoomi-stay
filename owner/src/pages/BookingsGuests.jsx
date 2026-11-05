import React, { useState } from "react";
import { FiCalendar, FiSearch, FiFilter, FiEye, FiDownload, FiPhone } from "react-icons/fi";
import BookingDetailsModal from "../components/modals/BookingDetailsModal";

const allBookings = [
  {
    id: "DBS-10458",
    guestName: "Amit Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    roomCategory: "Deluxe Room",
    stayDates: "29 Oct – 31 Oct",
    amount: "₹ 12,000",
    paymentStatus: "Paid",
    status: "Confirmed",
  },
  {
    id: "DBS-10457",
    guestName: "Priya Verma",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    roomCategory: "Family Suite",
    stayDates: "29 Oct – 01 Nov",
    amount: "₹ 18,000",
    paymentStatus: "Partial",
    status: "Checked-In",
  },
  {
    id: "DBS-10456",
    guestName: "Rahul Negi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    roomCategory: "Cottage",
    stayDates: "28 Oct – 30 Oct",
    amount: "₹ 15,000",
    paymentStatus: "Paid",
    status: "Checked-Out",
  },
  {
    id: "DBS-10455",
    guestName: "Neha Bisht",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    roomCategory: "Deluxe Room",
    stayDates: "30 Oct – 31 Oct",
    amount: "₹ 8,000",
    paymentStatus: "Pending",
    status: "Pending",
  },
  {
    id: "DBS-10454",
    guestName: "Kavita Rao",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop",
    roomCategory: "Family Suite",
    stayDates: "27 Oct – 29 Oct",
    amount: "₹ 13,500",
    paymentStatus: "Paid",
    status: "Completed",
  },
];

const BookingsGuests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filtered = allBookings.filter(
    (b) =>
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.roomCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#17233D] tracking-tight">
            Bookings & Guest Directory
          </h2>
          <p className="text-[#64748B] text-xs mt-0.5">
            Omni-channel reservations from WhatsApp Bot and Web Booking Engine.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search booking or guest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#3B6EF5]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E3E8F2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B]">
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Guest Information</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Stay Dates</th>
                <th className="py-3 px-4">Tariff</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-[#F8FAFF] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17233D]">{b.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={b.avatar} alt={b.guestName} className="w-8 h-8 rounded-full object-cover border" />
                      <div>
                        <span className="font-bold text-[#17233D] block">{b.guestName}</span>
                        <span className="text-[10px] text-[#64748B]">WhatsApp Verified</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#64748B] font-semibold">{b.roomCategory}</td>
                  <td className="py-3.5 px-4 text-[#17233D] font-medium">{b.stayDates}</td>
                  <td className="py-3.5 px-4 font-extrabold text-[#17233D]">{b.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F8F0] text-[#16A36A]">
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#EFF4FF] text-[#2563EB]">
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#3B6EF5] hover:bg-slate-100 transition-colors"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};

export default BookingsGuests;

