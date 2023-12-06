import { z } from 'zod'

const MAX_FILE_SIZE = 5242880

export const iconsFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Insira pelo menos 3 caracteres')
    .max(20, 'Limite de caracteres excedido (20)'),
  icon: z
    .any()
    .refine((file) => file[0], 'A imagem é obrigatória')
    .refine(
      (file) => file[0]?.size <= MAX_FILE_SIZE,
      'Tamanho máximo permitido: 5MB.',
    )
    .refine(
      (file) => file[0]?.type.includes('image/'),
      'Apenas imagens no formato .jpg, .jpeg, .png e .webp são suportadas',
    )
    .transform((files) => files[0])
    .optional(),
  status: z.boolean().default(false),
})
