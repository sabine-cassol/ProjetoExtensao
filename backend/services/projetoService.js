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
            const projeto = await projetoRepository.atualizarProjeto(id, dados);
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
            return projetoRepository.atualizarProjeto(id, projetoDesativado);
        },
        async ativarProjeto(id) {
            const projetoAtivado = await projetoRepository.buscarPorId(id);
            if (!projetoAtivado) {
                throw new Error("Projeto de extensão não encontrado");
            }
            projetoAtivado.ativo = true;
            return projetoRepository.atualizarProjeto(id, projetoAtivado);
        }
    }
}