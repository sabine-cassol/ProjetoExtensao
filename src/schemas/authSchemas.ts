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

export const CURSOS_DISPONIVEIS = [
    'Engenharia de Software',
    'Análise e desenvolvimento de sistemas',
    'Engenharia Civil',
    'Administração',
    'Psicologia',
] as const;


export const profileSchema = z.object({
    nome: z
        .string()
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(254, 'Nome muito longo')
        .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome não pode conter números ou símbolos'),
    curso: z
        .string()
        .min(1, 'Curso é obrigatório')
        .optional()
        .or(z.literal('')),
    periodo: z
        .string()
        .min(1, 'Período é obrigatório')
        .refine((val) => Number(val) >= 1 && Number(val) <= 10, {
            message: 'Período deve ser entre 1 e 10'
        })
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const passwordSchema = z
    .object({
        password: z
            .string()
            .min(8, 'Senha deve ter pelo menos 8 caracteres'),
        confirmPassword: z
            .string()
            .min(1, 'Confirme a nova senha')
    })
    .refine((dados) => dados.password === dados.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword']
    });

export type PasswordFormData = z.infer<typeof passwordSchema>;