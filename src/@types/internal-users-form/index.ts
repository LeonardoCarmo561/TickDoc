import { z } from 'zod'
import { InternalUserData } from '..'
import { internalUsersFormSchema } from '@/utils/validation/ombudsman'

export type InternalUsersFormProps = {
  create: boolean
  open: boolean
  onClose: () => void
  revalidate?: () => void
  internalUserData?: InternalUserData
}

export type InternalUsersFormData = z.infer<typeof internalUsersFormSchema>
