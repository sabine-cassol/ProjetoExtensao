import { Check, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { PRESENCES } from '@/data/Presences';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReportsSkeleton } from '@/components/ReportsSkeleton';

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
        curso: string;
        periodo: string;
    };
}

function formatarDataLocal(dataISO: string): string {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}


function Reports() {

    const { role, user } = useAuth();
    const [paginaAtual, setPaginaAtual] = useState(1);
    const queryClient = useQueryClient();

    const [filtroProjetoId, setFiltroProjetoId] = useState<string>('');
    const [filtroRa, setFiltroRa] = useState<string>('');
    const [filtroStatus, setFiltroStatus] = useState<string>('');



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

    const formatarRA = (valor: string): string => {
        const apenasNumeros = valor.replace(/\D/g, '').slice(0, 9);

        if (apenasNumeros.length <= 8) {
            return apenasNumeros;
        }

        return `${apenasNumeros.slice(0, 8)}-${apenasNumeros.slice(8)}`;
    };

    const projetosUnicos = role === 'teacher'
        ? Array.from(
            new Map(
                (presencasProfessor ?? []).map((p) => [
                    p.atividade.projetoId,
                    { id: p.atividade.projetoId, titulo: p.atividade.projeto.titulo }
                ])
            ).values()
        )
        : [];

    const presencasFiltradas = presencas?.filter((presenca) => {
        if (role === 'teacher') {
            const p = presenca as PresencaProfessor;

            if (filtroProjetoId && p.atividade.projetoId !== Number(filtroProjetoId)) {
                return false;
            }

            if (filtroRa && !p.aluno.ra.toLowerCase().includes(filtroRa.toLowerCase())) {
                return false;
            }

            if (filtroStatus && p.status !== filtroStatus) {
                return false;
            }
        }
        return true;
    }) ?? [];

    const totalDePaginas = Math.ceil(presencasFiltradas.length / PRESENCAS_POR_PAGINA);
    const indiceFinal = paginaAtual * PRESENCAS_POR_PAGINA;
    const indiceInicial = indiceFinal - PRESENCAS_POR_PAGINA;
    const presencasExibidas = presencasFiltradas.slice(indiceInicial, indiceFinal);

    const formatarHora = (dataIso: string | null): string => {
        if (!dataIso) return '--:--:--';
        return new Date(dataIso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    const formatarStatus = (status: string) => {
        const cores: Record<string, string> = {
            pendente: 'bg-amber-300 text-zinc-900',
            aprovado: 'bg-emerald-100 text-emerald-700',
            recusado: 'bg-red-100 text-red-700'
        };
        return (
            <span className={`px-3 py-1 font-semibold rounded-sm ${cores[status] ?? 'bg-zinc-100 text-zinc-600'}`}>
                {status}
            </span>
        );
    };

    if (isLoading) {
        return <ReportsSkeleton></ReportsSkeleton>
    }

    if (!user) {
        return (
            <div className="flex-1 flex flex-col bg-white justify-center items-center p-6 text-center border rounded-lg border-zinc-300 ">
                <div className="p-6 bg-zinc-200 text-zinc-600 rounded-full flex items-center justify-center mb-2">
                    <Lock className="size-12" />
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 mb-1">
                    Acesso Restrito
                </h2>
                <p className="text-sm text-zinc-500 max-w-xs pt-2">
                    Você precisa estar conectado à sua conta para visualizar esta página.
                </p>
                <Link to="/login" className="inline-flex mt-4 items-center justify-center px-4 py-2 text-sm font-medium text-white bg-(--lightCyan) hover:bg-cyan-500 rounded-lg transition-colors shadow-xs">
                    Fazer Login
                </Link>
            </div>
        );
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


                        {role === 'teacher' && (
                            <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full min-w-0">
                                <select value={filtroProjetoId} onChange={(e) => { setFiltroProjetoId(e.target.value); setPaginaAtual(1); }} className="border border-zinc-300 rounded-md p-2 text-sm flex-1 min-w-0 w-full sm:w-auto">
                                    <option value="">Todos os projetos</option>
                                    {projetosUnicos.map((proj) => (
                                        <option key={proj.id} value={proj.id}>{proj.titulo}</option>
                                    ))}
                                </select>

                                <input type="text" placeholder="Buscar por RA do aluno" value={filtroRa} onChange={(e) => {
                                    const valorFormatado = formatarRA(e.target.value);
                                    setFiltroRa(valorFormatado);
                                    setPaginaAtual(1);
                                }} className="border border-zinc-300 rounded-md p-2 text-sm flex-1 min-w-0 w-full sm:w-auto" />

                                <select
                                    value={filtroStatus}
                                    onChange={(e) => { setFiltroStatus(e.target.value); setPaginaAtual(1); }}
                                    className="border border-zinc-300 rounded-md p-2 text-sm flex-1 min-w-0 w-full sm:w-auto">
                                    <option value="">Todos os status</option>
                                    <option value="pendente">Pendente</option>
                                    <option value="aprovado">Aprovado</option>
                                    <option value="recusado">Recusado</option>
                                </select>
                            </div>
                        )}

                        {presencasExibidas.length === 0 && (
                            <p className="text-sm text-zinc-500">Nenhuma presença registrada.</p>
                        )}

                        {presencasExibidas.map((presenca) => (
                            <div
                                key={presenca.id}
                                className="w-full rounded-xl border border-zinc-300 p-4 sm:p-5 font-body text-slate-700 bg-white"
                            >
                                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[1.5fr_1fr_1.2fr_0.8fr_1.5fr_1fr_0.8fr_0.8fr_auto] lg:items-center">

                                    {/* BLOCO DADOS DO ALUNO E PROJETO */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:contents gap-3 pb-3 lg:pb-0 border-b lg:border-none border-zinc-200">

                                        <div className="min-w-0 col-span-2 sm:col-span-1 lg:col-span-1" title={role === 'teacher' ? (presenca as PresencaProfessor).aluno.nome : user?.nome}>
                                            <p className="text-[11px] lg:text-[12px] uppercase font-bold tracking-wider text-slate-400">Nome completo</p>
                                            <p className="text-sm font-semibold truncate text-slate-800">
                                                {role === 'teacher' ? (presenca as PresencaProfessor).aluno.nome : user?.nome}
                                            </p>
                                        </div>

                                        <div className="min-w-0" title={role === 'teacher' ? (presenca as PresencaProfessor).aluno.ra : user?.ra}>
                                            <p className="text-[11px] lg:text-[12px] uppercase font-bold tracking-wider text-slate-400">RA</p>
                                            <p className="text-sm font-semibold truncate text-slate-800">
                                                {role === 'teacher' ? (presenca as PresencaProfessor).aluno.ra : user?.ra}
                                            </p>
                                        </div>

                                        {role === 'teacher' && (
                                            <>
                                                <div className="min-w-0" title={(presenca as PresencaProfessor).aluno.curso}>
                                                    <p className="text-[11px] lg:text-[12px] uppercase font-bold tracking-wider text-slate-400">Curso</p>
                                                    <p className="text-sm font-semibold truncate text-slate-800">
                                                        {(presenca as PresencaProfessor).aluno.curso}
                                                    </p>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[11px] lg:text-[12px] uppercase font-bold tracking-wider text-slate-400">Período</p>
                                                    <p className="text-sm font-semibold truncate text-slate-800">
                                                        {(presenca as PresencaProfessor).aluno.periodo}º
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        <div className="min-w-0 col-span-2 sm:col-span-1 lg:col-span-1" title={presenca.atividade.projeto.titulo}>
                                            <p className="text-[11px] lg:text-[12px] uppercase font-bold tracking-wider text-slate-400">Projeto</p>
                                            <p className="text-sm font-semibold truncate text-slate-800" title={presenca.atividade.projeto.titulo}>
                                                {presenca.atividade.projeto.titulo}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 lg:contents gap-2 pb-3 lg:pb-0 border-b lg:border-none border-zinc-200" title={formatarDataLocal(presenca.atividade.data)}>
                                        <div className="min-w-0">
                                            <p className="text-[11px] lg:text-[12px] uppercase font-bold tracking-wider text-slate-400">Data</p>
                                            <p className="text-sm font-semibold truncate text-slate-800">
                                                {formatarDataLocal(presenca.atividade.data)}
                                            </p>
                                        </div>

                                        <div className="min-w-0" title={formatarHora(presenca.dataHoraCheckIn)}>
                                            <p className="text-[11px] lg:text-[12px] uppercase font-bold tracking-wider text-slate-400">Entrada</p>
                                            <p className="text-sm font-semibold truncate text-slate-800">
                                                {formatarHora(presenca.dataHoraCheckIn)}
                                            </p>
                                        </div>

                                        <div className="min-w-0" title={formatarHora(presenca.dataHoraCheckOut)}>
                                            <p className="text-[11px] lg:text-[12px] uppercase font-bold tracking-wider text-slate-400">Saída</p>
                                            <p className="text-sm font-semibold truncate text-slate-800">
                                                {formatarHora(presenca.dataHoraCheckOut)}
                                            </p>
                                        </div>
                                    </div>


                                    {role === 'teacher' && (
                                        <div className="flex items-center justify-between lg:justify-end gap-2 pt-1 lg:pt-0">
                                            <span className="lg:hidden text-xs font-bold uppercase tracking-wider text-slate-400">
                                                {presenca.status === 'pendente' ? 'Ação solicitada' : 'Status'}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {presenca.status === 'pendente' ? (
                                                    <>
                                                        <button
                                                            title="Recusar presença"
                                                            onClick={() => recusarMutation.mutate(presenca.id)}
                                                            disabled={recusarMutation.isPending || aprovarMutation.isPending}
                                                            className="cursor-pointer h-10 px-3 sm:px-0 sm:w-10 flex items-center justify-center gap-1 rounded-lg bg-red-500 text-white hover:bg-red-600 active:scale-[0.95] transition shrink-0 disabled:opacity-50 font-medium text-xs sm:text-sm"
                                                        >
                                                            <X size={18} strokeWidth={2.5} />
                                                            <span className="sm:hidden">Recusar</span>
                                                        </button>

                                                        <button
                                                            title="Aceitar presença"
                                                            onClick={() => aprovarMutation.mutate(presenca.id)}
                                                            disabled={recusarMutation.isPending || aprovarMutation.isPending}
                                                            className="cursor-pointer h-10 px-3 sm:px-0 sm:w-10 flex items-center justify-center gap-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.95] transition shrink-0 shadow-sm disabled:opacity-50 font-medium text-xs sm:text-sm"
                                                        >
                                                            <Check size={18} strokeWidth={2.5} />
                                                            <span className="sm:hidden">Aceitar</span>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        {formatarStatus(presenca.status)}
                                                        <div className="flex items-center overflow-hidden border border-zinc-300 bg-white rounded-md">
                                                            {presenca.status !== 'aprovado' && (
                                                                <button
                                                                    title="Aprovar presença"
                                                                    onClick={() => aprovarMutation.mutate(presenca.id)}
                                                                    disabled={recusarMutation.isPending || aprovarMutation.isPending}
                                                                    className="cursor-pointer p-1.5 hover:bg-slate-50 disabled:opacity-50 border-r border-zinc-300"
                                                                >
                                                                    <Check size={14} className="text-emerald-600" />
                                                                </button>
                                                            )}
                                                            {presenca.status !== 'recusado' && (
                                                                <button
                                                                    title="Recusar presença"
                                                                    onClick={() => recusarMutation.mutate(presenca.id)}
                                                                    disabled={recusarMutation.isPending || aprovarMutation.isPending}
                                                                    className="cursor-pointer p-1.5 hover:bg-slate-50 disabled:opacity-50"
                                                                >
                                                                    <X size={14} className="text-red-500" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {role === 'student' && (
                                        <div className="flex items-center justify-between lg:flex-col lg:items-end lg:col-start-9 lg:justify-self-end pt-1 lg:pt-0">
                                            <p className="text-[11px] lg:text-[12px] uppercase font-bold tracking-wider text-slate-400">
                                                Status
                                            </p>
                                            <div>{formatarStatus(presenca.status)}</div>
                                        </div>
                                    )}

                                </div>
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