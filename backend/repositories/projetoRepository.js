import Professor from "../models/index.js";

export default (Projeto_extensao) => {
    return {
        async criarProjeto(dados) {
            return Projeto_extensao.create(dados);
        },

        async buscarPorId(id) {
            return Projeto_extensao.findByPk(id, {
                include: {
                    model: Professor,
                    attributes: ['nome']
                }
            });
        },

        async listarTodos() {
            return Projeto_extensao.findAll({
                include: {
                    model: Professor,
                    attributes: ['nome']
                }
            });
        },

        async listarTodosPorProfessor(professorId) {
            return Projeto_extensao.findAll({
                where: { professorId },
                include: {
                    model: Professor,
                    attributes: ['nome']
                }
            });
        },

        async atualizarProjeto(id, novoProjeto) {
            const projeto = await Projeto_extensao.findByPk(id);
            if (!projeto) return null;
            await projeto.update(novoProjeto);
            return projeto;
        },

        async deletar(id) {
            const projeto = await Projeto_extensao.findByPk(id);
            if (!projeto) return null;
            await projeto.destroy();
            return true;
        }
    }
}   