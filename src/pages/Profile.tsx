
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useAuth } from "../context/AuthContext";

interface UserProfileData {
    nome: string;
    ra: string;
}

function Profile() {
    const { user, loading } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState<UserProfileData>({
        nome: '',
        ra: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nome: user.login,
                ra: user.ra
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        toast.success("Dados atualizados com sucesso!");
    };

    const handleCancel = () => {
        if (user) {
            setFormData({ nome: user.login, ra: user.ra });
        }
        setIsEditing(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (password !== confirmPassword) {
            setError('As senhas não coincidem. Verifique e tente novamente.');
            toast.error('As senhas não coincidem.');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve conter no mínimo 6 caracteres.');
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
        return <div className="flex-1 flex justify-center items-center">Carregando perfil...</div>;
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
                                <label htmlFor="Nome" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">
                                    Nome Completo
                                </label>
                                <input
                                    id="Nome"
                                    name="Nome"
                                    type="text"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`border w-full mt-2 text-zinc-800 border-zinc-400 font-medium rounded-md p-2 focus:outline-none transition-all
                                        ${!isEditing
                                            ? 'bg-zinc-100/80 text-zinc-500 select-none cursor-default border-zinc-200'
                                            : 'bg-white text-zinc-900 border-blue-500 ring-2 ring-blue-500/10'
                                        }`}
                                />
                            </div>

                            <div>
                                <label htmlFor="RA" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">
                                    RA
                                </label>
                                <input
                                    id="RA"
                                    name="RA"
                                    type="text"
                                    value={formData.ra}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`border w-full mt-2 text-zinc-800 border-zinc-400 font-medium rounded-md p-2 focus:outline-none transition-all
                                        ${!isEditing
                                            ? 'bg-zinc-100/80 text-zinc-500 select-none cursor-default border-zinc-200'
                                            : 'bg-white text-zinc-900 border-blue-500 ring-2 ring-blue-500/10'
                                        }`}
                                />
                            </div>
                        </div>
                        <div className='flex justify-center gap-3 px-4'>
                            {!isEditing ? (
                                <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-semibold cursor-pointer transition">
                                    Editar informações
                                </button>
                            ) : (
                                <>
                                    <button onClick={handleCancel} className="px-4 py-2 border border-zinc-300 text-zinc-600 hover:bg-zinc-100 rounded-md font-semibold cursor-pointer transition">
                                        Cancelar
                                    </button>
                                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-semibold cursor-pointer transition">
                                        Salvar
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col p-4 gap-1.5">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="password" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">Digite a senha nova</label>
                                    <input id="password"
                                        type="password"
                                        autoComplete="off"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} className="border w-full mt-2  text-zinc-800 border-zinc-400 font-medium rounded-sm p-2 focus:outline-none " />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="password2" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">Confirme a senha nova</label>
                                    <input id="password2"
                                        type="password"
                                        autoComplete="off"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} className="border w-full mt-2 text-zinc-800 border-zinc-400 font-medium rounded-sm p-2 focus:outline-none " />
                                </div>
                                <div className='flex justify-center mt-4'>
                                    <button type='submit' className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-semibold cursor-pointer transition shadow-sm">
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