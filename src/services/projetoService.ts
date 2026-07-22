import { type Projeto } from "@/data/ProjectType";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; 

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

    async buscarProjetos(): Promise<Projeto[]> {
        const response = await fetch('/api/projetos/todos');

        if (!response.ok) {
            const erro = await response.json();
            throw new Error(erro.erro || 'Erro ao buscar projetos');
        }
        return response.json()
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

export function useProjetos() {
    return useQuery({
        queryKey: ['projetos'],
        queryFn: () => projetoService.buscarProjetos(),
        staleTime: 5 * 60 * 1000
    })
}

export function useCriarProjeto(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (dados: NovoProjeto) => projetoService.criar(dados),
    onSuccess: (projetoCriado) => {
      // Invalida a lista para buscar os dados atualizados
      queryClient.invalidateQueries({ queryKey: ['projetos'] });
      
      toast.success("Projeto criado com sucesso!");

      if (onSuccessCallback) {
        onSuccessCallback();
      }

      // Redireciona para a tela do projeto recém-criado
      navigate(`/Projetos/${projetoCriado.id}`);
    },
    onError: (erro: Error) => {
      toast.error(erro.message || "Erro ao criar projeto");
    }
  });
}

export function useProjetoMutations(projetoId: string, setIsEditing?: (value: boolean) => void) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const atualizarMutation = useMutation({
        mutationFn: (dados: Partial<Projeto>) =>
            projetoService.atualizar(projetoId, dados),
        onSuccess: (projetoAtualizado) => {
            queryClient.setQueryData(['projeto', projetoId], projetoAtualizado);
            queryClient.invalidateQueries({ queryKey: ['projetos'] });

            if (setIsEditing) setIsEditing(false);
            toast.success("Projeto atualizado com sucesso!");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao atualizar projeto");
        }
    });

    const deletarMutation = useMutation({
        mutationFn: () => projetoService.desativar(projetoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projetos'] });
            toast.success("Projeto deletado com sucesso!");
            navigate("/Projetos");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao deletar projeto");
        }
    });

    const ativarMutation = useMutation({
        mutationFn: () => projetoService.ativar(projetoId),
        onSuccess: (projetoAtualizado) => {
            queryClient.setQueryData(['projeto', projetoId], projetoAtualizado);
            queryClient.invalidateQueries({ queryKey: ['projetos'] });
            toast.success("Projeto reativado com sucesso!");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao reativar projeto");
        }
    });

    return {
        atualizarMutation,
        deletarMutation,
        ativarMutation
    };
}