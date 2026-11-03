import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

const AdminLayout = () => {
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("devbhoomi_admin_sidebar_collapsed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("devbhoomi_admin_sidebar_collapsed", collapsed);
  }, [collapsed]);

  const isDashboard =
    location.pathname === "/admin" ||
    location.pathname === "/admin/" ||
    location.pathname === "/admin/dashboard";

  return (
    <div className="min-h-screen flex font-['Inter'] antialiased">
      {/* 1. Sidebar Navigation (Compact 245px or Collapsed 72px) */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* 2. Main Content Wrapper */}
      <div
        className={`flex-1 flex flex-col transition-[padding] duration-300 ease-in-out min-w-0 ${
          collapsed ? "lg:pl-[68px]" : "lg:pl-[230px]"
        }`}
      >
        {/* Top Navbar (Height 70px) */}
        <AdminTopbar
          onMenuClick={() => setMobileSidebarOpen(true)}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {/* Dashboard Content Container: Full-bleed for Dashboard, matching px-2 padding for other pages */}
        <main
          className={`flex-1 min-w-0 ${
            isDashboard
              ? "w-full pb-8"
              : "px-2 sm:px-2.5 lg:px-2 py-5 w-full"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;