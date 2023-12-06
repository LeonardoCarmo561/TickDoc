import { IconData, IconsFormData, TotalCount } from '@/@types'
import { api } from '..'

export async function getAllIcons(
  item = '0',
  total = '10',
  search = '',
): Promise<TotalCount<IconData> | Error> {
  try {
    const relativeUrl = '/V1/icons/'

    const { data } = await api.get(relativeUrl, {
      params: {
        item,
        total,
        search,
      },
    })

    if (data) return data

    return new Error('Erro ao carregar ícones')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function getIcon(id: number | string): Promise<IconData | Error> {
  try {
    const relativeUrl = `/V1/icons/${id}/`

    const { data } = await api.get(relativeUrl)

    if (data) return data

    return new Error('Erro carregar ícone')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function createIcon(
  formData: IconsFormData,
): Promise<IconData | Error> {
  try {
    const relativeUrl = '/V1/icons/'

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
    const relativeUrl = `/V1/icons/${id}/`

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
