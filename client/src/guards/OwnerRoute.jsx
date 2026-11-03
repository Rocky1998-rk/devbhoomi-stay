import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OwnerRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/owner/login" replace />;
  }

  if (user.role !== "owner") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default OwnerRoute;