import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { type Atividade } from '@/data/AtividadeType';
import { Pencil, Trash, RotateCcw } from 'lucide-react';
import { atividadeSchema } from '@/schemas/authSchemas';

interface AtividadePayload {
    titulo: string;
    descricao: string;
    data: string;
    cargaHoraria: number;
    projetoId: number;
}

interface AtividadesComponentProps {
    role: string;
    professorResponsavelId: number;
    userId?: string;
}

function Atividades({ role, professorResponsavelId, userId }: AtividadesComponentProps) {
    const { projetoId } = useParams<{ projetoId: string }>();
    const queryClient = useQueryClient();

    const ehResponsavel = role === 'teacher' && userId && String(professorResponsavelId) === userId;

    const [isCriando, setIsCriando] = useState(false);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        data: '',
        cargaHoraria: ''
    });
    const [errosAtividade, setErrosAtividade] = useState<Record<string, string>>({});


    const { data: atividades, isLoading, error } = useQuery<Atividade[]>({
        queryKey: ['atividades', 'projeto', projetoId],
        queryFn: async () => {
            const res = await fetch(`/api/atividades/projeto/${projetoId}`, {
                credentials: 'include'
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.erro || 'Erro ao buscar atividades');
            }
            const dados = await res.json();
            return dados.sort((a: Atividade, b: Atividade) => Number(b.ativo) - Number(a.ativo));
        },
        enabled: !!projetoId
    });

    const criarMutation = useMutation({
        mutationFn: async (dados: AtividadePayload) => {
            const res = await fetch('/api/atividades', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.erro || 'Erro ao criar atividade');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['atividades', 'projeto', projetoId] });
            toast.success("Atividade criada com sucesso!");
            setFormData({ titulo: '', descricao: '', data: '', cargaHoraria: '' });
            setIsCriando(false);
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao criar atividade");
        }
    });

    const atualizarMutation = useMutation({
        mutationFn: async ({ id, dados }: { id: number; dados: Partial<AtividadePayload> }) => {
            const res = await fetch(`/api/atividades/id/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.erro || 'Erro ao atualizar atividade');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['atividades', 'projeto', projetoId] });
            toast.success("Atividade atualizada com sucesso!");
            setEditandoId(null);
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao atualizar atividade");
        }
    });

    const desativarMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/atividades/desativar/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.erro || 'Erro ao desativar atividade');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['atividades', 'projeto', projetoId] });
            toast.success("Atividade desativada com sucesso!");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao desativar atividade");
        }
    });

    const ativarMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/atividades/ativar/${id}`, {
                method: 'PUT',
                credentials: 'include'
            });
            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.erro || 'Erro ao reativar atividade');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['atividades', 'projeto', projetoId] });
            toast.success("Atividade reativada com sucesso!");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao reativar atividade");
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleCargaHorariaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let valor = e.target.value.replace(',', '.');
        // permite apenas números e um único ponto decimal
        if (!/^\d*\.?\d*$/.test(valor)) return;
        setFormData(prev => ({ ...prev, cargaHoraria: valor }));
    };


    const handleSalvarAtividade = (e: React.FormEvent) => {
        e.preventDefault();
        if (!projetoId) {
            toast.error("ID do projeto não encontrado.");
            return;
        }

        // const validacao = atividadeSchema.safeParse({
        //     titulo: formData.titulo,
        //     descricao: formData.descricao,
        //     data: formData.data,
        //     cargaHoraria: formData.cargaHoraria
        // });

        // if (!validacao.success) {
        //     const erros: Record<string, string> = {};
        //     validacao.error.issues.forEach((issue) => {
        //         const campo = issue.path[0] as string;
        //         if (!erros[campo]) {
        //             erros[campo] = issue.message;
        //         }
        //     });
        //     setErrosAtividade(erros);
        //     return;
        // }

        const payload: AtividadePayload = {
            titulo: formData.titulo,
            descricao: formData.descricao,
            data: formData.data,
            cargaHoraria: Number(formData.cargaHoraria),
            projetoId: Number(projetoId)
        };

        criarMutation.mutate(payload);
    };

    const handleIniciarEdicao = (atividade: Atividade) => {
        setEditandoId(atividade.id);
        setFormData({
            titulo: atividade.titulo,
            descricao: atividade.descricao,
            data: atividade.data,
            cargaHoraria: String(atividade.cargaHoraria)
        });
    };

    const handleSalvarEdicao = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setErrosAtividade({});

        const validacao = atividadeSchema.safeParse({
            titulo: formData.titulo,
            descricao: formData.descricao,
            data: formData.data,
            cargaHoraria: formData.cargaHoraria
        });

        if (!validacao.success) {
            const erros: Record<string, string> = {};
            validacao.error.issues.forEach((issue) => {
                const campo = issue.path[0] as string;
                if (!erros[campo]) {
                    erros[campo] = issue.message;
                }
            });
            setErrosAtividade(erros);
            return;
        }

        atualizarMutation.mutate({
            id,
            dados: {
                titulo: formData.titulo,
                descricao: formData.descricao,
                data: formData.data,
                cargaHoraria: Number(formData.cargaHoraria)
            }
        });
    };

    const handleDesativar = (id: number) => {
        const confirmou = confirm("Deseja mesmo desativar esta atividade?");
        if (!confirmou) return;
        desativarMutation.mutate(id);
    };

    if (role === 'guest') {
        return null;
    }

    if (isLoading) {
        return <p className="mt-6 text-sm text-zinc-500">Carregando atividades...</p>;
    }

    if (error) {
        return <p className="mt-6 text-sm text-red-500">Erro ao carregar atividades</p>;
    }

    return (
        <section className='mt-6'>
            <span className='font-bold text-lg font-segoe'> Atividades </span>

            {atividades?.length === 0 && !isCriando && (
                <p className="mt-2 text-sm text-zinc-500">Nenhuma atividade cadastrada ainda.</p>
            )}

            {atividades?.map((atividade) => (
                <div key={atividade.id}>
                    {editandoId === atividade.id ? (
                        <form onSubmit={(e) => handleSalvarEdicao(e, atividade.id)} className="min-w-full text-sm border border-gray-200 p-4 shadow-sm space-y-3 mt-2">
                            <div>
                                <input type="text" name="titulo" placeholder="Título da atividade" required value={formData.titulo} onChange={handleInputChange} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 font-bold focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                {errosAtividade.titulo && (
                                    <span className="text-red-600 text-xs mt-1 block">{errosAtividade.titulo}</span>
                                )}
                            </div>

                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <input type="number" name="cargaHoraria" placeholder="Carga horária (ex: 4)" required min="1" value={formData.cargaHoraria} onChange={handleCargaHorariaChange} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                    <span className="text-gray-400">h</span>
                                    {errosAtividade.cargaHoraria && (
                                        <span className="text-red-600 text-xs mt-1 block">{errosAtividade.cargaHoraria}</span>
                                    )}
                                </div>
                                <span className="text-gray-300">•</span>
                                <input type="date" name="data" required value={formData.data} onChange={handleInputChange} className="border text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                {errosAtividade.data && (
                                    <span className="text-red-600 text-xs mt-1 block">{errosAtividade.data}</span>
                                )}

                            </div>

                            <div>
                                <textarea name="descricao" placeholder="Descrição detalhada da atividade aqui..." required value={formData.descricao} onChange={handleInputChange} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                {errosAtividade.descricao && (
                                    <span className="text-red-600 text-xs mt-1 block">{errosAtividade.descricao}</span>
                                )}

                            </div>

                            <div className="flex justify-end gap-3 pt-2 text-xs font-semibold">
                                <button type="button" onClick={() => setEditandoId(null)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={atualizarMutation.isPending} className="text-green-600 hover:text-green-700 cursor-pointer disabled:opacity-50">
                                    {atualizarMutation.isPending ? 'Salvando...' : 'Salvar alterações'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className={`mt-2 min-w-full font-segoe text-sm border border-gray-200 p-4 bg-white shadow-sm ${!atividade.ativo ? 'opacity-60' : ''}`}>
                            <div className="flex items-start justify-between">
                                <h1 className="text-base font-semibold text-zinc-800 mb-1">{atividade.titulo}</h1>

                                {ehResponsavel && (
                                    <div className='flex items-center overflow-hidden border border-zinc-300 bg-white rounded-sm shrink-0'>
                                        <button onClick={() => handleIniciarEdicao(atividade)} className='cursor-pointer border-r border-zinc-300 bg-white p-1.5 hover:bg-slate-50' title='Editar atividade'>
                                            <Pencil size={14} />
                                        </button>
                                        {atividade.ativo ? (
                                            <button onClick={() => handleDesativar(atividade.id)} disabled={desativarMutation.isPending} className='cursor-pointer p-1.5 hover:bg-slate-50 disabled:opacity-50' title='Desativar atividade'>
                                                <Trash size={14} />
                                            </button>
                                        ) : (
                                            <button onClick={() => ativarMutation.mutate(atividade.id)} disabled={ativarMutation.isPending} className='cursor-pointer p-1.5 hover:bg-slate-50 disabled:opacity-50' title='Reativar atividade'>
                                                <RotateCcw size={14} />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                                <span className="font-medium text-gray-600">{atividade.cargaHoraria}h</span>
                                <span className="text-gray-300">•</span>
                                <span>{new Date(atividade.data).toLocaleDateString('pt-BR')}</span>
                                {!atividade.ativo && (
                                    <>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-red-500 font-semibold">Inativa</span>
                                    </>
                                )}
                            </div>

                            <div className="text-gray-600 leading-relaxed">
                                {atividade.descricao}
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {isCriando && (
                <form onSubmit={handleSalvarAtividade} className="min-w-full text-sm border border-gray-200 p-4 shadow-sm space-y-3 mt-2">
                    <div>
                        <input type="text" name="titulo" placeholder="Título da atividade" required value={formData.titulo} onChange={handleInputChange} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 font-bold focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <input type="number" name="cargaHoraria" placeholder="Carga horária (ex: 4)" required min="1" value={formData.cargaHoraria} onChange={handleInputChange} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                            <span className="text-gray-400">h</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <input type="date" name="data" required value={formData.data} onChange={handleInputChange} className="border text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                    </div>

                    <div>
                        <textarea name="descricao" placeholder="Descrição detalhada da atividade aqui..." required value={formData.descricao} onChange={handleInputChange} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                    </div>

                    <div className="flex justify-end gap-3 pt-2 text-xs font-semibold">
                        <button type="button" onClick={() => setIsCriando(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                            Cancelar
                        </button>
                        <button type="submit" disabled={criarMutation.isPending} className="text-green-600 hover:text-green-700 cursor-pointer disabled:opacity-50">
                            {criarMutation.isPending ? 'Salvando...' : 'Salvar Atividade'}
                        </button>
                    </div>
                </form>
            )}

            {ehResponsavel && !isCriando && (
                <div className="mt-4 flex justify-center items-center">
                    <button onClick={() => setIsCriando(true)} className="bg-[#2ab646] p-2 px-4 text-white font-semibold rounded-md cursor-pointer hover:bg-green-600 transition-colors">
                        Cadastrar atividade
                    </button>
                </div>
            )}
        </section>
    )

}

export default Atividades