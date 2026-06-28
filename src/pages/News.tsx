import { Link } from 'react-router-dom'
import { NEWS } from '@/data/New.ts'
import { useAuth } from '@/context/AuthContext';

function News() {
    const { role } = useAuth();

    return (
        <>
            <main className=" flex-1 bg-zinc-50/50">
                <div className="min-h-full ">
                    <div className=" w-full mx-auto">
                        <h1 className="text-3xl font-bold text-zinc-900 mb-2 ">Mural de Notícias</h1>
                        <p className="text-sm text-zinc-500 mb-8">Fique por dentro das últimas atualizações do campus.</p>

                        <div className="mt-4">
                            {role === 'teacher' && (<Link to={'/CreateNew'} className="inline-flex items-center gap-2 bg-green-400 hover:bg-green-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                                <span>Criar notícia</span>
                            </Link>)}
                        </div>

                        <div className="grid gap-6 mt-4">
                            {NEWS.map((noticia) => (
                                <article key={noticia.id} className="bg-white p-6 rounded-lg border border-zinc-200 hover:border-indigo-200 transition-colors flex flex-col justify-between cursor-pointer">
                                    <Link to={`/Notícias/${noticia.id}`} className=" flex items-center">
                                        <div className='w-24 h-24 bg-zinc-200 border border-zinc-300 rounded-xl flex items-center justify-center mr-4 shrink-0 overflow-hidden'>
                                            <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                                                img
                                            </span>
                                        </div>
                                        <div>
                                            <h2 className="text-[1.30rem] font-bold text-cyan-950 mb-2">{noticia.titulo}</h2>
                                            <span className="text-xs text-zinc-400 font-medium block mb-2">{noticia.data}</span>
                                            <p className="text-zinc-600 text-sm mb-4 line-clamp-3 md:line-clamp-2 ">{noticia.resumo}</p>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default News