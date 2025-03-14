import { cn } from "../lib/utils";

interface Props {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: any) => void;
  variant?: "light" | "dark";
  disabled?: boolean;
}

export default function TextArea({
  name,
  label,
  value,
  placeholder,
  onChange,
  variant = "light",
  disabled,
}: Props) {
  const variants = {
    light: "bg-white",
    dark: "bg-gray-100",
  }[variant];

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
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder || label}
        onChange={onChange}
        className="w-full border-0 bg-transparent text-sm font-light ring-0 focus:outline-none"
        disabled={disabled}
      />
    </div>
  );
}
