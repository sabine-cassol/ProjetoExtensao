
import jwt from "jsonwebtoken";

/**
 * onde fica a lógica de négocio do professor, tirando a responsabilidade do controller
 */
export default (professorRepository) => {
    return {
        /**
         * Cadastro de professor. CREATE - rota POST
         * 
         * Faz verificação do email da req, e, caso ele já exista, ele lança uma error
         * caso não exista ele retorna o professor cadastrado.
         * 
         * @param {*} dados da req HTTP.
         * @returns Professor com os dados persistidos no banco.
         */
        async cadastrarProfessor(dados) {
            const emailJaExiste = await professorRepository.buscarPorEmail(dados.email);

            if (emailJaExiste) {
                throw new Error("Email já cadastrado!");
            }

            return professorRepository.criarProfessor(dados);
        },


        async verificarLogin(email, senha) {
            const professor = await professorRepository.buscarPorEmail(email);
            if (!professor) {
                throw new Error("Credenciais inválidas");
            }

            const senhaCorreta = await professor.verificarSenha(senha);
            if (!senhaCorreta) {
                throw new Error("Credenciais inválidas");
            }

            const token = jwt.sign(
                {id: professor.id, tipo: "professor"},
                process.env.JWT_SECRET,
                {expiresIn: "8h"}
            );

            return { professor, token };

        },

        async buscarPorId(id) {
            const professor = await professorRepository.buscarPorId(id);
            if (!professor) {
                throw new Error("Credenciais inválidas");
            }
            return professor;
        },

        async listarTodos() {
            return professorRepository.listarTodos();
        },

        async atualizar(id, dados) {
            const professor = await professorRepository.atualizarProfessor(id, dados);
            if (!professor) {
                throw new Error("Professor não encontrado");
            }
            return professor;
        },

        async deletarProfessor(id) {
            const resultado = await professorRepository.deletar(id);
            if (!resultado) {
                throw new Error("Professor não encontrado");
            }
            return true;
        }
    }


}