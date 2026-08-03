import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
