import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiLock,
  FiMail,
  FiShield,
  FiArrowRight,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

/**
 * DevBhoomi Official Brand Emblem Logo
 * Features the DB monogram emblem with Himalayan snow peaks, winding scenic road, and gold emerald DB initials (transparent background).
 */
const DevBhoomiOfficialLogo = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      <img
        src="/images/devbhoomi-official-logo.png"
        alt="DevBhoomi Stay Resort & Homestay"
        className="w-full h-full object-contain drop-shadow-md select-none transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

/**
 * 1. Curated Stays Bed Icon (Solid golden hotel bed matching reference)
 */
const BedIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#EFA236]" aria-hidden="true">
    <path d="M3 6a1 1 0 0 1 1-1h1v8h14V9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v9a1 1 0 0 1-2 0v-2H5v2a1 1 0 0 1-2 0V6z" />
    <path d="M7 8.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V11H7V8.5zm7 0a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V11h-5V8.5z" />
  </svg>
);

/**
 * 2. Local Experiences Mountain Peak Icon (Golden mountain with white snow cap matching reference)
 */
const MountainPeakIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-4.5 sm:h-4.5" aria-hidden="true">
    <path d="M2.5 19L12 5.5L21.5 19H2.5Z" fill="#EFA236" />
    <path
      d="M12 5.5L15 9.8L13.8 11.2L12 10.2L10.2 11.2L9 9.8L12 5.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

/**
 * 3. Secure Platform Shield Check Icon (Golden shield outline with checkmark matching reference)
 */
const ShieldCheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#EFA236]"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@devbhoomistay.com");
  const [password, setPassword] = useState("Admin@123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Authenticate as Super Admin
      login(
        {
          _id: "admin-rocky-001",
          name: "Rocky Kumar",
          email: email || "admin@devbhoomistay.com",
          role: "admin",
        },
        "devbhoomi-superadmin-token-2026"
      );

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError("Failed to sign in. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen lg:h-screen bg-white flex flex-col lg:flex-row overflow-x-hidden font-['Inter'] selection:bg-[#0E4D3C] selection:text-white">
      
      {/* ========================================================
          LEFT SECTION (54% Full Screen Visual Hero)
         ======================================================== */}
      <div className="relative w-full lg:w-[54%] min-h-[460px] lg:h-full bg-[#07241B] flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 overflow-hidden text-white select-none shrink-0">
        {/* Full-Bleed Landscape Background Image */}
        <img
          src="/images/admin-login-hero.jpg"
          alt="DevBhoomi Stay Luxury Mountain Resort Lansdowne"
          className="absolute inset-0 w-full h-full object-cover object-center scale-100"
        />

        {/* Cinematic Vignette & Gradient Overlays for High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent pointer-events-none" />

        {/* Top Brand Header with New Official Emblem Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <DevBhoomiOfficialLogo className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-lg" />
          <div>
            <div className="text-white font-bold text-base sm:text-lg lg:text-xl tracking-tight leading-none">
              DevBhoomi Stay
            </div>
            <div className="text-[9.5px] sm:text-[10px] font-semibold text-[#CBD5E1] tracking-[0.24em] uppercase mt-1">
              LANSDOWNE • KOTDWAR
            </div>
          </div>
        </div>

        {/* Middle Hero Headline & Subtitle */}
        <div className="relative z-10 my-auto py-6 lg:py-8">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] text-white tracking-wide leading-[1.22] font-kaushan drop-shadow-md">
            Discover the soul <br />
            <span className="text-[#FBBF24]">of Uttarakhand</span>
          </h1>

          {/* Amber Accent Bar */}
          <div className="w-14 h-1 bg-[#F59E0B] rounded-full mt-3.5 mb-3.5 shadow-sm" />

          <p className="text-sm sm:text-base lg:text-[15.5px] text-white/90 max-w-md font-normal leading-relaxed font-['Outfit',sans-serif] tracking-wide">
            A smarter way to manage stays across Lansdowne &amp; Kotdwar.
          </p>
        </div>

        {/* Bottom 3 Highlights / Feature Badges with clean spacing */}
        <div className="relative z-10 flex items-center justify-between gap-1 sm:gap-2.5 pt-4 border-t border-white/15">
          {/* 1. Curated Stays */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#07241B]/90 border-2 border-[#EFA236] flex items-center justify-center shrink-0 shadow-md">
              <BedIcon />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] sm:text-xs xl:text-[13px] font-bold text-white leading-tight">
                Curated stays
              </div>
              <div className="text-[9.5px] sm:text-[10.5px] text-white/70 leading-tight mt-0.5 truncate">
                Verified &amp; quality stays
              </div>
            </div>
          </div>

          {/* Dedicated Divider 1 */}
          <div className="w-px h-6 sm:h-7 bg-white/25 shrink-0 mx-1 sm:mx-1.5" />

          {/* 2. Local Experiences */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#07241B]/90 border-2 border-[#EFA236] flex items-center justify-center shrink-0 shadow-md">
              <MountainPeakIcon />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] sm:text-xs xl:text-[13px] font-bold text-white leading-tight">
                Local experiences
              </div>
              <div className="text-[9.5px] sm:text-[10.5px] text-white/70 leading-tight mt-0.5 truncate">
                Explore Uttarakhand
              </div>
            </div>
          </div>

          {/* Dedicated Divider 2 */}
          <div className="w-px h-6 sm:h-7 bg-white/25 shrink-0 mx-1 sm:mx-1.5" />

          {/* 3. Secure Platform */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#07241B]/90 border-2 border-[#EFA236] flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheckIcon />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] sm:text-xs xl:text-[13px] font-bold text-white leading-tight">
                Secure platform
              </div>
              <div className="text-[9.5px] sm:text-[10.5px] text-white/70 leading-tight mt-0.5 truncate">
                Trusted &amp; reliable
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          RIGHT SECTION (46% Full Screen Form Section)
         ======================================================== */}
      <div className="relative w-full lg:w-[46%] min-h-[500px] lg:h-full bg-white flex flex-col justify-start px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-6 overflow-hidden">
        {/* Subtle Sage Mountain Silhouette Graphic along the Bottom Edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none select-none z-0 opacity-80 bg-no-repeat bg-bottom bg-cover"
          style={{ backgroundImage: "url('/images/admin-login-mountain-footer.png')" }}
        />

        {/* Form Content Wrapper (Shifted towards top with reduced left/right margins) */}
        <div className="relative z-10 w-full max-w-[460px] mx-auto">
          {/* Header Group with New Official Logo Badge */}
          <div className="text-center mb-5 sm:mb-6">
            <div className="flex justify-center mb-3">
              <DevBhoomiOfficialLogo className="w-20 h-20 sm:w-22 sm:h-22 drop-shadow-xl" />
            </div>

            <h2 className="text-2xl sm:text-[25px] font-bold text-[#0F172A] tracking-tight">
              DevBhoomi Stay
            </h2>
            <p className="text-xs text-[#64748B] mt-1 font-medium">
              Lansdowne &amp; Kotdwar Platform Administration
            </p>
          </div>

          {error && (
            <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Admin Email Input */}
            <div>
              <label className="block text-[#0F172A] font-semibold mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] w-4 h-4 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@devbhoomistay.com"
                  className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0E4D3C] focus:border-transparent transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Master Password Input with Show / Hide Toggle */}
            <div>
              <label className="block text-[#0F172A] font-semibold mb-1">
                Master Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] w-4 h-4 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl border border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0E4D3C] focus:border-transparent transition-all shadow-xs tracking-wider"
                />
                {/* Password Show / Hide Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0E4D3C] p-1 rounded-lg transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 sm:py-3.5 px-4 rounded-xl bg-[#063D2E] hover:bg-[#042A20] text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] group"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Admin Dashboard"}</span>
              <FiArrowRight className="w-4 h-4 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Bottom Navigation Back to Website */}
        <div className="mt-4 pt-3 border-t border-[#E2E8F0]/70 flex items-center justify-between text-xs text-[#64748B] relative z-10 w-full max-w-[420px] mx-auto">
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-[#0E4D3C] transition-colors font-medium"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Website</span>
          </Link>
          <span className="text-[11px] text-[#94A3B8] font-medium">
            DevBhoomi Stay Admin v2.0
          </span>
        </div>
      </div>

    </div>
  );
};

export default AdminLogin;
