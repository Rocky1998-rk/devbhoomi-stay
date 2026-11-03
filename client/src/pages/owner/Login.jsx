import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiLock, FiMail, FiHome, FiArrowRight, FiArrowLeft } from "react-icons/fi";

const OwnerLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("owner@devbhoomistay.com");
  const [password, setPassword] = useState("Owner@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Authenticate as Hotel Owner
      login(
        {
          _id: "owner-anita-002",
          name: "Anita Negi",
          email: email || "owner@devbhoomistay.com",
          role: "owner",
        },
        "devbhoomi-owner-token-2026"
      );

      navigate("/owner/dashboard", { replace: true });
    } catch (err) {
      setError("Failed to sign in. Please verify owner credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center p-4 font-['Inter']">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#DCFCE7] p-7 sm:p-9 relative overflow-hidden">
        {/* Top Decorative Emerald Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#16A34A] to-[#0E4D3C]" />

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#16A34A] text-white flex items-center justify-center text-2xl mx-auto shadow-md mb-3">
            🏨
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold tracking-wider uppercase mb-2">
            <FiHome className="w-3.5 h-3.5" />
            Hotel & Homestay Partner Portal
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            DevBhoomi Stay
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage your property inventory, rates & guest check-ins
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* Dedicated Owner Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#0F172A] font-semibold mb-1.5">
              Registered Owner Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@devbhoomistay.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[#0F172A] font-semibold">
                Password
              </label>
              <span className="text-[11px] text-[#64748B]">Partner Access</span>
            </div>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>{loading ? "Signing in..." : "Sign In to Owner Portal"}</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom Navigation Back to Website */}
        <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-[#16A34A] transition-colors"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Website</span>
          </Link>
          <span className="text-[10px] text-[#94A3B8]">
            Partner Support: +91 98765 43210
          </span>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
