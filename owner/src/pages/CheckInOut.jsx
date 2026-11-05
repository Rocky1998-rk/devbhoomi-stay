import React, { useState } from "react";
import { FiUserCheck, FiLogOut, FiCheck, FiDollarSign } from "react-icons/fi";

const CheckInOut = () => {
  const [tab, setTab] = useState("arrivals");

  const arrivals = [
    { id: "DBS-10458", name: "Amit Sharma", room: "Deluxe 101", checkIn: "Today, 12:30 PM", balance: "₹ 4,500", advance: "₹ 1,500 Paid" },
    { id: "DBS-10457", name: "Priya Verma", room: "Family Suite 201", checkIn: "Today, 02:00 PM", balance: "₹ 3,375", advance: "₹ 1,125 Paid" },
    { id: "DBS-10455", name: "Neha Bisht", room: "Deluxe 102", checkIn: "Today, 03:30 PM", balance: "₹ 6,000", advance: "₹ 2,000 Paid" },
  ];

  const departures = [
    { id: "DBS-10456", name: "Rahul Negi", room: "Cottage C-1", checkOut: "Today, 11:00 AM", status: "Settled", amount: "₹ 15,000" },
    { id: "DBS-10454", name: "Kavita Rao", room: "Family Suite 204", checkOut: "Today, 10:45 AM", status: "Settled", amount: "₹ 13,500" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#17233D] tracking-tight">
            Check-In & Check-Out Front Desk
          </h2>
          <p className="text-[#64748B] text-xs mt-0.5">
            Real-time daily operations: 3 arrivals expected today • 2 departures.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setTab("arrivals")}
            className={`px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              tab === "arrivals"
                ? "bg-[#16A36A] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FiUserCheck className="w-4 h-4" />
            <span>Today's Arrivals (3)</span>
          </button>
          <button
            onClick={() => setTab("departures")}
            className={`px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              tab === "departures"
                ? "bg-[#3B6EF5] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FiLogOut className="w-4 h-4" />
            <span>Today's Departures (2)</span>
          </button>
        </div>
      </div>

      {tab === "arrivals" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {arrivals.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-extrabold text-sm text-[#17233D]">{item.name}</h4>
                  <p className="text-[11px] text-[#64748B]">{item.room} • {item.id}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  {item.advance}
                </span>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Collect at Reception</span>
                <span className="text-base font-extrabold text-red-600">{item.balance}</span>
              </div>

              <div className="text-[11px] text-slate-500">
                Expected ETA: <strong className="text-slate-800">{item.checkIn}</strong>
              </div>

              <button
                onClick={() => alert(`Guest ${item.name} checked in successfully!`)}
                className="w-full py-2 rounded-xl bg-[#16A36A] hover:bg-[#128354] text-white font-bold transition-all shadow-xs"
              >
                Complete Check-In
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departures.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-extrabold text-sm text-[#17233D]">{item.name}</h4>
                  <p className="text-[11px] text-[#64748B]">{item.room} • {item.id}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                  Check-Out Completed
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Total Billed & Settled</span>
                <span className="font-extrabold text-sm text-slate-900">{item.amount}</span>
              </div>

              <button
                onClick={() => alert(`Room marked ready for housekeeping cleaning!`)}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all"
              >
                Send Room to Housekeeping
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckInOut;

