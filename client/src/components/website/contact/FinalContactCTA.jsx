import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiMessageCircle,
  FiCompass,
  FiShield,
  FiCheckCircle,
  FiHome,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { WHATSAPP_CONFIG } from "../../../constants/config";
import ctaImageLocal from "../../../assets/destinations/mountain-resort.jpg";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80";

/* ------------------------------------------------------------------
   COLOUR THEMES - change ACTIVE_THEME to "forest", "brand", "navy", "wine" or "charcoal".
   (Full class names are written out so Tailwind can detect them.)
------------------------------------------------------------------- */
const THEMES = {
  // Original deep forest green + emerald (the first version of this section)
  forest: {
    card: "bg-[#031B1A]",
    shadow: "shadow-[#031B1A]/25",
    gradient: "from-[#052E2B] via-[#031B1A] to-[#031B1A]",
    glow1: "bg-[#087F5B]/25",
    glow2: "bg-[#D6A15D]/10",
    eyebrow: "text-emerald-300",
    accentText: "text-emerald-300",
    primaryBtn:
      "bg-emerald-400 hover:bg-emerald-300 text-[#031B1A] shadow-emerald-400/25 focus-visible:outline-emerald-300",
    chip: "bg-emerald-400/15 text-emerald-300",
    imgBottom: "from-[#031B1A]/70",
    imgSide: "lg:from-[#031B1A]/60",
  },
  // Website brand green (#087F5B) with white + gold accents  <- matches the site theme
  brand: {
    card: "bg-[#087F5B]",
    shadow: "shadow-[#087F5B]/30",
    gradient: "from-[#0BA578] via-[#087F5B] to-[#066C4D]",
    glow1: "bg-white/15",
    glow2: "bg-[#D6A15D]/25",
    eyebrow: "text-white",
    accentText: "text-[#FFE0B0]",
    primaryBtn:
      "bg-white hover:bg-emerald-50 text-[#066C4D] shadow-black/20 focus-visible:outline-white",
    chip: "bg-white/20 text-white",
    imgBottom: "from-[#066C4D]/70",
    imgSide: "lg:from-[#087F5B]/70",
  },
  // Deep Himalayan midnight blue + gold
  navy: {
    card: "bg-[#0B1B33]",
    shadow: "shadow-[#0B1B33]/25",
    gradient: "from-[#12305A] via-[#0B1B33] to-[#0B1B33]",
    glow1: "bg-[#3B82F6]/20",
    glow2: "bg-[#D6A15D]/10",
    eyebrow: "text-[#E9B872]",
    accentText: "text-[#E9B872]",
    primaryBtn:
      "bg-[#D6A15D] hover:bg-[#E3B471] text-[#0B1B33] shadow-[#D6A15D]/30 focus-visible:outline-[#E3B471]",
    chip: "bg-[#D6A15D]/15 text-[#E9B872]",
    imgBottom: "from-[#0B1B33]/70",
    imgSide: "lg:from-[#0B1B33]/60",
  },
  // Deep wine / maroon + gold
  wine: {
    card: "bg-[#2A0A18]",
    shadow: "shadow-[#2A0A18]/25",
    gradient: "from-[#4A1230] via-[#2A0A18] to-[#2A0A18]",
    glow1: "bg-[#BE185D]/20",
    glow2: "bg-[#D6A15D]/10",
    eyebrow: "text-[#F0C58A]",
    accentText: "text-[#F0C58A]",
    primaryBtn:
      "bg-[#D6A15D] hover:bg-[#E3B471] text-[#2A0A18] shadow-[#D6A15D]/30 focus-visible:outline-[#E3B471]",
    chip: "bg-[#D6A15D]/15 text-[#F0C58A]",
    imgBottom: "from-[#2A0A18]/70",
    imgSide: "lg:from-[#2A0A18]/60",
  },
  // Warm charcoal + orange
  charcoal: {
    card: "bg-[#18181B]",
    shadow: "shadow-[#18181B]/25",
    gradient: "from-[#2E2E35] via-[#18181B] to-[#18181B]",
    glow1: "bg-[#F97316]/15",
    glow2: "bg-[#D6A15D]/10",
    eyebrow: "text-orange-300",
    accentText: "text-orange-300",
    primaryBtn:
      "bg-orange-400 hover:bg-orange-300 text-[#18181B] shadow-orange-400/30 focus-visible:outline-orange-300",
    chip: "bg-orange-400/15 text-orange-300",
    imgBottom: "from-[#18181B]/70",
    imgSide: "lg:from-[#18181B]/60",
  },
};

