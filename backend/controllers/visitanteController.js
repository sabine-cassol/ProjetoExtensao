export default (visitanteService) => {
    return {
        async cadastrarVisitante(req, res) {
            try {
                const visitante = await visitanteService.cadastrarVisitante(req.body);
                res.status(201).json(visitante);
            } catch (erro) {
                res.status(400).json({erro : erro.message});
            }
        },

        async acessoDeVisitante(req, res) {
            try {
                const { visitante, token } = await visitanteService.acessarPorTelefone(req.body.telefone);
                const dados = visitante.toJSON();
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax",
                    maxAge: 8 * 60 * 60 * 1000 //8 horas em milissegundos
                });

                res.status(200).json({tipo: "visitante", visitante: dados});
            } catch (erro) {
                res.status(401).json({erro : erro.message});
            }
        },

        async buscarPorId(req, res) {
            try {
                const visitante = await visitanteService.buscarPorId(req.params.id);
                const dados = visitante.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message});
            }
        },

        async buscarPerfil(req, res) {
            try {
                const visitante = await visitanteService.buscarPorId(req.usuario.id);
                const dados = visitante.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message})
            }
        },

        async buscarTodos(req, res) {
            try {
                const visitantes = await visitanteService.listarTodos();
                const dados = visitantes.map((v) => v.toJSON());
                res.status(200).json(dados);
            } catch (erro) {
                res.status(500).json({erro: erro.message});
            }
        },

        async atualizarVisitante(req, res) {
            try {
                const visitanteAtualizado = await visitanteService.atualizar(req.params.id, req.body);
                const dados = visitanteAtualizado.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message});
            }
        },

        async desativarVisitantePorId(req, res) {
            try {
                const visitanteDesativado = await visitanteService.desativarVisitante(req.params.id);
                const dados = visitanteDesativado.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message});
            }
        },

        async ativarVisitantePorId(req, res) {
            try {
                const visitanteAtivado = await visitanteService.ativarVisitante(req.params.id);
                const dados = visitanteAtivado.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message});
            }
        }
    }
}