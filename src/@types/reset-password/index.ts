import {
  resetPasswordFormSchema,
  resetPasswordTokenFormSchema,
} from '@/utils/validation/reset-password-form-validation'
import { z } from 'zod'

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>

export type ResetPasswordTokenFormData = z.infer<
  typeof resetPasswordTokenFormSchema
>
