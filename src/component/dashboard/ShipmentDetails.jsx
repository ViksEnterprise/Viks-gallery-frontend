import { useEffect, useState } from "react";
import axios from "../../service/axios";
import {  BiPound, } from "react-icons/bi";
import { CgArrowLeft } from "react-icons/cg";
import { ShipmentUpdateForm } from "./ShipmentUpdate";

export const ShipmentDetail = ({ id, open = "", close = () => close() }) => {
  const [singleShipment, setSingleShipment] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  const getShipmentDetails = async () => {
    const url = `payments/${id}/shipment-detatil`;
    try {
      const response = await axios.get(url);
      if (response) {
        setSingleShipment(response.data.data);
      }
    } catch (err) {
      return;
    }
  };

  const performAction = (id) => {
    if (id == "processing") {
      setOpenCreate(true);
    }
  };

  const closeForm = () => {
    setOpenCreate(false);
  };

  useEffect(() => {
    getShipmentDetails();
  }, []);

  if (!open) {
    return;
  }

  return (
    <>
      {!openCreate ? (
        <div className="flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="p-3 py-1 h-6 flex bg-white rounded-lg items-center justify-center cursor-pointer">
                <CgArrowLeft size={18} onClick={close} />
              </div>
              <div className="w-fit grid gap-2 items-start">
                <h3 className="text-xl font-medium uppercase">
                  Shipment Details
                </h3>
                <span className="text-gray-500 text-xs">
                  Shipment ID: {singleShipment?.shipment_id}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="h-9 w-fit bg-blue-700 text-white text-base flex items-center gap-2 justify-center p-3 rounded-lg"
                onClick={() => performAction(singleShipment?.status)}
              >
                {singleShipment?.status == "processing"
                  ? "Ready to ship"
                  : singleShipment?.status == "in-transit"
                  ? "Mark as delivered"
                  : "Mark as refund"}
              </button>
              {singleShipment?.status == "delivered" && (
                <button className="h-9 w-fit border border-red-700 text-red-700 text-base flex items-center gap-2 justify-center p-3 rounded-lg">
                  Delete
                </button>
              )}
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-3 md:justify-between w-full py-2 items-start">
            <div className="md:w-1/2 w-full flex flex-col gap-2">
              <div className="w-full bg-white px-3 py-3 flex flex-col gap-3 rounded-lg shadow-md border-gray-300 border-solid border-[1px]">
                <div className="uppercase text-base font-[500] text-start w-full">
                  <h5>Order details</h5>
                </div>
                <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
                <div className="w-full flex flex-col gap-5 items-start">
                  <div className="flex items-start flex-col font-[500] gap-2 text-xs">
                    <span className="uppercase">Product</span>
                    <div className="flex gap-2 flex-wrap">
                      <img
                        className="h-16 w-24 border rounded-lg"
                        src={singleShipment.order?.item_name.main_image}
                        alt="product images"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full font-[500] gap-2 text-xs">
                    <span className="uppercase">Product Quantity:</span>
                    <span className="font-[600] text-sm text-blue-700">
                      {singleShipment.order?.item_quantity}
                    </span>
                  </div>
                  <div className="flex items-center font-[500] justify-between w-full gap-2 text-xs">
                    <span className="uppercase">Payment Type:</span>
                    <span className="font-[400] text-sm capitalize">
                      {singleShipment.order?.payment_type}
                    </span>
                  </div>
                  <div className="flex items-center font-[500] justify-between w-full  gap-2 text-xs">
                    <span className="uppercase">Status:</span>
                    <span
                      className={
                        singleShipment.order?.status == "failed"
                          ? "bg-red-500 capitalize capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                          : singleShipment.order?.status == "paid" ||
                            singleShipment.order?.status == "delivered"
                          ? "bg-green-500 capitalize capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                          : singleShipment.order?.status == "pending"
                          ? "bg-yellow-500 capitalize capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                          : "bg-orange-500 capitalize capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                      }
                    >
                      {singleShipment.order?.status}
                    </span>
                  </div>
                  <div className="flex items-center font-[500] justify-between w-full  gap-2 text-xs">
                    <span className="uppercase">Total amount:</span>
                    <span className="font-[600] text-base capitalize flex items-center">
                      <BiPound />
                      {singleShipment.order?.total_amount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full border-gray-400 border-solid border-[1px] px-2 py-3 flex flex-col gap-3 rounded-lg bg-white shadow-md">
                <div className="uppercase text-base font-[500] text-start w-full">
                  <h5>Shipment company details</h5>
                </div>
                <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
                <div className="w-full flex flex-col gap-5 items-start">
                  <div className="flex items-center justify-between w-full font-[500] gap-2 text-xs">
                    <span className="uppercase">Courier:</span>
                    <span className="font-[400] capitalize">
                      {singleShipment?.courier || "null"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between w-full font-[500] gap-2 text-xs">
                    <span className="uppercase">Tracking ID:</span>
                    <span className="font-[400]">
                      {singleShipment?.tracking_id || "null"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between w-full font-[500] gap-2 text-xs">
                    <span className="uppercase">Created By:</span>
                    <span className="font-[400] capitalize">
                      {singleShipment?.shipment_created_by || "null"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between w-full font-[500] gap-2 text-xs">
                    <span className="uppercase">Status:</span>
                    <span
                      className={
                        singleShipment?.status == "processing"
                          ? "bg-yellow-500 capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                          : singleShipment?.status == "in-transit"
                          ? "bg-orange-500 capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                          : singleShipment?.status == "delivered"
                          ? "bg-green-500 capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                          : singleShipment?.status == "refunded"
                          ? "bg-slate-500 capitalize py-1 px-2 w-fit font-normal text-xs text-white rounded-xl"
                          : ""
                      }
                    >
                      {singleShipment?.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <div className="w-full bg-white px-2 py-3 flex flex-col gap-3 rounded-lg shadow-md border-gray-300 border-solid border-[1px]">
                <div className="uppercase text-base font-[500] text-start w-full">
                  <h5>User details</h5>
                </div>
                <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
                <div className="w-full flex flex-col gap-5 items-start">
                  <div className="flex items-start flex-col font-[500] gap-2 text-xs">
                    <span className="uppercase">Customer Name:</span>
                    <span className="font-[400] capitalize">
                      {singleShipment.user?.full_name}
                    </span>
                  </div>
                  <div className="flex items-start flex-col font-[500] gap-2 text-xs">
                    <span className="uppercase">Customer Email:</span>
                    <span className="font-[400]">
                      {singleShipment.user?.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-white px-2 py-3 flex flex-col gap-3 rounded-lg shadow-md border-gray-300 border-solid border-[1px]">
                <div className="uppercase text-base font-[500] text-start w-full">
                  <h5>Delivery details</h5>
                </div>
                <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
                <div className="w-full flex flex-col gap-5 items-start">
                  <div className="flex items-start flex-col font-[500] gap-2 text-xs">
                    <span className="uppercase">Reciever Name:</span>
                    <span className="font-[400] capitalize">
                      {`${singleShipment.payment_address?.first_name} ${singleShipment.payment_address?.last_name}`}
                    </span>
                  </div>
                  <div className="flex items-start flex-col font-[500] gap-2 text-xs">
                    <span className="uppercase">Reciever Phone number:</span>
                    <span className="font-[400] capitalize">
                      {singleShipment.payment_address?.phone_number}
                    </span>
                  </div>
                  <div className="flex items-start flex-col font-[500] gap-2 text-xs">
                    <span className="uppercase">Reciever Address</span>
                    <span className="font-[400] capitalize">
                      {singleShipment.payment_address?.address}
                    </span>
                  </div>
                  <div className="flex items-start flex-col font-[500] gap-2 text-xs">
                    <span className="uppercase">Reciever Location:</span>
                    <span className="font-[400] capitalize">
                      {`${singleShipment.payment_address?.city}, ${singleShipment.payment_address?.state} state, ${singleShipment.payment_address?.country}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-gray-400 border-solid border-[1px] px-2 py-3 flex flex-col gap-3 rounded-lg bg-white shadow-md">
            <div className="uppercase text-base font-[500] text-start w-full">
              <h5>Other details</h5>
            </div>
            <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
            <div className="w-full flex flex-col gap-5 items-start">
              <div className="flex items-center font-[500] gap-3 text-xs">
                <span className="uppercase">Estimated delivery date:</span>
                <span className="font-[400] capitalize">
                  {singleShipment?.estimated_delivery_date || "null"}
                </span>
              </div>
              <div className="flex items-center font-[500] gap-3 text-xs">
                <span className="uppercase">Tracking URL:</span>
                <a
                  className="font-[500] capitalize text-blue-700 flex items-center"
                  href={singleShipment?.tracking_url}
                >
                  Click to track order
                </a>
              </div>
            </div>
          </div>
          <div className="w-full border-gray-400 border-solid border-[1px] px-2 py-3 flex flex-col gap-3 rounded-lg bg-white shadow-md">
            <div className="uppercase text-base font-[500] text-start w-full">
              <h5>Customer note</h5>
            </div>
            <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
            <div className="w-full flex flex-col gap-5 items-start">
              <div className="flex items-start flex-col font-[500] gap-2 text-xs">
                <span className="font-[400] capitalize">
                  {singleShipment?.customer_note}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ShipmentUpdateForm open={openCreate} close={closeForm} />
      )}
    </>
  );
};
