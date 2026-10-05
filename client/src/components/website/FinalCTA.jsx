import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiMessageCircle,
  FiCompass,
  FiShield,
  FiCheck,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { WHATSAPP_CONFIG } from "../../constants/config";

const FinalCTA = ({
  eyebrow = "PLAN YOUR NEXT ESCAPE",
  title = "Your next mountain stay starts here.",
  subtitle = "Discover comfortable stays across Uttarakhand and continue your booking directly with our local team.",
  className = "",
}) => {
  return (
    <section className={`relative bg-[#101C2C] text-[#F7F3EA] py-10 sm:py-12 lg:py-14 border-t border-[#1C2E46] overflow-hidden ${className}`}>
      {/* Subtle Himalayan Topographic Contour Line Art Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <svg
          className="absolute -top-20 -right-20 w-[600px] h-[600px] text-[#D6A15D]"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 320C120 240 240 220 360 270C480 320 540 230 600 180"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M0 400C140 310 280 290 400 350C520 410 560 310 600 260"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M0 480C160 380 320 360 440 420C560 480 580 390 600 340"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
        </svg>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D6A15D]/8 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#17283D] rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT COLUMN: Content, Eyebrow, Heading, Description & Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 flex flex-col items-start space-y-4"
          >
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#17283D] border border-[#263D5C] text-[11px] font-bold uppercase tracking-[0.2em] text-[#D6A15D]">
              <FiCompass size={13} className="text-[#D6A15D]" />
              <span>{eyebrow}</span>
            </div>

            {/* Large Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#F7F3EA] tracking-tight leading-[1.18]">
              {title}
            </h2>

            {/* Supporting Text */}
            <p className="text-[#AAB7C6] text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl font-normal">
              {subtitle}
            </p>

            {/* Action Buttons (Moderately Rounded 10px-12px) */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {/* Primary Button */}
              <Link
                to="/hotels"
                className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl bg-[#D6A15D] hover:bg-[#C28E4B] text-[#101C2C] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span>Explore Hotels</span>
                <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary WhatsApp Button */}
              <a
                href={WHATSAPP_CONFIG.getLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-[#17283D] hover:bg-[#1E3450] text-[#F7F3EA] font-semibold text-xs sm:text-sm border border-[#2A4160] hover:border-[#D6A15D]/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <FiMessageCircle size={16} className="text-[#D6A15D] group-hover:scale-110 transition-transform" />
                <span>Start on WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Compact Uttarakhand Destination & Hospitality Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md rounded-2xl bg-[#17283D]/95 border border-[#263D5C] p-5 sm:p-6 text-[#F7F3EA] shadow-2xl shadow-[#0D1726]/80 backdrop-blur-xs relative overflow-hidden group">
              {/* Top Scenic Image Window */}
              <div className="relative h-40 sm:h-44 rounded-xl overflow-hidden mb-5 bg-[#0B1522]">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
                  alt="Uttarakhand mountain landscape"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17283D] via-[#17283D]/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-bold text-[#F7F3EA] border border-white/15">
                    Garhwal & Kumaon Belt
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Coordinators Online" />
                </div>

                {/* Bottom Photo Overlay */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#D6A15D] tracking-wide">30°N • Uttarakhand</span>
                  <span className="text-[11px] text-[#AAB7C6]">Handpicked Stays</span>
                </div>
              </div>

              {/* Verified Hospitality Guarantee Rows */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#223650]">
                  <span className="text-[#AAB7C6] font-medium flex items-center gap-1.5">
                    <FiShield size={13} className="text-[#D6A15D]" /> Direct Host Tariffs
                  </span>
                  <span className="text-[#D6A15D] font-bold">Zero Hidden Fees</span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-[#223650]">
                  <span className="text-[#AAB7C6] font-medium flex items-center gap-1.5">
                    <FiMessageCircle size={13} className="text-[#D6A15D]" /> Booking Assistance
                  </span>
                  <span className="text-[#F7F3EA] font-semibold">Direct WhatsApp</span>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[#AAB7C6] font-medium flex items-center gap-1.5">
                    <FiCheck size={13} className="text-[#D6A15D]" /> Local Ground Support
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available On-Call
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
