import { Professor } from "../models/index.js";
import professor from "../models/professor.js";
import professorRepository from "../repositories/professorRepository.js";

/**
 * onde fica a lógica de négocio do professor, tirando a responsabilidade do controller
 */
export default (Professor) => {
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
        async cadastrar(dados) {
            const emailJaExiste = await professorRepository.buscarPorEmail(dados.email);

            if (emailJaExiste) {
                throw new Error("Email já cadastrado!");
            }

            return professorRepository.criar(dados);
        },


        async VerificarLogin(email, senha) {
            const professor = await professorRepository.buscarPorEmail(email);
            if (!professor) {
                throw new Error("Credenciais inválidas");
            }

            const senhaCorreta = await professor.verificarSenha(senha);
            if (!senhaCorreta) {
                throw new Error("Credenciais inválidas");
            }

            return professor;

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
            const professor = await professorRepository.atualizar(id, dados);
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