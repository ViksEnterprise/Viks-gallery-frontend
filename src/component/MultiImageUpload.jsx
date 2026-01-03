import { useRef, useState, useEffect } from "react";

export const MultiImageUpload = ({
  label = "Additional Product Photos",
  helperText = "Add different images of the same product (angles, close-ups, details). These will appear as thumbnails on the product page.",
  value = [],
  onChange,
}) => {
  const inputRef = useRef(null);
  const [images, setImages] = useState(value);

  useEffect(() => {
    setImages(value);
  }, [value]);

  const handleSelect = (e) => {
    const files = Array.from(e.target.files || []);

    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    const updated = [...images, ...mapped];
    setImages(updated);
    onChange(updated);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onChange(updated);
  };

  return (
    <div className="border border-blue-400 rounded-lg p-4 space-y-2">
      {/* Label */}
      <div>
        <label className="block text-sm font-semibold text-gray-800">
          {label}
        </label>
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      </div>

      {/* Upload Button */}
      <div className="border-2 border-dashed rounded-lg p-4 py-2 text-center">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleSelect}
        />

        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
        >
          Add multiple photos
        </button>

        <p className="text-xs text-gray-500 mt-2">
          You can upload as many images as you like
        </p>
      </div>

      {/* Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-3 pt-2">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={img.preview}
                alt={`Product photo ${i + 1}`}
                className="w-full h-24 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
