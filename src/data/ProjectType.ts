export interface Projeto {
    id: string;
    titulo: string;
    justificativa: string;
    pretensao: string;
    requisitos: string;
    detalhes: string;
    responsavel: string;
    cargaHoraria: string;
    tipo: string;
    unidade: string;
    cursosVinculados: string;
    parceiros: string;
    colaboradores: string;
    comunidadeParticipante: string;
    semestre: string;
    vagas: string;
    ods: string;
    competencia: string;
    eixo: string;
    ciclo: string;
    numEncontros: string;
    periodoInscricao: string;
    periodoExecucao: string
    ativo: boolean;
    professorId: number;
    professor: {
        nome: string
    };
}