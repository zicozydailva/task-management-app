import { cn } from "../lib/utils";

type ButtonVariants =
  | "primary"
  | "light_primary"
  | "outline"
  | "primary_outline"
  | "danger"
  | "success"
  | "black_white"
  | "primary_outlined";
type ButtonSizes = "sm" | "md" | "lg";

interface Props {
  children: any;
  className?: string;
  variant?: ButtonVariants;
  onClick?: () => void;
  loading?: boolean;
  type?: "submit" | "button";
  size?: ButtonSizes;
  disabled?: boolean;
}

export default function CustomButton({
  children,
  className,
  loading,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}: Props) {
  const variants = {
    primary:
      "bg-primary hover:bg-primary/90 text-white border border-primary disabled:bg-primary/60 disabled:border-primary/60",
    light_primary:
      "bg-[#A9BDF8] hover:bg-[#A9BDF8]/90 text-black border border-light disabled:bg-primary/60 disabled:border-primary/60",
    outline:
      "bg-transparent hover:bg-neutral-900 text-white/80 border border-white/80 disabled:bg-secondary",
    primary_outline:
      "bg-transparent hover:bg-neutral-900 text-lime-400 border border-lime-400 disabled:bg-secondary",
    primary_outlined:
      "bg-gray-200 text-primary/60 text-black border-primary/60 disabled:bg-secondary",
    danger:
      "bg-red-600 hover:bg-red-600/90 text-white border border-red-600 disabled:bg-red-600/60 disabled:border-red-600/60",
    success:
      "bg-green-600 hover:bg-green-600/90 text-white border border-green-600 disabled:bg-green-600/60 disabled:border-green-600/60",
    black_white:
      "bg-black hover:bg-neutral-900 text-white/80 border border-white/80 disabled:bg-secondary",
  }[variant];

  const sizes = {
    sm: "py-1 px-4 text-sm",
    md: "py-2 px-4 text-sm",
    lg: "py-3 px-4 text-base",
  }[size];

  return (
    <button
      {...props}
      className={cn(
        variants,
        "cursor-pointer px-4 py-1 rounded-sm text-sm font-medium disabled:cursor-not-allowed",
        sizes,
        className
      )}
      disabled={disabled || loading}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}
