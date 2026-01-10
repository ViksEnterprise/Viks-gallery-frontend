import React, { useEffect, useState } from "react";
import { SIDENAVLINKS } from "../../libs/Navbar";
import { FaTimes } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { checkTokenStatus } from "../../utils/tokenDecoil";
import Logo from "../../assets/VIKS Gallery transparent.webp";

export const SideNav = () => {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);

  const [data, setData] = useState(() => {
    const user = JSON.parse(sessionStorage.getItem("userInfo"));
    return user || null;
  });

  const logOut = () => {
    sessionStorage.clear();
    setData(null);
    window.location.href = '/login'
  };

  useEffect(() => {
    const responsive = () => {
      window.innerWidth < 1024 ? setMobile(true) : setMobile(false);
    };

    responsive();
    window.addEventListener("resize", responsive);

    const token = sessionStorage.getItem("MVtoken");
    if (token && checkTokenStatus(token)) {
      sessionStorage.clear();
      setData(null);
    }

    return () => window.removeEventListener("resize", responsive);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {mobile && open && (
        <div
          className="fixed inset-0 bg-black/60 z-[999]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-blue-700 text-white z-[1000]
          transition-all duration-300 shadow-lg
          ${mobile ? (open ? "w-72" : "w-0 overflow-hidden") : "w-72"}
        `}
      >
        <div className="flex flex-col h-full p-4 gap-6">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <img
              src={Logo}
              alt="Viks Gallery"
              className="h-12 bg-white rounded-lg"
            />
            {data && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{data?.name}</span>
                <div className="h-9 w-9 rounded-full overflow-hidden border">
                  <img src={data?.pic} alt="" />
                </div>
              </div>
            )}
            {mobile && (
              <FaTimes
                className="text-xl cursor-pointer"
                onClick={() => setOpen(false)}
              />
            )}
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-4 mt-4">
            {SIDENAVLINKS.map((link, i) => (
              <li key={i}>
                <a
                  href={link.to}
                  className="capitalize text-lg hover:bg-black/20 p-2 hover:rounded-lg flex gap-3 items-center"
                >
                  <link.icon />
                  {link.link}
                </a>
              </li>
            ))}
          </ul>

          {/* User Section */}
          <div className="mt-auto">
            <div className="relative">
              <div className="w-full">
                <button
                  className="bg-white h-11 w-full flex items-center text-center text-blue-700 rounded-[7px] text-lg capitalize justify-center"
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      {mobile && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-[1100] bg-white shadow-md p-2 rounded-md"
        >
          <div className="w-6 h-1 bg-black mb-1"></div>
          <div className="w-6 h-1 bg-black mb-1"></div>
          <div className="w-6 h-1 bg-black"></div>
        </button>
      )}
    </>
  );
};
