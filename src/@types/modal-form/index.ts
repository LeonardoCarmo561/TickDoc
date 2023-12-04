/* eslint-disable @typescript-eslint/no-explicit-any */
import { workFieldFormSchema } from '@/utils/validation/workfields-form-validate'
import { ReactNode } from 'react'
import { UseFormHandleSubmit } from 'react-hook-form'
import { z } from 'zod'

export type ModalFormProps = {
  onClose?: () => void
  open: boolean
  formReturn: any
  formTitle: string
  handleSubmit: UseFormHandleSubmit<any, any>
  submit: (e: any) => void
  children: ReactNode
}

export type WorkFieldsFormData = z.infer<typeof workFieldFormSchema>
