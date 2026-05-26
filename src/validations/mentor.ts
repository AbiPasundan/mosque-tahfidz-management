import { z } from "zod";

export const createMentorSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Mentor name is required" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(50, { message: "Password must be under 50 characters" }),
  role: z.enum(["mentor", "admin"], {
    message: "Role must be either 'mentor' or 'admin'",
  }),
});

export type CreateMentorFormValues = z.infer<typeof createMentorSchema>;
