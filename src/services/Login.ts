const API_URL = import.meta.env.VITE_API_URL_PROXY || '/api';

export interface login {
    email: string;
    senha: string;
}

export interface AuthResponse {
    tipo: string;
    aluno?: {
        id: number | string;
        nome: string;
        email: string;
        ra: string;
        curso: string;
        periodo: string;
    };
    professor?: {
        id: number | string;
        nome: string;
        email: string;
    };
}
export const loginStudent = {
    logar: async (dadoslogin: login): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/alunos/login`, {
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
            throw new Error(
                dados?.mensagem || `Erro na API: ${response.status}`
            );
        }
        return dados;
    }
};

export const loginTeacher = {
    logar: async (dadoslogin: login): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/professores/login`, {
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
            throw new Error(
                dados?.mensagem || `Erro na API: ${response.status}`
            );
        }
        return dados;
    }
};