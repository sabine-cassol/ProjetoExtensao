import { Aluno, Projeto_extensao, Professor } from '../models/index.js';

export default (Inscricao_projeto) => {
    return {
        async criarInscricao(dados) {
            return Inscricao_projeto.create(dados);
        },

        async listarAlunosPorProjeto(projetoId) {
            return Inscricao_projeto.findAll({
                where: { projetoId },
                include: [
                    { model: Aluno, as: "aluno", attributes: ['nome', 'email', 'ra', 'curso'] },
                    { model: Projeto_extensao, as: "projeto", attributes: ['titulo'] }
                ]
            });
        },

        async listarInscricoesPorAluno(alunoId) {
            return Inscricao_projeto.findAll({
                where: { alunoId },
                include: [
                    { model: Aluno, as: "aluno", attributes: ['nome', 'email', 'ra', 'curso'] },
                    {
                        model: Projeto_extensao,
                        as: "projeto",
                        include: [
                            { model: Professor, as: "professor", attributes: ['nome'] }
                        ]
                    }
                ]
            });
        },


        async buscarInscricao(alunoId, projetoId) {
            return Inscricao_projeto.findOne({
                where: { alunoId, projetoId }
            });
        }
    }
}