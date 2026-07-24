import { useParams } from 'react-router-dom'
import { useState } from 'react'
// import { PROJECTS } from '@/data/Projects.ts'
import { useAuth } from '@/context/AuthContext.tsx'
import { Link } from 'react-router-dom'
import { type Projeto } from '@/data/ProjectType.ts'
import { Pencil, Trash, RotateCcw, AlertCircle } from 'lucide-react'
import Erro from '../components/Error.tsx'
import { toast } from "sonner"
import { useProjetoId } from '@/services/getProjetosId'
import { ProjectDetailSkeleton } from '@/components/ProjectDetailSkeleton'
import { useProjetoMutations } from '@/services/projetoService';
import Atividades from '@/components/Atividades.tsx';
import { projetoSchema } from '@/schemas/authSchemas'
import { useInscreverProjeto, useMinhasInscricoes } from '@/services/inscricoesService'
import { useNavigate } from 'react-router-dom'
import SeletorPeriodos from '@/components/SeletorPeriodos';
import { SeletorCursos } from '@/components/SeletorCursos';


function formatarPeriodo(inicio: string | null, fim: string | null): string {
    if (!inicio || !fim) return '-';
    const formatarData = (iso: string) => new Date(iso).toLocaleDateString('pt-BR');
    return `${formatarData(inicio)} a ${formatarData(fim)}`;
}

