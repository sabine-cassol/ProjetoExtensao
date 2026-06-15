import Header from '../components/Header.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"

function News() {
    return (
        <>
            <SidebarProvider>
                <div className="flex flex-col w-screen h-screen overflow-hidden">
                    <Header />
                    <div className="flex flex-1 h-[calc(100vh-64px)] w-full overflow-hidden">
                        <AppSidebar />

                        <main className="overflow-y-auto p-4">
                            <h1 className="text-4xl font-bold overflow-hidden">Notícias</h1>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </>
    )
}

export default News