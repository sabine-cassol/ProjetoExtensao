import Header from '../components/Header.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { NEWS } from '@/data/New.ts'

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
            <SidebarProvider>
                <div className="flex flex-col w-screen h-screen overflow-hidden">
                    <Header />
                    <div className="flex flex-1 h-[calc(100vh-64px)] w-full overflow-hidden">
                        <AppSidebar />

                        <main className="flex-1 p-6 overflow-y-auto">
                            <h1 className="text-2xl font-bold">{noticia.id}</h1>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </>
    )
}

export default NewDetail