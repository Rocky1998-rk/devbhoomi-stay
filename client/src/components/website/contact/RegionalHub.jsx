import { FiMapPin, FiCompass, FiNavigation, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const sectors = [
  {
    name: "Lansdowne Sector",
    altitude: "1,706 m",
    category: "Hill Station & Pine Forests",
    description: "Pine forest retreats, heritage cottages & hill viewpoints",
    highlights: ["Tip-in-Top Point", "Oak Trails", "Colonial Stays"],
  },
  {
    name: "Kotdwar Gateway",
    altitude: "450 m",
    category: "Foothills & Valley Transit",
    description: "Transit stays, river valley hotels & foothills access",
    highlights: ["Khoh River Valley", "Sidhbali Temple", "Railhead Hub"],
  },
];

const RegionalHub = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl bg-[#052E2B] text-white p-7 sm:p-9 lg:p-10 border border-emerald-800/80 shadow-xl shadow-emerald-950/20 relative overflow-hidden flex flex-col justify-between"
    >
      {/* Background Ambience Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#087F5B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#D6A15D]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Eyebrow & Status Badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-white/15">
            <FiCompass className="text-emerald-400" size={13} />
            <span>REGIONAL HUB</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Desk</span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight leading-snug">
            Serving travellers across Uttarakhand.
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal">
            DevBhoomi Stay assists independent travellers, families, and couples finding tranquil stays in the Shivalik and Garhwal mountain zones.
          </p>
        </div>

        {/* Location Sector Cards */}
        <div className="space-y-3.5 pt-1">
          {sectors.map((sector) => (
            <div
              key={sector.name}
              className="p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <FiMapPin size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-emerald-300 transition-colors">
                      {sector.name}
                    </h4>
                    <span className="text-[11px] text-white/50 block">
                      {sector.category}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/10 text-emerald-300 shrink-0 border border-white/10">
                  {sector.altitude}
                </span>
              </div>

              <p className="mt-2.5 text-xs text-slate-300 leading-relaxed pl-10.5">
                {sector.description}
              </p>

              <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2 pl-10.5 text-[11px] text-emerald-200/80">
                {sector.highlights.map((h, i) => (
                  <span key={i} className="inline-flex items-center gap-1">
                    <FiCheck size={11} className="text-[#D6A15D]" />
                    <span>{h}</span>
                    {i < sector.highlights.length - 1 && (
                      <span className="text-white/20 ml-1">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Travel Coordinator Note */}
        <div className="pt-2">
          <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-700/50 flex items-center gap-3 text-xs text-emerald-100">
            <FiNavigation size={18} className="text-[#D6A15D] shrink-0" />
            <p className="leading-snug">
              Travelling from Delhi NCR? Kotdwar is just 4.5 hours away, and Lansdowne is 1.5 hours further up.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegionalHub;
