import { HistoricalData } from '@/@types'
import { ADMIN_USERS_URL, api } from '@/services'

export async function getManagerHistorical(
  id: number | string,
): Promise<HistoricalData[] | Error> {
  try {
    const relativeUrl = `${ADMIN_USERS_URL}${id}/historical/`

    const { data } = await api.get(relativeUrl)

    if (data) return data

    return new Error('Erro ao carregar histórico')
  } catch (error) {
    return new Error((error as { messgae: string }).messgae)
  }
}
