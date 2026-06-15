import Header from '../components/Header.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"
import { PROJECTS } from '@/data/Projects.ts'
import { Link } from 'react-router-dom'
function Projects() {
    return (
        <>
            <SidebarProvider>
                <div className="flex flex-col w-screen h-screen overflow-hidden">
                    <Header />
                    <div className="flex flex-1 h-[calc(100vh-64px)] w-full overflow-hidden">
                        <AppSidebar />

                        <main className="p-4 overflow-y-auto">
                            <h1 className="text-4xl font-bold overflow-hidden leading-tight">Projetos</h1>
                            <div className="grid gap-6">
                                {PROJECTS.map((projeto) => (
                                    <section key={projeto.id} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 hover:border-indigo-500 transition-colors flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-zinc-800 mb-2">{projeto.titulo}</h2>
                                        </div>

                                        <div className="flex justify-between items-center mt-2 pt-4 border-t border-zinc-100">

                                            <Link to={`/Projetos/${projeto.id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group">
                                                Ver detalhes do projeto
                                                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                                            </Link>
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </>
    )
}

export default Projects