import { useState, useMemo } from "react";
import {
  FiMapPin,
  FiStar,
  FiCheck,
  FiMessageCircle,
  FiArrowRight,
  FiRotateCw,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { CURATED_HOTELS, WHATSAPP_CONFIG } from "../../constants/config";
import HotelImageCarousel from "./HotelImageCarousel";

const HotelCard = ({ hotel, allowFlip = false, index = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const {
    _id,
    hotelName,
    hotelType,
    city,
    state,
    address,
    description,
    price,
    rating,
    reviewsCount,
    coverImage,
    images = [],
    amenities = [],
    isFeatured,
    roomTypes = [],
    checkInTime,
    checkOutTime,
  } = hotel;

  // Guarantee 8 unique, authentic images specific to THIS hotel
  const allImages = useMemo(() => {
    // Check if this hotel has a dedicated curated 8-image gallery in CURATED_HOTELS
    const curated = CURATED_HOTELS.find(
      (c) =>
        c._id === _id ||
        c.hotelName?.toLowerCase().trim() === hotelName?.toLowerCase().trim()
    );

    let list = [];
    if (Array.isArray(images) && images.length >= 7) {
      list = [...images];
    } else if (curated && Array.isArray(curated.images) && curated.images.length > 0) {
      list = [...curated.images];
    } else if (Array.isArray(images) && images.length > 0) {
      list = [...images];
    } else if (coverImage) {
      list = [coverImage];
    }

    if (coverImage && !list.includes(coverImage)) {
      list.unshift(coverImage);
    }

    return list.slice(0, 8);
  }, [_id, hotelName, images, coverImage]);

  // Alternate entry animation from left (-50) and right (+50)
  const initialX = index % 2 === 0 ? -50 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative h-full ${allowFlip && isFeatured ? "perspective-1000" : ""}`}
    >
      <div
        className={`w-full h-full rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#087F5B]/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden ${
          allowFlip && isFeatured ? "transform-style-3d transition-transform duration-700" : ""
        } ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* FRONT OF CARD */}
        <div className="flex flex-col h-full backface-hidden">
          {/* Automatic Independent Image Carousel (7-8 Photos, Luxury Crossfade) */}
          <HotelImageCarousel
            images={allImages}
            coverImage={coverImage}
            hotelName={hotelName}
            city={city}
            hotelType={hotelType}
            isFeatured={isFeatured}
            allowFlip={allowFlip}
            onFlip={() => setIsFlipped(true)}
            intervalMs={3500}
            onIndexChange={setActiveImageIndex}
          />

          {/* Non-Clickable Synchronized Progress Dots */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-1.5 px-6 pt-3 pb-1" aria-hidden="true">
              {allImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                    activeImageIndex === idx
                      ? "w-6 bg-[#087F5B]"
                      : "w-1.5 bg-slate-200"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Card Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              {/* Location & Rating */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="inline-flex items-center gap-1 text-[#087F5B] font-semibold">
                  <FiMapPin size={14} className="shrink-0" />
                  {city}, {state || "Uttarakhand"}
                </span>

                {rating ? (
                  <span className="inline-flex items-center gap-1 text-slate-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    <FiStar size={12} className="text-amber-500 fill-amber-500" />
                    {rating} {reviewsCount ? `(${reviewsCount})` : ""}
                  </span>
                ) : null}
              </div>

              {/* Title */}
              <h3 className="mt-2 text-xl font-display font-bold text-slate-900 leading-snug hover:text-[#087F5B] transition-colors">
                {hotelName}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                {description || `${hotelType} offering comfortable lodging and scenic surroundings in ${city}.`}
              </p>

              {/* Key Amenities */}
              {amenities.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {amenities.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-100/90 px-2.5 py-1 rounded-lg"
                    >
                      <FiCheck size={11} className="text-[#087F5B]" />
                      {item}
                    </span>
                  ))}
                  {amenities.length > 3 && (
                    <span className="text-[11px] font-medium text-slate-400 self-center">
                      +{amenities.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Pricing & CTA */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div>
                {price ? (
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      Starting from
                    </span>
                    <span className="text-lg font-display font-extrabold text-slate-900">
                      ₹{price.toLocaleString("en-IN")}{" "}
                      <span className="text-xs font-normal text-slate-500">/ night</span>
                    </span>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-slate-500">
                    Contact for tariff
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={WHATSAPP_CONFIG.getHotelInquiryLink(hotelName, city)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-50 text-[#087F5B] hover:bg-[#087F5B] hover:text-white transition-colors duration-200 border border-emerald-200/60 flex items-center justify-center"
                  title="Inquire on WhatsApp"
                  aria-label={`Inquire about ${hotelName} on WhatsApp`}
                >
                  <FiMessageCircle size={18} />
                </a>

                <a
                  href={WHATSAPP_CONFIG.getHotelInquiryLink(hotelName, city)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs font-bold shadow-sm transition-all duration-200 flex items-center gap-1.5"
                >
                  <span>Book Stay</span>
                  <FiArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BACK OF CARD (If 3D Flip Enabled) */}
        {allowFlip && isFeatured && (
          <div className="absolute inset-0 bg-[#052E2B] text-white p-6 rounded-3xl rotate-y-180 backface-hidden flex flex-col justify-between border border-emerald-700/50">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Quick Details
                </span>
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Flip back"
                >
                  <FiRotateCw size={14} />
                </button>
              </div>

              <h4 className="mt-3 text-lg font-display font-bold text-white">
                {hotelName}
              </h4>
              <p className="mt-1 text-xs text-white/70">{address || `${city}, Uttarakhand`}</p>

              {/* Room types */}
              {roomTypes.length > 0 && (
                <div className="mt-4">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-emerald-300">
                    Available Room Categories
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {roomTypes.map((rt, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/90"
                      >
                        {rt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Timings */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-white/5 p-2.5 rounded-xl border border-white/10">
                <div>
                  <span className="text-white/50 block text-[10px]">Check-in</span>
                  <span className="font-semibold text-white">{checkInTime || "12:00 PM"}</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px]">Check-out</span>
                  <span className="font-semibold text-white">{checkOutTime || "11:00 AM"}</span>
                </div>
              </div>

              {/* Full Amenities */}
              {amenities.length > 0 && (
                <div className="mt-3">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block mb-1">
                    Included Amenities
                  </span>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-white/80">
                    {amenities.slice(0, 6).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <FiCheck className="text-emerald-400 shrink-0" size={10} />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10">
              <a
                href={WHATSAPP_CONFIG.getHotelInquiryLink(hotelName, city)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <FiMessageCircle size={16} />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HotelCard;
