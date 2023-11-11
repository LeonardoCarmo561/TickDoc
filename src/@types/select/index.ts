import { ReactNode } from 'react'

export interface SelectProps {
  children: ReactNode
  label?: string
  emptyValue?: string
  wFit?: boolean
  wFull?: boolean
}