const ACTIVE_THEME = "forest";
const t = THEMES[ACTIVE_THEME];

/* The original trust line, split into three chips */
const TRUST = [
  { icon: FiCheckCircle, label: "Zero markup fees" },
  { icon: FiHome, label: "Direct hotel hosts" },
  { icon: FiShield, label: "Verified Uttarakhand stays" },
];

const FinalContactCTA = () => {
  const [imgSrc, setImgSrc] = useState(ctaImageLocal);

  return (
    <section className="relative bg-white py-10 sm:py-12 lg:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`relative isolate overflow-hidden rounded-2xl lg:rounded-3xl ${t.card} text-white shadow-xl ${t.shadow}`}
        >
          {/* Background: gradient, glow, contour lines */}
          <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${t.gradient}`} />
          <div className={`absolute -top-24 -left-16 -z-10 w-[380px] h-[380px] rounded-full ${t.glow1} blur-3xl pointer-events-none`} />
          <div className={`absolute -bottom-24 left-1/3 -z-10 w-[320px] h-[220px] rounded-full ${t.glow2} blur-3xl pointer-events-none`} />
          <svg
            className="absolute bottom-0 left-0 -z-10 w-[500px] h-[320px] text-[#D6A15D] opacity-20 pointer-events-none"
            viewBox="0 0 500 350"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 240C100 180 200 170 300 210C400 250 450 180 500 140" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" />
            <path d="M0 290C120 220 240 210 340 260C440 310 470 230 500 190" stroke="currentColor" strokeWidth="1.2" />
            <path d="M0 340C130 270 250 260 360 310C450 350 480 290 500 250" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 8" />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* LEFT: content */}
            <div className="lg:col-span-7 relative z-10 px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 flex flex-col items-start">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 ${t.eyebrow} text-[11px] font-bold uppercase tracking-widest border border-white/15 backdrop-blur-sm`}>
                <FiCompass size={12} />
                START YOUR JOURNEY
              </span>

              <h2 className="mt-3.5 text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold font-display text-white tracking-tight leading-[1.15]">
                Planning a stay in{" "}
                <span className={t.accentText}>Uttarakhand?</span>
              </h2>

              <p className="mt-3 text-white/85 text-xs sm:text-sm lg:text-base max-w-lg leading-relaxed">
                Explore available hotels or start a direct conversation with our
                local team for customized itinerary and room recommendations.
              </p>

              {/* Buttons: asymmetric corners, same language as the hero */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/hotels"
                  className={`group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[18px_18px_18px_6px] font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${t.primaryBtn}`}
                >
                  <span>Explore Hotels</span>
                  <FiArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href={WHATSAPP_CONFIG.getLink(
                    "Hi DevBhoomi Stay, I am planning a trip to Uttarakhand and would love your assistance."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[6px_18px_18px_18px] border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <FiMessageCircle size={16} className={t.accentText} />
                  <span>Book on WhatsApp</span>
                </a>
              </div>

              {/* Trust chips */}
              <ul className="mt-6 pt-4 border-t border-white/10 w-full flex flex-wrap gap-x-5 gap-y-2">
                {TRUST.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-1.5 text-xs text-white/85"
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${t.chip}`}>
                      <Icon size={11} />
                    </span>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: image panel with the big curved corner (echoes the hero) */}
            <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] lg:min-h-full">
              <div className="absolute inset-0 lg:rounded-bl-[120px] overflow-hidden">
                <img
                  src={imgSrc}
                  onError={() => setImgSrc(FALLBACK_IMAGE)}
                  alt="Mountain retreat stay in Uttarakhand"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                {/* Blend the image into the dark card */}
                <div className={`absolute inset-0 bg-gradient-to-t ${t.imgBottom} via-transparent to-transparent lg:bg-gradient-to-r ${t.imgSide} lg:via-transparent lg:to-transparent`} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalContactCTA;