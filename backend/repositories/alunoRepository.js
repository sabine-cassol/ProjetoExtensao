
export default (Aluno) => {
    return {
        async criarAluno(dados) {
            return Aluno.create(dados);
        },
        async buscarPorEmail(email) {
            return Aluno.findOne({
                where: {email} });
        },

        async buscarPorId(id) {
            return Aluno.findByPk(id,
                {attributes: {exclude: ["senha"]}}
            );
        },

        async buscarPorRa(ra) {
            return Aluno.findOne({
                where: {ra},
                attributes: {exclude: ["senha"]}});
        },

        async listarTodosPorCurso(curso) {
            return Aluno.findAll({
                where: {curso},
                attributes: {exclude: ["senha"]}})
        },

        async listarTodos() {
            return Aluno.findAll({
                attributes: {exclude: ["senha"]} // não busca a senha quando puxar todos.
            });
        },

        async atualizarAluno(id, novoAluno) {
            const aluno = await Aluno.findByPk(id);
            if (!aluno) return null;
            await aluno.update(novoAluno);
            return aluno;
        },

        async deletar(id) {
            const aluno = await Aluno.findByPk(id);
            if (!aluno) return null;
            await aluno.destroy();
            return true;
        }
    }
}