import React from "react";
import { Link } from "react-router-dom";
import { FiEye, FiArrowRight } from "react-icons/fi";

const recentBookingsData = [
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

const getStatusBadge = (status) => {
  switch (status) {
    case "Confirmed":
      return "bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]/20";
    case "Pending":
      return "bg-[#FEF3C7] text-[#D97706] border-[#D97706]/20";
    case "Cancelled":
      return "bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]/20";
    default:
      return "bg-[#F1F5F9] text-[#64748B] border-[#CBD5E1]";
  }
};

const RecentBookingsTable = ({ onSelectBooking }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between font-['Inter']">
      {/* Table Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
              Recent Bookings
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#ECF7F1] text-[#0E4D3C] font-bold text-xs">
              Live
            </span>
          </div>
          <p className="text-xs text-[#64748B] font-normal mt-0.5">
            Omni-channel reservations via WhatsApp & Web
          </p>
        </div>

        <Link
          to="/admin/bookings"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E4D3C] hover:text-[#072B22] hover:underline"
        >
          View All <FiArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table Container - Fits Naturally with Zero Scrollbar and Zero Wrapping */}
      <div className="overflow-x-auto no-scrollbar scrollbar-none">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-[#F8FAFC]">
              <th className="py-2.5 px-3 rounded-l-lg whitespace-nowrap">Booking ID</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Guest Name</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Hotel / Property</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Check-in / Stay</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Total / Advance</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Status</th>
              <th className="py-2.5 px-3 text-right rounded-r-lg whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-xs">
            {recentBookingsData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#F8FAFC] transition-colors group"
              >
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className="font-mono font-bold text-xs text-[#0E4D3C] bg-[#ECF7F1] px-2.5 py-1 rounded-md whitespace-nowrap border border-[#0E4D3C]/10">
                    {row.id}
                  </span>
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <div className="font-bold text-[#0F172A] whitespace-nowrap">
                    {row.guestName}
                  </div>
                  <div className="text-[11px] text-[#64748B] whitespace-nowrap">
                    {row.phone}
                  </div>
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <div className="font-semibold text-[#0F172A] whitespace-nowrap">
                    {row.hotel}
                  </div>
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <div className="text-xs font-medium text-[#0F172A] whitespace-nowrap">
                    {row.checkIn}
                  </div>
                  <div className="text-[11px] text-[#64748B] whitespace-nowrap">
                    {row.nights} {row.nights === 1 ? "Night" : "Nights"}
                  </div>
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <div className="font-bold text-[#0F172A] whitespace-nowrap">
                    {row.amount}
                  </div>
                  <div className="text-[11px] text-[#16A34A] font-semibold whitespace-nowrap">
                    Adv: {row.advance}
                  </div>
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${getStatusBadge(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => onSelectBooking && onSelectBooking(row)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#0E4D3C] hover:text-white text-[#475569] font-semibold text-xs border border-[#E2E8F0] hover:border-[#0E4D3C] transition-all whitespace-nowrap cursor-pointer shadow-2xs"
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
  );
};

export default RecentBookingsTable;
