import React from "react";
import landingImg from '../assets/home.jpg'
import aboutImg from '../assets/about.jpg'
import { Seller } from "../component/seller";
import { Subscribe } from "../component/subscribe";

export const Home = () => {

    const welcomeMSG = [
        {msg: 'Welcome to vikis gallery'},
        {msg: 'Welcome to vikis gallery'},
        {msg: 'Welcome to vikis gallery'},
        {msg: 'Welcome to vikis gallery'}
    ];

    return (
        <div>
            <section className="h-screen w-full bg-white text-white lg:flex relative overflow-hidden">
                <div className="w-full lg:w-2/5 lg:bg-black lg:opacity-60 lg:opacity-100 px-4 lg:px-10 flex-initial absolute lg:relative top-0 bottom-0">
                    <div className="py-16 flex flex-col gap-7">
                        <h3 className="text-5xl font-bold w-full">Find Art that Speaks to Your Heart</h3>
                        <div className="w-full">
                            <p className="text-lg font-medium">Explore our curated collection of masterpieces and find the perfect piece to elevate your space. Our arts are designed to help you find your personal craft and luxuriously design your home suitable for your needs and preferences.</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full lg:w-3/5 h-screen">
                    <div className="w-full h-screen">
                        <img className="h-full" src={landingImg} alt="" />
                    </div>
                </div>
            </section>
            <section className="w-full overflow-hidden">
                <div className="w-121 overflow-hidden flex py-5 gap-8">
                    {welcomeMSG.map((msg) => ( 
                        <div className="text-7xl stroke-text text-transparent flex-initial w-120 font-black uppercase">
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
                        <div className="lg:p-4 p-2 flex flex-col gap-5">
                            <div>
                                <h4 className="text-3xl text-abt-blue font-semibold uppercase">About Us</h4>
                            </div>
                            <div className="text-xl-15 flex flex-col gap-4 text-black font-normal">
                                <p>At Viks Gallery, we pride ourselves on offering a carefully curated selection of artworks that span a wide range of styles, mediums, and movements. Our mission is to showcase both emerging and established artists, providing them with a platform to share their stories, challenge conventional narratives, and push the boundaries of contemporary art. We are deeply committed to promoting art that sparks meaningful conversations and resonates with diverse audiences, from first-time visitors to seasoned collectors.</p>
                                <p>Our gallery was founded on the belief that art is a universal language, one that transcends borders and speaks to the shared experiences of humanity. In this spirit, Viks Gallery is dedicated to fostering inclusivity and accessibility within the art world. We aim to break down the barriers that often separate artists from their audiences, ensuring that art is accessible to everyone, regardless of background, ...</p>
                            </div>
                            <div>
                                <span className="text-xl text-deep-blue capitalize font-semibold">Read more</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            <Seller />
            <hr />
            <Subscribe />
        </div>
    )
}
