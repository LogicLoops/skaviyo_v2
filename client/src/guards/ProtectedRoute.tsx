import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: string; // "ADMIN" | "VENDOR" | "CUSTOMER"
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const role = localStorage.getItem("role");

  // Not logged in
  if (!role) return <Navigate to="/" replace />;

  // Wrong role → redirect to own home
  if (role !== allowedRole) {
    if (role === "ADMIN")    return <Navigate to="/admin"  replace />;
    if (role === "VENDOR")   return <Navigate to="/vendor" replace />;
    if (role === "CUSTOMER") return <Navigate to="/shop"   replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
