import React, { useEffect, useState } from "react";
import { NavBar } from "../component/NavBar";
import { Subscribe } from "../component/Subscription";
import { Footer } from "../component/footer";
import { Testimonial } from "../component/Reviews";
import { CardComp } from "../component/card";
import { Model } from "../component/modal/Modal";
import { BiDollar, BiHeart, BiMinus, BiPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";
import axios, { axiosPrivate } from "../service/axios";
import { Error404 } from "../views/NotFound";
import { BsFillHeartFill } from "react-icons/bs";

export const Single = () => {
  const { artworkId } = useParams();
  const [singleArtwork, setSingleArtwork] = useState([]);
  const [singleArtImage, setSingleArtImage] = useState();
  const [favId, setFavId] = useState("");
  const [modalMsg, setModalMsg] = useState({
    message: "",
    icon: "",
  });
  const [toggleModal, setToggleModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [load, setLoad] = useState(false);

  const getArtworkDetails = async () => {
    const url = `artwork/${artworkId}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response) {
        setSingleArtwork(response.data);
        setQuantity(response.data?.quantity);
      } else {
        window.location.href = "/artwork";
      }
    } catch (err) {
      console.log(err);
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
    const url = `favourite/add-to-fav/`;
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
      console.log(err);
    }
  };

  const removeFromFav = async (id) => {
    const url = `favourite/${id}/delete`;
    try {
      const response = await axiosPrivate.delete(url);
      if (response) {
        setFavId("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getFavId = async () => {
    const url = `favourite/${artworkId}/favId`;
    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setFavId(response.data);
      }
    } catch (err) {
      console.log(err);
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
      console.log(err);
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
      removeCartItem()
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
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  };

  const addToCart = async (id) => {
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
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const removeCartItem = async () => {
    const url = `cart/${artworkId}/delete`;
    try {
      const response = await axiosPrivate.delete(url);
      if (response) {
        setCount(0)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfItemIsInCart();
    getArtworkDetails();
    getFavId();
  }, []);
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
            <div className="md:w-1/2 w-full flex md:flex-row flex-col-reverse gap-2">
              <div className="md:w-[20%] w-full flex md:flex-col flex-row gap-3">
                <div
                  className={
                    !singleArtImage
                      ? "w-full h-20 rounded-[4px] overflow-hidden cursor-pointer border-blue-800 border-solid border-2 shadow-md shadow-slate-300"
                      : "w-full h-20 rounded-[4px] overflow-hidden cursor-pointer"
                  }
                  onClick={() =>
                    changeLargeImg(singleArtwork.full_artwork_image)
                  }
                >
                  <img
                    className="h-[inherit] w-full"
                    src={singleArtwork.full_artwork_image}
                  />
                </div>
                <div
                  className={
                    singleArtImage == singleArtwork.image_close_up_view ||
                    !singleArtwork.full_artwork_image
                      ? "w-full h-20 rounded-[4px] overflow-hidden cursor-pointer border-blue-800 border-solid border-2 shadow-md shadow-slate-300"
                      : "w-full h-20 rounded-[4px] overflow-hidden cursor-pointer"
                  }
                  onClick={() =>
                    changeLargeImg(singleArtwork.image_close_up_view)
                  }
                >
                  <img
                    className="h-[inherit] w-full"
                    src={singleArtwork.image_close_up_view}
                    alt=""
                  />
                </div>
                <div
                  className={
                    singleArtImage == singleArtwork.image_angle_view ||
                    !singleArtwork.full_artwork_image
                      ? "w-full h-20 rounded-[4px] overflow-hidden cursor-pointer border-blue-800 border-solid border-2 shadow-md shadow-slate-300"
                      : "w-full h-20 rounded-[4px] overflow-hidden cursor-pointer"
                  }
                  onClick={() => changeLargeImg(singleArtwork.image_angle_view)}
                >
                  <img
                    className="h-[inherit] w-full"
                    src={singleArtwork.image_angle_view}
                    alt=""
                  />
                </div>
                <div
                  className={
                    singleArtImage == singleArtwork.image_room_view ||
                    !singleArtwork.full_artwork_image
                      ? "w-full h-20 rounded-[4px] overflow-hidden cursor-pointer border-blue-800 border-solid border-2 shadow-md shadow-slate-300"
                      : "w-full h-20 rounded-[4px] overflow-hidden cursor-pointer"
                  }
                  onClick={() => changeLargeImg(singleArtwork.image_room_view)}
                >
                  <img
                    className="h-[inherit] w-full"
                    src={singleArtwork.image_room_view}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full h-[22em] rounded-[6px] overflow-hidden">
                <img
                  className="h-[inherit] w-full"
                  src={singleArtImage || singleArtwork?.full_artwork_image}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5 justify-start items-center py-5 px-3 bg-tes-col shadow-md shadow-slate-400 rounded-[6px] md:w-2/5 w-full">
              <div className="flex flex-col gap-3 items-start w-full">
                <div className="flex flex-col gap-1 items-start w-full">
                  <div className="flex justify-between w-full items-center text-lg capitalize font-[500]">
                    <h4>{singleArtwork.artwork_title}</h4>
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
                    <span>{singleArtwork.artist_name}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start w-full font-[400] text-sm">
                  <span className="capitalize">
                    {singleArtwork.artworkDescription?.medium}
                  </span>
                  <span>
                    Size:{" "}
                    <span>
                      {singleArtwork.artworkDimension?.width}
                      {""}
                      {singleArtwork.artworkDimension?.width &&
                        `W`} &times; {singleArtwork.artworkDimension?.height}
                      {""}
                      {singleArtwork.artworkDimension?.height &&
                        `H`} &times; {singleArtwork.artworkDimension?.depth}
                      {""}
                      {singleArtwork.artworkDimension?.depth && "D"} cm
                    </span>
                  </span>
                  <span>{singleArtwork.artworkDimension?.packaging}</span>
                </div>
              </div>
              <div className="text-[#0A078E] text-start md:text-2xl text-xl flex items-start font-[600] w-full p-0">
                <span className="flex items-center gap-[-2px] p-0">
                  <BiDollar />
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
                    onClick={() => addToCart(singleArtwork.artworkId)}
                  >
                    {loader ? (
                      <span className="border-white border-t-transparent border-b-solid border-[3px] rounded-full h-7 w-7 animate-spin flex"></span>
                    ) : (
                      <span>Add to cart</span>
                    )}
                  </button>
                )}
                <button
                  type="button"
                  className="h-12 flex items-center rounded-[8px] text-base font-[500] border-[1px] border-blue-800 border-solid w-full justify-center"
                >
                  Make an offer
                </button>
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
              <div className="flex md:flex-row flex-col md:justify-between gap-3">
                <div className="md:w-[45%] w-full border-gray-400 border-solid border-[1px] px-2 py-3 flex flex-col gap-3 rounded-[4px]">
                  <div className="uppercase text-base font-[500] text-start w-full">
                    <h5>About the artwork</h5>
                  </div>
                  <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
                  <div className="w-full flex flex-col gap-5 items-start">
                    <div className="flex items-center font-[500] gap-1 text-xs">
                      <span className="uppercase">Original created:</span>
                      <span className="font-[400] capitalize">
                        {singleArtwork.artworkDescription?.created_on}
                      </span>
                    </div>
                    <div className="flex items-center font-[500] gap-1 text-xs">
                      <span className="uppercase">Material:</span>
                      <span className="font-[400] capitalize">
                        {singleArtwork.artworkDescription?.material_used}
                      </span>
                    </div>
                    <div className="flex items-center font-[500] gap-1 text-xs">
                      <span className="uppercase">Styles:</span>
                      <span className="font-[400] capitalize">
                        {singleArtwork.artworkDescription?.styles}
                      </span>
                    </div>
                    <div className="flex items-center font-[500] gap-1 text-xs">
                      <span className="uppercase">Medium:</span>
                      <span className="font-[400] capitalize">
                        {singleArtwork.artworkDescription?.medium}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:w-[45%] w-full border-gray-400 border-solid border-[1px] px-2 py-3 flex flex-col gap-3 rounded-[4px]">
                  <div className="uppercase text-base font-[500] text-start w-full">
                    <h5>Details and dimension</h5>
                  </div>
                  <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
                  <div className="w-full flex flex-col gap-5 items-start">
                    <div className="flex items-center font-[500] gap-1 text-xs">
                      <span className="uppercase">Painting:</span>
                      <span className="font-[400] capitalize">
                        {singleArtwork.artworkDimension?.painting_type}
                      </span>
                    </div>
                    <div className="flex items-center font-[500] gap-1 text-xs">
                      <span className="uppercase">Size:</span>
                      <span className="font-[400] capitalize">
                        {singleArtwork.artworkDimension?.width}
                        {""}
                        {singleArtwork.artworkDimension?.width &&
                          `W`} &times; {singleArtwork.artworkDimension?.height}
                        {""}
                        {singleArtwork.artworkDimension?.height &&
                          `H`} &times; {singleArtwork.artworkDimension?.depth}
                        {""}
                        {singleArtwork.artworkDimension?.depth && "Dcm"}
                      </span>
                    </div>
                    <div className="flex items-center font-[500] gap-1 text-xs">
                      <span className="uppercase">Frame:</span>
                      <span className="font-[400] capitalize">
                        {singleArtwork.artworkDimension?.frame}
                      </span>
                    </div>
                    <div className="flex items-center font-[500] gap-1 text-xs">
                      <span className="uppercase">Ready to hang:</span>
                      <span className="font-[400] capitalize">
                        {singleArtwork.artworkDimension?.ready_to_hang}
                      </span>
                    </div>
                    <div className="flex items-center font-[500] gap-1 text-xs">
                      <span className="uppercase">Packaging:</span>
                      <span className="font-[400] capitalize">
                        {singleArtwork.artworkDimension?.packaging}
                      </span>
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
                    {singleArtwork.artworkReturn?.delivery_day}
                  </span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Delivery cost:</span>
                  <span className="font-[400] capitalize">
                    {singleArtwork.artworkReturn?.delivery_cost}
                  </span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Returns:</span>
                  <span className="font-[400] capitalize">
                    {singleArtwork.artworkReturn?.returns}
                  </span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Handling:</span>
                  <span className="font-[400] capitalize">
                    {singleArtwork.artworkReturn?.handling}
                  </span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Ship from:</span>
                  <span className="font-[400] capitalize">
                    {singleArtwork.artworkReturn?.ship_from}
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
                <button
                  type="button"
                  className="h-12 text-white rounded-[6px] flex items-center bg-blue-800 lg:w-1/4 md:w-[38%] w-full justify-center test-base font-[500]"
                >
                  Chat with an art advisory
                </button>
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
