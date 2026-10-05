import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiMessageCircle, FiStar, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import {
  FeaturedTestimonialCard,
  SecondaryTestimonialCard,
} from "./TestimonialCard";
import TestimonialControls from "./TestimonialControls";
import CountUp from "../common/CountUp";
import { useCountUp, useViewportTrigger } from "../../hooks/useCountUp";
import {
  TESTIMONIALS_DATA,
  TESTIMONIALS_CONFIG,
  GUEST_TRUST_SUMMARY,
  normalizeTestimonials,
} from "../../constants/testimonials";
import { WHATSAPP_CONFIG } from "../../constants/config";

const STAT_ICONS = {
  rating: FiStar,
  stays: FiMapPin,
  verified: FiCheckCircle,
};

const STAT_DURATION = 2000;

/**
 * One trust statistic. The numeric portion is driven by useCountUp (starts at 0,
 * counts up on requestAnimationFrame once `start` flips); the suffix is a plain
 * static element and never animates. Markup and styling are unchanged.
 */
const TrustStat = ({ stat, start }) => {
  const [value, isComplete] = useCountUp(stat.countTo, {
    duration: STAT_DURATION,
    decimals: stat.decimals,
    start,
  });

  const Icon = STAT_ICONS[stat.icon] ?? FiStar;

  return (
    <div className="text-center sm:text-left">
      <dt className="flex items-center justify-center sm:justify-start gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#8A8172]">
        <Icon size={12} className="text-[#D9A354]" aria-hidden="true" />
        <span>{stat.label}</span>
      </dt>
      <dd className="mt-1 font-display font-extrabold text-[#0F1B2D] text-2xl sm:text-3xl tracking-tight">
        <CountUp value={value} decimals={stat.decimals} isComplete={isComplete} />
        <span className="text-base text-[#A79C89]">{stat.suffix}</span>
      </dd>
    </div>
  );
};

