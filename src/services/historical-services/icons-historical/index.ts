import { HistoricalData } from '@/@types'
import { api } from '@/services'

export async function getIconHistorical(
  id: number | string,
): Promise<HistoricalData[] | Error> {
  try {
    const relativeUrl = `/V1/icons/${id}/historical/`

    const { data } = await api.get(relativeUrl)

    if (data) return data

    return new Error('Erro ao carregar histórico')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
