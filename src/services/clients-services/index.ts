import { ClientData, TotalCount } from '@/@types'
import { api } from '../config'
import { ClientsFormData } from '@/@types/clients-form'

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

export async function getClientDetails(
  id: number | string,
): Promise<ClientData | Error> {
  try {
    const relativeUrl = `/V1/institutions/${id}/`

    const { data } = await api.get(relativeUrl)

    if (data) return data

    return new Error('Erro ao carregar instância')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function updateClient(
  id: number | string,
  formData: ClientsFormData,
): Promise<ClientData | Error> {
  try {
    const relativeUrl = `/V1/institutions/${id}/`

    const { data } = await api.patch(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao atualizar instância')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
