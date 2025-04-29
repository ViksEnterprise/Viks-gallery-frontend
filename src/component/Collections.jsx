import React from "react";
import bestSell from "../assets/home.jpg";
import { Card } from "./card";

export const Seller = () => {
  const popularSales = [
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
    { image: bestSell, name: "The lonely tales" },
  ];

  return (
    <Card
      title="Explore Our Latest Collections"
      titleStyle="text-xl md:text-2xl lg:text-3xl uppercase text-[#09067C] font-[500]"
      items={popularSales}
      renderItem={(sale) => (
        <div className="flex items-start justify-start flex-col gap-[4px] w-full h-fit">
          <div className="w-full h-80">
            <img className="w-full h-full" src={sale.image} alt={sale.name} />
          </div>
          <div className="py-2 text-base font-[450] text-black uppercase">
            <h6>{sale.name}</h6>
          </div>
        </div>
      )}
      style="flex items-center justify-start flex-wrap w-full lg:gap-3 gap-5"
      subStyle="w-full md:w-[48.5%] lg:w-[32.3%] flex-0 h-fit overflow-hidden"
    />
  );
};
