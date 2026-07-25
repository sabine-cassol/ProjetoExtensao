import { Atividade, Projeto_extensao, Aluno } from '../models/index.js';

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
                },
                include: [
                    {
                        model: Atividade,
                        as: "atividade",
                        attributes: ['titulo', 'data', 'projetoId'],
                        include: [
                            {
                                model: Projeto_extensao,
                                as: "projeto",
                                attributes: ['titulo']
                            }
                        ]
                    }
                ],
                order: [['dataHoraCheckIn', 'DESC']]
            });
        },
        async atualizarPresenca(id, novoPresenca) {
            const presenca = await Presenca.findByPk(id);
            if (!presenca) return null;
            await presenca.update(novoPresenca);
            return presenca;
        },
        async listarPresencasPorAlunoEProjeto(alunoId, projetoId) {
            return Presenca.findAll({
                where: {
                    alunoId: alunoId
                },
                include: [
                    {
                        model: Atividade,
                        as: "atividade",
                        where: { projetoId: projetoId },
                        attributes: []
                    }
                ]
            });
        },
        async listarPorProfessor(professorId) {
            return Presenca.findAll({
                include: [
                    {
                        model: Atividade,
                        as: "atividade",
                        attributes: ['titulo', 'data', 'projetoId'],
                        include: [
                            {
                                model: Projeto_extensao,
                                as: "projeto",
                                where: { professorId },
                                attributes: ['titulo']
                            }
                        ]
                    },
                    {
                        model: Aluno,
                        as: "aluno",
                        attributes: ['nome', 'ra', 'curso', 'periodo']
                    }
                ],
                order: [['dataHoraCheckIn', 'DESC']]
            });
        },

        // presencaRepository.js
        async listarPorProfessorEProjeto(professorId, projetoId) {
            return Presenca.findAll({
                include: [
                    {
                        model: Atividade,
                        as: "atividade",
                        attributes: ['titulo', 'data', 'projetoId'],
                        where: projetoId ? { projetoId } : undefined,
                        include: [
                            {
                                model: Projeto_extensao,
                                as: "projeto",
                                where: { professorId },
                                attributes: ['titulo']
                            }
                        ]
                    },
                    {
                        model: Aluno,
                        as: "aluno",
                        attributes: ['nome', 'ra', 'curso', 'periodo']
                    }
                ],
                order: [['dataHoraCheckIn', 'DESC']]
            });
        },
        async atualizarStatus(id, status) {
            const presenca = await Presenca.findByPk(id);
            if (!presenca) return null;
            await presenca.update({ status });
            return presenca;
        }
    }
}