
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { NEWS } from '@/data/New.ts'
import { Calendar, ArrowLeft, User } from 'lucide-react'


function NewDetail() {
    const { noticiaId } = useParams<{ noticiaId: string }>();

    const noticia = NEWS.find(n => n.id == noticiaId);

    if (!noticia) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
                <p className="text-lg text-zinc-600 mb-4 font-medium">⚠️ Notícia não encontrada.</p>
                <Link to="/" className="text-indigo-600 hover:underline text-sm font-semibold">Voltar para o início</Link>
            </div>
        );
    }
    return (
        <>

            <main className="flex-1 bg-zinc-50/50">
                <h1 className="text-2xl font-bold">
                    <Link to="/Notícias" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 mb-6 transition-colors">
                        <ArrowLeft size={16} /> Voltar para Notícias
                    </Link>

                    <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 md:p-8 shadow-xs">

                        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white leading-tight font-segoe">
                            {noticia.titulo}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs md:text-sm text-neutral-700 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                            <div className="flex items-center gap-1.5">
                                <User size={16} className="text-zinc-400" />
                                <span className='text-neutral-700 font-medium'>Por <span className="text-neutral-700 ">{noticia.autor}</span></span>
                            </div>
                            <span className="text-zinc-400 dark:text-zinc-700">•</span>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16} className="text-zinc-400" />
                                <span className='text-neutral-700 font-medium'>{noticia.data}</span>
                            </div>
                        </div>

                        <p className="mt-6 text-sm font-medium  text-zinc-600 pl-4 italic bg-neutral-100  py-2 ">
                            {noticia.resumo}
                        </p>

                        <div className="mt-8 font-normal text-sm leading-relaxed font-segoe whitespace-pre-line indent-8">
                            {noticia.conteudo}
                        </div>

                    </article>
                </h1>
            </main>

        </>
    )
}

export default NewDetail