import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheck,
  FiMessageCircle,
  FiShield,
  FiHeadphones,
  FiCompass,
  FiInfo,
  FiHome,
} from "react-icons/fi";
import { motion } from "framer-motion";
import BookingSearch from "../../components/website/BookingSearch";
import DestinationCard from "../../components/website/DestinationCard";
import HotelCard from "../../components/website/HotelCard";
import DestinationCarousel from "../../components/website/DestinationCarousel";
import WhatsAppCTA from "../../components/website/WhatsAppCTA";
import {
  HERO_VIDEO_URL,
  HERO_POSTER_IMAGE,
  DESTINATIONS_DATA,
  WHATSAPP_CONFIG,
} from "../../constants/config";
import { fetchAllHotels } from "../../services/hotelService";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadHotels = async () => {
      try {
        const data = await fetchAllHotels();
        if (isMounted) {
          setHotels(data.slice(0, 6)); // Show top 6 stays on Home
          setLoadingHotels(false);
        }
      } catch {
        if (isMounted) setLoadingHotels(false);
      }
    };
    loadHotels();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-0">
      {/* 6.1 & 6.2 HERO SECTION WITH CINEMATIC VIDEO */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-950 pb-16 sm:pb-20">
        {/* Background Video - 100% Clear & Vivid */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            // poster={HERO_POSTER_IMAGE}
            className="w-full h-full object-cover object-center scale-100 transform duration-500"
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
          {/* Ambient Overlay for crystal clear readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 flex flex-col items-center text-center">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 text-emerald-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/20 mb-6 shadow-lg"
          >
            <FiCompass className="text-emerald-400" />
            <span>YOUR STAY. YOUR WAY.</span>
          </motion.div>

          {/* Main Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight max-w-4xl leading-[1.1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
          >
            Stay closer to the places that move you.
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-white font-medium max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            Discover handpicked stays across Uttarakhand, with simple booking and local support through WhatsApp.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/hotels"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#087F5B] hover:bg-[#066C4D] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Explore Hotels</span>
              <FiArrowRight />
            </Link>

            <a
              href={WHATSAPP_CONFIG.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-black/40 hover:bg-black/60 text-white font-bold text-sm sm:text-base border border-white/30 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg"
            >
              <FiMessageCircle className="text-emerald-300 text-lg" />
              <span>Book on WhatsApp</span>
            </a>
          </motion.div>

          {/* Quick Pillars */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white font-medium"
          >
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15 shadow-sm">
              <FiCheck className="text-emerald-400" /> Verified Hill Properties
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15 shadow-sm">
              <FiCheck className="text-emerald-400" /> Direct WhatsApp Assistance
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15 shadow-sm">
              <FiCheck className="text-emerald-400" /> Zero Concealed Charges
            </span>
          </motion.div> */}
        </div>
      </section>

      {/* 6.4 SEARCH PANEL - Exactly 50/50 centered across the boundary between Hero & Next Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-5xl mx-auto"
        >
          <BookingSearch />
        </motion.div>
      </div>

      {/* 6.5 DESTINATIONS SECTION: EXPLORE UTTARAKHAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-24 sm:pb-28 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#087F5B]">
              Explore Uttarakhand
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Find your next mountain escape.
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl text-base sm:text-lg">
              From peaceful hill stays to convenient gateways, discover places that make every journey worth remembering.
            </p>
          </div>

          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#087F5B] hover:text-[#066C4D] group"
          >
            <span>View all destination stays</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DESTINATIONS_DATA.map((dest, idx) => (
            <DestinationCard key={dest.id} destination={dest} index={idx} />
          ))}
        </div>
      </section>

      {/* 6.6 FEATURED STAYS */}
      <section className="bg-[#F5F8F6] border-y border-slate-200/70 py-24 sm:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#087F5B]">
                Handpicked Stays
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
                Stays worth discovering.
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl text-base sm:text-lg">
                Comfortable places, clear information and a simpler way to book.
              </p>
            </div>

            <Link
              to="/hotels"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-800 hover:border-[#087F5B] hover:text-[#087F5B] transition-colors shadow-sm"
            >
              <span>Explore All Hotels</span>
              <FiArrowRight />
            </Link>
          </motion.div>

          {loadingHotels ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-3xl bg-white border border-slate-200 p-4 animate-pulse space-y-4">
                  <div className="aspect-[16/10] bg-slate-200 rounded-2xl" />
                  <div className="h-5 bg-slate-200 rounded w-2/3" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-10 bg-slate-200 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {hotels.map((hotel, idx) => (
                <HotelCard key={hotel._id} hotel={hotel} allowFlip={true} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6.7 WHY DEV BHOOMI STAY - EDITORIAL HOSPITALITY SECTION */}
      <section className="relative bg-[#FAF8F5] border-y border-[#EAE4D9] py-14 sm:py-16 lg:py-20 overflow-hidden">
        {/* Subtle Decorative Himalayan Topographic Background Contour Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
          <svg
            className="absolute -top-24 -right-24 w-[650px] h-[650px] text-[#C2956E]/20"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 300C120 220 220 200 320 240C420 280 500 210 580 150"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
            <path
              d="M20 380C110 290 240 270 350 320C460 370 520 290 600 230"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M0 460C100 370 260 340 380 400C500 460 550 370 620 310"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
            <circle cx="350" cy="320" r="4" fill="currentColor" />
            <circle cx="320" cy="240" r="3" fill="currentColor" />
          </svg>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#1E3A5F]/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* TOP DUAL-COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
            {/* LEFT COLUMN: Editorial Narrative, Trust Pillars & Brand Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-5 flex flex-col justify-between space-y-5"
            >
              {/* Top Editorial Intro Block */}
              <div>
                {/* Small Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A5F]/8 border border-[#1E3A5F]/15 mb-3.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1E3A5F]">
                    WHY DEV BHOOMI STAY
                  </span>
                </div>

                {/* Large Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-display font-extrabold text-[#0F172A] tracking-tight leading-[1.14] mb-3.5">
                  Travel should feel simple.
                </h2>

                {/* Supporting Text */}
                <p className="text-[#4B586E] text-base sm:text-[17px] leading-relaxed font-normal mb-4">
                  From discovering the right stay to getting help when you need it, DevBhoomi Stay keeps the booking experience straightforward.
                </p>

                {/* Himalayan Editorial Coordinates & Metadata Badge */}
                <div className="p-3.5 rounded-2xl bg-white/90 border border-[#E7E1D6] flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center font-serif text-xs font-bold">
                      30°N
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] tracking-wide">
                        Uttarakhand Himalayan Belt
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        Himalayan stays • Local support
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#C2956E] uppercase tracking-wider bg-[#FAF6F0] px-2.5 py-1 rounded-md border border-[#E9DFD3]">
                    <span>Local First</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-4">
                  <Link
                    to="/why-us"
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1E3A5F] hover:bg-[#152B46] text-white text-sm font-bold shadow-sm hover:shadow-md hover:shadow-[#1E3A5F]/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span>Learn why DevBhoomi Stay</span>
                    <FiArrowRight className="text-[#D4A373] group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* 3 Core Trust Pillars */}
              <div className="w-full space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-white border border-[#E7E1D6] shadow-2xs hover:shadow-sm transition-all duration-300 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1E3A5F]/8 text-[#1E3A5F] flex-shrink-0 flex items-center justify-center mt-0.5">
                    <FiShield size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">Direct Host Tariffs</h4>
                    <p className="text-[11px] sm:text-xs text-[#4B586E] leading-relaxed mt-0.5">
                      No hidden portal commissions or unexpected convenience charges at check-in.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E7E1D6] shadow-2xs hover:shadow-sm transition-all duration-300 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1E3A5F]/8 text-[#1E3A5F] flex-shrink-0 flex items-center justify-center mt-0.5">
                    <FiCompass size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">Real Himalayan Ground Support</h4>
                    <p className="text-[11px] sm:text-xs text-[#4B586E] leading-relaxed mt-0.5">
                      Live road weather checks & pass conditions across Garhwal & Kumaon.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E7E1D6] shadow-2xs hover:shadow-sm transition-all duration-300 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1E3A5F]/8 text-[#1E3A5F] flex-shrink-0 flex items-center justify-center mt-0.5">
                    <FiMessageCircle size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">Human-First Coordination</h4>
                    <p className="text-[11px] sm:text-xs text-[#4B586E] leading-relaxed mt-0.5">
                      Direct WhatsApp assistance with verified local destination coordinators.
                    </p>
                  </div>
                </div>
              </div>

              {/* Regional Hospitality Promise Capsule */}
              <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-[#F4EFEA] border border-[#E3D8CC] text-[#1E293B]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#C2956E]" />
                  <span className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider">
                    Our Himalayan Guarantee
                  </span>
                </div>
                <p className="text-xs text-[#4B586E] italic leading-relaxed">
                  "Every stay on DevBhoomi is personally verified so your mountain journey is peaceful, transparent, and genuinely memorable."
                </p>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Asymmetrical Feature Composition (01, 02, 03) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
              {/* FEATURE 01: Handpicked Stays (Dominant Hero Feature) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#E7E1D6] shadow-sm hover:shadow-lg transition-all duration-500"
              >
                {/* Photo Showcase Area */}
                <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-56 sm:max-h-64 overflow-hidden bg-[#1E293B]">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                    alt="Authentic Himalayan mountain stay in Uttarakhand"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                    loading="lazy"
                  />
                  {/* Subtle Dark Gradient & Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/30 to-transparent" />
                  
                  {/* Top Metadata Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-3 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-bold text-white border border-white/20 tracking-wider">
                      Uttarakhand • Handpicked
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-[#1E3A5F] font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                      01
                    </span>
                  </div>

                  {/* Bottom Photo Overlay Text */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#D4A373] bg-[#D4A373]/20 backdrop-blur-xs px-2 py-0.5 rounded border border-[#D4A373]/30">
                        Hygiene & Comfort Checked
                      </span>
                      <span className="text-[11px] text-slate-200">
                        Authentic Mountain Character
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-5.5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A] tracking-tight">
                        Handpicked stays
                      </h3>
                      <p className="mt-1.5 text-sm sm:text-[15px] text-[#4B586E] leading-relaxed">
                        Curated hotels, homestays and retreats chosen for comfort, hygiene, and authentic mountain character.
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-[#1E3A5F]/8 text-[#1E3A5F] flex-shrink-0 flex items-center justify-center">
                      <FiShield size={18} />
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3.5 border-t border-[#EAE4D9] flex flex-wrap items-center gap-3.5 text-xs font-semibold text-[#3B5370]">
                    <div className="flex items-center gap-1.5">
                      <FiCheck className="text-[#C2956E]" />
                      <span>Zero unverified listings</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiCheck className="text-[#C2956E]" />
                      <span>Scenic view guarantees</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiCheck className="text-[#C2956E]" />
                      <span>Host background checks</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ASYMMETRICAL 2-COLUMN SUB-GRID: Feature 02 & Feature 03 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* FEATURE 02: Simple WhatsApp Booking */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                  whileHover={{ y: -3 }}
                  className="rounded-3xl bg-white border border-[#E7E1D6] p-5 sm:p-5.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header with Number & Icon */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="font-mono text-xs font-bold text-[#C2956E] tracking-widest uppercase">
                        02
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-[#1E3A5F]/8 text-[#1E3A5F] group-hover:bg-[#1E3A5F] group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                        <FiMessageCircle size={16} />
                      </div>
                    </div>

                    {/* Chat Capsule Visual */}
                    <div className="mb-3.5 p-3 rounded-xl bg-[#F7F5F0] border border-[#EAE4D9] space-y-2 text-xs">
                      <div className="bg-white p-2 rounded-lg rounded-tl-xs text-[#1E293B] shadow-2xs border border-[#E7E1D6] max-w-[92%]">
                        <span className="text-[10px] text-[#64748B] block">Traveler</span>
                        "Need a cottage with valley views in Lansdowne"
                      </div>
                      <div className="bg-[#1E3A5F] text-white p-2 rounded-lg rounded-tr-xs ml-auto max-w-[94%] shadow-2xs">
                        <span className="text-[10px] text-[#D4A373] block">Coordinator</span>
                        "Direct tariff confirmed. No surprise fees ✓"
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-display font-bold text-[#0F172A] mb-1.5 tracking-tight">
                      Simple WhatsApp booking
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B586E] leading-relaxed">
                      Direct conversations with local coordinators. No convoluted checkouts or surprise convenience fees.
                    </p>
                  </div>

                  <a
                    href={WHATSAPP_CONFIG.getLink("Hi DevBhoomi Stay, I want to inquire about simple booking support.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] hover:text-[#152B46] tracking-wide"
                  >
                    <span>Connect on WhatsApp</span>
                    <FiArrowRight size={13} className="text-[#C2956E] group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>

                {/* FEATURE 03: Clear Hotel Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.55, delay: 0.14, ease: [0.21, 0.47, 0.32, 0.98] }}
                  whileHover={{ y: -3 }}
                  className="rounded-3xl bg-white border border-[#E7E1D6] p-5 sm:p-5.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header with Number & Icon */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="font-mono text-xs font-bold text-[#C2956E] tracking-widest uppercase">
                        03
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-[#1E3A5F]/8 text-[#1E3A5F] group-hover:bg-[#1E3A5F] group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                        <FiInfo size={16} />
                      </div>
                    </div>

                    {/* Stay Specs Sheet Visual */}
                    <div className="mb-3.5 p-3 rounded-xl bg-[#F7F5F0] border border-[#EAE4D9] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-[#1E293B] pb-1 border-b border-[#E8E2D6]">
                        <span className="text-[#64748B]">Real Photos</span>
                        <span className="font-bold text-[#1E3A5F]">100% Genuine</span>
                      </div>
                      <div className="flex items-center justify-between text-[#1E293B] pb-1 border-b border-[#E8E2D6]">
                        <span className="text-[#64748B]">Location</span>
                        <span className="font-bold text-[#1E3A5F]">Exact GPS Pin</span>
                      </div>
                      <div className="flex items-center justify-between text-[#1E293B]">
                        <span className="text-[#64748B]">Pricing Policy</span>
                        <span className="font-bold text-[#C2956E]">Zero Hidden Tariffs</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-display font-bold text-[#0F172A] mb-1.5 tracking-tight">
                      Clear hotel information
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B586E] leading-relaxed">
                      Transparent tariffs, genuine photos, listed amenities, and exact location markers you can trust.
                    </p>
                  </div>

                  <Link
                    to="/hotels"
                    className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] hover:text-[#152B46] tracking-wide"
                  >
                    <span>Browse verified stays</span>
                    <FiArrowRight size={13} className="text-[#C2956E] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BOTTOM FULL-WIDTH BANNER: FEATURE 04 Local Travel Support (Spanning across full container with ZERO empty gaps) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -2 }}
            className="mt-6 sm:mt-8 relative rounded-2xl sm:rounded-3xl bg-[#132235] text-white border border-[#21354F] p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden group"
          >
            {/* Decorative Ambient Radial Glow */}
            <div className="absolute top-0 right-0 w-96 h-full bg-radial from-[#C2956E]/15 to-transparent pointer-events-none opacity-50" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-8">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-[#D4A373] tracking-widest uppercase">
                    04 / Mountain Assistance
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C2956E]/20 text-[#D4A373] text-[10px] font-bold border border-[#C2956E]/30">
                    Live Advisory
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-white tracking-tight">
                  Local travel support & mountain route guidance
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Real assistance with road conditions, weather updates, and itinerary guidance across Uttarakhand's Garhwal and Kumaon valleys.
                </p>
              </div>

              <div className="flex-shrink-0 flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs text-slate-200">
                  <FiCompass className="text-[#D4A373]" size={15} />
                  <span>Weather & Pass Conditions</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs text-slate-200">
                  <FiHeadphones className="text-[#D4A373]" size={15} />
                  <span>Regional Concierge On-Call</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6.8 WHATSAPP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <WhatsAppCTA />
      </section>

      {/* 6.9 TRAVEL STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden min-h-[440px] sm:min-h-[480px] flex items-center shadow-xl border border-slate-200/50"
        >
          {/* Crisp, Clear Himalayan Mountain Image */}
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85"
            alt="Scenic mountain journey in Uttarakhand"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-95 contrast-[1.05]"
          />

          {/* Smooth, subtle gradient overlay that keeps the right-side mountains clear while ensuring left text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-black/20" />

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#F1DFCD]">
                DevBhoomi Journal
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
              Made for mountain journeys.
            </h2>

            <p className="text-slate-100 text-base sm:text-lg leading-relaxed max-w-xl font-normal drop-shadow-xs">
              DevBhoomi Stay brings destinations, stays and booking support together for travellers exploring Uttarakhand.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-black/40 text-white text-xs font-semibold backdrop-blur-md border border-white/25 shadow-xs">
                Lansdowne
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-black/40 text-white text-xs font-semibold backdrop-blur-md border border-white/25 shadow-xs">
                Kotdwar
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-black/40 text-white text-xs font-semibold backdrop-blur-md border border-white/25 shadow-xs">
                Uttarakhand
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 6.10 EXPLORE UTTARAKHAND DESTINATION CAROUSEL (Replacing Final CTA Section) */}
      <DestinationCarousel />
    </div>
  );
};

export default Home;
