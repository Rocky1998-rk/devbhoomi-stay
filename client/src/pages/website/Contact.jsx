import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMessageCircle,
  FiMail,
  FiMapPin,
  FiChevronDown,
  FiSend,
  FiCheckCircle,
  FiCompass,
  FiArrowRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_CONFIG, WHATSAPP_CONFIG } from "../../constants/config";

const faqs = [
  {
    question: "How can I book a hotel?",
    answer:
      "You can browse available hotels on DevBhoomi Stay, review room features and pricing, and click 'Book on WhatsApp' or 'Book Stay' on any property. This connects you directly with our local team on WhatsApp where we confirm availability and provide secure reservation steps.",
  },
  {
    question: "Can I ask about room availability?",
    answer:
      "Yes, absolutely. WhatsApp is our primary communication channel. You can message us your travel dates, number of guests, and preferences (such as valley view or parking), and we will check live room availability with hotel hosts.",
  },
  {
    question: "Can I get help choosing a hotel?",
    answer:
      "Yes! If you're unsure whether Lansdowne, Kotdwar, or another hill sector fits your itinerary best, our local coordinators will gladly suggest suitable stays matching your budget and travel style.",
  },
  {
    question: "How does WhatsApp booking work?",
    answer:
      "1) Discover your favorite stay on the website. 2) Tap 'Book on WhatsApp' to open a pre-filled chat with property details. 3) Confirm your dates and guest count. 4) Complete the booking directly with clear guidance from our team.",
  },
];

