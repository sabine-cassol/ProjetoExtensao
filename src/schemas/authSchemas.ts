import { z } from 'zod';

export const loginSchema = z.object({
    login: z
        .string()
        .min(1, 'Email é obrigatório')
        .email('Digite um email válido'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória')
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        regEmail: z
            .string()
            .min(1, 'Email é obrigatório')
            .email('Digite um email válido'),
        regName: z
            .string()
            .min(3, 'Nome deve ter pelo menos 3 caracteres')
            .max(254, 'Nome muito longo'),
        regRA: z
            .string()
            .min(1, 'RA é obrigatório')
            .regex(/^\d{8}-\d$/, 'RA deve estar no formato correto'),
        regPassword: z
            .string()
            .min(8, 'Senha deve ter pelo menos 8 caracteres'),
        regConfirmPassword: z
            .string()
            .min(1, 'Confirme sua senha')
    })
    .refine((dados) => dados.regPassword === dados.regConfirmPassword, {
        message: 'As senhas não coincidem',
        path: ['regConfirmPassword']
    });

export type RegisterFormData = z.infer<typeof registerSchema>;