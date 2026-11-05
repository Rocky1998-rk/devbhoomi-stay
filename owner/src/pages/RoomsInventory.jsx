import React, { useState } from "react";
import { FiBox, FiLock, FiUnlock, FiFilter, FiCheckCircle } from "react-icons/fi";

const RoomsInventory = () => {
  const [filter, setFilter] = useState("all");
  const [rooms, setRooms] = useState([
    { number: "101", category: "Deluxe Room", floor: "1st Floor", status: "Occupied", guest: "Amit Sharma", isLocked: false },
    { number: "102", category: "Deluxe Room", floor: "1st Floor", status: "Occupied", guest: "Neha Bisht", isLocked: false },
    { number: "103", category: "Deluxe Room", floor: "1st Floor", status: "Available", guest: null, isLocked: false },
    { number: "104", category: "Deluxe Room", floor: "1st Floor", status: "Available", guest: null, isLocked: false },
    { number: "105", category: "Deluxe Room", floor: "1st Floor", status: "Available", guest: null, isLocked: false },
    { number: "106", category: "Deluxe Room", floor: "1st Floor", status: "Locked", guest: "Offline Walk-in", isLocked: true },
    { number: "201", category: "Family Suite", floor: "2nd Floor", status: "Occupied", guest: "Priya Verma", isLocked: false },
    { number: "202", category: "Family Suite", floor: "2nd Floor", status: "Occupied", guest: "Vikas Sethi", isLocked: false },
    { number: "203", category: "Family Suite", floor: "2nd Floor", status: "Available", guest: null, isLocked: false },
    { number: "204", category: "Family Suite", floor: "2nd Floor", status: "Occupied", guest: "Kavita Rao", isLocked: false },
    { number: "C-1", category: "Cottage", floor: "Ground / Lawn", status: "Occupied", guest: "Rahul Negi", isLocked: false },
    { number: "C-2", category: "Cottage", floor: "Ground / Lawn", status: "Available", guest: null, isLocked: false },
  ]);

  const toggleLock = (roomNumber) => {
    setRooms(
      rooms.map((r) =>
        r.number === roomNumber
          ? {
              ...r,
              isLocked: !r.isLocked,
              status: !r.isLocked ? "Locked" : "Available",
              guest: !r.isLocked ? "Offline Walk-in" : null,
            }
          : r
      )
    );
  };

  const filteredRooms = rooms.filter((r) => {
    if (filter === "all") return true;
    if (filter === "occupied") return r.status === "Occupied";
    if (filter === "available") return r.status === "Available";
    if (filter === "locked") return r.status === "Locked";
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#17233D] tracking-tight">
            Physical Rooms & Live Inventory Locks
          </h2>
          <p className="text-[#64748B] text-xs mt-0.5">
            12 Physical Rooms Total • 7 Occupied • 5 Available
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
          {["all", "occupied", "available", "locked"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                filter === f
                  ? "bg-[#3B6EF5] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#17233D] hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Rooms */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {filteredRooms.map((r) => {
          const isOccupied = r.status === "Occupied";
          const isAvail = r.status === "Available";
          const isLocked = r.status === "Locked";

          return (
            <div
              key={r.number}
              className={`bg-white rounded-2xl p-4 border transition-all ${
                isLocked
                  ? "border-amber-300 bg-amber-50/20"
                  : isOccupied
                  ? "border-slate-200"
                  : "border-emerald-200 bg-emerald-50/10"
              } shadow-xs hover:shadow-md flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-extrabold text-[#17233D]">
                    Room {r.number}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isOccupied
                        ? "bg-[#FFF0F0] text-[#EF4444]"
                        : isLocked
                        ? "bg-[#FFF5E5] text-[#F59E0B]"
                        : "bg-[#E8F8F0] text-[#16A36A]"
                    }`}
                  >
                    ● {r.status}
                  </span>
                </div>

                <div className="text-xs font-semibold text-[#17233D]">
                  {r.category}
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">
                  {r.floor}
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 min-h-[38px]">
                  {r.guest ? (
                    <div className="text-[11px] font-medium text-[#17233D]">
                      Guest: <strong className="font-bold">{r.guest}</strong>
                    </div>
                  ) : (
                    <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <FiCheckCircle className="w-3.5 h-3.5" />
                      Ready for Check-In
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-[#64748B] font-medium">WhatsApp Lock</span>
                <button
                  onClick={() => toggleLock(r.number)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                    isLocked
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      : "bg-slate-100 text-slate-700 hover:bg-amber-100 hover:text-amber-800"
                  }`}
                >
                  {isLocked ? <FiUnlock className="w-3 h-3" /> : <FiLock className="w-3 h-3" />}
                  <span>{isLocked ? "Unlock" : "Lock"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomsInventory;

