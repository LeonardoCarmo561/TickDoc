import { ClientData, TotalCount } from '@/@types'
import { api } from '../config'

export async function getAllClients(
  item = '0',
  total = '10',
  search = '',
  status = '',
): Promise<TotalCount<ClientData> | Error> {
  try {
    const relativeUrl = '/V1/institutions/'

    const { data } = await api.get(relativeUrl, {
      params: {
        item,
        total,
        search,
        status,
      },
    })

    if (data) return data

    return new Error('Erro ao carregar clientes')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
