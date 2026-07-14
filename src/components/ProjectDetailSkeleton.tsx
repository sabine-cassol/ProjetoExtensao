function SkeletonBlock({ className = "" }: { className?: string }) {
    return <div className={`bg-zinc-200 rounded animate-pulse ${className}`} />;
}

export function ProjectDetailSkeleton() {
    const linhas = [
        "Tipo", "Unidade", "Cursos Vinculados", "Parceiros", "Colaboradores",
        "Comunidade Participante", "Semestre", "Vagas", "ODS", "Ciclo",
        "Competência", "Eixo", "Período de Inscrição", "Período de Execução"
    ];

    return (
        <main className="flex-1 bg-zinc-50/50">
            <section className="cursor-default">


                <div className="bg-white border border-zinc-300 p-4">

                    <section>
                        <SkeletonBlock className="h-7 w-2/3 md:w-1/2" />
                        <div className="bg-zinc-300 min-w-3xs h-0.5 mt-2"></div>
                    </section>

                    {/* Tabela */}
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full border-collapse font-segoe text-sm border border-gray-300">
                            <tbody className="divide-y divide-gray-200">
                                {linhas.map((label) => (
                                    <tr key={label}>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">{label}</td>
                                        <td className="px-3 py-2">
                                            <SkeletonBlock className="h-4 w-3/4" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {[1, 2, 3].map((i) => (
                        <section key={i} className="mt-4">
                            <SkeletonBlock className="h-4 w-40 mb-2" />
                            <SkeletonBlock className="h-3 w-full mb-1" />
                            <SkeletonBlock className="h-3 w-full mb-1" />
                            <SkeletonBlock className="h-3 w-2/3" />
                        </section>
                    ))}

                </div>
            </section>
        </main>
    );
}