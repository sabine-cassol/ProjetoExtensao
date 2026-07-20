import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL_PROXY || '/api';

export interface CriarUsuarioPayload {
  email: string;
  nome: string;
  senha: string;
  ra: string;
  curso: string;
  periodo: string;
}

export interface Usuario {
  id?: string;
  nome?: string;
  email?: string;
  curso?: string;
  periodo?: string;
  ra?: string;
}

export interface AtualizarUsuarioPayload {
  dados: Usuario;
  role: 'teacher' | 'student' | string;
}

export const userService = {
  create: async (dadoslogin: CriarUsuarioPayload): Promise<Usuario> => {
    const response = await fetch(`${API_URL}/alunos/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadoslogin),
    });

    const dados = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("❌ Detalhes do erro vindos da API:", dados);
      throw new Error(dados?.mensagem || `Erro na API: ${response.status}`);
    }
    
    return dados;
  },

  update: async ({ dados, role }: AtualizarUsuarioPayload): Promise<Usuario> => {
    const rotaMe = role === 'teacher' ? '/professores/atualizar' : '/alunos/atualizar';

    const response = await fetch(`${API_URL}${rotaMe}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dados),
    });

    const dadosResposta = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("❌ Detalhes do erro vindos da API:", dadosResposta);
      throw new Error(dadosResposta?.mensagem || `Erro na API: ${response.status}`);
    }

    return dadosResposta;
  }
};

// --- REACT QUERY HOOKS ---

/**
  Hook para criar um novo aluno/usuário
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dadosLogin: CriarUsuarioPayload) => userService.create(dadosLogin),
    onSuccess: () => {
      // Invalida a query de usuários caso precise recarregar listas
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

/**
  Hook para atualizar o usuário atual (aluno ou professor)
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dados, role }: AtualizarUsuarioPayload) => userService.update({ dados, role }),
    onSuccess: () => {
      // Invalida e força o re-fetch dos dados do usuário logado
      queryClient.invalidateQueries({ queryKey: ['userMe'] });
    },
  });
};