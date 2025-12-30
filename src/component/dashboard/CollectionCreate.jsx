import { useState } from "react";
import { PRODUCT_TYPES, COLLECTION_FIELDS } from "../../libs/collectionFields"
import { InputRenderer } from "../InputRenderer";

export const CollectionCreate = () => {
  const [type, setType] = useState("artwork");
  const [formData, setFormData] = useState({});

  const fields = COLLECTION_FIELDS[type];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      product_type: type,
      ...formData,
    };

    console.log("FINAL PAYLOAD →", payload);
    // POST to DRF
  };

  return (
    <div className="collection-form">
      <h2>Create New Product</h2>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        {PRODUCT_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <div className="grid grid-cols gap-3 h-fit p-3">
        {fields.map((field) => (
          <InputRenderer
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}
      </div>

      <button onClick={handleSubmit}>Save Product</button>
    </div>
  );
};
