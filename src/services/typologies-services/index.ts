import { TypologyData } from '@/@types'
import { api } from '..'

export const TYPOLOGIES_URL = '/V1/categories/'

export async function createTypology(
  formData: any,
): Promise<TypologyData | Error> {
  try {
    const { data } = await api.post(TYPOLOGIES_URL, formData)

    if (data) return data

    return new Error('Erro ao criar tipologia')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function updateTypology(
  id: string | number,
  formData: any,
): Promise<TypologyData | Error> {
  try {
    const { data } = await api.patch(`${TYPOLOGIES_URL}${id}/`, formData)

    if (data) return data

    return new Error('Erro ao atualizar tipologia')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
