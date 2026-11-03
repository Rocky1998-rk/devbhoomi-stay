import { Routes, Route, Navigate } from "react-router-dom";
import Unauthorized from "../pages/errors/Unauthorized";
import NotFound from "../pages/NotFound";
import AdminLayout from "../layouts/AdminLayout";
import AdminRoute from "../guards/AdminRoute";

// Admin Module Pages
import AdminLogin from "../pages/admin/Login";
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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default Landing: Redirect to Admin Dashboard */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Authentication */}
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Portal with /admin prefix */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
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

        {/* Support direct paths without /admin prefix as well */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/hotels" element={<AdminHotels />} />
          <Route path="/inventory" element={<AdminInventory />} />
          <Route path="/pricing" element={<AdminPricing />} />
          <Route path="/bookings" element={<AdminBookings />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/whatsapp" element={<AdminWhatsApp />} />
          <Route path="/transactions" element={<AdminTransactions />} />
          <Route path="/reports" element={<AdminReports />} />
          <Route path="/cms" element={<AdminCMS />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* Error Pages */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
