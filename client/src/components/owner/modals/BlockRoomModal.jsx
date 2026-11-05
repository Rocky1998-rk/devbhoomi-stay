import React, { useState } from "react";
import { FiX, FiLock, FiUnlock, FiAlertTriangle } from "react-icons/fi";

const BlockRoomModal = ({ isOpen, onClose }) => {
  const [rooms, setRooms] = useState([
    { id: "101", category: "Deluxe", isLocked: false, status: "Available" },
    { id: "102", category: "Deluxe", isLocked: false, status: "Occupied" },
    { id: "103", category: "Deluxe", isLocked: true, status: "Locked (Offline Walk-In)" },
    { id: "201", category: "Family Suite", isLocked: false, status: "Available" },
    { id: "202", category: "Family Suite", isLocked: false, status: "Available" },
    { id: "C-1", category: "Cottage", isLocked: false, status: "Available" },
  ]);

  if (!isOpen) return null;

  const toggleLock = (roomId) => {
    setRooms(
      rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              isLocked: !r.isLocked,
              status: !r.isLocked ? "Locked (Offline Walk-In)" : "Available",
            }
          : r
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden text-xs">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-[#FFF5E5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B] text-white flex items-center justify-center font-bold">
              <FiLock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#17233D]">Block / Unlock Physical Room</h3>
              <p className="text-[11px] text-[#64748B]">Prevents double-booking from WhatsApp bot</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2 text-amber-800">
            <FiAlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <p className="text-[11px] leading-relaxed">
              When locked, the automated WhatsApp bot will immediately hide this room from tourist search queries.
            </p>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all"
              >
                <div>
                  <div className="font-bold text-[#17233D] text-[13px]">
                    Room {room.id} <span className="font-normal text-[#64748B]">({room.category})</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        room.isLocked
                          ? "bg-amber-500"
                          : room.status === "Occupied"
                          ? "bg-red-500"
                          : "bg-emerald-500"
                      }`}
                    ></span>
                    <span className="text-[11px] font-semibold text-[#64748B]">{room.status}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleLock(room.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    room.isLocked
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  }`}
                >
                  {room.isLocked ? (
                    <>
                      <FiUnlock className="w-3.5 h-3.5" />
                      <span>Unlock</span>
                    </>
                  ) : (
                    <>
                      <FiLock className="w-3.5 h-3.5" />
                      <span>Lock Room</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#17233D] text-white font-bold hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockRoomModal;
