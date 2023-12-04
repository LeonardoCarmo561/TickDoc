import { TotalCount } from '@/@types'
import { api } from '..'
import { AdminUserData } from '@/@types/admin-users-services'

export async function getAllAdminUsers(
  item = '0',
  total = '10',
  search = '',
): Promise<TotalCount<AdminUserData> | Error> {
  try {
    const relativeUrl = '/V1/adminusers/'

    const { data } = await api.get(relativeUrl, {
      params: {
        item,
        total,
        search,
      },
    })

    if (data) return data

    return new Error('Erro ao carregar administradores')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
