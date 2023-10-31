import { LoginFormData, RefreshTokenData } from '@/@types'
import { api } from '../config'

export async function loginAdminUser(formData: LoginFormData) {
  const result = await api.post('/V2/api/token/', formData)

  return result.data
}

export async function refreshToken(): Promise<RefreshTokenData | Error> {
  try {
    const { data } = await api.post('/V1/api/token/resfresh/')

    if (data) return data

    return new Error('Erro ao atualizar token')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
