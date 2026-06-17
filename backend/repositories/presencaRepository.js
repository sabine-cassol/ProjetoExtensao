export default (Presenca) => {
    return {
        async criarCheckIn(dados) {
            return Presenca.create(dados);
        },
        async buscarPresencaSemCheckOut(alunoId, atividadeId) {
            return Presenca.findOne({
                where: {
                    alunoId: alunoId,
                    atividadeId: atividadeId,
                    dataHoraCheckOut: null
                }
            });
        },
        async buscarPorId(id) {
            return Presenca.findByPk(id);
        },
        async listarTodasPorAluno(alunoId) {
            return Presenca.findAll({
                where: {
                    alunoId: alunoId
                }
            });
        },
        async atualizarPresenca(id, novoPresenca) {
            const presenca = await Presenca.findByPk(id);
            if (!presenca) return null;
            await presenca.update(novoPresenca);
            return presenca;
        }
    }
}