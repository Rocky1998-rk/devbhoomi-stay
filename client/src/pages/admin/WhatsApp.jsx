import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiCheckCircle, FiUser } from "react-icons/fi";

const activeSessions = [
  {
    phone: "+91 93688 25518",
    name: "Rockey Kumar",
    destination: "Lansdowne",
    step: "hotels_found",
    lastActive: "2 mins ago",
    status: "Browsing Stays",
  },
  {
    phone: "+91 98112 34567",
    name: "Amit Sharma",
    destination: "Kotdwar",
    step: "booking_confirmed",
    lastActive: "15 mins ago",
    status: "Voucher Dispatched",
  },
  {
    phone: "+91 99234 56789",
    name: "Sneha Verma",
    destination: "Lansdowne",
    step: "advance_payment",
    lastActive: "40 mins ago",
    status: "Awaiting Token Deposit",
  },
];

const WhatsApp = () => {
  return (
    <div className="space-y-4 md:space-y-5 font-['Inter']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight flex items-center gap-2.5">
            <FaWhatsapp className="text-[#16A34A] w-6 h-6 shrink-0" />
            <span>WhatsApp Bot Operations</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Real-time Meta Cloud API session monitor and customer conversation funnel
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] text-xs font-bold border border-[#16A34A]/20 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
          <span>Webhook Active (v25.0)</span>
        </div>
      </div>

      {/* Active Sessions Table: Unbroken horizontal single-line alignment with slim scrollbar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="px-4 py-3 border-b border-[#F1F5F9] font-bold text-sm text-[#0F172A] flex items-center justify-between">
          <span>Active Chatbot Sessions</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ECF7F1] text-[#087F5B] border border-[#087F5B]/20">
            {activeSessions.length} Live Sessions
          </span>
        </div>

        <div className="overflow-x-auto slim-scrollbar pb-0.5">
          <table className="w-full min-w-[760px] text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-3.5 text-left whitespace-nowrap">Customer Phone</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Guest Name</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Selected Destination</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Current Step</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Activity Status</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Last Interaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {activeSessions.map((s, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  {/* Phone */}
                  <td className="py-3.5 px-3.5 font-mono font-bold text-[#087F5B] whitespace-nowrap">
                    {s.phone}
                  </td>

                  {/* Name */}
                  <td className="py-3.5 px-3 font-semibold text-[#0F172A] whitespace-nowrap">
                    {s.name}
                  </td>

                  {/* Destination */}
                  <td className="py-3.5 px-3 text-[#475569] font-medium whitespace-nowrap">
                    {s.destination}
                  </td>

                  {/* Step */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] font-mono text-[11px] border border-[#E2E8F0] whitespace-nowrap">
                      {s.step}
                    </span>
                  </td>

                  {/* Activity Status Badge */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap inline-flex items-center ${
                        s.status === "Voucher Dispatched"
                          ? "bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20"
                          : s.status === "Browsing Stays"
                          ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                          : "bg-amber-50 text-amber-700 border border-amber-200/60"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>

                  {/* Last Interaction */}
                  <td className="py-3.5 px-3.5 text-[#64748B] text-right whitespace-nowrap">
                    {s.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WhatsApp;
