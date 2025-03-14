import React, { ReactNode } from 'react'
import { cn } from '../lib/utils'

const KeyValueComponent = ({
  name,
  value,
  size = 'base',
  onClick,
}: {
  name: string
  value: string | number | ReactNode
  size?: 'sm' | 'base'
  onClick?: () => void
}) => {
  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
  }[size]

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between space-x-6 px-2 py-4 text-neutral-600',
        sizes
      )}
    >
      <div>
        <p className="w-max">{name}</p>
      </div>
      <div onClick={onClick} className={cn(onClick && 'cursor-pointer')}>
        <div className="text-right ">{value}</div>
      </div>
    </div>
  )
}

export default KeyValueComponent
