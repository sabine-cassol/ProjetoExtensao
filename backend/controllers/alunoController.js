export default (alunoService) => {
    return {
        async cadastrarAluno(req, res) {
            try {
                const aluno = await alunoService.cadastrarAluno(req.body);
                const { senha, ...dados} = aluno.toJSON();
                res.status(201).json(dados);
            } catch (erro) {
                res.status(400).json({erro : erro.message});
            }
        },

        async login(req, res) {
            try {
                const { email, senha} = req.body;
                const { aluno, token} = await alunoService.verificarLogin(email, senha);
                const { senha: _, ...dados} = aluno.toJSON();

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax",
                    maxAge: 8 * 60 * 60 * 1000 //8 horas em milissegundos
                });

                res.status(200).json({tipo: "aluno", aluno: dados});
            } catch (erro) {
                res.status(401).json({erro : erro.message});
            }
        },

        async logout(req, res) {
            res.clearCookie("token");
            res.status(200).json({ mensagem: "Logout realizado"});
        },

        async buscarPorId(req, res) {
            try {
                const aluno = await alunoService.buscarPorId(req.params.id);
                const { senha, ...dados} = aluno.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message});
            }
        },

        async buscarPerfil(req, res) { 
            try {
                const aluno = await alunoService.buscarPorId(req.usuario.id);
                const { senha, ...dados} = aluno.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message})
            }
        },

        async buscarTodos(req, res) {
            try {
                const alunos = await alunoService.listarTodos();
                const dados = alunos.map((a) => {
                    const {senha, ...aluno} = a.toJSON();
                    return aluno;
                });
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message});
            }
        }, 

        async buscarPorRa(req, res) {
            try {
                const aluno = await alunoService.buscarPorRa(req.usuario.ra);
                const { senha, ...dados} = aluno.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message});
            }
        },
        async atualizarPerfil(req, res) {
            try {
                const aluno = await alunoService.atualizar(req.usuario.id, req.body);
                const { senha, ...dados} = aluno.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(400).json({erro: erro.message});
            }
        },

        async desativarAlunoPorId(req, res) {
            try {
                const alunoDesativado = await alunoService.desativarAluno(req.params.id);
                const { senha, ...dados} = alunoDesativado.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message});
            }
        },
        async ativarAlunoPorId(req, res) {
            try {
                const alunoAtivado = await alunoService.ativarAluno(req.params.id);
                const { senha, ...dados} = alunoAtivado.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message});
            }
        }
    }
}