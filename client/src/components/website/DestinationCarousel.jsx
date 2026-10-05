import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCompass,
  FiMapPin,
  FiShield,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Authentic real destination photography assets
import imgLansdowneRidge from "../../assets/destinations/lansdowne-ridge.jpg";
import imgKotdwarGateway from "../../assets/destinations/kotdwar-gateway.jpg";
import imgGarhwalPeaks from "../../assets/destinations/garhwal-peaks.jpg";
import imgTipInTop from "../../assets/destinations/tip-in-top.jpg";
import imgMountainResort from "../../assets/destinations/mountain-resort.jpg";
import imgCottageEscape from "../../assets/destinations/cottage-escape.jpg";
import imgPineTrails from "../../assets/destinations/pine-trails.jpg";
import imgVerifiedStay from "../../assets/destinations/verified-stay.jpg";

const DESTINATION_SLIDES = [
  {
    id: "01",
    title: "Lansdowne",
    category: "PINE RIDGE & RETREATS",
    location: "Pauri Garhwal • 1,706 m",
    description:
      "Quiet mountain stays surrounded by ancient pine forests, colonial walking trails, and panoramic valley views.",
    image: imgLansdowneRidge,
    link: "/hotels?destination=Lansdowne",
    badge: "Most Loved Destination",
  },
  {
    id: "02",
    title: "Kotdwar Gateway",
    category: "FOOTHILL GATEWAY",
    location: "Khoh River Valley • 450 m",
    description:
      "A peaceful foothill transit retreat connecting plains to high hill routes with comfortable riverside stays.",
    image: imgKotdwarGateway,
    link: "/hotels?destination=Kotdwar",
    badge: "Hill Gateway",
  },
  {
    id: "03",
    title: "Garhwal Himalayas",
    category: "ALPINE SANCTUARIES",
    location: "Himalayan Ridge Belt",
    description:
      "Snow-peaked landscapes, peaceful nature retreats, and authentic regional mountain hospitality.",
    image: imgGarhwalPeaks,
    link: "/hotels?destination=Uttarakhand",
    badge: "Panoramic Views",
  },
  {
    id: "04",
    title: "Lansdowne Valley & Tip-in-Top",
    category: "SCENIC RIDGE STAYS",
    location: "Upper Lansdowne Ridge",
    description:
      "Scenic clifftop stays with morning mist, birdsong trails, and unobstructed sunrise mountain views.",
    image: imgTipInTop,
    link: "/hotels?destination=Lansdowne",
    badge: "Sunrise Viewpoint",
  },
  {
    id: "05",
    title: "Local Mountain Retreats",
    category: "HANDPICKED RESORTS",
    location: "Verified Stay Collection",
    description:
      "Curated heritage lodges, wooden homestays, and boutique hotels chosen for authentic mountain comfort.",
    image: imgMountainResort,
    link: "/hotels",
    badge: "Curated Hotels",
  },
  {
    id: "06",
    title: "Uttarakhand Weekend Escapes",
    category: "QUICK GETAWAYS",
    location: "Garhwal Hill Range",
    description:
      "Short mountain escapes from Delhi NCR with verified check-ins and direct local WhatsApp guidance.",
    image: imgCottageEscape,
    link: "/hotels",
    badge: "Weekend Friendly",
  },
  {
    id: "07",
    title: "Nature & Pine Trails",
    category: "NATURE & TRANQUILITY",
    location: "Tarkeshwar Forest Belt",
    description:
      "Peaceful forest walking trails, quiet hill viewpoints, and rejuvenating fresh mountain air.",
    image: imgPineTrails,
    link: "/hotels",
    badge: "Nature Trails",
  },
  {
    id: "08",
    title: "Verified Local Stays",
    category: "TRANSPARENT BOOKING",
    location: "DevBhoomi Stay Verified",
    description:
      "Comfortable properties with transparent tariffs, genuine photos, and personal WhatsApp host coordination.",
    image: imgVerifiedStay,
    link: "/hotels",
    badge: "100% Verified",
  },
];

const AUTOPLAY_INTERVAL = 4500; // 4.5 seconds

