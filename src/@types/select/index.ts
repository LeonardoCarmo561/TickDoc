import { ReactNode } from 'react'

export interface SelectProps {
  children: ReactNode
  value?: number | string
  label?: string
  emptyValue?: string
  wFit?: boolean
  wFull?: boolean
  name?: string
}
