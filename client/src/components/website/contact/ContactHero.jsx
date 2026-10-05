import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMessageCircle,
  FiShield,
  FiClock,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { WHATSAPP_CONFIG } from "../../../constants/config";
import heroImageLocal from "../../../assets/destinations/mountain-resort.jpg";

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80";

/* Reference-style trust row: icon + quarter-circle accent + label */
const TRUST_ITEMS = [
  {
    icon: FiClock,
    label: "Quick WhatsApp replies",
    accent: "bg-orange-400",
    iconColor: "text-slate-800",
  },
  {
    icon: FiMapPin,
    label: "Local Garhwal team",
    accent: "bg-[#087F5B]",
    iconColor: "text-slate-800",
  },
  {
    icon: FiShield,
    label: "Verified room pricing",
    accent: "bg-lime-500",
    iconColor: "text-slate-800",
  },
];

const ContactHero = () => {
  const [imgSrc, setImgSrc] = useState(heroImageLocal);

  return (
    <section className="relative bg-white text-slate-900 overflow-hidden pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16">
      {/* Soft background blobs (like reference) */}
      <div className="absolute top-10 left-[38%] w-64 h-64 rounded-[40%_60%_55%_45%] bg-[#E6F4EF] pointer-events-none hidden lg:block" />
      <div className="absolute -bottom-16 right-[12%] w-72 h-44 rounded-[50%] bg-[#E6F4EF] pointer-events-none hidden lg:block" />

      {/* Thin outline loop behind stats (reference detail) */}
      <svg
        className="absolute -bottom-10 -left-16 w-[300px] h-[300px] text-[#087F5B]/30 pointer-events-none hidden lg:block"
        viewBox="0 0 340 340"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M170 20C260 20 320 90 310 180C300 270 220 320 140 305C60 290 20 220 30 150C40 80 100 20 170 20Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.15] font-display">
              <span className="text-[#087F5B]">We're here</span>{" "}
              <span className="text-slate-800">to help with</span>{" "}
              <span className="text-[#087F5B]">your stay.</span>
            </h1>

            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
              Have a question about a hotel, destination or booking? Get in touch
              with our local team for verified room details and friendly guidance.
            </p>

            {/* Buttons: filled + outlined, asymmetric corners like reference */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href={WHATSAPP_CONFIG.getLink(
                  "Hi DevBhoomi Stay, I would like to get in touch regarding a hotel stay."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[18px_18px_18px_6px] bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#087F5B]/30 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
              >
                <FiMessageCircle size={17} className="shrink-0" />
                <span>Start WhatsApp Conversation</span>
              </a>

              <Link
                to="/hotels"
                className="inline-flex items-center justify-center px-6 py-3 rounded-[6px_18px_18px_18px] border border-[#087F5B]/40 text-[#087F5B] hover:bg-[#087F5B]/5 text-xs sm:text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
              >
                Explore Hotels
              </Link>
            </div>

            {/* Trust row styled like the reference stats row */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
              {TRUST_ITEMS.map(({ icon: Icon, label, accent, iconColor }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <span className="relative shrink-0 w-8 h-8">
                    <span
                      className={`absolute top-0 left-0 w-5 h-5 rounded-full opacity-90 ${accent}`}
                    />
                    <Icon
                      size={18}
                      className={`absolute bottom-0 right-0 ${iconColor}`}
                    />
                  </span>
                  <span className="text-xs sm:text-[13px] text-slate-600 font-medium leading-snug pt-0.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Image with big curved bottom-left corner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative overflow-hidden shadow-2xl shadow-slate-900/10 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[440px] rounded-2xl rounded-bl-[70px] sm:rounded-bl-[110px] lg:rounded-bl-[160px] bg-[#E6F4EF]">
              <img
                src={imgSrc}
                onError={() => setImgSrc(FALLBACK_HERO_IMAGE)}
                alt="Boutique mountain retreat and travel assistance in Uttarakhand"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />

              {/* Badge 1: top-right */}
              <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 text-slate-900 shadow-md flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <div className="text-left">
                  <p className="text-[10.5px] font-bold tracking-tight leading-tight">
                    Local Travel Assistance
                  </p>
                  <p className="text-[9.5px] text-[#087F5B] font-medium">
                    Garhwal & Shivalik hills
                  </p>
                </div>
              </div>

              {/* Badge 2: bottom-right (left corner is the big curve) */}
              <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 text-slate-900 shadow-lg max-w-[210px]">
                <div className="flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#087F5B] shrink-0" size={14} />
                  <span className="text-[11.5px] font-bold">Trusted Stays</span>
                </div>
                <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                  Curated boutique hotels & heritage homestays across Uttarakhand.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;