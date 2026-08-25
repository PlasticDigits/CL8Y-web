import { Navigate } from "react-router-dom";

/** Retired section routes must not keep serving the old product story. */
export function LegacyRedirect({ to }: { to: string }) {
  return <Navigate to={to} replace />;
}
