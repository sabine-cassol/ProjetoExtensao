export default (inscricaoVisitanteService) => {
    return {
        async criarInscricao(req, res) {
            try {
                const dadosEntrada = { visitanteId: req.usuario.id, projetoId: req.params.projetoId };
                const inscricaoCriada = await inscricaoVisitanteService.criarInscricao(dadosEntrada);
                const dados = inscricaoCriada.toJSON();
                res.status(201).json(dados);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },

        async listarVisitantesPorProjeto(req, res) {
            try {
                const visitantes = await inscricaoVisitanteService
                            .listarVisitantesPorProjeto(req.params.projetoId);
                const dados = visitantes.map((v) => v.toJSON());
                res.status(200).json(dados);
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        },

        async listarMinhasInscricoes(req, res) {
            try {
                const inscricoes = await inscricaoVisitanteService
                            .listarInscricoesPorVisitante(req.usuario.id);
                const dados = inscricoes.map((i) => i.toJSON());
                res.status(200).json(dados);
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        },

        async listarInscricoesPorVisitante(req, res) {
            try {
                const inscricoes = await inscricaoVisitanteService
                            .listarInscricoesPorVisitante(req.params.visitanteId);
                const dados = inscricoes.map((i) => i.toJSON());
                res.status(200).json(dados);
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        }
    }
}