import { Routes, Route } from "react-router-dom";

import WebsiteLayout from "../layouts/WebsiteLayout";
import AdminLayout from "../layouts/AdminLayout";
import OwnerLayout from "../layouts/OwnerLayout";

import Home from "../pages/website/Home";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import OwnerDashboard from "../pages/owner/Dashboard";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>

      {/*------------------ Website -------------------------------*/}
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/*------------- Login-------------------------------------- */}
      <Route path="/login" element={<Login />} />

      {/*------------------- Admin ---------------------------------*/}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/*------------------- Owner -----------------------------------*/}
      <Route path="/owner" element={<OwnerLayout />}>
        <Route path="dashboard" element={<OwnerDashboard />} />
      </Route>

      {/*---------------------------- 404 -------------------------------- */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;