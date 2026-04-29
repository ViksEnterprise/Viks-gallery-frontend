import { useEffect } from "react";
import { SideNav } from "./NavBar/SideNav";
import { axiosPrivate } from "../service/axios";
import { checkTokenStatus } from "../utils/tokenDecoil";

export const AdminLayout = ({ children, stats, online }) => {
  const getStat = async () => {
    const url = `admin-user-list`;

    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        stats(response.data?.results.stats);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const checkIfUserIsActive = setInterval(async () => {
      try {
        const res = await axiosPrivate.post("admin-get-active-user", {});
        if (res) {
          getStat();
          online(true);
        } else {
          online(false);
        }
      } catch (err) {
        throw err;
      }
    }, 60000);

    const clearLogoutUser = setInterval(() => {
      const token = sessionStorage.getItem("MVtoken");

      if (token) {
        const exp = checkTokenStatus(token);

        if (exp) {
          sessionStorage.clear();
          window.location.href = "/login";
        }
      }
    }, 60000);

    return () => {
      clearInterval(checkIfUserIsActive);
      clearInterval(clearLogoutUser);
    };
  }, []);

  return (
    <div className="flex w-full">
      <SideNav />
      <div className="w-[79%] fixed end-0 p-5 overflow-y-auto h-full bg-gray-100">
        {children}
      </div>
    </div>
  );
};
