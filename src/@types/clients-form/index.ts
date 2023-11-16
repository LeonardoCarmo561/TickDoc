import { clientsFormSchema } from '@/utils/validation/clients-form-validate'
import { z } from 'zod'

export interface ClientsFormProps {
  open: boolean
  onClose?: () => void
  create?: boolean
}

export type ClientsFormData = z.infer<typeof clientsFormSchema>
