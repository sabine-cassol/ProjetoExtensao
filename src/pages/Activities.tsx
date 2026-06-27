function Activities() {

    return (
        <>
            <main className=" flex-1 ">
                <h1 className="text-4xl font-bold overflow-hidden ">Minhas Atividades</h1>
                <section className='mt-4'>
                    <div className="block md:hidden space-y-4">
                        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-segoe text-sm text-zinc-800 dark:text-zinc-200 shadow-sm">
                            <div>
                                <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Nome</span>
                                <span className="font-medium text-base">Desenvolvimento Web Full Stack</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-3">
                                <div>
                                    <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Início</span>
                                    <span>10/03/2026</span>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Encerramento</span>
                                    <span>15/12/2026</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Carga horária</span>
                                <span className="inline-block py-0.5 rounded text-xs font-medium mt-0.5">360h</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-segoe text-sm text-zinc-800 dark:text-zinc-200 shadow-sm">
                            <div>
                                <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Nome</span>
                                <span className="font-medium text-base">Introdução à Inteligência Artificial</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-3 border-zinc-100 dark:border-zinc-800/50">
                                <div>
                                    <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Início</span>
                                    <span>05/04/2026</span>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Encerramento</span>
                                    <span>28/06/2026</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Carga horária</span>
                                <span className="inline-block py-0.5 rounded text-xs font-medium mt-0.5">60h</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block w-full overflow-x-auto border border-zinc-200 dark:border-zinc-800">
                        <table className="min-w-full divide-y border border-zinc-200 border-collapse text-align-center divide-gray-200 bg-white dark:bg-zinc-900 text-sm">
                            <thead className="border-bottom border-zinc-200">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-[rgba(44,44,44,.50)] font-segoe">Nome</th>
                                    <th className="px-4 py-3 text-left font-semibold text-[rgba(44,44,44,.50)] font-segoe">data de Inicio</th>
                                    <th className="px-4 py-3 text-left font-semibold text-[rgba(44,44,44,.50)] font-segoe">data de encerramento</th>
                                    <th className="px-4 py-3 text-left font-semibold text-[rgba(44,44,44,.50)] font-segoe">Carga horária</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors font-segoe">
                                    <td className="px-4 py-3 font-segoe">Desenvolvimento Web Full Stack</td>
                                    <td className="px-4 py-3 font-segoe">10/03/2026</td>
                                    <td className="px-4 py-3 font-segoe">15/12/2026</td>
                                    <td className="px-4 py-3 font-segoe">360h</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors font-segoe">
                                    <td className="px-4 py-3 font-segoe">Introdução à Inteligência Artificial</td>
                                    <td className="px-4 py-3 font-segoe">05/04/2026</td>
                                    <td className="px-4 py-3 font-segoe">28/06/2026</td>
                                    <td className="px-4 py-3 font-segoe">60h</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={4}> &nbsp;</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Activities