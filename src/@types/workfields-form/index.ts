import { WorkFieldData } from '..'

export type WorkfFieldsFormProps = {
  create: boolean
  open: boolean
  onClose: () => void
  revalidate?: () => void
  workFieldData?: WorkFieldData
}
