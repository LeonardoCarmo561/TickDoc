import { TotalCount, SectorData, SectorsFormData } from '@/@types'
import { api } from '..'

export async function getAllSectors(
  item = '0',
  total = '10',
  search = '',
): Promise<TotalCount<SectorData> | Error> {
  try {
    const relativeUrl = '/V1/sectors/'

    const { data } = await api.get(relativeUrl, {
      params: {
        item,
        total,
        search,
      },
    })

    if (data) return data

    return new Error('Erro ao carregar setores')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function getSector(
  id: number | string,
): Promise<SectorData | Error> {
  try {
    const relativeUrl = `/V1/sectors/${id}/`

    const { data } = await api.get(relativeUrl)

    if (data) return data

    return new Error('Erro ao carregar setor')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function createSector(
  formData: SectorsFormData,
): Promise<SectorData | Error> {
  try {
    const relativeUrl = '/V1/sectors/'

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
    const relativeUrl = `/V1/sectors/${id}/`

    const { data } = await api.patch(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao atualizar setor')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
