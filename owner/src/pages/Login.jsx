import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLock, FiMail, FiHome, FiArrowRight } from "react-icons/fi";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("rocky@pineretreat.com");
  const [password, setPassword] = useState("Owner@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      login(
        {
          _id: "owner-rocky-101",
          name: "Rocky Kumar",
          email: email || "rocky@pineretreat.com",
          role: "owner",
          hotel: {
            _id: "hotel-pine-retreat",
            name: "The Pine Retreat",
            city: "Lansdowne",
            state: "Uttarakhand",
            status: "Active",
            image: "/Boutique_hotel_in_Uttarakhand_Hi._2K_20261003012235.jpg",
          },
        },
        "devbhoomi-owner-jwt-token"
      );

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Failed to sign in. Please verify owner credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111C35] flex items-center justify-center p-4 font-['Inter',_sans-serif] relative overflow-hidden">
      {/* Background Mountain glow & stars */}
      <div className="absolute inset-0 bg-cover bg-[position:center_bottom] opacity-25 pointer-events-none" style={{ backgroundImage: "url('/himalayan_hero_banner.png')" }} />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FFA940]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#3B6EF5]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 sm:p-9 relative z-10 border border-slate-100">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#FF922E] to-[#FFA940] text-white flex items-center justify-center text-2xl mx-auto shadow-lg shadow-orange-500/25 mb-3">
            🏨
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF3E5] text-[#D97706] text-[11px] font-extrabold tracking-wider uppercase mb-2">
            <FiHome className="w-3.5 h-3.5" />
            DevBhoomi Stay Partner Portal
          </div>
          <h1 className="text-2xl font-black text-[#17233D] tracking-tight">
            Owner Dashboard
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Sign in to manage room inventory, rates & arrivals
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#17233D] font-bold mb-1.5">
              Registered Owner Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rocky@pineretreat.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-[#17233D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B6EF5] transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[#17233D] font-bold">Password</label>
              <span className="text-[11px] text-[#3B6EF5] font-semibold cursor-pointer hover:underline">
                Forgot?
              </span>
            </div>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-[#17233D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B6EF5] transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF922E] to-[#FFA940] hover:from-[#f5841d] hover:to-[#ff9f2e] text-[#17233D] font-extrabold text-xs transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{loading ? "Signing in..." : "Enter Owner Console"}</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-[#64748B]">
          Looking for Super Admin Console?{" "}
          <a href="http://localhost:5175/admin/login" className="text-[#3B6EF5] font-bold hover:underline">
            Admin Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

