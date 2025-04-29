import React, { useEffect, useState } from "react";
import bestSell from "../assets/home.jpg";
import { Card } from "../component/card";
import { Subscribe } from "../component/Subscription";
import { Footer } from "../component/footer";
import { NavBar } from "../component/NavBar";
import {
  FaArrowDown,
  FaArrowUp,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";
import { BsHeart, BsTriangleFill } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const Gallery = () => {
  const navigate = useNavigate()
  const [noOfItemsInCart, setNoOfItemsInCart] = useState(0);
  const [noOfItemsInFavourite, setNoOfItemsInFavourite] = useState(0);
  const [hoverFav, setHoverFav] = useState(false);

  const routeToCart = () => {
    navigate('/myCart')
  }

  const popularSales = [
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
  ];

  useEffect(() => {
    const favIcon = document.getElementById("fav");

    const handleMouseOver = () => {
      setHoverFav(true);
    };

    const handleMouseOut = () => {
      setHoverFav(false);
    };

    if (favIcon) {
      favIcon.addEventListener("mouseover", handleMouseOver);
      favIcon.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (favIcon) {
        favIcon.removeEventListener("mouseover", handleMouseOver);
        favIcon.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, []);

  return (
    <>
      <NavBar />
      <hr />
      <div className="h-fit w-full py-3 md:px-10 px-4">
        <div className="flex md:justify-between gap-3 md:flex-row flex-col w-full items-center">
          <div className="h-11 flex items-center border-gray-400 border-solid border-[1px] rounded-[7px] gap-2 px-2 overflow-hidden xl:w-1/4 lg:w-[40%] md:w-[45%] w-full">
            <FaSearch className="text-[14px] text-gray-400 font-normal" />
            <input
              className="h-full border-none outline-[transparent]"
              type="text"
              placeholder="search for items"
            />
          </div>
          <div className="flex items-center gap-[6px] xl:w-1/4 lg:w-[40%] md:w-[45%] w-full">
            <div
              className={ hoverFav ? "relative w-fit-content h-fit flex flex-col gap-1 items-center justify-center w-fit cursor-pointer" : "relative w-fit-content h-fit flex flex-col gap-1 items-center justify-center w-10 cursor-pointer"}
              id="fav"
            >
              <BsHeart className="w-10 h-5 text-gray-400" />
              <div
                className={
                  hoverFav
                    ? "bg-blue-600 text-white w-[3.4em!important] p-1 flex items-center justify-center text-xs font-semibold h-5 rounded-[5px] flex-col relative"
                    : "hidden"
                }
              >
                <BsTriangleFill className="absolute top-[-0.6em] text-[8px] text-blue-600" />
                {noOfItemsInFavourite}
              </div>
            </div>
            <div className="relative w-10 items-center justify-center flex h-fit cursor-pointer" onClick={routeToCart}>
              <BiCart className="w-16 h-8 text-gray-400" />
              <div
                className={
                  noOfItemsInCart == 0
                    ? "hidden"
                    : "absolute top-0 end-[0.2em] bg-blue-600 text-white w-fit p-1 flex items-center justify-center text-xs font-semibold h-4 rounded-full"
                }
              >
                {noOfItemsInCart}
              </div>
            </div>
            <div className="h-11 flex items-center border-gray-400 border-solid border-[1px] rounded-[7px] gap-2 px-2 overflow-hidden w-full">
              <div className="flex items-center gap-1">
                <FaArrowUp className="text-[14px] text-gray-400 font-normal" />
                <FaArrowDown className="text-[14px] text-gray-400 font-normal" />
              </div>
              <div className="flex items-center w-full justify-between text-gray-400">
                <div className="h-full flex items-center text-center justify-center">
                  Sort
                </div>
                <FaChevronDown className="text-[14px] text-gray-400 font-normal" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <Card
        items={popularSales}
        renderItem={(sale) => (
          <div className="flex items-start justify-start flex-col gap-[4px] w-full h-fit">
            <div className="w-full h-80">
              <img className="w-full h-full" src={sale.image} alt={sale.name} />
            </div>
            <div className="text-base font-[500] text-black uppercase w-full flex justify-between">
              <h6>{sale.name}</h6>
              <span>$500</span>
            </div>
            <div className="flex gap-2 items-center m-0 p-0">
              <span>Yarn Painting</span>
              <span className="flex items-center gap-1 text-sm m-0">
                50cm &times; 50sm
              </span>
            </div>
          </div>
        )}
        style="flex items-center justify-start flex-wrap w-full lg:gap-3 gap-5"
        subStyle="w-full md:w-[48.5%] lg:w-[32.3%] flex-0 h-fit overflow-hidden"
      />
      <hr />
      <Subscribe />
      <hr />
      <Footer />
    </>
  );
};
