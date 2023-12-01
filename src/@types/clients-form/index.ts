import { clientsFormSchema } from '@/utils/validation/clients-form-validate'
import { z } from 'zod'
import { ClientData } from '..'

export type ClientsFormProps = {
  open: boolean
  onClose?: () => void
  create?: boolean
  clientData?: ClientData
}

export type ClientsFormData = z.infer<typeof clientsFormSchema>
