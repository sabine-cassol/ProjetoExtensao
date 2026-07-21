export interface Atividade {
    id: number;
    titulo: string;
    descricao: string;
    data: string;
    cargaHoraria: number;
    exigeLocalizacao: boolean;
    projetoId: number;
    ativo: boolean;
    projeto: {
        titulo: string;
    };
}