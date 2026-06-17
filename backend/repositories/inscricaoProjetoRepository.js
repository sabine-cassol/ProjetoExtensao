import {Aluno, Projeto_extensao} from '../models/index.js';

export default (Inscricao_projeto) => {
    return {
        async criarInscricao(dados) {
            return Inscricao_projeto.create(dados);
        },

        async listarAlunosPorProjeto(projetoId) {
            return Inscricao_projeto.findAll({
                where: { projetoId },
                include:[ 
                    {model: Aluno,
                    attributes: ['nome', 'email', 'matricula', 'curso']},
                    {model: Projeto_extensao,
                    attributes: ['titulo']}
                ]
            });
        },

        async listarInscricoesPorAluno(alunoId) {
            return Inscricao_projeto.findAll({
                where: { alunoId },
                include:[ 
                    {model: Aluno,
                    attributes: ['nome', 'email', 'matricula', 'curso']},
                    {model: Projeto_extensao,
                    attributes: ['titulo']}
                ]
            });
        },
        
        async buscarIncricao(alunoId, projetoId) {  
            return Inscricao_projeto.findOne({
                where: { alunoId, projetoId }
            });
        }
    }
}