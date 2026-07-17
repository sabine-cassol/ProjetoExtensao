export default (atividadeRepository, projetoRepository) => {
    return {
        async criarAtividade(dados, professorLogadoId) {
            const projeto = await projetoRepository.buscarPorId(dados.projetoId);
            if (!projeto) {
                throw new Error("Projeto não encontrado");
            }
            if (projeto.professorId !== professorLogadoId) {
                throw new Error("Você não tem permissão para criar atividades neste projeto");
            }
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

        async listarTodosPorProjeto(projetoId, professorLogadoId) {
            const atividades = await atividadeRepository.listarTodosPorProjeto(projetoId);

            const projeto = await projetoRepository.buscarPorId(projetoId);
            const ehResponsavel = projeto && professorLogadoId && projeto.professorId === professorLogadoId;

            if (ehResponsavel) {
                return atividades; 
            }

            return atividades.filter((a) => a.ativo); 
        },

        async atualizarAtividade(id, dados, professorLogadoId) {
            const atividade = await atividadeRepository.buscarPorId(id);
            if (!atividade) {
                throw new Error("Atividade não encontrada");
            }

            const projeto = await projetoRepository.buscarPorId(atividade.projetoId);
            if (!projeto || projeto.professorId !== professorLogadoId) {
                throw new Error("Você não tem permissão para editar esta atividade");
            }

            return atividadeRepository.atualizarAtividade(id, dados);
        },

        async desativarAtividade(id, professorLogadoId) {
            const atividade = await atividadeRepository.buscarPorId(id);
            if (!atividade) {
                throw new Error("Atividade não encontrada");
            }

            const projeto = await projetoRepository.buscarPorId(atividade.projetoId);
            if (!projeto || projeto.professorId !== professorLogadoId) {
                throw new Error("Você não tem permissão para desativar esta atividade");
            }

            return atividadeRepository.atualizarAtividade(id, { ativo: false });
        },

        async ativarAtividade(id, professorLogadoId) {
            const atividade = await atividadeRepository.buscarPorId(id);
            if (!atividade) {
                throw new Error("Atividade não encontrada");
            }

            const projeto = await projetoRepository.buscarPorId(atividade.projetoId);
            if (!projeto || projeto.professorId !== professorLogadoId) {
                throw new Error("Você não tem permissão para ativar esta atividade");
            }

            return atividadeRepository.atualizarAtividade(id, { ativo: true });
        }
    }
}