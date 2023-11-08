import { ReactNode } from 'react'

export interface SelectProps {
  title?: string
  children: ReactNode
  fullWidth?: boolean
  label: string
  onChange?: (e: string | number | undefined) => void
  value?: string | number
  setValue?: (e: string | number | undefined) => void
}
