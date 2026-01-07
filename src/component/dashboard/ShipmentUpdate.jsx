import { useState, useEffect } from "react";
import { SHIPMENT_FIELDS } from "../../libs/shipmentFields";
import { InputRenderer } from "../InputRenderer";
import { CgArrowLeft } from "react-icons/cg";

export const ShipmentUpdateForm = ({
  orderId,
  open = false,
  close = () => close(),
  onSubmit,
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await fetch(`/api/orders/${orderId}/shipment/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      alert("Shipment updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update shipment");
    } finally {
      setLoading(false);
    }
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

      <button onClick={handleSubmit} disabled={loading} className="btn-primary">
        {loading ? "Updating..." : "Update Shipment"}
      </button>
    </div>
  );
};
