import { HistoricalData } from '@/@types'
import { ICONS_URL, api } from '@/services'

export async function getIconHistorical(
  id: number | string,
): Promise<HistoricalData[] | Error> {
  try {
    const relativeUrl = `${ICONS_URL}${id}/historical/`

    const { data } = await api.get(relativeUrl)

    if (data) return data

    return new Error('Erro ao carregar histórico')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
