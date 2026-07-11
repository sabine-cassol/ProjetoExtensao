const API_URL = import.meta.env.VITE_API_URL_PROXY || '/api';

export interface login {
    email: string,
    nome: string,
    senha: string,
    ra: string,
    curso:string,
    periodo:string
}

export const createUser = {
    create: async (dadoslogin: login) => {
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
            throw new Error(
                dados?.mensagem || `Erro na API: ${response.status}`
            );
        }
        return dados;
    }
};