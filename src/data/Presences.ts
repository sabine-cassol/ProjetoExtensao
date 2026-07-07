export interface Presence {
    id: string;
    aluno: string;
    projeto: string;
    data: string;
    entrada: string;
    saida: string;
    status: string;
}

export const PRESENCES: Presence[] = [
    {
        id: '1',
        aluno: 'Ana Oliveira',
        projeto: "Computação para a vida",
        data: '01/02/2025',
        entrada: "10:30",
        saida: "11:30",
        status: "Análise",
    },
    {
        id: '2',
        aluno: 'Ana Oliveira',
        projeto: "Computação para a vida",
        data: '08/02/2025',
        entrada: "10:30",
        saida: "11:30",
        status: "Análise",
    }
]