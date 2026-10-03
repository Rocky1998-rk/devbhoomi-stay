import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FiCompass,
  FiSliders,
  FiMessageCircle,
  FiMapPin,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import BookingSearch from "../../components/website/BookingSearch";
import HotelCard from "../../components/website/HotelCard";
import HotelFilters from "../../components/website/hotels/HotelFilters";
import HotelSkeleton from "../../components/website/hotels/HotelSkeleton";
import HotelEmptyState from "../../components/website/hotels/HotelEmptyState";
import HotelErrorState from "../../components/website/hotels/HotelErrorState";
import { WHATSAPP_CONFIG, HOTELS_HERO_IMAGE } from "../../constants/config";
import { fetchAllHotels } from "../../services/hotelService";

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params
  const urlDestination = searchParams.get("destination") || "";
  const initialCheckIn = searchParams.get("checkIn") || "";
  const initialCheckOut = searchParams.get("checkOut") || "";
  const initialGuests = searchParams.get("guests") || "2 Guests";

  // State
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");

  // Filters State
  const [filters, setFilters] = useState({
    destination: urlDestination,
    maxPrice: 10000,
    categories: [],
    amenities: [],
  });

  const activeDestination = urlDestination || filters.destination;

  // Load Hotels from API / fallback
  const loadHotelsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllHotels();
      setHotels(data);
    } catch {
      setError("Unable to load stays at this time.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchAllHotels()
      .then((data) => {
        if (isMounted) {
          setHotels(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load stays at this time.");
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter change handler
  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === "destination") {
        if (value) {
          searchParams.set("destination", value);
        } else {
          searchParams.delete("destination");
        }
        setSearchParams(searchParams, { replace: true });
      }
      return updated;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      destination: "",
      maxPrice: 10000,
      categories: [],
      amenities: [],
    });
    searchParams.delete("destination");
    setSearchParams(searchParams, { replace: true });
  };

  // Filtered & Sorted Hotels
  const filteredHotels = useMemo(() => {
    let result = [...hotels];

    // Destination filter
    if (activeDestination && activeDestination !== "All Destinations") {
      result = result.filter(
        (h) =>
          h.city?.toLowerCase() === activeDestination.toLowerCase() ||
          h.state?.toLowerCase() === activeDestination.toLowerCase()
      );
    }

    // Price filter
    if (filters.maxPrice) {
      result = result.filter((h) => !h.price || h.price <= filters.maxPrice);
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter((h) =>
        filters.categories.includes(h.hotelType)
      );
    }

    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      result = result.filter((h) => {
        if (!h.amenities || h.amenities.length === 0) return false;
        return filters.amenities.every((amenity) =>
          h.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        );
      });
    }

    // Sorting
    if (sortBy === "price_asc") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // Recommended: featured first, then by rating
      result.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.rating || 0) - (a.rating || 0);
      });
    }

    return result;
  }, [hotels, filters, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* 7.1 HERO SECTION WITH BOUTIQUE HOTEL BACKGROUND */}
      <section className="relative text-white min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-20 sm:pt-24 lg:pt-28 pb-28 sm:pb-36 lg:pb-44">
        {/* Background Image - 100% Clear & Vivid showing full bottom view */}
        <div className="absolute inset-0 z-0">
          <img
            src={HOTELS_HERO_IMAGE}
            alt="Boutique Hotels in Uttarakhand"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 text-emerald-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/20 mb-4 shadow-md">
              <FiCompass className="text-emerald-400" />
              <span>DISCOVER YOUR STAY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Find a stay that feels right.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-100/95 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Explore comfortable stays across Lansdowne, Kotdwar and Uttarakhand with verified photos, direct tariffs, and WhatsApp assistance.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH PANEL - Exactly 50/50 centered across the boundary between Hero & Next Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-5xl mx-auto"
        >
          <BookingSearch
            initialValues={{
              destination: filters.destination,
              checkIn: initialCheckIn,
              checkOut: initialCheckOut,
              guests: initialGuests,
            }}
          />
        </motion.div>
      </div>

      {/* 7.2 DESTINATION QUICK NAVIGATION */}
      <section className="border-b border-slate-200 bg-white sticky top-20 z-30 shadow-xs -mt-6 sm:-mt-8 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleFilterChange("destination", "")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  !activeDestination
                    ? "bg-[#087F5B] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All Uttarakhand
              </button>

              {["Lansdowne", "Kotdwar"].map((dest) => {
                const isSelected = activeDestination?.toLowerCase() === dest.toLowerCase();
                return (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => handleFilterChange("destination", dest)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#087F5B] text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <FiMapPin size={12} className={isSelected ? "text-emerald-200" : "text-slate-400"} />
                    <span>{dest}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                <FiSliders size={14} className="text-[#087F5B]" />
                <span>Filters</span>
                {(filters.categories.length > 0 || filters.amenities.length > 0) && (
                  <span className="w-2 h-2 rounded-full bg-[#087F5B]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7.3 - 7.8 MAIN LISTING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm sticky top-36">
            <HotelFilters
              filters={{ ...filters, destination: activeDestination }}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </aside>

          {/* Results Grid Area */}
          <div className="lg:col-span-9 flex flex-col space-y-6">
            {/* Header: Dynamic Count & Sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                  {activeDestination ? `${activeDestination} Stays` : "All Uttarakhand Stays"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {loading
                    ? "Searching verified properties..."
                    : `${filteredHotels.length} ${
                        filteredHotels.length === 1 ? "stay" : "stays"
                      } found${activeDestination ? ` in ${activeDestination}` : " across Uttarakhand"}`}
                </p>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs font-semibold text-slate-500 shrink-0">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:border-[#087F5B] cursor-pointer shadow-2xs"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* CONTENT AREA: SKELETON / ERROR / EMPTY / GRID */}
            {loading ? (
              <HotelSkeleton count={6} />
            ) : error ? (
              <HotelErrorState onRetry={loadHotelsData} />
            ) : filteredHotels.length === 0 ? (
              <HotelEmptyState onClearFilters={handleResetFilters} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard
                    key={hotel._id}
                    hotel={hotel}
                    allowFlip={true}
                  />
                ))}
              </div>
            )}

            {/* 7.14 WHATSAPP HELP BANNER */}
            <div className="mt-12 rounded-3xl bg-[#052E2B] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-800/80 shadow-lg">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Personal Concierge
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                  Need help choosing the right stay?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                  Tell us your budget, dates, and vehicle type. We'll recommend verified rooms with instant availability.
                </p>
              </div>

              <a
                href={WHATSAPP_CONFIG.getLink("Hi DevBhoomi Stay, I need help finding a hotel that suits my travel plans.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
              >
                <FiMessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE FILTER MODAL / BOTTOM SHEET */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto shadow-2xl z-50"
            >
              <HotelFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                isMobileDrawer={true}
                onCloseMobile={() => setMobileFiltersOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hotels;
