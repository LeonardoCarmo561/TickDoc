import { z } from 'zod'

export const resetPasswordFormSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
})

export const resetPasswordTokenFormSchema = z
  .object({
    password: z.string().min(6, 'Digite pelo menos 6 caracteres'),
    re_password: z.string().min(6, 'Digite pelo menos 6 caracteres'),
    token: z.string().length(45, 'Token Inválido'),
  })
  .refine((data) => data.password === data.re_password, {
    message: 'As senhas não coincidem',
    path: ['re_password'],
  })
