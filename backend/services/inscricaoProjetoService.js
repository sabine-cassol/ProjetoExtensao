export default (inscricaoProjetoRepository) => {
    return {
        async criarInscricao(dados) {
            const {alunoId, projetoId} = dados;
            dados.dataCadastro = new Date().now();
            const inscricaoExistente = await inscricaoProjetoRepository.buscarIncricao(alunoId, projetoId);
            if (inscricaoExistente) {
                throw new Error("Aluno já inscrito nesse projeto");
            }
            return inscricaoProjetoRepository.criarInscricao(dados);
        },
        async listarAlunosPorProjeto(projetoId) {
            return inscricaoProjetoRepository.listarAlunosPorProjeto(projetoId);
        },
        async listarInscricoesPorAluno(alunoId) {
            return inscricaoProjetoRepository.listarInscricoesPorAluno(alunoId);
        }
    }
}
