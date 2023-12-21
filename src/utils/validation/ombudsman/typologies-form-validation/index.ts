import { z } from 'zod'

export const typologiesFormSchema = z.object({
  name: z.string().min(3, 'Insira pelo menos 3 caracteres'),
  status: z.boolean().default(false),
  institution_id: z.number().positive(),
})
