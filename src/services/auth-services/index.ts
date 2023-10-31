import { LoginFormData } from '@/@types'
import { Environmnet, getCSRFToken } from '@/utils'

export async function loginAdminUser(formData: LoginFormData) {
  const result = await fetch(`${Environmnet.URL_BASE}/V2/api/token/`, {
    body: JSON.stringify(formData),
    credentials: 'include',
    headers: {
      'X-CSRFToken': getCSRFToken(),
    },
  })

  const data = await result.json()

  return data
}
