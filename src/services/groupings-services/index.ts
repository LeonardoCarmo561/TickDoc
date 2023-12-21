import { GroupingData, GroupingsFormData } from '@/@types'
import { api } from '..'

export const GROUPINGS_URL = '/V1/groupings/'

export async function createGrouping(
  formData: GroupingsFormData,
): Promise<GroupingData | Error> {
  try {
    const relativeUrl = GROUPINGS_URL

    const { data } = await api.post(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao criar agrupamento')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function updateGrouping(
  id: number | string,
  formData: GroupingsFormData,
): Promise<GroupingData | Error> {
  try {
    const relativeUrl = `${GROUPINGS_URL}${id}/`

    const { data } = await api.patch(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao atualizar agrupamentos')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
