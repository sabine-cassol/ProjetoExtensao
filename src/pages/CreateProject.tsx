import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface NovoProjeto {
    titulo: string;
    tipo: string;
    unidade: string;
    cargaHoraria: string
    cursosVinculados: string;
    parceiros: string;
    colaboradores: string;
    comunidadeParticipante: string;
    semestre: string;
    vagas: string;
    ods: string;
    ciclo: string;
    competencia: string;
    eixo: string;
    periodoInscricao: string;
    periodoExecucao: string;
    justificativa: string;
    pretensao: string;
    requisitos: string;
    professorId: string;
}


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
        periodoInscricao: '',
        periodoExecucao: '',
        justificativa: '',
        pretensao: '',
        requisitos: ''
    });

    const handleChange = (campo: keyof typeof form, valor: string) => {
        setForm((prev) => ({ ...prev, [campo]: valor }));
    };

    const criarMutation = useMutation({
        mutationFn: async (dados: NovoProjeto) => {
            const res = await fetch('/api/projetos', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.erro || 'Erro ao criar projeto');
            }

            return res.json();
        },
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
        if (!user?.id) {
            toast.error("Você precisa estar logado como professor.");
            return;
        }

        if (!form.titulo.trim()) {
            toast.error("O título do projeto é obrigatório.");
            return;
        }

        criarMutation.mutate({
            ...form,
            professorId: user.id
        });
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
                        </section>

                        <div className="text-gray-500 text-sm mt-4 mb-2"> Preencha os campos</div>
                        <div className=" overflow-x-auto">
                            <table className="min-w-full border-collapse font-segoe text-sm text-[#626262] border border-gray-300">
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Tipo</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.tipo} onChange={(e) => handleChange('tipo', e.target.value)} placeholder="Ex.: Prestação de serviço" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Unidade</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.unidade} onChange={(e) => handleChange('unidade', e.target.value)} placeholder="Ex.: Ponta Grossa" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Carga Horária</td>
                                        <td className="px-3 py-2 text-justify">
                                            <input type="text" placeholder="Ex.: 40" value={form.cargaHoraria} onChange={(e) => handleChange('cargaHoraria', e.target.value)} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Cursos Vinculados</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.cursosVinculados} onChange={(e) => handleChange('cursosVinculados', e.target.value)} placeholder="Ex.: Engenharia de Software, Engeharia Civil, Psicologia, etc." className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Parceiros</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.parceiros} onChange={(e) => handleChange('parceiros', e.target.value)} placeholder="Ex.: Nenhum" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Colaboradores</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.colaboradores} onChange={(e) => handleChange('colaboradores', e.target.value)} placeholder="Ex.: Nenhum" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Comunidade Participante</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.comunidadeParticipante} onChange={(e) => handleChange('comunidadeParticipante', e.target.value)} placeholder="Ex.: Alunos do ensino médio" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Semestre</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.semestre} onChange={(e) => handleChange('semestre', e.target.value)} placeholder="Ex.: 4°,5°,6°" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Vagas</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.vagas} onChange={(e) => handleChange('vagas', e.target.value)} placeholder="Ex.: 500" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">ODS</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.ods} onChange={(e) => handleChange('ods', e.target.value)} placeholder="Ex.: Educação de qualidade" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Ciclo</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.ciclo} onChange={(e) => handleChange('ciclo', e.target.value)} placeholder="Ex.: Bimestral, semestral, etc." className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Competência</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.competencia} onChange={(e) => handleChange('competencia', e.target.value)} placeholder="Ex.: Competência 1" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Eixo</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" value={form.eixo} onChange={(e) => handleChange('eixo', e.target.value)} placeholder="[3] - Inovação, Tecnologia e Desenvolvimento Social" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Período de Inscrição</td>
                                        <td className="px-3 py-2 text-justify"><div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                                            <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                            <span className="text-zinc-400 text-center hidden sm:inline">-</span>
                                            <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                        </div></td>
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Período de Execução</td>
                                        <td className="px-3 py-2 text-justify"><div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                                            <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                            <span className="text-zinc-400 text-center hidden sm:inline">-</span>
                                            <input type="date" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                                        </div></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <section className="mt-3 flex flex-col gap-2">
                            <span className='font-bold text-sm font-segoe text-[#424242]'>Justificativa de Relevância</span>
                            <textarea placeholder="Justificativa do projeto" value={form.justificativa} onChange={(e) => handleChange('justificativa', e.target.value)} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                        </section>
                        <section className="mt-3">
                            <span className='font-bold text-sm font-segoe text-[#424242]'>Pretensão da atividade</span>
                            <textarea placeholder="Pretensão do projeto" value={form.pretensao} onChange={(e) => handleChange('pretensao', e.target.value)} className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                        </section>

                        <section className="mt-3">
                            <span className='font-bold text-sm font-segoe text-[#424242]'>Requisitios Técnicos</span>
                            <textarea value={form.requisitos} onChange={(e) => handleChange('requisitos', e.target.value)} placeholder="Requisitos técnicos para participar do projeto" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
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