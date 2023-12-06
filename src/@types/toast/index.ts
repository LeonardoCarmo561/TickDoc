import { ReactNode } from 'react'
import { ToastAcceptTypes } from '..'

export type ToastContainerProps = {
  children?: ReactNode
}

export type ToastProps = {
  message: string
  onClick: () => void
  type: ToastAcceptTypes
}
