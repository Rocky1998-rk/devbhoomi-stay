import React, { useState } from "react";
import { FiX, FiTag, FiTrendingUp, FiCheck } from "react-icons/fi";

const UpdatePricingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    roomCategory: "Deluxe Room",
    ruleType: "season",
    ruleName: "Weekend Surge & Festival Peak",
    startDate: "2026-11-01",
    endDate: "2026-11-05",
    pricePerNight: "4200",
  });
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden text-xs">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-[#F1EDFF]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#805AD5] text-white flex items-center justify-center font-bold">
              <FiTag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#17233D]">Dynamic Seasonal Pricing</h3>
              <p className="text-[11px] text-[#64748B]">Configure peak surge rates or blackout dates</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl">
              <FiCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-[#17233D] text-sm">Pricing Rule Activated!</h4>
            <p className="text-[#64748B] text-xs">
              Tariff for {formData.roomCategory} updated to ₹{formData.pricePerNight}/night.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div>
              <label className="block text-[#17233D] font-semibold mb-1">Target Room / Category</label>
              <select
                value={formData.roomCategory}
                onChange={(e) => setFormData({ ...formData, roomCategory: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#805AD5] bg-white"
              >
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Family Suite">Family Suite</option>
                <option value="Cottage">Cottage</option>
              </select>
            </div>

            <div>
              <label className="block text-[#17233D] font-semibold mb-1">Pricing Rule Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "normal", label: "Base Rate" },
                  { id: "season", label: "Season Surge" },
                  { id: "blackout", label: "Blackout Date" },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, ruleType: type.id })}
                    className={`py-2 px-2 rounded-xl font-bold border transition-all text-center ${
                      formData.ruleType === type.id
                        ? "bg-[#805AD5] text-white border-[#805AD5] shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#17233D] font-semibold mb-1">Rule Name</label>
              <input
                type="text"
                required
                value={formData.ruleName}
                onChange={(e) => setFormData({ ...formData, ruleName: e.target.value })}
                placeholder="e.g. Diwali Long Weekend"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#805AD5]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#17233D] font-semibold mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#805AD5]"
                />
              </div>
              <div>
                <label className="block text-[#17233D] font-semibold mb-1">End Date</label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#805AD5]"
                />
              </div>
            </div>

            {formData.ruleType !== "blackout" && (
              <div>
                <label className="block text-[#17233D] font-semibold mb-1">Price Per Night (₹)</label>
                <input
                  type="number"
                  required
                  value={formData.pricePerNight}
                  onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#805AD5]"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#805AD5] hover:bg-[#6B46C1] text-white font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                Apply Tariff Rule
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdatePricingModal;

