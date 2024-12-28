import React from "react";
import bestSell from '../assets/home.jpg';

export const Seller = () => {

    const popularSales = [
        {image: bestSell, name: 'The lonely tales'},
        {image: bestSell, name: 'The lonely tales'},
        {image: bestSell, name: 'The lonely tales'},
    ]

    return (
        <section className="p-4 lg:p-9">
            <div className="flex items-center flex-col gap-4 lg:gap-9 w-full">
                <div className="text-center">
                    <h3 className="text-xl lg:text-3xl uppercase font-bold">Our best seller</h3>
                    <p className="font-medium text-lg">Fall in love with every piece</p>
                </div>
                <div className="flex items-center justify-center flex-col lg:flex-row w-full gap-3">
                    {popularSales.map((sale, i) => (
                        <div className="w-full lg:w-2/5 h-fit flex-1 rounded-lg shadow-md shadow-slate-400 overflow-hidden" key={i}>
                            <div className="flex items-start justify-start flex-col gap-3 w-full h-fit">
                                <div className="w-full h-80">
                                    <img className="w-full h-full" src={sale.image} alt="" />
                                </div>
                                <div className="py-2 px-2">
                                    <h6>{sale.name}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}