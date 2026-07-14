import { useQuery } from '@tanstack/react-query'
import { type Projeto } from '@/data/ProjectType';

async function buscarProjetosPorId(id:string): Promise<Projeto> {
    const response = await fetch(`/api/projetos/id/${id}`);

    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.erro || 'Erro ao buscar projetos');
    }
    return response.json()
}

export function useProjetoId(id:string) {
    return useQuery({
        queryKey: ['projetos', id],
        queryFn: () => buscarProjetosPorId(id),
        enabled:!!id
    })
}