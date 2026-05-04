import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
            'Password must contain uppercase, lowercase, number, and special character'
        ),
    confirmPassword: z.string().min(1, 'Confirm password is required'),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;