import { isCNPJ } from 'brazilian-values'
import { z } from 'zod'

const MAX_FILE_SIZE = 5242880
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const clientsFormSchema = z.object({
  logo: z
    .any()
    .refine((file) => file[0], 'A logo é obrigatória')
    .refine(
      (file) => file[0]?.size <= MAX_FILE_SIZE,
      'Tamanho máximo permitido: 5MB.',
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      'Apenas imagens no formato .jpg, .jpeg, .png e .webp são suportadas',
    )
    .transform((files) => files[0]),
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
    .string({ description: 'Insira o ramo de atividade' })
    .refine((value) => !isNaN(Number(value)), 'Insira uma opção válida')
    .transform((value) => Number(value)),
  address: z.string().max(255, 'Limite de 255 caracteres').optional(),
  modules: z.array(z.string()),
  status: z.boolean().default(false),

  ombudsman_title: z.string().optional(),
  ombudsman_email: z.string().email().max(255).min(5).optional(),
  slug: z.string().max(10).optional(),
  contact_name: z.string().optional(),
  working_hour: z.string().optional(),
})
