import "swiper/css";
import Ada from '../assets/tes-images/female-img-1.jpg'
import Bisi from '../assets/tes-images/female-img-2.jpg'
import Chuka from "../assets/tes-images/male-img-1.jpg";
import Zainab from "../assets/tes-images/female-img-3.jpg";
import Daniel from "../assets/tes-images/male-img-2.jpg";
import AIfunanya from "../assets/tes-images/female-img-4.jpg";
import Chinelo from "../assets/tes-images/male-image-3.jpg";
import Ayo from "../assets/tes-images/male-image-4.jpg";
import { CardComp } from "./CardModal";

export const Testimonial = () => {
    const slide = true

    const tes = [
      {
        img: Ada,
        name: "Ada O., Lagos",
        tes: "The moment I unboxed my artwork, I was in awe. The colors, the texture, everything was even more beautiful than I imagined. It has completely transformed my living space. Thank you for making art so accessible!",
      },
      {
        img: Bisi,
        name: "Bisi A., Port Harcourt",
        tes: "Absolutely in love with my new painting! The gallery team was super helpful, answered all my questions, and made sure I got updates until delivery. The art came in perfect condition and was even more breathtaking in person.",
      },
      {
        img: Chuka,
        name: "Chuka N",
        tes: "Buying art online can feel risky, but this gallery made it feel easy and safe. From the customer support to the delivery, everything was top-notch. I’m already eyeing my next piece!",
      },
      {
        img: Zainab,
        name: "Zainab K",
        tes: "ncredible service and even more incredible art! I found the perfect piece for my home, and the online photos were true to life. The quality is exceptional, and I get compliments all the time. Can’t wait to order again!",
      },
      {
        img: Daniel,
        name: "Daniel O",
        tes: "I have ordered twice now, and both experiences were excellent. The team kept me updated every step of the way, and the artwork was delivered faster than I expected. I love the thoughtfulness behind the packaging and the handwritten note. So personal!",
      },
      {
        img: AIfunanya,
        name: "AIfunanya A",
        tes: "I was a bit nervous about buying art online, but the entire process was seamless. The piece arrived beautifully packaged and in perfect condition. It looks even more stunning in person! I’m so happy with my purchase.",
      },
      {
        img: Chinelo,
        name: "Chinelo M., Lekki",
        tes: "The artwork arrived safely and it was love at first sight. It now hangs in my office and brings me so much joy and peace every day. Thank you for making beautiful art so easy to own.",
      },
      {
        img: Ayo,
        name: "Ayo L., Ilorin",
        tes: "I have never seen such attention to detail in both the artwork and the service. It’s clear that every step is done with passion and care. I’m already planning my next purchase",
      },
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