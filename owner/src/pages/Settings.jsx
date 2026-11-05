import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiSettings, FiUser, FiLock, FiCheck } from "react-icons/fi";

const Settings = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || "Rocky Kumar",
    email: user?.email || "rocky@pineretreat.com",
    phone: "+91 94120 55432",
    bankAccount: "HDFC Bank ••••• 4921",
    ifsc: "HDFC0001245",
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto text-xs">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#17233D] tracking-tight">
          Partner Account & Bank Settings
        </h2>
        <p className="text-[#64748B] text-xs mt-0.5">
          Manage your owner profile, password, and payout bank account.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 text-emerald-800 font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
          <FiCheck className="w-4 h-4 text-emerald-600" />
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#17233D] border-b border-slate-100 pb-2">
            Owner Profile Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#17233D] font-semibold mb-1">Owner Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#3B6EF5]"
              />
            </div>
            <div>
              <label className="block text-[#17233D] font-semibold mb-1">Registered Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#3B6EF5]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#17233D] border-b border-slate-100 pb-2">
            Bank Account for Weekly Payouts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#17233D] font-semibold mb-1">Bank Name & Account</label>
              <input
                type="text"
                value={profile.bankAccount}
                onChange={(e) => setProfile({ ...profile, bankAccount: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#3B6EF5]"
              />
            </div>
            <div>
              <label className="block text-[#17233D] font-semibold mb-1">IFSC Code</label>
              <input
                type="text"
                value={profile.ifsc}
                onChange={(e) => setProfile({ ...profile, ifsc: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#3B6EF5]"
              />
            </div>
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#3B6EF5] hover:bg-[#2855D9] text-white font-bold transition-all shadow-md"
          >
            Save Account Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;

