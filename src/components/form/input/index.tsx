'use client'
import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function Input(props: InputProps) {
  const { register } = useFormContext()

  return (
    <input
      id={props.name}
      {...register(props.name)}
      {...props}
      className="h-10 rounded-xl px-2 text-black shadow-2xl border-gray-400 border-[2px] focus:outline-dodgerblue"
    />
  )
}
