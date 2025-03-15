import { cn } from "../lib/utils";

interface Props {
  status: "completed" | "in-progress" | "pending";
  size?: "xs" | "sm" | "base";
}

export default function StatusPill({ status, size = "xs" }: Props) {
  const statuses: any = {
    completed: "bg-green-600/10 text-green-600",
    pending: "bg-[#E5A72F] text-white",
    "in-progress": "bg-amber-600/10 text-amber-600",
  }[status];

  const sizes: any = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
  }[size];

  return (
    <div
      className={cn(
        "rounded-full px-4 py-2 capitalize w-30 text-center",
        sizes,
        statuses
      )}
    >
      {status}
    </div>
  );
}
