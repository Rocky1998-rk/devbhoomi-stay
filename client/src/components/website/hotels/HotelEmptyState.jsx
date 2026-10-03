import { FiSearch, FiRefreshCw, FiMessageCircle } from "react-icons/fi";
import { WHATSAPP_CONFIG } from "../../../constants/config";

const HotelEmptyState = ({ onClearFilters }) => {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-10 sm:p-14 text-center max-w-xl mx-auto shadow-sm my-8">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#087F5B] flex items-center justify-center mx-auto mb-5">
        <FiSearch size={28} />
      </div>

      <h3 className="text-2xl font-display font-bold text-slate-900">
        No stays found
      </h3>

      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        We couldn't find any stays matching your selected criteria. Try changing your destination, adjusting filters, or contact our team directly.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <FiRefreshCw size={13} />
            <span>Clear Filters</span>
          </button>
        )}

        <a
          href={WHATSAPP_CONFIG.getLink("Hi DevBhoomi Stay, I couldn't find a hotel matching my dates. Can you help me check manual availability?")}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
        >
          <FiMessageCircle size={14} className="text-[#087F5B]" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default HotelEmptyState;
