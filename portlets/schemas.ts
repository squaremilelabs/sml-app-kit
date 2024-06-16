import { z } from "zod"

export const PortletSessionRecipientSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email("Invalid email"),
  phoneNumber: z
    .string()
    .max(14, "Invalid phone number")
    .regex(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Invalid phone number")
    .nullable(),
})
