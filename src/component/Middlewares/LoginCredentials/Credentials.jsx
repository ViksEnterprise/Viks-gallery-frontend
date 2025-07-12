import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const HasCredentials = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(() => {
    const details = sessionStorage.getItem("MVtoken");
    return details ? details : "";
  });

  useEffect(() => {
    const details = sessionStorage.getItem("MVtoken");

    if (!details) {
      setCredentials("");
      navigate("/login");
    }
  }, [credentials]);

  return credentials ? <Outlet /> : navigate("/login");
};
