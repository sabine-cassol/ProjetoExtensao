import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { type Noticia } from '@/data/NewType';

const API_URL = import.meta.env.VITE_API_URL_PROXY || '/api';

export interface CriarNoticiaPayload {
    titulo: string;
    resumo?: string;
    conteudo: string;
    imageUrl?: string;
}

export const noticiaService = {
    criar: async (dados: CriarNoticiaPayload): Promise<Noticia> => {
        const res = await fetch(`${API_URL}/noticias`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!res.ok) {
            const erro = await res.json().catch(() => null);
            throw new Error(erro?.erro || 'Erro ao criar notícia');
        }

        return res.json();
    },
    listarTodas: async (): Promise<Noticia[]> => {
        const res = await fetch(`${API_URL}/noticias/todas`);
        if (!res.ok) {
            const erro = await res.json().catch(() => null);
            throw new Error(erro?.erro || 'Erro ao buscar notícias');
        }

        return res.json();
    },

    buscarPorId: async (noticiaId: string | number): Promise<Noticia> => {
        const res = await fetch(`${API_URL}/noticias/id/${noticiaId}`);
        if (!res.ok) {
            const erro = await res.json().catch(() => null);
            throw new Error(erro?.erro || 'Erro ao buscar notícia');
        }
        return res.json();
    },

    atualizar: async ({ id, dados }: { id: string | number; dados: Partial<Noticia> }): Promise<Noticia> => {
        const res = await fetch(`${API_URL}/noticias/id/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        if (!res.ok) {
            const erro = await res.json().catch(() => null);
            throw new Error(erro?.erro || 'Erro ao atualizar notícia');
        }
        return res.json();
    },

    deletar: async (noticiaId: string | number) => {
        const res = await fetch(`${API_URL}/noticias/id/${noticiaId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (!res.ok) {
            const erro = await res.json().catch(() => null);
            throw new Error(erro?.erro || 'Erro ao deletar notícia');
        }
        return res.json();
    }
};

export function useCriarNoticia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dados: CriarNoticiaPayload) => noticiaService.criar(dados),
    onSuccess: () => {
      // Invalida a lista de notícias para refletir a nova publicação
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
    }
  });
}

export function useNoticias() {
    return useQuery<Noticia[]>({
        queryKey: ['noticias'],
        queryFn: noticiaService.listarTodas,
        staleTime: 5 * 60 * 1000
    });
}

export function useNoticiaId(noticiaId?: string | number) {
    return useQuery<Noticia>({
        queryKey: ['noticia', noticiaId],
        queryFn: () => noticiaService.buscarPorId(noticiaId!),
        enabled: !!noticiaId
    });
}

export function useAtualizarNoticia(noticiaId: string | number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dados: Partial<Noticia>) => noticiaService.atualizar({ id: noticiaId, dados }),
        onSuccess: (noticiaAtualizada) => {
            queryClient.setQueryData(['noticia', noticiaId], noticiaAtualizada);
            queryClient.invalidateQueries({ queryKey: ['noticias'] });
        }
    });
}

export function useDeletarNoticia(noticiaId: string | number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => noticiaService.deletar(noticiaId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['noticias'] });
        }
    });
}
