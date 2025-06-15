import React, { useEffect, useState } from "react";
import { BUTTON, LOGO, NAVLINKS } from "../libs/Navbar";
import { FaTimes } from "react-icons/fa";
import { checkTokenStatus } from "../utils/tokenDecoil";
import { BiChevronDown } from "react-icons/bi";

export const NavBar = () => {
  const [scroll, setScroll] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [data, setData] = useState(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    return user ? user : [];
  });
  const [activeToggle, setActiveToggle] = useState(false);

  const activateScrollBarView = () => {
    window.pageYOffset > 0 ? setScroll(true) : setScroll(false);
  };

  const openNav = () => {
    setShowNav(true);
    document.body.style.overflow = "hidden";
  };

  const closeNav = () => {
    setShowNav(false);
    document.body.style.overflow = "auto";
  };

  const openActiveToggle = () => {
    setActiveToggle(!activeToggle);
  };

  const logOut = () => {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("MVtoken");
    setData([]);
  };

  useEffect(() => {
    const setActiveLink = () => {
      const location = window.location.pathname;
      const navLink = document.querySelectorAll(".navs");

      navLink.forEach((links) => {
        const path = links.querySelector("a").getAttribute("href");

        if (location === path) {
          links.classList.add("text-[#0A078E]");
        }

        links.addEventListener("click", function (e) {
          navLink.forEach((link) =>
            link.classList.remove("text-[#0A078E] font-[500]")
          );

          links.classList.add("font-[500]");
        });
      });
    };

    setActiveLink();

    const responsiveNavBar = () => {
      window.innerWidth >= 1024 ? setMobile(false) : setMobile(true);
    };

    responsiveNavBar();

    window.addEventListener("scroll", activateScrollBarView);
    window.addEventListener("resize", responsiveNavBar);
  }, [mobile]);

  useEffect(() => {
    const clearLogoutUser = () => {
      const token = sessionStorage.getItem("MVtoken");

      if (token) {
        const exp = checkTokenStatus(token);

        if (exp) {
          localStorage.removeItem("userData");
          sessionStorage.removeItem("MVtoken");
          setData([]);
        }
      }
    };

    clearLogoutUser();
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
          {!mobile && (
            <nav className="flex items-center justify-between xl:w-[50%] w-[62%]">
              <ul className="flex items-center gap-3 list-style-none">
                {NAVLINKS.map((link, index) => (
                  <li className="navs" key={index}>
                    <a
                      className="text-decoration-none uppercase text-base font-[400] hover:text-[#0A078E] hover:font-[500]"
                      href={link.to}
                      id="link"
                    >
                      {link.link}
                    </a>
                  </li>
                ))}
              </ul>
              <div>
                {data.length !== 0 ? (
                  <div className="flex items-center gap-2 w-full relative justify-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden border-solid border-gray-400 border-[1px]">
                      <img src={`http://127.0.0.1:8000/${data.pic}`} alt="" />
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
                  <a
                    className="text-white h-11 w-[120px] flex items-center text-center bg-blue-700 rounded-[7px] text-lg capitalize justify-center hover:bg-black"
                    href="/login"
                  >
                    {BUTTON}
                  </a>
                )}
              </div>
            </nav>
          )}

          {mobile && (
            <div className="w-7 flex flex-col gap-1" onClick={openNav}>
              <div className="bg-black w-full h-1"></div>
              <div className="bg-black w-full h-1"></div>
              <div className="bg-black w-full h-1"></div>
            </div>
          )}

          {mobile && (
            <div
              className={
                showNav
                  ? "fixed top-0 end-0 bg-black/80 z-[999] h-full bottom-0 w-full flex items-start justify-end"
                  : "hidden"
              }
            >
              <nav className="flex items-start gap-6 md:w-[50%] w-full flex-col bg-white h-full p-3">
                <ul className="flex items-start gap-4 list-style-none flex-col w-full">
                  <div
                    className="w-full flex items-end justify-end"
                    onClick={closeNav}
                  >
                    <FaTimes className="text-[22px]" />
                  </div>
                  {NAVLINKS.map((link, index) => (
                    <li className="navs" key={index}>
                      <a
                        className="text-decoration-none uppercase text-base font-[400] hover:text-[#0A078E] hover:font-[500]"
                        href={link.to}
                      >
                        {link.link}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="w-full">
                  {data.length !== 0 ? (
                    <div className="flex items-center justify-between relative w-full">
                      <div className="flex items-center gap-2 relative">
                        <div className="h-8 w-8 rounded-full overflow-hidden border-solid border-gray-400 border-[1px]">
                          <img
                            src={`http://127.0.0.1:8000/${data.pic}`}
                            alt=""
                          />
                        </div>
                        <div>
                          <span>{data.name}</span>
                        </div>
                      </div>
                      <div className="w-full flex items-end gap-2 flex-col">
                        <div className="w-fit cursor-pointer">
                          <BiChevronDown className="text-[2em]" />
                        </div>
                        {activeToggle ? (
                          <div className="h-fit p-2 w-full rounded-[7px] border-solid border-slate-300 border-[1px] absolute top-[3em] start-0 end-0 bg-white">
                            <button
                              className="h-12 w-full rounded-[8px] border-solid border-red-700 border-[1px]"
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
                    <a
                      className="text-white h-11 w-100 flex items-center text-center bg-blue-700 rounded-[7px] text-lg capitalize justify-center hover:bg-black"
                      href="/login"
                    >
                      {BUTTON}
                    </a>
                  )}
                </div>
              </nav>
            </div>
          )}
        </header>
      </div>
    </>
  );
};
