const API_URL = import.meta.env.VITE_API_URL_PROXY || '/api';

export interface Usuario {
    nome?: string,
    email?: string,
    curso?:string,
    periodo?:string
}

export async function atualizarUsuario(dados: Usuario): Promise<Usuario> {
  try {
    const response = await fetch(`${API_URL}/alunos/atualizar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const dadosErro = await response.json();
      console.error("❌ Detalhes do erro vindos da API:", dadosErro);
      throw new Error(`Erro na API: ${response.status}`);
    }

    const usuarioAtualizado = await response.json();
    return usuarioAtualizado;

  } catch (error) {
    console.error('Erro na requisição PUT:', error);

    throw error; 
  }
}