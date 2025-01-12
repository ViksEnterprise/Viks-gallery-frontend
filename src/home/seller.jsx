import React from "react";
import bestSell from '../assets/home.jpg';
import { Card } from "../component/card";

export const Seller = () => {

  const popularSales = [
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'},
    {image: bestSell, name: 'The lonely tales'}
  ];

  return (
    <Card
      title="Our Best Seller"
      subTitle="Fall in love with every piece"
      items={popularSales}
      renderItem={(sale) => (
          <div className="flex items-start justify-start flex-col gap-3 w-full h-fit">
            <div className="w-full h-80">
              <img className="w-full h-full" src={sale.image} alt={sale.name} />
            </div>
            <div className="py-2 px-2">
              <h6>{sale.name}</h6>
            </div>
          </div>
      )}
      style="flex items-center justify-start flex-col lg:flex-row w-full lg:gap-3 gap-5"
      subStyle="w-full lg:w-2/5 flex-1 h-fit rounded-lg shadow-md shadow-slate-400 overflow-hidden"
    />
  )
}