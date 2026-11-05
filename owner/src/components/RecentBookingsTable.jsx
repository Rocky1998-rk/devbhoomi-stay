import React from "react";
import { FiCalendar, FiEye, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const initialBookings = [
  {
    id: "DBS-10458",
    guestName: "Amit Sharma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    roomCategory: "Deluxe Room",
    stayDates: "29 Oct – 31 Oct",
    amount: "₹ 12,000",
    paymentStatus: "Paid",
    status: "Confirmed",
  },
  {
    id: "DBS-10457",
    guestName: "Priya Verma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    roomCategory: "Family Suite",
    stayDates: "29 Oct – 01 Nov",
    amount: "₹ 18,000",
    paymentStatus: "Partial",
    status: "Checked-In",
  },
  {
    id: "DBS-10456",
    guestName: "Rahul Negi",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=faces",
    roomCategory: "Cottage",
    stayDates: "28 Oct – 30 Oct",
    amount: "₹ 15,000",
    paymentStatus: "Paid",
    status: "Checked-Out",
  },
  {
    id: "DBS-10455",
    guestName: "Neha Bisht",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    roomCategory: "Deluxe Room",
    stayDates: "30 Oct – 31 Oct",
    amount: "₹ 8,000",
    paymentStatus: "Pending",
    status: "Pending",
  },
];

const RecentBookingsTable = ({ onViewBooking }) => {
  // Payment Badges matching reference image exactly
  const getPaymentBadge = (status) => {
    switch (status) {
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#16A34A] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
            Paid
          </span>
        );
      case "Partial":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFEDD5] text-[#D97706] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>
            Partial
          </span>
        );
      case "Pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
            Pending
          </span>
        );
    }
  };

  // Status Badges matching reference image exactly with consistent pill width
  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return (
          <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#DBEAFE] text-[#2563EB] whitespace-nowrap text-center min-w-[78px]">
            Confirmed
          </span>
        );
      case "Checked-In":
        return (
          <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#16A34A] whitespace-nowrap text-center min-w-[78px]">
            Checked-In
          </span>
        );
      case "Checked-Out":
        return (
          <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#F1F5F9] text-[#475569] whitespace-nowrap text-center min-w-[78px]">
            Checked-Out
          </span>
        );
      case "Pending":
      default:
        return (
          <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#D97706] whitespace-nowrap text-center min-w-[78px]">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between w-full overflow-hidden">
      {/* 1. Header: Outline Icon + Bold Title + View All */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <FiCalendar className="w-5 h-5 text-[#1E293B] shrink-0" />
          <h3 className="text-sm sm:text-[15.5px] font-bold text-[#1E293B] tracking-tight">
            Recent Bookings
          </h3>
        </div>

        <Link
          to="/bookings"
          className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 group transition-colors"
        >
          <span>View All</span>
          <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 2. Table with Capsule Header Bar & Matching Content Colors */}
      <div className="w-full overflow-hidden">
        <table className="w-full text-left text-xs table-fixed border-separate border-spacing-0">
          <colgroup>
            <col className="w-[12%]" /> {/* Booking ID */}
            <col className="w-[16%]" /> {/* Guest Name */}
            <col className="w-[14%]" /> {/* Room / Category */}
            <col className="w-[15%]" /> {/* Stay Dates */}
            <col className="w-[10%]" /> {/* Amount */}
            <col className="w-[11%]" /> {/* Payment */}
            <col className="w-[14%]" /> {/* Status */}
            <col className="w-[8%]" />  {/* Action */}
          </colgroup>
          <thead>
            <tr className="text-[11.5px] font-bold text-[#1E293B]">
              <th className="py-2.5 px-3 bg-[#F4F6FA] first:rounded-l-xl font-bold text-[#1E293B] whitespace-nowrap">
                Booking ID
              </th>
              <th className="py-2.5 px-3 bg-[#F4F6FA] font-bold text-[#1E293B] whitespace-nowrap">
                Guest Name
              </th>
              <th className="py-2.5 px-3 bg-[#F4F6FA] font-bold text-[#1E293B] whitespace-nowrap">
                Room / Category
              </th>
              <th className="py-2.5 px-3 bg-[#F4F6FA] font-bold text-[#1E293B] whitespace-nowrap">
                Stay Dates
              </th>
              <th className="py-2.5 px-3 bg-[#F4F6FA] font-bold text-[#1E293B] whitespace-nowrap">
                Amount
              </th>
              <th className="py-2.5 px-3 bg-[#F4F6FA] font-bold text-[#1E293B] whitespace-nowrap">
                Payment
              </th>
              <th className="py-2.5 px-3 bg-[#F4F6FA] font-bold text-[#1E293B] whitespace-nowrap">
                Status
              </th>
              <th className="py-2.5 px-2 bg-[#F4F6FA] last:rounded-r-xl font-bold text-[#1E293B] text-center whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {initialBookings.map((b) => (
              <tr
                key={b.id}
                className="border-b border-[#F4F6FA] hover:bg-[#F8FAFC] transition-colors"
              >
                {/* Booking ID - Dark bold text */}
                <td className="py-3.5 px-3 font-semibold text-[#1E293B] text-[12px] whitespace-nowrap border-b border-[#F4F6FA]">
                  {b.id}
                </td>

                {/* Guest Name & Avatar */}
                <td className="py-3.5 px-3 whitespace-nowrap border-b border-[#F4F6FA]">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={b.avatar}
                      alt={b.guestName}
                      className="w-7 h-7 rounded-full object-cover border border-[#E2E8F0] shrink-0"
                    />
                    <span className="font-semibold text-[#1E293B] text-[12.5px] truncate">
                      {b.guestName}
                    </span>
                  </div>
                </td>

                {/* Room / Category - Dark text matching image */}
                <td className="py-3.5 px-3 font-medium text-[#1E293B] text-[12px] whitespace-nowrap truncate border-b border-[#F4F6FA]">
                  {b.roomCategory}
                </td>

                {/* Stay Dates - Dark text matching image */}
                <td className="py-3.5 px-3 font-medium text-[#1E293B] text-[12px] whitespace-nowrap border-b border-[#F4F6FA]">
                  {b.stayDates}
                </td>

                {/* Amount - Dark bold text matching image */}
                <td className="py-3.5 px-3 font-bold text-[#1E293B] text-[12.5px] whitespace-nowrap border-b border-[#F4F6FA]">
                  {b.amount}
                </td>

                {/* Payment Badge */}
                <td className="py-3.5 px-3 whitespace-nowrap border-b border-[#F4F6FA]">
                  {getPaymentBadge(b.paymentStatus)}
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-3 whitespace-nowrap border-b border-[#F4F6FA]">
                  {getStatusBadge(b.status)}
                </td>

                {/* Action Icon - Clean dark eye outline icon centered with plenty of space */}
                <td className="py-3.5 px-2 text-center whitespace-nowrap border-b border-[#F4F6FA]">
                  <button
                    onClick={() => onViewBooking && onViewBooking(b)}
                    className="w-7 h-7 text-[#1E293B] hover:text-[#2563EB] hover:scale-110 flex items-center justify-center mx-auto transition-all cursor-pointer"
                    title="View Details"
                  >
                    <FiEye className="w-4.5 h-4.5 text-[#1E293B]" />
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
