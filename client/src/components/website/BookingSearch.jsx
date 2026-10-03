import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiCalendar, FiUsers, FiSearch } from "react-icons/fi";

const BookingSearch = ({ initialValues = {}, className = "" }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(initialValues.destination || "");
  const [checkIn, setCheckIn] = useState(initialValues.checkIn || "");
  const [checkOut, setCheckOut] = useState(initialValues.checkOut || "");
  const [guests, setGuests] = useState(initialValues.guests || "2 Guests");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination && destination !== "All Destinations") {
      params.append("destination", destination);
    }
    if (checkIn) params.append("checkIn", checkIn);
    if (checkOut) params.append("checkOut", checkOut);
    if (guests) params.append("guests", guests);

    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-2xl shadow-slate-900/15 border border-slate-200/90 p-3 sm:p-4 lg:p-5 ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 items-center">
        {/* Destination Field */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#087F5B]/40 transition-colors focus-within:border-[#087F5B] focus-within:bg-white">
          <div className="w-9 h-9 rounded-lg bg-emerald-100/70 text-[#087F5B] flex items-center justify-center shrink-0">
            <FiMapPin size={18} />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <label htmlFor="search-destination" className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Destination
            </label>
            <select
              id="search-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer w-full"
            >
              <option value="">All Uttarakhand</option>
              <option value="Lansdowne">Lansdowne</option>
              <option value="Kotdwar">Kotdwar</option>
            </select>
          </div>
        </div>

        {/* Check-in Date */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#087F5B]/40 transition-colors focus-within:border-[#087F5B] focus-within:bg-white">
          <div className="w-9 h-9 rounded-lg bg-emerald-100/70 text-[#087F5B] flex items-center justify-center shrink-0">
            <FiCalendar size={18} />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <label htmlFor="search-checkin" className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Check-in
            </label>
            <input
              id="search-checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 outline-none w-full"
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#087F5B]/40 transition-colors focus-within:border-[#087F5B] focus-within:bg-white">
          <div className="w-9 h-9 rounded-lg bg-emerald-100/70 text-[#087F5B] flex items-center justify-center shrink-0">
            <FiCalendar size={18} />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <label htmlFor="search-checkout" className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Check-out
            </label>
            <input
              id="search-checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 outline-none w-full"
            />
          </div>
        </div>

        {/* Guests & Search CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#087F5B]/40 transition-colors flex-1 w-full">
            <div className="w-9 h-9 rounded-lg bg-emerald-100/70 text-[#087F5B] flex items-center justify-center shrink-0">
              <FiUsers size={18} />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <label htmlFor="search-guests" className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Guests
              </label>
              <select
                id="search-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer w-full"
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="3 Guests">3 Guests</option>
                <option value="4+ Guests">4+ Family / Group</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto h-[58px] px-6 rounded-xl bg-[#087F5B] hover:bg-[#066C4D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-950/15 transition-all duration-200 hover:-translate-y-0.5 shrink-0"
          >
            <FiSearch size={18} />
            <span className="lg:hidden xl:inline">Find Your Stay</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookingSearch;
