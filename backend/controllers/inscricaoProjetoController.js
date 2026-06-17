export default (inscricaoProjetoService) => {
    return {
        async criarInscricao(req, res) {
            try {
                const dadosEntrada = { alunoId: req.usuario.id, projetoId: req.params.projetoId };
                const inscricao = await inscricaoProjetoService.criarInscricao(dadosEntrada);
                const dados = inscricao.toJSON();
                res.status(201).json(dados);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },

        async listarAlunosPorProjeto(req, res) {
            try {
                const alunos = await inscricaoProjetoService.listarAlunosPorProjeto(req.params.projetoId);
                const dados = alunos.map((a) => a.toJSON());
                res.status(200).json(dados);
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        },
        async listarMinhasInscricoes(req, res) {
            try {
                const inscricoes = await inscricaoProjetoService.listarInscricoesPorAluno(req.usuario.id);
                const dados = inscricoes.map((i) => i.toJSON());
                res.status(200).json(dados);
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        },

        async listarInscricoesPorAluno(req, res) {
            try {
                const inscricoes = await inscricaoProjetoService.listarInscricoesPorAluno(req.params.alunoId);
                const dados = inscricoes.map((i) => i.toJSON());
                res.status(200).json(dados);
            } catch (error) {
                res.status(404).json({ error: error.message });
            }
        }
    }
}