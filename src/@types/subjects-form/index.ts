import { z } from 'zod'
import { SubjectDetailsData } from '..'
import { subjectsFormSchema } from '@/utils/validation/ombudsman/subjects-form-validation'

export type SubjectsFormProps = {
  create: boolean
  open: boolean
  onClose: () => void
  revalidate?: () => void
  subjectData?: SubjectDetailsData
}

export type SubjectFormData = z.infer<typeof subjectsFormSchema>
