import { Outlet, Navigate } from "react-router-dom";

export const HasAdminCredentials = () => {
  const token = sessionStorage.getItem("MVtoken");
  const staff = sessionStorage.getItem("staff");

  const isStaff = staff === "true";

  return token && isStaff ? <Outlet /> : <Navigate to="/login" replace />;
};
