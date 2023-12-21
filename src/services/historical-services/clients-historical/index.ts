import { HistoricalData } from '@/@types/historical-services'
import { CLIENTS_URL, api } from '@/services'

export async function getClientHistorical(
  id: number,
): Promise<HistoricalData[] | Error> {
  try {
    const relativeUrl = `${CLIENTS_URL}${id}/historical/`

    const { data } = await api.get(relativeUrl)

    if (data) return data

    return new Error('Erro ao carregar histórico')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
