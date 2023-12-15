import { SubjectData, SubjectFormData, TotalCount } from '@/@types'
import { api } from '..'

export async function getAllSubjects(
  item = '0',
  total = '10',
  search = '',
): Promise<TotalCount<SubjectData> | Error> {
  try {
    const relativeUrl = '/V1/subjects/'

    const { data } = await api.get(relativeUrl, {
      params: {
        item,
        total,
        search,
      },
    })

    if (data) return data

    return new Error('Erro ao carregar assuntos')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function getSubject(
  id: number | string,
): Promise<SubjectData | Error> {
  try {
    const relativeUrl = `/V1/subjects/${id}/`

    const { data } = await api.get(relativeUrl)

    if (data) return data
    return new Error('Erro ao carregar setor')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function createSubject(
  formData: SubjectFormData,
): Promise<SubjectData | Error> {
  try {
    const relativeUrl = '/V1/subjects/'

    const { data } = await api.post(relativeUrl, formData)

    if (data) return data

    return new Error('Erro ao criar assunto')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function updateSubject(
  id: number | string,
  formData: SubjectFormData,
): Promise<SubjectData | Error> {
  try {
    const relativeUrl = `/V1/subjects/${id}/`

    const { data } = await api.patch(relativeUrl, formData)

    if (data) return data
    return new Error('Erro ao atualizar setor')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
