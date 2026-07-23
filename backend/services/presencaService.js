import { calcularDistanciaMetros } from '../utils/geolocalizacao.js';

export default (presencaRepository, atividadeRepository, inscricaoRepository, alunoRepository, projetoRepository) => {
    return {

        async registrarCheckIn(alunoId, dados) {
            const atividade = await atividadeRepository.buscarPorId(dados.atividadeId);
            if (atividade === null) {
                throw new Error("Atividade não encontrada");
            }

            const dataAtividade = atividade.data;
            const agora = new Date();
            const ano = agora.getFullYear();
            const mes = String(agora.getMonth() + 1).padStart(2, '0');
            const dia = String(agora.getDate()).padStart(2, '0');
            const hoje = `${ano}-${mes}-${dia}`;

            if (dataAtividade !== hoje) {
                throw new Error("Check-in só pode ser feito na data da atividade");
            }

            if (atividade.exigeLocalizacao) {
                if (!dados.latitude || !dados.longitude) {
                    throw new Error("Esta atividade exige localização para o check-in");
                }

                if (atividade.latitude && atividade.longitude) {
                    const distancia = calcularDistanciaMetros(
                        Number(atividade.latitude),
                        Number(atividade.longitude),
                        Number(dados.latitude),
                        Number(dados.longitude)
                    );

                    const raioPermitido = atividade.raioMetros || 100;

                    if (distancia > raioPermitido) {
                        throw new Error(
                            `Você está fora do local do encontro (distância: ${Math.round(distancia)}m, permitido: ${raioPermitido}m)`
                        );
                    }
                }
            }

            if (await inscricaoRepository.buscarInscricao(alunoId, atividade.projetoId) === null) {
                throw new Error("Aluno não inscrito no projeto");
            }
            if (await presencaRepository.buscarPresencaSemCheckOut(alunoId, dados.atividadeId) !== null) {
                throw new Error("Check-in já registrado para esta atividade");
            }

            return presencaRepository.criarCheckIn({
                alunoId,
                atividadeId: dados.atividadeId,
                localizacaoCheckIn: atividade.exigeLocalizacao
                    ? `${dados.latitude},${dados.longitude}`
                    : null,
                dataHoraCheckIn: new Date()
            });
        },

        async registrarCheckOut(alunoId, dados) {
            const presenca = await presencaRepository.buscarPresencaSemCheckOut(alunoId, dados.atividadeId);
            if (presenca === null) {
                throw new Error("Check-in não encontrado");
            }

            presenca.dataHoraCheckOut = new Date();

            const horasExtensao = Math.floor((presenca.dataHoraCheckOut - presenca.dataHoraCheckIn) / (1000 * 60 * 60));
            const aluno = await alunoRepository.buscarPorId(alunoId);
            aluno.horasExtensao += horasExtensao;
            await alunoRepository.atualizarAluno(aluno.id, { horasExtensao: aluno.horasExtensao });

            return presencaRepository.atualizarPresenca(presenca.id, {
                dataHoraCheckOut: presenca.dataHoraCheckOut,
                localizacaoCheckOut: null
            });
        },

        async getHorasExtensaoPorProjeto(alunoId, projetoId) {
            const presencas = await presencaRepository.listarPresencasPorAlunoEProjeto(alunoId, projetoId);
            let totalHoras = 0;
            for (const presenca of presencas) {
                if (presenca.dataHoraCheckOut && presenca.dataHoraCheckIn) {
                    const horas = Math.floor((presenca.dataHoraCheckOut - presenca.dataHoraCheckIn) / (1000 * 60 * 60));
                    totalHoras += horas;
                }
            }
            return totalHoras;
        },

        async listarPresencasPorAluno(alunoId) {
            return presencaRepository.listarTodasPorAluno(alunoId);
        },

        async listarPorProfessor(professorId) {
            return presencaRepository.listarPorProfessor(professorId);
        },

        async aprovarPresenca(id, professorLogadoId) {
            const presenca = await presencaRepository.buscarPorId(id);
            if (!presenca) {
                throw new Error("Presença não encontrada");
            }

            const atividade = await atividadeRepository.buscarPorId(presenca.atividadeId);
            if (!atividade) {
                throw new Error("Atividade não encontrada");
            }

            const projeto = await projetoRepository.buscarPorId(atividade.projetoId);
            if (!projeto || projeto.professorId !== professorLogadoId) {
                throw new Error("Você não tem permissão para gerenciar esta presença");
            }

            return presencaRepository.atualizarStatus(id, 'aprovado');
        },

        async recusarPresenca(id, professorLogadoId) {
            const presenca = await presencaRepository.buscarPorId(id);
            if (!presenca) {
                throw new Error("Presença não encontrada");
            }

            const atividade = await atividadeRepository.buscarPorId(presenca.atividadeId);
            if (!atividade) {
                throw new Error("Atividade não encontrada");
            }

            const projeto = await projetoRepository.buscarPorId(atividade.projetoId);
            if (!projeto || projeto.professorId !== professorLogadoId) {
                throw new Error("Você não tem permissão para gerenciar esta presença");
            }

            return presencaRepository.atualizarStatus(id, 'recusado');
        }
    }
}