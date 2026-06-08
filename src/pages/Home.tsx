import Header from '../components/Header.tsx'
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"

function Home() {
    return (
        <>
            <SidebarProvider>
                <div className="flex flex-col w-screen h-screen overflow-hidden">
                    <Header />

        
                    <div className="flex flex-1 h-[calc(100vh-64px)] w-full overflow-hidden">

                        <AppSidebar />

                        <main className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
                            <h1 className="text-2xl font-bold">Bem-vindo ao Dashboard</h1>
                            <p className="text-muted-foreground mt-2">
                                Note que a barra lateral agora abre abaixo do header sem cobri-lo!
                            </p>

                        </main>

                    </div>
                </div>
            </SidebarProvider>

        </>
    )
}

export default Home