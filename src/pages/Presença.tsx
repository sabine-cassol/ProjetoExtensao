import { useState, useEffect, useRef } from 'react';

interface RegistroPonto {
    entrada: string | null;
    saida: string | null;
}

export default function Presença() {
    const [estaTrabalhando, setEstaTrabalhando] = useState<boolean>(false);
    const [segundos, setSegundos] = useState<number>(0);
    const [registro, setRegistro] = useState<RegistroPonto>({ entrada: null, saida: null });

    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if (estaTrabalhando) {
            startTimeRef.current = Date.now() - segundos * 1000;
            timerRef.current = setInterval(() => {
                setSegundos(Math.floor((Date.now() - startTimeRef.current) / 1000));
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [estaTrabalhando]);

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

    const alternarPonto = () => {
        const horaAtual = obterHoraAtual();

        if (!estaTrabalhando) {
            setRegistro({ entrada: horaAtual, saida: null });
            setSegundos(0);
            setEstaTrabalhando(true);
        } else {
            setRegistro((prev) => ({ ...prev, saida: horaAtual }));
            setEstaTrabalhando(false);
        }
    };

    return (

        <section className='flex-1 flex text-center justify-center items-center'>

                <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl shadow-slate-100">

                    <div className="text-center">
                        <h1 className="text-xl font-bold text-slate-800">Registrar Ponto</h1>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            {obterDataPorExtenso()}
                        </p>
                    </div>

                    <div className="my-6 rounded-xl border-2 border-slate-100 bg-slate-50/50 p-5 text-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Tempo Trabalhado
                        </span>
                        <p className="mt-1 font-mono text-4xl font-bold tracking-tight text-slate-800">
                            {formatarCronometro(segundos)}
                        </p>
                    </div>

                    <button
                        onClick={alternarPonto}
                        className={`w-full rounded-xl cursor-pointer py-4 text-base font-bold text-white transition-all duration-200 active:scale-[0.98] ${estaTrabalhando
                                ? 'bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-100'
                                : 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-100'
                            }`}
                    >
                        {estaTrabalhando ? 'Registrar Saída' : 'Registrar Entrada'}
                    </button>

                    <div className="mt-6 border-t border-slate-100 pt-4">
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