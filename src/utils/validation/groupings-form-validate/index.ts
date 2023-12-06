import { z } from 'zod'

export const groupingsFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Insira pelo menos 3 caracteres')
    .max(255, 'Limite de caracteres atingido (255)'),
  icon: z.number().positive(),
  status: z.boolean().default(false),
  institution_id: z.number().positive(),
})
