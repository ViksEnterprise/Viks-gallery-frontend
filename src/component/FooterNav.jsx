import React, { useEffect, useState } from "react";
import { FaEnvelope, FaFacebook, FaInstagram, FaPhoneVolume, FaPinterest, FaTiktok, FaXTwitter } from "react-icons/fa6";
import Logo from "../assets/VIKS Gallery transparent.png"

export const Footer = () => {
    const [year, setYear] = useState(null);


    useEffect(() => {
        const getCurrentYear = () => {
            let year;
            const date = new Date();
            const getYear = date.getFullYear();
            year = getYear;
            setYear(year)
        }

        getCurrentYear();

    }, [year]);


    return (
      <div>
        <section className="w-full">
          <footer className="lg:px-8 lg:pt-9 lg:pb-6 md:px-6 md:pt-7 md:pb-4 py-7 px-5 flex flex-col gap-4">
            <div className="flex md:justify-start gap-6 flex-col items-start">
              <div className="flex flex-col gap-6 items-start">
                <div className="flex flex-col gap-3">
                  <div className="h-full">
                    <img className="h-56" src={Logo} alt="Viks gallery logo" />
                  </div>
                  <span className="lg:text-base text-sm font-normal">
                    Find art that speaks to your heart
                  </span>
                </div>
                <div className="flex gap-3 flex-col items-start lg:text-base text-sm">
                  <a
                    href="mailto:viksgallery@gmail.com"
                    className="flex gap-2 items-center text-decoration-none"
                  >
                    <FaEnvelope />
                    <span>viksgallery@gmail.com</span>
                  </a>
                  <a
                    href="tel:080994567235"
                    className="flex gap-2 items-center text-decoration-none"
                  >
                    <FaPhoneVolume />
                    <span>080994567235</span>
                  </a>
                </div>
                <div className="w-full">
                  <ul className="flex items-center gap-5 lg:text-lg md:text-base text-sm">
                    <li>
                      <a className="no-underline" href="">
                        <FaPinterest />
                      </a>
                    </li>
                    <li>
                      <a className="no-underline" href="">
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a className="no-underline" href="">
                        <FaFacebook />
                      </a>
                    </li>
                    <li>
                      <a className="no-underline" href="">
                        <FaXTwitter />
                      </a>
                    </li>
                    <li>
                      <a className="no-underline" href="">
                        <FaTiktok />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-start">
                <ul className="lg:text-base md:text-sm text-xs font-normal flex gap-2 uppercase">
                  <li>
                    <a className="no-underline" href="#">
                      Privacy policy
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Cookie policy
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Term of use
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full text-center lg:text-base text-sm">
              <p>{year} Viks Gallery - All Rights Reserved</p>
            </div>
          </footer>
        </section>
      </div>
    );
}
