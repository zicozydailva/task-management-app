import React from 'react'

interface Props {
  name: string
  value: string
  placeholder?: string
  onChange: (event: any) => void
}

export default function TableSearch({
  name,
  value,
  placeholder = 'Search...',
  onChange,
}: Props) {
  return (
    <div className="flex items-center bg-[#EBEDF0] text-[#636971] font-semibold px-4 rounded md:w-[231px] mb-2">
      <input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="sm:w-64 flex-1 rounded-sm border-0 bg-transparent py-3 font-light ring-0 focus:outline-none"
      />
      <div className="flex h-full w-8 items-center justify-center">
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8646 16.0833L19.5313 19.75M3.03125 10.5833C3.03125 12.5283 3.80387 14.3935 5.17913 15.7688C6.5544 17.1441 8.41966 17.9167 10.3646 17.9167C12.3095 17.9167 14.1748 17.1441 15.55 15.7688C16.9253 14.3935 17.6979 12.5283 17.6979 10.5833C17.6979 8.63841 16.9253 6.77315 15.55 5.39788C14.1748 4.02262 12.3095 3.25 10.3646 3.25C8.41966 3.25 6.5544 4.02262 5.17913 5.39788C3.80387 6.77315 3.03125 8.63841 3.03125 10.5833Z"
            stroke="black"
            stroke-width="1.375"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
