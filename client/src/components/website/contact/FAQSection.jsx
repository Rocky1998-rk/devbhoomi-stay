import { useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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

/* Split into two columns like the reference (first half / second half) */
const half = Math.ceil(faqs.length / 2);
const columns = [faqs.slice(0, half), faqs.slice(half)];

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`relative border-b border-stone-300/70 transition-colors duration-200 ${
        isOpen ? "bg-white" : "hover:bg-white/70"
      }`}
    >
      {/* Accent bar on the open item */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#087F5B] origin-top transition-transform duration-300 ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }`}
      />

      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center justify-between gap-3 px-3 sm:px-4 py-3.5 sm:py-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#087F5B]"
        >
          <span className="flex items-center gap-3 min-w-0">
            <span
              className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                isOpen ? "bg-[#087F5B] text-white" : "bg-[#E6F4EF] text-[#087F5B]"
              }`}
            >
              <FiHelpCircle size={15} />
            </span>
            <span
              className={`text-sm sm:text-[15px] font-bold font-display tracking-tight transition-colors ${
                isOpen ? "text-[#087F5B]" : "text-slate-900"
              }`}
            >
              {faq.question}
            </span>
          </span>
          <FiChevronDown
            size={18}
            className={`shrink-0 text-slate-400 transition-transform duration-300 ease-out ${
              isOpen ? "rotate-180 text-[#087F5B]" : ""
            }`}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-3 sm:px-4 pb-4 pl-12 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  // Several answers can stay open at once, first item open by default
  const [openSet, setOpenSet] = useState(() => new Set([0]));

  const toggleFaq = (idx) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <section
      id="faq"
      className="relative bg-[#F6F9F7] border-y border-stone-200/80 py-10 sm:py-12 lg:py-14 overflow-hidden"
    >
      {/* Soft contour lines, echoing the hero */}
      <svg
        className="absolute -top-6 -right-24 w-[480px] h-[480px] text-[#087F5B]/10 pointer-events-none hidden md:block"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 280C140 210 260 200 380 250C500 300 550 210 600 160" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
        <path d="M0 360C160 280 300 270 420 330C540 390 570 290 600 240" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 440C180 350 340 340 460 400C580 460 590 370 600 320" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned header, like the reference */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-8 sm:mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4EF] text-[#087F5B] text-[11px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B]" />
            HELP & COMMON INQUIRIES
          </span>
          <h2 className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Frequently Asked <span className="text-[#087F5B]">Questions</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Common questions about stays, WhatsApp reservations and local assistance.
          </p>
        </motion.div>

        {/* Two-column divider-style accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-14 items-start"
        >
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className="border-t border-stone-300/70 first:mb-0 max-lg:[&:not(:first-child)]:border-t-0"
            >
              {col.map((faq, i) => {
                const idx = colIdx * half + i;
                return (
                  <FAQItem
                    key={idx}
                    faq={faq}
                    index={idx}
                    isOpen={openSet.has(idx)}
                    onToggle={() => toggleFaq(idx)}
                  />
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;