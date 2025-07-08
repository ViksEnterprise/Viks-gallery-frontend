import React from "react";
import { NavBar } from "../component/NavBar";
import { Footer } from "../component/FooterNav";
import contactImg from "../assets/contact.jpg";
import { FiMail } from "react-icons/fi";
import { BiPhoneCall } from "react-icons/bi";

export const Contact = () => {
  return (
    <>
      <NavBar />
      <hr />
      <section>
        <div className="flex items-center w-full">
          <div className="flex items-start gap-3 md:gap-5 lg:gap-8 md:flex-row flex-col w-full md:p-11 p-5">
            <div className="lg:w-[40%] md:w-1/2 w-full">
              <img
                className="w-full lg:h-96 md:h-56 h-48 rounded-[3px]"
                src={contactImg}
                alt=""
              />
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-3 items-start">
              <div>
                <h4 className="text-[#09067C] font-[500] md:text-xl text-lg uppercase">
                  Contact us
                </h4>
              </div>
              <div>
                <p className="text-black font-[500] md:text-base text-sm lg:w-3/4 md:w-3/2 w-full">
                  We would love to hear from you. You can reach using the
                  following information.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <a
                  className="flex items-center gap-1 text-sm text-decoration-none"
                  href="mailto:viksgallery@gmail.com"
                >
                  <FiMail className="text-2xl fill-black stroke-white" />
                  viksgallery@gmail.com
                </a>
                <a
                  className="flex items-center gap-1 text-sm text-decoration-none"
                  href="tel:080994567235"
                >
                  <BiPhoneCall className="text-2xl fill-black stroke-white" />
                  080994567235
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <Footer />
    </>
  );
};
