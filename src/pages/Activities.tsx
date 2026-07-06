import { useAuth } from "@/context/AuthContext";
import { PROJECTS } from "@/data/Projects";
import { NEWS } from '@/data/New.ts';
import { Link } from "react-router-dom";
import { IdCard, Newspaper, FolderKanban } from "lucide-react";
import { useState } from "react";


function Activities() {
    const { role } = useAuth();
    const [abaAtiva, setAbaAtiva] = useState<"projetos" | "noticias">("projetos");
    const [paginaAtual, setPaginaAtual] = useState(1);

    const NOTICIAS_POR_PAGINA = 15;
    const totalDePaginas = Math.ceil(NEWS.length / NOTICIAS_POR_PAGINA);
    const indiceFinal = paginaAtual * NOTICIAS_POR_PAGINA;
    const indiceInicial = indiceFinal - NOTICIAS_POR_PAGINA;
    const noticiasExibidas = NEWS.slice(indiceInicial, indiceFinal);

    const meusProjetos = PROJECTS;
    const minhasNoticias = NEWS;



    const handleMudarAba = (aba: "projetos" | "noticias") => {
        setAbaAtiva(aba);
        setPaginaAtual(1);
    };
    return (
        <>
            <section className=" flex-1 ">

                <h1 className="text-3xl font-bold overflow-hidden">Minhas Atividades</h1>

                <div className="flex gap-4 mb-6 border-b border-zinc-100 pb-2 mt-4">
                    <button onClick={() => handleMudarAba("projetos")} className={`flex items-center gap-2 pb-2 text-sm font-medium border-b-2 cursor-pointer ${abaAtiva === "projetos"
                            ? "border-indigo-500 text-blue-600"
                            : "border-transparent text-zinc-500 hover:text-zinc-700"
                            }`}>
                        <FolderKanban size={18} />
                        Projetos ({meusProjetos.length})
                    </button>

                    {role === 'teacher' && (
                        <button onClick={() => handleMudarAba("noticias")} className={`flex items-center gap-2 pb-2 text-sm font-medium border-b-2 cursor-pointer ${abaAtiva === "noticias"
                                ? "border-indigo-500 text-blue-600"
                                : "border-transparent text-zinc-500 hover:text-zinc-700"
                                }`}>
                            <Newspaper size={18} />
                            Notícias ({minhasNoticias.length})
                        </button>
                    )}
                </div>

                {abaAtiva === "projetos" && (<div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-4">
                    {PROJECTS.map((projeto) => (
                        <Link to={`/Projetos/${projeto.id}`}>
                            <section key={projeto.id} className="bg-white p-4 rounded-lg border border-zinc-200 hover:border-indigo-200 flex flex-col justify-between transition-all ease-linear  hover:-translate-y-1.5">
                                <div className='min-w-100'>
                                    <h2 className="text-base font-bold text-zinc-900 tracking-tight mb-1">{projeto.titulo}</h2>
                                    <div className="flex flex-wrap items-center gap-2 text-sm font-normal text-zinc-500">
                                        <p className='text-xs font-medium text-zinc-600'>{projeto.tipo}</p>
                                        <span className="font-semibold" aria-hidden="true">•</span>
                                        <p className='text-xs font-medium text-zinc-600'>{projeto.cargaHoraria}h</p>
                                    </div>
                                    <div className='mt-1 flex flex-row  text-center gap-2'>
                                        <IdCard className='font-semibold text-zinc-500'></IdCard>
                                        <p className='text-xs text-zinc-500 font-medium'>{projeto.responsavel}</p>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center mt-6 pt-4">

                                    <p className="text-sm font-semibold text-indigo-500 hover:text-indigo-800 flex items-center justify-center gap-1 group">
                                        Ver detalhes do projeto
                                    </p>
                                </div>
                            </section>
                        </Link>
                    ))}
                </div>)}

                {abaAtiva === "noticias" && (<div className="grid gap-6 mt-4">
                    {noticiasExibidas.map((noticia) => (
                        <article key={noticia.id} className="bg-white p-6 rounded-lg border border-zinc-200 hover:border-indigo-200 transition-colors flex flex-col justify-between cursor-pointer">
                            <Link to={`/Notícias/${noticia.id}`} className=" flex items-center">
                                <div className='w-24 h-24 bg-zinc-200 border border-zinc-300 rounded-xl flex items-center cover justify-center mr-4 shrink-0 overflow-hidden'>
                                    <img src={noticia.imageUrl} loading='lazy' className="text-xs object-cover size-full text-zinc-400 font-medium uppercase tracking-wider" />
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
                )}
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
            </section >
        </>
    )
}

export default Activities