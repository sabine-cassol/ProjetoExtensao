import { Check, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { AtividadesSkeleton } from '@/components/AtividadeSkeleton';
import Erro from '@/components/Error';


function Debug() {

    const { role } = useAuth();

    return (
        <>
            {/* <section className="flex-1">
                <h1 className="text-3xl font-bold overflow-hidden">Relatórios de presença</h1>
                <section className='mt-4 w-full'>
                    <div className="block space-y-4">
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm font-segoe text-sm transition-colors">

                            <div className="flex justify-between items-start border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-3">
                                <div>
                                    <p className="text-xs font-semibold text-[rgba(44,44,44,.50)] uppercase tracking-wider mb-0.5">Nome completo</p>
                                    <p className="font-medium text-zinc-900 dark:text-zinc-100">Ana Oliveira</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-[rgba(44,44,44,.50)] uppercase tracking-wider mb-0.5">Projeto</p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                                        InovaEdu
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-zinc-600 dark:text-zinc-400">
                                <div>
                                    <p className="text-[11px] font-semibold text-[rgba(44,44,44,.50)] uppercase">Data</p>
                                    <p className="font-medium text-zinc-800 dark:text-zinc-200 mt-0.5">01/02/2025</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold text-[rgba(44,44,44,.50)] uppercase">Entrada</p>
                                    <p className="font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">13:30</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[11px] font-semibold text-[rgba(44,44,44,.50)] uppercase">Saída</p>
                                    <p className="font-medium text-rose-600 dark:text-rose-400 mt-0.5">14:30</p>
                                </div>
                            </div>

                        </div>


                        <div className="w-full rounded-xl border border-gray-400 p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between font-body text-slate-700">
                            <div className="flex items-center gap-3 min-w-0 lg:w-48 lg:shrink-0"> */}
                                {/* <div className="w-10 h-10 rounded-full bg-[#C9A227]/15 text-[#C9A227] flex items-center justify-center font-display font-semibold text-sm shrink-0">
                                    AO
                                </div> */}
                                {/* <div className="min-w-0">
                                    <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Nome completo</p>
                                    <p className="text-sm font-semibold truncate">Ana Oliveira</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:flex lg:items-center lg:gap-8 lg:flex-1 min-w-0">
                                <div className="min-w-0">
                                    <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Projeto</p>
                                    <p className="text-sm font-semibold truncate">InovaEdu</p>
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Data</p>
                                    <p className="text-sm font-semibold truncate">01/02/2025</p>
                                </div>

                                <div className="flex gap-4 col-span-2 sm:col-span-1 min-w-0">
                                    <div className="min-w-0 flex-1 sm:flex-none">
                                        <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Entrada</p>
                                        <p className="text-sm font-semibold truncate">13:30</p>
                                    </div>
                                    <div className="min-w-0 flex-1 sm:flex-none">
                                        <p className="text-[13px] uppercase font-medium text-[#b7b9bb]">Saída</p>
                                        <p className="text-sm font-semibold truncate">14:30</p>
                                    </div>
                                </div>
                            </div>

                            {role === 'teacher' && (<div className="flex items-center gap-2 w-full lg:w-auto lg:shrink-0 justify-end mt-2 lg:mt-0">
                                <button title="Recusar presença" className="flex-1 lg:flex-none cursor-pointer h-10 w-10 min-w-11 flex items-center justify-center rounded-lg bg-red-400 text-white hover:bg-red-600 active:scale-[0.95] transition shrink-0 border border-red-200/60">
                                    <X size={18} strokeWidth={2.5} />
                                </button>

                                <button title="Aceitar presença" className="flex-1 lg:flex-none cursor-pointer h-10 w-10 min-w-11 flex items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.95] transition shrink-0 shadow-sm shadow-emerald-600/10">
                                    <Check size={18} strokeWidth={2.5} />
                                </button>
                            </div>)}

                            <div className="min-w-0 w-full lg:w-auto lg:shrink-0 flex flex-col justify-end items-end mt-2 lg:mt-0">
                                <p className="hidden lg:block text-[12px] uppercase font-bold tracking-wider text-slate-400 mb-1 text-right w-full">
                                    Status
                                </p>

                                <span className="w-full lg:w-auto text-center rounded-full text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                                    Em espera
                                </span>
                            </div>

                        </div>
                    </div>
                </section>
            </section> */}
            <Erro tipo='Dados'></Erro>
        </>
    )
}

export default Debug


