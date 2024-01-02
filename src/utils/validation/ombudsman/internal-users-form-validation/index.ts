import {
  formatToCNPJ,
  formatToCPF,
  isCNPJ,
  isCPF,
  isCPFOrCNPJ,
} from 'brazilian-values'
import { z } from 'zod'

export const internalUsersFormSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Insira pelo menos 3 caracteres')
      .max(255, 'Limite de caracteres excedido (255)'),
    email: z.string().email('Insira um e-mail válido'),
    document_type: z.number().positive().optional(),
    document_number: z.string().refine((value) => isCPFOrCNPJ(value)),
    is_active: z.boolean().default(false),
    hr_manager: z.boolean().default(false),
    modules: z.array(z.string()).default([]),
  })
  .refine(
    (data) =>
      !data.document_number ||
      (data.document_type === 1 && isCPF(data.document_number)),
    'CPF inválido',
  )
  .refine(
    (data) =>
      !data.document_number ||
      (data.document_type === 2 && isCNPJ(data.document_number)),
    'CNPJ inválido',
  )
  .transform((data) => ({
    ...data,
    document_number:
      data.document_type === 1
        ? formatToCPF(data.document_number)
        : data.document_type === 2
        ? formatToCNPJ(data.document_number)
        : data.document_number,
  }))
