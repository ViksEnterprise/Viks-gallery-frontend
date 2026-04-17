import { useEffect, useState } from "react";
import { axiosPrivate } from "../../service/axios";
import { BiPound, } from "react-icons/bi";
import { CgArrowLeft } from "react-icons/cg";

export const UserDetail = ({ id, open = "", close = () => close() }) => {
  const [singleUser, setSingleUser] = useState([]);

  const getUserDetails = async () => {
    const url = `User/${id}/detail`;
    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setSingleUser(response.data.data);
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if(!open){
    return
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 py-1 h-6 flex bg-white rounded-lg items-center justify-center cursor-pointer">
            <CgArrowLeft size={18} onClick={close} />
          </div>
          <div className="w-fit grid gap-2 items-start">
            <h3 className="text-xl font-medium uppercase">User Details</h3>
            <span className="text-gray-500 text-xs">
              User ID: {singleUser?.User_id}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full bg-white px-3 py-3 flex flex-col gap-3 rounded-lg shadow-md bUser-gray-300 bUser-solid bUser-[1px]">
        <div className="uppercase text-base font-[500] text-start w-full">
          <h5>User details</h5>
        </div>
        <hr className="w-full bUser-gray-300 bUser-solid bUser-[0.5px]" />
        <div className="w-full flex flex-col gap-5 items-start">
          <div className="flex items-start flex-col font-[500] gap-2 text-xs">
            <span className="uppercase">Product</span>
            <div className="flex gap-2 flex-wrap">
              <img
                className="h-16 w-24 bUser rounded-lg"
                src={singleUser.item_name?.main_image}
                alt="product images"
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full font-[500] gap-2 text-xs">
            <span className="uppercase">Product Quantity:</span>
            <span className="font-[600] text-sm text-blue-700">
              {singleUser?.item_quantity}
            </span>
          </div>
          <div className="flex items-center font-[500] justify-between w-full gap-2 text-xs">
            <span className="uppercase">Payment Type:</span>
            <span className="font-[400] text-sm capitalize">
              {singleUser?.payment_type}
            </span>
          </div>
          <div className="flex items-center font-[500] justify-between w-full gap-2 text-xs">
            <span className="uppercase">Payment Reference ID:</span>
            <span className="font-[400] text-sm capitalize">
              {singleUser?.stripe_reference_id}
            </span>
          </div>
          <div className="flex items-center font-[500] justify-between w-full  gap-2 text-xs">
            <span className="uppercase">Status:</span>
            <span
              className={
                singleUser?.status == "failed"
                  ? "bg-red-500 capitalize capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                  : singleUser?.status == "paid" ||
                    singleUser?.status == "delivered"
                  ? "bg-green-500 capitalize capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                  : singleUser?.status == "pending"
                  ? "bg-yellow-500 capitalize capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                  : "bg-orange-500 capitalize capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
              }
            >
              {singleUser?.status}
            </span>
          </div>
          <div className="flex items-center font-[500] justify-between w-full  gap-2 text-xs">
            <span className="uppercase">Total amount:</span>
            <span className="font-[600] text-base capitalize flex items-center">
              <BiPound />
              {singleUser?.total_amount}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full bg-white px-2 py-3 flex flex-col gap-3 rounded-lg shadow-md bUser-gray-300 bUser-solid bUser-[1px]">
        <div className="uppercase text-base font-[500] text-start w-full">
          <h5>User details</h5>
        </div>
        <hr className="w-full bUser-gray-300 bUser-solid bUser-[0.5px]" />
        <div className="w-full flex flex-col gap-5 items-start">
          <div className="flex items-start flex-col font-[500] gap-2 text-xs">
            <span className="uppercase">Customer Name:</span>
            <span className="font-[400] capitalize">
              {singleUser.user?.full_name}
            </span>
          </div>
          <div className="flex items-start flex-col font-[500] gap-2 text-xs">
            <span className="uppercase">Customer Email:</span>
            <span className="font-[400]">{singleUser.user?.email}</span>
          </div>
        </div>
      </div>
      <div className="w-full bUser-gray-300 bUser-solid bUser-[1px] px-2 py-3 flex flex-col gap-3 rounded-lg bg-white shadow-md">
        <div className="uppercase text-base font-[500] text-start w-full">
          <h5>Other details</h5>
        </div>
        <hr className="w-full bUser-gray-300 bUser-solid bUser-[0.5px]" />
        <div className="w-full flex flex-col gap-5 items-start">
          <div className="flex items-center font-[500] gap-3 text-xs">
            <span className="uppercase">Created on:</span>
            <span className="font-[400] capitalize">
              {singleUser?.created_on}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
