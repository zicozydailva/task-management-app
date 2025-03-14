import { useState } from "react";

function CustomDropdown({ options, selectedOption, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="w-full h-10 pl-3 pr-6 text-base flex justify-between items-center bg-white placeholder-white border rounded focus:shadow-outline"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : "Select"}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full p-4 bg-white border rounded shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 flex items-center hover:bg-gray-100 rounded-md  flex-row-reverse gap-8 justify-between cursor-pointer ${
                selectedOption?.value === option.value ? "bg-white" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              <span
                className={`ml-2 inline-block w-5 h-5 items rounded-full ${
                  selectedOption?.value === option.value
                    ? "bg-blue-500"
                    : "bg-gray-200 "
                } flex justify-center items-center`}
              >
                {selectedOption?.value === option.value && (
                  <svg
                    className="w-4 h-4 text-white "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </span>
              <span className="inline-block">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;
