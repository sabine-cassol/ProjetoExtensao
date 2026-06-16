export default (atividadeRepository) => {
    return {
        async criarAtividade(dados) {
            return atividadeRepository.criarAtividade(dados);
        },
        async buscarAtividadePorId(id) {
            const atividade = await atividadeRepository.buscarPorId(id);
            if (!atividade) {
                throw new Error("Atividade não encontrada");
            }
            return atividade;
        },
        async listarTodos() {
            return atividadeRepository.listarTodos();
        },
        async listarTodosPorProjeto(projetoId) { 
            return atividadeRepository.listarTodosPorProjeto(projetoId);
        },
        async atualizarAtividade(id, dados) {
            const atividade = await atividadeRepository.atualizarAtividade(id, dados);
            if (!atividade) {
                throw new Error("Atividade não encontrada");
            }
            return atividade; 
        },
        async deletarAtividade(id) {
            const resultado = await atividadeRepository.deletar(id);
            if (!resultado) {
                throw new Error("Atividade não encontrada");
            }
            return true;
        } 
    }
}