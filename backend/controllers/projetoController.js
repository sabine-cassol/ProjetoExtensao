export default (projetoService) => {
    return {
        async criarProjeto(req, res) {
            try {
                const projeto = await projetoService.criarProjeto(req.body);
                const dados = projeto.toJSON();
                res.status(201).json(dados);
            } catch (erro) {
                res.status(400).json({erro : erro.message});
            }
        },

        async buscarProjetoPorId(req, res) {
            try {
                const projeto = await projetoService.buscarProjetoPorId(req.params.id);
                const dados = projeto.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro : erro.message});
            }
        },

        async listarTodos(req, res) {
            try {
                const projetos = await projetoService.listarTodos();
                const dados = projetos.map((p) => p.toJSON());
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro : erro.message});
            }
        },

        async listarTodosPorProfessor(req, res) {
            try {
                const projetos = await projetoService.listarTodosPorProfessor(req.params.professorId);
                const dados = projetos.map((p) => p.toJSON());
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro : erro.message});
            }
        },

        async atualizarProjeto(req, res) {
            try {
                const projeto = await projetoService.atualizarProjeto(req.params.id, req.body);
                const dados = projeto.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro : erro.message});
            }
        },

        async deletarProjeto(req, res) {
            try {
                await projetoService.deletarProjeto(req.params.id);
                res.status(200).json({ mensagem: "Projeto de extensão deletado com sucesso"});
            } catch (erro) {
                res.status(404).json({erro : erro.message});
            }
        }
    }
}