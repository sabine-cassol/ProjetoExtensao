export default (presencaRepository, atividadeRepository, inscricaoRepository, alunoRepository) => {
    return {
        async registrarCheckIn(alunoId, dados) {
            const atividade = await atividadeRepository.buscarPorId(dados.atividadeId);
            if (atividade === null) {
                throw new Error("Atividade não encontrada");
            }
            if (await inscricaoRepository.buscarInscricao(alunoId, atividade.projetoId) === null) {
                throw new Error("Aluno não inscrito no projeto");
            }
            if (await presencaRepository.buscarPresencaSemCheckOut(alunoId, dados.atividadeId) !== null) {
                throw new Error("Check-in já registrado para esta atividade");
            }
            dados.alunoId = alunoId;
            return presencaRepository.criarCheckIn(dados);
        },
        async registrarCheckOut(alunoId, dados) {
            const presenca = await presencaRepository.buscarPresencaSemCheckOut(alunoId, dados.atividadeId);
            if (presenca === null) {
                throw new Error("Check-in não encontrado");
            }
            presenca.dataHoraCheckOut = new Date();
            presenca.localizacaoCheckOut = dados.localizacaoCheckOut;

            const horasExtensao = Math.floor((presenca.dataHoraCheckOut - presenca.dataHoraCheckIn) / (1000 * 60 * 60));
            const aluno = await alunoRepository.buscarPorId(alunoId);
            aluno.horasExtensao += horasExtensao;
            await alunoRepository.atualizarAluno(aluno.id, { horasExtensao: aluno.horasExtensao });

            return presencaRepository.atualizarPresenca(presenca.id, {
                dataHoraCheckOut: presenca.dataHoraCheckOut,
                localizacaoCheckOut: presenca.localizacaoCheckOut
            });
        },
        async listarPresencasPorAluno(alunoId) {
            return presencaRepository.listarTodasPorAluno(alunoId);
        }
    }
}