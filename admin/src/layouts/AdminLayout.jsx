import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSidebarCollapsed,
  selectMobileSidebarOpen,
  selectSelectedLocation,
  setSidebarCollapsed,
  setMobileSidebarOpen,
  setSelectedLocation,
} from "../store/slices/uiSlice";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

const AdminLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const collapsed = useSelector(selectSidebarCollapsed);
  const mobileSidebarOpen = useSelector(selectMobileSidebarOpen);
  const selectedLocation = useSelector(selectSelectedLocation);

  const isDashboard =
    location.pathname === "/admin" ||
    location.pathname === "/admin/" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/" ||
    location.pathname === "/dashboard";

  return (
    <div className="min-h-screen flex font-['Inter'] antialiased">
      {/* 1. Sidebar Navigation */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={(val) => dispatch(setMobileSidebarOpen(val))}
        collapsed={collapsed}
        setCollapsed={(val) => dispatch(setSidebarCollapsed(val))}
      />

      {/* 2. Main Content Wrapper */}
      <div
        className={`flex-1 flex flex-col transition-[padding] duration-300 ease-in-out min-w-0 ${
          collapsed ? "lg:pl-[68px]" : "lg:pl-[230px]"
        }`}
      >
        {/* Top Navbar (Height 70px) */}
        <AdminTopbar
          onMenuClick={() => dispatch(setMobileSidebarOpen(true))}
          selectedLocation={selectedLocation}
          setSelectedLocation={(val) => dispatch(setSelectedLocation(val))}
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