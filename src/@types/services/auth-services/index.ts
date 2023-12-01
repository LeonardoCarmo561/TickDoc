import { ModuleData } from '@/@types'
import { loginFormSchema } from '@/utils/validation'
import z from 'zod'

export type LoginFormData = z.infer<typeof loginFormSchema>

export type TokenData = {
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

export type RefreshData = {
  refresh: string
  access: string
}

export type RefreshTokenData = {
  Success: string
  data: RefreshData
}
