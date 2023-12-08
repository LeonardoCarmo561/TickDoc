/* eslint-disable @typescript-eslint/no-explicit-any */
import { workFieldFormSchema } from '@/utils/validation/workfields-form-validation'
import { ReactNode } from 'react'
import { z } from 'zod'

export type ModalFormProps = {
  onClose?: () => void
  open: boolean
  formReturn: any
  formTitle: string
  handleSubmit: (e: any) => void
  children: ReactNode
}

export type WorkFieldsFormData = z.infer<typeof workFieldFormSchema>
