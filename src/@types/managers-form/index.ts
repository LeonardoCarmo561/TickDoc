import { z } from 'zod'
import { AdminUserData } from '..'
import { managersFormSchema } from '@/utils/validation/admin'

export type ManagersFormProps = {
  create: boolean
  open: boolean
  onClose: () => void
  revalidate?: () => void
  adminUserData?: AdminUserData
}

export type ManagersFormData = z.infer<typeof managersFormSchema>
