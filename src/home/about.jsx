import React, { useEffect, useState } from "react";
import { Footer } from "../component/footer";
import { Subscribe } from "../component/subscribe";
import { Card } from "../component/card";
import teamImg from '../assets/team.jpg';
import artise from '../assets/artise.jpg';
import nature from '../assets/nature.jpg';
import dance from '../assets/dance.jpg';
import dance2 from '../assets/dance2.jpg';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const About = () => {
    const [wCVG, setWCVG] = useState('');
    const [soldNum, setSoldNum] = useState(0);
    const [clientNum, setClientNum] = useState(0);
    const [countryNum, setCountryNum] = useState(0);

    const aboutMsg = [
        {msg: 'At Viks Gallery, we pride ourselves on offering a carefully curated selection of artworks that span a wide range of styles, mediums, and movements. Our mission is to showcase both emerging and established artists, providing them with a platform to share their stories, challenge conventional narratives, and push the boundaries of contemporary art. We are deeply committed to promoting art that sparks meaningful conversations and resonates with diverse audiences, from first-time visitors to seasoned collectors.'},
        {msg: 'Our gallery was founded on the belief that art is a universal language, one that transcends borders and speaks to the shared experiences of humanity. In this spirit, Viks Gallery is dedicated to fostering inclusivity and accessibility within the art world. We aim to break down the barriers that often separate artists from their audiences, ensuring that art is accessible to everyone, regardless of background, education, or financial means. Whether you are looking to add to your personal collection, discover new talent, or simply experience the beauty of artistic expression, we welcome you to explore our gallery.'},
        {msg: 'One of the defining features of Viks Gallery is our commitment to showcasing a diverse range of artistic perspectives. Our rotating exhibitions feature works from both local and international artists, each bringing their unique cultural experiences, techniques, and visions to the fore. From contemporary abstract paintings and thought-provoking installations to traditional landscapes and figurative sculptures, our collection reflects the ever-evolving nature of the global art scene. Our goal is to offer visitors an immersive and enriching experience, where they can encounter a multitude of artistic voices and discover new ways of seeing the world.'},
        {msg: 'At Viks Gallery, we believe that every artwork tells a story, one that not only reflects the artist’s creative process but also invites viewers to embark on their own interpretive journey. Our exhibitions are designed to create a dialogue between the artist and the audience, encouraging visitors to engage with the art on a personal level. We strive to create a space where people can connect with art in a way that resonates with them emotionally, intellectually, and even spiritually. Whether you’re drawn to the bold, experimental pieces or the subtle, intimate works, you’ll find that every artwork at Viks Gallery has the power to move and inspire.'},
        {msg: 'As we continue to grow and evolve, Viks Gallery remains committed to excellence, creativity, and inclusivity. Our vision is to be a leading art destination where people from all walks of life can experience the joy and wonder of art in its many forms. We are constantly seeking new ways to innovate and expand, whether it’s by introducing cutting-edge technology to our gallery experience or by collaborating with artists and galleries from around the world.'},
        {msg: 'Ultimately, Viks Gallery is more than just a place to view art. it is a space where art lives, breathes, and connects us all. We invite you to join us on this journey, to explore the diverse and inspiring world of art, and to become a part of the Viks Gallery community. Whether you’re a collector, an artist, or simply someone who appreciates the beauty of creative expression, we look forward to welcoming you to our gallery and sharing our passion for art with you.'}
    ]

    const autoMetricCount = (num) => {
        if(num == 1) {
            return `${num}M+`
        }

        if(num == 400) {
            return `${num}K`
        }

        if(num ==100){
            return `${num}K`
        }

        return num
    }

    const metricsBar = [
        {num: autoMetricCount(soldNum), items: 'Arts sold'},
        {num: autoMetricCount(clientNum), items: 'Happy clients'},
        {num: autoMetricCount(countryNum), items: 'Countries reached'},
    ]

    const WCVGText = [
        {reHeading: 'A Unique and Diverse Collection', inContent: 'Viks Gallery, offers an extensive selection of artwork across various styles, mediums and genres. Our diverse gallery ensures that you’ll find something that truly resonates with your personal taste and vision.'},
        {reHeading: 'Expert Guidance from Art Professionals', inContent: 'Our dedicated art advisors bring years of experience and passion to each consultation, providing tailored advice to match your needs. From helping you under stand different art styles to offering insight into the artists background.'},
        {reHeading: 'Commitment to Customer Satisfaction', inContent: 'At Viks Gallery, we go above and beyond to make your art buying process smooth and enjoyable, offering framing shipping and installation services. With a strong focus on customer satisfaction we ensure every customer is happy and satisfied.'}
    ];

    const artiseHandels = [
        {icon: <FaFacebook />, style: 'text-blue-900', link: '#'},
        {icon: <FaLinkedin />, style: 'text-blue-900', link: '#'},
        {icon: <FaXTwitter />, link: '#'},
        {icon: <FaInstagram />, link: '#'}
    ];

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

    useEffect(() => {
        const checkScreenSizeForWhyCVG = () => {
            const desktop = window.innerWidth >= 1024;

            if(desktop) {
                setWCVG(
                    <div className="w-full lg:h-96 flex gap-3 overflow-hidden">
                        <img className="w-2/4 h-full flex-initial" src={dance} alt="dance photo" />
                        <img className="w-2/4 h-full flex-1" src={dance2} alt="dance2 photo" />
                    </div>
                )
            } else {
                setWCVG(null)
            }
        };

        checkScreenSizeForWhyCVG()

        window.addEventListener('resize', checkScreenSizeForWhyCVG)

        const soldCount = setInterval(() => {
            setSoldNum((pre) => {
                if(pre == 1){
                    clearInterval(soldCount)
                    return pre
                }

                return pre + 1
            })
        }, 500);

        const clientCount = setInterval(() => {
            setClientNum((pre) => {
                if(pre == 400){
                    clearInterval(clientCount)
                    return pre
                }

                return pre + 1
            })
        }, 10);

        const countryCount = setInterval(() => {
            setCountryNum((pre) => {
                if(pre == 100){
                    clearInterval(countryCount)
                    return pre
                }

                return pre + 1
            })
        }, 15);

        return () => {
            clearInterval(soldCount)
            clearInterval(clientCount)
            clearInterval(countryCount)
        }

    }, [])

    return (
        <div>
            <section className="md:py-6 md:px-5 lg:p-9 py-3 px-4">
                <div className="w-full flex flex-col md:flex-row gap-7 justify-center">
                    <div className="md:w-3/6 w-full flex flex-col gap-3">
                        <div className="text-center container text-3xl font-semibold capitalize">
                            <h6>About us</h6>
                        </div>
                        <div className="xl:text-sm text-xs font-normal flex flex-col gap-4 w-full">
                            {aboutMsg.map((msg, i) => (
                                <div key={i}>
                                    <p>{msg.msg}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end xl:w-2/5 md:w-3/6 w-full relative overflow-hidden">
                        <div className="relative w-full flex lg:justify-end justify-start">
                            <div className="img-hold"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="md:py-6 md:px-5 py-3 px-4">
                <div className="container flex items-center">
                    <div className="flex justify-between items-center lg:w-4/5 w-full lg:mx-auto md:mx-2 m-0">
                        {metricsBar.map((item, i) => (
                            <div className="text-center lg:text-3xl md:text-xl text-sm capitalize font-bold text-abt-blue flex-col flex gap-1" key={i}>
                                <div>
                                    <h5>{item.num}</h5>
                                </div>
                                <div>
                                    <h6>{item.items}</h6>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Card
                normalDiv={true}
                renderItem={
                    <div className="flex items-start lg:items-center justify-start lg:justify-center md:flex-row flex-col lg:gap-8 gap-5 w-full h-fit">
                        <div className="lg:w-1/2 md:w-2/4 w-full h-fit flex flex-col gap-3">
                            <div className="w-full md:h-96 lg:h-52 h-60">
                                <img className="w-full h-full" src={nature} alt="nature photo" />
                            </div>
                            {wCVG}
                        </div>
                        <div className="lg:w-2/5 md:w-3/5 w-full flex flex-col lg:gap-5 gap-3">
                            <h1 className="font-bold lg:text-3xl text-xl text-abt-blue">Why Choose Viks Gallery?</h1>
                            <div className="flex flex-col lg:gap-3 gap-2 items-start">
                                {WCVGText.map((con, i) => (
                                    <div className="flex flex-col lg:gap-3 gap-2" key={i}>
                                        <h3 className="font-semibold lg:text-xl text-lg">{con.reHeading}</h3>
                                        <p className="lg:text-base text-sm font-normal">{con.inContent}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }

                
                style="flex items-center justify-start md:justify-center flex-wrap w-full lg:gap-3 gap-5"
                subStyle="w-full flex-initial h-fit overflow-hidden"
            />
            <hr />
            <Card 
                title='Meet our artist'
                normalDiv={true}
                renderItem={
                    <div className="flex items-start lg:items-center justify-start lg:justify-center md:flex-row flex-col lg:gap-8 gap-5 w-full h-fit">
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
                                    {artiseHandels.map((icon, i) => (
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