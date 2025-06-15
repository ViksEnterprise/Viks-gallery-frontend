import React, { useEffect, useState } from "react";
import { Footer } from "../component/footer";
import { CartNav } from "../component/CartNav";
import { CardComp } from "../component/card";
import { BiArrowBack, BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsCartPlusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../service/axios";

export const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const getCartItems = async () => {
    const url = `cart/`;
    setLoading(true);
    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setCart(response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getCartSummary = async () => {
    const url = "cart/cart-summary";

    try {
      const res = await axiosPrivate.get(url);
      if (res) {
        setTotalItems(res.data?.total_product);
        setTotalPrice(res.data?.total_price);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const increaseNoOfArtNeeded = (id) => {
    const item = cart.find((i) => i.userCartId === id);
    if (!item) return;
    if (item.product?.quantity >= 25) {
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

    updateCartSummary(count[id] + 1, item.product.artworkId);
  };

  const decreaseNoOfArtNeeded = (id) => {
    const item = cart.find((i) => i.userCartId === id);
    if (!item) return;
    if (count[id] == 1) {
      return;
    } else {
      setCount((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    }
    updateCartSummary(count[id] - 1, item.product.artworkId);
  };

  const updateCartSummary = async (val, artworkId) => {
    const url = `cart/${artworkId}/update-quantity`;
    setLoader(true);
    try {
      const response = await axiosPrivate.put(url, {
        quantity_of_product: val,
      });
      if (response) {
        getCartSummary();
        setCount((prev) => ({
          ...prev,
          [artworkId]: response.data.data.quantity_of_product,
        }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const removeCartItem = async (id) => {
    const url = `cart/${id}/delete`;
    try {
      const response = await axiosPrivate.delete(url);
      if (response) {
        getCartItems();
        getCartSummary();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const back = () => {
    navigate("/art-gallery");
  };

  useEffect(() => {
    getCartItems();
    getCartSummary();
  }, []);

  useEffect(() => {
    const initialCount = {};
    cart.forEach((item) => {
      initialCount[item?.userCartId] = item?.quantity_of_product;
    });
    setCount(initialCount);
  }, [cart]);
  return (
    <>
      <CartNav />
      <hr />
      {loading ? (
        <div className="w-full flex items-center justify-center h-72 relative p-3">
          <span className="h-16 w-16 rounded-full bg-white before:bg-transparent before:border-t-blue-700 before:border-solid before:border-[4px] before:content-[''] before:h-16 before:w-16 before:rounded-full before:flex before:animate-spin inset-5"></span>
        </div>
      ) : (
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
                        <div className="flex flex-col lg:gap-2 gap-3 items-start w-full">
                          <div className="flex gap-2 md:flex-row flex-col w-full">
                            <div className="md:w-52 w-full rounded-[3px] md:h-32 h-48 overflow-hidden">
                              <img
                                src={item.product?.full_artwork_image}
                                className="w-full h-[inherit]"
                              />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <div className="flex flex-col items-start gap-1">
                                <span className="font-[500] text-lg">
                                  {item.product.artwork_title}
                                </span>
                                <span className="capitalize text-xs text-[#6B6B6B] font-[500]">
                                  {item.product.artworkDimension?.painting_type}
                                </span>
                              </div>
                              {item.product.price && (
                                <div className="w-full flex items-center justify-between gap-2 text-base font-[500] capitalize">
                                  <span className="text-blue-700 font-[700!important]">Artwork price</span>
                                  <span className="flex items-center gap-[1px]">
                                    <TbCurrencyNaira />
                                    {item.product.price}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2 w-full">
                            <div
                              className="text-red-500 text-sm font-[500] flex items-center gap-[1px] uppercase cursor-pointer"
                              onClick={() =>
                                removeCartItem(item.product.artworkId)
                              }
                            >
                              <BiTrash />
                              <span className="text-xs">Remove</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                className={
                                  count[item.userCartId] == 1
                                    ? "border-none h-6 w-6 flex items-center justify-center bg-blue-200 text-[#fff] rounded-[3px] text-sm"
                                    : "border-none h-6 w-6 flex items-center justify-center bg-blue-800 text-[#fff] rounded-[3px] text-sm"
                                }
                                type="button"
                                onClick={() =>
                                  decreaseNoOfArtNeeded(item.userCartId)
                                }
                                disabled={count[item.userCartId] == 1 || loader}
                              >
                                <BiMinus />
                              </button>
                              <div>{count[item.userCartId]}</div>
                              {item.product.quantity >= 25 ? (
                                <button
                                  className={
                                    count[item.userCartId] == 10
                                      ? "border-none h-6 w-6 flex items-center justify-center bg-blue-200 text-[#fff] rounded-[3px] text-sm"
                                      : "border-none h-6 w-6 flex items-center justify-center bg-blue-800 text-[#fff] rounded-[3px] text-sm"
                                  }
                                  type="button"
                                  onClick={() =>
                                    increaseNoOfArtNeeded(item.userCartId)
                                  }
                                  disabled={
                                    count[item.userCartId] == 10 || loader
                                  }
                                >
                                  <BiPlus />
                                </button>
                              ) : (
                                <button
                                  className={
                                    count[item.userCartId] == 5
                                      ? "border-none h-6 w-6 flex items-center justify-center bg-blue-200 text-[#fff] rounded-[3px] text-sm"
                                      : "border-none h-6 w-6 flex items-center justify-center bg-blue-800 text-[#fff] rounded-[3px] text-sm"
                                  }
                                  type="button"
                                  onClick={() =>
                                    increaseNoOfArtNeeded(item.userCartId)
                                  }
                                  disabled={
                                    count[item.userCartId] == 5 || loader
                                  }
                                >
                                  <BiPlus />
                                </button>
                              )}
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
      )}
      <hr />
      <Footer />
    </>
  );
};
