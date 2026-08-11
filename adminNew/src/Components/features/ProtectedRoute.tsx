import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};