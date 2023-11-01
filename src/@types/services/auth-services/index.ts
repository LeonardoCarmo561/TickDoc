import { ModuleData } from '@/@types'
import { loginFormSchema } from '@/utils/validation'
import z from 'zod'

export type LoginFormData = z.infer<typeof loginFormSchema>

export interface TokenData {
  token_type: string
  exp: number
  iat: number
  jti: number
  user_id: number
  modules: ModuleData[]
  institution_id: number
  profile_picture: string
  username: string
  gender: number
  id: number
}

export interface RefreshData {
  refresh: string
  access: string
}

export interface RefreshTokenData {
  Success: string
  data: RefreshData
}
