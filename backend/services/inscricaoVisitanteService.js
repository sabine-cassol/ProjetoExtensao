export default (incricaoVisitanteRepository) => {
    return {
        async criarInscricao(dados) {
            const {visitanteId, projetoId} = dados;
            dados.dataCadastro = new Date();
            const inscricaoExistente = await incricaoVisitanteRepository.buscarInscricao(visitanteId, projetoId);
            if (inscricaoExistente) {
                throw new Error("Visitante já inscrito nesse projeto");
            }
            return incricaoVisitanteRepository.criarInscricao(dados);
        },
        async listarVisitantesPorProjeto(projetoId) {
            return incricaoVisitanteRepository.listarVisitantesPorProjeto(projetoId);
        },
        async listarInscricoesPorVisitante(visitanteId) {
            return incricaoVisitanteRepository.listarInscricoesPorVisitante(visitanteId);
        }
    }
}   