
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useAuth } from "../context/AuthContext";
import { EyeOff, Eye } from "lucide-react";
import { profileSchema, passwordSchema } from '@/schemas/authSchemas';
import { CURSOS_DISPONIVEIS } from '@/schemas/authSchemas';
import { AlertCircle } from "lucide-react";
import { useUpdateUser } from '../services/userService';
import { PerfilSkeleton } from "@/components/perfilSkeleton";

interface UserProfileData {
    nome: string;
    login: string;
    ra: string;
    curso?: string;
    periodo?: string;
}

function Profile() {
    const { user, loading, update, role } = useAuth();

    const updateMutation = useUpdateUser({
        onSuccessCallback: () => setIsEditing(false),
        updateSession: (novosDados) => update(novosDados),
    });

    const [isEditing, setIsEditing] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [errosPerfil, setErrosPerfil] = useState<Record<string, string>>({});
    const [errosSenha, setErrosSenha] = useState<Record<string, string>>({});


    const [formData, setFormData] = useState({
        nome: user?.nome ?? '',
        login: user?.login ?? '',
        ra: user?.ra ?? '',
        curso: user?.curso ?? '',
        periodo: user?.periodo ?? ''
    });


    useEffect(() => {
        if (user) {
            setFormData({
                nome: user.nome ?? '',
                login: user.login ?? '',
                ra: user.ra ?? '',
                curso: user.curso ?? '',
                periodo: user.periodo ?? ''
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setErrosPerfil({});

        const validacao = profileSchema.safeParse({
            nome: formData.nome,
            curso: formData.curso,
            periodo: formData.periodo
        });

        if (!validacao.success) {
            const erros: Record<string, string> = {};
            validacao.error.issues.forEach((issue) => {
                const campo = issue.path[0];
                if (campo !== undefined) {
                    erros[String(campo)] = issue.message;
                }
            });
            setErrosPerfil(erros);
            return;
        }

        const dadosParaAtualizar = {
            nome: formData.nome,
            email: formData.login,
            ...(role === 'student' && {
                curso: formData.curso,
                periodo: formData.periodo
            })
        };

        updateMutation.mutate({
            dados: dadosParaAtualizar,
            role
        });
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                nome: user.nome || '',
                login: user.login || '',
                ra: user.ra || '',
                curso: user.curso || '',
                periodo: user.periodo || ''
            });
        }
        setIsEditing(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrosSenha({});

        const validacao = passwordSchema.safeParse({ password, confirmPassword });

        if (!validacao.success) {
            const erros: Record<string, string> = {};
            validacao.error.issues.forEach((issue) => {
                const campo = issue.path[0] as string;
                if (!erros[campo]) {
                    erros[campo] = issue.message;
                }
            });
            setErrosSenha(erros);
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem. Verifique e tente novamente.');
            toast.error('As senhas não coincidem.');
            return;
        }

        if (password.length < 8) {
            setError('A senha deve conter no mínimo 8 caracteres.');
            toast.error('A senha é muito curta.');
            return;
        }

        console.log('Enviando para o banco de dados...', { id: user?.id, novaSenha: password });

        setSuccess(true);
        toast.success("Senha alterada com sucesso");

        setPassword('');
        setConfirmPassword('');
    };

    if (loading) {
        return <PerfilSkeleton></PerfilSkeleton>
    }

    if (!user) {
        return <div className="flex-1 flex justify-center items-center">Você precisa estar logado para ver esta página.</div>;
    }
    return (
        <section className='flex-1 flex text-center justify-center items-center'>

            <div className="w-full max-w-2xl rounded-lg bg-white p-6 border border-zinc-300">

                <div className="space-y-6">
                    <div>
                        <h1 className="font-bold text-2xl text-zinc-900 tracking-tight">Meu Perfil</h1>
                        <p className="text-sm text-zinc-500 mt-1">Suas informações de cadastro no site.</p>
                    </div>

                    <div className='space-y-4 text-left'>
                        <div className="flex flex-col p-4 gap-4">

                            <div>
                                <label htmlFor="nome" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">
                                    Nome Completo
                                </label>
                                <input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    value={formData.nome} onChange={handleChange} readOnly={!isEditing}
                                    className={`border w-full mt-2 text-[#212529] border-zinc-400 font-normal rounded-md p-2 focus:outline-none transition-all
                                        ${!isEditing
                                            ? 'bg-zinc-200/80 select-none cursor-default border-zinc-200'
                                            : 'bg-white text-zinc-900 focus:ring-2 focus:ring-blue-500/10'
                                        }`}
                                />
                                {errosPerfil.nome && (
                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                        <div className='flex flex-row gap-1 items-center'>
                                            <AlertCircle className="size-3.5 shrink-0" />
                                            <span className="text-xs font-medium tracking-wide">
                                                {errosPerfil.nome}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="Email" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2"> Email </label>
                                <input id="login" name="login" type="text" value={formData.login} readOnly className={`border w-full mt-2 text-zinc-800 border-zinc-400 font-normal rounded-md p-2 focus:outline-none transition-all shadow-[inset_0_4px_6px_-2px_rgba(0,0,0,0.05)]
                                    ${!isEditing
                                        ? 'bg-zinc-200/80 text-zinc-500 select-none cursor-default border-zinc-200'
                                        : 'bg-zinc-200/80 text-zinc-500 select-none border-zinc-200 cursor-not-allowed'
                                    }`}
                                />
                            </div>

                            {role === 'student' && (<div>
                                <label htmlFor="RA" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">
                                    RA
                                </label>
                                <input
                                    id="RA"
                                    name="RA"
                                    type="text"
                                    value={formData.ra}
                                    readOnly
                                    className={`border w-full mt-2 text-zinc-800 border-zinc-400 font-normal rounded-md p-2 focus:outline-none transition-all shadow-[inset_0_4px_6px_-2px_rgba(0,0,0,0.05)]
                                        ${!isEditing
                                            ? 'bg-zinc-200/80 text-zinc-500 select-none cursor-default border-zinc-200'
                                            : 'bg-zinc-200/80 text-zinc-500 select-none border-zinc-200 cursor-not-allowed'
                                        }`}
                                />
                            </div>)}

                            {role === 'student' && (<div>
                                <label htmlFor="curso" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2"> Curso </label>
                                <select
                                    id="curso"
                                    name="curso"
                                    value={formData.curso}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`border w-full mt-2 text-zinc-800 border-zinc-400 font-normal rounded-md p-2 focus:outline-none transition-all
                                        ${!isEditing
                                            ? 'bg-zinc-200/80 text-zinc-500 select-none cursor-default border-zinc-200'
                                            : 'bg-white text-zinc-900 focus:ring-2 focus:ring-blue-500/10'
                                        }`}
                                >
                                    <option value="" disabled={!!formData.curso}>Nenhum curso associado, selecione um curso</option>
                                    {CURSOS_DISPONIVEIS.map((curso) => (
                                        <option key={curso} value={curso}>
                                            {curso}
                                        </option>
                                    ))}
                                </select>

                                {errosPerfil.curso && (
                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                        <div className='flex flex-row gap-1 items-center'>
                                            <AlertCircle className="size-3.5 shrink-0" />
                                            <span className="text-xs font-medium tracking-wide">
                                                {errosPerfil.curso}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            )}

                            {role === 'student' && (<div>
                                <label htmlFor="periodo" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2"> Período </label>
                                <input id="periodo" name="periodo" type="number" min="0" max="10" value={formData.periodo} onChange={handleChange} readOnly={!isEditing} className={`border w-full mt-2 text-zinc-800 border-zinc-400 font-normal rounded-md p-2 focus:outline-none transition-all
                                        ${!isEditing
                                        ? 'bg-zinc-200/80 text-zinc-500 select-none cursor-default border-zinc-200'
                                        : 'bg-white text-zinc-900 focus:ring-2 focus:ring-blue-500/10'
                                    }`} />
                                {errosPerfil.periodo && (
                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                        <div className='flex flex-row gap-1 items-center'>
                                            <AlertCircle className="size-3.5 shrink-0" />
                                            <span className="text-xs font-medium tracking-wide">
                                                {errosPerfil.periodo}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>)}
                        </div>
                        <div className='flex justify-center gap-3 px-4'>
                            {!isEditing ? (
                                <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-[#0d6efd] text-white hover:bg-[#0d39fd] rounded-md font-semibold cursor-pointer transition-all">
                                    Editar informações
                                </button>
                            ) : (
                                <>
                                    <button onClick={handleCancel} className="px-4 py-2 border border-zinc-300 text-zinc-600 hover:bg-zinc-100 rounded-md font-semibold cursor-pointer transition">
                                        Cancelar
                                    </button>
                                    <button onClick={handleSave} className="px-4 py-2 bg-[#0d6efd] text-white hover:bg-[#0d39fd] rounded-md font-semibold cursor-pointer transition-all">
                                        Salvar
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col p-4 gap-1.5">
                            <div>
                                <div className="font-segoe text-lg font-bold text-zinc-900 ">Alterar senha</div>
                                <p className="text-[#9198a1] text-xs"> Caso queira definir uma nova senha de acesso (opcional) </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="relative">
                                    <label htmlFor="password" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">Digite a senha nova</label>
                                    <input id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="off"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} className="border w-full mt-2  text-zinc-800 border-zinc-400 font-base rounded-sm p-2 focus:outline-none " />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer inset-y-12 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                                        {showPassword ? (
                                            <EyeOff className="size-5" />
                                        ) : (
                                            <Eye className="size-5" />
                                        )}
                                    </button>
                                    {errosSenha.password && (
                                        <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                            <div className='flex flex-row gap-1 items-center'>
                                                <AlertCircle className="size-3.5 shrink-0" />
                                                <span className="text-xs font-medium tracking-wide">
                                                    {errosSenha.password}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                </div>
                                <div className="mt-2 relative">
                                    <label htmlFor="password2" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">Confirme a senha nova</label>
                                    <input id="password2"
                                        type={showPassword1 ? "text" : "password"}
                                        autoComplete="off"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} className="border w-full mt-2 text-zinc-800 border-zinc-400 font-base rounded-sm p-2 focus:outline-none " />
                                    <button type="button" onClick={() => setShowPassword1(!showPassword1)} className="absolute cursor-pointer inset-y-12 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                                        {showPassword1 ? (
                                            <EyeOff className="size-5" />
                                        ) : (
                                            <Eye className="size-5" />
                                        )}
                                    </button>
                                    {errosSenha.confirmPassword && (
                                        <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                            <div className='flex flex-row gap-1 items-center'>
                                                <AlertCircle className="size-3.5 shrink-0" />
                                                <span className="text-xs font-medium tracking-wide">
                                                    {errosSenha.confirmPassword}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                </div>
                                <div className='flex justify-center mt-4'>
                                    <button type='submit' className="px-4 py-2 bg-[#0d6efd] text-white hover:bg-[#0d39fd] rounded-md font-semibold cursor-pointer transition-all">
                                        Salvar a nova senha
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    )
}

export default Profile