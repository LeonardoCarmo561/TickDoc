import { TotalCount, GroupingData, GroupingsFormData } from '@/@types'
import { api } from '..'

export async function getAllGroupings(
  item = '0',
  total = '10',
  search = '',
  institutionId = '',
): Promise<TotalCount<GroupingData> | Error> {
  try {
    const relativeUrl = '/V1/groupings/'

    const { data } = await api.get(relativeUrl, {
      params: {
        institution_id: institutionId,
        item,
        search,
        total,
      },
    })

    if (data) return data

    return new Error('Erro ao carregar agrupamentos')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function getGrouping(
  id: number | string,
): Promise<GroupingData | Error> {
  try {
    const relativeUrl = `/V1/groupings/${id}/`

    const { data } = await api.get(relativeUrl)

    if (data) return data

    return new Error('Erro ao carregar agrupamento')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function createGrouping(
  formData: GroupingsFormData,
): Promise<GroupingData | Error> {
  try {
    const relativeUrl = '/V1/groupings/'

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
    const relativeUrl = `/V1/groupings/${id}/`

    const { data } = await api.patch(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao atualizar agrupamentos')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
