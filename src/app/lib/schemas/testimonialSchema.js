import { stat } from "fs";
import z from "zod";

export const testimonialSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    message: z.string().min(10).max(500),
    image: z
        .array(z.string().url({ message: 'image must be a valid URL' }))
        .min(1, 'At least one image is required')
        .max(1, 'Only one image is required'),
    status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
    creditedAt: z.string().optional(),
    updatedAt: z.string().optional(),
});
