import professor from "../models/professor";

export default (Professor) => {
    return {
        async criarProfessor(dados) {
            return Professor.create(dados);
        },

        async buscarPorEmail(email) {
            return Professor.findOne({where: {email} });
        },

        async buscarPorId(id){
            return Professor.findByPk(id);
        },

        async listarTodos() {
            return Professor.findAll({
                attributes: {exclude: ["senha"]} // não busca a senha quando puxar todos.
            });
        },

        async atualizarProfessor(id, novoProfessor) {
            const professor = await Professor.findByPk(id);
            if (!professor) return null;
            await professor.update(novoProfessor);
        },

        async deletar(id) {
            const professor = await Professor.findByPk(id);
            if (!professor) return null;
            await professor.destroy();
            return true;
        }




    }
}