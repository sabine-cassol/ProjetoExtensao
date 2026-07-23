import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner'; // ou sua biblioteca de toast
import { type Atividade } from '@/data/AtividadeType';

interface AtividadePayload {
    titulo: string;
    descricao: string;
    data: string;
    cargaHoraria: number;
    exigeLocalizacao: boolean;
    latitude?: number;
    longitude?: number;
    raioMetros?: number;
    projetoId: number;
}

export const atividadeService = {
  async listarPorProjeto(projetoId: string | number): Promise<Atividade[]> {
    const res = await fetch(`/api/atividades/projeto/${projetoId}`, {
      credentials: 'include'
    });

    if (!res.ok) {
      const erro = await res.json().catch(() => null);
      throw new Error(erro?.erro || 'Erro ao buscar atividades');
    }

    const dados: Atividade[] = await res.json();
    return dados.sort((a, b) => Number(b.ativo) - Number(a.ativo));
  },

  async criar(dados: AtividadePayload): Promise<Atividade> {
    const res = await fetch('/api/atividades', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (!res.ok) {
      const erro = await res.json().catch(() => null);
      throw new Error(erro?.erro || 'Erro ao criar atividade');
    }

    return res.json();
  },

  async atualizar(id: number, dados: Partial<AtividadePayload>): Promise<Atividade> {
    const res = await fetch(`/api/atividades/id/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (!res.ok) {
      const erro = await res.json().catch(() => null);
      throw new Error(erro?.erro || 'Erro ao atualizar atividade');
    }

    return res.json();
  },

  async desativar(id: number): Promise<Atividade> {
    const res = await fetch(`/api/atividades/desativar/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!res.ok) {
      const erro = await res.json().catch(() => null);
      throw new Error(erro?.erro || 'Erro ao desativar atividade');
    }
    return res.json();
  },

  async ativar(id: number): Promise<Atividade> {
    const res = await fetch(`/api/atividades/ativar/${id}`, {
      method: 'PUT',
      credentials: 'include'
    });

    if (!res.ok) {
      const erro = await res.json().catch(() => null);
      throw new Error(erro?.erro || 'Erro ao reativar atividade');
    }

    return res.json();
  }
};


export function useAtividadesProjeto(projetoId?: string | number) {
  return useQuery<Atividade[]>({
    queryKey: ['atividades', 'projeto', projetoId],
    queryFn: () => atividadeService.listarPorProjeto(projetoId!),
    enabled: !!projetoId
  });
}

export function useAtividadesMutations(
  projetoId: string | undefined,
  callbacks?: {
    onCriarSucesso?: () => void;
    onAtualizarSucesso?: () => void;
  }
) {
  const queryClient = useQueryClient();

  const queryKey = ['atividades', 'projeto', projetoId];

  const criarMutation = useMutation({
    mutationFn: (dados: AtividadePayload) => atividadeService.criar(dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Atividade criada com sucesso!");
      callbacks?.onCriarSucesso?.();
    },
    onError: (erro: Error) => {
      toast.error(erro.message || "Erro ao criar atividade");
    }
  });

  const atualizarMutation = useMutation({
    mutationFn: ({ id, dados }: { id: number; dados: Partial<AtividadePayload> }) =>
      atividadeService.atualizar(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Atividade atualizada com sucesso!");
      callbacks?.onAtualizarSucesso?.();
    },
    onError: (erro: Error) => {
      toast.error(erro.message || "Erro ao atualizar atividade");
    }
  });

  const desativarMutation = useMutation({
    mutationFn: (id: number) => atividadeService.desativar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Atividade desativada com sucesso!");
    },
    onError: (erro: Error) => {
      toast.error(erro.message || "Erro ao desativar atividade");
    }
  });

  const ativarMutation = useMutation({
    mutationFn: (id: number) => atividadeService.ativar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Atividade reativada com sucesso!");
    },
    onError: (erro: Error) => {
      toast.error(erro.message || "Erro ao reativar atividade");
    }
  });

  return {
    criarMutation,
    atualizarMutation,
    desativarMutation,
    ativarMutation
  };
}