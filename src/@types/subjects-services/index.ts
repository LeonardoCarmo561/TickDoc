export type SubjectSectors = {
  id: number
  name: string
}

export type SubjectData = {
  id: number
  name: string
  status: boolean
  institution_id: number
  sectors: SubjectSectors[]
  created_at: string
  updated_at: string
}

export type SubjectDetailsData = {
  id: number
  name: string
  status: boolean
  institution_id: number
  sectors: string[]
  created_at: string
  updated_at: string
}
