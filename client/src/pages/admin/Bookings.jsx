import React, { useState } from "react";
import { FiClipboard, FiSearch, FiFilter, FiDownload, FiEye } from "react-icons/fi";
import BookingDetailsModal from "../../components/admin/BookingDetailsModal";

const allBookings = [
  {
    id: "DBS12658",
    guestName: "Priya Rawat",
    phone: "+91 98765 43210",
    hotel: "Green Valley Residency",
    amount: "₹6,000",
    advance: "₹1,500",
    balance: "₹4,500",
    checkIn: "28 Oct 2026",
    nights: 2,
    status: "Confirmed",
  },
  {
    id: "DBS12657",
    guestName: "Aman Joshi",
    phone: "+91 98234 56781",
    hotel: "Lansdowne Heights",
    amount: "₹3,200",
    advance: "₹800",
    balance: "₹2,400",
    checkIn: "29 Oct 2026",
    nights: 1,
    status: "Confirmed",
  },
  {
    id: "DBS12656",
    guestName: "Rahul Negi",
    phone: "+91 98345 67892",
    hotel: "Mountain View Retreat",
    amount: "₹9,600",
    advance: "₹2,400",
    balance: "₹7,200",
    checkIn: "30 Oct 2026",
    nights: 3,
    status: "Pending",
  },
  {
    id: "DBS12655",
    guestName: "Anjali Thapa",
    phone: "+91 98456 78903",
    hotel: "Oak Wood Homestay",
    amount: "₹4,500",
    advance: "₹1,125",
    balance: "₹3,375",
    checkIn: "31 Oct 2026",
    nights: 1,
    status: "Confirmed",
  },
  {
    id: "DBS12654",
    guestName: "Deepankar Roy",
    phone: "+91 98567 89014",
    hotel: "Hilltop Cottages",
    amount: "₹7,000",
    advance: "₹0",
    balance: "₹7,000",
    checkIn: "01 Nov 2026",
    nights: 2,
    status: "Cancelled",
  },
];

const Bookings = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <div className="space-y-4 md:space-y-5 font-['Inter']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
            Bookings & Reservations
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            All online and WhatsApp guest bookings across Uttarakhand properties
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#087F5B] text-[#087F5B] text-xs font-bold hover:bg-[#ECF7F1] transition-colors shadow-xs cursor-pointer shrink-0">
          <FiDownload className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Bookings Table: Unbroken horizontal single-line alignment with slim bottom scrollbar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto slim-scrollbar pb-0.5">
          <table className="w-full min-w-[820px] text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-3.5 text-left whitespace-nowrap">Booking Ref</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Guest Details</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Hotel Property</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Check-in</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Total Amount</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Advance (25%)</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">Status</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {allBookings.map((b) => (
                <tr key={b.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  {/* Booking Ref */}
                  <td className="py-3 px-3.5 font-mono font-bold text-[#087F5B] whitespace-nowrap">
                    {b.id}
                  </td>

                  {/* Guest Details */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="block font-semibold text-[#0F172A] whitespace-nowrap">
                      {b.guestName}
                    </span>
                    <span className="text-[11px] text-[#64748B] font-normal whitespace-nowrap block mt-0.5">
                      {b.phone}
                    </span>
                  </td>

                  {/* Hotel Property */}
                  <td className="py-3 px-3 text-[#475569] font-medium whitespace-nowrap">
                    {b.hotel}
                  </td>

                  {/* Check-in */}
                  <td className="py-3 px-3 text-[#64748B] whitespace-nowrap">
                    <span className="whitespace-nowrap">{b.checkIn}</span>
                    <span className="text-[11px] text-[#94A3B8] ml-1">({b.nights}n)</span>
                  </td>

                  {/* Total Amount */}
                  <td className="py-3 px-3 font-bold text-[#0F172A] whitespace-nowrap">
                    {b.amount}
                  </td>

                  {/* Advance */}
                  <td className="py-3 px-3 text-[#16A34A] font-semibold whitespace-nowrap">
                    {b.advance}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap inline-flex items-center ${
                        b.status === "Confirmed"
                          ? "bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]/20"
                          : b.status === "Pending"
                          ? "bg-[#FEF3C7] text-[#D97706] border-[#D97706]/20"
                          : "bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]/20"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F1F5F9] hover:bg-[#087F5B] hover:text-white text-[#475569] font-medium text-xs transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <FiEye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default Bookings;
