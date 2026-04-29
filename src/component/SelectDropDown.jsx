import { useState, useRef, useEffect } from "react";

export const SelectDropDown = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((o) => o.value === value);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger */}
      <div
        onClick={toggleDropdown}
        className="w-full px-4 py-2 h-11 border border-gray-300 bg-white rounded-lg cursor-pointer flex justify-between items-center transition"
      >
        <span
          className={
            selectedOption ? "text-gray-900 text-base" : "text-gray-500 text-sm"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-gray-700 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => selectOption(opt)}
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition ${
                value === opt.value ? "bg-gray-200" : ""
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
