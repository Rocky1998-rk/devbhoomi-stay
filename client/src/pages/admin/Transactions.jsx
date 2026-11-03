import React from "react";
import { FiCreditCard, FiCheckCircle, FiDownload } from "react-icons/fi";

const transactionsData = [
  {
    id: "plink_R8923491823",
    payId: "pay_Q823947234",
    guest: "Priya Rawat (+91 98765 43210)",
    amount: "₹1,500",
    date: "26 Oct 2026, 12:45 PM",
    bookingRef: "DBS12658",
    status: "Captured (200 OK)",
  },
  {
    id: "plink_R8923491824",
    payId: "pay_Q823947235",
    guest: "Aman Joshi (+91 98234 56781)",
    amount: "₹800",
    date: "26 Oct 2026, 11:20 AM",
    bookingRef: "DBS12657",
    status: "Captured (200 OK)",
  },
  {
    id: "plink_R8923491825",
    payId: "pay_Q823947236",
    guest: "Anjali Thapa (+91 98456 78903)",
    amount: "₹1,125",
    date: "25 Oct 2026, 07:15 PM",
    bookingRef: "DBS12655",
    status: "Captured (200 OK)",
  },
];

const Transactions = () => {
  return (
    <div className="space-y-4 md:space-y-5 font-['Inter']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
            Transactions & Razorpay Webhooks
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            25% advance token deposits collected via WhatsApp payment links
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#087F5B] text-[#087F5B] text-xs font-bold hover:bg-[#ECF7F1] transition-colors shadow-xs cursor-pointer shrink-0">
          <FiDownload className="w-4 h-4" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* Transactions Table: Unbroken horizontal single-line alignment with slim scrollbar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto slim-scrollbar pb-0.5">
          <table className="w-full min-w-[850px] text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-3.5 text-left whitespace-nowrap">Payment Link ID</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Razorpay Payment ID</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Guest</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Advance Token</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Booking Ref</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Date & Time</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Webhook Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {transactionsData.map((t) => (
                <tr key={t.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  {/* Payment Link ID */}
                  <td className="py-3.5 px-3.5 font-mono text-[11px] font-medium text-[#475569] whitespace-nowrap">
                    {t.id}
                  </td>

                  {/* Razorpay Payment ID */}
                  <td className="py-3.5 px-3 font-mono font-bold text-[#087F5B] whitespace-nowrap">
                    {t.payId}
                  </td>

                  {/* Guest */}
                  <td className="py-3.5 px-3 text-[#0F172A] font-semibold whitespace-nowrap">
                    {t.guest}
                  </td>

                  {/* Advance Token */}
                  <td className="py-3.5 px-3 font-bold text-[#16A34A] whitespace-nowrap">
                    {t.amount}
                  </td>

                  {/* Booking Ref */}
                  <td className="py-3.5 px-3 font-mono text-[#D97706] font-semibold whitespace-nowrap">
                    {t.bookingRef}
                  </td>

                  {/* Date & Time */}
                  <td className="py-3.5 px-3 text-[#64748B] whitespace-nowrap">
                    {t.date}
                  </td>

                  {/* Webhook Status */}
                  <td className="py-3.5 px-3.5 text-right whitespace-nowrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20 whitespace-nowrap inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                      <span>{t.status}</span>
                    </span>
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

export default Transactions;
