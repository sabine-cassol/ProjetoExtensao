import Header from '../components/Header.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"
import { Link } from 'react-router-dom'
import { NEWS } from '@/data/New.ts'

function News() {
    return (
        <>
            <SidebarProvider>
                <div className="flex flex-col w-screen h-screen overflow-hidden">
                    <Header />
                    <div className="flex flex-1 h-[calc(100vh-64px)] w-full overflow-hidden">
                        <AppSidebar />
                        <main className=" flex-1 overflow-y-auto p-4">
                            <div className="min-h-screen bg-zinc-50 p-6">
                                <div className="max-w-4xl mx-auto">
                                    <h1 className="text-3xl font-bold text-zinc-900 mb-2">Mural de Notícias</h1>
                                    <p className="text-sm text-zinc-500 mb-8">Fique por dentro das últimas atualizações do campus.</p>

                                    <div className="grid gap-6">
                                        {NEWS.map((noticia) => (
                                            <article key={noticia.id} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 hover:border-indigo-500 transition-colors flex flex-col justify-between">
                                                <div>
                                                    <span className="text-xs text-zinc-400 font-medium block mb-2">{noticia.data}</span>
                                                    <h2 className="text-xl font-bold text-zinc-800 mb-2">{noticia.titulo}</h2>
                                                    <p className="text-zinc-600 text-sm mb-4">{noticia.resumo}</p>
                                                </div>

                                                <div className="flex justify-between items-center mt-2 pt-4 border-t border-zinc-100">
                                                    <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded">
                                                        Por: {noticia.autor}
                                                    </span>

                                                    <Link to={`/Notícias/${noticia.id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group">
                                                        Ler notícia completa
                                                        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                                                    </Link>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </>
    )
}

export default News