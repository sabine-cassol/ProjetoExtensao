import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL_PROXY || '/api';

export const inscricaoService = {
    listarMinhasInscricoes: async () => {
        const res = await fetch(`${API_URL}/inscricoes/alunos/me/inscricoes`, {
            credentials: 'include'
        });

        if (!res.ok) {
            const erro = await res.json().catch(() => null);
            throw new Error(erro?.erro || 'Erro ao buscar inscrições');
        }

        return res.json();
    },

    inscrever: async (projetoId: string | number) => {
        const res = await fetch(`${API_URL}/inscricoes/projetos/${projetoId}/inscricoes`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            const erro = await res.json().catch(() => null);
            throw new Error(erro?.error || erro?.erro || 'Erro ao se inscrever');
        }

        return res.json();
    }
};

export function useMinhasInscricoes(userId?: string, role?: string) {
    return useQuery({
        queryKey: ['inscricoes', 'minhas', userId],
        queryFn: inscricaoService.listarMinhasInscricoes,
        enabled: role === 'student' && !!userId
    });
}

export function useInscreverProjeto(projetoId: string | number, userId?: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => inscricaoService.inscrever(projetoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inscricoes', 'minhas', userId] });
            queryClient.invalidateQueries({ queryKey: ['projeto', 'alunos', String(projetoId)] });
        }
    });
}