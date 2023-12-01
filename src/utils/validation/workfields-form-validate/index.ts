import { z } from 'zod'

export const workFieldFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Insira pelo menos 3 caracteres')
    .max(255, 'Limite de caracteres atingido (255)'),
})
