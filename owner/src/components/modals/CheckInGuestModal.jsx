import React, { useState } from "react";
import { FiX, FiUserCheck, FiSearch, FiCheckCircle } from "react-icons/fi";

const CheckInGuestModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const expectedArrivals = [
    { id: "DBS-10458", name: "Amit Sharma", room: "Deluxe 101", balance: "₹ 4,500", advance: "₹ 1,500 Paid" },
    { id: "DBS-10457", name: "Priya Verma", room: "Family Suite 201", balance: "₹ 3,375", advance: "₹ 1,125 Paid" },
    { id: "DBS-10455", name: "Neha Bisht", room: "Deluxe 102", balance: "₹ 6,000", advance: "₹ 2,000 Paid" },
  ];

  const handleConfirmCheckin = (guest) => {
    setSuccessMsg(`Guest ${guest.name} successfully checked into ${guest.room}!`);
    setTimeout(() => {
      setSuccessMsg("");
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden text-xs">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-[#E8F8F0]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#16A36A] text-white flex items-center justify-center font-bold">
              <FiUserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#17233D]">Guest Check-In Desk</h3>
              <p className="text-[11px] text-[#64748B]">Verify voucher & collect 75% balance</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {successMsg ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center font-bold flex items-center justify-center gap-2">
              <FiCheckCircle className="w-5 h-5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          ) : (
            <>
              {/* Search input */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by Booking ID or Guest Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16A36A]"
                />
              </div>

              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider pt-1">
                Today's Expected Arrivals
              </div>

              <div className="space-y-2">
                {expectedArrivals.map((g) => (
                  <div
                    key={g.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between hover:bg-emerald-50/40 transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#17233D] text-[13px]">{g.name}</div>
                      <div className="text-[11px] text-[#64748B]">
                        {g.room} • <span className="font-semibold text-emerald-700">{g.id}</span>
                      </div>
                      <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
                        Collect Remaining Balance: <span className="font-bold text-red-600">{g.balance}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleConfirmCheckin(g)}
                      className="px-3 py-1.5 rounded-lg bg-[#16A36A] hover:bg-[#128354] text-white font-bold transition-all shadow-xs"
                    >
                      Check-In
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckInGuestModal;

