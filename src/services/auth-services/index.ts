import { LoginFormData, RefreshData, RefreshTokenData } from '@/@types'
import { api } from '../config'

export async function loginAdminUser(
  formData: LoginFormData,
): Promise<RefreshTokenData | Error> {
  try {
    const { data } = await api.post('/V1/api/token/', formData)

    if (data) return data

    return new Error('Erro ao fazer login')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function refreshToken(): Promise<RefreshData | Error> {
  try {
    const { data } = await api.post('/V1/api/token/refresh/')

    if (data) return data

    return new Error('Erro ao atualizar token')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function logout() {
  try {
    const data = await api.post('/V1/api/logout/')

    if (data) return data

    return new Error('Erro ao fazer logout')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message)
  }
}
