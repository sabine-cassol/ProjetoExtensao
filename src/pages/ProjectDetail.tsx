import Header from '../components/Header.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"


function ProjectDetail(){
    return(
        <>
            <SidebarProvider>
                <div className="flex flex-col w-screen h-screen overflow-hidden">
                    <Header />
                    <div className="flex flex-1 h-[calc(100vh-64px)] w-full overflow-hidden">
                        <AppSidebar />

                        <main className="flex-1 p-6 overflow-y-auto ">
                            <h1 className="text-2xl font-bold">Projeto detail</h1>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </>
    )
}

export default ProjectDetail