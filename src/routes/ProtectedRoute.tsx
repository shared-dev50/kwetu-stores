import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

type Role = "cashier" | "manager";

interface Props {
  allowedRoles?: Role[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { token, user } = useAuthStore();

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role as Role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
