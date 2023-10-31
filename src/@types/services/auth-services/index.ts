import { loginFormSchema } from '@/utils/validation'
import z from 'zod'

export type LoginFormData = z.infer<typeof loginFormSchema>
