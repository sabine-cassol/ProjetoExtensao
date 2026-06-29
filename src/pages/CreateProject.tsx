
function ProjectDetail() {

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
                            <label htmlFor="inputName" className="font-semibold">digite o nome do projeto</label>
                            {/* <input name="nome" required maxLength={100} className="text-xl md:text-xl font-bold text-slate-800 mb-4 border-b-2 border-(--lightCyan) outline-none bg-slate-50 px-2 w-full dark:bg-zinc-800 dark:text-zinc-100 dark:border-violet-400"/> */}
                            <input type="text" required max="254" className="border text-lg font-bold border-zinc-300 rounded-sm p-2 focus:outline-none focus:border-(--lightCyan) focus-within:ring-2 focus-within:ring-(--lightCyan) focus-within:border-zinc-500 transition-all focus-visible:border-(--lightCyan) focus-visible:ring-(--lightCyan)/30 focus-visible:ring-[3px]" />
                        </section>

                        <div className="text-gray-500 text-sm mt-4 mb-2"> Preencha os campos</div>
                        <div className=" overflow-x-auto">
                            <table className="min-w-full border-collapse font-segoe text-sm text-[#626262] border border-gray-300">
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Tipo</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="Ex.: Prestação de serviço" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold w-1/3 text-zinc-900">Unidade</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="Ex.: Ponta Grossa" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Cursos Vinculados</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="Ex.: Engenharia de Software, Engeharia Civil, Psicologia, etc." className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Parceiros</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="Ex.: Nenhum" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Colaboradores</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="Ex.: Nenhum" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Comunidade Participante</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="Ex.: Alunos do ensino médio" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Semestre</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="Ex.: 4°,5°,6°" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Vagas</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="Ex.: 500" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">ODS</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="Ex.: Educação de qualidade" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Ciclo</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="Ex.: Bimestral, semestral, etc." className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Competência</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="Ex.: Competência 1" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
                                    </tr>

                                    <tr>
                                        <td className="px-3 py-2 font-bold text-zinc-900">Eixo</td>
                                        <td className="px-3 py-2 text-justify"><input type="text" placeholder="[3] - Inovação, Tecnologia e Desenvolvimento Social" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" /></td>
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
                            <textarea placeholder="Justificativa do projeto" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                        </section>
                        <section className="mt-3">
                            <span className='font-bold text-sm font-segoe text-[#424242]'>Pretensão da atividade</span>
                            <textarea placeholder="Pretensão do projeto" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                        </section>

                        <section className="mt-3">
                            <span className='font-bold text-sm font-segoe text-[#424242]'>Requisitios Técnicos</span>
                            <textarea placeholder="Requisitos técnicos para participar do projeto" className="border w-full text-zinc-800 border-zinc-400 rounded-sm p-2 focus:outline-none focus:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-500 transition-all" />
                        </section>
                    </div>
                    
                    <div className="mt-4 flex justify-center items-center">
                        <button className="bg-[#2ab646] p-2 px-4 text-white font-semibold rounded-md cursor-pointer hover:bg-green-600 "> Criar projeto </button>
                    </div>
                </section>
            </section>
        </>
    )
}

export default ProjectDetail