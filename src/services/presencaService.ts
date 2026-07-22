import { useQuery } from '@tanstack/react-query';
import { type Presence } from '@/data/Presences';

export const presencaService = {
  
  async buscarMinhas(): Promise<Presence[]> {
    const res = await fetch('/api/presencas/me', {
      credentials: 'include'
    });

    if (!res.ok) {
      const erro = await res.json().catch(() => null);
      throw new Error(erro?.erro || 'Erro ao buscar presenças');
    }

    return res.json();
  }
}

export function useMinhasPresencas(enabled: boolean = true) {
  return useQuery<Presence[]>({
    queryKey: ['presencas', 'minhas'],
    queryFn: () => presencaService.buscarMinhas(),
    enabled
  });
}