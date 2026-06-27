
function Reports() {
    return (
        <>
            <main className="flex-1">
                <h1 className="text-4xl font-bold overflow-hidden">Relatórios de presença</h1>
                <section className='mt-4 w-full'>
                    <div className="block md:hidden space-y-4">
                        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-segoe text-sm text-zinc-800 dark:text-zinc-200 ">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Nome completo</span>
                                    <span className="font-medium text-base">Ana Oliveira</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Data</span>
                                    <span className="text-zinc-600 dark:text-zinc-400 font-mono font-semibold">01/02/2025</span>
                                </div>
                            </div>

                            <div className="pt-2 border-zinc-100 dark:border-zinc-800/50">
                                <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Projeto</span>
                                <span className="font-medium">InovaEdu</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-3 p-2">
                                <div>
                                    <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Entrada</span>
                                    <span className="font-mono text-zinc-700 dark:text-zinc-300 font-semibold">13:30</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold text-[rgba(44,44,44,.50)] dark:text-zinc-500 block uppercase">Saída</span>
                                    <span className="font-mono text-zinc-700 dark:text-zinc-300 font-semibold">14:30</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block w-full overflow-x-auto border border-zinc-200 dark:border-zinc-800">
                        <table className="min-w-full divide-y border border-zinc-200 border-collapse text-align-center divide-gray-200 bg-white dark:bg-zinc-900 text-sm">
                            <thead className="border-bottom border-zinc-200">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-[rgba(44,44,44,.50)] font-segoe">Nome completo</th>
                                    <th className="px-4 py-3 text-left font-semibold text-[rgba(44,44,44,.50)] font-segoe">Projeto</th>
                                    <th className="px-4 py-3 text-left font-semibold text-[rgba(44,44,44,.50)] font-segoe">Data</th>
                                    <th className="px-4 py-3 text-right font-semibold text-[rgba(44,44,44,.50)] font-segoe">Entrada</th>
                                    <th className="px-4 py-3 text-right font-semibold text-[rgba(44,44,44,.50)] font-segoe">Saída</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors font-segoe">
                                    <td className="px-4 py-3 font-segoe">Ana Oliveira</td>
                                    <td className="px-4 py-3 font-segoe">InovaEdu</td>
                                    <td className="px-4 py-3 font-segoe">01/02/2025</td>
                                    <td className="px-4 py-3 text-right font-segoe">13:30</td>
                                    <td className="px-4 py-3 text-right font-segoe">14:30</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={5}> &nbsp;</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </section>
            </main>

        </>
    )
}

export default Reports