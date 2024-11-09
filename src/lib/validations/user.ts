import * as z from "zod"

export const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not be longer than 500 characters.",
  }).optional(),
  image: z.string().url({
    message: "Please enter a valid URL.",
  }).optional(),
})

export type ProfileData = z.infer<typeof profileSchema>