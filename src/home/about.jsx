import React from "react";
import { Footer } from "../component/footer";
import { Subscribe } from "../component/subscribe";
import { Card } from "../component/card";
import teamImg from '../assets/team.jpg'
import artise from '../assets/artise.jpg'
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const About = () => {
    const teams = [
        {img: teamImg, name: 'Victor bassey', role: 'Chief executive officer', handels: [
            {icon: <FaFacebook />, style: 'text-blue-900', link: '#'},
            {icon: <FaLinkedin />, style: 'text-blue-900', link: '#'},
            {icon: <FaXTwitter />, link: '#'},
            {icon: <FaInstagram />, link: '#'}
        ]},
        {img: teamImg, name: 'Victor bassey', role: 'Chief executive officer', handels: [
            {icon: <FaFacebook />, style: 'text-blue-900', link: '#'},
            {icon: <FaLinkedin />, style: 'text-blue-900', link: '#'},
            {icon: <FaXTwitter />, link: '#'},
            {icon: <FaInstagram />, link: '#'}
        ]},
        {img: teamImg, name: 'Victor bassey', role: 'Chief executive officer', handels: [
            {icon: <FaFacebook />, style: 'text-blue-900', link: '#'},
            {icon: <FaLinkedin />, style: 'text-blue-900', link: '#'},
            {icon: <FaXTwitter />, link: '#'},
            {icon: <FaInstagram />, link: '#'}
        ]}
    ];

    const handels = [
        {icon: <FaFacebook />, style: 'text-blue-900', link: '#'},
        {icon: <FaLinkedin />, style: 'text-blue-900', link: '#'},
        {icon: <FaXTwitter />, link: '#'},
        {icon: <FaInstagram />, link: '#'}
    ];

    return (
        <div>
            <hr />
            <Card 
                title='Meet our artist'
                normalDiv={true}
                renderItem={
                    <div className="flex items-start lg:items-center justify-start lg:justify-center md:flex-row flex-col gap-5 w-full h-fit">
                        <div className="lg:w-1/3 md:w-2/5 w-full md:h-96 h-72">
                            <img className="w-full h-full" src={artise} alt="artise photo" />
                        </div>
                        <div className="lg:w-1/2 md:w-3/5 w-full flex flex-col gap-4">
                            <h5 className="font-semibold text-2xl">Victor</h5>
                            <div className="flex flex-col gap-3 lg:text-sm md:text-xs text-sm">
                                <p>At Viks Gallery, we pride ourselves on offering a carefully curated selection of artworks that span a wide range of styles, mediums, and movements. Our mission is to showcase both emerging and established artists, providing them with a platform to share their stories, challenge conventional narratives, and push the boundaries of contemporary art. We are deeply committed to promoting art that sparks meaningful conversations and resonates with diverse audiences, from first-time visitors to seasoned collectors.</p>
                                <p>Our gallery was founded on the belief that art is a universal language, one that transcends borders and speaks to the shared experiences of humanity. In this spirit, Viks Gallery is dedicated to fostering inclusivity and accessibility within the art world. We aim to break down the barriers that often separate artists from their audiences, ensuring that art is accessible to everyone, regardless of background, education, or financial means. Whether you are looking to add to your personal collection, discover new talent, or simply experience the beauty of artistic expression, we welcome you to explore our gallery.</p>
                            </div>
                            <div className="lg:text-xl md:text-base text-lg">
                                <ul className="flex items-center gap-6">
                                    {handels.map((icon, i) => (
                                        <li className={icon.style} key={i}>
                                            <Link className='no-underline' to={icon.link} target="_blank">
                                               {icon.icon}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                }

                
                style="flex items-center justify-start md:justify-center flex-wrap w-full lg:gap-3 gap-5"
                subStyle="w-full flex-initial h-fit overflow-hidden"
            />
            <hr />
            <Card 
                title='Meet our amazing team'
                items={teams}
                swipe={false}
                normalDiv={false}
                renderItem={(team) => (
                    <div className="flex items-start justify-start flex-col gap-2 w-full h-fit">
                        <div className="w-full lg:h-80 h-72">
                            <img className="w-full h-full" src={team.img} alt={team.name} />
                        </div>
                        <div className="lg:text-xl text-base font-normal flex flex-col gap-3 capitalize">
                            <h6>{team.name}</h6>
                            <p>{team.role}</p>
                            <div>
                                <ul className="flex items-center gap-6">
                                    {team.handels.map((icon, i) => (
                                        <li className={icon.style} key={i}>
                                            <Link className='no-underline' to={icon.link} target="_blank">
                                               {icon.icon}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                style="flex items-center justify-start md:justify-center flex-wrap w-full lg:gap-3 gap-5"
                subStyle="w-full md:w-3p flex-initial h-fit overflow-hidden"
            />
            <hr />
            <Subscribe />
            <Footer />
        </div>
    )
}