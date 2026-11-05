import { Routes, Route, Navigate } from "react-router-dom";
import Unauthorized from "../pages/errors/Unauthorized";

import WebsiteLayout from "../layouts/WebsiteLayout";
import AdminLayout from "../layouts/AdminLayout";
import OwnerLayout from "../layouts/OwnerLayout";

import AdminRoute from "../guards/AdminRoute";
import OwnerRoute from "../guards/OwnerRoute";

import Home from "../pages/website/Home";
import Hotels from "../pages/website/Hotels";
import WhyUs from "../pages/website/WhyUs";
import Contact from "../pages/website/Contact";

// Separate Login pages for Admin and Owner
import AdminLogin from "../pages/admin/Login";
import OwnerLogin from "../pages/owner/Login";

// Admin Module Pages (All in /pages/admin/)
import AdminDashboard from "../pages/admin/Dashboard";
import AdminHotels from "../pages/admin/Hotels";
import AdminInventory from "../pages/admin/Inventory";
import AdminPricing from "../pages/admin/Pricing";
import AdminBookings from "../pages/admin/Bookings";
import AdminUsers from "../pages/admin/Users";
import AdminWhatsApp from "../pages/admin/WhatsApp";
import AdminTransactions from "../pages/admin/Transactions";
import AdminReports from "../pages/admin/Reports";
import AdminCMS from "../pages/admin/CMS";
import AdminSettings from "../pages/admin/Settings";

// Owner Module Pages (All in /pages/owner/)
import OwnerDashboard from "../pages/owner/Dashboard";
import OwnerMyHotel from "../pages/owner/MyHotel";
import OwnerRoomCategories from "../pages/owner/RoomCategories";
import OwnerRoomsInventory from "../pages/owner/RoomsInventory";
import OwnerPricingTariffs from "../pages/owner/PricingTariffs";
import OwnerBookingsGuests from "../pages/owner/BookingsGuests";
import OwnerCheckInOut from "../pages/owner/CheckInOut";
import OwnerPayoutsSettlements from "../pages/owner/PayoutsSettlements";
import OwnerReportsAnalytics from "../pages/owner/ReportsAnalytics";
import OwnerNotifications from "../pages/owner/Notifications";
import OwnerSettings from "../pages/owner/Settings";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/*------------------ Public Website -------------------------------*/}
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/*------------------ Dedicated Authentication Links ---------------*/}
      {/* 1. Super Admin Login Link */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 2. Hotel Owner Login Link */}
      <Route path="/owner/login" element={<OwnerLogin />} />

      {/* Legacy /login redirects directly to admin login */}
      <Route path="/login" element={<Navigate to="/admin/login" replace />} />

      {/*------------------ Admin Portal (Protected) ---------------------*/}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="hotels" element={<AdminHotels />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="whatsapp" element={<AdminWhatsApp />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="cms" element={<AdminCMS />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/*------------------ Owner Portal (Protected) ---------------------*/}
      <Route element={<OwnerRoute />}>
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<OwnerDashboard />} />
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="hotel" element={<OwnerMyHotel />} />
          <Route path="room-categories" element={<OwnerRoomCategories />} />
          <Route path="rooms" element={<OwnerRoomsInventory />} />
          <Route path="pricing" element={<OwnerPricingTariffs />} />
          <Route path="bookings" element={<OwnerBookingsGuests />} />
          <Route path="check-in-out" element={<OwnerCheckInOut />} />
          <Route path="payouts" element={<OwnerPayoutsSettlements />} />
          <Route path="reports" element={<OwnerReportsAnalytics />} />
          <Route path="notifications" element={<OwnerNotifications />} />
          <Route path="settings" element={<OwnerSettings />} />
        </Route>
      </Route>

      {/*------------------ Error Pages ----------------------------------*/}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;