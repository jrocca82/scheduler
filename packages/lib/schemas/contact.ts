import { z } from "zod";
import { zEmail } from "../api/schema/validation/auth/zEmail";

export enum ContactReasons {
    Work = "work",
    Developer = "developer",
    Meeting = "meet",
    Other = "other"
}

export const contactSchema = z.object({
    email: zEmail,
    name: z.string().min(2).max(30),
    message: z.string().min(2).max(1000),
    reason: z.nativeEnum(ContactReasons)
});

export type ContactFormType = z.infer<typeof contactSchema>;