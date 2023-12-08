import { GroupingData } from '..'

export type SectorData = {
  id: number
  icon: string
  name: string
  grouping_id: GroupingData
  institution_id: number
  status: boolean
  created_at: string
  updated_at: string
}
