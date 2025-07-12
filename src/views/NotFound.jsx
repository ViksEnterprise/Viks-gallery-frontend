import React from "react";
import { BiSearchAlt } from "react-icons/bi";

export const Error404 = () => {

  return (
    <div>
      <div className="flex items-center justify-center w-full h-svh bg-white">
        <div className="flex w-full p-3 items-center justify-center flex-col gap-2">
          <div className="flex items-center flex-col gap-1 capitalize font-semibold">
            <h2 className="text-[9em] text-blue-800 m-0 h-fit flex items-center">
              4<BiSearchAlt />4
            </h2>
            <p className="text-lg m-0 text-center">Page not found</p>
          </div>
          <a href="/" className="p-3 md:w-[40%] w-full bg-blue-800 flex items-center justify-center rounded-lg flex-col font-semibold text-base text-white">
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
};
