import React from "react";
import { FiFileText, FiPlus, FiImage } from "react-icons/fi";

const CMS = () => {
  return (
    <div className="space-y-6 font-['Inter']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            CMS & Content Management
          </h1>
          <p className="text-sm text-[#64748B]">
            Manage banners, featured destination highlights, and FAQ pages
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0E4D3C] hover:bg-[#072B22] text-white text-xs font-bold transition-colors shadow-xs">
          <FiPlus className="w-4 h-4" />
          <span>New Article / Guide</span>
        </button>
      </div>

      <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs">
        <h3 className="font-bold text-[#0F172A] text-sm mb-3">
          Traveler Destination Guides (Uttarakhand)
        </h3>
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#0F172A] block">
                Top 10 Hidden Gem Homestays in Lansdowne (2026 Edition)
              </span>
              <span className="text-[#64748B]">Published on 15 Oct 2026 • 2.4k views</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] font-semibold">
              Live
            </span>
          </div>

          <div className="p-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#0F172A] block">
                Kotdwar to Lansdowne Scenic Road Trip Guide & Stay Recommendations
              </span>
              <span className="text-[#64748B]">Published on 02 Oct 2026 • 1.8k views</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] font-semibold">
              Live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMS;
