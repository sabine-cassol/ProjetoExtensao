export interface Atividade {
    id: number;
    titulo: string;
    descricao: string;
    data: string;
    cargaHoraria: number;
    exigeLocalizacao: boolean;
    latitude: number | null;
    longitude: number | null;
    raioMetros: number | null;
    projetoId: number;
    ativo: boolean;
    projeto: {
        titulo: string;
    };
}