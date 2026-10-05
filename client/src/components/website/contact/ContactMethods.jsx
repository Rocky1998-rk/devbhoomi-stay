import {
  FiMessageCircle,
  FiMail,
  FiMapPin,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { BRAND_CONFIG, WHATSAPP_CONFIG } from "../../../constants/config";

const methods = [
  {
    id: "whatsapp",
    badge: "Instant chat",
    icon: FiMessageCircle,
    title: "WhatsApp Assistance",
    description:
      "Talk to us about your stay, get custom suggestions, and confirm room availability in real time.",
    actionText: "Chat on WhatsApp",
    actionLink: WHATSAPP_CONFIG.getLink(
      "Hi DevBhoomi Stay, I would like to ask about hotel availability."
    ),
    isExternal: true,
    meta: "Available 8:00 AM – 10:00 PM",
    // explicit class strings so Tailwind can see them
    topBar: "bg-[#087F5B]",
    ring: "ring-emerald-100 group-hover:ring-emerald-200",
    iconWrap: "bg-emerald-50 text-[#087F5B]",
    badgeCls: "bg-emerald-50 text-[#087F5B]",
    btn: "bg-[#087F5B] text-white hover:bg-[#066C4D] shadow-md shadow-[#087F5B]/25",
    metaIcon: "text-[#087F5B]",
  },
  {
    id: "email",
    badge: "Detailed inquiries",
    icon: FiMail,
    title: "Email Inquiries",
    description:
      "Send us your question and we'll get back to you with detailed stay information and itineraries.",
    actionText: BRAND_CONFIG.supportEmail,
    actionLink: `mailto:${BRAND_CONFIG.supportEmail}`,
    isExternal: false,
    meta: "Replies within 24 hours",
    topBar: "bg-teal-600",
    ring: "ring-teal-100 group-hover:ring-teal-200",
    iconWrap: "bg-teal-50 text-teal-700",
    badgeCls: "bg-teal-50 text-teal-800",
    btn: "bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200",
    metaIcon: "text-teal-600",
  },
  {
    id: "region",
    badge: "Destination hub",
    icon: FiMapPin,
    title: "Region Coverage",
    description:
      "Serving travellers across Lansdowne, Kotdwar and the surrounding Uttarakhand mountain region.",
    actionText: "Uttarakhand, India",
    actionLink: null,
    isExternal: false,
    meta: "Garhwal & Shivalik Foothills",
    topBar: "bg-amber-500",
    ring: "ring-amber-100 group-hover:ring-amber-200",
    iconWrap: "bg-amber-50 text-amber-700",
    badgeCls: "bg-amber-50 text-amber-800",
    btn: "bg-amber-50 text-amber-900 border border-amber-200",
    metaIcon: "text-amber-600",
  },
];

const ContactMethods = () => {
  return (
    <section className="relative bg-[#F6FAF8] py-10 sm:py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading (centered, like reference) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
            Choose how you'd like to reach us
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Chat, write or find out where we operate. Our local team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {methods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_-10px_rgba(15,23,42,0.1)] hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* Colored top accent bar */}
                <div className={`h-1.5 w-full ${method.topBar}`} />

                {/* Badge at top-left (like the star in the reference) */}
                <span
                  className={`absolute top-3.5 left-3.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${method.badgeCls}`}
                >
                  {method.badge}
                </span>

                <div className="flex flex-col items-center text-center px-5 sm:px-6 pt-9 pb-6 flex-1">
                  {/* Round icon "avatar" with halo ring */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ring-4 transition-all duration-300 ${method.iconWrap} ${method.ring}`}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-3.5 text-base sm:text-lg font-bold font-display text-slate-900 tracking-tight">
                    {method.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-xs">
                    {method.description}
                  </p>

                  {/* Action pinned to bottom so all cards align */}
                  <div className="mt-auto pt-6 w-full flex flex-col items-center gap-2.5">
                    {method.actionLink ? (
                      <a
                        href={method.actionLink}
                        target={method.isExternal ? "_blank" : undefined}
                        rel={method.isExternal ? "noopener noreferrer" : undefined}
                        className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[12px_12px_12px_4px] text-xs sm:text-sm font-semibold break-all transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B] ${method.btn}`}
                      >
                        <span>{method.actionText}</span>
                        <FiArrowRight
                          size={14}
                          className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </a>
                    ) : (
                      <div
                        className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[12px_12px_12px_4px] text-xs sm:text-sm font-semibold ${method.btn}`}
                      >
                        <FiCheckCircle size={14} className="shrink-0" />
                        <span>{method.actionText}</span>
                      </div>
                    )}

                    <p className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <FiClock size={11} className={`shrink-0 ${method.metaIcon}`} />
                      <span>{method.meta}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;