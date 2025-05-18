import React, { useEffect } from "react";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Model = ({
  message,
  icon,
  title,
  direction,
  buttonText,
  modal,
  modalDisplay,
  notModalDisplay,
}) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(modalDisplay);
  const routePage = () => {
    if (direction) {
      navigate(direction);
      setMode(false);
    } else {
      setMode(false);
    }
  };
  useEffect(() => {
    if (mode == true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, []);
  return (
    <>
      <div className={mode == true ? "block" : "hidden"}>
        <div
          className={
            modal
              ? "fixed flex z-[999] h-full w-full items-center justify-center bg-black/75 top-0 bottom-0 p-3"
              : "flex items-center justify-center w-full h-full p-3"
          }
        >
          <div className="bg-white text-black flex flex-col items-center justify-center h-fit lg:w-2/6 md:w-[80%] w-full rounded-[8px] p-3 gap-3">
            <div className="w-full flex items-center justify-center">
              <div
                className={
                  icon == "success"
                    ? "flex items-center justify-center h-14 w-14 rounded-full bg-green-500 text-white"
                    : "flex items-center justify-center h-14 w-14 rounded-full bg-red-500 text-white"
                }
              >
                {icon == "success" ? (
                  <BiCheck className=" text-[24em]" />
                ) : (
                  <FaTimes className=" text-[24em]" />
                )}
              </div>
            </div>
            {title && (
              <div className="text-xl text-gray-550 capitalize font-[500]">
                {title}
              </div>
            )}
            <div
              className={
                icon == "success"
                  ? "text-lg capitalize m-0 p-0 font-[500] text-gray-400"
                  : "text-red-400 text-lg capitalize m-0 p-0 font-[500] text-gray-400"
              }
            >
              {message}
            </div>
            <div className="h-12 w-full">
              <button
                onClick={routePage}
                type="button"
                className="h-[inherit] bg-blue-600 text-white items-center flex justify-center rounded-[8px] w-full text-lg font-[500]"
              >
                {buttonText ? `${buttonText}` : "Ok"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
