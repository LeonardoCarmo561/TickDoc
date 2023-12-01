import { ReactNode } from 'react'

export interface SelectOption {
  label: string
  value: string | number | string[]
  icon?: ReactNode
}

export type SelectProps = {
  multiple?: boolean
  closeOnChange?: boolean
  name?: string
  options: SelectOption[]
}

export interface SelectFormProps {
  multiple?: boolean
  closeOnChange?: boolean
  name: string
  placeholder?: string
  options: SelectOption[]
}
