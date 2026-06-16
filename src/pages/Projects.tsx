import Header from '../components/Header.tsx'
import Footer from '../components/Footer.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"
import { PROJECTS } from '@/data/Projects.ts'
import { Link } from 'react-router-dom'
function Projects() {
    return (
        <>
            <SidebarProvider>
                <div className="flex flex-col w-screen min-h-screen ">
                    <Header />
                    <div className="flex flex-1 w-full ">
                        <AppSidebar />

                        <main className="p-4 ">
                            <h1 className="text-4xl font-bold overflow-hidden leading-tight">Projetos</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                {PROJECTS.map((projeto) => (
                                <Link to={`/Projetos/${projeto.id}`}>
                                    <section key={projeto.id} className="bg-white p-4 rounded-lg border border-zinc-200 hover:border-indigo-200 transition-colors flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-lg font-bold text-zinc-800 mb-2">{projeto.titulo}</h2>
                                            <p className='text-xs text-zinc-500 text-semibold'>{projeto.responsavel}</p>
                                        </div>

                                        <div className="flex justify-between items-center mt-2 pt-4 border-t border-zinc-100">

                                            <Link to={`/Projetos/${projeto.id}`} className="text-sm font-semibold text-indigo-500 hover:text-indigo-800 flex items-center justify-center gap-1 group">
                                                Ver detalhes do projeto
                                            </Link>
                                        </div>
                                    </section>
                                </Link>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
            <Footer/>
        </>
    )
}

export default Projects