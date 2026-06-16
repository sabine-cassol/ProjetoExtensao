import { Projeto_extensao } from '../models/Projeto_extensao.js';

export default (Atividade) => {
    return {
        async criarAtividade(dados) {
            return Atividade.create(dados);
        },
        async buscarPorId(id) {
            return Atividade.findByPk(id, {
                include: {
                    model: Projeto_extensao,
                    attributes: ['titulo']
                }
            });
        },
        async listarTodos() {
            return Atividade.findAll({
                include: {
                    model: Projeto_extensao,
                    attributes: ['titulo']
                }
            });
        },
        async listarTodosPorProjeto(projetoId) {
            return Atividade.findAll({
                where: { projetoId },
                include: {
                    model: Projeto_extensao,
                    attributes: ['titulo']
                }
            });
        },
        async atualizarAtividade(id, novoAtividade) {
            const atividade = await Atividade.findByPk(id);
            if (!atividade) return null;
            await atividade.update(novoAtividade);
            return atividade;
        },
        async deletar(id) {
            const atividade = await Atividade.findByPk(id);
            if (!atividade) return null;
            await atividade.destroy();
            return true;
        }
    }
}