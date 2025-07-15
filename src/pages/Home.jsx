import React, { useState } from "react";
import landingImg from "../assets/home.jpg";
import aboutImg from "../assets/about.jpg";
import { Seller } from "../component/Collections";
import { Subscribe } from "../component/Subscription";
import { HiChevronRight } from "react-icons/hi";
import { useEffect } from "react";
import { Footer } from "../component/FooterNav";
import { NavBar } from "../component/NavBar";

export const Home = () => {
  const [heroImgLength, setHeroImgLength] = useState(0);
  const [opacity, setOpacity] = useState(0);

  const welcomeMSG = [
    { msg: "Welcome to viks gallery" },
    { msg: "Welcome to viks gallery" },
    { msg: "Welcome to viks gallery" },
    { msg: "Welcome to viks gallery" },
  ];

  const heroImg = [
    { img: landingImg },
    { img: aboutImg },
    { img: landingImg },
    { img: aboutImg },
  ];

  useEffect(() => {
    const showImg = setTimeout(() => {
      setOpacity(1);
    }, 110);

    return () => clearTimeout(showImg);
  }, [heroImgLength]);

  useEffect(() => {
    const automateHeroImg = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setHeroImgLength((pre) => (pre + 1) % heroImg.length);
      }, 200);
    }, 3500);

    return () => clearInterval(automateHeroImg);
  }, []);

  return (
    <div>
      <NavBar />
      <section className="h-screen w-full bg-white text-white md:flex relative">
        <div className="w-full md:w-1/2 lg:w-2/5 md:bg-black bg-black/75 px-4 md:px-10 flex-initial absolute z-50 md:relative top-0 bottom-0">
          <div className="py-16 flex flex-col gap-7">
            <h3 className="text-4xl lg:text-5xl font-bold w-full">
              Find art that speaks to your heart
            </h3>
            <div className="w-full">
              <p className="text-base lg:text-lg font-medium">
                Explore our curated collection of masterpieces and find the
                perfect piece to elevate your space. Our arts are designed to
                help you find your personal craft and luxuriously design your
                home suitable for your needs and preferences.
              </p>
            </div>
            <div className="w-full h-12">
              <a
                href="/art-gallery"
                className="flex items-center text-center justify-center text-decoration-none bg-blue-900 rounded-[3px] text-white w-full h-[inherit]"
              >
                Explore our gallery
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full md:w-1/2 lg:w-3/5 h-screen overflow-hidden">
          <div
            className="w-full h-screen flex hero-hol"
            style={{
              transform: `translateX(-${heroImgLength * 100}%)`,
              opacity: `${opacity}`,
            }}
          >
            {heroImg.map((images, index) => (
              <img
                key={index}
                className="h-full w-full"
                src={images.img}
                alt=""
              />
            ))}
          </div>
        </div>
      </section>
      <section className="w-full overflow-hidden">
        <div className="w-121 overflow-hidden flex py-5 gap-8">
          {welcomeMSG.map((msg, index) => (
            <div
              key={index}
              className="text-7xl stroke-text text-transparent flex-initial w-125 font-blod uppercase"
            >
              <h3>{msg.msg}</h3>
            </div>
          ))}
        </div>
        <hr className="text-5xl text-black" />
      </section>
      <section className="w-full lg:p-9 p-4">
        <div className="flex gap-5 items-center flex-col-reverse lg:flex-row">
          <div className="flex-1 w-full lg:w-2/5 h-96 rounded-lg">
            <img className="h-full w-full rounded-lg" src={aboutImg} alt="" />
          </div>
          <div className="flex-1 w-full lg:w-2/5">
            <div className="lg:p-4 md:p-2 flex flex-col gap-5">
              <div>
                <h4 className="text-3xl text-center md:text-start text-abt-blue font-semibold uppercase">
                  About Us
                </h4>
              </div>
              <div className="text-xl-15 flex flex-col gap-4 text-black font-normal">
                <p>
                  At Viks Gallery, we pride ourselves on offering a carefully
                  curated selection of artworks that span a wide range of
                  styles, mediums, and movements. Our mission is to showcase
                  both emerging and established artists, providing them with a
                  platform to share their stories, challenge conventional
                  narratives, and push the boundaries of contemporary art. We
                  are deeply committed to promoting art that sparks meaningful
                  conversations and resonates with diverse audiences, from
                  first-time visitors to seasoned collectors.
                </p>
                <p>
                  Our gallery was founded on the belief that art is a universal
                  language, one that transcends borders and speaks to the shared
                  experiences of humanity. In this spirit, Viks Gallery is
                  dedicated to fostering inclusivity and accessibility within
                  the art world. We aim to break down the barriers that often
                  separate artists from their audiences, ensuring that art is
                  accessible to everyone, regardless of background, ...
                </p>
              </div>
              <div>
                <a href="/about">
                  <span className="flex items-center text-xl text-deep-blue capitalize font-semibold">
                    Read more <HiChevronRight />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <Seller />
      <hr />
      <Subscribe />
      <Footer />
    </div>
  );
};
