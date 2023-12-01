import { TotalCount, WorkFieldData, WorkFieldsFormData } from '@/@types'
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

export async function createWorkField(
  formData: WorkFieldsFormData,
): Promise<WorkFieldData | Error> {
  try {
    const relativeUrl = '/V1/workfields/'

    const { data } = await api.post(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao criar Ramo de Atividade')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function updateWorkField(
  id: number | string,
  formData: WorkFieldsFormData,
): Promise<WorkFieldData | Error> {
  try {
    const relativeUrl = `/V1/workfields/${id}/`

    const { data } = await api.patch(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao atualizar Ramo de Atividade')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
