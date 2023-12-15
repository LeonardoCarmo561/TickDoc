import { z } from 'zod'

export const subjectsFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Insira pelo menos 3 caracteres')
    .max(255, 'Limite de caracteres atingido (255)'),
  institution_id: z.number().positive(),
  sectors: z.array(z.number().positive()).default([]),
  status: z.boolean().default(false),
})
