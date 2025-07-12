import React, { useEffect, useState } from "react";
import { LOGO } from "../libs/Navbar";
import { checkTokenStatus } from "../utils/tokenDecoil";
import { BiChevronDown } from "react-icons/bi";

export const CartNav = () => {
  const [scroll, setScroll] = useState(false);
  const [data, setData] = useState(() => {
    const user = JSON.parse(sessionStorage.getItem("userInfo"));
    return user ? user : [];
  });
  const [activeToggle, setActiveToggle] = useState(false);

  const activateScrollBarView = () => {
    window.pageYOffset > 0 ? setScroll(true) : setScroll(false);
  };

  const openActiveToggle = () => {
    setActiveToggle(!activeToggle);
  };

  const logOut = () => {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("MVtoken");
    setData([]);
  };

  useEffect(() => {
    const clearLogoutUser = () => {
      const token = sessionStorage.getItem("MVtoken");

      if (token) {
        const exp = checkTokenStatus(token);

        if (exp) {
          sessionStorage.clear();
          setData([]);
        }
      }
    };

    clearLogoutUser();

    window.addEventListener("scroll", activateScrollBarView);
  }, []);
  return (
    <>
      <div
        className={
          scroll
            ? "w-full justify-center flex item-center bg-transparent top-0 z-[999] fixed"
            : "w-full justify-center flex item-center bg-transparent top-0 z-[999]"
        }
      >
        <header
          className={
            scroll
              ? "w-[94%] py-3 md:px-12 px-3 h-16 rounded-[7px] flex items-center justify-between bg-white my-2 shadow-lg shadow-slate-400 border-blue-200 border-solid border-2"
              : "w-full py-3 md:px-12 px-3 h-20 flex items-center justify-between bg-white"
          }
        >
          <div className="uppercase text-[#0A078E] text-2xl font-[500]">
            {LOGO}
          </div>
          {data.length !== 0 ? (
            <div className="flex items-center gap-2 w-fit relative justify-center">
              <div className="h-8 w-8 rounded-full overflow-hidden border-solid border-gray-400 border-[1px]">
                <img src={data.pic} alt="" />
              </div>
              <div>
                <span>{data.name}</span>
              </div>
              <div className="w-fit flex items-end flex-col gap-2 h-fit">
                <div
                  className="w-fit cursor-pointer"
                  onClick={() => openActiveToggle()}
                >
                  <BiChevronDown className="text-[2em]" />
                </div>
                {activeToggle ? (
                  <div
                    className={
                      scroll
                        ? "h-fit p-2 w-[14em] rounded-[7px] border-solid border-slate-300 border-[1px] absolute end-[-3em] top-[2.5em] z-[999] bg-white"
                        : "h-fit p-2 w-[14em] rounded-[7px] border-solid border-slate-300 border-[1px] absolute end-[-2em] top-[2.5em] z-[999] bg-white"
                    }
                  >
                    <button
                      onClick={() => logOut()}
                      className="h-12 w-full rounded-[8px] border-solid border-red-500 border-[2px]"
                      type="button"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </header>
      </div>
    </>
  );
};
