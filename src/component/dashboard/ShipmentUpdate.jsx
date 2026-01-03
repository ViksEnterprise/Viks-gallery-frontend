import { useState, useEffect } from "react";
import { SHIPMENT_FIELDS } from "../../libs/shipmentFields";
import { InputRenderer } from "../InputRenderer";

export const ShipmentUpdateForm = ({ orderId }) => {
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

  return (
    <div className="shipment-form">
      <h2>Update Shipment Status</h2>

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
