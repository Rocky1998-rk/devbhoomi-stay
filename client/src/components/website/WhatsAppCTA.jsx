import { useState, useEffect } from "react";
import {
  FiMessageCircle,
  FiCheck,
  FiArrowRight,
  FiShield,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_CONFIG } from "../../constants/config";

const WhatsAppCTA = ({
  title = "Booking that feels familiar.",
  subtitle = "Search for a stay, ask questions and continue your booking journey through WhatsApp with instant local support.",
  ctaText = "Start on WhatsApp",
  className = "",
}) => {
  // Live conversation sequential animation state
  // 0: Initial coordinator greeting
  // 1: Traveler inquiry appears
  // 2: Typing indicator appears
  // 3: Coordinator reply with verified stay offer appears
  const [chatStep, setChatStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setChatStep(1), 1200);
    const t2 = setTimeout(() => setChatStep(2), 2600);
    const t3 = setTimeout(() => setChatStep(3), 4200);

    const loopInterval = setInterval(() => {
      setChatStep(0);
      setTimeout(() => setChatStep(1), 1200);
      setTimeout(() => setChatStep(2), 2600);
      setTimeout(() => setChatStep(3), 4200);
    }, 11000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(loopInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className={`rounded-3xl bg-gradient-to-br from-[#FDFBF8] via-[#F8F5EE] to-[#F1EBE0] border border-[#E5DFD3] text-[#0F172A] p-6 sm:p-9 lg:p-11 relative overflow-hidden shadow-lg shadow-stone-900/5 ${className}`}
    >
      {/* Subtle Warm Ambient Topographic Lighting (Bright & Warm, Zero Dark Gloom) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial from-[#C2956E]/12 via-[#FAF8F5]/0 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-radial from-[#1E3A5F]/6 to-transparent pointer-events-none blur-2xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Content + Benefits + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-5"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-[#1E3A5F] text-xs font-bold uppercase tracking-wider border border-[#E5DFD3] shadow-2xs backdrop-blur-xs">
            <FiMessageCircle className="text-[#C2956E]" size={14} />
            <span>Direct WhatsApp Assistance</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
            {title}
          </h2>

          {/* Description */}
          <p className="text-[#4B586E] text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            {subtitle}
          </p>

          {/* Benefit Checkmarks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 w-full max-w-lg">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1E293B]">
              <span className="w-5 h-5 rounded-lg bg-white text-[#C2956E] border border-[#E5DFD3] flex items-center justify-center shrink-0 shadow-2xs">
                <FiCheck size={13} />
              </span>
              <span className="font-semibold">Direct hotel availability checks</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1E293B]">
              <span className="w-5 h-5 rounded-lg bg-white text-[#C2956E] border border-[#E5DFD3] flex items-center justify-center shrink-0 shadow-2xs">
                <FiCheck size={13} />
              </span>
              <span className="font-semibold">Custom tariff & group quotes</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1E293B]">
              <span className="w-5 h-5 rounded-lg bg-white text-[#C2956E] border border-[#E5DFD3] flex items-center justify-center shrink-0 shadow-2xs">
                <FiCheck size={13} />
              </span>
              <span className="font-semibold">Local hill route & travel tips</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1E293B]">
              <span className="w-5 h-5 rounded-lg bg-white text-[#C2956E] border border-[#E5DFD3] flex items-center justify-center shrink-0 shadow-2xs">
                <FiCheck size={13} />
              </span>
              <span className="font-semibold">No confusing forms or app installs</span>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="pt-2">
            <a
              href={WHATSAPP_CONFIG.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1E3A5F] hover:bg-[#152B46] text-white font-bold text-sm sm:text-base shadow-md shadow-[#1E3A5F]/20 hover:shadow-xl hover:shadow-[#1E3A5F]/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <FiMessageCircle size={19} className="text-[#D4A373] group-hover:scale-110 transition-transform" />
              <span>{ctaText}</span>
              <FiArrowRight size={17} className="text-[#BAC7D5] group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Branded Support Chat Panel with FIXED ROCK-SOLID HEIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 flex justify-center w-full"
        >
          {/* Outer Card with Exact Fixed Height: h-[440px] (Never jumps, resizes or shrinks) */}
          <div className="w-full max-w-sm h-[440px] min-h-[440px] max-h-[440px] rounded-2xl bg-white border border-[#E5DFD3] shadow-xl shadow-stone-900/8 flex flex-col justify-between overflow-hidden shrink-0">
            {/* 1. Chat Header (Exact Fixed Height: 64px) */}
            <div className="h-16 min-h-16 max-h-16 px-4 py-3 bg-[#FAF8F5] border-b border-[#EAE4D9] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  DS
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#0F172A] truncate">DevBhoomi Stay Support</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                    <span className="text-[11px] text-[#4B586E] font-medium">Online & Ready to Help</span>
                  </div>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
            </div>

            {/* 2. Chat Conversation Viewport (Exact Fixed Height: 328px, overflow hidden to prevent any jump) */}
            <div className="h-[328px] min-h-[328px] max-h-[328px] p-3.5 space-y-2.5 overflow-hidden flex flex-col justify-start bg-[#FAF9F6]/50 shrink-0">
              {/* Message 1: Initial Support Welcome (LEFT, Constant) */}
              <div className="bg-[#F5F2EB] text-[#1E293B] border border-[#E7E1D6] rounded-2xl rounded-tl-xs p-3 text-xs mr-auto max-w-[90%] shadow-2xs shrink-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-[#1E3A5F] text-[10px] uppercase tracking-wider">
                    DevBhoomi Coordinator
                  </span>
                  <span className="text-[9px] text-[#7A8A9E]">10:42 AM</span>
                </div>
                <p className="leading-relaxed">
                  Namaste! Looking for a quiet mountain stay in Lansdowne or Kotdwar? Tell us your travel dates and preferences.
                </p>
              </div>

              {/* Message 2: Traveler Inquiry (RIGHT, Step >= 1) */}
              <div className="min-h-[64px] flex items-start justify-end shrink-0">
                <AnimatePresence>
                  {chatStep >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#1E3A5F] text-white rounded-2xl rounded-tr-xs p-3 text-xs ml-auto max-w-[85%] shadow-2xs"
                    >
                      <p className="leading-relaxed">
                        Looking for a valley view room with parking in Lansdowne for this weekend.
                      </p>
                      <span className="text-[9px] text-[#BAC7D5] block text-right mt-1 font-medium">10:43 AM • ✓✓</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Message 3 & 4 Container (LEFT, Step 2 is typing, Step 3 is reply) */}
              <div className="min-h-[105px] flex items-start justify-start shrink-0">
                <AnimatePresence mode="wait">
                  {chatStep === 2 ? (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#F5F2EB] border border-[#E7E1D6] rounded-2xl rounded-tl-xs py-2 px-3 text-xs mr-auto inline-flex items-center gap-2 shadow-2xs"
                    >
                      <div className="flex items-center gap-1">
                        <motion.span
                          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: 0 }}
                          className="w-1.5 h-1.5 rounded-full bg-[#C2956E]"
                        />
                        <motion.span
                          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-[#C2956E]"
                        />
                        <motion.span
                          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: 0.4 }}
                          className="w-1.5 h-1.5 rounded-full bg-[#C2956E]"
                        />
                      </div>
                      <span className="text-[10px] font-medium text-[#4B586E]">Coordinator is checking availability...</span>
                    </motion.div>
                  ) : chatStep >= 3 ? (
                    <motion.div
                      key="response"
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#F5F2EB] text-[#1E293B] border border-[#E7E1D6] rounded-2xl rounded-tl-xs p-3 text-xs mr-auto max-w-[92%] shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-[#1E3A5F] text-[10px] uppercase tracking-wider">
                          DevBhoomi Coordinator
                        </span>
                        <span className="text-[9px] text-[#7A8A9E]">10:43 AM</span>
                      </div>
                      <p className="leading-relaxed">
                        Found 2 verified options with confirmed balcony valley views & on-site parking:
                      </p>
                      <div className="mt-1.5 pt-1.5 border-t border-[#E7E1D6] flex items-center justify-between text-[11px] text-[#1E3A5F] font-bold">
                        <div className="flex items-center gap-1.5">
                          <FiCheckCircle size={13} className="text-[#C2956E]" />
                          <span>Pine Crest Retreat • ₹3,800/n</span>
                        </div>
                        <span className="text-[9px] font-semibold text-[#C2956E] uppercase bg-white px-1.5 py-0.5 rounded border border-[#E5DFD3]">
                          Verified
                        </span>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            {/* 3. Chat Footer (Exact Fixed Height: 48px) */}
            <div className="h-12 min-h-12 max-h-12 px-4 py-2.5 bg-[#FAF8F5] border-t border-[#EAE4D9] flex items-center justify-between text-[11px] text-[#627D98] font-medium shrink-0">
              <span className="flex items-center gap-1.5">
                <FiShield size={13} className="text-[#C2956E]" /> Real Local Team
              </span>
              <span className="flex items-center gap-1.5">
                <FiClock size={13} className="text-[#C2956E]" /> Instant Reply
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WhatsAppCTA;
