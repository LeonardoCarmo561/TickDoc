import { ModuleData } from '..'

export interface UserData {
  userId: number
  username: string
  email: string
  institutionId: number
  modules: ModuleData[]
  genre?: number
  profilePicture?: string
}
