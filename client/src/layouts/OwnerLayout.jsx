import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import OwnerSidebar from "../components/owner/OwnerSidebar";

const OwnerLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F6FC] font-['Inter',_sans-serif]">
      {/* 1. Fixed Left Sidebar */}
      <OwnerSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* 2. Main Scrollable Viewport (Offset by sidebar width on lg) */}
      <main className="min-h-screen lg:ml-[230px] flex flex-col transition-all duration-300">
        <Outlet context={{ onMenuClick: () => setIsMobileOpen(true) }} />
      </main>
    </div>
  );
};

export default OwnerLayout;
