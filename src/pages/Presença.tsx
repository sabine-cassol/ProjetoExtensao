import { useState, useEffect, useRef } from 'react';
// import { PROJECTS } from '@/data/Projects';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type Atividade } from '@/data/AtividadeType';


interface Presenca {
    id: number;
    alunoId: number;
    atividadeId: number;
    dataHoraCheckIn: string;
    dataHoraCheckOut: string | null;
    localizacaoCheckIn: string;
    localizacaoCheckOut: string | null;
}


export default function Presença() {
    const params = useParams();
    const projetoId = params?.projetoId;
    const queryClient = useQueryClient();

    const [segundos, setSegundos] = useState<number>(0);
    const timerRef = useRef<number | null>(null);
    const TEMPO_MINIMO = 10 * 60;


    const { data: projetoAtual, isLoading: isLoadingProjeto } = useQuery({
        queryKey: ['projeto', projetoId],
        queryFn: async () => {
            const res = await fetch(`/api/projetos/id/${projetoId}`);
            if (!res.ok) {
                const erro = await res.json();
                throw new globalThis.Error(erro.erro || 'Erro ao buscar projeto');
            }
            return res.json();
        },
        enabled: !!projetoId
    });


    const { data: atividades, isLoading: isLoadingAtividades } = useQuery<Atividade[]>({
        queryKey: ['atividades', 'projeto', projetoId],
        queryFn: async () => {
            const res = await fetch(`/api/atividades/projeto/${projetoId}`, {
                credentials: 'include'
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new globalThis.Error(erro.erro || 'Erro ao buscar atividades');
            }
            return res.json();
        },
        enabled: !!projetoId
    });

    const hoje = new Date().toISOString().split('T')[0];
    const atividadeHoje = atividades?.find((a) => a.data === hoje && a.ativo);

    const { data: minhasPresencas, isLoading: isLoadingPresencas } = useQuery<Presenca[]>({
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
        enabled: !!atividadeHoje
    });

    const presencaAberta = minhasPresencas?.find(
        (p) => p.atividadeId === atividadeHoje?.id && !p.dataHoraCheckOut
    );

    const presencaFinalizada = minhasPresencas?.find(
        (p) => p.atividadeId === atividadeHoje?.id && p.dataHoraCheckOut
    );

    const estaTrabalhando = !!presencaAberta;
    const saidaBtnBlock = estaTrabalhando && segundos < TEMPO_MINIMO;

    const numEncontros = Number(projetoAtual?.numEncontros);
    const cargaHoraria = Number(projetoAtual?.cargaHoraria);
    const TEMPO_MAXIMO = projetoAtual && numEncontros
        ? (cargaHoraria / numEncontros) * 3600
        : 4 * 3600;

    useEffect(() => {
        if (presencaAberta) {
            const inicio = new Date(presencaAberta.dataHoraCheckIn).getTime();

            timerRef.current = window.setInterval(() => {
                const segundosPassados = Math.floor((Date.now() - inicio) / 1000);
                setSegundos(Math.min(segundosPassados, TEMPO_MAXIMO));
            }, 1000);
        } else {
            setSegundos(0);
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [presencaAberta, TEMPO_MAXIMO]);

    const obterLocalizacao = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new globalThis.Error('Geolocalização não suportada neste navegador'));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (posicao) => {
                    resolve(`${posicao.coords.latitude},${posicao.coords.longitude}`);
                },
                () => {
                    reject(new globalThis.Error('Não foi possível obter sua localização. Permita o acesso à localização.'));
                }
            );
        });
    };
    const checkinMutation = useMutation({
        mutationFn: async () => {
            const localizacaoCheckIn = atividadeHoje?.exigeLocalizacao
                ? await obterLocalizacao()
                : null;

            const res = await fetch('/api/presencas/checkin', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    atividadeId: atividadeHoje!.id,
                    localizacaoCheckIn
                })
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new globalThis.Error(erro.erro || 'Erro ao registrar check-in');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['presencas', 'minhas'] });
            toast.success("Entrada registrada com sucesso!");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao registrar entrada");
        }
    });

    const checkoutMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch('/api/presencas/checkout', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    atividadeId: atividadeHoje!.id,
                    localizacaoCheckOut: null  
                })
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new globalThis.Error(erro.erro || 'Erro ao registrar check-out');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['presencas', 'minhas'] });
            toast.success("Saída registrada com sucesso!");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao registrar saída");
        }
    });

    const formatarCronometro = (totalSegundos: number): string => {
        const hrs = Math.floor(totalSegundos / 3600).toString().padStart(2, '0');
        const mins = Math.floor((totalSegundos % 3600) / 60).toString().padStart(2, '0');
        const secs = Math.floor(totalSegundos % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    const obterDataPorExtenso = (): string => {
        return new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });
    };

    const formatarHora = (dataIso: string | null): string => {
        if (!dataIso) return '--:--:--';
        return new Date(dataIso).toLocaleTimeString('pt-BR');
    };

    const alternarPonto = () => {
        if (!atividadeHoje) return;

        if (!estaTrabalhando) {
            checkinMutation.mutate();
        } else {
            if (segundos < TEMPO_MINIMO) {
                toast.error(`Você precisa trabalhar pelo menos 10 minutos antes de registrar a saída. Tempo atual: ${formatarCronometro(segundos)}`);
                return;
            }
            checkoutMutation.mutate();
        }
    };
    if (isLoadingProjeto || isLoadingAtividades) {
        return <p className="text-center p-6">Carregando...</p>;
    }

    if (!projetoAtual) {
        return <div className="text-center p-6 text-red-500">Projeto não encontrado.</div>;
    }

    if (!atividadeHoje) {
        return (
            <section className='flex-1 flex text-center justify-center items-center'>
                <div className="w-full max-w-sm rounded-2xl bg-white p-6 border border-zinc-300">
                    <h1 className="text-xl font-bold text-slate-800">Registrar Ponto</h1>
                    <p className="mt-4 text-sm text-slate-500">
                        Nenhum encontro agendado para hoje ({obterDataPorExtenso()}). Consulte as atívidades na página do projeto para mais informações
                    </p>
                </div>
            </section>
        );
    }

    const registroFinalizadoHoje = !estaTrabalhando && presencaFinalizada;


    return (

        <section className='flex-1 flex text-center justify-center items-center'>

            <div className="w-full max-w-sm rounded-2xl bg-white p-6 border border-zinc-300">

                <div className="text-center flex flex-col items-center gap-1">
                    <h1 className="text-xl font-bold text-slate-800">Registrar Ponto</h1>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {obterDataPorExtenso()}
                    </p>
                    <p className="text-sm font-medium text-slate-600">{atividadeHoje.titulo}</p>
                    <p className="text-xs text-slate-400">
                        {atividadeHoje.exigeLocalizacao
                            ? "Este encontro exige compartilhamento de localização"
                            : "Este encontro não exige localização"}
                    </p>

                    <p className="text-xs text-slate-400 ">
                        Min: 10m | Máx por encontro: {formatarCronometro(TEMPO_MAXIMO)}
                    </p>
                </div>

                <div className="my-6 rounded-xl border-2 border-slate-200 bg-slate-50/50 p-5 text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Tempo Trabalhando no projeto
                    </span>
                    <p className="mt-1 font-mono text-4xl font-bold tracking-tight text-slate-800">
                        {formatarCronometro(segundos)}
                    </p>
                </div>
                {registroFinalizadoHoje ? (
                    <div className="w-full rounded-xl py-4 text-base font-bold text-center text-slate-500 bg-slate-100">
                        Presença já registrada hoje
                    </div>
                ) : (
                    <button
                        onClick={alternarPonto}
                        disabled={checkinMutation.isPending || checkoutMutation.isPending || (estaTrabalhando && saidaBtnBlock)}
                        className={`w-full rounded-xl py-4 text-base font-bold text-white transition-all duration-200 disabled:opacity-60
                            ${estaTrabalhando
                                ? saidaBtnBlock
                                    ? 'bg-gray-300 cursor-not-allowed shadow-none'
                                    : 'bg-rose-500 hover:bg-rose-600 hover:translate-y-px active:translate-y-0.75 cursor-pointer'
                                : 'bg-(--lightCyan) hover:bg-(--cyanHover) hover:translate-y-px active:translate-y-0.75 cursor-pointer'
                            }`}>
                        {checkinMutation.isPending || checkoutMutation.isPending
                            ? 'Processando...'
                            : estaTrabalhando ? 'Registrar Saída' : 'Registrar Entrada'}
                    </button>
                )}

                <div className="mt-6 pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Registro Atual:
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-slate-600">
                            <span>Entrada:</span>
                            <span className="font-semibold text-slate-800">
                                {formatarHora(presencaAberta?.dataHoraCheckIn ?? presencaFinalizada?.dataHoraCheckIn ?? null)}
                            </span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Saída:</span>
                            <span className="font-semibold text-slate-800">
                                {formatarHora(presencaFinalizada?.dataHoraCheckOut ?? null)}
                            </span>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}