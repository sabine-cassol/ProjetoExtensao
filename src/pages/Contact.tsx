import Header from '../components/Header.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"
import Footer from '../components/Footer.tsx'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useAuth } from '@/context/AuthContext.tsx'

function Contact() {
    const { role } = useAuth();
    return (
        <>
            <SidebarProvider defaultOpen={role === 'student' || role === 'teacher'}>
                <div className="flex flex-col w-screen min-h-screen">
                    <Header />
                    <div className="flex flex-1 w-full">
                        <AppSidebar />

                        <main className=" p-4 flex-1 ">
                            <h1 className="text-4xl font-bold overflow-hidden">Contato</h1>
                            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                                <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-300 bg-card">
                                    <Mail className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium">Email</p>
                                        <p className="text-sm text-muted-foreground">contato@email.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-300 bg-card">
                                    <Phone className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium">Telefone</p>
                                        <p className="text-sm text-muted-foreground">(41) 99999-9999</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-300 bg-card">
                                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium">Localização</p>
                                        <p className="text-sm text-muted-foreground">Curitiba, PR</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-300 bg-card">
                                    <Mail className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium">Instagram</p>
                                        <a href="https://github.com/seuuser" target="_blank" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                            Instagram.com/extensão
                                        </a>
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

export default Contact