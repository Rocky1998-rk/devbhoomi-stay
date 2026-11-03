import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiMessageSquare,
  FiEye,
  FiCheckSquare,
  FiCreditCard,
  FiCheckCircle,
} from "react-icons/fi";

const funnelStages = [
  {
    stage: "Total Inquiries",
    count: 580,
    percent: 100,
    icon: FiMessageSquare,
    barColor: "bg-[#0E4D3C]",
    textColor: "text-[#0E4D3C]",
  },
  {
    stage: "Hotel Viewed",
    count: 420,
    percent: 72.4,
    icon: FiEye,
    barColor: "bg-[#10B981]",
    textColor: "text-[#10B981]",
  },
  {
    stage: "Room Selected",
    count: 310,
    percent: 53.4,
    icon: FiCheckSquare,
    barColor: "bg-[#3B82F6]",
    textColor: "text-[#3B82F6]",
  },
  {
    stage: "Booking Started",
    count: 190,
    percent: 32.8,
    icon: FiCreditCard,
    barColor: "bg-[#D97706]",
    textColor: "text-[#D97706]",
  },
  {
    stage: "Booking Confirmed",
    count: 132,
    percent: 22.8,
    icon: FiCheckCircle,
    barColor: "bg-[#16A34A]",
    textColor: "text-[#16A34A]",
  },
];

const WhatsAppFunnel = () => {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between font-['Inter'] h-full">
      {/* Header with WhatsApp Branding & Non-Wrapping Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-3 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <FaWhatsapp className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight leading-tight whitespace-nowrap">
              WhatsApp Funnel
            </h3>
            <p className="text-xs text-[#64748B] font-normal mt-0.5 whitespace-nowrap truncate">
              Conversion drop-off across bot screens
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#ECF7F1] text-[#0E4D3C] border border-[#0E4D3C]/20 whitespace-nowrap shrink-0">
          22.8% Conversion
        </span>
      </div>

      {/* Funnel Stages List - Single Line Zero Wrap */}
      <div className="space-y-3.5 my-auto py-1">
        {funnelStages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div key={stage.stage} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs whitespace-nowrap">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                  <span className="font-semibold text-[#334155] whitespace-nowrap truncate text-xs">
                    {stage.stage}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2 whitespace-nowrap">
                  <span className="font-bold text-[#0F172A] whitespace-nowrap">
                    {stage.count}
                  </span>
                  <span className="text-[11px] text-[#64748B] font-medium whitespace-nowrap">
                    ({stage.percent}%)
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${stage.barColor}`}
                  style={{ width: `${stage.percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Summary - Clean Single Line */}
      <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B] whitespace-nowrap">
        <span className="truncate">580 Total Customer Sessions</span>
        <span className="font-semibold text-[#16A34A] shrink-0 ml-2">
          132 Vouchers Sent
        </span>
      </div>
    </div>
  );
};

export default WhatsAppFunnel;
