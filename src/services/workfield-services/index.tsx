import { WorkFieldData, WorkFieldsFormData } from '@/@types'
import { api } from '../config'

export const WORKFIELDS_URL = '/V1/workfields/'

export async function createWorkField(
  formData: WorkFieldsFormData,
): Promise<WorkFieldData | Error> {
  try {
    const relativeUrl = WORKFIELDS_URL

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
    const relativeUrl = `${WORKFIELDS_URL}${id}/`

    const { data } = await api.patch(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao atualizar Ramo de Atividade')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
