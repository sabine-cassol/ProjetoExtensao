const API_URL = import.meta.env.VITE_API_URL;

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
        horasextensao: number;
        ativo: boolean;
        createdat: string;
        updatedat: string;
    };
}

export const logintest = {
    logar: async (dadoslogin: login): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/alunos/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
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