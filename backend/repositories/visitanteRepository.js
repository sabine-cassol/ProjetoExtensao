export default (Visitante) => {
    return {
        async criarVisitante(dados) {
            return Visitante.create(dados);
        },
        async buscarPorTelefone(telefone) {
            return Visitante.findOne({
                where: {telefone} });
        },

        async buscarPorId(id) {
            return Visitante.findByPk(id);
        },

        async listarTodos() {
            return Visitante.findAll();
        },

        async atualizarVisitante(id, novoVisitante) {
            const visitante = await Visitante.findByPk(id);
            if (!visitante) return null;
            await visitante.update(novoVisitante);
            return visitante;
        },

        async deletar(id) {
            const visitante = await Visitante.findByPk(id);
            if (!visitante) return null;
            await visitante.destroy();
            return true;
        }
    }
}