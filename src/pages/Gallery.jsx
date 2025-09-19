import { useCallback, useEffect, useState } from "react";
import { CardComp } from "../component/CardModal";
import { Subscribe } from "../component/Subscription";
import { Footer } from "../component/FooterNav";
import { NavBar } from "../component/NavBar";
import {
  FaChevronDown,
  FaChevronUp,
  FaSearch,
} from "react-icons/fa";
import { BsHeart, BsTriangleFill } from "react-icons/bs";
import { BiCart, BiSearch, BiTable, BiPound } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios, { axiosPrivate } from "../service/axios";
import { FiFilter } from "react-icons/fi";

export const Gallery = () => {
  const navigate = useNavigate();
  const [noOfItemsInCart, setNoOfItemsInCart] = useState(0);
  const [noOfItemsInFavourite, setNoOfItemsInFavourite] = useState(0);
  const [hoverFav, setHoverFav] = useState(false);
  const [listOfArtwork, setListOfArtwork] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("all");
  const [openFilter, setOpenFilter] = useState(false);

  const sort = ["all", "paintings", "sculpture", "beads"];

  console.log(listOfArtwork);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    debounceSearch(value);
  };

  const routeToCart = () => {
    navigate("/myCart");
  };

  const getArtwork = async (value, type) => {
    const params = new URLSearchParams();

    if (value) params.append("search", value);
    if (type && type !== "all") params.append("artType", type);

    // Build the final URL
    const url = params.toString()
      ? `artwork/?${params.toString()}`
      : "artwork/";

    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response) {
        setListOfArtwork(response.data?.data);
      }
    } catch (err) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const getTotalNoOfFav = async () => {
    const url = "favorite/total-fav";

    try {
      const res = await axiosPrivate.get(url);
      if (res) {
        setNoOfItemsInFavourite(res.data?.total_items_added);
      }
    } catch (err) {
      return;
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
      return;
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
    debounce((value) => getArtwork(value, filterValue), 200),
    []
  );

  const filter = () => {
    setOpenFilter(!openFilter);
  };

  const filterArtwork = (id) => {
    setFilterValue(id);

    if (filterValue) {
      setOpenFilter(false);
    }

    getArtwork(search, id);
  };

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

    return () => {
      if (favIcon) {
        favIcon.removeEventListener("mouseover", handleMouseOver);
        favIcon.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, []);

  useEffect(() => {
    getArtwork(search, filterValue);

    getTotalNoOfFav();

    getTotalNoOfItemsInCart();
  }, []);

  return (
    <>
      <NavBar />
      <hr />
      <div className="h-fit w-full py-3 md:px-10 px-4">
        <div className="grid sm:grid-cols-2 grid-col md:justify-between gap-3 w-full items-center">
          <div className="h-11 flex items-center border-gray-400 border-solid border-[1px] rounded-[7px] gap-2 px-2 overflow-hidden w-full">
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
          <div className="flex items-center gap-[6px] w-full">
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
            <div className="w-full relative">
              <div
                className="h-11 flex items-center border-gray-400 border-solid border-[1px] rounded-[7px] gap-2 px-2 overflow-hidden w-full"
                onClick={filter}
              >
                <div className="flex items-center gap-1">
                  <FiFilter className="text-[14px] text-gray-400 font-normal cursor-pointer" />
                </div>
                <div className="flex items-center w-full justify-between text-gray-400 cursor-pointer">
                  <div className="h-full flex items-center text-center justify-center text-black text-sm capitalize">
                    {filterValue}
                  </div>
                  {openFilter ? (
                    <FaChevronUp className="text-[14px] text-gray-400 font-normal" />
                  ) : (
                    <FaChevronDown className="text-[14px] text-gray-400 font-normal" />
                  )}
                </div>
              </div>
              {openFilter ? (
                <div className="absolute top-12 shadow-md shadow-gray-100 w-[90%] rounded-lg bg-white border-gray-400 border-solid border-[1px] h-[fit] z-[999] flex flex-col items-start justify-start end-0 overflow-hidden">
                  {sort.map((item, i) => (
                    <span
                      className={
                        filterValue == item
                          ? "p-2 px-3 w-full bg-slate-200 cursor-pointer capitalize"
                          : "p-2 px-3 w-full cursor-pointer capitalize"
                      }
                      key={i}
                      onClick={() => filterArtwork(item)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <hr />
      {loading ? (
        <div className="w-full flex items-center justify-center h-72 relative p-3">
          <span className="h-16 w-16 rounded-full bg-white before:bg-transparent before:border-t-blue-700 before:border-solid before:border-[4px] before:content-[''] before:h-16 before:w-16 before:rounded-full before:flex before:animate-spin inset-5"></span>
        </div>
      ) : listOfArtwork && listOfArtwork.length > 0 ? (
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
                <span className="flex items-center gap-[2px]">
                  <BiPound />
                  {sale.price}
                </span>
              </div>
              <div className="flex gap-2 items-center m-0 p-0">
                <span>{sale.artworkDescription?.medium}</span>
              </div>
            </div>
          )}
          style="grid lg:grid-cols-3 sm:grid-cols-2 grid-col items-center justify-start w-full lg:gap-3 gap-5"
          subStyle="w-full flex-0 h-fit overflow-hidden"
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
