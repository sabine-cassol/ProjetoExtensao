import Header from '../components/Header.tsx'
import Footer from '../components/Footer.tsx'
import { SidebarProvider } from "../components/ui/sidebar.tsx"
import { AppSidebar } from "../components/app-sidebar.tsx"
import { useParams } from 'react-router-dom'
import { PROJECTS } from '@/data/Projects.ts'
import { useAuth } from '@/context/AuthContext.tsx'
import { Link } from 'react-router-dom'


function ProjectDetail() {
    const { projetoId } = useParams<{ projetoId: string }>();
    const { role } = useAuth();

    const projeto = PROJECTS.find(p => p.id == projetoId);

    if (!projeto) {
        return (
            <h2>projeto nao encontrado</h2>
        )
    }

    return (
        <>
            <SidebarProvider defaultOpen={role === 'student' || role === 'teacher'}>
                <div className="flex flex-col w-screen min-h-screen">
                    <Header />
                    <div className="flex flex-1 w-full ">
                        <AppSidebar />

                        <main className="flex-1 p-6 bg-zinc-50/50">
                            <section className="cursor-default">
                                <div className='bg-white border border-zinc-200 p-4'>

                                    <section>
                                        <h1 className='text-2xl font-bold'> {projeto.titulo}</h1>
                                        <div className='bg-[hsl(0,0%,75%)] min-w-3xs h-0.5 mt-2'></div>
                                    </section>

                                    {role === 'student' ? (
                                        <section className="mt-3">
                                            <span className='font-bold text-xs font-segoe text-[#626262]'>Status</span>
                                            <p className='leading-5 text-justify indent-8 font-segoe text-xs text-[#626262]'>Inscrito/Não inscrito</p>
                                        </section>
                                    ) : null}

                                    {projeto.pretensao && projeto.pretensao.length > 0 ? (
                                        <section className="mt-3">
                                            <span className='font-bold text-xs font-segoe text-[#626262]'>Pretensão da atividade</span>
                                            <p className='leading-5 text-justify indent-8 font-segoe text-xs text-[#626262]'>{projeto.pretensao}</p>
                                        </section>) : null}

                                    {projeto.requisitos && projeto.requisitos.length > 0 ? (
                                        <section className="mt-3">
                                            <span className='font-bold text-xs font-segoe text-[#626262]'>Requisitios Técnicos</span>
                                            <p className='leading-5 text-justify indent-8 font-segoe text-xs text-[#626262]'>{projeto.requisitos}</p>
                                        </section>) : null}

                                    {projeto.justificativa && projeto.justificativa.length > 0 ? (
                                        <section className="mt-3">
                                            <span className='font-bold text-xs font-segoe text-[#626262]'>Justificativa de Relevância</span>
                                            <p className='leading-5 text-justify indent-8 font-segoe text-xs text-[#626262]'>{projeto.justificativa}</p>
                                        </section>) : null}

                                    {projeto.detalhes && projeto.detalhes.length > 0 ? (
                                        <section className="mt-3">
                                            <span className='font-bold text-xs font-segoe text-[#626262]'>Detalhes da Atividade</span>
                                            <p className='leading-5 text-justify indent-8 font-segoe text-xs text-[#626262]'>{projeto.detalhes}</p>
                                        </section>
                                    ) : null}

                                    {role === 'guest' ? (
                                        <section>
                                            <button className='mt-5 flex bg-(--darkBlue) text-white p-2 cursor-pointer rounded-sm justify-self-center hover:bg-indigo-900 active:bg-indigo-500'> Quero participar </button>
                                        </section>
                                    ) : null}

                                    {role === 'student' ? (
                                        <section>
                                            <Link to={'/Presenca'}>
                                                <button className='mt-5 flex bg-(--darkBlue) text-white p-2 cursor-pointer rounded-sm justify-self-center hover:bg-indigo-900 active:bg-indigo-500'> Registrar presença </button>
                                            </Link>
                                        </section>
                                    ) : null}
                                </div>
                            </section>

                        </main>
                    </div>
                </div>
            </SidebarProvider>
            <Footer />
        </>
    )
}

export default ProjectDetail