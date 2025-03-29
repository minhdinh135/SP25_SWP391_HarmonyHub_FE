import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLoaded } = useAuth();
  const location = useLocation();

  console.log("User", user);

  if (!isLoaded) return null;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
