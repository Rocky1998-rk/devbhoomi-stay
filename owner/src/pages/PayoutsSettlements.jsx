import React from "react";
import { FiCreditCard, FiArrowUpRight, FiCheckCircle, FiDollarSign } from "react-icons/fi";

const PayoutsSettlements = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto text-xs">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#17233D] tracking-tight">
          Payouts & Financial Settlements
        </h2>
        <p className="text-[#64748B] text-xs mt-0.5">
          25% Online Advance Token (Razorpay Settlements) & 75% Front-Desk Cash/UPI Ledger.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-[#64748B] text-xs font-semibold block">Total Revenue (Month)</span>
          <span className="text-2xl font-extrabold text-[#17233D] mt-1 block">₹ 3,42,000</span>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">↑ +18% vs last month</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-[#64748B] text-xs font-semibold block">Online 25% Advance Settled</span>
          <span className="text-2xl font-extrabold text-[#3B6EF5] mt-1 block">₹ 85,500</span>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">Transferred to Bank Account</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-[#64748B] text-xs font-semibold block">75% Collected at Reception</span>
          <span className="text-2xl font-extrabold text-[#16A36A] mt-1 block">₹ 1,79,000</span>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">Direct Cash & Counter UPI</span>
        </div>
      </div>

      {/* Recent Bank Payout Transfers */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-sm text-[#17233D]">Bank Payout Settlements (Weekly Cycle)</h3>
          <span className="text-xs text-emerald-600 font-bold">● Automatic Payouts Active</span>
        </div>

        <div className="divide-y divide-slate-100">
          {[
            { id: "PO-8921", date: "26 Oct 2026", amount: "₹ 42,500", ref: "UTR-SBIN00492198", status: "Settled" },
            { id: "PO-8914", date: "19 Oct 2026", amount: "₹ 28,000", ref: "UTR-SBIN00412894", status: "Settled" },
            { id: "PO-8902", date: "12 Oct 2026", amount: "₹ 35,500", ref: "UTR-SBIN00389211", status: "Settled" },
          ].map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <span className="font-bold text-[#17233D] block">{p.id} • {p.date}</span>
                <span className="text-[11px] text-[#64748B]">{p.ref}</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-sm text-[#17233D] block">{p.amount}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayoutsSettlements;

