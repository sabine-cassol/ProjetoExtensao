export default (atividadeRepository, projetoRepository) => {
    return {
        async criarAtividade(dados, professorLogadoId, isAdmin) {
            const projeto = await projetoRepository.buscarPorId(dados.projetoId);
            if (!projeto) {
                throw new Error("Projeto não encontrado");
            }
            if (projeto.professorId !== professorLogadoId && !isAdmin) {
                throw new Error("Você não tem permissão para criar atividades neste projeto");
            }

            if (!projeto.periodoExecucaoInicio || !projeto.periodoExecucaoFim) {
                throw new Error("Este projeto não tem período de execução definido");
            }

            if (dados.data < projeto.periodoExecucaoInicio || dados.data > projeto.periodoExecucaoFim) {
                throw new Error(
                    `A data da atividade deve estar dentro do período de execução do projeto (${formatarDataBR(projeto.periodoExecucaoInicio)} a ${formatarDataBR(projeto.periodoExecucaoFim)})`
                );
            }

            const atividadesExistentes = await atividadeRepository.listarTodosPorProjeto(dados.projetoId);
            const jaExisteNessaData = atividadesExistentes.some(
                (a) => a.ativo && a.data === dados.data
            );

            if (jaExisteNessaData) {
                throw new Error("Já existe uma atividade cadastrada nesta data para este projeto");
            }

            const cargaHorariaAtual = atividadesExistentes
                .filter((a) => a.ativo)
                .reduce((total, a) => total + Number(a.cargaHoraria), 0);

            const novaCargaTotal = cargaHorariaAtual + Number(dados.cargaHoraria);

            if (novaCargaTotal > Number(projeto.cargaHoraria)) {
                throw new Error(
                    `A carga horária total das atividades (${novaCargaTotal}h) ultrapassaria a carga horária do projeto (${projeto.cargaHoraria}h)`
                );
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

        async atualizarAtividade(id, dados, professorLogadoId, isAdmin) {
            const atividade = await atividadeRepository.buscarPorId(id);
            if (!atividade) {
                throw new Error("Atividade não encontrada");
            }

            const projeto = await projetoRepository.buscarPorId(atividade.projetoId);
            if (!projeto || (projeto.professorId !== professorLogadoId && !isAdmin)) {
                throw new Error("Você não tem permissão para editar esta atividade");
            }

            if (dados.data !== undefined && dados.data !== atividade.data) {
                if (dados.data < projeto.periodoExecucaoInicio || dados.data > projeto.periodoExecucaoFim) {
                    throw new Error(
                        `A data da atividade deve estar dentro do período de execução do projeto (${formatarDataBR(projeto.periodoExecucaoInicio)} a ${formatarDataBR(projeto.periodoExecucaoFim)})`
                    );
                }

                const atividadesExistentes = await atividadeRepository.listarTodosPorProjeto(atividade.projetoId);
                const jaExisteNessaData = atividadesExistentes.some(
                    (a) => a.ativo && a.id !== id && a.data === dados.data
                );

                if (jaExisteNessaData) {
                    throw new Error("Já existe uma atividade cadastrada nesta data para este projeto");
                }
            }

            if (dados.cargaHoraria !== undefined) {
                const atividadesExistentes = await atividadeRepository.listarTodosPorProjeto(atividade.projetoId);
                const cargaHorariaOutras = atividadesExistentes
                    .filter((a) => a.ativo && a.id !== id)
                    .reduce((total, a) => total + Number(a.cargaHoraria), 0);

                const novaCargaTotal = cargaHorariaOutras + Number(dados.cargaHoraria);

                if (novaCargaTotal > Number(projeto.cargaHoraria)) {
                    throw new Error(
                        `A carga horária total das atividades (${novaCargaTotal}h) ultrapassaria a carga horária do projeto (${projeto.cargaHoraria}h)`
                    );
                }
            }

            return atividadeRepository.atualizarAtividade(id, dados);
        },

        async desativarAtividade(id, professorLogadoId, isAdmin) {
            const atividade = await atividadeRepository.buscarPorId(id);
            if (!atividade) {
                throw new Error("Atividade não encontrada");
            }
            const projeto = await projetoRepository.buscarPorId(atividade.projetoId);
            if (!projeto || projeto.professorId !== professorLogadoId && !isAdmin) {
                throw new Error("Você não tem permissão para desativar esta atividade");
            }
            return atividadeRepository.atualizarAtividade(id, { ativo: false });
        },

        async ativarAtividade(id, professorLogadoId, isAdmin) {
            const atividade = await atividadeRepository.buscarPorId(id);
            if (!atividade) {
                throw new Error("Atividade não encontrada");
            }
            const projeto = await projetoRepository.buscarPorId(atividade.projetoId);
            if (!projeto || projeto.professorId !== professorLogadoId && !isAdmin) {
                throw new Error("Você não tem permissão para ativar esta atividade");
            }

            const atividadesExistentes = await atividadeRepository.listarTodosPorProjeto(atividade.projetoId);
            const jaExisteNessaData = atividadesExistentes.some(
                (a) => a.ativo && a.id !== id && a.data === atividade.data
            );

            if (jaExisteNessaData) {
                throw new Error("Não é possível reativar: já existe outra atividade ativa nesta data");
            }

            const cargaHorariaOutras = atividadesExistentes
                .filter((a) => a.ativo && a.id !== id)
                .reduce((total, a) => total + Number(a.cargaHoraria), 0);

            const novaCargaTotal = cargaHorariaOutras + Number(atividade.cargaHoraria);

            if (novaCargaTotal > Number(projeto.cargaHoraria)) {
                throw new Error(
                    `Não é possível reativar: a carga horária total (${novaCargaTotal}h) ultrapassaria a carga horária do projeto (${projeto.cargaHoraria}h)`
                );
            }

            return atividadeRepository.atualizarAtividade(id, { ativo: true });
        }
    }
}

function formatarDataBR(dataISO) {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}