import { useState } from "react";
import { cn } from "../lib/utils";

interface Props {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (e: any) => void;
  variant?: "light" | "dark";
  disabled?: boolean;
}

export default function Input({
  name,
  label,
  value,
  placeholder,
  type = "text",
  onChange,
  variant = "light",
  disabled,
}: Props) {
  const variants = {
    light: "bg-white",
    dark: "bg-gray-100",
  }[variant];

  const [inputType, setInputType] = useState(type);
  const [showText, setShowText] = useState(false);

  const handleToggle = () => {
    if (inputType === "text") {
      setInputType("password");
    } else {
      setInputType("text");
    }
    setShowText(!showText);
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-xl border border-gray-200 px-5 py-3",
        variants
      )}
    >
      <label htmlFor={name} className="w-full font-medium text-gray-500">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        placeholder={placeholder || label}
        type={inputType}
        onChange={onChange}
        className="w-full border-0 bg-transparent text-sm font-light ring-0 focus:outline-none"
        disabled={disabled}
      />
      {type === "password" && (
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer py-1 text-xs text-gray-400"
          onClick={handleToggle}
        >
          {!showText ? "show" : "hide"}
        </div>
      )}
    </div>
  );
}
