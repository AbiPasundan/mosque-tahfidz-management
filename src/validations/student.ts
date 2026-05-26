import { z } from "zod";

export const createStudentSchema = z.object({
  name: z
    .string()
    .min(1, "Student name is required")
    .max(100, "Name must be under 100 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be under 50 characters")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Username can only contain letters, numbers, dots, and underscores"
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  age: z
    .number({ message: "Age is required" })
    .min(5, "Minimum age is 5 years")
    .max(25, "Maximum age is 25 years"),
  learning_level: z.string().min(1, "Learning level is required"),
  contact: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^[0-9+\-\s()]+$/, "Contact must be a valid phone number"),
  status: z.string().min(1, "Status is required"),
});

export type CreateStudentFormValues = z.infer<typeof createStudentSchema>;
