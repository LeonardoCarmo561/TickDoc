export type ModuleType = 'ombudsman' | 'ci' | 'customer-service'

export interface ModuleData {
  type: ModuleType
  title: string
  profile: number
  hr_manager: boolean
  logo: string
  deadline: number
}
