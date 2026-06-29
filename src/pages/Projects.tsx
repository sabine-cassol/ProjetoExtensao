
import { PROJECTS } from '@/data/Projects.ts'
import { Link } from 'react-router-dom'
import { IdCard } from 'lucide-react'
import { useAuth } from '@/context/AuthContext';

function Projects() {
    const { role } = useAuth();

    return (
        <>
            <main className="">
                <h1 className="text-4xl font-bold overflow-hidden leading-tight">Projetos</h1>
                <div className="mt-4">
                    {role === 'teacher' && (<Link to={'/CreateProject'} className="inline-flex items-center gap-2 bg-[#2ab646] hover:bg-green-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                        <span>Criar projeto</span>
                    </Link>)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-4">
                    {PROJECTS.map((projeto) => (
                        <Link to={`/Projetos/${projeto.id}`}>
                            <section key={projeto.id} className="bg-white p-4 rounded-lg border border-zinc-200 hover:border-indigo-200 flex flex-col justify-between transition-all ease-linear  hover:-translate-y-1.5">
                                <div className='min-w-100'>
                                    <h2 className="text-base font-bold text-zinc-800 mb-1">{projeto.titulo}</h2>
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                                        <p className='text-xs font-base'>{projeto.tipo}</p>
                                        <span className="font-semibold">•</span>
                                        <p className='text-xs font-base'>{projeto.cargaHoraria}h</p>
                                    </div>
                                    <div className='mt-1 flex flex-row items- text-center gap-2'>
                                        <IdCard className='font-semibold text-zinc-600'></IdCard>
                                        <p className='text-xs text-zinc-600 font-semibold'>{projeto.responsavel}</p>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center mt-6 pt-4">

                                    <Link to={`/Projetos/${projeto.id}`} className="text-sm font-semibold text-indigo-500 hover:text-indigo-800 flex items-center justify-center gap-1 group">
                                        Ver detalhes do projeto
                                    </Link>
                                </div>
                            </section>
                        </Link>
                    ))}
                </div>
            </main>

        </>
    )
}

export default Projects