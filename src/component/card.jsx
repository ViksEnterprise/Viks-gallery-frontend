import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css";

export const Card = ({ items, title, subTitle, renderItem, style, inStyle, subStyle, swipe, sliperElement }) => {
    const [swiper, setSwiper] = useState(null)

    return (
        <section className="p-4 lg:p-9">
            <div className="flex items-center flex-col gap-4 lg:gap-9 w-full">
                <div className="text-center">
                    <h3 className="text-xl lg:text-3xl uppercase font-bold">{title}</h3>
                    { subTitle && <p className="font-medium text-lg">{subTitle}</p> }
                </div>
                {swipe ? 
                    <div className={`${style}`}>
                        <div className={`${inStyle}`}>
                            <Swiper
                                {...sliperElement}
                                onSwiper={(swiper) => setSwiper(swiper)}
                            >
                                {items.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        {renderItem(item)}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>  : 
                    <div className={`${style}`}>
                        {items.map((item, i) => (
                            <div className={`${subStyle}`} key={i}>
                                {renderItem(item)}
                            </div>
                        ))}
                    </div>
                }
            </div>
        </section>
    )
}