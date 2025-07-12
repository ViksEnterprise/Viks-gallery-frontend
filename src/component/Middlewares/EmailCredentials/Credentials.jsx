import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const HasEmailCredentials = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(() => {
    const details = localStorage.getItem("user_reset_email");
    return details ? details : "";
  });

  useEffect(() => {
    const details = localStorage.getItem("user_reset_email");
    if (details == "") {
      setCredentials("");
      navigate("/login");
    }
  }, [credentials]);

  return credentials ? <Outlet /> : navigate("/login");
};
