import { useParams } from 'react-router-dom'
import { PROJECTS } from '@/data/Projects.ts'
import { useAuth } from '@/context/AuthContext.tsx'
import { Link } from 'react-router-dom'


function ProjectDetail() {
    const { projetoId } = useParams<{ projetoId: string }>();
    const { role } = useAuth();

    const projeto = PROJECTS.find(p => p.id == projetoId);

    if (!projeto) {
        return (
            <h2>projeto nao encontrado</h2>
        )
    }

    return (
        <>
            <main className="flex-1 bg-zinc-50/50">
                <section className="cursor-default">
                    <div className='bg-white border border-zinc-300 p-4'>

                        <section>
                            <h1 className='text-2xl font-bold'> {projeto.titulo}</h1>
                            <div className='bg-zinc-300 min-w-3xs h-0.5 mt-2'></div>
                        </section>

                        {role === 'student' ? (
                            <section className="mt-3">
                                <span className='font-bold text-xs font-segoe text-[#626262]'>Status</span>
                                <p className='leading-5 text-justify indent-8 font-segoe text-xs text-[#626262]'>Inscrito/Não inscrito</p>
                            </section>
                        ) : null}

                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full border-collapse font-segoe text-sm text-[#626262] border border-gray-300">
                                <tbody className="divide-y divide-gray-200">
                                    {projeto.tipo && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Tipo</td>
                                            <td className="px-3 py-2 text-justify ">{projeto.tipo}</td>
                                        </tr>
                                    )}
                                    {projeto.unidade && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Unidade</td>
                                            <td className="px-3 py-2 text-justify">{projeto.unidade}</td>
                                        </tr>
                                    )}
                                    {projeto.cursosVinculados && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">Cursos Vinculados</td>
                                            <td className="px-3 py-2 text-justify">{projeto.cursosVinculados}</td>
                                        </tr>
                                    )}
                                    {projeto.parceiros && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">Parceiros</td>
                                            <td className="px-3 py-2 text-justify">{projeto.parceiros}</td>
                                        </tr>
                                    )}
                                    {projeto.colaboradores && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">Colaboradores</td>
                                            <td className="px-3 py-2 text-justify">{projeto.colaboradores}</td>
                                        </tr>
                                    )}
                                    {projeto.comunidadeParticipante && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">Comunidade Participante</td>
                                            <td className="px-3 py-2 text-justify">{projeto.comunidadeParticipante}</td>
                                        </tr>
                                    )}
                                    {projeto.semestre && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">Semestre</td>
                                            <td className="px-3 py-2 text-justify">{projeto.semestre}</td>
                                        </tr>
                                    )}
                                    {projeto.vagas && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">Vagas</td>
                                            <td className="px-3 py-2 text-justify">{projeto.vagas}</td>
                                        </tr>
                                    )}
                                    {projeto.ods && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">ODS</td>
                                            <td className="px-3 py-2 text-justify">{projeto.ods}</td>
                                        </tr>
                                    )}
                                    {projeto.ciclo && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">Ciclo</td>
                                            <td className="px-3 py-2 text-justify">{projeto.ciclo}</td>
                                        </tr>
                                    )}
                                    {projeto.competencia && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">Competência</td>
                                            <td className="px-3 py-2 text-justify">{projeto.competencia}</td>
                                        </tr>
                                    )}
                                    {projeto.eixo && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">Eixo</td>
                                            <td className="px-3 py-2 text-justify">{projeto.eixo}</td>
                                        </tr>
                                    )}
                                    {projeto.periodoInscricao && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">Período de Inscrição</td>
                                            <td className="px-3 py-2 text-justify">{projeto.periodoInscricao}</td>
                                        </tr>
                                    )}
                                    {projeto.periodoExecucao && (
                                        <tr>
                                            <td className="px-3 py-2 font-bold text-zinc-900">Período de Execução</td>
                                            <td className="px-3 py-2 text-justify">{projeto.periodoExecucao}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {projeto.justificativa && projeto.justificativa.length > 0 ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Justificativa de Relevância</span>
                                <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.justificativa}</p>
                            </section>) : null}
                        {projeto.pretensao && projeto.pretensao.length > 0 ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Pretensão da atividade</span>
                                <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.pretensao}</p>
                            </section>) : null}

                        {projeto.requisitos && projeto.requisitos.length > 0 ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Requisitios Técnicos</span>
                                <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.requisitos}</p>
                            </section>) : null}



                        {role === 'guest' ? (
                            <section>
                                <button className='mt-5 flex bg-(--darkBlue) text-white p-2 cursor-pointer rounded-sm justify-self-center hover:bg-indigo-900 active:bg-indigo-500'> Quero participar </button>
                            </section>
                        ) : null}

                        {role === 'student' ? (
                            <section>
                                <Link to={'/Presenca'}>
                                    <button className='mt-5 flex bg-(--darkBlue) text-white p-2 cursor-pointer rounded-sm justify-self-center hover:bg-indigo-900 active:bg-indigo-500'> Registrar presença </button>
                                </Link>
                            </section>
                        ) : null}
                    </div>
                </section>

            </main>

        </>
    )
}

export default ProjectDetail