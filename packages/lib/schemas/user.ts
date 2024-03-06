import { z } from "zod";

export const profileSchema = z
  .object({
    name: z.string({ required_error: "Please choose a display name." }).min(2).optional(),
    bio: z.string({ required_error: "Please include a short bio." }).min(2).max(300).optional(),
  })
