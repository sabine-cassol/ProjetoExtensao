export default (atividadeService) => {
    return {
        async criarAtividade(req, res) {
            try {
                const novaAtividade = await atividadeService.criarAtividade(req.body, req.usuario.id, req.usuario.isAdmin);
                res.status(201).json(novaAtividade.toJSON());
            } catch (erro) {
                res.status(403).json({ erro: erro.message });
            }
        },
        async buscarAtividadePorId(req, res) {
            try {
                const atividade = await atividadeService.buscarAtividadePorId(req.params.id);
                const dados = atividade.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({ erro: erro.message });
            }
        },

        async listarTodos(req, res) {
            try {
                const atividades = await atividadeService.listarTodos();
                const dados = atividades.map((a) => a.toJSON());
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({ erro: erro.message });
            }
        },

        async listarTodosPorProjeto(req, res) {
            try {
                const atividades = await atividadeService.listarTodosPorProjeto(req.params.projetoId, req.usuario?.id);
                const dados = atividades.map((a) => a.toJSON());
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({ erro: erro.message });
            }
        },

        async atualizarAtividade(req, res) {
            try {
                const atividade = await atividadeService.atualizarAtividade(req.params.id, req.body, req.usuario.id, req.usuario.isAdmin);
                const dados = atividade.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({ erro: erro.message });
            }
        },

        async desativarAtividade(req, res) {
            try {
                const atividade = await atividadeService.desativarAtividade(req.params.id, req.usuario.id, req.usuario.isAdmin);
                const dados = atividade.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({ erro: erro.message });
            }
        },

        async ativarAtividade(req, res) {
            try {
                const atividade = await atividadeService.ativarAtividade(req.params.id, req.usuario.id, req.usuario.isAdmin);
                const dados = atividade.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({ erro: erro.message });
            }
        }
    }
}