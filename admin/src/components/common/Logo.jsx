import { Link } from "react-router-dom";
import logoImg from "../../assets/DevBhoomi_Stay_logo_transparent.png";

/**
 * Reusable Brand Logo for DevBhoomi Stay
 * Supports light (dark background/footer) and dark (light navbar) contexts with premium typography.
 */
const Logo = ({
  variant = "dark", // "dark" (for light backgrounds), "light" (for dark navy footer)
  showTagline = true,
  size = "md", // "sm", "md", "lg"
  className = "",
  clickable = true,
}) => {
  const isLight = variant === "light";

  const sizeClasses = {
    sm: { img: "h-11 sm:h-12 w-auto", text: "text-lg sm:text-xl", sub: "text-[11px]" },
    md: { img: "h-13 sm:h-15 w-auto", text: "text-xl sm:text-2xl", sub: "text-xs" },
    lg: { img: "h-15 sm:h-18 w-auto", text: "text-2xl sm:text-3xl", sub: "text-sm" },
  }[size] || { img: "h-13 sm:h-15 w-auto", text: "text-xl sm:text-2xl", sub: "text-xs" };

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Logo Image */}
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <img
          src={logoImg}
          alt="DevBhoomi Stay Logo"
          className={`${sizeClasses.img} object-contain transition-all ${
            isLight ? "brightness-0 invert opacity-95" : ""
          }`}
        />
      </div>

      {/* Brand Typography & Tagline */}
      <div className="flex flex-col">
        <span
          className={`font-display font-extrabold tracking-tight leading-none ${sizeClasses.text} ${
            isLight ? "text-[#F4F1EA]" : "text-[#101828]"
          }`}
        >
          DevBhoomi{" "}
          <span className={isLight ? "text-[#D6A15D]" : "text-[#087F5B]"}>
            Stay
          </span>
        </span>
        {showTagline && (
          <span
            className={`font-medium tracking-normal mt-1 leading-tight ${sizeClasses.sub} ${
              isLight ? "text-[#9AA8B8]" : "text-[#667085]"
            }`}
          >
            Explore. Stay. Experience Uttarakhand.
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link
        to="/"
        className="group inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-[#D6A15D] rounded-lg"
        aria-label="DevBhoomi Stay Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
