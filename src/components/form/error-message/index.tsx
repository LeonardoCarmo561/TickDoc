'use client'
import { getFieldError } from '@/utils'
import { useFormContext } from 'react-hook-form'

interface ErrorMessageProps {
  field: string
}

export function ErrorMessage({ field }: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext()

  const fieldError = getFieldError(errors, field)

  if (!fieldError) {
    return null
  }

  return (
    <span className="text-sm text-red-600 mt-1 text-center">
      {fieldError.message?.toString()}
    </span>
  )
}
