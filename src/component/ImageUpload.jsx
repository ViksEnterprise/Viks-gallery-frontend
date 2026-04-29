import { useRef, useState, useEffect, useMemo } from "react";

export const ImageUpload = ({ imageUrl = "", onChange }) => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(imageUrl);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const hasImage = useMemo(() => !!previewUrl, [previewUrl]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(imageUrl);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!validTypes.includes(selectedFile.type)) {
      setError("Please select a valid image file (JPEG, PNG, GIF, WEBP)");
      return;
    }

    const maxSize = 1 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError("Image size must not exceed 1 MB.");
      reset();
      return;
    }

    setError("");
    setFile(selectedFile);
    setFileName(selectedFile.name);

    const preview = URL.createObjectURL(selectedFile);
    setPreviewUrl(preview);

    onChange?.({
      file: selectedFile,
      preview,
      name: selectedFile.name,
    });
  };

  useEffect(() => {
    if (!file && imageUrl) {
      setPreviewUrl(imageUrl);
    }
  }, [imageUrl, file]);

  return (
    <div
      className="border-1 border border-blue-400 bg-white rounded-lg p-8 py-10 text-center cursor-pointer
      flex flex-col justify-center items-center transition w-full h-fit border-[#D1D9E8]"
      onClick={triggerFileInput}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      {previewUrl ? (
        <div className="w-30 h-24 mx-auto mb-3 rounded-lg overflow-hidde">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-48 mx-auto mb-1 px-5 py-2 flex items-center justify-center">
          <h6 className="text-lg font-semibold">Upload Image</h6>
        </div>
      )}

      <p
        className={
          hasImage
            ? "text-xs text-[#B21F04]"
            : "text-sm text-black h-12 w-36 bg-[#E8EDF2] shadow-md flex items-center justify-center rounded-lg"
        }
      >
        {hasImage ? fileName : "Browse Files"}
      </p>

      {error && (
        <p className="text-red-600 text-xs mt-2 font-medium">{error}</p>
      )}
    </div>
  );
};
