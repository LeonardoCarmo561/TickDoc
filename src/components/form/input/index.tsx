'use client'
import { InputHTMLAttributes, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  mask?: (value: string) => string
}

export function Input(props: InputProps) {
  const { register } = useFormContext()
  const [value, setValue] = useState<string | number>()

  return (
    <input
      value={value}
      id={props.name}
      {...register(props.name)}
      className="h-10 rounded-xl px-2 text-black shadow-2xl border-gray-400 border-[2px] focus:outline-dodgerblue"
      {...props}
      onChange={(e) => {
        setValue(props.mask?.(e.target.value) || e.target.value)
      }}
    />
  )
}
