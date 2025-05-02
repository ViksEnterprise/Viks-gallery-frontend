import React from "react";
import { NavBar } from "../component/NavBar";
import { Subscribe } from "../component/Subscription";
import { Footer } from "../component/footer";
import { Testimonial } from "../component/Reviews";
import { CardComp } from "../component/card";

export const Single = () => {
  return (
    <>
      <NavBar />
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
                  <span className="font-[400] capitalize">htj</span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Material:</span>
                  <span className="font-[400] capitalize">htj</span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Styles:</span>
                  <span className="font-[400] capitalize">htj</span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Medium:</span>
                  <span className="font-[400] capitalize">htj</span>
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
                  <span className="font-[400] capitalize">htj</span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Size:</span>
                  <span className="font-[400] capitalize">htj</span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Frame:</span>
                  <span className="font-[400] capitalize">htj</span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Ready to hang:</span>
                  <span className="font-[400] capitalize">htj</span>
                </div>
                <div className="flex items-center font-[500] gap-1 text-xs">
                  <span className="uppercase">Packaging:</span>
                  <span className="font-[400] capitalize">htj</span>
                </div>
              </div>
            </div>
          </div>
        }
        secStyle="w-full flex items-center justify-center py-4"
        subSecStyle="w-full md:p-9 p-3 flex flex-col gap-4 w-[95%] bg-tes-col shadow-md shadow-slate-400 rounded-[6px]"
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
              <span className="font-[400] capitalize">htj</span>
            </div>
            <div className="flex items-center font-[500] gap-1 text-xs">
              <span className="uppercase">Delivery cost:</span>
              <span className="font-[400] capitalize">htj</span>
            </div>
            <div className="flex items-center font-[500] gap-1 text-xs">
              <span className="uppercase">Returns:</span>
              <span className="font-[400] capitalize">htj</span>
            </div>
            <div className="flex items-center font-[500] gap-1 text-xs">
              <span className="uppercase">Handling:</span>
              <span className="font-[400] capitalize">htj</span>
            </div>
            <div className="flex items-center font-[500] gap-1 text-xs">
              <span className="uppercase">Ship from:</span>
              <span className="font-[400] capitalize">htj</span>
            </div>
          </div>
        }
        secStyle="w-full flex items-center justify-center py-4"
        subSecStyle="w-full md:p-9 p-3 flex flex-col gap-4 w-[95%] bg-tes-col shadow-md shadow-slate-400 rounded-[6px]"
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
    </>
  );
};
