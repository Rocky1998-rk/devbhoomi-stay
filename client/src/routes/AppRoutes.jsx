import { Routes, Route } from "react-router-dom";
import Unauthorized from "../pages/errors/Unauthorized";

import WebsiteLayout from "../layouts/WebsiteLayout";
import AdminLayout from "../layouts/AdminLayout";
import OwnerLayout from "../layouts/OwnerLayout";

import ProtectedRoute from "../guards/ProtectedRoute";
import AdminRoute from "../guards/AdminRoute";
import OwnerRoute from "../guards/OwnerRoute";

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

  {/* Protected Routes */}
<Route element={<ProtectedRoute />}>

  {/* Admin Routes */}
  <Route element={<AdminRoute />}>
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
    </Route>
  </Route>

  {/* Owner Routes */}
  <Route element={<OwnerRoute />}>
    <Route path="/owner" element={<OwnerLayout />}>
      <Route path="dashboard" element={<OwnerDashboard />} />
    </Route>
  </Route>

</Route>


      {/*---------------------------- 404 -------------------------------- */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;