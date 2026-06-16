export default (projetoRepository) => {
    return {
        async criarProjeto(dados) {
            return projetoRepository.criarProjeto(dados);
        },
        async buscarProjetoPorId(id) {
            const projeto = await projetoRepository.buscarPorId(id);
            if (!projeto) {
                throw new Error("Projeto de extensão não encontrado");
            }
            return projeto;
        },
        async listarTodos() {
            return projetoRepository.listarTodos();
        },
        async listarTodosPorProfessor(professorId) { 
            return projetoRepository.listarTodosPorProfessor(professorId);
        },
        async atualizarProjeto(id, dados) {
            const projeto = await projetoRepository.buscarPorId(id);
            if (!projeto) {
                throw new Error("Projeto de extensão não encontrado");
            }
            return projeto; 
        },
        async desativarProjeto(id) {
            const projetoDesativado = await projetoRepository.buscarPorId(id);
            if (!projetoDesativado) {
                throw new Error("Projeto de extensão não encontrado");
            }
            projetoDesativado.ativo = false;
            await projetoDesativado.save();
            return projetoDesativado;
        },
        async ativarProjeto(id) {
            const projetoAtivado = await projetoRepository.buscarPorId(id);
            if (!projetoAtivado) {
                throw new Error("Projeto de extensão não encontrado");
            }
            projetoAtivado.ativo = true;
            await projetoAtivado.save();
            return projetoAtivado;
        }
    }
}