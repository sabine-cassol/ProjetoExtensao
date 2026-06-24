import { Mail, Phone, MapPin } from 'lucide-react'


function Contact() {
    return (
        <>
            <main className=" flex-1 ">
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
                        <svg className="w-7 h-7 text-primary shrink-0" fill="#000000" viewBox="0 0 32 32" id="Camada_1" version="1.1" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z"></path> <path d="M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8 c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z"></path> <path d="M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8 c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z"></path> </g> </g></svg>
                        <div>
                            <p className="text-sm font-medium">Instagram</p>
                            <p className="text-sm text-muted-foreground">extensão</p>
                        </div>
                    </div>
                </div>
        </main >
        </>
    )
}

export default Contact