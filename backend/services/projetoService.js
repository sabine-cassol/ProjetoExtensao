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
        async deletarProjeto(id) {
            const resultado = await projetoRepository.deletar(id);
            if (!resultado) {
                throw new Error("Projeto de extensão não encontrado");
            }
            return true;
        } 
    }
}