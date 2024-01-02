import { z } from 'zod'
import { WorkFieldData } from '..'
import { workFieldFormSchema } from '@/utils/validation/admin'

export type WorkfFieldsFormProps = {
  create: boolean
  open: boolean
  onClose: () => void
  revalidate?: () => void
  workFieldData?: WorkFieldData
}

export type WorkFieldsFormData = z.infer<typeof workFieldFormSchema>
