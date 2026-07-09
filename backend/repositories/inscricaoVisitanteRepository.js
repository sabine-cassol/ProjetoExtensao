import { Visitante, Projeto_extensao } from '../models/index.js';

export default (Inscricao_visitante) => {
    return {
        async criarInscricao(dados) {
            return Inscricao_visitante.create(dados);
        },

        async listarVisitantesPorProjeto(projetoId) {
            return Inscricao_visitante.findAll({
                where: { projetoId },
                include:[ 
                    {model: Visitante,
                    attributes: ['nome']},
                    {model: Projeto_extensao,
                    attributes: ['titulo']}
                ]
            });
        },

        async listarInscricoesPorVisitante(visitanteId) {
            return Inscricao_visitante.findAll({
                where: { visitanteId },
                include:[ 
                    {model: Visitante,
                    attributes: ['nome']},
                    {model: Projeto_extensao,
                    attributes: ['titulo']}
                ]
            });
        },

        async buscarInscricao(visitanteId, projetoId) {  
            return Inscricao_visitante.findOne({
                where: { visitanteId, projetoId }
            });
        }
    }
}