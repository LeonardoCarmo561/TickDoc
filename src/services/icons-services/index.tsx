import { IconData, IconsFormData } from '@/@types'
import { api } from '..'

export const ICONS_URL = '/V1/icons/'

export async function createIcon(
  formData: IconsFormData,
): Promise<IconData | Error> {
  try {
    const relativeUrl = ICONS_URL

    const { data } = await api.post(relativeUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (data) return data

    return new Error('Erro ao criar ícone')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function updateIcon(
  id: number | string,
  formData: IconsFormData,
): Promise<IconData | Error> {
  try {
    const relativeUrl = `${ICONS_URL}${id}/`

    const { data } = await api.patch(relativeUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (data) return data

    return new Error('Erro ao editar ícone')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}
