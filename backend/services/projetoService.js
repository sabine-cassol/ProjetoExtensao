export default (projetoRepository) => {
    return {
        async criarProjeto(dados, professorLogadoId) {
            validarPeriodos(dados);

            return projetoRepository.criarProjeto({
                ...dados,
                professorId: professorLogadoId
            });
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
        async atualizarProjeto(id, dados, professorLogadoId) {
            const projeto = await projetoRepository.atualizarProjeto(id, dados);
            if (!projeto) {
                throw new Error("Projeto de extensão não encontrado");
            }
            if (projeto.professorId !== professorLogadoId) {
                throw new Error("Você não tem permissão para editar este projeto");
            }

            validarPeriodos({ ...projeto.toJSON(), ...dados });

            const projetoAtualizado = await projetoRepository.atualizarProjeto(id, dados);
            return projetoAtualizado;
        },
        async desativarProjeto(id, professorLogadoId) {
            const projeto = await projetoRepository.buscarPorId(id);
            if (!projeto) {
                throw new Error("Projeto de extensão não encontrado");
            }
            if (projeto.professorId !== professorLogadoId) {
                throw new Error("Você não tem permissão para desativar este projeto");
            }
            return projetoRepository.atualizarProjeto(id, { ativo: false });
        },
        async ativarProjeto(id, professorLogadoId) {
            const projeto = await projetoRepository.buscarPorId(id);
            if (!projeto) {
                throw new Error("Projeto de extensão não encontrado");
            }
            if (projeto.professorId !== professorLogadoId) {
                throw new Error("Você não tem permissão para ativar este projeto");
            }
            return projetoRepository.atualizarProjeto(id, { ativo: true });
        }
    }
}

function validarPeriodos(dados) {
    if (dados.periodoInscricaoInicio && dados.periodoInscricaoFim) {
        if (dados.periodoInscricaoInicio > dados.periodoInscricaoFim) {
            throw new Error("A data de início da inscrição não pode ser depois da data de fim");
        }
    }

    if (dados.periodoExecucaoInicio && dados.periodoExecucaoFim) {
        if (dados.periodoExecucaoInicio > dados.periodoExecucaoFim) {
            throw new Error("A data de início da execução não pode ser depois da data de fim");
        }
    }
}