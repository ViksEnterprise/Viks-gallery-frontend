import { useEffect, useState } from "react";
import {
  PRODUCT_TYPES,
  COLLECTION_FIELDS,
  DETAIL_FIELD_NAMES,
  SHIPPING_FIELD_NAMES,
  NESTED_FIELD_MAP,
} from "../../libs/collectionFields";
import { FORM_STEPS } from "../../libs/collectionFields";
import { InputRenderer } from "../InputRenderer";
import { SelectDropDown } from "../SelectDropDown";
import { CgArrowLeft } from "react-icons/cg";

export const CollectionCreate = ({
  mode = "",
  loading,
  open = "",
  initialData = {},
  close = () => close(),
  onSubmit,
}) => {
  const [type, setType] = useState(initialData.product_type || "artwork");
  const [formData, setFormData] = useState(initialData || {});
  const [step, setStep] = useState(0);
  const [formKey, setFormKey] = useState(0);
  const [deletedGalleryIds, setDeletedGalleryIds] = useState([]);

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

  const requiredFieldsForStep = fieldsForStep.filter((field) => field.required);

  const normalizeInitialData = (data, type) => {
    const detailsKey = NESTED_FIELD_MAP[type];

    return {
      ...data,
      ...(data[detailsKey] || {}),
      ...(data.shipping || {}),
      main_image: data.main_image
        ? { preview: data.main_image, file: null }
        : null,
      gallery: Array.isArray(data.gallery)
        ? data.gallery.map((img) => ({
            id: img.id,
            preview: img.image,
            file: null,
            isExisting: true,
          }))
        : [],
    };
  };

  const canProceed =
    requiredFieldsForStep.length === 0 ||
    requiredFieldsForStep.every(isFieldFilled);

  const handleChange = (name, value, removedImage = null) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "gallery" && removedImage?.id && removedImage.isExisting) {
      setDeletedGalleryIds((prev) => [...prev, removedImage.id]);
    }
  };


  const isLastStep = step === FORM_STEPS.length - 1;

  const handleSubmit = () => {
    const payload = new FormData();

    if (mode === "edit") {
      payload.append("id", initialData.id);
    }

    payload.append("product_type", type);

    const detailsKey = NESTED_FIELD_MAP[type];
    const detailsData = {};
    const shippingData = {};

    Object.entries(formData).forEach(([key, value]) => {
      // MAIN IMAGE
      if (key === "main_image" && value?.file) {
        payload.append("main_image", value.file);
        return;
      }

      // GALLERY (multiple images)
      if (key === "gallery" && Array.isArray(value)) {
        value.forEach((img) => {
          if (img?.file) payload.append(`gallery`, img.file);
        });
        return;
      }

      if (SHIPPING_FIELD_NAMES.includes(key)) {
        shippingData[key] = value;
        return;
      }

      if (DETAIL_FIELD_NAMES[type]?.includes(key)) {
        detailsData[key] = value;
        return;
      }

      if (typeof value === "boolean") {
        payload.append(key, value ? "true" : "false");
        return;
      }

      if (value !== undefined && value !== "" && typeof value !== "object") {
        payload.append(key, value);
      }
    });

    // Nested fields (artwork_details, sculpture_details, beads_details)
    Object.entries(detailsData).forEach(([k, v]) => {
      payload.append(`${detailsKey}.${k}`, v);
    });

    deletedGalleryIds.forEach((id) => {
      payload.append("delete_gallery_ids", id);
    });

    // Shipping fields
    Object.entries(shippingData).forEach(([k, v]) => {
      payload.append(`shipping.${k}`, v);
    });

    onSubmit(payload);
  };

  useEffect(() => {
    if (mode === "edit" && initialData?.id) {
      setType(initialData.product_type);
      setFormData(normalizeInitialData(initialData, initialData.product_type));
      setStep(0);
      setFormKey((prev) => prev + 1);
    }

    if (mode === "create") {
      setFormData({});
      setStep(0);
      setFormKey((prev) => prev + 1);
    }
  }, [mode, initialData]);

  if (!open) {
    return;
  }

  return (
    <div className="space-y-4 flex flex-col">
      <div className="flex gap-2 items-center">
        <div
          className="p-3 py-1 h-6 flex bg-white rounded-lg items-center justify-center cursor-pointer"
          onClick={close}
        >
          <CgArrowLeft size={20} />
        </div>
        <h2 className="text-2xl font-semibold">
          {mode === "create" ? "Create Collection" : "Edit Collection"}
        </h2>
      </div>

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
        <div key={formKey} className="grid grid-cols-2 gap-4">
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
              disabled={loading}
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-700 text-white rounded-lg disabled:opacity-50 w-44 flex items-center justify-center"
            >
              {loading ? (
                <span className="border-white border-t-transparent border-b-solid border-[3px] rounded-full h-7 w-7 animate-spin flex"></span>
              ) : (
                <span>
                  {mode === "create" ? "Save Product" : "Update Product"}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
