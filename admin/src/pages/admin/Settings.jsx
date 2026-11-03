import React from "react";
import { FiSettings, FiSave, FiShield, FiKey } from "react-icons/fi";

const Settings = () => {
  return (
    <div className="space-y-6 font-['Inter']">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
          Platform Settings & Configuration
        </h1>
        <p className="text-sm text-[#64748B]">
          Admin system configurations, advance booking percentages, and WhatsApp webhook credentials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        {/* Booking Rules Card */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-[#0F172A] pb-2 border-b border-[#F1F5F9]">
            <FiShield className="text-[#0E4D3C]" />
            <span>Booking & Deposit Rules</span>
          </div>

          <div>
            <label className="font-semibold text-[#334155] block mb-1">
              WhatsApp Advance Deposit Percentage
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue={25}
                className="w-24 h-9 px-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] font-bold"
              />
              <span className="font-bold text-[#64748B]">% Token Deposit</span>
            </div>
            <p className="text-[11px] text-[#94A3B8] mt-1">
              Default is 25% collected via Razorpay payment links prior to voucher dispatch.
            </p>
          </div>

          <div>
            <label className="font-semibold text-[#334155] block mb-1">
              Offline Booking Hold Timeout (Mins)
            </label>
            <input
              type="number"
              defaultValue={15}
              className="w-24 h-9 px-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] font-bold"
            />
          </div>
        </div>

        {/* API Credentials Card */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-[#0F172A] pb-2 border-b border-[#F1F5F9]">
            <FiKey className="text-[#D97706]" />
            <span>Meta & Razorpay Integration</span>
          </div>

          <div>
            <label className="font-semibold text-[#334155] block mb-1">
              WhatsApp API Version
            </label>
            <input
              type="text"
              readOnly
              value="v25.0 (Cloud API)"
              className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] font-mono"
            />
          </div>

          <div>
            <label className="font-semibold text-[#334155] block mb-1">
              Cloudinary Media Bucket
            </label>
            <input
              type="text"
              readOnly
              value="dszadvuz6 (stay-lansdowne/hotels)"
              className="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