const TestimonialsSection = ({ data = TESTIMONIALS_DATA, className = "" }) => {
  const testimonials = useMemo(() => normalizeTestimonials(data), [data]);
  const total = testimonials.length;

  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  // Trust statistics count up once ~25% of the statistics row is on screen.
  const [statsViewportRef, hasStatsEntered] = useViewportTrigger(0.25);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  // Single source of truth for the autoplay cycle: bumped on every slide change
  // and on every resume, which re-creates the interval and restarts the progress
  // line. The effect cleanup guarantees only one timer can ever run.
  const [cycleKey, setCycleKey] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const isPaused = isHoverPaused || isFocusPaused || isTouching;

  const index = total ? Math.min(activeIndex, total - 1) : 0;
  const activeTestimonial = total ? testimonials[index] : null;

  const previewTestimonials = useMemo(() => {
    if (!total) return [];
    return [1, 2]
      .map((offset) => testimonials[(index + offset) % total])
      .filter(Boolean);
  }, [testimonials, index, total]);

  const restartCycle = useCallback(() => {
    setCycleKey((prev) => prev + 1);
  }, []);

  const goNext = useCallback(() => {
    if (total < 2) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
    restartCycle();
  }, [total, restartCycle]);

  const goPrev = useCallback(() => {
    if (total < 2) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
    restartCycle();
  }, [total, restartCycle]);

  const goTo = useCallback(
    (nextIndex) => {
      setDirection(nextIndex > index ? 1 : -1);
      setActiveIndex(nextIndex);
      restartCycle();
    },
    [index, restartCycle],
  );

  const goToTestimonial = useCallback(
    (testimonial) => {
      const nextIndex = testimonials.findIndex(
        (item) => item.id === testimonial.id,
      );
      if (nextIndex >= 0) goTo(nextIndex);
    },
    [testimonials, goTo],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(total - 1);
      }
    },
    [goNext, goPrev, goTo, total],
  );

  // Autoplay — runs while the section is on screen, and is skipped entirely for
  // reduced-motion users (they still get the arrows and pagination).
  useEffect(() => {
    if (isPaused || reduceMotion || !isInView || total < 2) return undefined;

    const autoplayTimer = setInterval(
      goNext,
      TESTIMONIALS_CONFIG.autoplayInterval,
    );

    return () => clearInterval(autoplayTimer);
  }, [isPaused, reduceMotion, isInView, total, cycleKey, goNext]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = event.touches[0].clientX;
    setIsTouching(true);
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    setIsTouching(false);

    if (diff > TESTIMONIALS_CONFIG.swipeThreshold) goNext();
    else if (diff < -TESTIMONIALS_CONFIG.swipeThreshold) goPrev();
    else restartCycle();
  };

  // Viewport entrance helper — subtle, and neutralised for reduced motion.
  const revealProps = (distance, axis = "y", delay = 0) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, [axis]: distance },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: {
      duration: reduceMotion ? 0.25 : 0.6,
      delay: reduceMotion ? 0 : delay,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  });

  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir * 20,
      scale: reduceMotion ? 1 : 0.98,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir * -20,
      scale: reduceMotion ? 1 : 0.98,
      transition: {
        duration: reduceMotion ? 0 : 0.5,
        ease: [0.4, 0, 1, 1],
      },
    }),
  };

  if (!total) return null;

  return (
    <section
      ref={sectionRef}
      id="guest-reviews"
      aria-labelledby="testimonials-heading"
      className={`relative overflow-hidden border-t border-[#EAE4D9] bg-gradient-to-b from-[#FAF7F0] via-[#FDFCF9] to-[#F8F5EE] py-10 sm:py-12 lg:py-14 ${className}`}
    >
      {/* Subtle ambient background — warm contour line art + soft glow */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute -top-16 -left-24 w-[560px] h-[360px] text-[#D9A354]"
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 300C140 240 300 320 460 250C520 224 570 200 600 186"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M0 356C160 296 320 372 470 304C530 278 575 254 600 240"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        <div className="absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-[#D9A354]/8 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---------------------------------------------------------- */}
        {/* SECTION HEADER                                                */}
        {/* ---------------------------------------------------------- */}
        <motion.div {...revealProps(10)} className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0F1B2D]/8 border border-[#0F1B2D]/15 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F1B2D]">
            <FiMessageCircle
              size={13}
              className="text-[#D9A354]"
              aria-hidden="true"
            />
            <span>Real Guest Experiences</span>
          </div>

          <h2
            id="testimonials-heading"
            className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#0F1B2D] tracking-tight leading-[1.18]"
          >
            What our guests say.
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#4B586E] leading-relaxed">
            Honest experiences from travellers who stayed with DevBhoomi Stay.
          </p>
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/* AUTO-PLAYING TESTIMONIAL CAROUSEL                             */}
        {/* ---------------------------------------------------------- */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest reviews"
          className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onPointerEnter={(event) => {
            // Hover pause is pointer-device only — mobile keeps autoplaying
            if (event.pointerType === "mouse") setIsHoverPaused(true);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") {
              setIsHoverPaused(false);
              restartCycle();
            }
          }}
          onFocusCapture={() => setIsFocusPaused(true)}
          onBlurCapture={(event) => {
            // Only resume once focus has genuinely left the carousel, so
            // keyboard users are never raced by a rotating slide.
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsFocusPaused(false);
              restartCycle();
            }
          }}
        >
          {/* LEFT / PRIMARY: FEATURED REVIEW + CONTROLS (~62% width) */}
          <div className="lg:col-span-7">
            {/* Both the incoming and outgoing card occupy the same grid cell, so
                the carousel crossfades without the container ever collapsing. */}
            <motion.div {...revealProps(20, "x")}>
              <div
                className="grid min-h-[420px] sm:min-h-[444px] [&>*]:col-start-1 [&>*]:row-start-1"
                aria-live={isPaused ? "polite" : "off"}
              >
                <AnimatePresence custom={direction} initial={false}>
                  <motion.div
                    key={activeTestimonial.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="h-full"
                  >
                    <FeaturedTestimonialCard testimonial={activeTestimonial} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <TestimonialControls
              total={total}
              currentIndex={index}
              onPrev={goPrev}
              onNext={goNext}
              onSelect={goTo}
              cycleKey={cycleKey}
              autoplayInterval={TESTIMONIALS_CONFIG.autoplayInterval}
              reduceMotion={reduceMotion}
              isPaused={isPaused}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* RIGHT / SECONDARY: NEXT REVIEW PREVIEWS (~38% width) */}
          <div className="lg:col-span-5 w-full min-w-0">
            <div className="flex items-center gap-2.5 px-1">
              <span className="h-px flex-1 bg-[#E4DCCC]" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A8172]">
                More guest experiences
              </span>
              <span className="h-px flex-1 bg-[#E4DCCC]" aria-hidden="true" />
            </div>

            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
              className="mt-4 flex flex-col gap-4 sm:gap-5 sm:min-h-[368px]"
            >
              {previewTestimonials.map((testimonial, previewIndex) => (
                <div
                  key={testimonial.id}
                  className={
                    previewIndex === 1 ? "hidden sm:flex sm:flex-col" : ""
                  }
                >
                  <SecondaryTestimonialCard
                    testimonial={testimonial}
                    isNext={previewIndex === 0}
                    onSelect={goToTestimonial}
                  />
                </div>
              ))}
            </motion.div>

            <p className="mt-4 px-1 text-xs leading-relaxed text-[#8A8172]">
              Reviews are shared by guests who completed a stay booked through
              DevBhoomi Stay.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* TRUST SUMMARY                                                */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          {...revealProps(10)}
          className="mt-12 sm:mt-14 rounded-2xl border border-[#E7E1D6] bg-white/80 px-5 py-6 sm:px-8 sm:py-7"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#F0EAE0]">
            <div className="flex items-center gap-2.5">
              <FiCheckCircle
                size={18}
                className="shrink-0 text-[#D9A354]"
                aria-hidden="true"
              />
              <p className="text-sm sm:text-base font-display font-bold text-[#0F1B2D]">
                {GUEST_TRUST_SUMMARY.label}
              </p>
            </div>

            <a
              href={WHATSAPP_CONFIG.getLink(GUEST_TRUST_SUMMARY.supportMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 self-start rounded-xl border border-[#E7E1D6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F1B2D] hover:border-[#D9A354]/60 transition-colors duration-200"
            >
              <FiMessageCircle
                size={15}
                className="text-[#D9A354]"
                aria-hidden="true"
              />
              <span>{GUEST_TRUST_SUMMARY.supportLabel}</span>
            </a>
          </div>

          <dl
            ref={statsViewportRef}
            className="mt-5 grid grid-cols-3 gap-3 sm:gap-6"
          >
            {GUEST_TRUST_SUMMARY.stats.map((stat) => (
              <TrustStat key={stat.id} stat={stat} start={hasStatsEntered} />
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
