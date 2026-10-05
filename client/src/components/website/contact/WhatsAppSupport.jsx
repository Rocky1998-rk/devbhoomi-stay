import { FiMessageCircle, FiArrowRight, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";
import { WHATSAPP_CONFIG } from "../../../constants/config";

const WhatsAppSupport = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl bg-gradient-to-r from-emerald-50 via-[#F3F8F5] to-emerald-50/80 border border-emerald-200/90 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
    >
      {/* Decorative ambient subtle circle */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#087F5B]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-sm">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#087F5B] uppercase tracking-wider">
            <FiZap size={12} className="text-[#087F5B]" />
            <span>PREFER WHATSAPP?</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold font-display text-slate-900 leading-snug">
            Start an instant chat and get live hotel quotes.
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Directly connect with our coordinators on ground for room photos, current tariffs, and road conditions.
          </p>
        </div>

        <a
          href={WHATSAPP_CONFIG.getLink("Hi DevBhoomi Stay, I would like to check room options and get a quick quote.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#087F5B]/20 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shrink-0 w-full sm:w-auto"
        >
          <FiMessageCircle size={17} className="transition-transform group-hover:scale-110" />
          <span>Chat Now</span>
          <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
};

export default WhatsAppSupport;
