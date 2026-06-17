import Header from '../components/Header.tsx'
import Footer from '../components/Footer.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"
import { Link } from 'react-router-dom'
import { NEWS } from '@/data/New.ts'
import { useAuth } from '@/context/AuthContext.tsx'


function News() {
    const { role } = useAuth();
    return (
        <>
            <SidebarProvider defaultOpen={role === 'student' || role === 'teacher'}>
                <div className="flex flex-col w-screen min-h-screen ">
                    <Header />
                    <div className="flex flex-1 w-full ">
                        <AppSidebar />
                        <main className=" flex-1 bg-zinc-50/50">
                            <div className="min-h-screen p-6">
                                <div className="max-w-4xl mx-auto">
                                    <h1 className="text-3xl font-bold text-zinc-900 mb-2 ">Mural de Notícias</h1>
                                    <p className="text-sm text-zinc-500 mb-8">Fique por dentro das últimas atualizações do campus.</p>

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
                                                        <p className="text-zinc-600 text-sm mb-4 ">{noticia.resumo}</p>
                                                    </div>
                                                </Link>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
            <Footer />
        </>
    )
}

export default News