import { z } from 'zod'

export const sectorsFormSchema = z.object({
  institution_id: z.number().positive(),
  name: z.string().min(3).max(255),
  grouping_id: z.number().positive(),
  status: z.boolean().default(false),
})
