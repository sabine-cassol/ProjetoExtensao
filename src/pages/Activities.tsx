function Activities() {

    return (
        <>
            <main className="p-4 flex-1 ">
                <h1 className="text-4xl font-bold overflow-hidden ">Atividades</h1>
                <section className='mt-4'>

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
                                <td colSpan={5}> &nbsp;</td>
                            </tr>
                        </tfoot>
                    </table>
                </section>
            </main>
        </>
    )
}

export default Activities