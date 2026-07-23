import { useAuth } from "@/context/AuthContext";
// import { PROJECTS } from "@/data/Projects";
// import { NEWS } from '@/data/New.ts';
import { Link } from "react-router-dom";
import { IdCard, Newspaper, FolderKanban, Lock } from "lucide-react";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
// import { projetoService } from '@/services/projetoService';

function Activities() {
    const { role, user } = useAuth();
    const [abaAtiva, setAbaAtiva] = useState<"projetos" | "noticias">("projetos");
    const [paginaAtual, setPaginaAtual] = useState(1);

    const NOTICIAS_POR_PAGINA = 15;

    const { data: meusProjetos, isLoading: isLoadingProjetos, error: errorProjetos } = useQuery({
        queryKey: ['projetos', 'professor', user?.id],
        queryFn: async () => {
            const res = await fetch(`/api/projetos/professor/${user!.id}`, {
                credentials: 'include'
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.erro || 'Erro ao buscar projetos');
            }
            const dados = await res.json();
            return dados.sort((a: any, b: any) => Number(b.ativo) - Number(a.ativo));
        },
        enabled: !!user?.id
    });

    const { data: minhasInscricoes, isLoading: isLoadingInscricoes, error: errorInscricoes } = useQuery({
        queryKey: ['inscricoes', 'minhas', user?.id],
        queryFn: async () => {
            const res = await fetch('/api/inscricoes/alunos/me/inscricoes', {
                credentials: 'include'
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.erro || 'Erro ao buscar inscrições');
            }
            const dados = await res.json();
            // extrai o projeto de cada inscrição
            return dados.map((inscricao: any) => inscricao.projeto);
        },
        enabled: role === 'student' && !!user?.id
    });

    const meusProjetosOuInscricoes = role === 'teacher' ? meusProjetos : minhasInscricoes;
    const isLoadingProjetosFinal = role === 'teacher' ? isLoadingProjetos : isLoadingInscricoes;
    const errorProjetosFinal = role === 'teacher' ? errorProjetos : errorInscricoes;
    const nenhumProjeto = !meusProjetosOuInscricoes || meusProjetosOuInscricoes.length === 0

    const { data: minhasNoticias, isLoading: isLoadingNoticias, error: errorNoticias } = useQuery({
        queryKey: ['noticias', 'professor', user?.id],
        queryFn: async () => {
            const res = await fetch(`/api/noticias/professor/${user!.id}`, {
                credentials: 'include'
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.erro || 'Erro ao buscar notícias');
            }
            return res.json();
        },
        enabled: !!user?.id && role === 'teacher'
    });

    const totalDePaginas = Math.ceil((minhasNoticias?.length ?? 0) / NOTICIAS_POR_PAGINA);
    const indiceFinal = paginaAtual * NOTICIAS_POR_PAGINA;
    const indiceInicial = indiceFinal - NOTICIAS_POR_PAGINA;
    const noticiasExibidas = minhasNoticias?.slice(indiceInicial, indiceFinal) ?? [];

    // const meusProjetos = PROJECTS;
    // const minhasNoticias = NEWS;


    const handleMudarAba = (aba: "projetos" | "noticias") => {
        setAbaAtiva(aba);
        setPaginaAtual(1);
    };

    if (isLoadingProjetosFinal || (role === 'teacher' && isLoadingNoticias)) {
        return <p>Carregando...</p>;
    }

    if (errorProjetosFinal || errorNoticias) {
        return <p>Erro ao carregar dados</p>;
    }

    if (!user) {
        return (
            <div className="flex-1 flex flex-col bg-white justify-center items-center p-6 text-center border rounded-lg border-zinc-300 ">
                <div className="p-6 bg-zinc-200 text-zinc-600 rounded-full flex items-center justify-center mb-2">
                    <Lock className="size-12" />
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 mb-1">
                    Acesso Restrito
                </h2>
                <p className="text-sm text-zinc-500 max-w-xs pt-2">
                    Você precisa estar conectado à sua conta para visualizar esta página.
                </p>
                <Link to="/login" className="inline-flex mt-4 items-center justify-center px-4 py-2 text-sm font-medium text-white bg-(--lightCyan) hover:bg-cyan-500 rounded-lg transition-colors shadow-xs">
                    Fazer Login
                </Link>
            </div>
        );
    }

    return (
        <>
            <section className=" flex-1 ">

                <h1 className="text-3xl font-bold overflow-hidden">Minhas Atividades</h1>

                {nenhumProjeto && (
                    <p className="text-sm text-zinc-500 pt-2">Nenhuma atividade no site ainda.</p>
                )
                }
                <div className="flex gap-4 mb-6 border-b border-zinc-100 pb-2 mt-4">
                    {!nenhumProjeto && (
                        <button onClick={() => handleMudarAba("projetos")} className={`flex items-center gap-2 pb-2 text-sm font-medium border-b-2 cursor-pointer ${abaAtiva === "projetos"
                            ? "border-indigo-500 text-blue-600"
                            : "border-transparent text-zinc-500 hover:text-zinc-700"
                            }`}>
                            <FolderKanban size={18} />
                            Projetos ({meusProjetosOuInscricoes?.length ?? 0})
                        </button>
                    )
                    }

                    {role === 'teacher' && (
                        <button onClick={() => handleMudarAba("noticias")} className={`flex items-center gap-2 pb-2 text-sm font-medium border-b-2 cursor-pointer ${abaAtiva === "noticias"
                            ? "border-indigo-500 text-blue-600"
                            : "border-transparent text-zinc-500 hover:text-zinc-700"
                            }`}>
                            <Newspaper size={18} />
                            Notícias ({minhasNoticias?.length ?? 0})
                        </button>
                    )}
                </div>

                {abaAtiva === "projetos" && (
                    nenhumProjeto ? (
                        <></>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-4">
                            {meusProjetosOuInscricoes?.map((projeto: any) => (
                                <Link to={`/Projetos/${projeto.id}`} key={projeto.id}>
                                    <section className={`bg-white p-4 rounded-lg border flex flex-col justify-between transition-all ease-linear hover:-translate-y-1.5 ${projeto.ativo ? 'border-zinc-200 hover:border-indigo-200' : 'border-zinc-200 opacity-60'
                                        }`}>
                                        <div className='min-w-100'>
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-base font-bold text-zinc-900 tracking-tight mb-1">{projeto.titulo}</h2>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-sm font-normal text-zinc-500">
                                                <p className='text-xs font-medium text-zinc-600'>{projeto.tipo}</p>
                                                <span className="font-semibold" aria-hidden="true">•</span>
                                                <p className='text-xs font-medium text-zinc-600'>{projeto.cargaHoraria}h</p>
                                            </div>
                                            <div className='mt-1 flex flex-row text-center gap-2'>
                                                <IdCard className='font-semibold text-zinc-500' />
                                                <p className='text-xs text-zinc-500 font-medium'>{projeto.professor?.nome}</p>
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
                        </div>
                    )
                )}


                {abaAtiva === "noticias" && (<div className="grid gap-6 mt-4">
                    {noticiasExibidas.map((noticia: any) => (
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