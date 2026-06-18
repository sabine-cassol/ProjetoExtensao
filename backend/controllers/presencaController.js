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
        }
    }
}