import { z } from 'zod'
import { TypologyData } from '..'
import { typologiesFormSchema } from '@/utils/validation/ombudsman/typologies-form-validation'

export type TypologiesFormProps = {
  create: boolean
  open: boolean
  onClose: () => void
  revalidate?: () => void
  typologyData?: TypologyData
}

export type TypologiesFormData = z.infer<typeof typologiesFormSchema>
