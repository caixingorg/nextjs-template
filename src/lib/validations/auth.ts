import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
})

export type LoginData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
})

export type RegisterData = z.infer<typeof registerSchema>