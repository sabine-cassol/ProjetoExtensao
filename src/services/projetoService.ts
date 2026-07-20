import { type Projeto } from "@/data/ProjectType";

export interface NovoProjeto {
  titulo: string;
  tipo: string;
  unidade: string;
  cargaHoraria: string;
  cursosVinculados: string;
  parceiros: string;
  colaboradores: string;
  comunidadeParticipante: string;
  semestre: string;
  vagas: string;
  ods: string;
  ciclo: string;
  competencia: string;
  eixo: string;
  periodoInscricao: string;
  periodoExecucao: string;
  justificativa: string;
  pretensao: string;
  requisitos: string;
}

export const projetoService = {
    async criar(dados: NovoProjeto): Promise<Projeto> {
        const res = await fetch(`api/projetos`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!res.ok) {
            const erro = await res.json().catch(() => null);
            throw new Error(erro?.erro || 'Erro ao criar projeto');
        }

        return res.json();
    },

    async listarPorProfessor(professorId: string): Promise<Projeto[]> {
        const res = await fetch(`/api/projetos/professor/${professorId}`, {
            credentials: 'include'
        });

        if (!res.ok) {
            const erro = await res.json();
            throw new Error(erro.erro || 'Erro ao buscar projetos do professor');
        }

        return res.json();
    },

    async atualizar(id: string, dados: Partial<Projeto>): Promise<Projeto> {
        const res = await fetch(`/api/projetos/id/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!res.ok) {
            const erro = await res.json();
            throw new Error(erro.erro || 'Erro ao atualizar projeto');
        }

        return res.json();
    },
    async desativar(id: string): Promise<Projeto> {
        const res = await fetch(`/api/projetos/desativar/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!res.ok) {
            const erro = await res.json();
            throw new Error(erro.erro || 'Erro ao deletar projeto');
        }

        return res.json();
    },
    async ativar(id: string): Promise<Projeto> {
        const res = await fetch(`/api/projetos/ativar/${id}`, {
            method: 'PUT',
            credentials: 'include'
        });

        if (!res.ok) {
            const erro = await res.json();
            throw new Error(erro.erro || 'Erro ao reativar projeto');
        }

        return res.json();
    }
};
