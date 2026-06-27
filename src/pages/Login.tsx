
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logo1 from '../assets/IMG_20251114_003344.png'
import extension from '../assets/Extension.svg'



function Login() {
    const { loginAction, erroAuth } = useAuth();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!login || !password) return;

        const sucesso = await loginAction(login, password);
        if (sucesso) {
            console.log('Redirecionar usuário para a Dashboard...');
            navigate('/');
        }
    };
    return (
        <>
            <section className="flex h-screen w-full items-center justify-center p-4 overflow-hidden">
                <section className="relative grid size-full max-w-[1600px] place-items-center justify-center gap-10 overflow-hidden rounded-lg border border-neutral-300 p-4 shadow-sm lg:h-fit lg:grid-cols-2">
                    <Link to="/" className="inline-flex cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md border border-zinc-500 font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-background hover:bg-zinc-100 hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 absolute items-center top-5 right-5 hover:translate-y-[1px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left text-primary" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                        <p>Início</p>
                    </Link>
                    <div className="size-full max-h-[90svh] max-lg:hidden ">
                        <div className='absolute -bottom-15 rotate-120 -left-15 opacity-40'>
                            <img src={extension} alt="logo extensão" className="w-60 h-auto shadow-" />
                        </div>
                        <div className="relative h-full flex items-center pl-6" role="region" aria-rolesdescription="carrousel" data-slot="carrousel" style={{ aspectRatio: 0.8 / 1 }}>

                            <div className="text-left pl-3">

                                <h1 className="text-sm font-black text-(--loginTitle) font-sans tracking-tight sm:text-5xl mb-3">
                                    Seu portal de extensão
                                </h1>
                                <p className="text-muted-foreground text-base leading-relaxed">
                                    Acesse sua conta para acompanhar seus projetos, relatórios e atividades em tempo real. De estudantes para estudantes.
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="flex w-full max-w-[400px] flex-col items-center gap-10 overflow-hidden">
                        <div className="flex flex-col items-center gap-5 ">
                            <img src={logo1} alt="logo1" className="size-18" />
                            <h1 className="font-bold text-3xl text-(#005387cc)"> Entrar na sua conta</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full space-y-6">
                            <div className="flex w-full flex-col">
                                <label htmlFor="login" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none">Digite seu usuário</label>
                                <div className="relative mb-4">
                                    <input data-slot="input" value={login} onChange={(e) => setLogin(e.target.value)} className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" id="login" max="254" placeholder="aluno@exemplo.com" type="text" autoComplete="off" name="login"></input>
                                </div>
                                <label htmlFor="login" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none ">Digite sua senha</label>
                                <div className="relative mb-2">
                                    <input data-slot="input" value={password} onChange={(e) => setPassword(e.target.value)} className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" id="password" max="254" placeholder="••••••••••" type="password" name="password"></input>
                                </div>
                                {erroAuth && (
                                    <p className="mt-2 flex min-h-4 items-center font-bold text-destructive text-xs">Ocorreu um erro</p>
                                )}
                                <div className="mt-4 flex items-center justify-center gap-2 ">
                                    <button type="submit" className="inline-flex min-w-0 w-1/3 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 border-primary bg-(--lightCyan) text-primary-foreground hover:bg-(--cyanHover) h-9 px-4 py-2 has-[&gt;svg]:px-3 hover:translate-y-[1px] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-0.75 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] dark:hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.4)]"> Entrar </button>
                                </div>
                            </div>
                        </form>
                        <a data-disabled="false" className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 font-bold outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 border-none underline-offset-4 hover:underline h-9 px-4 py-2 has-[&gt;svg]:px-3 text-foreground text-xs shadow-none hover:translate-y-0 hover:shadow-none active:translate-y-0 active:shadow-none dark:shadow-none dark:active:shadow-none dark:hover:shadow-none">Problemas com o login? contate o TI</a>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Login