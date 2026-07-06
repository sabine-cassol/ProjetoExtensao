import { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '@/data/Projects';
import { useParams } from 'react-router-dom';

interface RegistroPonto {
    entrada: string | null;
    saida: string | null;
}

export default function Presença() {
    const [estaTrabalhando, setEstaTrabalhando] = useState<boolean>(false);
    const [segundos, setSegundos] = useState<number>(0);
    const [registro, setRegistro] = useState<RegistroPonto>({ entrada: null, saida: null });
    const params = useParams();
    const projetoId = params?.projetoId;

    const projetoAtual = PROJECTS.find((p) => p.id === projetoId);
    const numEncontros = Number(projetoAtual?.numEncontros);
    const cargaHoraria = Number(projetoAtual?.cargaHoraria);

    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const TEMPO_MINIMO = 10 * 60;
    const saidaBtnBlock = estaTrabalhando && segundos < TEMPO_MINIMO;

    const TEMPO_MAXIMO = projetoAtual && numEncontros
        ? (cargaHoraria / numEncontros) * 3600
        : 4 * 3600;

    useEffect(() => {
        if (estaTrabalhando) {
            startTimeRef.current = Date.now() - segundos * 1000;
            timerRef.current = window.setInterval(() => {
                const segundosPassados = Math.floor((Date.now() - startTimeRef.current) / 1000);

                if (segundosPassados >= TEMPO_MAXIMO) {
                    setSegundos(TEMPO_MAXIMO);
                    finalizarPontoForçado();
                } else {
                    setSegundos(segundosPassados);
                }
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [estaTrabalhando, TEMPO_MAXIMO]);

    const formatarCronometro = (totalSegundos: number): string => {
        const hrs = Math.floor(totalSegundos / 3600).toString().padStart(2, '0');
        const mins = Math.floor((totalSegundos % 3600) / 60).toString().padStart(2, '0');
        const secs = Math.floor(totalSegundos % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };


    const obterHoraAtual = (): string => {
        return new Date().toLocaleTimeString('pt-BR');
    };

    const obterDataPorExtenso = (): string => {
        return new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });
    };

    const finalizarPontoForçado = () => {
        const horaAtual = obterHoraAtual();
        setRegistro((prev) => ({ ...prev, saida: horaAtual }));
        setEstaTrabalhando(false);
        alert(`Tempo máximo do encontro atingido (${formatarCronometro(TEMPO_MAXIMO)}). Ponto encerrado automaticamente.`);
    };

    const alternarPonto = () => {
        const horaAtual = obterHoraAtual();

        if (!estaTrabalhando) {
            setRegistro({ entrada: horaAtual, saida: null });
            setSegundos(0);
            setEstaTrabalhando(true);
        } else {
            if (segundos < TEMPO_MINIMO) {
                alert(`Você precisa trabalhar pelo menos 10 minutos antes de registrar a saída. Tempo atual: ${formatarCronometro(segundos)}`);
                return;
            }
            setRegistro((prev) => ({ ...prev, saida: horaAtual }));
            setEstaTrabalhando(false);
        }
    };

    if (!projetoAtual) {
        return <div className="text-center p-6 text-red-500">Projeto não encontrado.</div>;
    }

    return (

        <section className='flex-1 flex text-center justify-center items-center'>

            <div className="w-full max-w-sm rounded-2xl bg-white p-6 border border-zinc-300">

                <div className="text-center flex flex-col items-center gap-1">
                    <h1 className="text-xl font-bold text-slate-800">Registrar Ponto</h1>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {obterDataPorExtenso()}
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

                <button onClick={alternarPonto}
                    className={`w-full rounded-xl py-4 text-base font-bold text-white transition-all duration-200 
        ${estaTrabalhando
                            ? saidaBtnBlock
                                ? 'bg-gray-300 cursor-pointer shadow-none' 
                                : 'bg-rose-500 hover:bg-rose-600 hover:translate-y-px active:translate-y-0.75 cursor-pointer ' 
                            : 'bg-(--lightCyan) hover:bg-(--cyanHover) hover:translate-y-px active:translate-y-0.75 cursor-pointer '
                        }`}
                >
                    {estaTrabalhando ? 'Registrar Saída' : 'Registrar Entrada'}
                </button>

                <div className="mt-6 pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Registro Atual:
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-slate-600">
                            <span>Entrada:</span>
                            <span className="font-semibold text-slate-800">{registro.entrada || '--:--:--'}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Saída:</span>
                            <span className="font-semibold text-slate-800">{registro.saida || '--:--:--'}</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}