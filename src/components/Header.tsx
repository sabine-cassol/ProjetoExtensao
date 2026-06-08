import Logo from '../assets/1763073341698.png'
import Logo2 from '../assets/IMG_20251114_003344.png'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSidebar } from "@/components/ui/sidebar"

function Header() {

    const { toggleSidebar } = useSidebar()

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-zinc-300 bg-background ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                    <div className="flex justify-between items-center h-16">

                        <div className="flex flex-row justify-self-start items-center gap-3">
                            <button onClick={toggleSidebar} className="flex items-center justify-center h-9 w-9 rounded-full cursor-pointer transition-colors duration-200 hover:bg-zinc-500/10 active:bg-zinc-500/20 focus:outline-hidden">
                                <Menu className="h-5 w-5 text-foreground" />
                            </button>


                            <picture>
                                <source srcSet={Logo} media="(min-width: 860px)" />
                                {/* Caso contrário (telas menores), renderiza a logo mobile */}
                                <img src={Logo2} alt="Logo" className="h-10 w-auto object-contain" />
                            </picture>
                        </div>

                        <nav className="hidden md:flex justify-center items-center gap-8 font-medium text-[1rem]">
                            <a className="scroll-mt-10 cursor-pointer relative rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-gray-500/10">
                                Início
                            </a>
                            <a className="scroll-mt-10 cursor-pointer relative rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-gray-500/10 ">
                                Notícias
                            </a>
                            <a className="scroll-mt-10 cursor-pointer relative rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-gray-500/10 ">
                                Projetos
                            </a>
                            <a className="scroll-mt-10 cursor-pointer relative rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-gray-500/10">
                                Contato
                            </a>
                        </nav>

                        <div className="col-start-3 flex justify-end items-center gap-2 relative">
                            {/* <button className="p-2 w-4 bg-cyan-400 cursor-pointer theme relative flex items-center justify-center before:content-[''] before:absolute  before:m-auto before:flex before:items-center before:justify-center before:w-0 before:h-0 before:rounded-full before:bg-darkWhite dark:before:bg-zinc-800 before:z-[-1] hover:before:w-10 hover:before:h-10 ">
                                Inscrever-se
                            </button> */}

                            <Link to="Login">
                                <button className='p-2 px-4 cursor-pointer  text-white font-semibold rounded-lg bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-400'>
                                    Inscrever-se
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header