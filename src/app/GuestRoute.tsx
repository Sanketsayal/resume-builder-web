import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { PageLoader } from "../components/PageLoader";

export function GuestRoute() {
  const {
    isAuthenticated,
    isInitialized,
  } = useAuth();

  const location = useLocation();

  if (!isInitialized) {
    return <PageLoader />
  }

  if (isAuthenticated) {
    const from =
      location.state?.from?.pathname ?? "/dashboard";

    return (
      <Navigate
        to={from}
        replace
      />
    );
  }

  return <Outlet />;
}