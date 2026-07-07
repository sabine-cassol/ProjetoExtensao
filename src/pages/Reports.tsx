import { Check, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

function Reports() {

    const { role } = useAuth();
    return (
        <>
            <main className="flex-1">
                <h1 className="text-3xl font-bold overflow-hidden">Relatórios de presença</h1>
                <section className='mt-4 w-full'>
                    <div className="block space-y-4">
 
                        <div className="w-full rounded-xl border border-gray-400 p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between font-body text-slate-700">
                            <div className="flex items-center gap-3 min-w-0 lg:w-48 lg:shrink-0">
                                {/* <div className="w-10 h-10 rounded-full bg-[#C9A227]/15 text-[#C9A227] flex items-center justify-center font-display font-semibold text-sm shrink-0">
                                    AO
                                </div> */}
                                <div className="min-w-0">
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

                            {role === 'student' && (<div className="min-w-0 w-full lg:w-auto lg:shrink-0 flex flex-col justify-end items-end mt-2 lg:mt-0">
                                <p className="hidden lg:block text-[12px] uppercase font-bold tracking-wider text-slate-400 mb-1 text-right w-full">
                                    Status
                                </p>

                                <span className="w-full lg:w-auto text-center rounded-full text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                                    Em espera
                                </span>
                            </div>)}
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}

export default Reports