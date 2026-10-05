import { FiStar, FiMapPin, FiCheckCircle, FiShield } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

const AVATAR_SIZES = {
  sm: "w-9 h-9 text-xs",
  md: "w-12 h-12 sm:w-14 sm:h-14 text-sm sm:text-base",
};

/**
 * Proportional star rating. The filled row is clipped to the exact rating
 * percentage, so 4.5 renders as four full stars plus a half star rather than
 * being rounded to a misleading five.
 */
const StarRating = ({ rating = 0, size = 14, showValue = false }) => {
  const value = Math.min(5, Math.max(0, Number(rating) || 0));
  const fillPercent = (value / 5) * 100;

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5">
      <span
        role="img"
        aria-label={`Rated ${value} out of 5`}
        className="relative inline-flex shrink-0"
      >
        <span className="flex gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <FiStar
              key={index}
              size={size}
              className="fill-transparent stroke-[#CFC6B6]"
            />
          ))}
        </span>

        <span
          className="absolute left-0 top-0 overflow-hidden"
          style={{ width: `${fillPercent}%` }}
          aria-hidden="true"
        >
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <FiStar
                key={index}
                size={size}
                className="fill-[#D9A354] stroke-[#D9A354]"
              />
            ))}
          </span>
        </span>
      </span>

      {showValue && (
        <span className="text-xs font-bold text-[#0F1B2D] tabular-nums">
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
};

const GuestAvatar = ({ initials, image, guestName, size = "md" }) => {
  const sizeClass = AVATAR_SIZES[size] ?? AVATAR_SIZES.md;

  if (image) {
    return (
      <img
        src={image}
        alt={`${guestName} profile photo`}
        loading="lazy"
        className={`${sizeClass} shrink-0 rounded-full object-cover border border-[#E5DFD3]`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${sizeClass} shrink-0 rounded-full bg-[#0F1B2D] text-white font-display font-bold tracking-wide flex items-center justify-center border border-[#D9A354]/40`}
    >
      {initials}
    </span>
  );
};

const VerifiedGuestBadge = () => (
  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#FBF3E6] border border-[#D9A354]/35 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A6320] whitespace-nowrap">
    <FiCheckCircle size={11} className="text-[#D9A354]" aria-hidden="true" />
    <span>Verified Guest</span>
  </span>
);

/**
 * Featured review — the dominant testimonial in the carousel.
 * Uses h-full + a flexible quote block so every slide occupies the same height
 * and the page never jumps while the review text changes.
 */
export const FeaturedTestimonialCard = ({ testimonial }) => (
  <article className="flex h-full flex-col rounded-2xl bg-white border border-[#E5DFD3] shadow-lg shadow-[#0F1B2D]/5 p-5 sm:p-7">
    <header className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <GuestAvatar
          initials={testimonial.initials}
          image={testimonial.image}
          guestName={testimonial.guestName}
          size="md"
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <h3 className="font-display font-bold text-[#0F1B2D] text-base sm:text-lg tracking-tight">
              {testimonial.guestName}
            </h3>
            {testimonial.verified && <VerifiedGuestBadge />}
          </div>

          <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-[#718096]">
            <FiMapPin size={12} className="shrink-0 text-[#D9A354]" aria-hidden="true" />
            <span className="font-semibold text-[#4B586E]">
              {testimonial.location}
            </span>
            {testimonial.hotelName && (
              <>
                <span aria-hidden="true">•</span>
                <span className="truncate">{testimonial.hotelName}</span>
              </>
            )}
            {testimonial.verifiedStay && (
              <span className="inline-flex items-center gap-1 font-semibold text-[#8A6320]">
                <FiShield size={11} aria-hidden="true" />
                <span>Verified stay</span>
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <StarRating rating={testimonial.rating} size={14} showValue />
      </div>
    </header>

    <div className="mt-5 flex flex-1 flex-col">
      <FaQuoteLeft
        size={18}
        aria-hidden="true"
        className="mb-2.5 shrink-0 text-[#D9A354]"
      />
      <blockquote className="max-w-3xl text-[15px] sm:text-[17px] leading-relaxed text-[#1E293B] font-medium">
        “{testimonial.review}”
      </blockquote>
    </div>

    <footer className="mt-6 pt-4 border-t border-[#F0EAE0] flex items-center justify-between gap-4">
      <p className="text-xs font-semibold text-[#718096]">
        {testimonial.stayDate}
      </p>

      {testimonial.propertyImage && (
        <img
          src={testimonial.propertyImage}
          alt={testimonial.propertyImageAlt}
          loading="lazy"
          width="80"
          height="64"
          className="h-14 w-16 sm:h-16 sm:w-20 shrink-0 rounded-lg object-cover border border-[#E5DFD3]"
        />
      )}
    </footer>
  </article>
);

/**
 * Secondary review preview — compact card in the right-hand stack.
 * `isNext` marks the review that will be featured on the following tick.
 */
export const SecondaryTestimonialCard = ({
  testimonial,
  isNext = false,
  onSelect,
}) => (
  <button
    type="button"
    onClick={() => onSelect?.(testimonial)}
    aria-label={`Show the review from ${testimonial.guestName} on ${testimonial.location}`}
    className={`group w-full h-full text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 cursor-pointer ${
      isNext
        ? "bg-[#FDFAF3] border-[#D9A354]/45 shadow-sm hover:shadow-md"
        : "bg-white border-[#E5DFD3] shadow-sm hover:border-[#D9A354]/55 hover:shadow-md"
    }`}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <GuestAvatar
          initials={testimonial.initials}
          image={testimonial.image}
          guestName={testimonial.guestName}
          size="sm"
        />
        <div className="min-w-0">
          <p className="text-sm font-display font-bold text-[#0F1B2D] truncate">
            {testimonial.guestName}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#718096]">
            <FiMapPin size={11} className="shrink-0 text-[#D9A354]" aria-hidden="true" />
            <span className="truncate">{testimonial.location}</span>
          </p>
        </div>
      </div>

      <StarRating rating={testimonial.rating} size={12} showValue />
    </div>

    <p className="mt-3 text-sm leading-relaxed text-[#4B586E] line-clamp-3">
      “{testimonial.review}”
    </p>

    <div className="mt-3 pt-3 border-t border-[#F0EAE0] flex items-center justify-between gap-3">
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0F1B2D] truncate">
        {testimonial.hotelName || "Verified stay"}
      </span>

      {isNext ? (
        <span className="inline-flex items-center gap-1.5 shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A6320]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9A354]" aria-hidden="true" />
          Next up
        </span>
      ) : (
        testimonial.verified && (
          <span className="inline-flex items-center gap-1 shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A8172]">
            <FiCheckCircle size={11} className="text-[#D9A354]" aria-hidden="true" />
            Verified
          </span>
        )
      )}
    </div>
  </button>
);

export default FeaturedTestimonialCard;
