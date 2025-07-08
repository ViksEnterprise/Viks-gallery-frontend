import React, { useState } from "react";
import "swiper/css";
import Flower from '../assets/flower.jpg'
import { CardComp } from "./CardModal";

export const Testimonial = () => {
    const slide = true

    const tes = [
        {img: Flower, name: 'Abraham John', tes: 'I was completely new to art collecting and didn’t know where to start, but the team at Viks Gallery was incredibly patient and helpful throughout the entire process. They took the time to educate me on different styles, mediums, and artists, which made me feel much more confident in my choices. Their recommendations were spot-on, and I ended up purchasing a beautiful piece that I absolutely love. It has brought so much character to my living room, and I couldn’t be more thrilled. The experience was both educational and enjoyable—thank you, Viks Gallery!'},
        {img: Flower, name: 'Peter James', tes: 'I was completely new to art collecting and didn’t know where to start, but the team at Viks Gallery was incredibly patient and helpful throughout the entire process. They took the time to educate me on different styles, mediums, and artists, which made me feel much more confident in my choices. Their recommendations were spot-on, and I ended up purchasing a beautiful piece that I absolutely love. It has brought so much character to my living room, and I couldn’t be more thrilled. The experience was both educational and enjoyable—thank you, Viks Gallery!'},
        {img: Flower, name: 'Anietie Peter', tes: 'I was completely new to art collecting and didn’t know where to start, but the team at Viks Gallery was incredibly patient and helpful throughout the entire process. They took the time to educate me on different styles, mediums, and artists, which made me feel much more confident in my choices. Their recommendations were spot-on, and I ended up purchasing a beautiful piece that I absolutely love. It has brought so much character to my living room, and I couldn’t be more thrilled. The experience was both educational and enjoyable—thank you, Viks Gallery!'},
        {img: Flower, name: 'Joy Etim', tes: 'I was completely new to art collecting and didn’t know where to start, but the team at Viks Gallery was incredibly patient and helpful throughout the entire process. They took the time to educate me on different styles, mediums, and artists, which made me feel much more confident in my choices. Their recommendations were spot-on, and I ended up purchasing a beautiful piece that I absolutely love. It has brought so much character to my living room, and I couldn’t be more thrilled. The experience was both educational and enjoyable—thank you, Viks Gallery!'},
        {img: Flower, name: 'Precious Con', tes: 'I was completely new to art collecting and didn’t know where to start, but the team at Viks Gallery was incredibly patient and helpful throughout the entire process. They took the time to educate me on different styles, mediums, and artists, which made me feel much more confident in my choices. Their recommendations were spot-on, and I ended up purchasing a beautiful piece that I absolutely love. It has brought so much character to my living room, and I couldn’t be more thrilled. The experience was both educational and enjoyable—thank you, Viks Gallery!'}
    ];

    const tesSwipe = {
      spaceBetween: 15,
      slidesPerView: 3,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
      breakpoints: {
        320: { slidesPerView: 1 },
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    };
    
    return (
        <CardComp 
            title={'Customers review'}
            sliperElement={tesSwipe}
            items={tes}
            renderItem={(tes) => (
                <div className="flex items-center w-full flex-col gap-3 py-5 rounded-lg shadow-md shadow-slate-400 bg-tes-col overflow-hidden">
                    <div className="flex items-center justify-between lg:gap-2 lg:justify-center w-full px-5">
                        <div className="w-9 h-9 rounded-full">
                            <img className="bg-black w-9 h-9 rounded-full" src={tes.img} alt="" />
                        </div>
                        <div className="text-base font-medium">
                            <span>{tes.name}</span>
                        </div>
                    </div>
                    <div className="w-full text-sm px-3">
                        <span>"{tes.tes}"</span>
                    </div>
                </div>
            )}
            subSecStyle='w-full flex flex-col gap-4'
            style='flex items-center justify-center text-start flex-col w-full'
            inStyle='w-full rounded-lg'
            titleStyle='uppercase text-lg font-[500] w-full text-start'
            swipe={slide}
        />
    )
}