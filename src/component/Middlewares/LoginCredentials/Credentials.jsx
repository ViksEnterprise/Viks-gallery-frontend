import { Outlet, Navigate } from "react-router-dom";

export const HasCredentials = () => {
  const token = sessionStorage.getItem("MVtoken");
  const staff = sessionStorage.getItem("staff");
  return token || (token && staff) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
