import { sectorsFormSchema } from '@/utils/validation/sectors-form-validation'
import { z } from 'zod'
import { SectorData } from '..'

export type SectorsFormProps = {
  create: boolean
  open: boolean
  onClose: () => void
  revalidate?: () => void
  sectorData?: SectorData
}

export type SectorsFormData = z.infer<typeof sectorsFormSchema>
