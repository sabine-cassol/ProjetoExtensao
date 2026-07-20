import { useParams } from 'react-router-dom'
import { useState } from 'react'
// import { PROJECTS } from '@/data/Projects.ts'
import { useAuth } from '@/context/AuthContext.tsx'
import { Link } from 'react-router-dom'
import { type Projeto } from '@/data/Projects.ts'
import { Pencil, Trash, RotateCcw } from 'lucide-react'
import Error from '../components/Error'
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom'
import { useProjetoId } from '@/services/getProjetosId'
import { ProjectDetailSkeleton } from '@/components/ProjectDetailSkeleton'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projetoService } from '@/services/projetoService';
import Atividades from '@/components/Atividades.tsx';
import { projetoSchema } from '@/schemas/authSchemas'


function ProjectDetail() {
    const { projetoId } = useParams<{ projetoId: string }>();
    const { role, user } = useAuth();
    const [editForm, setEditForm] = useState<Projeto | undefined>(undefined);
    // const [listaProjects, setListaProjects] = useState(PROJECTS);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [errosProjeto, setErrosProjeto] = useState<Record<string, string>>({});

    const { data: projeto, isLoading, error } = useProjetoId(projetoId!)

    // const projeto = listaProjects.find(p => p.id == projetoId);

    const atualizarMutation = useMutation({
        mutationFn: (dados: Partial<Projeto>) =>
            projetoService.atualizar(projetoId!, dados),
        onSuccess: (projetoAtualizado) => {
            // atualiza o cache imediatamente com o dado retornado pela API
            queryClient.setQueryData(['projeto', projetoId], projetoAtualizado);
            // garante que a lista de projetos também fique sincronizada
            queryClient.invalidateQueries({ queryKey: ['projetos'] });

            setIsEditing(false);
            toast.success("Projeto atualizado com sucesso!");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao atualizar projeto");
        }
    });


    const handleStartEditing = () => {
        if (role === "teacher") {
            setEditForm(projeto);
            setIsEditing(true);
        } else {
            console.log("Você nao tem permissão para editar");
        }
    };
    const handleChange = (name: keyof Projeto, value: string) => {
        if (editForm) {
            setEditForm({
                ...editForm,
                [name]: value
            });
        }
    };

    const handleSaveEdit = () => {
        setErrosProjeto({})
        if (!editForm) return;
        const validacao = projetoSchema.safeParse(editForm);

        if (!validacao.success) {
            const errosFormatados: Record<string, string> = {};

            validacao.error.issues.forEach((issue) => {
                const campo = issue.path[0];

                if (campo !== undefined) {
                    errosFormatados[String(campo)] = issue.message;
                }
            });


            setErrosProjeto(errosFormatados);
            return;
        }
        // setListaProjects(prevLista =>
        //     prevLista.map(item => item.id === editForm.id ? editForm : item)
        // );

        setIsEditing(false);

        toast.success("Projeto atualizado com sucesso!");
        atualizarMutation.mutate(editForm);
    };

    const deletarMutation = useMutation({
        mutationFn: () => projetoService.desativar(projetoId!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projetos'] });
            toast.success("Projeto deletado com sucesso!");
            navigate("/Projetos");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao deletar projeto");
        }
    });

    const handleDelete = () => {
        const confirmou = confirm("Deseja mesmo deletar o projeto?");
        if (!confirmou) return;

        deletarMutation.mutate();
    };

    const ativarMutation = useMutation({
        mutationFn: () => projetoService.ativar(projetoId!),
        onSuccess: (projetoAtualizado) => {
            queryClient.setQueryData(['projeto', projetoId], projetoAtualizado);
            queryClient.invalidateQueries({ queryKey: ['projetos'] });
            toast.success("Projeto reativado com sucesso!");
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao reativar projeto");
        }
    });

    const handleReactivate = () => {
        ativarMutation.mutate();
    };

    if (isLoading) {
        return <ProjectDetailSkeleton />
    }
    if (!projeto) {
        return (
            <Error tipo="Projeto"></Error>
        )
    }

    return (
        <>
            <main className="flex-1 bg-zinc-50/50">
                <section className="cursor-default">
                    {role === 'teacher' && (<section className='border border-b-0 border-zinc-200 flex justify-end bg-gray-100 px-4 py-2 rounded-t-sm'>
                        {!isEditing ? (
                            <div className='flex items-center overflow-hidden border border-zinc-300 bg-white rounded-sm'>
                                <button onClick={handleStartEditing} className='cursor-pointer border-r border-zinc-300 bg-white rounded-l-sm p-2 hover:bg-slate-50' title='Editar Projeto'>
                                    <Pencil size={18}></Pencil>
                                </button>
                                {projeto.ativo ? (
                                    <button
                                        onClick={handleDelete}
                                        disabled={deletarMutation.isPending}
                                        className='cursor-pointer rounded-sm p-2 hover:bg-slate-50'
                                        title='Deletar Projeto'
                                    >
                                        <Trash size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleReactivate}
                                        disabled={ativarMutation.isPending}
                                        className='cursor-pointer rounded-sm p-2 hover:bg-slate-50'
                                        title='Reativar Projeto'>
                                        <RotateCcw size={18} />
                                    </button>
                                )}

                            </div>
                        ) :
                            (<div className='flex gap-3 font-normal text-sm'>
                                <button onClick={() => setIsEditing(false)} className="flex-1 px-4 py-1.5 text-sm font-medium text-slate-700 bg-white border border-zinc-500 rounded-lg hover:bg-slate-50  hover:text-slate-800 active:bg-slate-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Cancelar</button>
                                <button onClick={() => handleSaveEdit()} disabled={atualizarMutation.isPending} className="flex-1 px-4 py-1.5 text-sm font-medium text-white bg-[#2ab646] border border-green-500 rounded-lg hover:bg-green-600 active:bg-green-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"> {atualizarMutation.isPending ? 'Salvando...' : 'Confirmar'} </button>
                            </div>)}
                    </section>)}
                    {role === 'student' && (
                        <section className='border border-b-0 border-zinc-200 flex justify-end bg-gray-100 px-4 py-2 rounded-t-sm'>
                            <div className='flex items-center overflow-hidden border border-zinc-300 bg-white rounded-md'>
                                <Link to={`/Projetos/${projetoId}/Presença`} className='p-2 bg-(--subTitle) text-white font-semibold hover:bg-blue-800'> Registrar presença </Link>
                            </div>
                        </section>
                    )}
                    <div className='bg-white border border-zinc-300 p-4'>

                        <section>
                            {isEditing && role === 'teacher' ? (
                                <>
                                    <input type="text" value={editForm?.titulo || ''} onChange={(e) => handleChange('titulo', e.target.value)} className="border font-bold text-lg md:text-2xl w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                    {errosProjeto.titulo && (
                                        <span className="text-red-600 text-xs mt-1 block">{errosProjeto.titulo}</span>
                                    )}
                                </>
                            ) : (
                                <h1 className='text-2xl font-bold'> {projeto.titulo}</h1>
                            )
                            }
                            <div className='bg-zinc-300 min-w-3xs h-0.5 mt-2'></div>
                        </section>

                        {role === 'student' ? (
                            <section className="mt-3">
                                <span className='font-bold text-xs font-segoe text-[#626262]'>Status</span>
                                <p className='leading-5 text-justify indent-8 font-segoe text-xs text-[#626262]'>Inscrito/Não inscrito</p>
                            </section>
                        ) : null}

                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full border-collapse font-segoe text-sm text-[#626262] border border-gray-300">
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Tipo</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.tipo || ''} onChange={(e) => handleChange('tipo', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.tipo && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.tipo}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.tipo}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Unidade</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.unidade || ''} onChange={(e) => handleChange('unidade', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.unidade && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.unidade}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.unidade}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Carga horária</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.cargaHoraria || ''} onChange={(e) => handleChange('cargaHoraria', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.cargaHoraria && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.cargaHoraria}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.cargaHoraria}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Cursos Vinculados</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.cursosVinculados || ''} onChange={(e) => handleChange('cursosVinculados', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.cursosVinculados && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.cursosVinculados}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.cursosVinculados}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Parceiros</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.parceiros || ''} onChange={(e) => handleChange('parceiros', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.parceiros && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.parceiros}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.parceiros}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Colaboradores</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.colaboradores || ''} onChange={(e) => handleChange('colaboradores', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.colaboradores && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.colaboradores}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.colaboradores}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Comunidade Participante</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.comunidadeParticipante || ''} onChange={(e) => handleChange('comunidadeParticipante', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.comunidadeParticipante && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.comunidadeParticipante}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.comunidadeParticipante}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Semestre</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.semestre || ''} onChange={(e) => handleChange('semestre', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.semestre && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.semestre}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.semestre}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Vagas</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.vagas || ''} onChange={(e) => handleChange('vagas', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.vagas && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.vagas}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.vagas}</td>
                                        )}

                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">ODS</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.ods || ''} onChange={(e) => handleChange('ods', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.ods && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.ods}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.ods}</td>
                                        )}

                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Ciclo</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.ciclo || ''} onChange={(e) => handleChange('ciclo', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.ciclo && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.ciclo}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.ciclo}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Competência</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.competencia || ''} onChange={(e) => handleChange('competencia', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.competencia && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.competencia}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.competencia}</td>
                                        )}

                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Eixo</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.eixo || ''} onChange={(e) => handleChange('eixo', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.eixo && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.eixo}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.eixo}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Período de Inscrição</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                                                    <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                    <span className="text-zinc-400 text-center hidden sm:inline">-</span>
                                                    <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                </div>
                                                {errosProjeto.periodoInscricao && (
                                                    <span className="text-red-600 text-xs mt-1 block">{errosProjeto.periodoInscricao}</span>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.periodoInscricao}</td>
                                        )}

                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Período de Execução</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                                                    <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                    <span className="text-zinc-400 text-center hidden sm:inline">-</span>
                                                    <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                    {errosProjeto.periodoExecucao && (
                                                        <span className="text-red-600 text-xs mt-1 block">{errosProjeto.periodoExecucao}</span>
                                                    )}
                                                </div>
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.periodoExecucao}</td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {(projeto.justificativa && projeto.justificativa.length > 0) || (isEditing && role === 'teacher') ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Justificativa de Relevância</span>

                                {isEditing && role === 'teacher' ? (
                                    <>
                                        <textarea value={editForm?.justificativa ?? ''} onChange={(e) => handleChange('justificativa', e.target.value)} className="mt-1 border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all resize-y " />
                                        {errosProjeto.justificativa && (
                                            <span className="text-red-600 text-xs mt-1 block">{errosProjeto.justificativa}</span>
                                        )}
                                    </>
                                ) : (
                                    <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.justificativa}</p>
                                )}
                            </section>
                        ) : null}

                        {(projeto.pretensao && projeto.pretensao.length > 0) || (isEditing && role === 'teacher') ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Pretensão da atividade</span>

                                {isEditing && role === 'teacher' ? (
                                    <>
                                        <textarea value={editForm?.pretensao ?? ''} onChange={(e) => handleChange('pretensao', e.target.value)} className="mt-1 border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all resize-y " />
                                        {errosProjeto.pretensao && (
                                            <span className="text-red-600 text-xs mt-1 block">{errosProjeto.pretensao}</span>
                                        )}
                                    </>
                                ) : (
                                    <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.pretensao}</p>
                                )}
                            </section>
                        ) : null}

                        {(projeto.requisitos && projeto.requisitos.length > 0) || (isEditing && role === 'teacher') ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Requisitos Técnicos</span>
                                {isEditing && role === 'teacher' ? (
                                    <>
                                        <textarea value={editForm?.requisitos ?? ''} onChange={(e) => handleChange('requisitos', e.target.value)} className="mt-1 border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all resize-y " />
                                        {errosProjeto.requisitos && (
                                            <span className="text-red-600 text-xs mt-1 block">{errosProjeto.requisitos}</span>
                                        )}
                                    </>
                                ) : (
                                    <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.requisitos}</p>
                                )}
                            </section>
                        ) : null}
                        <Atividades role={role} professorResponsavelId={projeto.professorId} userId={user?.id} />
                        {role === 'guest' ? (
                            <section>
                                <button className='mt-5 flex bg-(--darkBlue) text-white p-2 cursor-pointer rounded-sm justify-self-center hover:bg-indigo-900 active:bg-indigo-500'> Quero participar </button>
                            </section>
                        ) : null}

                    </div>
                </section>

            </main>

        </>
    )
}

export default ProjectDetail