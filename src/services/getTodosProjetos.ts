import { useQuery } from '@tanstack/react-query'
import { type Projeto } from '@/data/ProjectType';

async function buscarProjetos(): Promise<Projeto[]> {
    const response = await fetch('/api/projetos/todos');

    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.erro || 'Erro ao buscar projetos');
    }
    return response.json()
}

export function useProjetos() {
    return useQuery({
        queryKey: ['projetos'],
        queryFn: buscarProjetos,
        staleTime: 5 * 60 * 1000
    })
}