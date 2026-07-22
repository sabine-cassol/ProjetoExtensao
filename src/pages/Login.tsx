
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logo1 from '../assets/IMG_20251114_003344.png'
import extension from '../assets/Extension.svg'
import { Eye, EyeOff, XCircle, AlertCircle } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { GraduationCap, Microscope } from 'lucide-react';
import { Toaster } from "@/components/ui/sonner";
import { loginSchema, registerSchema } from '@/schemas/authSchemas';
import { useCreateUser } from '../services/userService';


function Login() {
    const { loginAction, erroAuth } = useAuth();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeScreen, setActiveScreen] = useState<'selectRole' | 'login' | 'register' | 'register1'>('selectRole');

    const [userRole, setUserRole] = useState<'aluno' | 'professor' | null>(null);
    const navigate = useNavigate();

    const [regEmail, setRegEmail] = useState('');
    const [regName, setRegName] = useState('');
    const [regRA, setRegRA] = useState('');
    const [RegRAConfirm, setRegRAConfirm] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassword] = useState('');
    const [erroRegister, setErroRegister] = useState('');
    const [erros, setErros] = useState<{ login?: string; password?: string; perfil?: string }>({});
    const [errosRegister, setErrosRegister] = useState<Record<string, string>>({});
    const createUserMutation = useCreateUser({
        onSuccessCallback: () => setActiveScreen('login')
    });

    const formatarRA = (valor: string): string => {
        const apenasNumeros = valor.replace(/\D/g, '').slice(0, 9);

        if (apenasNumeros.length <= 8) {
            return apenasNumeros;
        }

        return `${apenasNumeros.slice(0, 8)}-${apenasNumeros.slice(8)}`;
    };

    const handleRAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegRA(formatarRA(e.target.value));
    };

    const handleRAConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegRAConfirm(formatarRA(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErros({});
        if (!userRole) {
            setErros(prev => ({ ...prev, perfil: "Selecione um perfil antes de continuar." }));
            return;
        }

        const validacao = loginSchema.safeParse({ login, password });

        if (!validacao.success) {
            const novosErros: { login?: string; password?: string } = {};

            validacao.error.issues.forEach((issue) => {
                const campo = issue.path[0] as 'login' | 'password';
                if (!novosErros[campo]) {
                    novosErros[campo] = issue.message;
                }
            });

            setErros(novosErros);
            return;
        }

        setLoading(true);

        try {
            const sucesso = await loginAction(login, password, userRole);

            if (sucesso) {
                console.log('Redirecionar usuário para a Dashboard...');
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrosRegister({});
        setErroRegister('');

        const validacao = registerSchema.safeParse({
            regEmail,
            regName,
            regRA,
            confirmRegRA: RegRAConfirm,
            regPassword,
            regConfirmPassword
        });

        if (!validacao.success) {
            const erros: Record<string, string> = {};
            validacao.error.issues.forEach((issue) => {
                const campo = issue.path[0];
                if (campo !== undefined) {
                    erros[String(campo)] = issue.message;
                }
            });
            setErrosRegister(erros);

            if (erros.regEmail || erros.regName || erros.regRA || erros.RegRAConfirm) {
                setActiveScreen('register');
                console.log(erros)
            } else {
                setActiveScreen('register1');
            }
            return;
        }

        const requestBody = {
            email: regEmail.trim(),
            nome: regName.trim(),
            senha: regPassword.trim(),
            ra: regRA.trim(),
            curso: '',
            periodo: '',
        };

        createUserMutation.mutate(requestBody);
    };
    return (
        <>
            <section className="flex h-screen w-full items-center justify-center p-4 overflow-hidden">
                <Toaster
                    className='z-999'
                    position="bottom-right"
                    toastOptions={{
                        classNames: {
                            toast: 'bg-white border border-slate-100 shadow-sm',
                            title: 'text-slate-950 font-semibold',
                            description: '!text-slate-500 font-normal',

                            success: 'bg-white border-green-100 group success',
                            error: 'bg-white border-red-100 group error',

                            icon: 'group-[.success]:text-green-500 group-[.error]:text-red-500',
                        },
                    }}
                />
                <section className="relative grid size-full max-w-400 place-items-center justify-center gap-10 overflow-hidden rounded-lg border border-neutral-300 p-4 shadow-sm lg:h-fit lg:grid-cols-2">
                    <Link to="/" className="inline-flex cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md border border-zinc-500 font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-background hover:bg-zinc-100 hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 absolute items-center top-5 right-5 hover:translate-y-px active:translate-y-0.75 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left text-primary" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                        <p>Início</p>
                    </Link>
                    <div className="size-full max-h-[90svh] max-lg:hidden ">
                        <div className='absolute -bottom-15 rotate-120 -left-15 opacity-40'>
                            <img src={extension} alt="logo extensão" className="w-60 h-auto shadow-" />
                        </div>
                        <div className="relative h-full flex items-center pl-6" role="region" aria-rolesdescription="carrousel" data-slot="carrousel" style={{ aspectRatio: 0.9 / 1 }}>

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

                    <div className={`flex w-full max-w-100 flex-col items-center overflow-hidden ${activeScreen === 'login' ? 'gap-10' : 'gap-4'}`}>
                        {activeScreen === 'selectRole' && (
                            <div className="flex flex-col items-center gap-6 w-full">
                                <div className="flex flex-col items-center gap-5 ">
                                    <img src={logo1} alt="logo1" className="size-18" />
                                    <h1 className="font-bold text-3xl text-(#005387cc) text-center">Como deseja acessar?</h1>
                                    <p className="text-zinc-500 text-sm">Selecione o seu perfil para continuar</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mb-12 px-4">
                                    <button
                                        onClick={() => {
                                            setUserRole('aluno');
                                            setActiveScreen('login');
                                        }}
                                        className="flex flex-col items-center justify-center p-6 w-full max-w-xs sm:w-44 h-32 border border-zinc-300 rounded-xl font-bold text-lg text-zinc-900 bg-input/10 hover:border-(--lightCyan) transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-y-1"
                                    >
                                        <GraduationCap size={36} className='mb-2 shrink-0'></GraduationCap>
                                        <span>Sou Aluno</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setUserRole('professor');
                                            setActiveScreen('login');
                                        }}
                                        className="flex flex-col items-center justify-center p-6 w-full max-w-xs sm:w-44 h-32 border border-zinc-300 rounded-xl font-bold text-lg text-zinc-900 bg-input/10 hover:border-(--lightCyan) transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-y-1"
                                    >
                                        <Microscope size={36} className='mb-2 shrink-0'></Microscope>
                                        <span>Sou Professor</span>
                                    </button>
                                </div>
                                <button onClick={() => setActiveScreen('register')} className="font-bold text-cyan-500 hover:underline cursor-pointer -mt-8">
                                    Não tem uma conta? Crie uma agora
                                </button>
                            </div>
                        )}

                        {activeScreen === 'login' && (
                            <>
                                <div className="flex flex-col items-center gap-5 ">
                                    <img src={logo1} alt="logo1" className="size-18" />
                                    <h1 className="font-bold text-3xl text-(#005387cc)"> Entrar na sua conta</h1>
                                    {(erroAuth) && (
                                        <div className="bg-red-100 border border-red-300 px-3 py-2 rounded-xl overflow-x-hidden flex items-center w-fit dark:bg-red-950/30 dark:border-red-900/50 transition-colors">
                                            <div className="flex items-center gap-2 text-red-700 font-medium text-sm dark:text-red-400">
                                                <AlertCircle size={16} className='shrink-0' />
                                                <p className="wrap-break-word">
                                                    {'Ocorreu um erro'}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <form onSubmit={handleSubmit} className="w-full space-y-6">
                                    <div className="flex w-full flex-col">
                                        <label htmlFor="login" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none">Digite seu Email</label>
                                        <div className="relative mb-4">
                                            <input data-slot="input" value={login} onChange={(e) => setLogin(e.target.value)} required className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" id="login" max="254" placeholder="aluno@exemplo.com" type="text" autoComplete="off" name="login"></input>
                                            <div className="absolute inset-y-0 right-0 hidden items-center pr-3 pointer-events-none text-destructive [input:invalid:not(:placeholder-shown)~&]:flex [form:submitted_&]:flex">
                                                <XCircle className="size-4" />
                                            </div>
                                            {erros.login && (
                                                <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                    <div className='flex flex-row gap-1 items-center'>
                                                        <AlertCircle className="size-3.5 shrink-0" />
                                                        <span className="text-xs font-medium tracking-wide">
                                                            {erros.login}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <label htmlFor="login" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none ">Digite sua senha</label>
                                        <div className="relative mb-2">
                                            <input data-slot="input" value={password} onChange={(e) => setPassword(e.target.value)} required type={showPassword ? "text" : "password"} className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" id="password" max="254" placeholder="••••••••••" name="password"></input>
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                                                {showPassword ? (
                                                    <EyeOff className="size-4" />
                                                ) : (
                                                    <Eye className="size-4" />
                                                )}
                                            </button>
                                        </div>
                                        {erros.password && (
                                            <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                <div className='flex flex-row gap-1 items-center'>
                                                    <AlertCircle className="size-3.5 shrink-0" />
                                                    <span className="text-xs font-medium tracking-wide">
                                                        {erros.password}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 flex items-center justify-center gap-2 ">
                                            <button onClick={() => setActiveScreen('selectRole')} className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-zinc-400 font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-background hover:bg-zinc-100 hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 hover:translate-y-px hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-0.75 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[0px_4px_0px_0px_rgba(0,0,0,0.4)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] dark:hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.4)]">
                                                Voltar
                                            </button>
                                            <button type="submit" className="inline-flex min-w-1/5 w-fit cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 border-primary bg-(--lightCyan) text-primary-foreground hover:bg-(--cyanHover) h-9 px-4 py-2 has-[&gt;svg]:px-3 hover:translate-y-px hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-0.75 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] dark:hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.4)]">
                                                {loading ? (
                                                    <>
                                                        <Spinner></Spinner>
                                                    </>
                                                ) : (
                                                    "Entrar"
                                                )}


                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <button onClick={() => setActiveScreen('register')} className="font-bold text-cyan-500 hover:underline cursor-pointer -mt-4">
                                    Não tem uma conta? Crie uma agora
                                </button>

                            </>)}
                        {(activeScreen === 'register' || activeScreen === 'register1') && (
                            <>
                                <div className="flex flex-col items-center gap-3">
                                    <div className='text-center'>
                                        <h1 className="font-bold text-2xl text-(#005387cc)">Criar sua conta</h1>
                                        <p className="text-[#9198a1] text-xs"> Por aqui só será possível criar usuários do tipo aluno</p>
                                    </div>
                                    {erroRegister && (
                                        <p className="mt-2 text-red-600 font-bold text-xs bg-red-50 px-3 py-1.5 rounded border border-red-200">{erroRegister}</p>
                                    )}
                                </div>

                                <form onSubmit={handleRegisterSubmit} className="w-full h-full space-y-4">

                                    {activeScreen === 'register' && (
                                        <>
                                            <div className="flex flex-col">
                                                <label htmlFor="regEmail" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none">Email</label>
                                                <input id="regEmail" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} type="email" placeholder="digite seu email" className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" autoComplete="off" name="regEmail"></input>
                                                {errosRegister.regEmail && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosRegister.regEmail}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="regName" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none">Nome completo</label>
                                                <input id="regName" required value={regName} onChange={(e) => setRegName(e.target.value)} type="text" placeholder="digite seu nome completo" className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" max="254" autoComplete="off" name="regName"></input>
                                                {errosRegister.regName && (<div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                    <div className='flex flex-row gap-1 items-center'>
                                                        <AlertCircle className="size-3.5 shrink-0" />
                                                        <span className="text-xs font-medium tracking-wide">
                                                            {errosRegister.regName}
                                                        </span>
                                                    </div>
                                                </div>)}

                                            </div>

                                            <div className="flex flex-col">
                                                <label htmlFor="regRA" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none">RA</label>
                                                <input id="regRA" required value={regRA} onChange={handleRAChange} type="text" maxLength={10} placeholder="digite seu RA" className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" max="254" autoComplete="off" name="regRA"></input>
                                                {errosRegister.regRA && (<div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                    <div className='flex flex-row gap-1 items-center'>
                                                        <AlertCircle className="size-3.5 shrink-0" />
                                                        <span className="text-xs font-medium tracking-wide">
                                                            {errosRegister.regRA}
                                                        </span>
                                                    </div>
                                                </div>)}
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="RegRAConfirm" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none">Confirme seu RA</label>
                                                <input id="RegRAConfirm" required value={RegRAConfirm} onChange={handleRAConfirmChange} type="text" maxLength={10} placeholder="Confirme seu RA" className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" autoComplete="off" name="RegRAConfirm"/>
                                                {errosRegister.regRAConfirm && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">{errosRegister.regRAConfirm}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='flex justify-center gap-2 pt-4 p-1 overflow-visible'>
                                                <button type='button' onClick={() => setActiveScreen('login')} className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-zinc-400 font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-background hover:bg-zinc-100 hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 hover:translate-y-px hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-0.75 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[0px_4px_0px_0px_rgba(0,0,0,0.4)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] dark:hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.4)]">
                                                    Voltar
                                                </button>
                                                <button type='button' onClick={() => setActiveScreen('register1')} className="inline-flex min-w-0 w-fit cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 border-primary bg-(--lightCyan) text-primary-foreground hover:bg-(--cyanHover) h-9 px-4 py-2 has-[&gt;svg]:px-3 hover:translate-y-px hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-0.75 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] dark:hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.4)]">
                                                    Próximo &#10132;
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {activeScreen === 'register1' && (
                                        <>
                                            <div className="flex flex-col">
                                                <label htmlFor="regPassword" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none">Escolha uma Senha</label>
                                                <div className="relative">
                                                    <input id="regPassword" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="••••••••••" className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" autoComplete="off" name="regPassword" />
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-zinc-400 hover:text-zinc-600">
                                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                                    </button>
                                                </div>
                                                {errosRegister.regPassword && (<div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                    <div className='flex flex-row gap-1 items-center'>
                                                        <AlertCircle className="size-3.5 shrink-0" />
                                                        <span className="text-xs font-medium tracking-wide">
                                                            {errosRegister.regPassword}
                                                        </span>
                                                    </div>
                                                </div>)}
                                            </div>

                                            <div className="flex flex-col">
                                                <label htmlFor="regConfirmPassword" className="mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none">Confirme a Senha</label>
                                                <div className="relative">
                                                    <input id="regConfirmPassword" required value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} type={showConfirmPassword ? "text" : "password"} placeholder="••••••••••" className="flex h-9 w-full min-w-0 border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm bg-input/30 border-zinc-300 rounded-md focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" autoComplete="off" name="regConfirmPassword"></input>
                                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-zinc-400 hover:text-zinc-600">
                                                        {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                                    </button>
                                                </div>
                                                {errosRegister.regConfirmPassword && (<div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                    <div className='flex flex-row gap-1 items-center'>
                                                        <AlertCircle className="size-3.5 shrink-0" />
                                                        <span className="text-xs font-medium tracking-wide">
                                                            {errosRegister.regConfirmPassword}
                                                        </span>
                                                    </div>
                                                </div>)}
                                            </div>

                                            <div className="pt-2 flex justify-center gap-2 p-1 overflow-visible">
                                                <button type='button' onClick={() => setActiveScreen('register')} className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-zinc-400 font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-background hover:bg-zinc-100 hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 hover:translate-y-px hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-0.75 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[0px_4px_0px_0px_rgba(0,0,0,0.4)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] dark:hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.4)]">
                                                    Voltar
                                                </button>
                                                <button type="submit" className="inline-flex min-w-1/3 w-fit cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold text-sm outline-none transition-all duration-300 focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-invalid:ring-destructive/40 [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 border-primary bg-(--lightCyan) text-primary-foreground hover:bg-(--cyanHover) h-9 px-4 py-2 has-[&gt;svg]:px-3 hover:translate-y-px hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-0.75 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] dark:active:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.4)] dark:hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,0.4)]">
                                                    {loading ? <Spinner /> : "Cadastrar Conta"}
                                                </button>

                                            </div>
                                        </>
                                    )}
                                </form>
                            </>
                        )}

                    </div>
                </section>
            </section >
        </>
    )
}

export default Login