function obterDataLocalHoje(): string {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

function ProjectDetail() {
    const { projetoId } = useParams<{ projetoId: string }>();
    const { role, user } = useAuth();
    const [editForm, setEditForm] = useState<Projeto | undefined>(undefined);
    // const [listaProjects, setListaProjects] = useState(PROJECTS);
    const [isEditing, setIsEditing] = useState(false);
    const [errosProjeto, setErrosProjeto] = useState<Record<string, string>>({});

    const { data: projeto, isLoading } = useProjetoId(projetoId!);
    const { data: minhasInscricoes } = useMinhasInscricoes(user?.id, role);

    const inscreverMutation = useInscreverProjeto(projetoId!, user?.id);
    const jaInscrito = minhasInscricoes?.some((inscricao: any) => String(inscricao.projetoId) === String(projetoId));
    const { atualizarMutation, deletarMutation, ativarMutation } = useProjetoMutations(projetoId!, setIsEditing);
    const ehResponsavel = role === 'teacher' && !!user?.id && projeto?.professorId === Number(user.id);
    const perfilCompleto = !!user?.curso && !!user?.periodo;
    const navigate = useNavigate();

    // const projeto = listaProjects.find(p => p.id == projetoId);

    const handleStartEditing = () => {
        if (ehResponsavel) {
            setEditForm(projeto);
            setIsEditing(true);
        } else {
            console.log("Você não tem permissão para editar");
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
        atualizarMutation.mutate(editForm);
    };

    const handleDelete = () => {
        const confirmou = confirm("Deseja mesmo deletar o projeto?");
        if (!confirmou) return;

        deletarMutation.mutate();
    };
    const handleInscrever = () => {
        if (!perfilCompleto) {
            toast.info("Complete seu cadastro (curso e período) para se inscrever no projeto.");
            navigate('/Profile', {
                state: { motivo: 'Complete seu cadastro (curso e período) para se inscrever em projetos.' }
            });
            return;
        }

        inscreverMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Inscrição realizada com sucesso!");
            },
            onError: (erro: Error) => {
                toast.error(erro.message || "Erro ao se inscrever no projeto");
            }
        });
    };



    const handleReactivate = () => {
        ativarMutation.mutate();
    };

    if (isLoading) {
        return <ProjectDetailSkeleton />
    }
    if (!projeto) {
        return (
            <Erro tipo="Projeto"></Erro>
        )
    }

    function normalizarTexto(texto: string): string {
        return texto.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    const cursoElegivel = !projeto.cursosVinculados || projeto.cursosVinculados
        .split(',')
        .map((c) => normalizarTexto(c))
        .includes(normalizarTexto(user?.curso ?? ''));

    const periodoElegivel = !projeto.semestre || projeto.semestre
        .split(',')
        .map((p) => Number(p.trim().replace('º', '')))
        .includes(Number(user?.periodo));

    const elegivel = perfilCompleto && cursoElegivel && periodoElegivel;
    return (
        <>
            <main className="flex-1 bg-zinc-50/50">
                <section className="cursor-default">
                    {ehResponsavel && (<section className='border border-b-0 border-zinc-200 flex justify-end bg-gray-100 px-4 py-2 rounded-t-sm'>
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

                    {role === 'student' && (() => {
                        const hoje = obterDataLocalHoje();
                        const dentroDoperiodo = projeto.periodoInscricaoInicio && projeto.periodoInscricaoFim
                            ? hoje >= projeto.periodoInscricaoInicio && hoje <= projeto.periodoInscricaoFim
                            : false;

                        return (
                            <section className='border border-b-0 border-zinc-200 flex justify-end bg-gray-100 px-4 py-2 rounded-t-sm'>
                                <div className='flex items-center overflow-hidden border border-zinc-300 bg-white rounded-md'>
                                    {jaInscrito ? (
                                        <Link
                                            to={`/Projetos/${projetoId}/Presença`}
                                            className='p-2 bg-(--subTitle) text-white font-semibold hover:bg-blue-800'>
                                            Registrar presença
                                        </Link>
                                    ) : dentroDoperiodo ? (
                                        elegivel ? (
                                            <button onClick={handleInscrever} disabled={inscreverMutation.isPending} /* ... */>
                                                {inscreverMutation.isPending ? 'Inscrevendo...' : 'Inscrever-se no projeto'}
                                            </button>
                                        ) : (
                                            <span className="p-2 text-zinc-500 text-sm font-medium">
                                                {!cursoElegivel
                                                    ? 'Seu curso não está entre os cursos vinculados a este projeto'
                                                    : 'Este projeto não aceita alunos do seu período'}
                                            </span>
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </section>
                        );
                    })()}

                    <div className='bg-white border border-zinc-300 p-4'>

                        <section>
                            {isEditing && ehResponsavel ? (
                                <>
                                    <input type="text" value={editForm?.titulo || ''} onChange={(e) => handleChange('titulo', e.target.value)} className="border font-bold text-lg md:text-2xl w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                    {errosProjeto.titulo && (
                                        <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                            <div className='flex flex-row gap-1 items-center'>
                                                <AlertCircle className="size-3.5 shrink-0" />
                                                <span className="text-xs font-medium tracking-wide">
                                                    {errosProjeto.titulo}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <h1 className='text-2xl font-bold'> {projeto.titulo}</h1>
                            )
                            }
                            <div className='bg-zinc-300 min-w-3xs h-0.5 mt-2'></div>
                        </section>

                        {role === 'student' && (
                            <section className="mt-3">
                                <span className='font-bold text-xs font-segoe text-[#626262]'>Status</span>
                                <p className='leading-5 text-justify indent-8 font-segoe text-xs text-[#626262]'>
                                    {jaInscrito ? 'Inscrito' : 'Não inscrito'}
                                </p>
                            </section>
                        )}

                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full border-collapse font-segoe text-sm text-[#626262] border border-gray-300">
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Tipo</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.tipo || ''} onChange={(e) => handleChange('tipo', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.tipo && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.tipo}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.tipo}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Unidade</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.unidade || ''} onChange={(e) => handleChange('unidade', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.unidade && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.unidade}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.unidade}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Carga horária</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.cargaHoraria || ''} onChange={(e) => handleChange('cargaHoraria', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.cargaHoraria && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.cargaHoraria}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.cargaHoraria}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Cursos Vinculados</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <SeletorCursos
                                                    value={editForm?.cursosVinculados || ''}
                                                    onChange={(novoValor) => handleChange('cursosVinculados', novoValor)}
                                                />

                                                {errosProjeto.cursosVinculados && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.cursosVinculados}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.cursosVinculados}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Parceiros</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.parceiros || ''} onChange={(e) => handleChange('parceiros', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.parceiros && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.parceiros}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.parceiros}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Colaboradores</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.colaboradores || ''} onChange={(e) => handleChange('colaboradores', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.colaboradores && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.colaboradores}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.colaboradores}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Comunidade Participante</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.comunidadeParticipante || ''} onChange={(e) => handleChange('comunidadeParticipante', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.comunidadeParticipante && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.comunidadeParticipante}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.comunidadeParticipante}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Semestre</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <SeletorPeriodos
                                                    value={editForm?.semestre || ''}
                                                    onChange={(novoValor) => handleChange('semestre', novoValor)}
                                                />

                                                {errosProjeto.semestre && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.semestre}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.semestre}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Vagas</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.vagas || ''} onChange={(e) => handleChange('vagas', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.vagas && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.vagas}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.vagas}</td>
                                        )}

                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">ODS</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.ods || ''} onChange={(e) => handleChange('ods', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.ods && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.ods}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.ods}</td>
                                        )}

                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Ciclo</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.ciclo || ''} onChange={(e) => handleChange('ciclo', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.ciclo && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.ciclo}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.ciclo}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Competência</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.competencia || ''} onChange={(e) => handleChange('competencia', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.competencia && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.competencia}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.competencia}</td>
                                        )}

                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Eixo</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.eixo || ''} onChange={(e) => handleChange('eixo', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                                {errosProjeto.eixo && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.eixo}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.eixo}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Período de Inscrição</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                                                    <input
                                                        type="date"
                                                        value={editForm?.periodoInscricaoInicio || ''}
                                                        onChange={(e) => handleChange('periodoInscricaoInicio', e.target.value)}
                                                        className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-0"
                                                    />
                                                    <span className="text-zinc-400 text-center hidden sm:inline">-</span>
                                                    <input
                                                        type="date"
                                                        value={editForm?.periodoInscricaoFim || ''}
                                                        onChange={(e) => handleChange('periodoInscricaoFim', e.target.value)}
                                                        className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-0"
                                                    />
                                                </div>
                                                {errosProjeto.periodoInscricaoInicio && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.periodoInscricaoInicio}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify">
                                                {formatarPeriodo(projeto.periodoInscricaoInicio, projeto.periodoInscricaoFim)}
                                            </td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Período de Execução</td>
                                        {isEditing && ehResponsavel ? (
                                            <td className="px-3 py-2 text-justify">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                                                    <input
                                                        type="date"
                                                        value={editForm?.periodoExecucaoInicio || ''}
                                                        onChange={(e) => handleChange('periodoExecucaoInicio', e.target.value)}
                                                        className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-0"
                                                    />
                                                    <span className="text-zinc-400 text-center hidden sm:inline">-</span>
                                                    <input
                                                        type="date"
                                                        value={editForm?.periodoExecucaoFim || ''}
                                                        onChange={(e) => handleChange('periodoExecucaoFim', e.target.value)}
                                                        className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-0"
                                                    />
                                                </div>
                                                {errosProjeto.periodoExecucaoInicio && (
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                        <div className='flex flex-row gap-1 items-center'>
                                                            <AlertCircle className="size-3.5 shrink-0" />
                                                            <span className="text-xs font-medium tracking-wide">
                                                                {errosProjeto.periodoExecucaoInicio}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify">
                                                {formatarPeriodo(projeto.periodoExecucaoInicio, projeto.periodoExecucaoFim)}
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {(projeto.justificativa && projeto.justificativa.length > 0) || (isEditing && ehResponsavel) ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Justificativa de Relevância</span>

                                {isEditing && ehResponsavel ? (
                                    <>
                                        <textarea value={editForm?.justificativa ?? ''} onChange={(e) => handleChange('justificativa', e.target.value)} className="mt-1 border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all resize-y " />
                                        {errosProjeto.justificativa && (
                                            <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                <div className='flex flex-row gap-1 items-center'>
                                                    <AlertCircle className="size-3.5 shrink-0" />
                                                    <span className="text-xs font-medium tracking-wide">
                                                        {errosProjeto.justificativa}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.justificativa}</p>
                                )}
                            </section>
                        ) : null}

                        {(projeto.pretensao && projeto.pretensao.length > 0) || (isEditing && ehResponsavel) ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Pretensão da atividade</span>

                                {isEditing && ehResponsavel ? (
                                    <>
                                        <textarea value={editForm?.pretensao ?? ''} onChange={(e) => handleChange('pretensao', e.target.value)} className="mt-1 border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all resize-y " />
                                        {errosProjeto.pretensao && (
                                            <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                <div className='flex flex-row gap-1 items-center'>
                                                    <AlertCircle className="size-3.5 shrink-0" />
                                                    <span className="text-xs font-medium tracking-wide">
                                                        {errosProjeto.pretensao}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.pretensao}</p>
                                )}
                            </section>
                        ) : null}

                        {(projeto.requisitos && projeto.requisitos.length > 0) || (isEditing && ehResponsavel) ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Requisitos Técnicos</span>
                                {isEditing && ehResponsavel ? (
                                    <>
                                        <textarea value={editForm?.requisitos ?? ''} onChange={(e) => handleChange('requisitos', e.target.value)} className="mt-1 border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all resize-y " />
                                        {errosProjeto.requisitos && (
                                            <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                <div className='flex flex-row gap-1 items-center'>
                                                    <AlertCircle className="size-3.5 shrink-0" />
                                                    <span className="text-xs font-medium tracking-wide">
                                                        {errosProjeto.requisitos}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.requisitos}</p>
                                )}
                            </section>
                        ) : null}
                        <Atividades
                            role={role}
                            professorResponsavelId={projeto.professorId}
                            userId={user?.id}
                            alunoInscrito={jaInscrito}
                        />

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