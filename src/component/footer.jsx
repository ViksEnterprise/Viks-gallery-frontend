import React, { useEffect, useState } from "react";
import { FaEnvelope, FaFacebook, FaInstagram, FaPhoneVolume, FaPinterest, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
                <footer className="lg:px-8 lg:pt-9 lg:pb-6 md:px-6 md:pt-7 md:pb-4 py-7 px-5 bg-black text-white flex flex-col gap-4">
                    <div className="flex md:justify-between gap-6 flex-col md:flex-row items-start">
                        <div className="flex flex-col gap-6 items-start">
                            <div className="flex flex-col gap-3">
                                <h2 className="lg:text-5xl text-3xl font-semibold">ViksGallery</h2>
                                <span className="lg:text-lg text-sm font-normal">Find Art that Speaks to Your Heart</span>
                            </div>
                            <div className="w-full">
                                <ul className="flex items-center gap-5 lg:text-lg md:text-base text-sm">
                                    <li>
                                        <Link className="no-underline" to="">
                                            <FaPinterest />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="no-underline" to="">
                                            <FaInstagram />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="no-underline" to="">
                                            <FaFacebook />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="no-underline" to="">
                                            <FaXTwitter />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="no-underline" to="">
                                            <FaTiktok />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex gap-3 flex-col items-start lg:text-lg text-sm">
                                <div className="flex gap-2 items-center">
                                    <FaEnvelope />
                                    <span>viksgallery@gmail.com</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <FaPhoneVolume />
                                    <span>080994567235</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 items-start">
                            <h5 className="capitalize lg:text-xl text-lg font-semibold">Company</h5>
                            <ul className="lg:text-base text-sm font-normal flex flex-col gap-2">
                                <li>
                                    <Link className="no-underline" to="/about">About us</Link>
                                </li>
                                <li>
                                    <Link className="no-underline" to="/login">Art gallery</Link>
                                </li>
                                <li>
                                    <Link className="no-underline" to="">Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-3 items-start">
                            <h5 className="capitalize lg:text-xl text-lg font-semibold">Art gallery collections</h5>
                            <ul className="lg:text-base text-sm font-normal flex flex-col gap-2">
                                <li>
                                    <Link className="no-underline" to="">Yarn painting</Link>
                                </li>
                                <li>
                                    <Link className="no-underline" to="">Yarn painting</Link>
                                </li>
                                <li>
                                    <Link className="no-underline" to="">Yarn painting</Link>
                                </li>
                                <li>
                                    <Link className="no-underline" to="">Yarn painting</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-3 items-start">
                            <h5 className="capitalize lg:text-xl text-lg font-semibold">Other links</h5>
                            <ul className="lg:text-base text-sm font-normal flex flex-col gap-2">
                                <li>
                                    <Link className="no-underline" to="">Privacy policy</Link>
                                </li>
                                <li>
                                    <Link className="no-underline" to="">Cookie policy</Link>
                                </li>
                                <li>
                                    <Link className="no-underline" to="">Term of use</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full text-center lg:text-base text-sm">
                        <p>&copy; {year} Viks Gallery - All Rights Reserved</p>
                    </div>
                </footer>
            </section>
        </div>
    )
}