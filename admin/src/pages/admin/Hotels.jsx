import React, { useState } from "react";
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiMapPin, FiEye } from "react-icons/fi";

const initialHotels = [
  {
    id: "6abc2196d875803d1c38d968",
    name: "Green Valley Residency",
    city: "Lansdowne",
    address: "Tarkeshwar Road, Lansdowne",
    type: "Homestay",
    typeColor: "bg-blue-50 text-blue-700 border border-blue-200/60",
    owner: "Rocky Kumar",
    rooms: 4,
    startingPrice: 3000,
    rating: 4.8,
    status: "Active",
  },
  {
    id: "6abc2196d875803d1c38d969",
    name: "Lansdowne Heights Updated",
    city: "Lansdowne",
    address: "Mall Road, Lansdowne",
    type: "Deluxe Hotel",
    typeColor: "bg-purple-50 text-purple-700 border border-purple-200/60",
    owner: "Suresh Rawat",
    rooms: 8,
    startingPrice: 3200,
    rating: 4.5,
    status: "Active",
  },
  {
    id: "6abc2196d875803d1c38d970",
    name: "Mountain View Retreat",
    city: "Kotdwar",
    address: "Siddhbali Marg, Kotdwar",
    type: "Budget Hotel",
    typeColor: "bg-amber-50 text-amber-700 border border-amber-200/60",
    owner: "Anita Negi",
    rooms: 6,
    startingPrice: 3200,
    rating: 4.3,
    status: "Active",
  },
];

const Hotels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const filteredHotels = initialHotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = cityFilter === "All Cities" || hotel.city === cityFilter;
    const matchesType = typeFilter === "All Types" || hotel.type === typeFilter;
    return matchesSearch && matchesCity && matchesType;
  });

  return (
    <div className="space-y-4 md:space-y-5 font-['Inter']">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              Hotels & Homestays
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ECF7F1] text-[#087F5B] border border-[#087F5B]/20">
              {filteredHotels.length} Properties
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Manage all registered properties in Lansdowne & Kotdwar
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0">
          <FiPlus className="w-4 h-4" />
          <span>Add New Property</span>
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
            placeholder="Search hotel name, location, owner..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#087F5B] focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#475569] font-medium focus:outline-none focus:border-[#087F5B] cursor-pointer"
          >
            <option>All Cities</option>
            <option>Lansdowne</option>
            <option>Kotdwar</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-9 px-3 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#475569] font-medium focus:outline-none focus:border-[#087F5B] cursor-pointer"
          >
            <option>All Types</option>
            <option>Homestay</option>
            <option>Deluxe Hotel</option>
            <option>Budget Hotel</option>
          </select>
        </div>
      </div>

      {/* Hotels Table: Unbroken horizontal single-line alignment with no bottom scrollbar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto no-scrollbar scrollbar-none">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-3.5 text-left whitespace-nowrap">Property Name</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Type</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">City</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Owner</th>
                <th className="py-3 px-2.5 text-center whitespace-nowrap">Rooms</th>
                <th className="py-3 px-3 text-left whitespace-nowrap">Starting Price</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">Status</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    {/* Property Name & Address */}
                    <td className="py-3 px-3.5 font-bold text-[#0F172A] whitespace-nowrap">
                      <span className="block text-xs font-bold text-[#0F172A] whitespace-nowrap">
                        {hotel.name}
                      </span>
                      <div className="text-[11px] font-normal text-[#64748B] flex items-center gap-1 mt-0.5 whitespace-nowrap">
                        <FiMapPin className="w-3 h-3 text-[#087F5B] shrink-0" />
                        <span className="whitespace-nowrap">{hotel.address}</span>
                      </div>
                    </td>

                    {/* Property Type Badge */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap inline-flex items-center ${hotel.typeColor}`}
                      >
                        {hotel.type}
                      </span>
                    </td>

                    {/* City */}
                    <td className="py-3 px-3 text-[#475569] font-medium whitespace-nowrap">
                      {hotel.city}
                    </td>

                    {/* Owner */}
                    <td className="py-3 px-3 text-[#0F172A] font-medium whitespace-nowrap">
                      {hotel.owner}
                    </td>

                    {/* Rooms */}
                    <td className="py-3 px-2.5 text-center font-bold text-[#0F172A] whitespace-nowrap">
                      {hotel.rooms}
                    </td>

                    {/* Starting Price */}
                    <td className="py-3 px-3 font-bold text-[#087F5B] whitespace-nowrap">
                      ₹{hotel.startingPrice.toLocaleString("en-IN")}
                      <span className="text-[10px] font-normal text-[#64748B] ml-0.5">/night</span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20 whitespace-nowrap inline-flex items-center">
                        {hotel.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          title="Edit Property"
                          className="p-1.5 rounded-md hover:bg-[#ECF7F1] text-[#087F5B] transition-colors cursor-pointer"
                        >
                          <FiEdit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Delete Property"
                          className="p-1.5 rounded-md hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-xs text-[#64748B]">
                    No properties match your filter criteria.
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

export default Hotels;
