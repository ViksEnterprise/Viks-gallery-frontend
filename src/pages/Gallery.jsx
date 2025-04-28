import React from "react";
import bestSell from '../assets/home.jpg';
import { Card } from "../component/Card";
import { Subscribe } from "../component/Subscription";
import { Footer } from "../component/Footer";
import { NavBar } from "../component/NavBar";
import { FaArrowDown, FaArrowUp, FaChevronDown, FaSearch} from "react-icons/fa";

export const Gallery = () => {

  const popularSales = [
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'}
  ];

  return (
    <>
      <NavBar />
      <hr />
      <div className="h-fit w-full py-3 md:px-10 px-4">
        <div className="flex md:justify-between gap-3 md:flex-row flex-col w-full">
          <div className="h-11 flex items-center border rounded-[7px] gap-2 px-2 overflow-hidden xl:w-1/4 lg:w-[40%] md:w-[45%] w-full">
            <FaSearch className="text-[14px] text-gray-400 font-normal" />
            <input
              className="h-full border-none outline-[transparent]"
              type="text"
              placeholder="search for items"
            />
          </div>
          <div className="h-11 flex items-center border rounded-[7px] gap-2 px-2 overflow-hidden xl:w-1/4 lg:w-[40%] md:w-[45%] w-full">
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
}