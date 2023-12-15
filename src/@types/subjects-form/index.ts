import { z } from 'zod'
import { SubjectData } from '..'
import { subjectsFormSchema } from '@/utils/validation/ombudsman/subjects-form-validation'

export type SubjectsFormProps = {
  create: boolean
  open: boolean
  onClose: () => void
  revalidate?: () => void
  subjectData?: SubjectData
}

export type SubjectFormData = z.infer<typeof subjectsFormSchema>
