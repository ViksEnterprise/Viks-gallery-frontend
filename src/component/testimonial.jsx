import React from "react";
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

export const Testimonial = () => {
    return (
        <section className="p-3 lg:p-9">
            <div className="flex items-center flex-col gap-4 lg:gap-9 w-full">
                <div className="text-center">
                    <h3 className="text-xl lg:text-3xl uppercase font-bold">Testimonial</h3>
                    <p className="font-medium text-lg">Don’t just take it from us, hear what our clients say</p>
                </div>
                <div className="flex items-center justify-items-center flex-col w-full">
                    <div className="w-full lg:w-3/5">
                        <div className="flex items-center w-full flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-full">
                                    <img className="bg-black w-9 h-9 rounded-full" src="" alt="" />
                                </div>
                                <div className="text-base font-medium">
                                    <span>Abraham John</span>
                                </div>
                            </div>
                            <div className="w-full text-xl-15 lg:text-base px-3">
                                <span>"I was completely new to art collecting and didn’t know where to start, but the team at Viks Gallery was incredibly patient and helpful throughout the entire process. They took the time to educate me on different styles, mediums, and artists, which made me feel much more confident in my choices. Their recommendations were spot-on, and I ended up purchasing a beautiful piece that I absolutely love. It has brought so much character to my living room, and I couldn’t be more thrilled. The experience was both educational and enjoyable—thank you, Viks Gallery!"</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}