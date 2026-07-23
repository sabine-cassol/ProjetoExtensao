import { Aluno, Projeto_extensao, Professor } from '../models/index.js';

export default (Inscricao_projeto,projetoRepository) => {
    return {
        async criarInscricao(dados) {
            const {alunoId, projetoId} = dados;
            dados.dataCadastro = new Date();

            const projeto = await projetoRepository.buscarPorId(projetoId);
            if (!projeto) {
                throw new Error("Projeto não encontrado");
            }

            if (!projeto.periodoInscricaoInicio || !projeto.periodoInscricaoFim) {
                throw new Error("Este projeto não tem período de inscrição definido");
            }

            const hoje = obterDataLocalHoje();

            if (hoje < projeto.periodoInscricaoInicio) {
                throw new Error(
                    `As inscrições ainda não abriram. Início: ${formatarDataBR(projeto.periodoInscricaoInicio)}`
                );
            }

            if (hoje > projeto.periodoInscricaoFim) {
                throw new Error(
                    `O período de inscrições já encerrou. Encerrou em: ${formatarDataBR(projeto.periodoInscricaoFim)}`
                );
            }

            const inscricaoExistente = await inscricaoProjetoRepository.buscarInscricao(alunoId, projetoId);
            if (inscricaoExistente) {
                throw new Error("Aluno já inscrito nesse projeto");
            }

            return inscricaoProjetoRepository.criarInscricao(dados);
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

function obterDataLocalHoje() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

function formatarDataBR(dataISO) {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}