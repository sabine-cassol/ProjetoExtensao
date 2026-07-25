import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL_PROXY || '/api';

export interface CriarUsuarioPayload {
  email: string;
  nome: string;
  senha: string;
  ra: string;
  curso: string;
  periodo: string | number;
}

export interface Usuario {
  id?: string;
  nome?: string;
  email?: string;
  curso?: string;
  periodo?: string | number;
  ra?: string;
}

export interface AtualizarUsuarioPayload {
  dados: Partial<Usuario> & { senha?: string };
  role: 'teacher' | 'student' | string;
}

interface UseUpdateUserOptions {
  onSuccessCallback?: () => void;
  updateSession?: (dados: any) => void;
}

interface UseCreateUserOptions {
  onSuccessCallback?: () => void;
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
    const isTeacher = role?.toLowerCase() === 'teacher' || role?.toLowerCase() === 'professor';

    const rotaMe = isTeacher ? '/professores/atualizar' : '/alunos/atualizar'

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
      throw new Error(dadosResposta?.mensagem || `Erro na API: ${response.status}`);
    }

    return dadosResposta;
  }
};


export const useCreateUser = (options?: UseCreateUserOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dadosUsuario: CriarUsuarioPayload) => userService.create(dadosUsuario),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });

      toast.success("Aluno cadastrado com sucesso!");

      if (options?.onSuccessCallback) {
        options.onSuccessCallback();
      }
    },
    onError: (error: Error) => {
      console.error("Erro ao cadastrar aluno:", error);
      toast.error(error.message || "Houve um erro ao criar o aluno");
    }
  });
};

export const useUpdateUser = (options?: UseUpdateUserOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dados, role }: AtualizarUsuarioPayload) =>
      userService.update({ dados, role }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userMe'] });

      if (options?.updateSession) {
        options.updateSession({
          nome: data.nome,
          curso: data.curso,
          periodo: data.periodo,
        });
      }

      if (options?.onSuccessCallback) {
        options.onSuccessCallback();
      }

      toast.success("Dados atualizados com sucesso!");
    },

    onError: (err: Error) => {
      console.error("Falha ao salvar usuário:", err);
      toast.error(err.message || "Não foi possível atualizar os dados. Tente novamente.");
    },
  });
};