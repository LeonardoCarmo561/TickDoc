import { ClientData } from '@/@types'
import { api } from '../config'
import { ClientsFormData } from '@/@types/clients-form'

export const CLIENTS_URL = '/V1/institutions/'

export async function updateClient(
  id: number | string,
  formData: ClientsFormData,
): Promise<ClientData | Error> {
  try {
    const relativeUrl = `${CLIENTS_URL}${id}/`

    const { data } = await api.patch(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao atualizar instância')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function createClient(
  formData: ClientsFormData,
): Promise<ClientData | Error> {
  try {
    const relativeUrl = CLIENTS_URL

    const { data } = await api.post(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao criar instância')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
