import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const Testimonial = () => {
    const [swiper, setSwiper] = useState(null)

    const tes = [
        {img: '', name: 'Abraham John', tes: 'I was completely new to art collecting and didn’t know where to start, but the team at Viks Gallery was incredibly patient and helpful throughout the entire process. They took the time to educate me on different styles, mediums, and artists, which made me feel much more confident in my choices. Their recommendations were spot-on, and I ended up purchasing a beautiful piece that I absolutely love. It has brought so much character to my living room, and I couldn’t be more thrilled. The experience was both educational and enjoyable—thank you, Viks Gallery!'},
        {img: '', name: 'Peter James', tes: 'I was completely new to art collecting and didn’t know where to start, but the team at Viks Gallery was incredibly patient and helpful throughout the entire process. They took the time to educate me on different styles, mediums, and artists, which made me feel much more confident in my choices. Their recommendations were spot-on, and I ended up purchasing a beautiful piece that I absolutely love. It has brought so much character to my living room, and I couldn’t be more thrilled. The experience was both educational and enjoyable—thank you, Viks Gallery!'},
        {img: '', name: 'Anietie Peter', tes: 'I was completely new to art collecting and didn’t know where to start, but the team at Viks Gallery was incredibly patient and helpful throughout the entire process. They took the time to educate me on different styles, mediums, and artists, which made me feel much more confident in my choices. Their recommendations were spot-on, and I ended up purchasing a beautiful piece that I absolutely love. It has brought so much character to my living room, and I couldn’t be more thrilled. The experience was both educational and enjoyable—thank you, Viks Gallery!'},
        {img: '', name: 'Joy Etim', tes: 'I was completely new to art collecting and didn’t know where to start, but the team at Viks Gallery was incredibly patient and helpful throughout the entire process. They took the time to educate me on different styles, mediums, and artists, which made me feel much more confident in my choices. Their recommendations were spot-on, and I ended up purchasing a beautiful piece that I absolutely love. It has brought so much character to my living room, and I couldn’t be more thrilled. The experience was both educational and enjoyable—thank you, Viks Gallery!'},
        {img: '', name: 'Precious Con', tes: 'I was completely new to art collecting and didn’t know where to start, but the team at Viks Gallery was incredibly patient and helpful throughout the entire process. They took the time to educate me on different styles, mediums, and artists, which made me feel much more confident in my choices. Their recommendations were spot-on, and I ended up purchasing a beautiful piece that I absolutely love. It has brought so much character to my living room, and I couldn’t be more thrilled. The experience was both educational and enjoyable—thank you, Viks Gallery!'}
    ];

    const tesSwipe = {
        spaceBetween: 15,
        slidesPerView: 1,
        autoplay:{
            delay: 2500,
            disableOnInteraction: false,
        },
        allowTouchMove: false
    };
    
    return (
        <section className="p-4 lg:p-9">
            <div className="flex items-center flex-col gap-4 lg:gap-9 w-full">
                <div className="text-center">
                    <h3 className="text-xl lg:text-3xl uppercase font-bold">Testimonial</h3>
                    <p className="font-medium text-lg">Don’t just take it from us, hear what our clients say</p>
                </div>
                <div className="flex items-center justify-center flex-col w-full">
                    <div className="w-full lg:w-3/5 rounded-lg">
                        <Swiper
                            {...tesSwipe}
                            onSwiper={(swiper) => setSwiper(swiper)}
                        >
                            {tes.map((con, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex items-center w-full flex-col gap-3 py-5 rounded-lg shadow-md shadow-slate-400 bg-tes-col">
                                        <div className="flex items-center justify-between lg:gap-2 lg:justify-center w-full px-5">
                                            <div className="w-9 h-9 rounded-full">
                                                <img className="bg-black w-9 h-9 rounded-full" src={con.img} alt="" />
                                            </div>
                                            <div className="text-base font-medium">
                                                <span>{con.name}</span>
                                            </div>
                                        </div>
                                        <div className="w-full text-xl-15 lg:text-base px-3">
                                            <span>"{con.tes}"</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}