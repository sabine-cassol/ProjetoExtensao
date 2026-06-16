import Header from '../components/Header.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"
import Footer from '../components/Footer.tsx'


function Contact() {
    return (
        <>
            <SidebarProvider>
                <div className="flex flex-col w-screen min-h-screen">
                    <Header />
                    <div className="flex flex-1 w-full">
                        <AppSidebar />

                        <main className=" p-4 overflow-y-auto ">
                            <h1 className="text-4xl font-bold overflow-hidden">Contato</h1>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
            <Footer/>
        </>
    )
}

export default Contact