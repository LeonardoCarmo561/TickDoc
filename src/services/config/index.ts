import { Environmnet } from '@/utils'
import axios from 'axios'
import { errorInterceptor, responseInterceptor } from './interceptors'

export const api = axios.create({
  baseURL: Environmnet.URL_BASE,
  xsrfCookieName: 'X-CSRFToken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
})

export const externalApi = axios.create({
  baseURL: Environmnet.URL_BASE,
  xsrfCookieName: 'X-CSRFToken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: false,
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
            `${Environmnet.URL_BASE}/V1/api/token/refresh/`,
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
