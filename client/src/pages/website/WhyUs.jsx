import { Link } from "react-router-dom";
import {
  FiCompass,
  FiEye,
  FiMessageCircle,
  FiMapPin,
  FiArrowRight,
  FiCheck,
  FiSearch,
} from "react-icons/fi";
import DestinationCard from "../../components/website/DestinationCard";
import WhatsAppCTA from "../../components/website/WhatsAppCTA";
import FinalCTA from "../../components/website/FinalCTA";
import { DESTINATIONS_DATA, WHATSAPP_CONFIG } from "../../constants/config";

const coreBenefits = [
  {
    number: "01",
    title: "Discover better",
    description: "Explore stays across Uttarakhand from one simple platform, avoiding cluttered portals with outdated listings.",
    icon: FiSearch,
  },
  {
    number: "02",
    title: "Know before you book",
    description: "Access clear information about hotels, rooms and available options with accurate photos, true amenities, and clear location details.",
    icon: FiEye,
  },
  {
    number: "03",
    title: "Book through WhatsApp",
    description: "Continue your booking conversation through a familiar messaging experience without mandatory app downloads or endless signups.",
    icon: FiMessageCircle,
  },
  {
    number: "04",
    title: "Local-first experience",
    description: "Built specifically around destinations and stays across Uttarakhand by people who understand the mountain roads and regional hospitality.",
    icon: FiMapPin,
  },
];

const pillars = [
  {
    title: "Clear information",
    description: "Transparent tariffs, genuine photos, listed amenities, and precise check-in details with no concealed fees.",
  },
  {
    title: "Simple communication",
    description: "Direct chat on WhatsApp allows you to ask specific questions about parking, room views, and food options before paying.",
  },
  {
    title: "Focused destinations",
    description: "Dedicated focus on Lansdowne, Kotdwar, and the surrounding Garhwal belt ensures tailored and accurate local support.",
  },
];

const steps = [
  {
    number: "01",
    name: "Explore",
    desc: "Browse authentic stays filtered by destination, room type, and amenities with verified photography.",
  },
  {
    number: "02",
    name: "Compare",
    desc: "Review room specifics, view angles, included amenities, and transparent pricing side-by-side.",
  },
  {
    number: "03",
    name: "Connect",
    desc: "Reach out via WhatsApp to confirm real-time room availability, special requests, and complete your reservation.",
  },
];

const WhyUs = () => {
  return (
    <div className="space-y-0">
      {/* 8.1 WHY US HERO */}
      <section className="relative bg-[#031B1A] text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#031B1A] via-[#052E2B]/85 to-[#031B1A] z-0" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#087F5B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/15">
                <FiCompass className="text-emerald-400" />
                <span>WHY DEVBHOOMI STAY</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
                Travel should feel simpler.
              </h1>

              <p className="text-slate-200/90 text-base sm:text-xl leading-relaxed max-w-xl">
                Discover stays, understand your options and continue your booking journey in a way that feels familiar.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
                <Link
                  to="/hotels"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#087F5B] hover:bg-[#066C4D] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Hotels</span>
                  <FiArrowRight />
                </Link>

                <a
                  href={WHATSAPP_CONFIG.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <FiMessageCircle className="text-emerald-300" />
                  <span>Talk on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
                  alt="Pine mountains in Lansdowne Uttarakhand"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-xs text-white">
                  <p className="font-bold text-emerald-300">Local Mountain Perspective</p>
                  <p className="text-white/80 mt-0.5">Handpicked for peace, hygiene, and authentic views.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8.2 CORE BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#087F5B]">
            Our Foundation
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Everything you need to choose your stay with confidence.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {coreBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.number}
                className="rounded-3xl bg-white border border-slate-200/80 p-8 shadow-sm hover:shadow-md hover:border-[#087F5B]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-display font-black text-[#087F5B]/30">
                      {benefit.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#087F5B] flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8.3 TRAVEL EXPERIENCE SECTION */}
      <section className="bg-[#F5F8F6] border-y border-slate-200/70 py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image on Left for visual balance */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                  alt="Scenic mountain journey in Uttarakhand"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content on Right */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#087F5B]">
                Traveller-Centric Approach
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                Built around the way people actually travel.
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Sometimes travellers know where they want to go but not where they want to stay. DevBhoomi Stay brings destinations, stays and booking support together so the journey from discovery to booking feels easier.
              </p>

              <div className="pt-2">
                <div className="inline-flex items-center gap-2 text-sm font-bold text-[#087F5B]">
                  <FiCheck className="text-lg" />
                  <span>Real property knowledge, genuine photos, and direct WhatsApp contact.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8.4 HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#087F5B]">
            How It Works
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            From search to stay in three steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl bg-white border border-slate-200/80 p-8 shadow-xs flex flex-col justify-between"
            >
              <span className="text-4xl font-display font-black text-[#087F5B] mb-6">
                {step.number}
              </span>
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                  {step.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8.5 WHATSAPP EXPERIENCE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <WhatsAppCTA
          title="A booking experience that feels familiar."
          subtitle="Skip complicated multi-step checkouts. Inquire directly, get answers to your questions, and coordinate your stay on WhatsApp."
        />
      </section>

      {/* 8.6 TRUST SECTION */}
      <section className="bg-white border-y border-slate-200/70 py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#087F5B]">
              Our Promise
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Simple, clear and traveller-focused.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#F5F8F6] border border-slate-200/80 p-8 flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#087F5B] flex items-center justify-center font-bold text-sm mb-6">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.7 DESTINATIONS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#087F5B]">
              Destinations
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Places we currently serve.
            </h2>
          </div>

          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#087F5B] hover:text-[#066C4D]"
          >
            <span>Explore all stays</span>
            <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DESTINATIONS_DATA.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 8.8 FINAL CTA */}
      <FinalCTA
        title="Your next stay starts here."
        subtitle="Discover verified hotels and start your trip planning conversation directly with our local team."
      />
    </div>
  );
};

export default WhyUs;
