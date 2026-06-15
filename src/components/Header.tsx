import Logo from '../assets/1763073341698.png'
import Logo2 from '../assets/IMG_20251114_003344.png'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSidebar } from "@/components/ui/sidebar"
import { useAuth } from '../context/AuthContext';

function Header() {

    const { toggleSidebar } = useSidebar();
    const { role } = useAuth();

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-zinc-300 bg-background ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                    <div className="flex justify-between items-center h-16">

                        <div className="flex flex-row justify-self-start items-center gap-3">


                            {role === 'student' || role === 'teacher' ? (
                                <button onClick={toggleSidebar} className="flex items-center justify-center h-9 w-9 rounded-full cursor-pointer transition-colors duration-200 hover:bg-zinc-500/10 active:bg-zinc-500/20 focus:outline-hidden">
                                    <Menu className="h-5 w-5 text-foreground" />
                                </button>
                            ) : null}

                            <picture>
                                <source srcSet={Logo} media="(min-width: 860px)" />
                                <img src={Logo2} alt="Logo" className="h-10 w-auto object-contain" />
                            </picture>
                        </div>

                        <nav className="hidden md:flex justify-center items-center gap-8 font-medium text-[1rem]">
                            <Link to='/' className="scroll-mt-10 cursor-pointer relative rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-gray-500/10">
                                Início
                            </Link>
                            <Link to='/Notícias' className="scroll-mt-10 cursor-pointer relative rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-gray-500/10 ">
                                Notícias
                            </Link>
                            <Link to='/Projetos' className="scroll-mt-10 cursor-pointer relative rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-gray-500/10 ">
                                Projetos
                            </Link>
                            <Link to='/Contato' className="scroll-mt-10 cursor-pointer relative rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-gray-500/10">
                                Contato
                            </Link>
                        </nav>
                        <div className="col-start-3 flex justify-end items-center gap-2 relative">
                            {role === 'guest' && (
                                <Link to="Login">
                                    <button className='p-2 px-4 cursor-pointer  text-white font-semibold rounded-lg bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-400'>
                                        Inscrever-se
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header