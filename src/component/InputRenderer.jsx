import { ImageUpload } from "./ImageUpload";
import { MultiImageUpload } from "./MultiImageUpload";
import { SelectDropDown } from "./SelectDropDown";

export const InputRenderer = ({ field, value, onChange }) => {
  if (field.type === "textarea") {
    return (
      <textarea
        placeholder={field.label}
        value={value || ""}
        onChange={(e) => onChange(field.name, e.target.value)}
        className="border border-gray-400 rounded-lg w-full resize-none h-48 outline-none p-2 placeholder:text-gray-500 text-black"
      />
    );
  }

  if (field.type === "select") {
    return (
      <SelectDropDown
        value={value}
        onChange={(val) => onChange(field.name, val)}
        options={field.options || []}
        placeholder={`Select ${field.label}`}
      />
    );
  }

  if (field.type === "image") {
    return (
      <ImageUpload
        imageUrl={value?.preview}
        onChange={(data) => onChange(field.name, data)}
      />
    );
  }

  if (field.type === "image-multiple") {
    return (
      <MultiImageUpload
        label={field.label}
        helperText={field.helperText}
        value={value || []}
        onChange={(data) => onChange(field.name, data)}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(field.name, e.target.checked)}
        />
        {field.label}
      </label>
    );
  }

  return (
    <input
      type={field.type}
      placeholder={field.label}
      value={value || ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      className="border border-gray-400 rounded-lg w-full resize-none h-11 outline-none p-2 placeholder:text-gray-500 text-black"
    />
  );
};
