import { ManagersFormData } from '@/@types'
import { api } from '..'
import { AdminUserData } from '@/@types/admin-users-services'

export const ADMIN_USERS_URL = '/V1/adminusers/'

export async function updateAdminUser(
  id: number | string,
  formData: ManagersFormData,
): Promise<AdminUserData | Error> {
  try {
    const relativeUrl = `${ADMIN_USERS_URL}${id}/`

    const { data } = await api.patch(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao atualizar administrador')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function createAdminUser(
  formData: ManagersFormData,
): Promise<AdminUserData | Error> {
  try {
    const relativeUrl = ADMIN_USERS_URL

    const { data } = await api.post(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao criar administrador')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
