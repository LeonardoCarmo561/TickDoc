import { z } from 'zod'

export const clientsFormSchema = z.object({
  ombudsman_title: z
    .string({ description: 'Insira o título' })
    .min(6, 'Insira pelo menos 6 caracteres')
    .max(50, 'Limite de caracteres atingido (50)'),
})
