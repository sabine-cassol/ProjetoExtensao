import { z } from 'zod';

function contemTextoReal(html: string): boolean {
    const textoSemTags = html.replace(/<[^>]*>/g, '').trim();
    return textoSemTags.length > 0;
}

export const loginSchema = z.object({
    login: z
        .string()
        .min(1, 'Email é obrigatório')
        .email('Digite um email válido'),
    password: z
        .string()
        .min(6, 'A senha deve conter no mínimo 6 caracteres')
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
        confirmRegRA: z
            .string()
            .min(1, 'Confirmação do RA é obrigatória')
            .regex(/^\d{8}-\d$/, 'RA deve estar no formato correto'),
        regPassword: z
            .string()
            .min(6, 'Senha deve ter pelo menos 8 caracteres'),
        regConfirmPassword: z
            .string()
            .min(1, 'Confirme sua senha')
    })
    .refine((data) => data.regRA === data.confirmRegRA, {
        message: 'Os RAs digitados não coincidem',
        path: ['RegRAConfirm'],
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
        .or(z.literal(''))
        .optional(),
    periodo: z
        .string()
        .min(1, 'Período é obrigatório')
        .refine((val) => Number(val) >= 1 && Number(val) <= 10, {
            message: 'Período deve ser entre 1 e 10'
        })
        .optional()
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

export const noticiaSchema = z.object({
    titulo: z
        .string()
        .min(5, 'Título deve conter pelo menos 5 caracteres')
        .max(254, 'Título muito longo'),
    resumo: z
        .string()
        .min(5, 'Resumo deve conter pelo menos 10 caracteres')
        .max(254, 'Resumo muito longo'),
    conteudo: z
        .string()
        .refine(contemTextoReal, {
            message: 'O conteúdo da notícia não pode ficar vazio'
        })
        .refine((val) => {
            const textoLimpo = val.replace(/<[^>]*>/g, '').trim();
            return textoLimpo.length >= 10;
        }, {
            message: 'O conteúdo deve conter no mínimo 10 caracteres de texto'
        }),
    imagem: z
        .string()
        .min(1, 'Envie uma imagem para a notícia')
});

export type NoticiaFormData = z.infer<typeof noticiaSchema>;

export const atividadeSchema = z
    .object({
        titulo: z
            .string()
            .min(3, 'Título deve ter pelo menos 3 caracteres')
            .max(254, 'Título muito longo'),
        descricao: z
            .string()
            .min(10, 'Descrição deve ter pelo menos 10 caracteres'),
        data: z
            .string()
            .min(1, 'Data é obrigatória'),
        cargaHoraria: z
            .string()
            .min(1, 'Carga horária é obrigatória')
            .refine((val) => {
                const numero = Number(val.replace(',', '.'));
                return !isNaN(numero) && numero > 0;
            }, {
                message: 'Carga horária deve ser um número maior que zero'
            }),
        exigeLocalizacao: z.boolean(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        raioMetros: z.string().optional()
    })
    .superRefine((dados, ctx) => {
        if (!dados.exigeLocalizacao) return;

        if (!dados.latitude || dados.latitude.trim() === '') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Latitude é obrigatória quando a localização é exigida',
                path: ['latitude']
            });
        } else {
            const lat = Number(dados.latitude);
            if (isNaN(lat) || lat < -90 || lat > 90) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Latitude deve ser um número entre -90 e 90',
                    path: ['latitude']
                });
            }
        }

        if (!dados.longitude || dados.longitude.trim() === '') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Longitude é obrigatória quando a localização é exigida',
                path: ['longitude']
            });
        } else {
            const lon = Number(dados.longitude);
            if (isNaN(lon) || lon < -180 || lon > 180) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Longitude deve ser um número entre -180 e 180',
                    path: ['longitude']
                });
            }
        }

        if (!dados.raioMetros || dados.raioMetros.trim() === '') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Raio de tolerância é obrigatório quando a localização é exigida',
                path: ['raioMetros']
            });
        } else {
            const raio = Number(dados.raioMetros);
            if (isNaN(raio) || raio <= 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Raio deve ser um número maior que zero',
                    path: ['raioMetros']
                });
            }
        }
    });

export type AtividadeFormData = z.infer<typeof atividadeSchema>;


const detalheSchema = z
    .string()
    .min(3, "Esse campo deve conter pelo menos 3 caracteres")
    .max(128, "Texto muito longo");

const paragrafoSchema = z
    .string()
    .min(3, 'Esse campo deve conter pelo menos 3 caracteres')
    .max(512, 'Texto muito longo');

export const projetoSchema = z.object({
    titulo: z
        .string()
        .min(3, 'Título deve ter pelo menos 3 caracteres')
        .max(254, 'Título muito longo'),
    cargaHoraria: z.coerce
        .number({
            message: "A carga horária deve ser um número"
        })
        .positive("A carga horária deve ser maior que zero")
        .max(1000, "Carga horária muito alta"),
    vagas: z.coerce
        .number({
            message: "O número de vagas deve ser um número"
        })
        .int("O número de vagas deve ser um número inteiro")
        .min(1, "Deve haver pelo menos 1 vaga")
        .max(10000, "Número de vagas excede o limite"),
    semestre: z
        .string()
        .min(1, "Informe ao menos um semestre")
        .transform((val) =>
            val
                .split(",")
                .map((item) => Number(item.trim().replace('º', '')))
                .filter((num) => !isNaN(num) && num > 0)
        )
        .refine((arr) => arr.length > 0, {
            message: "Selecione ao menos um período",
        }),

    periodoInscricaoInicio: z.string().min(1, 'Data de início da inscrição é obrigatória'),
    periodoInscricaoFim: z.string().min(1, 'Data de fim da inscrição é obrigatória'),
    periodoExecucaoInicio: z.string().min(1, 'Data de início da execução é obrigatória'),
    periodoExecucaoFim: z.string().min(1, 'Data de fim da execução é obrigatória'),
    tipo: detalheSchema,
    unidade: detalheSchema,
    cursosVinculados: detalheSchema,
    parceiros: detalheSchema,
    colaboradores: detalheSchema,
    comunidadeParticipante: detalheSchema,
    ods: detalheSchema,
    ciclo: detalheSchema,
    competencia: detalheSchema,
    eixo: detalheSchema,
    justificativa: paragrafoSchema,
    pretensao: paragrafoSchema,
    requisitos: paragrafoSchema
})
    .superRefine((dados, ctx) => {
        if (dados.periodoInscricaoInicio && dados.periodoInscricaoFim) {
            if (dados.periodoInscricaoInicio > dados.periodoInscricaoFim) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Data de início não pode ser depois da data de fim',
                    path: ['periodoInscricaoFim']
                });
            }
        }

        if (dados.periodoExecucaoInicio && dados.periodoExecucaoFim) {
            if (dados.periodoExecucaoInicio > dados.periodoExecucaoFim) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Data de início não pode ser depois da data de fim',
                    path: ['periodoExecucaoFim']
                });
            }
        }
    });

export type ProjetoFormData = z.infer<typeof projetoSchema>;
