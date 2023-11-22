import {
  resetPasswordFormSchema,
  resetPasswordTokenFormSchema,
} from '@/utils/validation/reset-password-form-validate'
import { z } from 'zod'

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>

export type ResetPasswordTokenFormData = z.infer<
  typeof resetPasswordTokenFormSchema
>
