import React, { useEffect, useState } from "react";
import { Footer } from "../component/footer";
import { CartNav } from "../component/CartNav";
import { CardComp } from "../component/card";
import Flower from "../assets/flower.jpg";
import { BiArrowBack, BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsCartPlusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const increaseNoOfArtNeeded = (id) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity >= 25) {
      if (count[id] == 10) {
        return;
      } else {
        setCount((prev) => ({
          ...prev,
          [id]: prev[id] + 1,
        }));
      }
    } else {
      if (count[id] == 5) {
        return;
      } else {
        setCount((prev) => ({
          ...prev,
          [id]: prev[id] + 1,
        }));
      }
    }
  };

  const decreaseNoOfArtNeeded = (id) => {
    if (count[id] == 1) {
      return;
    } else {
      setCount((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    }
  };

  const back = () => {
    navigate("/art-gallery");
  };

  useEffect(() => {
    const initialCount = {};
    cart.forEach((item) => {
      initialCount[item?.id] = 1;
    });
    setCount(initialCount);
  }, [cart]);
  return (
    <>
      <CartNav />
      <hr />
      <div className="w-full md:px-11 py-6 p-5 flex items-center">
        <div
          className={
            cart.length != 0
              ? "flex flex-col gap-4 items-start w-full"
              : "flex flex-col gap-[2px] items-start w-full"
          }
        >
          {cart.length != 0 && (
            <div
              className={
                cart.length != 0
                  ? "flex items-center justify-between w-full"
                  : "block"
              }
            >
              <h5 className="text-[#09067C] font-[500] text-2xl">Cart</h5>
              <button
                className="flex items-center gap-1 text-sm font-[500]"
                type="button"
                onClick={back}
              >
                <BiArrowBack /> Back to gallery
              </button>
            </div>
          )}
          {cart.length == 0 ? (
            <div className="w-full flex items-center flex-col gap-2 justify-center">
              <BsCartPlusFill className="fill-[blue!important] stroke-white h-10 w-12 m-0 p-0" />
              <span className="text-base">Your cart is empty</span>
              <a
                className="h-11 flex items-center justify-center text-base text-white bg-[#09067C] rounded-[8px] py-2 px-4 w-64"
                href="/art-gallery"
              >
                Browse our art collections
              </a>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex items-start gap-4 md:flex-row flex-col-reverse">
                <div className="lg:w-2/3 md:w-1/2 w-full">
                  <CardComp
                    normalDiv={false}
                    swipe={false}
                    items={cart}
                    renderItem={(item) => (
                      <div className="flex flex-col gap-2 items-start w-full">
                        <div className="flex gap-2 md:flex-row flex-col w-full">
                          <div className="md:w-52 w-full rounded-[3px] md:h-32 h-48 overflow-hidden">
                            <img
                              src={item.img}
                              className="w-full h-[inherit]"
                            />
                          </div>
                          <div className="flex flex-col gap-3 w-full">
                            <div className="flex flex-col items-start gap-1">
                              <span className="font-[500] text-lg">
                                {item.name}
                              </span>
                              <span className="capitalize text-sm text-[#6B6B6B] font-[500]">
                                {item.type}
                              </span>
                            </div>
                            {item.price && (
                              <div className="w-full flex items-center justify-between gap-2 text-base font-[500] capitalize">
                                <span>Artwork price</span>
                                <span className="flex items-center gap-[1px]">
                                  <TbCurrencyNaira />
                                  {item.price}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 w-full">
                          <div className="text-red-500 text-sm font-[500] flex items-center gap-[1px] uppercase">
                            <BiTrash />
                            <span className="text-xs">Remove</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              className={
                                count[item.id] == 1
                                  ? "border-none h-6 w-6 flex items-center justify-center bg-blue-200 text-[#fff] rounded-[3px] text-sm"
                                  : "border-none h-6 w-6 flex items-center justify-center bg-blue-800 text-[#fff] rounded-[3px] text-sm"
                              }
                              type="button"
                              onClick={() => decreaseNoOfArtNeeded(item.id)}
                              disabled={count[item.id] == 1}
                            >
                              <BiMinus />
                            </button>
                            <div>{count[item.id]}</div>
                            <button
                              className={
                                count[item.id] == 10 || count[item.id] == 5
                                  ? "border-none h-6 w-6 flex items-center justify-center bg-blue-200 text-[#fff] rounded-[3px] text-sm"
                                  : "border-none h-6 w-6 flex items-center justify-center bg-blue-800 text-[#fff] rounded-[3px] text-sm"
                              }
                              type="button"
                              onClick={() => increaseNoOfArtNeeded(item.id)}
                              disabled={
                                count[item.id] == 10 || count[item.id] == 5
                              }
                            >
                              <BiPlus />
                            </button>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-[500] capitalize">
                            Apply promo / gift card code
                          </span>
                        </div>
                      </div>
                    )}
                    secStyle="p-0"
                    subSecStyle="w-full"
                    style="flex items-start w-full flex-col gap-2 items-start"
                    subStyle="shadow-md shadow-slate-400 h-fit flex items-center w-full p-3 rounded-[5px] border-slate-300 border-solid border-[1px]"
                  />
                </div>
                <div className="lg:w-[40%] md:w-1/2 w-full">
                  <CardComp
                    title="Cart summary"
                    normalDiv={true}
                    titleStyle="text-base font-[500] uppercase text-blue-800"
                    renderItem={
                      <div className="flex flex-col gap-1 items-start w-full">
                        <hr className="w-full" />
                        <div className="flex flex-col gap-2 w-full">
                          <div className="w-full flex items-center justify-between text-sm font-[500]">
                            <span>No. of items</span>
                            <span>{totalItems}</span>
                          </div>
                          <div className="flex flex-col gap-[1px] items-start">
                            <div className="flex items-center justify-between w-full font-[500] text-sm">
                              <span className="text-base">SubTotal</span>
                              <span className="flex items-center gap-[2px]">
                                <TbCurrencyNaira /> {totalPrice}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm text-[#6B6B6B] font-[500]">
                                Shipping included
                              </span>
                            </div>
                          </div>
                          <hr className="w-full" />
                          <div>
                            <button
                              className="w-full h-12 rounded-[6px] flex items-center justify-center text-base font-[500] bg-blue-800 text-white"
                              type="button"
                            >
                              Checkout
                            </button>
                          </div>
                        </div>
                      </div>
                    }
                    secStyle="p-0"
                    subSecStyle="w-full shadow-md shadow-slate-400 h-fit flex items-start w-full p-3 rounded-[5px] border-slate-300 border-solid border-[1px] flex-col gap-2"
                    style="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr />
      <Footer />
    </>
  );
};
