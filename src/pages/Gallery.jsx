import { useCallback, useEffect, useState } from "react";
import { CardComp } from "../component/CardModal";
import { Subscribe } from "../component/Subscription";
import { Footer } from "../component/FooterNav";
import { NavBar } from "../component/NavBar";
import {
  FaArrowDown,
  FaArrowUp,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";
import { BsHeart, BsTriangleFill } from "react-icons/bs";
import { BiCart, BiSearch, BiTable } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios, { axiosPrivate } from "../service/axios";

export const Gallery = () => {
  const navigate = useNavigate();
  const [noOfItemsInCart, setNoOfItemsInCart] = useState(0);
  const [noOfItemsInFavourite, setNoOfItemsInFavourite] = useState(0);
  const [hoverFav, setHoverFav] = useState(false);
  const [listOfArtwork, setListOfArtwork] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    debounceSearch(value);
  };

  const routeToCart = () => {
    navigate("/myCart");
  };

  const getArtwork = async (value) => {
    const url = `artwork/${value ? `?search=${value}` : ""}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response) {
        setListOfArtwork(response.data?.data);
      }
    } catch (err) {
      return
    } finally {
      setLoading(false);
    }
  };

  const getTotalNoOfFav = async () => {
    const url = "favourite/total-fav";

    try {
      const res = await axiosPrivate.get(url);
      if (res) {
        setNoOfItemsInFavourite(res.data?.total_items_added);
      }
    } catch (err) {
      return
    }
  };

  const getTotalNoOfItemsInCart = async () => {
    const url = "cart/cart-summary";

    try {
      const res = await axiosPrivate.get(url);
      if (res) {
        setNoOfItemsInCart(res.data?.total_product);
      }
    } catch (err) {
      return
    }
  };

  const details = (id) => {
    navigate(`/${id}/art-gallery`);
  };

  function debounce(func, timer) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, timer);
    };
  }

  const debounceSearch = useCallback(
    debounce((value) => getArtwork(value), 200),
    []
  );

  useEffect(() => {
    const favIcon = document.getElementById("fav");

    const handleMouseOver = () => {
      setHoverFav(true);
    };

    const handleMouseOut = () => {
      setHoverFav(false);
    };

    if (favIcon) {
      favIcon.addEventListener("mouseover", handleMouseOver);
      favIcon.addEventListener("mouseout", handleMouseOut);
    }

    getArtwork();

    getTotalNoOfFav();

    return () => {
      if (favIcon) {
        favIcon.removeEventListener("mouseover", handleMouseOver);
        favIcon.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, []);

  useEffect(() => {
    getArtwork();

    getTotalNoOfFav();

    getTotalNoOfItemsInCart();
  }, []);

  return (
    <>
      <NavBar />
      <hr />
      <div className="h-fit w-full py-3 md:px-10 px-4">
        <div className="flex md:justify-between gap-3 md:flex-row flex-col w-full items-center">
          <div className="h-11 flex items-center border-gray-400 border-solid border-[1px] rounded-[7px] gap-2 px-2 overflow-hidden xl:w-1/4 lg:w-[40%] md:w-[45%] w-full">
            <FaSearch className="text-[14px] text-gray-400 font-normal" />
            <input
              className="h-full border-none outline-[transparent]"
              type="text"
              placeholder="search for items"
              name="search"
              value={search}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-[6px] xl:w-1/4 lg:w-[40%] md:w-[45%] w-full">
            <div
              className={
                hoverFav
                  ? "relative w-fit-content h-fit flex flex-col gap-1 items-center justify-center w-fit cursor-pointer"
                  : "relative w-fit-content h-fit flex flex-col gap-1 items-center justify-center w-10 cursor-pointer"
              }
              id="fav"
            >
              <BsHeart className="w-10 h-5 text-gray-400" />
              <div
                className={
                  hoverFav
                    ? "bg-blue-600 text-white w-[3.4em!important] p-1 flex items-center justify-center text-xs font-semibold h-5 rounded-[5px] flex-col relative"
                    : "hidden"
                }
              >
                <BsTriangleFill className="absolute top-[-0.6em] text-[8px] text-blue-600" />
                {noOfItemsInFavourite}
              </div>
            </div>
            <div
              className="relative w-10 items-center justify-center flex h-fit cursor-pointer"
              onClick={routeToCart}
            >
              <BiCart className="w-16 h-8 text-gray-400" />
              <div
                className={
                  noOfItemsInCart == 0
                    ? "hidden"
                    : "absolute top-0 end-[0.2em] bg-blue-600 text-white w-fit p-1 flex items-center justify-center text-xs font-semibold h-4 rounded-full"
                }
              >
                {noOfItemsInCart}
              </div>
            </div>
            <div className="h-11 flex items-center border-gray-400 border-solid border-[1px] rounded-[7px] gap-2 px-2 overflow-hidden w-full">
              <div className="flex items-center gap-1">
                <FaArrowUp className="text-[14px] text-gray-400 font-normal" />
                <FaArrowDown className="text-[14px] text-gray-400 font-normal" />
              </div>
              <div className="flex items-center w-full justify-between text-gray-400">
                <div className="h-full flex items-center text-center justify-center">
                  Sort
                </div>
                <FaChevronDown className="text-[14px] text-gray-400 font-normal" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {loading ? (
        <div className="w-full flex items-center justify-center h-72 relative p-3">
          <span className="h-16 w-16 rounded-full bg-white before:bg-transparent before:border-t-blue-700 before:border-solid before:border-[4px] before:content-[''] before:h-16 before:w-16 before:rounded-full before:flex before:animate-spin inset-5"></span>
        </div>
      ) : !search && listOfArtwork.length > 0 ? (
        <CardComp
          normalDiv={false}
          swipe={false}
          items={listOfArtwork}
          renderItem={(sale) => (
            <div
              className="flex items-start justify-start flex-col gap-[4px] w-full h-fit cursor-pointer"
              onClick={() => details(sale?.artworkId)}
            >
              <div className="w-full h-80">
                <img className="w-full h-full" src={sale.full_artwork_image} />
              </div>
              <div className="text-base font-[500] text-black uppercase w-full flex justify-between">
                <h6>{sale.artwork_title}</h6>
                <span>${sale.price}</span>
              </div>
              <div className="flex gap-2 items-center m-0 p-0">
                <span>{sale.artworkDescription?.medium}</span>
              </div>
            </div>
          )}
          style="flex items-center justify-start flex-wrap w-full lg:gap-3 gap-5"
          subStyle="w-full md:w-[48.5%] lg:w-[32.3%] flex-0 h-fit overflow-hidden"
        />
      ) : (
        <div className="text-lg font-[500] capitalize p-10 flex flex-col justify-center w-full items-center">
          <div className="relative w-fit">
            <BiTable className="text-[5em] text-gray-300" />
            <BiSearch className="text-[2em] absolute end-0 bottom-[1px]" />
          </div>
          <span>Artwork not found</span>{" "}
        </div>
      )}
      <hr />
      <Subscribe />
      <hr />
      <Footer />
    </>
  );
};
