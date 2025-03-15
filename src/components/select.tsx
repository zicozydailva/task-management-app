import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useState } from 'react'
import { cn } from '../lib/utils'

export type SelectOption = {
  name: string
  value: string | null
}

interface FormSelectProps {
  name: string
  value: SelectOption | string
  options: SelectOption[]
  label: string
  onChange: (value: SelectOption) => void
  variant?: 'light' | 'dark'
}

export default function Select({
  name,
  value,
  options,
  label,
  onChange,
  variant = 'light',
}: FormSelectProps) {
  const variants = {
    light: 'bg-white',
    dark: 'bg-gray-200',
  }[variant]

  const [selectedValue, setSelectedValue] = useState<SelectOption>({
    name: `Select ${name}`,
    value: null,
  })

  useEffect(() => {
    if (
      typeof value === 'object' &&
      value !== null &&
      'name' in value &&
      'value' in value
    ) {
      setSelectedValue(value as SelectOption)
    } else if (typeof value === 'string') {
      const foundOption = options.find((option) => option.value === value)
      if (foundOption) {
        setSelectedValue(foundOption)
        return
      }
    }
  }, [value, options])

  return (
    <div
      className={cn(
        'relative w-full rounded-xl border border-gray-200 px-5 py-3',
        variants
      )}
    >
      <label htmlFor={name} className="w-full font-medium text-primary">
        {label}
      </label>
      <Listbox value={selectedValue} onChange={onChange}>
        <ListboxButton
          className={cn(
            'relative block w-full rounded-none bg-white py-0 pl-0 pr-8 text-left text-sm/6',
            selectedValue.value ? 'text-black' : 'text-gray-600',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white'
          )}
        >
          {selectedValue.name || `Select ${name}`}
          <ChevronDownIcon
            className="group pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 fill-gray-600"
            aria-hidden="true"
          />
        </ListboxButton>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            anchor="bottom"
            className="z-[999] w-[var(--button-width)] rounded-xl border border-gray-50 bg-[white] p-0 shadow-md [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.name}
                value={option}
                className="group flex cursor-default select-none items-center gap-2 rounded-none px-3 py-1.5 data-[focus]:bg-[#DDDDDD]"
              >
                <div className="text-sm/6 text-gray-600">{option.name}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  )
}
