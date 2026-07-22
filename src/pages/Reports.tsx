import { Check, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { PRESENCES } from '@/data/Presences';
import { toast } from 'sonner';

interface PresencaAluno {
    id: number;
    alunoId: number;
    atividadeId: number;
    dataHoraCheckIn: string;
    dataHoraCheckOut: string | null;
    status: 'pendente' | 'aprovado' | 'recusado';
    atividade: {
        titulo: string;
        data: string;
        projetoId: number;
        projeto: {
            titulo: string;
        };
    };
}

interface PresencaProfessor extends PresencaAluno {
    aluno: {
        nome: string;
        ra: string;
    };
}


function Reports() {

    const { role, user } = useAuth();
    const [paginaAtual, setPaginaAtual] = useState(1);
    const queryClient = useQueryClient();


    const PRESENCAS_POR_PAGINA = 15;

    const { data: minhasPresencas, isLoading: isLoadingAluno, error: errorAluno } = useQuery<PresencaAluno[]>({
        queryKey: ['presencas', 'minhas'],
        queryFn: async () => {
            const res = await fetch('/api/presencas/me', {
                credentials: 'include'
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new globalThis.Error(erro.erro || 'Erro ao buscar presenças');
            }
            return res.json();
        },
        enabled: role === 'student'
    });

    const { data: presencasProfessor, isLoading: isLoadingProfessor, error: errorProfessor } = useQuery<PresencaProfessor[]>({
        queryKey: ['presencas', 'professor', user?.id],
        queryFn: async () => {
            const res = await fetch('/api/presencas/professor', {
                credentials: 'include'
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new globalThis.Error(erro.erro || 'Erro ao buscar presenças');
            }
            return res.json();
        },
        enabled: role === 'teacher'
    });

    const aprovarMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/presencas/id/${id}/aprovar`, {
                method: 'PUT',
                credentials: 'include'
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new globalThis.Error(erro.erro || 'Erro ao aprovar presença');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['presencas', 'professor', user?.id] });
            toast.success("Presença aprovada!");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao aprovar presença");
        }
    });

    const recusarMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/presencas/id/${id}/recusar`, {
                method: 'PUT',
                credentials: 'include'
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new globalThis.Error(erro.erro || 'Erro ao recusar presença');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['presencas', 'professor', user?.id] });
            toast.success("Presença recusada!");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao recusar presença");
        }
    });

    const presencas = role === 'teacher' ? presencasProfessor : minhasPresencas;
    const isLoading = role === 'teacher' ? isLoadingProfessor : isLoadingAluno;
    const error = role === 'teacher' ? errorProfessor : errorAluno;

    const totalDePaginas = Math.ceil((presencas?.length ?? 0) / PRESENCAS_POR_PAGINA);
    const indiceFinal = paginaAtual * PRESENCAS_POR_PAGINA;
    const indiceInicial = indiceFinal - PRESENCAS_POR_PAGINA;
    const presencasExibidas = presencas?.slice(indiceInicial, indiceFinal) ?? [];

    const formatarHora = (dataIso: string | null): string => {
        if (!dataIso) return '--:--:--';
        return new Date(dataIso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    const formatarStatus = (status: string) => {
        const cores: Record<string, string> = {
            pendente: 'bg-amber-100 text-amber-700',
            aprovado: 'bg-emerald-100 text-emerald-700',
            recusado: 'bg-red-100 text-red-700'
        };
        return (
            <span className={`px-3 py-1 rounded-full ${cores[status] ?? 'bg-zinc-100 text-zinc-600'}`}>
                {status}
            </span>
        );
    };

    if (isLoading) {
        return <p className="p-6">Carregando presenças...</p>;
    }

    if (error) {
        return <p className="p-6 text-red-500">Erro ao carregar presenças</p>;
    }


     return (
        <>
            <main className="flex-1">
                <h1 className="text-3xl font-bold overflow-hidden">Relatórios de presença</h1>
                <section className='mt-4 w-full'>
                    <div className="block space-y-4">

                        {presencasExibidas.length === 0 && (
                            <p className="text-sm text-zinc-500">Nenhuma presença registrada ainda.</p>
                        )}

                        {presencasExibidas.map((presenca) => (
                            <div key={presenca.id} className="w-full rounded-xl border border-zinc-300 p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between font-body text-slate-700">

                                <div className="flex items-center gap-3 min-w-0 lg:w-48 lg:shrink-0">
                                    <div className="min-w-0">
                                        <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Nome completo</p>
                                        <p className="text-sm font-semibold truncate">
                                            {role === 'teacher' ? (presenca as PresencaProfessor).aluno.nome : user?.nome}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:flex lg:items-center lg:gap-8 lg:flex-1 min-w-0">
                                    <div className="min-w-0">
                                        <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Projeto</p>
                                        <p className="text-sm font-semibold truncate">{presenca.atividade.projeto.titulo}</p>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Data</p>
                                        <p className="text-sm font-semibold truncate">
                                            {new Date(presenca.atividade.data).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>

                                    <div className="flex gap-4 col-span-2 sm:col-span-1 min-w-0">
                                        <div className="min-w-0 flex-1 sm:flex-none">
                                            <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Entrada</p>
                                            <p className="text-sm font-semibold truncate">{formatarHora(presenca.dataHoraCheckIn)}</p>
                                        </div>
                                        <div className="min-w-0 flex-1 sm:flex-none">
                                            <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Saída</p>
                                            <p className="text-sm font-semibold truncate">{formatarHora(presenca.dataHoraCheckOut)}</p>
                                        </div>
                                    </div>
                                </div>

                                {role === 'teacher' && (
                                    <div className="flex items-center gap-2 w-full lg:w-auto lg:shrink-0 justify-end mt-2 lg:mt-0">
                                        {presenca.status === 'pendente' ? (
                                            <>
                                                <button
                                                    title="Recusar presença"
                                                    onClick={() => recusarMutation.mutate(presenca.id)}
                                                    disabled={recusarMutation.isPending || aprovarMutation.isPending}
                                                    className="flex-1 lg:flex-none cursor-pointer h-10 w-10 min-w-11 flex items-center justify-center rounded-lg bg-red-400 text-white hover:bg-red-600 active:scale-[0.95] transition shrink-0 border border-red-200/60 disabled:opacity-50"
                                                >
                                                    <X size={18} strokeWidth={2.5} />
                                                </button>

                                                <button
                                                    title="Aceitar presença"
                                                    onClick={() => aprovarMutation.mutate(presenca.id)}
                                                    disabled={recusarMutation.isPending || aprovarMutation.isPending}
                                                    className="flex-1 lg:flex-none cursor-pointer h-10 w-10 min-w-11 flex items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.95] transition shrink-0 shadow-sm shadow-emerald-600/10 disabled:opacity-50"
                                                >
                                                    <Check size={18} strokeWidth={2.5} />
                                                </button>
                                            </>
                                        ) : (
                                            formatarStatus(presenca.status)
                                        )}
                                    </div>
                                )}

                                {role === 'student' && (
                                    <div className="min-w-0 w-full lg:w-auto lg:shrink-0 flex flex-col justify-end items-end mt-2 lg:mt-0">
                                        <p className="hidden lg:block text-[12px] uppercase font-bold tracking-wider text-slate-400 mb-1 text-right w-full">
                                            Status
                                        </p>
                                        {formatarStatus(presenca.status)}
                                    </div>
                                )}
                            </div>
                        ))}

                        {totalDePaginas > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8 pt-6">
                                <button onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))} disabled={paginaAtual === 1} className="px-4 py-2 cursor-pointer text-sm font-medium text-zinc-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed ">
                                    Anterior
                                </button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalDePaginas }, (_, index) => {
                                        const numeroPagina = index + 1;
                                        const isAtiva = paginaAtual === numeroPagina;
                                        return (
                                            <button key={numeroPagina} onClick={() => setPaginaAtual(numeroPagina)}
                                                className={`w-9 h-9 text-sm font-semibold rounded-md ${isAtiva
                                                    ? 'bg-cyan-400 text-white'
                                                    : 'text-zinc-600 hover:bg-zinc-100 border border-zinc-300 cursor-pointer'
                                                    }`}>
                                                {numeroPagina}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalDePaginas))} disabled={paginaAtual === totalDePaginas} className="px-4 py-2 cursor-pointer text-sm font-medium text-zinc-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed ">
                                    Próxima
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    )
}

export default Reports