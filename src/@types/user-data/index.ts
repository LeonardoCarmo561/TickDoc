import { ModuleData } from '..'

export interface UserData {
  userId: number
  username: string
  institutionId: number
  modules: ModuleData[]
  genre?: number
  profilePicture?: string
}
