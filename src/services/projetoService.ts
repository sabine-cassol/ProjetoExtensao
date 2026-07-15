import { type Projeto } from "@/data/ProjectType";

export const projetoService = {

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
            credentials: 'include' // rota protegida (professor)
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
