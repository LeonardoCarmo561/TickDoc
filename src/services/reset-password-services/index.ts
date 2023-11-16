import {
  ResetPasswordFormData,
  ResetPasswordTokenFormData,
} from '@/@types/rese-password'
import { api } from '../config'

export async function resetPassword(formData: ResetPasswordFormData) {
  try {
    const relativeUrl = '/V1/api/users/reset_password/'

    const { data } = await api.post(relativeUrl, formData)

    if (data) return data
    return new Error('Erro ao enviar e-mail')
  } catch (error) {
    return new Error((error as { message: string }).message)
  }
}

export async function resetPasswordToken(formData: ResetPasswordTokenFormData) {
  try {
    const relativeUrl = ``
  } catch (error) {}
}
