export default (Inscricao_projeto) => {
    return {
        async criarInscricao(dados) {
            return Inscricao_projeto.create(dados);
        },