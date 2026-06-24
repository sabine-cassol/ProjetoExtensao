
import { PROJECTS } from '@/data/Projects.ts'
import { Link } from 'react-router-dom'

function Projects() {

    return (
        <>
            <main className="">
                <h1 className="text-4xl font-bold overflow-hidden leading-tight">Projetos</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-4">
                    {PROJECTS.map((projeto) => (
                        <Link to={`/Projetos/${projeto.id}`}>
                            <section key={projeto.id} className="bg-white p-4 rounded-lg border border-zinc-200 hover:border-indigo-200 transition-colors flex flex-col justify-between">
                                <div className='min-w-100'>
                                    <h2 className="text-base font-bold text-zinc-800 mb-1">{projeto.titulo}</h2>
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                                        <p className='text-xs font-light'>{projeto.responsavel}</p>
                                        <span className="font-semibold">•</span>
                                        <p className='text-xs font-light'>{projeto.cargaHoraria}h</p>
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