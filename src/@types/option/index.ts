import { ReactNode } from 'react'

export interface OptionProps {
  label: string
  value: string | number
  icon?: ReactNode
  title?: string
}
