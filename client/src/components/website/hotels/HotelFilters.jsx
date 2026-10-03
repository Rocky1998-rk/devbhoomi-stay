import { FiX, FiSliders, FiCheck } from "react-icons/fi";

const CATEGORIES = ["Budget Hotel", "Deluxe Hotel", "Luxury Hotel", "Homestay"];
const AMENITIES_LIST = [
  "Mountain View Balcony",
  "Free Wi-Fi",
  "In-House Dining",
  "Bonfire Area",
  "Free Parking",
  "Terrace Garden",
];

const HotelFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  isMobileDrawer = false,
  onCloseMobile = () => {},
}) => {
  const handleCategoryToggle = (cat) => {
    const current = filters.categories || [];
    const next = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    onFilterChange("categories", next);
  };

  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities || [];
    const next = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    onFilterChange("amenities", next);
  };

  return (
    <div className={`space-y-6 ${isMobileDrawer ? "p-6" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <FiSliders className="text-[#087F5B]" />
          <h3 className="text-base font-display font-bold text-slate-900">
            Filters
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-[#087F5B] hover:text-[#066C4D] hover:underline"
          >
            Reset all
          </button>
          {isMobileDrawer && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Close filters drawer"
            >
              <FiX size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Destination Radio / Selection */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Destination
        </h4>
        <div className="space-y-1.5">
          {["", "Lansdowne", "Kotdwar"].map((dest) => {
            const isSelected = (filters.destination || "") === dest;
            return (
              <label
                key={dest || "all"}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-[#087F5B]/10 text-[#087F5B]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="destination"
                    checked={isSelected}
                    onChange={() => onFilterChange("destination", dest)}
                    className="accent-[#087F5B]"
                  />
                  <span>{dest || "All Uttarakhand"}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Max Tariff
          </h4>
          <span className="text-xs font-extrabold text-[#087F5B]">
            Up to ₹{(filters.maxPrice || 10000).toLocaleString("en-IN")}
          </span>
        </div>
        <input
          type="range"
          min="1500"
          max="10000"
          step="500"
          value={filters.maxPrice || 10000}
          onChange={(e) => onFilterChange("maxPrice", Number(e.target.value))}
          className="w-full accent-[#087F5B] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
          <span>₹1,500</span>
          <span>₹5,000</span>
          <span>₹10,000+</span>
        </div>
      </div>

      {/* Hotel Type / Category Checkboxes */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Property Type
        </h4>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const isChecked = (filters.categories || []).includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer select-none"
              >
                <div
                  onClick={() => handleCategoryToggle(cat)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? "bg-[#087F5B] border-[#087F5B] text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <FiCheck size={11} />}
                </div>
                <span onClick={() => handleCategoryToggle(cat)}>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Amenities Multi-select */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Amenities
        </h4>
        <div className="space-y-2">
          {AMENITIES_LIST.map((amenity) => {
            const isChecked = (filters.amenities || []).includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer select-none"
              >
                <div
                  onClick={() => handleAmenityToggle(amenity)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? "bg-[#087F5B] border-[#087F5B] text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <FiCheck size={11} />}
                </div>
                <span onClick={() => handleAmenityToggle(amenity)}>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Apply Button on Mobile */}
      {isMobileDrawer && (
        <div className="pt-4">
          <button
            type="button"
            onClick={onCloseMobile}
            className="w-full py-3 rounded-xl bg-[#087F5B] text-white text-sm font-bold shadow-md"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelFilters;