const DestinationCarousel = ({ className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [progressKey, setProgressKey] = useState(0);
  const totalSlides = DESTINATION_SLIDES.length;

  // Swipe handling state for mobile touch
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef(null);

  const resetAutoplay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
      setProgressKey((prev) => prev + 1);
    }, AUTOPLAY_INTERVAL);
  }, [totalSlides]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [resetAutoplay]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgressKey((prev) => prev + 1);
    resetAutoplay();
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgressKey((prev) => prev + 1);
    resetAutoplay();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const activeSlide = DESTINATION_SLIDES[currentIndex];
  const nextSlide = DESTINATION_SLIDES[(currentIndex + 1) % totalSlides];

  return (
    <section
      className={`relative bg-[#F7F3EA] border-t border-[#EAE4D9] py-10 sm:py-12 lg:py-14 overflow-hidden ${className}`}
    >
      {/* Subtle Himalayan Topographic Contour Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <svg
          className="absolute top-1/2 right-[-100px] -translate-y-1/2 w-[800px] h-[500px] text-[#D9A354]"
          viewBox="0 0 800 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 250C200 160 400 320 600 200C700 140 760 220 800 190"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M0 320C180 240 380 380 580 270C680 210 750 280 800 250"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#0F1B2D]/4 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Section Info, Editorial Heading, Controls */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0F1B2D]/8 border border-[#0F1B2D]/15 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F1B2D] mb-3 backdrop-blur-xs">
                <FiCompass size={13} className="text-[#D9A354]" />
                <span>EXPLORE UTTARAKHAND</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#0F1B2D] tracking-tight leading-[1.18]">
                Places worth staying for.
              </h2>

              {/* Supporting Text */}
              <p className="mt-2 text-xs sm:text-sm text-[#4B586E] leading-relaxed font-normal">
                Discover handpicked stays and mountain destinations across Lansdowne, Kotdwar and the Garhwal Himalayas.
              </p>
            </div>

            {/* Supporting Context Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E7DFD3] text-[11px] font-bold text-[#0F1B2D] shadow-2xs">
                <FiMapPin size={12} className="text-[#D9A354]" />
                8 Curated Experiences
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E7DFD3] text-[11px] font-bold text-[#0F1B2D] shadow-2xs">
                <FiShield size={12} className="text-[#D9A354]" />
                100% Verified Stays
              </span>
            </div>

            {/* Progress Bar & Slide Counter */}
            <div className="pt-3 border-t border-[#EAE4D9]">
              <div className="flex items-center justify-between mb-2 text-xs font-mono font-bold">
                <span className="text-[#0F1B2D] text-sm tracking-wider">
                  {activeSlide.id} <span className="text-[#718096] font-normal text-xs">/ 08</span>
                </span>
                <span className="text-[11px] font-sans font-semibold text-[#718096] uppercase tracking-wider">
                  {activeSlide.title}
                </span>
              </div>

              {/* Animated Progress Line */}
              <div className="w-full h-1 bg-[#E7DFD3] rounded-full overflow-hidden relative">
                <motion.div
                  key={progressKey}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: AUTOPLAY_INTERVAL / 1000,
                    ease: "linear",
                  }}
                  className="h-full bg-[#D9A354] rounded-full"
                />
              </div>
            </div>

            {/* Navigation Buttons (Moderate 10px-12px Rectangular Radius) */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous destination slide"
                className="group w-12 h-11 rounded-xl bg-white hover:bg-[#0F1B2D] text-[#0F1B2D] hover:text-[#F7F3EA] border border-[#E0D7C9] hover:border-[#0F1B2D] shadow-xs flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <FiArrowLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next destination slide"
                className="group w-12 h-11 rounded-xl bg-white hover:bg-[#0F1B2D] text-[#0F1B2D] hover:text-[#F7F3EA] border border-[#E0D7C9] hover:border-[#0F1B2D] shadow-xs flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <FiArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>

              <span className="text-xs text-[#718096] font-medium ml-2 select-none">
                Autoplay every 4.5s
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Advanced Editorial Multi-Card Carousel */}
          {/* ============================================================ */}
          <div
            className="lg:col-span-7 relative w-full overflow-hidden py-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative flex items-center">
              {/* Active Dominant Editorial Card */}
              <div className="w-full relative z-20">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeSlide.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -direction * 40, scale: 0.97 }}
                    transition={{
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative rounded-2xl overflow-hidden bg-white border border-[#E5DFD3] shadow-xl shadow-[#0F1B2D]/8 group"
                  >
                    {/* Destination Photo Stage */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#0A1424]">
                      <img
                        src={activeSlide.image}
                        alt={`${activeSlide.title} - ${activeSlide.location}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 contrast-[1.02]"
                      />

                      {/* Top Gradient & Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1424]/95 via-[#0A1424]/30 to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                        <span className="px-3 py-1 rounded-lg bg-black/55 backdrop-blur-md text-[11px] font-bold text-[#F7F3EA] border border-white/20 tracking-wider font-mono">
                          {activeSlide.category}
                        </span>

                        <span className="px-2.5 py-1 rounded-lg bg-[#D9A354] text-[#0A1424] text-[11px] font-black tracking-wider shadow-sm">
                          {activeSlide.badge}
                        </span>
                      </div>

                      {/* Bottom Photo Overlay Information */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                        <div className="flex items-center gap-1.5 text-xs text-[#D9A354] font-semibold mb-1">
                          <FiMapPin size={13} />
                          <span>{activeSlide.location}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight drop-shadow-sm">
                          {activeSlide.title}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom Editorial Content Area */}
                    <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="text-sm text-[#4B586E] leading-relaxed max-w-md">
                        {activeSlide.description}
                      </p>

                      <Link
                        to={activeSlide.link}
                        className="group/btn inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F1B2D] hover:bg-[#1A2D4A] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 shrink-0 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <span>Explore stays</span>
                        <FiArrowUpRight
                          size={16}
                          className="text-[#D9A354] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                        />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Partial Next Card Peek (Desktop Visual Depth) */}
              <div
                onClick={handleNext}
                className="hidden xl:block absolute right-[-28%] w-[32%] top-6 bottom-6 rounded-2xl overflow-hidden bg-slate-900 border border-[#E5DFD3] opacity-40 hover:opacity-75 transition-opacity cursor-pointer z-10 pointer-events-auto"
                title={`Next: ${nextSlide.title}`}
              >
                <img
                  src={nextSlide.image}
                  alt={nextSlide.title}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-[#0A1424]/40" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono font-bold text-[#D9A354] block">
                    {nextSlide.id}
                  </span>
                  <p className="text-xs font-bold text-white truncate">
                    {nextSlide.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationCarousel;
