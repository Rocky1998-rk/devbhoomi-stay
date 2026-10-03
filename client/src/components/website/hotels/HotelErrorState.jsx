import { FiAlertCircle, FiRefreshCw, FiMessageCircle } from "react-icons/fi";
import { WHATSAPP_CONFIG } from "../../../constants/config";

const HotelErrorState = ({ onRetry }) => {
  return (
    <div className="rounded-3xl bg-white border border-rose-100 p-10 sm:p-14 text-center max-w-xl mx-auto shadow-sm my-8">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-5">
        <FiAlertCircle size={28} />
      </div>

      <h3 className="text-2xl font-display font-bold text-slate-900">
        Something went wrong
      </h3>

      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        Unable to load stays right now. Please try refreshing or get in touch with our team directly.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <FiRefreshCw size={13} />
            <span>Try Again</span>
          </button>
        )}

        <a
          href={WHATSAPP_CONFIG.getLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
        >
          <FiMessageCircle size={14} className="text-[#087F5B]" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default HotelErrorState;
