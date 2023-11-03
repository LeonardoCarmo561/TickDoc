import { Environment, getCSRFToken } from '@/utils'
import axios from 'axios'
import { errorInterceptor, responseInterceptor } from './interceptors'

export const api = axios.create({
  baseURL: Environment.URL_BASE,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  headers: {
    common: {
      'X-CSRFToken': getCSRFToken(),
    },
  },
})

export const externalApi = axios.create({
  baseURL: Environment.URL_BASE,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-Csrftoken',
  headers: {
    common: {
      'X-CSRFToken': getCSRFToken(),
    },
  },
})

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  async (error) => {
    const originalRequest = error.config

    if (error.response) {
      if (
        error.response.status === 401 &&
        error.response.data?.code === 'token_not_valid'
      ) {
        try {
          const { data } = await axios.post(
            `${Environment.URL_BASE}/V1/api/token/refresh/`,
            {},
            {
              withCredentials: true,
            },
          )

          if (data) return api(originalRequest)
        } catch {
          return errorInterceptor(error)
        }
      }
    }
  },
)
