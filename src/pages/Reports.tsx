import Header from '../components/Header.tsx'
import Footer from '../components/Footer.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"


function Reports() {
    return (
        <>
            <SidebarProvider>
                <div className="flex flex-col w-screen min-h-screen ">
                    <Header />
                    <div className="flex flex-1 w-full">
                        <AppSidebar />

                        <main className="p-4">
                            <h1 className="text-4xl font-bold overflow-hidden">Relatórios</h1>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
            <Footer/>
        </>
    )
}

export default Reports