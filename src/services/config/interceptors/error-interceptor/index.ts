import { AxiosError } from 'axios'

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de Conexão'))
  }

  if (error.message === 'Request failed with status code 400') {
    try {
      const data = error.response?.data as { detail: string }
      if (data.detail) return Promise.reject(new Error(data.detail))

      return Promise.reject(error.response?.data)
    } catch {
      return Promise.reject(error.response?.data)
    }
  }

  if (error.message === 'Request failed with status code 401') {
    const data = error.response?.data as { detail: string }

    return Promise.reject(new Error(data.detail))
  }

  if (error.message === 'Request failed with status code 403') {
    const data = error.response?.data as { detail: string }

    return Promise.reject(new Error(data.detail))
  }

  if (error.message === 'Request failed with status code 404') {
    const data = error.response?.data as { detail: string }

    return Promise.reject(new Error(data.detail))
  }

  if (error.message === 'Request failed with status code 405') {
    const data = error.response?.data as { detail: string }

    return Promise.reject(new Error(data.detail))
  }

  if (error.message === 'Request failed with status code 500') {
    const data = error.response?.data as { detail: string }

    return Promise.reject(
      new Error(data.detail || 'Erro interno. Tente novamente mais tarde'),
    )
  }

  return Promise.reject(error)
}
