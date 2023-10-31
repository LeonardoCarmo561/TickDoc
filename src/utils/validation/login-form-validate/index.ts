import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  client_ip: z.string(),
})
