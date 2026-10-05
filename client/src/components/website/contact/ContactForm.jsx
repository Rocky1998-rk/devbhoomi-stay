import { useState } from "react";
import {
  FiSend,
  FiCheckCircle,
  FiMessageCircle,
  FiRotateCcw,
  FiMapPin,
  FiChevronDown,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { WHATSAPP_CONFIG } from "../../../constants/config";
import {
  WORLD_DOTS_PATH,
  MAP_WIDTH,
  MAP_HEIGHT,
  UTTARAKHAND_PIN,
  TEAL_DOTS,
} from "./worldDots";

/* ---------- Map location cards ----------
   x / y = CENTRE of the card in % of the map. Cards stay inside the map at
   any screen size. Add or remove a city by editing this list. */
const CARD_W = 136;
const MAP_RATIO = 1.45; // map box width / height (reference style)

const LOCATIONS = [
  { id: "uttarakhand", name: "Uttarakhand, India", note: "Garhwal & Shivalik hills", x: 76, y: 12 },
  { id: "lansdowne", name: "Lansdowne", note: "Stay inquiries", x: 24, y: 16 },
  { id: "rishikesh", name: "Rishikesh", note: "Riverside stays", x: 82, y: 60 },
  { id: "dehradun", name: "Dehradun", note: "Gateway city", x: 28, y: 66 },
  { id: "kotdwar", name: "Kotdwar", note: "Hotel inquiries", x: 58, y: 88 },
];

const LocationCard = ({ name, note, className = "", style }) => (
  <div
    style={style}
    className={`flex items-center gap-1.5 bg-white rounded-lg pl-1.5 pr-2.5 py-1 shadow-[0_10px_20px_-6px_rgba(15,23,42,0.2)] border border-slate-100 ${className}`}
  >
    <span className="w-5 h-5 shrink-0 rounded-full bg-[#E6F4EF] text-[#087F5B] flex items-center justify-center">
      <FiMapPin size={11} />
    </span>
    <div className="leading-tight min-w-0">
      <p className="text-[10px] font-bold text-slate-900 truncate">{name}</p>
      <p className="text-[8.5px] text-slate-400 truncate">{note}</p>
    </div>
  </div>
);

/* ---------- Soft filled field (label sits inside, like the reference) ---------- */
const fieldBase =
  "w-full rounded-xl px-3.5 pt-5 pb-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none border transition-all";
const fieldOk =
  "border-transparent bg-[#F3F6F5] focus:bg-white focus:border-[#087F5B] focus:ring-4 focus:ring-[#087F5B]/10";
const fieldErr =
  "border-rose-400 bg-rose-50/40 focus:ring-4 focus:ring-rose-500/10";

const Field = ({ id, label, required, optional, error, children }) => (
  <div>
    <div className="relative">
      <label
        htmlFor={id}
        className="absolute top-1.5 left-3.5 z-10 text-[9px] font-semibold uppercase tracking-wider text-slate-400 pointer-events-none"
      >
        {label}
        {required && <span className="text-rose-500"> *</span>}
        {optional && (
          <span className="normal-case tracking-normal font-normal"> (optional)</span>
        )}
      </label>
      {children}
    </div>
    {error && (
      <p className="mt-1 pl-1 text-[10.5px] text-rose-500 font-medium">{error}</p>
    )}
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) errors.message = "Message cannot be empty";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    // Simulate frontend form submission / redirect to WhatsApp intent with formatted message
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleSendViaWhatsApp = () => {
    const msg = `Hi DevBhoomi Stay, my name is ${formData.fullName || "a traveller"}. Subject: ${
      formData.subject || "General Inquiry"
    }. Message: ${formData.message || "I would like more information on stays."} (Email: ${
      formData.email || "N/A"
    }, Phone: ${formData.phone || "N/A"})`;
    window.open(WHATSAPP_CONFIG.getLink(msg), "_blank");
  };

  const inputCls = (name) => `${fieldBase} ${formErrors[name] ? fieldErr : fieldOk}`;

  return (
    <section className="relative bg-white py-10 sm:py-12 lg:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered heading, like the reference */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#087F5B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B]" />
            DIRECT MESSAGE
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Send us a message
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Fill in your trip requirements and we'll connect with you directly with
            tailored hotel options.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            {submitted ? (
              <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 text-slate-800 space-y-4">
                <div className="flex items-start gap-3 text-[#087F5B]">
                  <FiCheckCircle size={28} className="shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">
                      Thank you for your message!
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                      We have received your trip details. Our Uttarakhand travel desk
                      will review them and reach out promptly.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-white/80 border border-emerald-100 text-xs text-slate-700 leading-relaxed">
                  Need faster quotes or immediate room availability? Forward this
                  message directly to our WhatsApp coordinator.
                </div>

                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="px-5 py-2.5 rounded-[16px_16px_16px_4px] bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#087F5B]/20 flex items-center justify-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <FiMessageCircle size={16} />
                    <span>Forward to WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="px-4 py-2.5 rounded-[4px_16px_16px_16px] bg-white hover:bg-stone-100 border border-stone-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FiRotateCcw size={14} />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                <Field id="fullName" label="Full Name" required error={formErrors.fullName}>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className={inputCls("fullName")}
                  />
                </Field>

                <Field id="email" label="Email Address" required error={formErrors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@example.com"
                    className={inputCls("email")}
                  />
                </Field>

                <Field id="phone" label="Phone Number" optional>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className={inputCls("phone")}
                  />
                </Field>

                <Field id="subject" label="Subject / Destination">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputCls("subject")} appearance-none cursor-pointer pr-10`}
                  >
                    <option value="">Select a topic / location</option>
                    <option value="Lansdowne Stay Inquiry">Lansdowne Stay Inquiry</option>
                    <option value="Kotdwar Hotel Inquiry">Kotdwar Hotel Inquiry</option>
                    <option value="General Booking Question">General Booking Question</option>
                    <option value="Host / Property Partner">Host / Property Partner</option>
                  </select>
                  <FiChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </Field>

                <Field id="message" label="Your Message" required error={formErrors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us your travel dates, preferred destination, number of guests, or questions..."
                    className={`${inputCls("message")} pt-5.5 resize-y min-h-[95px]`}
                  />
                </Field>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-[18px_18px_18px_6px] bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#087F5B]/30 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F5B]"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin motion-reduce:animate-none" />
                        <span>Preparing message...</span>
                      </span>
                    ) : (
                      <>
                        <FiSend size={15} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* RIGHT: Dotted world map, centred against the full form height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div
              className="relative w-full max-h-full"
              style={{ aspectRatio: `${MAP_RATIO} / 1` }}
            >
              {/* Dots (stretched to the box, dots stay perfectly round) */}
              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <path
                  d={WORLD_DOTS_PATH}
                  fill="none"
                  stroke="#D3DDD9"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Small teal dots on land, like the reference */}
              {TEAL_DOTS.map((dot, i) => (
                <span
                  key={i}
                  className="absolute w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-600"
                  style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                />
              ))}

              {/* Connector lines + floating cards (desktop only) */}
              <div className="absolute inset-0 hidden lg:block">
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  aria-hidden="true"
                >
                  {LOCATIONS.map((loc) => (
                    <line
                      key={loc.id}
                      x1={`${loc.x}%`}
                      y1={`${loc.y}%`}
                      x2={`${UTTARAKHAND_PIN.x}%`}
                      y2={`${UTTARAKHAND_PIN.y}%`}
                      stroke="#087F5B"
                      strokeOpacity="0.45"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  ))}
                </svg>

                {LOCATIONS.map((loc) => (
                  <LocationCard
                    key={loc.id}
                    name={loc.name}
                    note={loc.note}
                    className="absolute"
                    style={{
                      left: `${loc.x}%`,
                      top: `${loc.y}%`,
                      width: CARD_W,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </div>

              {/* Uttarakhand pin with pulse */}
              <span
                className="absolute -translate-x-1/2 -translate-y-1/2 flex h-4 w-4"
                style={{
                  left: `${UTTARAKHAND_PIN.x}%`,
                  top: `${UTTARAKHAND_PIN.y}%`,
                }}
              >
                <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-[#087F5B] opacity-50" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-[#087F5B] border-2 border-white shadow-md" />
              </span>
            </div>

            {/* Cards listed under the map on tablet / mobile */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
              {LOCATIONS.map((loc) => (
                <LocationCard
                  key={loc.id}
                  name={loc.name}
                  note={loc.note}
                  className="border border-stone-100"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;