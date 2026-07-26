import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { type Atividade } from '@/data/AtividadeType';
import { Pencil, Trash, RotateCcw } from 'lucide-react';
import { atividadeSchema } from '@/schemas/authSchemas';
import { AlertCircle } from 'lucide-react';
import { AtividadesSkeleton } from './AtividadeSkeleton';
import Erro from '@/components/Error';
import { useAtividadesProjeto, useAtividadesMutations } from '@/services/atividadeService';
import { useMinhasPresencas } from '@/services/presencaService';

interface AtividadePayload {
    titulo: string;
    descricao: string;
    data: string;
    cargaHoraria: number;
    exigeLocalizacao: boolean;
    latitude?: number;
    longitude?: number;
    raioMetros?: number;
    projetoId: number;
}

interface AtividadesComponentProps {
    role: string;
    professorResponsavelId: number;
    userId?: string;
    alunoInscrito?: boolean;
    isAdmin?: boolean;
}

function Atividades({ role, professorResponsavelId, userId, alunoInscrito, isAdmin }: AtividadesComponentProps) {
    const { projetoId } = useParams<{ projetoId: string }>();

    const ehResponsavel = role === 'teacher' && !!userId && (
        String(professorResponsavelId) === userId || !!isAdmin
    );

    const [isCriando, setIsCriando] = useState(false);
    const handleAbrirCriacao = () => {
        setEditandoId(null);
        setErrosAtividade({});
        setIsCriando(true);
    };
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        data: '',
        cargaHoraria: '',
        exigeLocalizacao: false,
        latitude: '',
        longitude: '',
        raioMetros: '100'
    });
    const [errosAtividade, setErrosAtividade] = useState<Record<string, string>>({});

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, exigeLocalizacao: e.target.checked }));
    };

    const { data: atividades, isLoading, error } = useAtividadesProjeto(projetoId);

    const ATIVIDADES_POR_PAGINA = 15;
    const totalDePaginas = Math.ceil((atividades?.length ?? 0) / ATIVIDADES_POR_PAGINA);
    const indiceFinal = paginaAtual * ATIVIDADES_POR_PAGINA;
    const indiceInicial = indiceFinal - ATIVIDADES_POR_PAGINA;
    const atividadesExibidas = atividades?.slice(indiceInicial, indiceFinal) ?? [];

    const { criarMutation, atualizarMutation, desativarMutation, ativarMutation } = useAtividadesMutations(projetoId, {
        onCriarSucesso: () => {
            setFormData({
                titulo: '',
                descricao: '',
                data: '',
                cargaHoraria: '',
                exigeLocalizacao: true,
                latitude: '',
                longitude: '',
                raioMetros: '100'
            });
            setIsCriando(false);
        },
        onAtualizarSucesso: () => {
            setEditandoId(null);
        }
    });

    const { data: minhasPresencas } = useMinhasPresencas(role === 'student' && !!alunoInscrito);

    function statusDaAtividade(atividadeId: number): 'em Análise' | 'Aprovado' | 'Recusado' | null {
        const presenca = minhasPresencas?.find((p: any) => p.atividadeId === atividadeId);
        return presenca ? presenca.status : null;
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    function formatarDataLocal(dataISO: string): string {
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia}/${mes}/${ano}`;
    }

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

        const validacao = atividadeSchema.safeParse({
            titulo: formData.titulo,
            descricao: formData.descricao,
            data: formData.data,
            cargaHoraria: formData.cargaHoraria,
            exigeLocalizacao: formData.exigeLocalizacao,
            latitude: formData.latitude,
            longitude: formData.longitude,
            raioMetros: formData.raioMetros
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

        const payload: AtividadePayload = {
            titulo: formData.titulo,
            descricao: formData.descricao,
            data: formData.data,
            cargaHoraria: Number(formData.cargaHoraria.replace(',', '.')),
            exigeLocalizacao: formData.exigeLocalizacao,
            latitude: formData.exigeLocalizacao ? Number(formData.latitude) : undefined,
            longitude: formData.exigeLocalizacao ? Number(formData.longitude) : undefined,
            raioMetros: formData.exigeLocalizacao ? Number(formData.raioMetros) : undefined,
            projetoId: Number(projetoId)
        };

        criarMutation.mutate(payload);
    };

    const handleIniciarEdicao = (atividade: Atividade) => {
        setIsCriando(false);
        setErrosAtividade({});
        setEditandoId(atividade.id);
        setFormData({
            titulo: atividade.titulo,
            descricao: atividade.descricao,
            data: atividade.data,
            cargaHoraria: String(atividade.cargaHoraria),
            exigeLocalizacao: atividade.exigeLocalizacao,
            latitude: atividade.latitude ? String(atividade.latitude) : '',
            longitude: atividade.longitude ? String(atividade.longitude) : '',
            raioMetros: atividade.raioMetros ? String(atividade.raioMetros) : '100'
        });
    };

    const handleSalvarEdicao = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setErrosAtividade({});

        const validacao = atividadeSchema.safeParse({
            titulo: formData.titulo,
            descricao: formData.descricao,
            data: formData.data,
            cargaHoraria: formData.cargaHoraria,
            exigeLocalizacao: formData.exigeLocalizacao,
            latitude: formData.latitude,
            longitude: formData.longitude,
            raioMetros: formData.raioMetros
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
                cargaHoraria: Number(formData.cargaHoraria.replace(',', '.')),
                exigeLocalizacao: formData.exigeLocalizacao,
                latitude: formData.exigeLocalizacao ? Number(formData.latitude) : undefined,
                longitude: formData.exigeLocalizacao ? Number(formData.longitude) : undefined,
                raioMetros: formData.exigeLocalizacao ? Number(formData.raioMetros) : undefined
            }
        });
    };
    const handleDesativar = (id: number) => {
        const confirmou = confirm("Deseja mesmo desativar esta atividade?");
        if (!confirmou) return;
        desativarMutation.mutate(id);
    };

    const preencherLocalizacaoAtual = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocalização não suportada neste navegador");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                setFormData(prev => ({
                    ...prev,
                    latitude: posicao.coords.latitude.toString(),
                    longitude: posicao.coords.longitude.toString()
                }));
                toast.success("Localização preenchida!");
            },
            () => {
                toast.error("Não foi possível obter sua localização");
            }
        );
    }

    if (role === 'guest') {
        return null;
    }

    if (isLoading) {
        return <AtividadesSkeleton></AtividadesSkeleton>
    }


    if (error) {
        console.log(error)
        return <Erro tipo='Atividade'></Erro>
    }

    return (
        <section className='mt-6'>
            <span className='font-bold text-lg font-segoe'> Atividades </span>

            {atividades?.length === 0 && !isCriando && (
                <p className="mt-2 text-sm text-zinc-500">Nenhuma atividade cadastrada ainda.</p>
            )}

            {atividadesExibidas?.map((atividade) => (
                <div key={atividade.id}>
                    {editandoId === atividade.id ? (
                        <form onSubmit={(e) => handleSalvarEdicao(e, atividade.id)} className="min-w-full text-sm border border-gray-200 p-4 shadow-sm space-y-3 mt-2">
                            <div>
                                <input type="text" name="titulo" placeholder="Título da atividade" required value={formData.titulo} onChange={handleInputChange} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 font-bold focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                {errosAtividade.titulo && (
                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                        <div className='flex flex-row gap-1 items-center'>
                                            <AlertCircle className="size-3.5 shrink-0" />
                                            <span className="text-xs font-medium tracking-wide">
                                                {errosAtividade.titulo}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 border border-zinc-400 p-2 max-w-80 rounded-sm">
                                <input
                                    type="checkbox"
                                    id="exigeLocalizacao"
                                    checked={formData.exigeLocalizacao}
                                    defaultChecked={false}
                                    onChange={handleCheckboxChange}
                                    className="cursor-pointer"
                                />
                                <label htmlFor="exigeLocalizacao" className="text-xs text-gray-600 cursor-pointer">
                                    Exigir localização para registrar presença
                                </label>
                            </div>

                            {formData.exigeLocalizacao && (
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-xs text-gray-700">Latitude</label>
                                        <input
                                            type="text"
                                            name="latitude"
                                            placeholder="-23.5505"
                                            value={formData.latitude}
                                            onChange={handleInputChange}
                                            className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                        />
                                        {errosAtividade.latitude && (
                                            <span className="text-red-600 text-xs mt-1 block">{errosAtividade.latitude}</span>
                                        )}

                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-xs text-gray-700">Longitude</label>
                                        <input
                                            type="text"
                                            name="longitude"
                                            placeholder="-46.6333"
                                            value={formData.longitude}
                                            onChange={handleInputChange}
                                            className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                        />
                                        {errosAtividade.longitude && (
                                            <span className="text-red-600 text-xs mt-1 block">{errosAtividade.longitude}</span>
                                        )}

                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-xs text-gray-700">Raio (m)</label>
                                        <input
                                            type="number"
                                            name="raioMetros"
                                            placeholder="100"
                                            value={formData.raioMetros}
                                            onChange={handleInputChange}
                                            className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                        />
                                        {errosAtividade.raioMetros && (
                                            <span className="text-red-600 text-xs mt-1 block">{errosAtividade.raioMetros}</span>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={preencherLocalizacaoAtual}
                                        className="flex text-xs text-blue-600 hover:underline cursor-pointer">
                                        Usar minha localização atual
                                    </button>

                                </div>
                            )}


                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <input type="text" inputMode="decimal" name="cargaHoraria" placeholder="Carga horária (ex: 4)" required min="1" value={formData.cargaHoraria} onChange={handleCargaHorariaChange} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                    <span className="text-gray-400">h</span>
                                    {errosAtividade.cargaHoraria && (
                                        <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                            <div className='flex flex-row gap-1 items-center'>
                                                <AlertCircle className="size-3.5 shrink-0" />
                                                <span className="text-xs font-medium tracking-wide">
                                                    {errosAtividade.cargaHoraria}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <span className="text-gray-300">•</span>
                                <input type="date" name="data" required value={formData.data} onChange={handleInputChange} className="border text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-0" />
                                {errosAtividade.data && (
                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                        <div className='flex flex-row gap-1 items-center'>
                                            <AlertCircle className="size-3.5 shrink-0" />
                                            <span className="text-xs font-medium tracking-wide">
                                                {errosAtividade.data}
                                            </span>
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div>
                                <textarea name="descricao" placeholder="Descrição detalhada da atividade aqui..." required value={formData.descricao} onChange={handleInputChange} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                {errosAtividade.descricao && (
                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                        <div className='flex flex-row gap-1 items-center'>
                                            <AlertCircle className="size-3.5 shrink-0" />
                                            <span className="text-xs font-medium tracking-wide">
                                                {errosAtividade.descricao}
                                            </span>
                                        </div>
                                    </div>
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
                                <h1 className="text-base text-zinc-800 font-bold mb-1">{atividade.titulo}</h1>

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
                                <span>{formatarDataLocal(atividade.data)}</span>
                                {!atividade.ativo && (
                                    <>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-red-500 font-semibold">Inativa</span>
                                    </>
                                )}
                            </div>

                            {role === 'student' && alunoInscrito && (() => {
                                const status = statusDaAtividade(atividade.id);
                                if (!status) {
                                    return (
                                        <span className="inline-block text-xs px-2 py-0.5 rounded-sm font-semibold bg-zinc-200 text-zinc-500 mb-3">
                                            Presença não registrada
                                        </span>
                                    );
                                }
                                const cores: Record<string, string> = {
                                    pendente: 'bg-amber-400 text-zinc-900',
                                    aprovado: 'bg-emerald-100 text-emerald-700',
                                    recusado: 'bg-red-100 text-red-700'
                                };
                                return (
                                    <span className={`inline-block text-xs px-2 py-0.5 rounded-sm font-semibold mb-3 ${cores[status]}`}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </span>
                                );
                            })()}

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
                            <input type="text" inputMode="decimal" name="cargaHoraria" placeholder="Carga horária (ex: 4)" required min="1" value={formData.cargaHoraria} onChange={handleInputChange} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                            <span className="text-gray-400">h</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <input type="date" name="data" required value={formData.data} onChange={handleInputChange} className="border text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-0" />
                    </div>

                    <div className="flex items-center gap-2 border border-zinc-400 p-2 max-w-80 rounded-sm">
                        <input
                            type="checkbox"
                            id="exigeLocalizacao"
                            checked={formData.exigeLocalizacao}
                            onChange={handleCheckboxChange}
                            className="cursor-pointer" />
                        <label htmlFor="exigeLocalizacao" className="text-xs text-gray-600 cursor-pointer">
                            Exigir localização para registrar presença
                        </label>
                    </div>
                    {formData.exigeLocalizacao && (
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                            <div className='flex flex-col gap-1'>
                                <label className="text-xs text-gray-700">Latitude</label>
                                <input
                                    type="text"
                                    name="latitude"
                                    placeholder="-23.5505"
                                    value={formData.latitude}
                                    onChange={handleInputChange}
                                    className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                />
                                {errosAtividade.latitude && (
                                    <span className="text-red-600 text-xs mt-1 block">{errosAtividade.latitude}</span>
                                )}

                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="text-xs text-gray-700">Longitude</label>
                                <input
                                    type="text"
                                    name="longitude"
                                    placeholder="-46.6333"
                                    value={formData.longitude}
                                    onChange={handleInputChange}
                                    className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                />
                                {errosAtividade.longitude && (
                                    <span className="text-red-600 text-xs mt-1 block">{errosAtividade.longitude}</span>
                                )}

                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="text-xs text-gray-700">Raio (m)</label>
                                <input
                                    type="number"
                                    name="raioMetros"
                                    placeholder="100"
                                    value={formData.raioMetros}
                                    onChange={handleInputChange}
                                    className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                />
                                {errosAtividade.raioMetros && (
                                    <span className="text-red-600 text-xs mt-1 block">{errosAtividade.raioMetros}</span>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={preencherLocalizacaoAtual}
                                className="flex text-xs text-blue-600 hover:underline cursor-pointer">
                                Usar minha localização atual
                            </button>

                        </div>
                    )}


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
                    <button onClick={handleAbrirCriacao} className="bg-[#2ab646] p-2 px-4 text-white font-semibold rounded-md cursor-pointer hover:bg-green-600 transition-colors">
                        Cadastrar atividade
                    </button>
                </div>
            )}
            {totalDePaginas > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8 pt-6">
                    <button onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))} disabled={paginaAtual === 1} className="px-4 py-2 cursor-pointer text-sm font-medium text-zinc-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed ">
                        Anterior
                    </button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalDePaginas }, (_, index) => {
                            const numeroPagina = index + 1;
                            const isAtiva = paginaAtual === numeroPagina;
                            return (
                                <button key={numeroPagina} onClick={() => setPaginaAtual(numeroPagina)}
                                    className={`w-9 h-9 text-sm font-semibold rounded-md ${isAtiva
                                        ? 'bg-cyan-400 text-white'
                                        : 'text-zinc-600 hover:bg-zinc-100 border border-zinc-300 cursor-pointer'
                                        }`}>
                                    {numeroPagina}
                                </button>
                            );
                        })}
                    </div>

                    <button onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalDePaginas))} disabled={paginaAtual === totalDePaginas} className="px-4 py-2 cursor-pointer text-sm font-medium text-zinc-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed ">
                        Próxima
                    </button>
                </div>
            )}
        </section>
    )

}

export default Atividades