import { Check, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react';
import { PRESENCES } from '@/data/Presences';

function Reports() {

    const { role } = useAuth();
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [listaPresences, setListaPresences] = useState(PRESENCES);

    const handleUpdateStatus = (id: string, novoStatus: 'em Análise' | 'Aprovado' | 'Recusado') => {
        setListaPresences((prev) =>
            prev.map((presenca) =>
                presenca.id === id ? { ...presenca, status: novoStatus } : presenca
            )
        );
    };


    const PRESENCAS_POR_PAGINA = 15;
    const totalDePaginas = Math.ceil(listaPresences.length / PRESENCAS_POR_PAGINA);
    const indiceFinal = paginaAtual * PRESENCAS_POR_PAGINA;
    const indiceInicial = indiceFinal - PRESENCAS_POR_PAGINA;
    const presencasExibidas = PRESENCES.slice(indiceInicial, indiceFinal);

    return (
        <>
            <main className="flex-1">
                <h1 className="text-3xl font-bold overflow-hidden">Relatórios de presença</h1>
                <section className='mt-4 w-full'>
                    <div className="block space-y-4">

                        {presencasExibidas.map((presenca) => (<div className="w-full rounded-xl border border-zinc-300 p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between font-body text-slate-700">
                            <div className="flex items-center gap-3 min-w-0 lg:w-48 lg:shrink-0">
                                {/* <div className="w-10 h-10 rounded-full bg-[#C9A227]/15 text-[#C9A227] flex items-center justify-center font-display font-semibold text-sm shrink-0">
                                    AO
                                </div> */}
                                <div className="min-w-0">
                                    <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Nome completo</p>
                                    <p className="text-sm font-semibold truncate">{presenca.aluno}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:flex lg:items-center lg:gap-8 lg:flex-1 min-w-0">
                                <div className="min-w-0">
                                    <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Projeto</p>
                                    <p className="text-sm font-semibold truncate">{presenca.projeto}</p>
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Data</p>
                                    <p className="text-sm font-semibold truncate">{presenca.data}</p>
                                </div>

                                <div className="flex gap-4 col-span-2 sm:col-span-1 min-w-0">
                                    <div className="min-w-0 flex-1 sm:flex-none">
                                        <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Entrada</p>
                                        <p className="text-sm font-semibold truncate">{presenca.entrada}</p>
                                    </div>
                                    <div className="min-w-0 flex-1 sm:flex-none">
                                        <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Saída</p>
                                        <p className="text-sm font-semibold truncate">{presenca.saida}</p>
                                    </div>
                                </div>
                            </div>

                            {role === 'teacher' && (<div className="flex items-center gap-2 w-full lg:w-auto lg:shrink-0 justify-end mt-2 lg:mt-0">
                                <button title="Recusar presença" onClick={() => handleUpdateStatus(presenca.id, 'Recusado')} className="flex-1 lg:flex-none cursor-pointer h-10 w-10 min-w-11 flex items-center justify-center rounded-lg bg-red-400 text-white hover:bg-red-600 active:scale-[0.95] transition shrink-0 border border-red-200/60">
                                    <X size={18} strokeWidth={2.5} />
                                </button>

                                <button title="Aceitar presença" onClick={() => handleUpdateStatus(presenca.id, 'Aprovado')} className="flex-1 lg:flex-none cursor-pointer h-10 w-10 min-w-11 flex items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.95] transition shrink-0 shadow-sm shadow-emerald-600/10">
                                    <Check size={18} strokeWidth={2.5} />
                                </button>
                            </div>)}

                            {role === 'student' && (<div className="min-w-0 w-full lg:w-auto lg:shrink-0 flex flex-col justify-end items-end mt-2 lg:mt-0">
                                <p className="hidden lg:block text-[12px] uppercase font-bold tracking-wider text-slate-400 mb-1 text-right w-full">
                                    Status
                                </p>

                                <span className="w-full lg:w-auto text-center rounded-full text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                                    {presenca.status}
                                </span>
                            </div>)}
                        </div>))}
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