import { Navigate, Outlet, useLocation } from "react-router-dom";

const isAuthenticated = true;

export function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}