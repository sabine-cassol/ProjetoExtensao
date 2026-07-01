import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { PROJECTS } from '@/data/Projects.ts'
import { useAuth } from '@/context/AuthContext.tsx'
import { Link } from 'react-router-dom'
import { type Projeto } from '@/data/Projects.ts'
import { Pencil,Trash } from 'lucide-react'
import Error from '../components/Error'


function ProjectDetail() {
    const { projetoId } = useParams<{ projetoId: string }>();
    const { role } = useAuth();
    const [editForm, setEditForm] = useState<Projeto | undefined>(undefined);
    const [listaProjects, setListaProjects] = useState(PROJECTS);
    const [isEditing, setIsEditing] = useState(false);

    const projeto = listaProjects.find(p => p.id == projetoId);

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
        if (!editForm) return;

        setListaProjects(prevLista =>
            prevLista.map(item => item.id === editForm.id ? editForm : item)
        );

        setIsEditing(false);

        console.log("Projeto atualizada localmente com sucesso!");
    };

    const handleDelete = () => {
        confirm("deseja mesmo deletar o projeto?")
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
                                <button onClick={handleStartEditing} className='cursor-pointer border-r border-zinc-300 bg-white rounded-l-sm p-2 hover:bg-slate-50' title='Editar Notícia'>
                                    <Pencil size={18}></Pencil>
                                </button>
                                <button onClick={handleDelete} className='cursor-pointer  rounded-sm p-2 hover:bg-slate-50' title='Deletar Notícia'>
                                    <Trash size={18}></Trash>
                                </button>
                            </div>
                        ) :
                            (<div className='flex gap-3 font-normal text-sm'>
                                <button onClick={() => setIsEditing(false)} className="flex-1 px-4 py-1.5 text-sm font-medium text-slate-700 bg-white border border-zinc-500 rounded-lg hover:bg-slate-50  hover:text-slate-800 active:bg-slate-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Cancelar</button>
                                <button onClick={() => handleSaveEdit()} className="flex-1 px-4 py-1.5 text-sm font-medium text-white bg-[#2ab646] border border-green-500 rounded-lg hover:bg-green-600 active:bg-green-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"> Confirmar </button>
                            </div>)}
                    </section>)}
                    <div className='bg-white border border-zinc-300 p-4'>

                        <section>
                            {isEditing && role === 'teacher' ? (
                                <input type="text" value={editForm?.titulo || ''} onChange={(e) => handleChange('titulo', e.target.value)} className="border font-bold text-lg md:text-2xl w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.unidade}</td>
                                        )}
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Cursos Vinculados</td>
                                        {isEditing && role === 'teacher' ? (
                                            <td className="px-3 py-2 text-justify">
                                                <input type="text" value={editForm?.cursosVinculados || ''} onChange={(e) => handleChange('cursosVinculados', e.target.value)} className="border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                                </div>
                                            </td>
                                        ) : (
                                            <td className="px-3 py-2 text-justify ">{projeto.periodoInscricao}</td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {(projeto.justificativa && projeto.justificativa.length > 0) || (isEditing && role === 'teacher') ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Justificativa de Relevância</span>

                                {isEditing && role === 'teacher' ? (
                                    <textarea value={editForm?.justificativa ?? ''} onChange={(e) => handleChange('justificativa', e.target.value)} className="mt-1 border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all resize-y " />
                                ) : (
                                    <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.justificativa}</p>
                                )}
                            </section>
                        ) : null}

                        {(projeto.pretensao && projeto.pretensao.length > 0) || (isEditing && role === 'teacher') ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Pretensão da atividade</span>

                                {isEditing && role === 'teacher' ? (
                                    <textarea value={editForm?.pretensao ?? ''} onChange={(e) => handleChange('pretensao', e.target.value)} className="mt-1 border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all resize-y " />
                                ) : (
                                    <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.pretensao}</p>
                                )}
                            </section>
                        ) : null}

                        {(projeto.requisitos && projeto.requisitos.length > 0) || (isEditing && role === 'teacher') ? (
                            <section className="mt-3">
                                <span className='font-bold text-sm font-segoe text-[#424242]'>Requisitos Técnicos</span>
                                {isEditing && role === 'teacher' ? (
                                    <textarea value={editForm?.requisitos ?? ''} onChange={(e) => handleChange('requisitos', e.target.value)} className="mt-1 border px-3 py-2 w-full text-zinc-700 border-zinc-400 rounded-sm focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all resize-y " />
                                ) : (
                                    <p className='leading-5 text-justify indent-8 font-segoe text-sm text-[#626262]'>{projeto.requisitos}</p>
                                )}
                            </section>
                        ) : null}

                        {role === 'guest' ? (
                            <section>
                                <button className='mt-5 flex bg-(--darkBlue) text-white p-2 cursor-pointer rounded-sm justify-self-center hover:bg-indigo-900 active:bg-indigo-500'> Quero participar </button>
                            </section>
                        ) : null}

                        {role === 'student' ? (
                            <section>
                                <Link to={'/Presenca'}>
                                    <button className='mt-5 flex bg-(--darkBlue) text-white p-2 cursor-pointer rounded-sm justify-self-center hover:bg-indigo-900 active:bg-indigo-500'> Registrar presença </button>
                                </Link>
                            </section>
                        ) : null}
                    </div>
                </section>

            </main>

        </>
    )
}

export default ProjectDetail