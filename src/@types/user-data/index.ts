import { ModuleData } from '..'

export type UserData = {
  userId: number
  username: string
  institutionId: number
  modules: ModuleData[]
  genre?: number
  profilePicture?: string
}
