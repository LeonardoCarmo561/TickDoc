import { z } from 'zod'
import { IconData } from '..'
import { iconsFormSchema } from '@/utils/validation/admin'

export type IconsFormProps = {
  create: boolean
  open: boolean
  onClose: () => void
  revalidate?: () => void
  iconData?: IconData
}

export type IconsFormData = z.infer<typeof iconsFormSchema>
