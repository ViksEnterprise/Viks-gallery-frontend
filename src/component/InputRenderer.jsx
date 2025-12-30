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
      <select
        value={value || ""}
        onChange={(e) => onChange(field.name, e.target.value)}
        className="border border-gray-400 rounded-lg w-full resize-none h-11 outline-none p-2 placeholder:text-gray-500 text-black"
      >
        <option value="">Select {field.label}</option>
        {field.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label>
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
