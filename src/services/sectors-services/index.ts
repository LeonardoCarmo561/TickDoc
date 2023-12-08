import { TotalCount, SectorData } from '@/@types'
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
