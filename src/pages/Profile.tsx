
function Profile() {
    const aluno_1 = {
        Nome: 'Eduardo',
        RA: '1234567-8'
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
                        <div className="flex flex-col p-4 gap-1.5">
                            <div>
                                <label htmlFor="username" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">Nome Completo</label>
                                <input id="username " type="text" value={aluno_1.Nome} readOnly className="border w-full mt-2 text-zinc-800 border-zinc-400 bg-[#212529]/10 font-medium rounded-sm p-2 focus:outline-none select-none cursor-default" />
                            </div>
                            <div>
                                <label htmlFor="RA" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">Ra</label>
                                <input type="text" value={aluno_1.RA} readOnly className="border w-full mt-2 text-zinc-800 border-zinc-400 bg-[#212529]/10 font-medium rounded-sm p-2 focus:outline-none select-none cursor-default" />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button className="bg-indigo-600 p-2 rounded-md text-white font-semibold cursor-pointer hover:bg-indigo-800">
                                Editar informações
                            </button>
                        </div>
                        <div className="flex flex-col p-4 gap-1.5">
                            <form>

                                <div>
                                    <label htmlFor="username" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">Digite a senha nova</label>
                                    <input id="username " required type="text" className="border w-full mt-2  text-zinc-800 border-zinc-400 font-medium rounded-sm p-2 focus:outline-none " />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="RA" className="font-segoe text-sm font-medium text-zinc-700 flex items-center gap-2">Confirme a senha nova</label>
                                    <input type="text" required className="border w-full mt-2 text-zinc-800 border-zinc-400 font-medium rounded-sm p-2 focus:outline-none " />
                                </div>
                                <div className='flex justify-center mt-4'>
                                    <button type='submit' className="p-2 rounded-md text-white font-semibold cursor-pointer bg-[#2ab646] hover:bg-green-600">
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