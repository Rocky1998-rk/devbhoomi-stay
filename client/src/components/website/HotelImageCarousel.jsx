import { useState, useEffect, useRef } from "react";
import { FiImage, FiRotateCw } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Reusable, independent automatic image carousel for hotel cards.
 * Cycles continuously through 7-8 images with a smooth luxury crossfade + subtle scale transition.
 */
const HotelImageCarousel = ({
  images = [],
  coverImage,
  hotelName = "Hotel",
  city = "Uttarakhand",
  hotelType = "Hotel Stay",
  isFeatured = false,
  allowFlip = false,
  onFlip,
  intervalMs = 3500,
  onIndexChange,
}) => {
  // Ensure we have an array of images
  const allImages =
    images.length > 0
      ? images
      : coverImage
      ? [coverImage]
      : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = allImages.length;
  const isMountedRef = useRef(true);

  // Independent timer for this hotel card
  useEffect(() => {
    isMountedRef.current = true;
    if (total <= 1) return;

    const timer = setInterval(() => {
      if (!isMountedRef.current) return;
      setCurrentIndex((prev) => (prev + 1) % total);
    }, intervalMs);

    return () => {
      isMountedRef.current = false;
      clearInterval(timer);
    };
  }, [total, intervalMs]);

  // Safely notify parent component of index changes
  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  // Preload upcoming image to guarantee silky-smooth transitions without blank flashes
  useEffect(() => {
    if (total <= 1) return;
    const nextIdx = (currentIndex + 1) % total;
    const nextImgUrl = allImages[nextIdx];
    if (nextImgUrl) {
      const img = new Image();
      img.src = nextImgUrl;
    }
  }, [currentIndex, allImages, total]);

  return (
    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
      {/* Background base image to prevent any flash during transitions */}
      <img
        src={allImages[currentIndex]}
        alt=""
        aria-hidden="true"
        onError={(e) => {
          if (coverImage && e.currentTarget.src !== coverImage) {
            e.currentTarget.src = coverImage;
          }
        }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Smooth Crossfade + Subtle Scale Image Animation */}
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={allImages[currentIndex]}
          alt={`${hotelName} in ${city} - Photo ${currentIndex + 1} of ${total}`}
          onError={(e) => {
            if (coverImage && e.currentTarget.src !== coverImage) {
              e.currentTarget.src = coverImage;
            }
          }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Dark Ambient Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none z-10" />

      {/* Top Tag Badges */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-20">
        <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-[#087F5B] text-white shadow-sm pointer-events-auto">
          {hotelType}
        </span>

        {isFeatured && (
          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 shadow-sm pointer-events-auto">
            Featured
          </span>
        )}
      </div>

      {/* Photo Count Pill (Bottom Right) */}
      {total > 1 && (
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white pointer-events-none">
          <FiImage size={13} className="text-emerald-300" />
          <span>{total} photos</span>
        </div>
      )}

      {/* Flip Toggle Button (Bottom Left) */}
      {allowFlip && isFeatured && onFlip && (
        <button
          type="button"
          onClick={onFlip}
          className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold shadow-md transition-colors"
          aria-label="Flip card for quick specs"
        >
          <FiRotateCw size={12} className="text-[#087F5B]" />
          <span>Quick View</span>
        </button>
      )}
    </div>
  );
};

export default HotelImageCarousel;
