export default (atividadeService) => {
    return {
        async criarAtividade(req, res) {
            try {
                const novaAtividade = await atividadeService.criarAtividade(req.body);
                const dados = novaAtividade.toJSON();
                res.status(201).json(dados);
            } catch (erro) {
                res.status(400).json({erro : erro.message});
            }
        },

        async buscarAtividadePorId(req, res) {
            try {
                const atividade = await atividadeService.buscarAtividadePorId(req.params.id);
                const dados = atividade.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro : erro.message});
            }
        },

        async listarTodos(req, res) {
            try {
                const atividades = await atividadeService.listarTodos();
                const dados = atividades.map((a) => a.toJSON());
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro : erro.message});
            }
        },

        async listarTodosPorProjeto(req, res) {
            try {
                const atividades = await atividadeService.listarTodosPorProjeto(req.params.projetoId);
                const dados = atividades.map((a) => a.toJSON());
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro : erro.message});
            }
        },

        async atualizarAtividade(req, res) {
            try {
                const atividade = await atividadeService.atualizarAtividade(req.params.id, req.body);
                const dados = atividade.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro : erro.message});
            }
        },

        async desativarAtividade(req, res) {
            try {
                const atividade = await atividadeService.desativarAtividade(req.params.id);
                const dados = atividade.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro : erro.message});
            }
        },

        async ativarAtividade(req, res) {
            try {
                const atividade = await atividadeService.ativarAtividade(req.params.id);
                const dados = atividade.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro : erro.message});
            }
        }
    }
}