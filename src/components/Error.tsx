import { SearchX } from 'lucide-react';

interface ErrorProps {
    tipo?: 'Página' | 'Notícia' | 'Projeto' | 'Item';
    mensagem?: string;
}

function Error({ tipo = 'Página', mensagem }: ErrorProps) {
    const mensagensProntas = {
        Página: "A Página que você está tentando acessar não existe no sistema, foi removida permanentemente ou o link está incorreto.",
        Notícia: "A Notícia que você está tentando acessar não existe no sistema, foi removida permanentemente ou o link está incorreto.",
        Projeto: "O Projeto que você está tentando acessar não existe no sistema, foi removido permanentemente ou o link está incorreto.",
        Item: "O Item que você está tentando acessar não existe no sistema, foi removido permanentemente ou o link está incorreto."
    };

    const mensagemFinal = mensagem || mensagensProntas[tipo];

    const ehFeminino = tipo === 'Página' || tipo === 'Notícia';
    const sufixo = ehFeminino ? 'a' : 'o';
    return (
        <>
            <section className='flex-1'>

                <div className="flex flex-col items-center justify-center px-6 text-center bg-white border border-zinc-300 rounded-xl p-12 shadow-sm max-w-2xl mx-auto my-8 dark:bg-zinc-9">

                    <div className="flex items-center justify-center w-20 h-20 mb-6 bg-violet-50 text-red-400 rounded-full dark:bg-red-500/10 dark:text-red-400">
                        <SearchX size={45} />
                    </div>

                    <span className="text-5xl font-black text-zinc-800 tracking-tight mb-2 dark:text-zinc-100">404</span>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight dark:text-zinc-200">
                        {tipo} não encontrad{sufixo}
                    </h1>
                    <p className="text-slate-500 max-w-sm mb-8 text-sm leading-relaxed dark:text-zinc-400">
                        {mensagemFinal}
                    </p>
                </div>
            </section>

        </>
    )
}

export default Error