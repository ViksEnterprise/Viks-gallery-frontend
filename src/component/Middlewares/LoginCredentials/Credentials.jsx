import { Outlet, Navigate } from "react-router-dom";

export const HasCredentials = () => {
  const token = sessionStorage.getItem("MVtoken");
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
