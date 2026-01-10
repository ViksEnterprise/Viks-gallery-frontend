import { useState, useEffect } from "react";
import { SHIPMENT_FIELDS } from "../../libs/shipmentFields";
import { InputRenderer } from "../InputRenderer";
import { CgArrowLeft } from "react-icons/cg";

export const ShipmentUpdateForm = ({
  orderId,
  open = false,
  loading = false,
  close = () => close(),
  onSubmit,
}) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    onSubmit(formData, orderId);
  };

  if (!open) {
    return;
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex gap-2 items-center">
        <div
          className="p-3 py-1 h-6 flex bg-white rounded-lg items-center justify-center cursor-pointer"
          onClick={close}
        >
          <CgArrowLeft size={20} />
        </div>
        <h2 className="text-2xl font-semibold">Update Shipment Status</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {SHIPMENT_FIELDS.map((field) => {
          const isFullWidth =
            field.name === "customer_note" || field.name === "admin_note";

          return (
            <div key={field.name} className={isFullWidth ? "col-span-2" : ""}>
              <InputRenderer
                key={field.name}
                field={field}
                value={formData[field.name]}
                onChange={handleChange}
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-700 text-white h-10 w-48 rounded-lg flex items-center justify-center"
      >
        {loading ? (
          <span className="border-white border-t-transparent border-b-solid border-[3px] rounded-full h-7 w-7 animate-spin flex"></span>
        ) : (
          "Update Shipment"
        )}
      </button>
    </div>
  );
};
