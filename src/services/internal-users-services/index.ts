import { InternalUserData, InternalUsersFormData } from '@/@types'
import { api } from '..'

export const INTERNAL_USERS_URL = '/V1/internalusers/'

export async function updateInternalUser(
  id: number | string,
  formData: InternalUsersFormData,
): Promise<InternalUserData | Error> {
  try {
    const { data } = await api.patch(`${INTERNAL_USERS_URL}${id}/`, formData)

    if (data) return data

    return new Error('Erro ao atualizar usuário')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function createInternalUser(
  formData: InternalUsersFormData,
): Promise<InternalUserData | Error> {
  try {
    const { data } = await api.post(INTERNAL_USERS_URL, formData)

    if (data) return data

    return new Error('Erro ao criar usuário')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
