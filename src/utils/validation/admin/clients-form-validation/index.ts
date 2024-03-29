import { isCNPJ } from 'brazilian-values'
import { z } from 'zod'

// const MAX_FILE_SIZE = 5242880
// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp',
// ]

export const clientsFormSchema = z.object({
  name: z
    .string({ description: 'Insira o título' })
    .min(3, 'Insira pelo menos 3 caracteres')
    .max(50, 'Limite de caracteres atingido (50)'),
  cnpj: z
    .string({ description: 'Insira o CNPJ' })
    .length(18, 'CNPJ Inválido')
    .refine((cnpj) => isCNPJ(cnpj), 'CNPJ Inválido'),
  prefix: z
    .string({ description: 'Insira o prefixo' })
    .min(3, 'Insira pelo menos 3 caracteres')
    .max(10, 'Limite de 10 caracteres')
    .transform((value) => value.toUpperCase()),
  work_field: z
    .number({ description: 'Insira o ramo de atividade' })
    .refine((value) => !isNaN(Number(value)), 'Insira uma opção válida')
    .transform((value) => Number(value)),
  address: z.string().max(255, 'Limite de 255 caracteres').optional(),
  modules: z.array(z.string()),
  status: z.boolean().default(false),

  ombudsman_title: z.string().optional(),
  ombudsman_email: z.string().optional(),
  slug: z.string().max(10).optional(),
  contact_name: z.string().optional(),
  working_hour: z.string().optional(),
  ombudsan_plan: z
    .string()
    .refine((value) => !isNaN(Number(value)), 'Insira uma opção válida')
    .refine(
      (value) => Number(value) >= 1 && Number(value) <= 2,
      'Insira uma opção válida',
    )
    .transform((value) => Number(value)),
  client_type: z
    .number()
    .default(1)
    .refine((value) => !isNaN(Number(value)), 'Insira uma opção válida')
    .refine(
      (value) => Number(value) >= 1 && Number(value) <= 2,
      'Insira uma opção válida',
    )
    .transform((value) => Number(value)),
  ombudsman_expires_at: z.string().optional(),
  separator_ov: z.string().optional(),
  anonymous: z.boolean().default(false),
  general_informations: z.boolean().default(false),
  notify_sectors: z.boolean().default(false),
  activate_sms: z.boolean().default(false),
  sms_quantity: z.string().optional(),
  phones: z
    .array(
      z.object({
        title: z.string().min(2),
        number: z.string(),
      }),
    )
    .default([]),
  cellphones: z
    .array(
      z.object({
        title: z.string().min(2),
        number: z.string(),
      }),
    )
    .default([]),
})