const Contact = () => {
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
  const [openFaq, setOpenFaq] = useState(0); // first open by default

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

  return (
    <div className="space-y-0">
      {/* 9.1 CONTACT HERO */}
      <section className="relative bg-[#031B1A] text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#031B1A] via-[#052E2B]/90 to-[#031B1A] z-0" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#087F5B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/15">
                <FiCompass className="text-emerald-400" />
                <span>CONTACT DEVBHOOMI STAY</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
                We're here to help with your stay.
              </h1>

              <p className="text-slate-200/90 text-base sm:text-xl leading-relaxed max-w-xl">
                Have a question about a hotel, destination or booking? Get in touch with our team.
              </p>

              <div className="pt-2">
                <a
                  href={WHATSAPP_CONFIG.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#087F5B] hover:bg-[#066C4D] text-white text-sm font-bold shadow-md transition-all"
                >
                  <FiMessageCircle size={18} />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"
                  alt="Scenic foothills and travel support in Uttarakhand"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9.2 CONTACT INFORMATION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: WhatsApp */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-7 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#087F5B] flex items-center justify-center mb-5">
                <FiMessageCircle size={24} />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900">
                WhatsApp Assistance
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Talk to us about your stay, get custom suggestions, and confirm room availability.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href={WHATSAPP_CONFIG.getLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#087F5B] hover:text-[#066C4D]"
              >
                <span>Chat on WhatsApp</span>
                <FiArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-7 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-5">
                <FiMail size={24} />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900">
                Email Inquiries
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Send us your question and we'll get back to you with detailed stay information.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href={`mailto:${BRAND_CONFIG.supportEmail}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#087F5B] hover:text-[#066C4D]"
              >
                <span>{BRAND_CONFIG.supportEmail}</span>
                <FiArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-7 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                <FiMapPin size={24} />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900">
                Region Coverage
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Serving travellers across Lansdowne, Kotdwar, and the surrounding Uttarakhand region.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700">
                Uttarakhand, India
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 9.3 CONTACT FORM & REGIONAL HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-md">
            <span className="text-xs font-bold uppercase tracking-widest text-[#087F5B]">
              Direct Message
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Fill in your trip requirements and we'll connect with you directly.
            </p>

            {submitted ? (
              <div className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-800 space-y-4">
                <div className="flex items-center gap-3 text-[#087F5B]">
                  <FiCheckCircle size={28} />
                  <h3 className="text-lg font-bold">Thank you for your message!</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We have received your message details. To get a faster direct response, you can also forward your message straight to our WhatsApp coordinator.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="px-5 py-2.5 rounded-xl bg-[#087F5B] text-white text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <FiMessageCircle size={15} />
                    <span>Open in WhatsApp</span>
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
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 outline-none transition-colors ${
                        formErrors.fullName
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-[#087F5B] bg-slate-50/50 focus:bg-white"
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-rose-500 font-medium">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 outline-none transition-colors ${
                        formErrors.email
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-slate-200 focus:border-[#087F5B] bg-slate-50/50 focus:bg-white"
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-500 font-medium">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#087F5B] bg-slate-50/50 focus:bg-white text-sm text-slate-900 outline-none transition-colors"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Subject / Destination
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#087F5B] bg-slate-50/50 focus:bg-white text-sm text-slate-900 outline-none transition-colors cursor-pointer"
                    >
                      <option value="">Select a topic</option>
                      <option value="Lansdowne Stay Inquiry">Lansdowne Stay Inquiry</option>
                      <option value="Kotdwar Hotel Inquiry">Kotdwar Hotel Inquiry</option>
                      <option value="General Booking Question">General Booking Question</option>
                      <option value="Host / Property Partner">Host / Property Partner</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us your travel dates, number of guests, or questions..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 outline-none transition-colors resize-none ${
                      formErrors.message
                        ? "border-rose-400 bg-rose-50/30"
                        : "border-slate-200 focus:border-[#087F5B] bg-slate-50/50 focus:bg-white"
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-rose-500 font-medium">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-[#087F5B] hover:bg-[#066C4D] text-white font-bold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {submitting ? (
                    <span>Preparing message...</span>
                  ) : (
                    <>
                      <FiSend size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* 9.6 Map / Regional Visual Block */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-[#052E2B] text-white p-8 border border-emerald-800/80 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Regional Hub
              </span>
              <h3 className="mt-2 text-2xl font-display font-bold text-white">
                Serving travellers across Uttarakhand.
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                DevBhoomi Stay assists independent travellers, families, and couples finding tranquil stays in the Shivalik and Garhwal mountain zones.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <FiMapPin className="text-emerald-400 shrink-0" size={16} />
                  <div>
                    <span className="font-bold text-white block">Lansdowne Sector</span>
                    <span className="text-white/70">Pine forest retreats, heritage cottages & hill viewpoints</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <FiMapPin className="text-emerald-400 shrink-0" size={16} />
                  <div>
                    <span className="font-bold text-white block">Kotdwar Gateway</span>
                    <span className="text-white/70">Transit stays, river valley hotels & foothills access</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Support Callout */}
            <div className="rounded-3xl bg-emerald-50 border border-emerald-200/80 p-6 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#087F5B] uppercase tracking-wider">
                  Prefer WhatsApp?
                </span>
                <p className="text-xs text-slate-700">
                  Start an instant chat and get live hotel quotes.
                </p>
              </div>
              <a
                href={WHATSAPP_CONFIG.getLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-[#087F5B] hover:bg-[#066C4D] text-white text-xs font-bold shadow-xs shrink-0 flex items-center gap-1.5"
              >
                <FiMessageCircle size={14} />
                <span>Chat Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9.5 FAQ ACCORDION SECTION */}
      <section id="faq" className="bg-[#F5F8F6] border-y border-slate-200/70 py-24 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#087F5B]">
              Frequently Asked Questions
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Common questions about stays and booking.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-display font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <FiChevronDown
                      size={20}
                      className={`text-[#087F5B] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-2">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9.7 FINAL CONTACT CTA */}
      <section className="bg-[#052E2B] text-white py-20 sm:py-24 border-t border-emerald-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Planning a stay in Uttarakhand?
          </h2>
          <p className="text-emerald-100/80 text-base sm:text-lg max-w-xl mx-auto">
            Explore available hotels or start a conversation with our local team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/hotels"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg transition-all"
            >
              Explore Hotels
            </Link>
            <a
              href={WHATSAPP_CONFIG.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <FiMessageCircle size={18} />
              <span>Book on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
