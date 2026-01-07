import { useEffect, useState } from "react";
import axios from "../../service/axios";
import { BiEdit, BiPound, BiTrash } from "react-icons/bi";
import { CgArrowLeft } from "react-icons/cg";

export const CollectionDetail = ({ id, open = "", close = () => close() }) => {
  const [singleArtwork, setSingleArtwork] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [singleArtImage, setSingleArtImage] = useState();

  const getArtworkDetails = async () => {
    const url = `artwork/${id}`;
    try {
      const response = await axios.get(url);
      if (response) {
        setSingleArtwork(response.data.data);
        setGallery(response.data.data.gallery);
        setQuantity(response.data?.data.quantity);
      }
    } catch (err) {
      return;
    }
  };

  const changeLargeImg = (id) => {
    setSingleArtImage(id);
  };

  useEffect(() => {
    getArtworkDetails();
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

  if (!open) {
    return;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 py-1 h-6 flex bg-white rounded-lg items-center justify-center cursor-pointer">
            <CgArrowLeft size={18} onClick={close} />
          </div>
          <div className="w-fit grid gap-1 items-start">
            <h3 className="text-2xl font-medium capitalize">
              {singleArtwork?.title}
            </h3>
            <span className="text-gray-500 text-sm">{singleArtwork?.id}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-11 w-fit bg-blue-700 text-white text-base flex items-center gap-2 justify-center p-3 rounded-lg">
            <BiEdit size={16} />
            Edit
          </button>
          <button className="h-11 w-fit border border-red-700 text-red-700 text-white text-base flex items-center gap-2 justify-center p-3 rounded-lg">
            <BiTrash size={16} />
            Delete
          </button>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-3 md:justify-between w-full py-2">
        <div className="md:w-1/2 w-full flex flex-col-reverse gap-2">
          <div className="w-full flex flex-row gap-3">
            {gallery.map((gal) => (
              <div
                className={
                  singleArtImage == gal.image
                    ? "w-fit h-20 rounded-[4px] overflow-hidden cursor-pointer border-blue-800 border-solid border-2 shadow-md shadow-slate-300"
                    : "w-fit h-20 rounded-[4px] overflow-hidden cursor-pointer"
                }
                onClick={() => changeLargeImg(gal.image)}
              >
                <img className="h-[inherit] w-auto" src={gal.image} />
              </div>
            ))}
          </div>
          <div className="w-full object-fit bg-gray-200 flex items-center justify-center h-[24em] rounded-[6px] overflow-hidden">
            <img
              className="h-auto w-auto"
              src={singleArtImage || singleArtwork?.main_image}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-1/2">
          <div className="w-full bg-white px-2 py-3 flex flex-col gap-3 rounded-lg shadow-md border-gray-300 border-solid border-[1px]">
            <div className="uppercase text-base font-[500] text-start w-full">
              <h5>About the artwork</h5>
            </div>
            <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
            <div className="w-full flex flex-col gap-5 items-start">
              {singleArtwork.product_type == "sculpture" && <div className="flex items-center font-[500] gap-1 text-xs">
                <span className="uppercase">
                  Decoration Style:
                </span>
                <span className="font-[400] capitalize">
                  {singleArtwork.sculpture_details?.indoor_outdoor}
                </span>
              </div>}
              {singleArtwork.product_type == "beads" && <div className="flex items-center font-[500] gap-1 text-xs">
                <span className="uppercase">
                  Color:
                </span>
                <span className="font-[400] capitalize">
                  {singleArtwork.beads_details?.color}
                </span>
              </div>}
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
                    : singleArtwork.sculpture_details?.handmade !== undefined
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
          <div className="w-full bg-white px-2 py-3 flex flex-col gap-3 rounded-lg shadow-md border-gray-300 border-solid border-[1px]">
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
      <div className="w-full border-gray-400 border-solid border-[1px] px-2 py-3 flex flex-col gap-3 rounded-lg bg-white shadow-md">
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
      <div className="w-full border-gray-400 border-solid border-[1px] px-2 py-3 flex flex-col gap-3 rounded-lg bg-white shadow-md">
        <div className="uppercase text-base font-[500] text-start w-full">
          <h5>Shipping and returns</h5>
        </div>
        <hr className="w-full border-gray-300 border-solid border-[0.5px]" />
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
            <span className="uppercase">Handling:</span>
            <span className="font-[400] capitalize">
              {singleArtwork.shipping?.handling}
            </span>
          </div>
          <div className="flex items-center font-[500] gap-1 text-xs">
            <span className="uppercase">Ship from:</span>
            <span className="font-[400] capitalize">
              {singleArtwork.shipping?.ship_from}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
