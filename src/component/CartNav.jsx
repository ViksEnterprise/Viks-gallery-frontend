import React, { useEffect, useState } from "react";
import { LOGO } from "../libs/Navbar";

export const CartNav = () => {
  const [scroll, setScroll] = useState(false);

  const activateScrollBarView = () => {
    window.pageYOffset > 0 ? setScroll(true) : setScroll(false);
  };

  useEffect(() => {
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
        </header>
      </div>
    </>
  );
};
