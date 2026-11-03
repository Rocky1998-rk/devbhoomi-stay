import React from "react";
import { FiCheck, FiArrowRight } from "react-icons/fi";

const colorSwatches = [
  {
    name: "Pine Green",
    hex: "#0E4D3C",
    bgClass: "bg-[#0E4D3C]",
    textColor: "text-white",
    usage: "Primary actions, active states & brand identity",
  },
  {
    name: "Deep Forest",
    hex: "#072B22",
    bgClass: "bg-[#072B22]",
    textColor: "text-white",
    usage: "Sidebar background & dark contrast surfaces",
  },
  {
    name: "Himalayan Gold",
    hex: "#D97706",
    bgClass: "bg-[#D97706]",
    textColor: "text-white",
    usage: "Active navigation, highlights & warning badges",
  },
  {
    name: "Light Mint",
    hex: "#ECF7F1",
    bgClass: "bg-[#ECF7F1]",
    textColor: "text-[#0E4D3C]",
    usage: "Dashboard body background & soft highlights",
  },
  {
    name: "Warm Highlight",
    hex: "#FFF7E6",
    bgClass: "bg-[#FFF7E6]",
    textColor: "text-[#D97706]",
    usage: "Accent tags & warm Himalayan tourism highlights",
  },
];

const badgeExamples = [
  { label: "Confirmed", style: "bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]/20" },
  { label: "Pending", style: "bg-[#FEF3C7] text-[#D97706] border-[#D97706]/20" },
  { label: "Cancelled", style: "bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]/20" },
  { label: "Check-in", style: "bg-[#DCFCE7] text-[#16A34A] border-[#16A34A]/20" },
  { label: "Arriving", style: "bg-[#DBEAFE] text-[#2563EB] border-[#2563EB]/20" },
  { label: "Completed", style: "bg-[#E0E7FF] text-[#4F46E5] border-[#4F46E5]/20" },
];

const DesignTokensPreview = () => {
  return (
    <div className="space-y-3 font-['Inter']">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-[#0F172A] tracking-tight">
            Design System Reference
          </h4>
          <p className="text-xs text-[#64748B]">
            Production UI tokens, typography, status badges and component variants
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {/* CARD 1: COLOR PALETTE */}
        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F1F5F9] mb-3">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Color Palette
              </span>
              <span className="text-[10px] font-semibold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-sm">
                5 Tokens
              </span>
            </div>

            <div className="space-y-2">
              {colorSwatches.map((color) => (
                <div
                  key={color.hex}
                  className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-lg shrink-0 border border-black/10 shadow-2xs ${color.bgClass}`}
                  />
                  <div className="min-w-0 flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F172A] truncate">
                        {color.name}
                      </span>
                      <span className="font-mono text-[11px] text-[#64748B]">
                        {color.hex}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#94A3B8] truncate leading-tight mt-0.5">
                      {color.usage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 2: TYPOGRAPHY */}
        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F1F5F9] mb-3">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Typography
              </span>
              <span className="text-[10px] font-semibold text-[#0E4D3C] bg-[#ECF7F1] px-2 py-0.5 rounded-sm">
                Inter Family
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">
                  Heading (Bold / 700)
                </span>
                <p className="text-base font-bold text-[#0F172A] tracking-tight">
                  DevBhoomi Stay Lansdowne
                </p>
              </div>

              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">
                  Subheading (Semibold / 600)
                </span>
                <p className="text-xs font-semibold text-[#334155]">
                  Curated Boutique Homestays & Resorts
                </p>
              </div>

              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">
                  Body (Regular / 400)
                </span>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Real-time booking management and automated WhatsApp operations.
                </p>
              </div>

              <div className="pt-2 border-t border-[#F1F5F9]">
                <p className="font-mono text-xs text-[#0E4D3C] tracking-widest truncate font-medium">
                  Aa Bb Cc Dd Ee Ff Gg Hh
                </p>
                <p className="font-mono text-xs text-[#D97706] tracking-widest mt-0.5 font-semibold">
                  0123456789 ₹ %
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: STATUS BADGES */}
        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F1F5F9] mb-3">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Status Badges
              </span>
              <span className="text-[10px] font-semibold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-sm">
                6 States
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {badgeExamples.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center justify-center p-2 rounded-lg bg-[#F8FAFC] border border-[#F1F5F9]"
                >
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.style}`}
                  >
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#94A3B8] mt-4 text-center">
              Semantic colors mapped across all tables & charts
            </p>
          </div>
        </div>

        {/* CARD 4: BUTTON VARIANTS */}
        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F1F5F9] mb-3">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Button Variants
              </span>
              <span className="text-[10px] font-semibold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-sm">
                Actions
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold block mb-1">
                  Primary Action
                </span>
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#0E4D3C] hover:bg-[#072B22] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Confirm Booking</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold block mb-1">
                  Secondary Action
                </span>
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Seasonal Surge</span>
                  <FiCheck className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold block mb-1">
                  Outline Variant
                </span>
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-lg bg-white border border-[#0E4D3C] text-[#0E4D3C] hover:bg-[#ECF7F1] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignTokensPreview;
