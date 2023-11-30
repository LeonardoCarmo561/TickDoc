import { TotalCount, WorkFieldData } from '@/@types'
import { api } from '../config'

export async function getAllWorkFields(
  item = '0',
  total = '10',
  search = '',
): Promise<TotalCount<WorkFieldData> | Error> {
  try {
    const relativeUrl = '/V1/workfields/'

    const { data } = await api.get(relativeUrl, {
      params: {
        item,
        total,
        search,
      },
    })

    if (data) return data

    return new Error('Erro ao carregar ramos de atividade')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
