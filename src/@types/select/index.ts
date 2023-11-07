import { ReactNode } from 'react'

export interface SelectProps {
  title?: string
  children: ReactNode
  label: string
  onChange?: (e: string | number | undefined) => void
}
