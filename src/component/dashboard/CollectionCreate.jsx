import { useEffect, useState } from "react";
import { PRODUCT_TYPES, COLLECTION_FIELDS } from "../../libs/collectionFields";
import { FORM_STEPS } from "../../libs/collectionFields";
import { InputRenderer } from "../InputRenderer";
import { SelectDropDown } from "../SelectDropDown";

export const CollectionCreate = ({
  mode = "create", // create | edit
  initialData = {},
  onSubmit,
}) => {
  const [type, setType] = useState(initialData.product_type || "artwork");
  const [formData, setFormData] = useState(initialData || {});
  const [step, setStep] = useState(0);

  const allFields = COLLECTION_FIELDS[type];
  const currentStep = FORM_STEPS[step];

  const fieldsForStep = allFields.filter((field) => {
    if (currentStep.fields === "dynamic") {
      return ![
        "main_image",
        "gallery",
        "title",
        "price",
        "quantity",
        "description",
        "ship_from",
        "delivery_day",
        "delivery_cost",
        "returns",
        "handling",
      ].includes(field.name);
    }

    return currentStep.fields.includes(field.name);
  });

  const isFieldFilled = (field) => {
    const value = formData[field.name];

    if (!field.required) return true;

    // File input
    if (field.type === "file") {
      return value?.file instanceof File;
    }

    // Gallery (multiple images)
    if (field.name === "gallery") {
      return Array.isArray(value) && value.length > 0;
    }

    // Text / number / textarea
    return value !== undefined && value !== null && value !== "";
  };

  const canProceed = fieldsForStep.every(isFieldFilled);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isLastStep = step === FORM_STEPS.length - 1;

  const handleSubmit = () => {
    const payload = new FormData();
    payload.append("product_type", type);

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "main_image" && value?.file) {
        payload.append("main_image", value.file);
        return;
      }

      if (key === "gallery" && Array.isArray(value)) {
        value.forEach((img) => {
          if (img?.file) payload.append("gallery", img.file);
        });
        return;
      }

      if (typeof value !== "object" && value !== undefined) {
        payload.append(key, value);
      }
    });

    console.log(payload);

    onSubmit(payload);
  };

  useEffect(() => {
    if (mode === "create") {
      setFormData({});
      setStep(0);
    }
  }, [type]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {mode === "create" ? "Create Product" : "Edit Product"}
      </h2>

      {/* Step Indicator */}
      <div className="flex gap-2 text-sm">
        {FORM_STEPS.map((s, i) => (
          <span
            key={s.key}
            className={`px-3 py-1 rounded-full ${
              i === step ? "bg-blue-700 text-white" : "bg-gray-200"
            }`}
          >
            {s.title}
          </span>
        ))}
      </div>

      {/* Product Type (only on step 1 & create) */}
      {step === 0 && mode === "create" && (
        <div className="flex w-full items-end justify-end">
          <div className="w-96 grid gap-1">
            <label className="text-sm font-medium text-end">
              Select Product Type
            </label>
            <SelectDropDown
              value={type}
              onChange={(val) => setType(val)}
              options={PRODUCT_TYPES}
              placeholder="Select Product Type"
            />
          </div>
        </div>
      )}

      <div className="grid gap-4 bg-white p-6 rounded-xl shadow-md">
        {/* Fields */}
        <div className="grid grid-cols-2 gap-4">
          {fieldsForStep.map((field) => {
            const isFullWidth = field.name === "description";

            return (
              <div key={field.name} className={isFullWidth ? "col-span-2" : ""}>
                <InputRenderer
                  field={field}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 border bg-white rounded-lg border-gray-400 border disabled:opacity-50"
          >
            Back
          </button>

          {!isLastStep ? (
            <button
              disabled={!canProceed}
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              disabled={!canProceed}
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-50"
            >
              {mode === "create" ? "Save Product" : "Update Product"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
