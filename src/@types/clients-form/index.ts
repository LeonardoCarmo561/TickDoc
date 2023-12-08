import { clientsFormSchema } from '@/utils/validation/clients-form-validation'
import { z } from 'zod'
import { ClientData } from '..'

export type ClientsFormProps = {
  open: boolean
  onClose?: () => void
  create?: boolean
  clientData?: ClientData
  revalidate?: () => void
}

export type ClientsFormData = z.infer<typeof clientsFormSchema>
