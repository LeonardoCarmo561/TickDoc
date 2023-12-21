import { SectorData, SectorsFormData } from '@/@types'
import { api } from '..'

export const SECTORS_URL = '/V1/sectors/'

export async function createSector(
  formData: SectorsFormData,
): Promise<SectorData | Error> {
  try {
    const relativeUrl = SECTORS_URL

    const { data } = await api.post(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao criar setor')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function updateSector(
  id: number | number,
  formData: SectorsFormData,
): Promise<SectorData | Error> {
  try {
    const relativeUrl = `${SECTORS_URL}${id}/`

    const { data } = await api.patch(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao atualizar setor')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
