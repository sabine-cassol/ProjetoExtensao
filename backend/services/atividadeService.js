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
        async desativarAtividade(id) {
            const atividadeDesativada = await atividadeRepository.buscarPorId(id);
            if (!atividadeDesativada) {
                throw new Error("Atividade não encontrada");
            }
            atividadeDesativada.ativo = false;
            return atividadeRepository.atualizarAtividade(id, atividadeDesativada);
        },
        async ativarAtividade(id) {
            const atividadeAtivada = await atividadeRepository.buscarPorId(id);
            if (!atividadeAtivada) {
                throw new Error("Atividade não encontrada");
            }
            atividadeAtivada.ativo = true;
            return atividadeRepository.atualizarAtividade(id, atividadeAtivada);
        }
    }
}