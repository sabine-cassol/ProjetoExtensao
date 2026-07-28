import jwt from "jsonwebtoken";

export default (visitanteRepository) => {
    return {
        async cadastrarVisitante(dados) {
            const telefoneJaExiste = await visitanteRepository.buscarPorTelefone(dados.telefone);

            if (telefoneJaExiste) {
                throw new Error("Telefone já cadastrado!");
            }

            return visitanteRepository.criarVisitante(dados);
        },

        async acessarPorTelefone(telefone) {
            const visitante = await visitanteRepository.buscarPorTelefone(telefone);
            if (!visitante) {
                throw new Error("Visitante não encontrado");
            }

            const token = jwt.sign(
                { id: visitante.id, tipo: "visitante" },
                process.env.JWT_SECRET,
                { expiresIn: "8h" }
            );

            return { visitante, token };
        },

        async buscarPorId(id) {
            const visitante = await visitanteRepository.buscarPorId(id);
            if(!visitante) {
                throw new Error("Visitante não encontrado");
            }
            return visitante;
        },

        async listarTodos() {
            return visitanteRepository.listarTodos();
        },

        async atualizar(id, dados) {
            const visitanteAtualizado = await visitanteRepository.atualizarVisitante(id, dados);
            if (!visitanteAtualizado) {
                throw new Error("Visitante não encontrado");
            }
            return visitanteAtualizado;
        },

        async desativarVisitante(id) {
            const visitanteDesativado = await visitanteRepository.buscarPorId(id);
            if (!visitanteDesativado) {
                throw new Error("Visitante não encontrado");
            }
            visitanteDesativado.ativo = false;
            return visitanteRepository.atualizarVisitante(id, visitanteDesativado);
        },

        async ativarVisitante(id) {
            const visitanteAtivado = await visitanteRepository.buscarPorId(id);
            if (!visitanteAtivado) {
                throw new Error("Visitante não encontrado");
            }
            visitanteAtivado.ativo = true;
            return visitanteRepository.atualizarVisitante(id, visitanteAtivado);
        }
    }
}