import { Mail, Phone, MapPin } from 'lucide-react'

function Contact() {
    return (
        <>
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
        </>
    )
}

export default Contact