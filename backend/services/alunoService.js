import jwt from "jsonwebtoken";

export default (alunoRepository) => {
    return {
        async cadastrarAluno(dados) {
            const emailJaExiste = await alunoRepository.buscarPorEmail(dados.email);

            if (emailJaExiste) {
                throw new Error("Email já cadastrado!");
            }

            return alunoRepository.criarAluno(dados);
        },

        async verificarLogin(email, senha) {
            const aluno = await alunoRepository.buscarPorEmail(email);
            if (!aluno) {
                throw new Error("Credenciais inválidas");
            }

            const senhaCorreta = await aluno.verificarSenha(senha);
            if (!senhaCorreta) {
                throw new Error("Credenciais inválidas");
            }

            const token = jwt.sign(
                { id: aluno.id, tipo: "aluno" },
                process.env.JWT_SECRET,
                { expiresIn: "8h" }
            );

            return { aluno, token };

        },

        async buscarPorId(id) {
            const aluno = await alunoRepository.buscarPorId(id);
            if(!aluno) {
                throw new Error("Aluno não encontrado");
            }
            return aluno;
        },

        async buscarPorRA(ra) {
            const aluno = await alunoRepository.buscarPorRA(ra);
            if(!aluno) {
                throw new Error("Aluno não encontrado");
            }
            return aluno;
        },

        async buscarTodosPorCurso(curso) {
            return alunoRepository.buscarTodosPorCurso(curso);
        },

        async listarTodos() {
            return alunoRepository.listarTodos();
        },

        async atualizar(id, dados) {
            const aluno = await alunoRepository.atualizarAluno(id, dados);
            if (!aluno) {
                throw new Error("Aluno não encontrado");
            }
            return aluno;
        },

        async desativarAluno(id) {
            const alunoDesativado = await alunoRepository.buscarPorId(id);
            if (!alunoDesativado) {
                throw new Error("Aluno não encontrado");
            }
            alunoDesativado.ativo = false;
            return alunoRepository.atualizarAluno(id, alunoDesativado);
        },

        async ativarAluno(id) {
            const alunoAtivado = await alunoRepository.buscarPorId(id);
            if (!alunoAtivado) {
                throw new Error("Aluno não encontrado");
            }
            alunoAtivado.ativo = true;
            return alunoRepository.atualizarAluno(id, alunoAtivado);
        }
    }

}