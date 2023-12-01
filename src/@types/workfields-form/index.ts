import { WorkFieldData } from '..'

export type WorkfFieldsFormProps = {
  create: boolean
  open: boolean
  onClose: () => void
  workFieldData?: WorkFieldData
}
