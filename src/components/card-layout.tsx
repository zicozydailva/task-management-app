import { cn } from "../lib/utils"

interface Props {
  children: JSX.Element
  className?: string
}

export default function CardLayout({ children, className }: Props) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-300 bg-gray-100 p-4 hover:bg-neutral-50',
        className
      )}
    >
      {children}
    </div>
  )
}
