import { isCNPJ, isCPF } from 'brazilian-values'
import { z } from 'zod'

export const managersFormSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Insira pelo menos 3 caracteres')
      .max(255, 'Limite de caracteres excedido (255)'),
    email: z
      .string()
      .email()
      .min(5, 'Insira pelo menos 5 caracteres')
      .max(255, 'Limite de caracteres excedido (255)'),
    document_type: z
      .number()
      .min(1, 'Insira uma opção válida')
      .max(2, 'Insira uma opção válida')
      .default(1),
    document_number: z.string(),
    is_active: z.boolean().default(false),
    birth_date: z.string().optional(),
    institution_id: z.number().default(1),
  })
  .refine(
    (data) =>
      (data.document_type === 1 && isCPF(data.document_number)) ||
      (data.document_type === 2 && isCNPJ(data.document_number)),
    {
      message: 'Documento Inválido',
      path: ['document_nunmber'],
    },
  )
