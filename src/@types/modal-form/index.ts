/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react'

export type ModalFormProps = {
  onClose?: () => void
  open: boolean
  formReturn: any
  formTitle: string
  handleSubmit: (e: any) => void
  children: ReactNode
}
