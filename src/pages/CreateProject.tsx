import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { projetoSchema } from '@/schemas/authSchemas'
import { AlertCircle } from 'lucide-react';
import { projetoService, type NovoProjeto } from '@/services/projetoService';


function ProjectDetail() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [form, setForm] = useState<Omit<NovoProjeto, 'professorId'>>({
        titulo: '',
        tipo: '',
        unidade: '',
        cargaHoraria: '',
        cursosVinculados: '',
        parceiros: '',
        colaboradores: '',
        comunidadeParticipante: '',
        semestre: '',
        vagas: '',
        ods: '',
        ciclo: '',
        competencia: '',
        eixo: '',
        periodoInscricaoInicio: '',
        periodoInscricaoFim: '',
        periodoExecucaoInicio: '',
        periodoExecucaoFim: '',
        justificativa: '',
        pretensao: '',
        requisitos: ''
    });

    const [errosProjeto, setErrosProjeto] = useState<Record<string, string>>({});

    const handleChange = (campo: keyof typeof form, valor: string) => {
        setForm((prev) => ({ ...prev, [campo]: valor }));
    };

    const criarMutation = useMutation({
        mutationFn: (dados: NovoProjeto) => projetoService.criar(dados),
        onSuccess: (projetoCriado) => {
            queryClient.invalidateQueries({ queryKey: ['projetos'] });
            toast.success("Projeto criado com sucesso!");
            navigate(`/Projetos/${projetoCriado.id}`);
        },
        onError: (erro: Error) => {
            toast.error(erro.message || "Erro ao criar projeto");
        }
    });

    const handleSubmit = () => {
        setErrosProjeto({});

        if (!user?.id) {
            toast.error("Você precisa estar logado como professor.");
            return;
        }

        const validacao = projetoSchema.safeParse(form);

        if (!validacao.success) {
            const errosFormatados: Record<string, string> = {};

            validacao.error.issues.forEach((issue) => {
                const campo = issue.path[0];
                if (campo !== undefined) {
                    errosFormatados[String(campo)] = issue.message;
                }
            });

            console.log("Campos com erro de validação:", errosFormatados);

            setErrosProjeto(errosFormatados);
            return;
        }
        criarMutation.mutate(form);
    };

    return (
        <>
            <section className="flex-1 bg-zinc-50/50">
                <section className="cursor-default">
                    <div>
                        <h1 className='text-2xl font-bold'> Criar novo projeto </h1>
                        <p className="text-[#9198a1] text-xs">OBS.: Projetos criados nesse site funcionarão apenas para o sistema de ponto online, outras funcionalidades pertinentes à projetos de extensão deverão ser realizadas no site do UniGestor</p>
                    </div>
                    <div className='bg-white border border-zinc-300 p-4 mt-4'>

                        <section className="flex flex-col gap-2">
                            <label htmlFor="inputName" className="font-semibold">Digite o nome do projeto</label>
                            {/* <input name="nome" required maxLength={100} className="text-xl md:text-xl font-bold text-slate-800 mb-4 border-b-2 border-(--lightCyan) outline-none bg-slate-50 px-2 w-full dark:bg-zinc-800 dark:text-zinc-100 dark:border-violet-400"/> */}
                            <input id="inputName" type="text" required maxLength={254} value={form.titulo} onChange={(e) => handleChange('titulo', e.target.value)} className="border text-lg font-bold border-zinc-300 rounded-sm p-2 focus:outline-none focus:border-(--lightCyan) focus-within:ring-2 focus-within:ring-(--lightCyan) focus-within:border-zinc-500 transition-all focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px]" />
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
                        </section>

                        <div className="text-gray-500 text-sm mt-4 mb-2"> Preencha os campos</div>
                        <div className=" overflow-x-auto">
                            <table className="min-w-full border-collapse font-segoe text-sm text-[#626262] border border-gray-300">
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Tipo</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.tipo} onChange={(e) => handleChange('tipo', e.target.value)} placeholder="Ex.: Prestação de serviço" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Unidade</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.unidade} onChange={(e) => handleChange('unidade', e.target.value)} placeholder="Ex.: Ponta Grossa" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Carga Horária</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" placeholder="Ex.: 40" value={form.cargaHoraria} onChange={(e) => handleChange('cargaHoraria', e.target.value)} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Cursos Vinculados</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.cursosVinculados} onChange={(e) => handleChange('cursosVinculados', e.target.value)} placeholder="Ex.: Engenharia de Software, Engeharia Civil, Psicologia, etc." className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Parceiros</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.parceiros} onChange={(e) => handleChange('parceiros', e.target.value)} placeholder="Ex.: Nenhum" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Colaboradores</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.colaboradores} onChange={(e) => handleChange('colaboradores', e.target.value)} placeholder="Ex.: Nenhum" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Comunidade Participante</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.comunidadeParticipante} onChange={(e) => handleChange('comunidadeParticipante', e.target.value)} placeholder="Ex.: Alunos do ensino médio" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Semestre</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.semestre} onChange={(e) => handleChange('semestre', e.target.value)} placeholder="Ex.: 4°,5°,6°" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Vagas</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.vagas} onChange={(e) => handleChange('vagas', e.target.value)} placeholder="Ex.: 500" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">ODS</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.ods} onChange={(e) => handleChange('ods', e.target.value)} placeholder="Ex.: Educação de qualidade" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Ciclo</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.ciclo} onChange={(e) => handleChange('ciclo', e.target.value)} placeholder="Ex.: Bimestral, semestral, etc." className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Competência</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.competencia} onChange={(e) => handleChange('competencia', e.target.value)} placeholder="Ex.: Competência 1" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Eixo</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" value={form.eixo} onChange={(e) => handleChange('eixo', e.target.value)} placeholder="[3] - Inovação, Tecnologia e Desenvolvimento Social" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Período de Inscrição</td>
                                        <td className="px-3 py-2 text-justify"><div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                                            <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-0" />
                                            <span className="text-zinc-400 text-center hidden sm:inline">-</span>
                                            <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-0" />
                                        </div>
                                            {errosProjeto.periodoInscricao && (
                                                <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                    <div className='flex flex-row gap-1 items-center'>
                                                        <AlertCircle className="size-3.5 shrink-0" />
                                                        <span className="text-xs font-medium tracking-wide">
                                                            {errosProjeto.periodoInscricao}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Período de Execução</td>
                                        <td className="px-3 py-2 text-justify"><div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                                            <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-0" />
                                            <span className="text-zinc-400 text-center hidden sm:inline">-</span>
                                            <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-0" />
                                        </div>
                                            {errosProjeto.periodoExecucao && (
                                                <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
                                                    <div className='flex flex-row gap-1 items-center'>
                                                        <AlertCircle className="size-3.5 shrink-0" />
                                                        <span className="text-xs font-medium tracking-wide">
                                                            {errosProjeto.periodoExecucao}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <section className="mt-3 flex flex-col gap-2">
                            <span className='font-bold text-sm font-segoe text-[#424242]'>Justificativa de Relevância</span>
                            <textarea placeholder="Justificativa do projeto" value={form.justificativa} onChange={(e) => handleChange('justificativa', e.target.value)} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                        </section>
                        <section className="mt-3">
                            <span className='font-bold text-sm font-segoe text-[#424242]'>Pretensão da atividade</span>
                            <textarea placeholder="Pretensão do projeto" value={form.pretensao} onChange={(e) => handleChange('pretensao', e.target.value)} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                        </section>

                        <section className="mt-3">
                            <span className='font-bold text-sm font-segoe text-[#424242]'>Requisitios Técnicos</span>
                            <textarea value={form.requisitos} onChange={(e) => handleChange('requisitos', e.target.value)} placeholder="Requisitos técnicos para participar do projeto" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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
                        </section>
                    </div>

                    <div className="mt-4 flex justify-center items-center">
                        <button onClick={handleSubmit} disabled={criarMutation.isPending} className="bg-[#2ab646] p-2 px-4 text-white font-semibold rounded-md cursor-pointer hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed">
                            {criarMutation.isPending ? 'Criando...' : 'Criar projeto'}
                        </button>
                    </div>
                </section>
            </section>
        </>
    )
}

export default ProjectDetail