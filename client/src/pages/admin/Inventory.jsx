import React, { useState } from "react";
import { FiPlus, FiLock, FiUnlock, FiSearch, FiFilter, FiCheckCircle } from "react-icons/fi";

const initialRooms = [
  {
    roomNumber: "301",
    hotel: "Green Valley Residency",
    category: "Deluxe",
    maxGuests: 2,
    bedType: "King Bed",
    isAvailable: true,
    isLocked: false,
  },
  {
    roomNumber: "101",
    hotel: "Lansdowne Heights",
    category: "Executive Valley View",
    maxGuests: 2,
    bedType: "King Bed",
    isAvailable: true,
    isLocked: false,
  },
  {
    roomNumber: "102",
    hotel: "Lansdowne Heights",
    category: "Family Suite",
    maxGuests: 4,
    bedType: "2 Queen Beds",
    isAvailable: false,
    isLocked: true,
  },
  {
    roomNumber: "201",
    hotel: "Mountain View Retreat",
    category: "Standard Pine View",
    maxGuests: 2,
    bedType: "Queen Bed",
    isAvailable: true,
    isLocked: false,
  },
];

const Inventory = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleToggleLock = (roomNumber) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.roomNumber === roomNumber) {
          const nextLocked = !r.isLocked;
          return {
            ...r,
            isLocked: nextLocked,
            isAvailable: !nextLocked,
          };
        }
        return r;
      })
    );
  };

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch =
      r.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Available" && r.isAvailable) ||
      (statusFilter === "Locked" && r.isLocked);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 md:space-y-5 font-['Inter']">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              Room Inventory & Categories
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ECF7F1] text-[#087F5B] border border-[#087F5B]/20">
              {rooms.length} Total Rooms
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Manage physical rooms, guest capacities, and emergency offline locks
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0">
          <FiPlus className="w-4 h-4" />
          <span>Add New Room</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row gap-2.5 items-center justify-between">
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search room no, hotel, category..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#087F5B] focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#475569] font-medium focus:outline-none focus:border-[#087F5B] cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available Online</option>
            <option value="Locked">Occupied / Locked</option>
          </select>
        </div>
      </div>

      {/* Inventory Table: Unbroken horizontal single-line alignment with no bottom scrollbar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto no-scrollbar scrollbar-none">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-3.5 text-left whitespace-nowrap">Room No.</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Hotel Property</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Category</th>
                <th className="py-3 px-2.5 text-center whitespace-nowrap">Max Guests</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Bed Type</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Live Availability</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Lock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredRooms.length > 0 ? (
                filteredRooms.map((r, i) => (
                  <tr key={i} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    {/* Room No. */}
                    <td className="py-3 px-3.5 font-mono font-bold text-[#0F172A] whitespace-nowrap">
                      {r.roomNumber}
                    </td>

                    {/* Hotel Property */}
                    <td className="py-3 px-3 text-[#475569] font-medium whitespace-nowrap">
                      {r.hotel}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 font-semibold text-[#087F5B] whitespace-nowrap">
                      {r.category}
                    </td>

                    {/* Max Guests */}
                    <td className="py-3 px-2.5 text-center font-bold text-[#0F172A] whitespace-nowrap">
                      {r.maxGuests}
                    </td>

                    {/* Bed Type */}
                    <td className="py-3 px-3 text-[#475569] whitespace-nowrap">
                      {r.bedType}
                    </td>

                    {/* Live Availability Badge */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap inline-flex items-center gap-1.5 ${
                          r.isAvailable
                            ? "bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]/20"
                            : "bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            r.isAvailable ? "bg-[#16A34A]" : "bg-[#DC2626]"
                          }`}
                        />
                        <span className="whitespace-nowrap">
                          {r.isAvailable ? "Available Online" : "Occupied / Locked"}
                        </span>
                      </span>
                    </td>

                    {/* Lock Action Button */}
                    <td className="py-3 px-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleToggleLock(r.roomNumber)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                          r.isLocked
                            ? "bg-amber-50 text-amber-700 border border-amber-200/80 hover:bg-amber-100"
                            : "bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                        }`}
                        title={r.isLocked ? "Click to unlock this room" : "Click to lock room offline"}
                      >
                        {r.isLocked ? (
                          <FiUnlock className="w-3.5 h-3.5 text-amber-600" />
                        ) : (
                          <FiLock className="w-3.5 h-3.5 text-[#64748B]" />
                        )}
                        <span className="whitespace-nowrap">
                          {r.isLocked ? "Unlock" : "Lock Room"}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-[#64748B]">
                    No rooms match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
