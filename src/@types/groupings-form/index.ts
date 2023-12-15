import { groupingsFormSchema } from '@/utils/validation/ombudsman'
import { z } from 'zod'
import { GroupingData } from '..'

export type GroupingsFormProps = {
  open: boolean
  create: boolean
  onClose: () => void
  revalidate?: () => void
  groupingData?: GroupingData
}

export type GroupingsFormData = z.infer<typeof groupingsFormSchema>
