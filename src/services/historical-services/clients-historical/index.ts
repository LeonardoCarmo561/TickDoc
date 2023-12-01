import { HistoricalData } from '@/@types/historical-services'
import { api } from '@/services'

export async function getClientHistorical(
  id: number,
): Promise<HistoricalData[] | Error> {
  try {
    const relativeUrl = `/V1/institutions/${id}/historical/`

    const { data } = await api.get(relativeUrl)

    if (data) return data

    return new Error('Erro ao carregar histórico')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
