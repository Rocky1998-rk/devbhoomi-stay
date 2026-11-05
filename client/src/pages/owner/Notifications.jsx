import React from "react";
import { FiBell, FiCheck, FiCalendar, FiDollarSign } from "react-icons/fi";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New WhatsApp Booking Received",
      desc: "Amit Sharma booked Deluxe Room for 29 Oct – 31 Oct. 25% Advance (₹1,500) captured via Razorpay.",
      time: "20 mins ago",
      unread: true,
    },
    {
      id: 2,
      title: "Today's Arrival Expected",
      desc: "Priya Verma (Family Suite) is scheduled to check-in around 02:00 PM today.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Bank Payout Dispatched",
      desc: "₹ 42,500 advance deposit payout processed to your registered HDFC Bank account.",
      time: "Yesterday, 06:30 PM",
      unread: true,
    },
    {
      id: 4,
      title: "Peak Weekend Surge Pricing Activated",
      desc: "Automated seasonal pricing rule applied for upcoming weekend dates.",
      time: "2 days ago",
      unread: false,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#17233D] tracking-tight">
            Notifications & Operational Alerts
          </h2>
          <p className="text-[#64748B] text-xs mt-0.5">
            Stay updated with real-time bookings, guest arrivals, and settlements.
          </p>
        </div>

        <button className="text-xs font-bold text-[#3B6EF5] hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 flex items-start justify-between gap-3 transition-colors ${
              n.unread ? "bg-[#EFF4FF]/20" : "hover:bg-slate-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  n.unread ? "bg-[#EFF4FF] text-[#3B6EF5]" : "bg-slate-100 text-slate-500"
                }`}
              >
                <FiBell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#17233D] text-[13px]">{n.title}</h4>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{n.desc}</p>
                <span className="text-[10px] text-slate-400 font-medium mt-1 block">{n.time}</span>
              </div>
            </div>

            {n.unread && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B6EF5] shrink-0 mt-1.5"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

