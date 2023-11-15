import { ReactNode } from 'react'

export type TooltipProps = {
  title: string
  children: ReactNode
  position?: 'rigth' | 'left' | 'top' | 'bottom'
}
