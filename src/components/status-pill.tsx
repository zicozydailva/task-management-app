import { cn } from "../lib/utils";

interface Props {
  status:
    | "success"
    | "successful"
    | "active"
    | "disabled"
    | "verified"
    | "trust"
    | "error"
    | "failed"
    | "inactive"
    | "unverified"
    | "untrust"
    | "pending"
    | "processing"
    | "online"
    | "offline"
  size?: "xs" | "sm" | "base";
}

export default function StatusPill({ status, size = "xs" }: Props) {
  const statuses: any = {
    success: "bg-green-600/10 text-green-600",
    online: "bg-green-600/10 text-green-600",
    successful: "bg-[#3EA63B] text-white",
    active: "bg-[#3EA63B] text-white",
    true: "bg-[#3EA63B] text-white",
    disabled: "bg-red-500 text-white",
    verified: "bg-green-600/10 text-green-600",
    trust: "bg-green-600/10 text-green-600",
    credit: "bg-green-600/10 text-green-600",
    error: "bg-red-600/10 text-red-600",
    offline: "bg-red-600/10 text-red-600",
    failed: "bg-red-600/10 text-red-600",
    false: "bg-red-600/10 text-red-600",
    inactive: "bg-red-600/10 text-red-600",
    unverified: "bg-red-600/10 text-red-600",
    untrust: "bg-red-600/10 text-red-600",
    debit: "bg-red-600/10 text-red-600",
    pending: "bg-[#E5A72F] text-white",
    processing: "bg-amber-600/10 text-amber-600",
  }[status];

  const sizes: any = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
  }[size];

  return (
    <div
      className={cn(
        "rounded-full px-4 py-2 capitalize w-24 text-center",
        sizes,
        statuses
      )}
    >
      {status}
    </div>
  );
}
