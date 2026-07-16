import { Link } from 'react-router-dom'
// import { NEWS } from '@/data/New.ts'
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { type Noticia } from '@/data/NewType';
import { useQuery } from '@tanstack/react-query';

function News() {
    const { role } = useAuth();

    const [paginaAtual, setPaginaAtual] = useState(1);

    const { data: noticias, isLoading, error } = useQuery<Noticia[]>({
        queryKey: ['noticias'],
        queryFn: async () => {
            const res = await fetch('/api/noticias/todas');
            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.erro || 'Erro ao buscar notícias');
            }
            return res.json();
        }
    });


    const NOTICIAS_POR_PAGINA = 15;
    const totalDePaginas = Math.ceil(noticias?.length ?? 0 / NOTICIAS_POR_PAGINA);
    const indiceFinal = paginaAtual * NOTICIAS_POR_PAGINA;
    const indiceInicial = indiceFinal - NOTICIAS_POR_PAGINA;
    const noticiasExibidas = noticias?.slice(indiceInicial, indiceFinal) ?? [];

    if (isLoading) {
        return <p>Carregando notícias...</p>;
    }

    if (error) {
        return <p>Erro ao carregar notícias</p>;
    }


    return (
        <>
            <main className=" flex-1 bg-zinc-50/50">
                <div className="min-h-full ">
                    <div className=" w-full mx-auto">
                        <h1 className="text-3xl font-bold text-zinc-900 mb-2 ">Mural de Notícias</h1>
                        <p className="text-sm text-zinc-500 mb-8">Fique por dentro das últimas atualizações do campus.</p>

                        <div className="mt-4">
                            {role === 'teacher' && (<Link to={'/CreateNew'} className="inline-flex items-center gap-2 bg-[#2ab646] hover:bg-green-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                                <span>Criar notícia</span>
                            </Link>)}
                        </div>

                        <div className="grid gap-6 mt-4">
                            {noticiasExibidas.map((noticia) => (
                                <article key={noticia.id} className="bg-white p-6 rounded-lg border border-zinc-200 hover:border-indigo-200 transition-colors flex flex-col justify-between cursor-pointer">
                                    <Link to={`/Notícias/${noticia.id}`} className=" flex items-center">
                                        <div className='w-24 h-24 bg-zinc-200 border border-zinc-300 rounded-xl flex items-center cover justify-center mr-4 shrink-0 overflow-hidden'>
                                            <img src={noticia.imageUrl} loading='lazy' className="text-xs object-cover size-full text-zinc-400 font-medium uppercase tracking-wider" />
                                        </div>
                                        <div>
                                            <h2 className="text-[1.30rem] font-bold text-cyan-950 mb-2">{noticia.titulo}</h2>
                                            <span className="text-xs text-zinc-400 font-medium block mb-2">{new Date(noticia.createdAt).toLocaleDateString('pt-BR')}</span>
                                            <p className="text-zinc-600 text-sm mb-4 line-clamp-3 md:line-clamp-2 ">{noticia.resumo}</p>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                        {totalDePaginas > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8 pt-6">
                                <button onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))} disabled={paginaAtual === 1} className="px-4 py-2 cursor-pointer text-sm font-medium text-zinc-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed ">
                                    Anterior
                                </button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalDePaginas }, (_, index) => {
                                        const numeroPagina = index + 1;
                                        const isAtiva = paginaAtual === numeroPagina;
                                        return (
                                            <button key={numeroPagina} onClick={() => setPaginaAtual(numeroPagina)}
                                                className={`w-9 h-9 text-sm font-semibold rounded-md ${isAtiva
                                                    ? 'bg-cyan-400 text-white'
                                                    : 'text-zinc-600 hover:bg-zinc-100 border border-zinc-300 cursor-pointer'
                                                    }`}>
                                                {numeroPagina}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalDePaginas))} disabled={paginaAtual === totalDePaginas} className="px-4 py-2 cursor-pointer text-sm font-medium text-zinc-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed ">
                                    Próxima
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default News