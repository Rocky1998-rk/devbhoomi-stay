import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiMessageCircle, FiArrowUpRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../common/Logo";
import { WHATSAPP_CONFIG } from "../../constants/config";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Hotels", to: "/hotels" },
  { label: "Why Us", to: "/why-us" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll shadow and compact appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync scroll lock with mobile menu state
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E4E7EC]"
          : "bg-white/90 backdrop-blur-sm border-b border-[#F0F2F5]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 sm:h-22 items-center justify-between py-2">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Logo variant="dark" size="md" />
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-[#087F5B] bg-[#087F5B]/8"
                      : "text-[#475467] hover:text-[#087F5B] hover:bg-[#F5F8F6]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={WHATSAPP_CONFIG.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Book a hotel stay on WhatsApp"
            >
              <FiMessageCircle className="text-base text-emerald-100" />
              <span>Book on WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#087F5B]"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-20 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Slide Down Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-x-0 top-20 bg-white border-b border-slate-200 shadow-xl z-50 md:hidden px-5 py-6 max-h-[calc(100vh-5rem)] overflow-y-auto"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3.5 rounded-xl text-base font-semibold flex items-center justify-between transition-colors ${
                        isActive
                          ? "bg-[#087F5B]/10 text-[#087F5B]"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#087F5B]"
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <FiArrowUpRight className="text-slate-400" />
                  </NavLink>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href={WHATSAPP_CONFIG.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#087F5B] hover:bg-[#066C4D] text-white font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <FiMessageCircle size={19} />
                  <span>Book on WhatsApp</span>
                </a>
                <p className="text-center text-xs text-slate-500 mt-2">
                  Lansdowne • Kotdwar • Uttarakhand
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
