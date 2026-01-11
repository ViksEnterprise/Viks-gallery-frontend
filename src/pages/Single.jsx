import React, { useEffect, useRef, useState } from "react";
import { NavBar } from "../component/NavBar";
import { Subscribe } from "../component/Subscription";
import { Footer } from "../component/FooterNav";
import { Testimonial } from "../component/Reviews";
import { CardComp } from "../component/CardModal";
import { Model } from "../component/Model/Modal";
import { BiPound, BiHeart, BiMinus, BiPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";
import axios, { axiosPrivate } from "../service/axios";
import { Error404 } from "../views/NotFound";
import { BsArrowDown, BsArrowUp, BsFillHeartFill } from "react-icons/bs";
import HideContent from "../component/Hidden";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CgClose } from "react-icons/cg";

export const Single = () => {
  const { artworkId } = useParams();
  const [singleArtwork, setSingleArtwork] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [singleArtImage, setSingleArtImage] = useState();
  const [favId, setFavId] = useState("");
  const [modalMsg, setModalMsg] = useState({
    message: "",
    icon: "",
  });
  const staff = sessionStorage.getItem("staff") === "false";
  const swiperRef = useRef(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [load, setLoad] = useState(false);
  const [showGalleryImage, setShowGalleryImage] = useState();

  const getArtworkDetails = async () => {
    const url = `artwork/${artworkId}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response) {
        setSingleArtwork(response.data.data);
        setSingleArtImage(response.data.data?.main_image);
        setGallery(response.data.data.gallery);
        setQuantity(response.data?.data.quantity);
      } else {
        window.location.href = "/artwork";
      }
    } catch (err) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const changeLargeImg = (id) => {
    setSingleArtImage(id);
  };

  const button = () => {
    setToggleModal(false);
    document.body.style.overflow = "auto";
  };

  const addToFav = async (id) => {
    const url = `favorite/add-to-fav/`;
    try {
      const res = await axiosPrivate.post(url, {
        productId: id,
      });
      if (res) {
        getFavId();
      }
    } catch (err) {
      if (err) {
        if (err.status == 401) {
          setModalMsg({
            message: "Login Required",
            icon: "error",
          });
          setToggleModal(true);
        }
      }
      return;
    }
  };

  const removeFromFav = async (id) => {
    const url = `favorite/${id}/delete`;
    try {
      const response = await axiosPrivate.delete(url);
      if (response) {
        setFavId("");
      }
    } catch (err) {
      return;
    }
  };

  const getFavId = async () => {
    const url = `favorite/${artworkId}/favId`;
    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setFavId(response.data);
      }
    } catch (err) {
      return;
    }
  };

  const checkIfItemIsInCart = async () => {
    const url = `cart/${artworkId}/getQuantity`;
    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setCount(response.data?.quantity_of_product);
      }
    } catch (err) {
      return;
    }
  };

  const increaseNoOfArtNeeded = () => {
    if (quantity >= 25) {
      if (count !== 10) {
        setCount((prev) => prev + 1);
      } else {
        return;
      }
    }

    if (quantity < 25) {
      if (count !== 5) {
        setCount((prev) => prev + 1);
      } else {
        return;
      }
    }
    updateCart(count + 1);
  };

  const decreaseNoOfArtNeeded = () => {
    if (count == 1) {
      removeCartItem();
      return;
    } else {
      setCount((prev) => prev - 1);
    }
    updateCart(count - 1);
  };

  const updateCart = async (val) => {
    const url = `cart/${artworkId}/update-quantity`;
    setLoad(true);
    try {
      const response = await axiosPrivate.put(url, {
        quantity_of_product: val,
      });
      if (response) {
        setCount(response.data?.data?.quantity_of_product);
        checkIfItemIsInCart();
      }
    } catch (err) {
      return;
    } finally {
      setLoad(false);
    }
  };

  const addToCart = async (id) => {
    if (staff) {
      const url = `cart/add-to-cart`;
      setLoader(true);
      try {
        const response = await axiosPrivate.post(url, {
          cart_product: id,
          quantity_of_product: count + 1,
        });
        if (response) {
          setModalMsg({
            message: "Product added to your cart",
            icon: "success",
          });
          setToggleModal(true);
          checkIfItemIsInCart();
        }
      } catch (err) {
        if (err) {
          if (err.status == 401) {
            setModalMsg({
              message: "Login Required",
              icon: "error",
            });
            setToggleModal(true);
          }
        }
        return;
      } finally {
        setLoader(false);
      }
    } else {
      setModalMsg({
        message: "Sorry this action can't be perform by staffs",
        icon: "error",
      });
      setToggleModal(true);
    }
  };

  const removeCartItem = async () => {
    const url = `cart/${artworkId}/delete`;
    try {
      const response = await axiosPrivate.delete(url);
      if (response) {
        setCount(0);
      }
    } catch (err) {
      return;
    }
  };

  const openImageGalleryView = (id) => {
    setShowGalleryImage(id);
  };

  const closeImageGalleryView = () => {
    setShowGalleryImage();
  };

  useEffect(() => {
    checkIfItemIsInCart();
    getArtworkDetails();
    getFavId();
  }, []);

  useEffect(() => {
    if (singleArtwork?.main_image) {
      setGallery((prev) => [
        {
          id: prev.id + 1,
          image: singleArtwork.main_image,
          product: "SCP-001",
        },
        ...prev,
      ]);
    }
  }, [singleArtwork]);

  useEffect(() => {
    const responsiveNavBar = () => {
      window.innerWidth >= 1024 ? setMobile(false) : setMobile(true);
    };

    responsiveNavBar();
    window.addEventListener("resize", responsiveNavBar);
  }, [mobile]);

  return (
    <>
      {loading ? (
        <div className="w-full flex items-center justify-center h-svh flex-col relative p-3">
          <span className="h-16 w-16 rounded-full bg-white before:bg-transparent before:border-t-blue-700 before:border-solid before:border-[4px] before:content-[''] before:h-16 before:w-16 before:rounded-full before:flex before:animate-spin inset-5"></span>
        </div>
      ) : singleArtwork.length !== 0 ? (
        <>
          <NavBar />
          <div className="flex md:flex-row flex-col gap-3 md:justify-between w-full md:p-9 p-3">
            {!mobile ? (
              <div className="md:w-[58%] w-full flex md:flex-row flex-col-reverse gap-2">
                <div className="md:w-[20%] w-full flex md:flex-col flex-row gap-3 h-fit relative">
                  <button className="swiper-button-prev-custom absolute -top-5 left-1/2 -translate-x-1/2 z-10 bg-slate-200 shadow-md rounded-full p-2">
                    <BsArrowUp />
                  </button>
                  <Swiper
                    direction="vertical"
                    spaceBetween={10}
                    slidesPerView={4}
                    slidesPerGroup={1}
                    autoHeight={false}
                    loop={false}
                    modules={[Navigation]}
                    navigation={{
                      prevEl: ".swiper-button-prev-custom",
                      nextEl: ".swiper-button-next-custom",
                    }}
                    onSlideChange={(swiper) => {
                      document
                        .querySelector(".swiper-button-prev-custom")
                        ?.classList.toggle("opacity-40", swiper.isBeginning);

                      document
                        .querySelector(".swiper-button-next-custom")
                        ?.classList.toggle("opacity-40", swiper.isEnd);
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    className="md:overflow-hidden h-[20em]"
                  >
                    {gallery.map((gal, i) => (
                      <SwiperSlide
                        className={
                          singleArtImage === gal.image
                            ? "w-full h-20 rounded-[4px] overflow-hidden cursor-pointer border-blue-800 border-solid border-2 shadow-md shadow-slate-300"
                            : "w-full h-20 rounded-[4px] overflow-hidden cursor-pointer"
                        }
                        key={i}
                        onClick={() => changeLargeImg(gal.image)}
                      >
                        <img className="h-[inherit] w-full" src={gal.image} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button className="swiper-button-next-custom absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 bg-slate-200 shadow-md rounded-full p-2">
                    <BsArrowDown />
                  </button>
                </div>
                <div className="w-full object-fit bg-gray-200 flex items-center justify-center md:h-[30em] h-52 rounded-[6px] overflow-hidden">
                  <img className="h-auto w-auto" src={singleArtImage} />
                </div>
              </div>
            ) : (
              <div className="w-full flex md:flex-row flex-col-reverse gap-2">
                <div className="w-full flex flex-col gap-2 overflow-hidden h-fit">
                  <div className="w-full flex md:flex-col flex-row gap-3 overflow-hidden h-fit">
                    <Swiper
                      direction="horizontal"
                      spaceBetween={10}
                      slidesPerView={1}
                      allowTouchMove={false}
                      loop={false}
                      pagination={{
                        el: ".swiper-pagination-custom",
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      onSwiper={(swiper) => (swiperRef.current = swiper)}
                      className="md:overflow-hidden h-full"
                    >
                      {gallery.map((gal, i) => (
                        <SwiperSlide
                          className="w-full h-fit rounded-lg overflow-hidden cursor-pointer relative before:bg-black/10 before:absolute before:end-0 before:w-full before:h-full"
                          key={i}
                          onClick={() => openImageGalleryView(gal.image)}
                        >
                          <img className="h-60 w-full" src={gal.image} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <button className="swiper-pagination-custom"></button>
                </div>
                {showGalleryImage && (
                  <div className="fixed w-full object-fit bg-black/95 py-5 text-white flex flex-col gap-5 items-center justify-start h-full top-0 start-0 z-20 p-3 rounded-[6px] overflow-hidden">
                    <div className="flex w-full items-end justify-end">
                      <CgClose size={25} onClick={closeImageGalleryView} />
                    </div>
                    <img className="h-auto w-auto" src={showGalleryImage} />
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-col gap-5 justify-start items-center py-5 px-3 bg-tes-col shadow-md shadow-slate-400 rounded-[6px] md:w-2/5 w-full h-fit">
              <div className="flex flex-col gap-3 items-start w-full">
                <div className="flex flex-col gap-1 items-start w-full">
                  <div className="flex justify-between w-full items-center text-lg capitalize font-[500]">
                    <h4>{singleArtwork.title}</h4>
                    {!favId ? (
                      <BiHeart
                        className="cursor-pointer"
                        onClick={() => addToFav(singleArtwork.artworkId)}
                      />
                    ) : (
                      <BsFillHeartFill
                        className="text-[red] cursor-pointer"
                        onClick={() => removeFromFav(favId.favId)}
                      />
                    )}
                  </div>
                  <div className="text-sm capitalize text-red-600">
                    <span>
                      {singleArtwork.artwork_details?.artist_name ||
                        singleArtwork.sculpture_details?.artist_name ||
                        singleArtwork.beads_details?.designer_name}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start w-full font-[400] text-sm">
                  {singleArtwork.artwork_details?.medium && (
                    <span className="capitalize">
                      {singleArtwork.artwork_details?.medium}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    Size:
                    <span>
                      {singleArtwork.beads_details?.length_cm
                        ? `${singleArtwork.beads_details.length_cm}cm`
                        : singleArtwork.artwork_details?.size
                        ? singleArtwork.artwork_details.size
                        : singleArtwork.sculpture_details
                        ? `${singleArtwork.sculpture_details.height_cm}cm × ${singleArtwork.sculpture_details.width_cm}cm × ${singleArtwork.sculpture_details.weight_kg}kg`
                        : ""}
                    </span>
                  </span>
                  <span className="capitalize">
                    {singleArtwork.artwork_details?.packaging
                      ? singleArtwork.artwork_details?.packaging
                      : singleArtwork.sculpture_details?.indoor_outdoor
                      ? `${singleArtwork.sculpture_details?.indoor_outdoor} art`
                      : ""}
                  </span>
                </div>
              </div>
              <div className="text-[#0A078E] text-start md:text-2xl text-xl flex items-start font-[600] w-full p-0">
                <span className="flex items-center gap-[-2px] p-0">
                  <BiPound />
                  {singleArtwork.price}
                </span>
              </div>
              <div className="flex flex-col gap-3 items-start w-full">
                {count !== 0 ? (
                  <div className="flex items-center justify-between gap-1 w-full">
                    <button
                      className={
                        count == 1
                          ? "border-none h-8 w-8 flex items-center justify-center bg-blue-200 text-[#fff] rounded-[3px] text-sm"
                          : "border-none h-8 w-8 flex items-center justify-center bg-blue-600 text-[#fff] rounded-[3px] text-sm"
                      }
                      type="button"
                      onClick={() => decreaseNoOfArtNeeded()}
                      disabled={load}
                    >
                      <BiMinus />
                    </button>
                    <div className="text-xl font-semibold">{count}</div>
                    {quantity >= 25 ? (
                      <button
                        className={
                          count == 10
                            ? "border-none h-8 w-8 flex items-center justify-center bg-blue-200 text-[#fff] rounded-[3px] text-sm"
                            : "border-none h-8 w-8 flex items-center justify-center bg-blue-800 text-[#fff] rounded-[3px] text-sm"
                        }
                        type="button"
                        onClick={() => increaseNoOfArtNeeded()}
                        disabled={count == 10 || load}
                      >
                        <BiPlus />
                      </button>
                    ) : (
                      <button
                        className={
                          count == 5
                            ? "border-none h-8 w-8 flex items-center justify-center bg-blue-200 text-[#fff] rounded-[3px] text-sm"
                            : "border-none h-8 w-8 flex items-center justify-center bg-blue-800 text-[#fff] rounded-[3px] text-sm"
                        }
                        type="button"
                        onClick={() => increaseNoOfArtNeeded()}
                        disabled={count == 5 || load}
                      >
                        <BiPlus />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    className="h-12 flex items-center rounded-[8px] text-base font-[500] bg-blue-900 text-white w-full justify-center"
                    onClick={() => addToCart(singleArtwork.id)}
                  >
                    {loader ? (
                      <span className="border-white border-t-transparent border-b-solid border-[3px] rounded-full h-7 w-7 animate-spin flex"></span>
                    ) : (
                      <span>Add to cart</span>
                    )}
                  </button>
                )}
                <HideContent>
                  <button
                    type="button"
                    className="h-12 flex items-center rounded-[8px] text-base font-[500] border-[1px] border-blue-800 border-solid w-full justify-center"
                  >
                    Make an offer
                  </button>
                </HideContent>
              </div>
              <div className="flex flex-col gap-3 w-full items-start text-sm">
                <span>Shipping included</span>
                <span>7-days satisfaction guarantee</span>
              </div>
            </div>
          </div>
          <hr />
          <CardComp
            title="Product description"
            titleStyle="uppercase text-lg font-[500] text-start w-full"
            normalDiv={true}
            renderItem={
              <div className="grid gap-4">
                <div className="w-full border-gray-400 border-solid border-[1px] px-2 py-3 flex flex-col gap-3 rounded-[4px]">
                  <div className="uppercase text-base font-[500] text-start w-full">
                    <h5>Description</h5>
                  </div>
                  <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
                  <div className="w-full flex flex-col gap-5 items-start">
                    <div className="flex items-center font-[400] gap-1 text-[0.95em]">
                      {singleArtwork.description}
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col md:justify-between gap-3">
                  <div className="md:w-[45%] w-full border-gray-400 border-solid border-[1px] px-2 py-3 flex flex-col gap-3 rounded-[4px]">
                    <div className="uppercase text-base font-[500] text-start w-full">
                      <h5>About the artwork</h5>
                    </div>
                    <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
                    <div className="w-full flex flex-col gap-5 items-start">
                      {singleArtwork.product_type == "sculpture" && (
                        <div className="flex items-center font-[500] gap-1 text-xs">
                          <span className="uppercase">Decoration Style:</span>
                          <span className="font-[400] capitalize">
                            {singleArtwork.sculpture_details?.indoor_outdoor}
                          </span>
                        </div>
                      )}
                      {singleArtwork.product_type == "beads" && (
                        <div className="flex items-center font-[500] gap-1 text-xs">
                          <span className="uppercase">Color:</span>
                          <span className="font-[400] capitalize">
                            {singleArtwork.beads_details?.color}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center font-[500] gap-1 text-xs">
                        <span className="uppercase">Material:</span>
                        <span className="font-[400] capitalize">
                          {singleArtwork.artwork_details?.material_used ||
                            singleArtwork.sculpture_details?.material ||
                            singleArtwork.beads_details?.material}
                        </span>
                      </div>
                      <div className="flex items-center font-[500] gap-1 text-xs">
                        <span className="uppercase">Styles:</span>
                        <span className="font-[400] capitalize">
                          {singleArtwork.artwork_details?.styles
                            ? singleArtwork.artwork_details.styles
                            : singleArtwork.sculpture_details?.handmade !==
                              undefined
                            ? singleArtwork.sculpture_details.handmade
                              ? "Handmade"
                              : "Not handmade"
                            : ""}
                        </span>
                      </div>
                      {singleArtwork.artwork_details?.medium && (
                        <div className="flex items-center font-[500] gap-1 text-xs">
                          <span className="uppercase">Medium:</span>
                          <span className="font-[400] capitalize">
                            {singleArtwork.artwork_details?.medium}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:w-[45%] w-full border-gray-400 border-solid border-[1px] px-2 py-3 flex flex-col gap-3 rounded-[4px]">
                    <div className="uppercase text-base font-[500] text-start w-full">
                      <h5>Details and dimension</h5>
                    </div>
                    <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
                    <div className="w-full flex flex-col gap-5 items-start">
                      {singleArtwork.artwork_details?.painting_type && (
                        <div className="flex items-center font-[500] gap-1 text-xs">
                          <span className="uppercase">Painting:</span>
                          <span className="font-[400] capitalize">
                            {singleArtwork.artwork_details?.painting_type}
                          </span>
                        </div>
                      )}
                      {singleArtwork.sculpture_details?.height_cm && (
                        <div className="flex items-center font-[500] gap-1 text-xs">
                          <span className="uppercase">Height:</span>
                          <span className="font-[400] capitalize">
                            {`${singleArtwork.sculpture_details?.height_cm}cm`}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center font-[500] gap-1 text-xs">
                        <span className="uppercase">
                          {singleArtwork.artwork_details?.size
                            ? "Size:"
                            : singleArtwork.sculpture_details?.width_cm
                            ? "Width:"
                            : singleArtwork.beads_details?.length_cm
                            ? "Length:"
                            : ""}
                        </span>
                        <span className="font-[400] capitalize">
                          {singleArtwork.artwork_details?.size
                            ? singleArtwork.artwork_details.size
                            : singleArtwork.sculpture_details?.width_cm
                            ? `${singleArtwork.sculpture_details.width_cm}cm`
                            : singleArtwork.beads_details?.length_cm
                            ? `${singleArtwork.beads_details.length_cm}cm`
                            : ""}
                        </span>
                      </div>
                      {singleArtwork.artwork_details?.ready_to_hang && (
                        <div className="flex items-center font-[500] gap-1 text-xs">
                          <span className="uppercase">Ready to hang:</span>
                          <span className="font-[400] capitalize">
                            {singleArtwork.artwork_details?.ready_to_hang}
                          </span>
                        </div>
                      )}
                      {singleArtwork.sculpture_details?.weight_kg && (
                        <div className="flex items-center font-[500] gap-1 text-xs">
                          <span className="uppercase">Weight:</span>
                          <span className="font-[400] capitalize">
                            {`${singleArtwork.sculpture_details?.weight_kg}kg`}
                          </span>
                        </div>
                      )}
                      {singleArtwork?.artwork_details?.packaging && (
                        <div className="flex items-center font-[500] gap-1 text-xs">
                          <span className="uppercase">Packaging:</span>
                          <span className="font-[400] capitalize">
                            {singleArtwork?.artwork_details?.packaging}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            }
            secStyle="w-full flex items-center justify-center py-4 px-2"
            subSecStyle="md:p-9 p-3 flex flex-col gap-4 w-[95%] bg-tes-col shadow-md shadow-slate-400 rounded-[6px]"
            style="w-full"
            subStyle="w-full"
          />
          <hr />
          <CardComp
            title="Shipping and returns"
            titleStyle="uppercase text-lg font-[500] text-start w-full"
            normalDiv={true}
            renderItem={
              <div className="w-full flex flex-col gap-5 items-start">
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Delivery time:</span>
                  <span className="font-[400] capitalize">
                    {singleArtwork.shipping?.delivery_day} days
                  </span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Delivery cost:</span>
                  <span className="font-[400] capitalize flex items-center">
                    <BiPound />
                    {singleArtwork.shipping?.delivery_cost}
                  </span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Returns:</span>
                  <span className="font-[400] capitalize">
                    {singleArtwork.shipping?.returns} days
                  </span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Ship from:</span>
                  <span className="font-[400] capitalize">
                    {singleArtwork.shipping?.ship_from}
                  </span>
                </div>
              </div>
            }
            secStyle="w-full flex items-center justify-center py-4 px-2"
            subSecStyle="md:p-9 p-3 flex flex-col gap-4 w-[95%] bg-tes-col shadow-md shadow-slate-400 rounded-[6px]"
            style="w-full"
            subStyle="w-full"
          />
          <hr />
          <Testimonial />
          <hr />
          <div className="flex w-full md:p-9 p-3 items-center">
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="text-lg uppercase w-full text-center font-[500]">
                <h4>Need more help?</h4>
              </div>
              <div className="w-full flex md:flex-row flex-col md:gap-5 gap-3 items-center justify-center">
                <HideContent>
                  <button
                    type="button"
                    className="h-12 text-white rounded-[6px] flex items-center bg-blue-800 lg:w-1/4 md:w-[38%] w-full justify-center test-base font-[500]"
                  >
                    Chat with an art advisory
                  </button>
                </HideContent>
                <a
                  href="/contact"
                  className="h-12 text-decoration-none rounded-[6px] flex items-center border-blue-800 border lg:w-1/4 md:w-[38%] w-full justify-center test-base font-[500]"
                >
                  Contact customer support
                </a>
              </div>
            </div>
          </div>
          <hr />
          <Subscribe />
          <hr />
          <Footer />{" "}
        </>
      ) : (
        <Error404 />
      )}

      {toggleModal && (
        <Model
          modal={true}
          modalDisplay={toggleModal}
          icon={modalMsg.icon}
          message={modalMsg.message}
          button={button}
        />
      )}
    </>
  );
};
