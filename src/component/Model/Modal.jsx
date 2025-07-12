import React, { useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

export const Model = ({
  message,
  icon,
  title,
  buttonText,
  modal,
  direction,
  modalDisplay,
  button,
}) => {

  const route = () => {
   window.location.href = `${direction}`;
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (modalDisplay) {
      document.body.style.overflow = "hidden";
    }
  }, [modalDisplay]);
  return (
    <>
      <div className={modalDisplay ? "block" : "hidden"}>
        <div
          className={
            modal
              ? "fixed flex z-[999] h-full w-full items-center justify-center bg-black/75 top-0 bottom-0 p-3"
              : "flex items-center justify-center w-full h-[60svh] p-3"
          }
        >
          <div className={modal ? "bg-white text-black flex flex-col items-center justify-center h-fit lg:w-2/6 sm:w-[80%] w-full rounded-[8px] p-3 gap-3" : "bg-white text-black flex flex-col items-center justify-center h-48 lg:w-2/6 sm:w-[80%] w-full rounded-[8px] p-3 gap-5 shadow-lg shadow-gray-300 my-5 border border-slate-300"}>
            <div className="w-full flex items-center justify-center">
              <div
                className={
                  icon == "success"
                    ? "flex items-center justify-center h-14 w-14 rounded-full bg-green-500 text-white"
                    : "flex items-center justify-center h-12 w-12 rounded-full bg-red-500 text-white p-2"
                }
              >
                {icon == "success" ? (
                  <BiCheck className=" text-[24em]" />
                ) : (
                  <FaTimes className=" text-[2em]" />
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
                  ? "text-base capitalize m-0 p-0 font-[500] text-gray-400"
                  : "text-base capitalize m-0 p-0 font-[500] text-gray-400"
              }
            >
              {message}
            </div>
            <div className="h-12 w-full">
              {direction ? (
                <button
                  onClick={() => route()}
                  type="button"
                  className={modal ? "h-[inherit] bg-blue-700 text-white items-center flex justify-center rounded-[8px] w-full text-lg font-[500]" : "h-[inherit] bg-blue-800 text-white items-center flex justify-center rounded-[8px] w-full text-lg font-[500]"}
                >
                  {buttonText}
                </button>
              ) : (
                <button
                  onClick={button}
                  type="button"
                  className="h-[inherit] bg-blue-600 text-white items-center flex justify-center rounded-[8px] w-full text-lg font-[500]"
                >
                  Ok
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
