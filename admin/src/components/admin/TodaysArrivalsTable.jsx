import React from "react";
import { Link } from "react-router-dom";
import { FiEye, FiArrowRight } from "react-icons/fi";

const arrivalsData = [
  {
    id: "ARR-01",
    guestName: "Amit Sharma",
    phone: "+91 98112 34567",
    hotel: "The Oak Resort",
    checkIn: "26 Oct 2026",
    nights: 2,
    amount: "₹7,200",
    advance: "₹1,800",
    balance: "₹5,400",
    status: "Arriving",
  },
  {
    id: "ARR-02",
    guestName: "Sneha Verma",
    phone: "+91 99234 56789",
    hotel: "Lansdowne Hills",
    checkIn: "26 Oct 2026",
    nights: 3,
    amount: "₹9,600",
    advance: "₹2,400",
    balance: "₹7,200",
    status: "Arriving",
  },
  {
    id: "ARR-03",
    guestName: "Rohit Mehta",
    phone: "+91 97345 67890",
    hotel: "Pine View Homestay",
    checkIn: "26 Oct 2026",
    nights: 1,
    amount: "₹2,800",
    advance: "₹700",
    balance: "₹2,100",
    status: "Check-in",
  },
  {
    id: "ARR-04",
    guestName: "Neha Gupta",
    phone: "+91 98456 78901",
    hotel: "Cloud 9 Resort",
    checkIn: "26 Oct 2026",
    nights: 2,
    amount: "₹6,400",
    advance: "₹1,600",
    balance: "₹4,800",
    status: "Check-in",
  },
  {
    id: "ARR-05",
    guestName: "Vikram Singh",
    phone: "+91 96567 89012",
    hotel: "Valley View Stay",
    checkIn: "26 Oct 2026",
    nights: 2,
    amount: "₹5,600",
    advance: "₹1,400",
    balance: "₹4,200",
    status: "Pending",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Arriving":
      return "bg-[#DBEAFE] text-[#2563EB] border-[#2563EB]/20";
    case "Check-in":
      return "bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]/20";
    case "Pending":
      return "bg-[#FEF3C7] text-[#D97706] border-[#D97706]/20";
    default:
      return "bg-[#F1F5F9] text-[#64748B] border-[#CBD5E1]";
  }
};

const TodaysArrivalsTable = ({ onSelectBooking }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between font-['Inter']">
      {/* Table Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
              Today's Arrivals
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#ECF7F1] text-[#0E4D3C] font-bold text-xs">
              8
            </span>
          </div>
          <p className="text-xs text-[#64748B] font-normal mt-0.5">
            Guests scheduled to check in today (26 Oct)
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
              <th className="py-2.5 px-3 rounded-l-lg whitespace-nowrap">Guest Name</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Hotel / Property</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Check-in Date</th>
              <th className="py-2.5 px-3 text-center whitespace-nowrap">Duration</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Total / Advance</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Status</th>
              <th className="py-2.5 px-3 text-right rounded-r-lg whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-xs">
            {arrivalsData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#F8FAFC] transition-colors group"
              >
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
                <td className="py-2.5 px-3 text-[#64748B] whitespace-nowrap font-medium">
                  {row.checkIn}
                </td>
                <td className="py-2.5 px-3 text-center whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] text-xs font-semibold whitespace-nowrap">
                    {row.nights} {row.nights === 1 ? "Night" : "Nights"}
                  </span>
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

export default TodaysArrivalsTable;
