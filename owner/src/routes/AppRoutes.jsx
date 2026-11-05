import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import OwnerLayout from "../layouts/OwnerLayout";

// Owner Pages
import Dashboard from "../pages/Dashboard";
import MyHotel from "../pages/MyHotel";
import RoomCategories from "../pages/RoomCategories";
import RoomsInventory from "../pages/RoomsInventory";
import PricingTariffs from "../pages/PricingTariffs";
import BookingsGuests from "../pages/BookingsGuests";
import CheckInOut from "../pages/CheckInOut";
import PayoutsSettlements from "../pages/PayoutsSettlements";
import ReportsAnalytics from "../pages/ReportsAnalytics";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/owner/login" element={<Login />} />

      {/* Main Owner Application Routes */}
      <Route element={<OwnerLayout />}>
        {/* Default Landing */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Navigation Pages */}
        <Route path="/hotel" element={<MyHotel />} />
        <Route path="/room-categories" element={<RoomCategories />} />
        <Route path="/rooms" element={<RoomsInventory />} />
        <Route path="/pricing" element={<PricingTariffs />} />
        <Route path="/bookings" element={<BookingsGuests />} />
        <Route path="/check-in-out" element={<CheckInOut />} />
        <Route path="/payouts" element={<PayoutsSettlements />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />

        {/* Support prefix /owner paths as well */}
        <Route path="/owner" element={<Navigate to="/dashboard" replace />} />
        <Route path="/owner/dashboard" element={<Dashboard />} />
        <Route path="/owner/hotel" element={<MyHotel />} />
        <Route path="/owner/room-categories" element={<RoomCategories />} />
        <Route path="/owner/rooms" element={<RoomsInventory />} />
        <Route path="/owner/pricing" element={<PricingTariffs />} />
        <Route path="/owner/bookings" element={<BookingsGuests />} />
        <Route path="/owner/check-in-out" element={<CheckInOut />} />
        <Route path="/owner/payouts" element={<PayoutsSettlements />} />
        <Route path="/owner/reports" element={<ReportsAnalytics />} />
        <Route path="/owner/notifications" element={<Notifications />} />
        <Route path="/owner/settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;

