export default (presencaService) => {
    return {
        async fazerCheckIn(req, res) {
            try {
                const presenca = await presencaService.registrarCheckIn(req.usuario.id, req.body);
                const dados = presenca.toJSON();
                res.status(201).json(dados);
            } catch (erro) {
                res.status(400).json({erro : erro.message});
            }
        },
        async fazerCheckOut(req, res) {
            try {
                const presenca = await presencaService.registrarCheckOut(req.usuario.id, req.body);
                const dados = presenca.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(400).json({erro : erro.message});
            }
        },
        async listarPresencasPorAluno(req, res) {
            try {
                const presencas = await presencaService.listarPresencasPorAluno(req.usuario.id);
                const dados = presencas.map((p) => p.toJSON());
                res.status(200).json(dados);
            } catch (erro) {
                res.status(400).json({erro : erro.message});
            }
        },
        async buscarTodasPresencasDoAluno(req, res) {
            try {
                const presencas = await presencaService.listarPresencasPorAluno(req.params.id);
                const dados = presencas.map((p) => p.toJSON());
                res.status(200).json(dados);
            } catch (erro) {
                res.status(400).json({erro : erro.message});
            }
        },
        async getHorasExtensaoPorProjeto(req, res) {
            try {
                const totalHoras = await presencaService.getHorasExtensaoPorProjeto(req.usuario.id, req.params.projetoId);
                res.status(200).json({ totalHoras });
            } catch (erro) {
                res.status(400).json({erro : erro.message});
            }
        },
        async listarPorProfessor(req, res) {
            try {
                const presencas = await presencaService.listarPorProfessor(req.usuario.id);
                const dados = presencas.map((p) => p.toJSON());
                res.status(200).json(dados);
            } catch (erro) {
                res.status(400).json({erro : erro.message});
            }
        },
        async aprovarPresenca(req, res) {
            try {
                const presenca = await presencaService.aprovarPresenca(req.params.id, req.usuario.id);
                res.status(200).json(presenca.toJSON());
            } catch (erro) {
                res.status(403).json({erro : erro.message});
            }
        },
        async recusarPresenca(req, res) {
            try {
                const presenca = await presencaService.recusarPresenca(req.params.id, req.usuario.id);
                res.status(200).json(presenca.toJSON());
            } catch (erro) {
                res.status(403).json({erro : erro.message});
            }
        }
    }
}