import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import PageLoader from "../Common/PageLoader"; // adjust path

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, initialized } = useAppSelector((state) => state.user);

  if (!initialized) {
    return <PageLoader />; // still checking refresh-token cookie, don't decide yet
  }

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};