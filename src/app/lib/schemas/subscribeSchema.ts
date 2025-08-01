import z, { email } from "zod";

export const SubscribeSchema = z.object({
    email: z.string().email("Invalid email address"),
})