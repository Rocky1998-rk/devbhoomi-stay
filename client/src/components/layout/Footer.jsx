import { Link } from "react-router-dom";
import { FiMessageCircle, FiMapPin, FiArrowRight } from "react-icons/fi";
import Logo from "../common/Logo";
import { BRAND_CONFIG, WHATSAPP_CONFIG } from "../../constants/config";

const Footer = () => {
  return (
    <footer className="bg-[#0D1726] text-[#F4F1EA] border-t border-[#1C2E46] relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D6A15D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#142236]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Col (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col items-start space-y-4 sm:space-y-5">
            <Logo variant="light" size="lg" />
            <p className="text-[#9AA8B8] text-sm leading-relaxed max-w-sm font-normal">
              Discover comfortable stays across Lansdowne, Kotdwar and the Garhwal Himalayas with simple booking and local support.
            </p>

            {/* Compact WhatsApp Support Link/Button (Moderately Rounded 8px-10px) */}
            <div className="pt-1">
              <a
                href={WHATSAPP_CONFIG.getLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#142236] hover:bg-[#1A2E4B] text-[#F4F1EA] text-xs font-semibold border border-[#233752] hover:border-[#D6A15D]/40 shadow-2xs transition-all duration-300"
              >
                <FiMessageCircle className="text-[#D6A15D] group-hover:scale-110 transition-transform" size={15} />
                <span>Chat with our team on WhatsApp</span>
                <FiArrowRight className="text-xs text-[#9AA8B8] group-hover:text-[#F4F1EA] group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </div>

          {/* Column 1: EXPLORE */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#D6A15D] uppercase mb-4 font-mono">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9AA8B8]">
              <li>
                <Link to="/" className="hover:text-[#F4F1EA] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-[#F4F1EA] transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/why-us" className="hover:text-[#F4F1EA] transition-colors">
                  Why Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F4F1EA] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: DESTINATIONS */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#D6A15D] uppercase mb-4 font-mono">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9AA8B8]">
              <li>
                <Link to="/hotels?destination=Lansdowne" className="hover:text-[#F4F1EA] transition-colors">
                  Lansdowne
                </Link>
              </li>
              <li>
                <Link to="/hotels?destination=Kotdwar" className="hover:text-[#F4F1EA] transition-colors">
                  Kotdwar
                </Link>
              </li>
              <li>
                <Link to="/hotels?destination=Uttarakhand" className="hover:text-[#F4F1EA] transition-colors">
                  Uttarakhand
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: BOOKING & SUPPORT */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#D6A15D] uppercase mb-4 font-mono">
              Booking & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9AA8B8]">
              <li>
                <Link to="/hotels" className="hover:text-[#F4F1EA] transition-colors">
                  Find a Stay
                </Link>
              </li>
              <li>
                <a
                  href={WHATSAPP_CONFIG.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4F1EA] transition-colors inline-flex items-center gap-1.5"
                >
                  <FiMessageCircle className="text-xs text-[#D6A15D]" />
                  <span>Book on WhatsApp</span>
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F4F1EA] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/contact#faq" className="hover:text-[#F4F1EA] transition-colors">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#1C2E46] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9AA8B8]">
          <p>{BRAND_CONFIG.copyright}</p>
          <div className="flex items-center gap-2 text-[#9AA8B8]">
            <FiMapPin className="text-[#D6A15D] text-sm shrink-0" />
            <span>{BRAND_CONFIG.locationSummary}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
