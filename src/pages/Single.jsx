import React, { useEffect, useState } from "react";
import { NavBar } from "../component/NavBar";
import { Subscribe } from "../component/Subscription";
import { Footer } from "../component/footer";
import { Testimonial } from "../component/Reviews";
import { CardComp } from "../component/card";
import artise from "../assets/artise.jpg";
import nature from "../assets/nature.jpg";
import dance from "../assets/dance.jpg";
import dance2 from "../assets/dance2.jpg";
import { Model } from "../component/modal/Modal";
import { BiDollar, BiHeart } from "react-icons/bi";

export const Single = () => {
  const [singleArtImage, setSingleArtImage] = useState(artise);

  const [subImg, setSubImg] = useState([]);

  const changeLargeImg = (id) => {
    setSingleArtImage(id);
  };

  useEffect(() => {
    setSubImg({ img: artise, img2: nature, img3: dance, img4: dance2 });
  }, []);
  return (
    <>
      <NavBar />
      <div className="flex md:flex-row flex-col gap-3 md:justify-between w-full md:p-9 p-3">
        <div className="md:w-1/2 w-full flex md:flex-row flex-col-reverse gap-2">
          <div className="md:w-[20%] w-full flex md:flex-col flex-row gap-2">
            <div
              className={
                singleArtImage == subImg?.img
                  ? "w-full h-16 rounded-[4px] overflow-hidden cursor-pointer border-blue-800 border-solid border-2 shadow-md shadow-slate-300"
                  : "w-full h-16 rounded-[4px] overflow-hidden cursor-pointer"
              }
              onClick={() => changeLargeImg(subImg?.img)}
            >
              <img className="h-full w-full" src={subImg?.img} alt="" />
            </div>
            <div
              className={
                singleArtImage == subImg?.img2
                  ? "w-full h-16 rounded-[4px] overflow-hidden cursor-pointer border-blue-800 border-solid border-2 shadow-md shadow-slate-300"
                  : "w-full h-16 rounded-[4px] overflow-hidden cursor-pointer"
              }
              onClick={() => changeLargeImg(subImg?.img2)}
            >
              <img className="h-full w-full" src={subImg?.img2} alt="" />
            </div>
            <div
              className={
                singleArtImage == subImg?.img3
                  ? "w-full h-16 rounded-[4px] overflow-hidden cursor-pointer border-blue-800 border-solid border-2 shadow-md shadow-slate-300"
                  : "w-full h-16 rounded-[4px] overflow-hidden cursor-pointer"
              }
              onClick={() => changeLargeImg(subImg?.img3)}
            >
              <img className="h-full w-full" src={subImg?.img3} alt="" />
            </div>
            <div
              className={
                singleArtImage == subImg?.img4
                  ? "w-full h-16 rounded-[4px] overflow-hidden cursor-pointer border-blue-800 border-solid border-2 shadow-md shadow-slate-300"
                  : "w-full h-16 rounded-[4px] overflow-hidden cursor-pointer"
              }
              onClick={() => changeLargeImg(subImg?.img4)}
            >
              <img className="h-full w-full" src={subImg?.img4} alt="" />
            </div>
          </div>
          <div className="w-full h-[17.5em] rounded-[6px] overflow-hidden">
            <img className="h-[inherit] w-full" src={singleArtImage} />
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-start items-center py-5 px-3 bg-tes-col shadow-md shadow-slate-400 rounded-[6px] md:w-2/5 w-full">
          <div className="flex flex-col gap-3 items-start w-full">
            <div className="flex flex-col gap-1 items-start w-full">
              <div className="flex justify-between w-full items-center text-lg capitalize font-[500]">
                <h4>Krystal yarn painting</h4>
                <BiHeart className="cursor-pointer" />
              </div>
              <div className="text-sm capitalize text-red-600">
                <span>Victor</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start w-full font-[400] text-sm">
              <span className="capitalize">Yarn painting</span>
              <span>
                Size: <span>61W &times; 51H &times; 6.1D cm</span>
              </span>
              <span>Ship in a box</span>
            </div>
          </div>
          <div className="text-[#0A078E] text-start md:text-2xl text-xl flex items-start font-[600] w-full p-0">
            <span className="flex items-center gap-[-2px] p-0">
              <BiDollar />
              1700
            </span>
          </div>
          <div className="flex flex-col gap-3 items-start w-full">
            <button
              type="button"
              className="h-12 flex items-center rounded-[8px] text-base font-[500] bg-blue-900 text-white w-full justify-center"
            >
              Add to cart
            </button>
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
                  <span className="font-[400] capitalize"></span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Material:</span>
                  <span className="font-[400] capitalize"></span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Styles:</span>
                  <span className="font-[400] capitalize"></span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Medium:</span>
                  <span className="font-[400] capitalize"></span>
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
                  <span className="font-[400] capitalize"></span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Size:</span>
                  <span className="font-[400] capitalize"></span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Frame:</span>
                  <span className="font-[400] capitalize"></span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Ready to hang:</span>
                  <span className="font-[400] capitalize"></span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Packaging:</span>
                  <span className="font-[400] capitalize"></span>
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
              <span className="font-[400] capitalize"></span>
            </div>
            <div className="flex items-center font-[500] gap-1 text-xs">
              <span className="uppercase">Delivery cost:</span>
              <span className="font-[400] capitalize"></span>
            </div>
            <div className="flex items-center font-[500] gap-1 text-xs">
              <span className="uppercase">Returns:</span>
              <span className="font-[400] capitalize"></span>
            </div>
            <div className="flex items-center font-[500] gap-1 text-xs">
              <span className="uppercase">Handling:</span>
              <span className="font-[400] capitalize"></span>
            </div>
            <div className="flex items-center font-[500] gap-1 text-xs">
              <span className="uppercase">Ship from:</span>
              <span className="font-[400] capitalize"></span>
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
              className="h-12 text-white rounded-[6px] flex items-center bg-blue-800 md:w-1/4 w-full justify-center test-base font-[500]"
            >
              Chat with an art advisory
            </button>
            <a
              href="/contact"
              className="h-12 text-decoration-none text-white rounded-[6px] flex items-center bg-blue-800 md:w-1/4 w-full justify-center test-base font-[500]"
            >
              Contact customer support
            </a>
          </div>
        </div>
      </div>
      <hr />
      <Subscribe />
      <hr />
      <Footer />

      <Model modal={true} modalDisplay={false} icon="success" />
    </>
  );
};
