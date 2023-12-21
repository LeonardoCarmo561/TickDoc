import { SubjectData, SubjectFormData } from '@/@types'
import { api } from '..'

export const SUBJECTS_URL = '/V1/subjects/'

export async function createSubject(
  formData: SubjectFormData,
): Promise<SubjectData | Error> {
  try {
    const relativeUrl = SUBJECTS_URL

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
    const relativeUrl = `${SUBJECTS_URL}${id}/`

    const { data } = await api.patch(relativeUrl, formData)

    if (data) return data
    return new Error('Erro ao atualizar setor')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
