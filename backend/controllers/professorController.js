
export default (professorService) => {
    return {
        async cadastrarProfessor(req, res) {
            try {
                const professor = await professorService.cadastrarProfessor(req.body);
                const { senha, ...dados} = professor.toJSON();
                res.status(201).json(dados);
            } catch (erro) {
                res.status(400).json({ erro: erro.message });
            }
        },

        async login(req, res) { 
            try {
                const { email, senha } = req.body;
                const { professor, token } = await professorService.verificarLogin(email, senha);
                const { senha: _, dados } = professor.toJSON();

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax",
                    maxAge: 8 * 60 * 60 * 1000 //8 horas em milissegundos
                });

                res.status(200).json({ tipo: "professor", professor: dados});
            } catch (erro) {
                res.status(401).json({ erro: erro.message});
            }
        },

        async logout(req, res) {
            res.clearCookie("token");
            res.status(200).json({ mensagem: "Logout realizado"});
        },

        async buscarPerfil(req, res) {
            try {
                const professor = await professorService.buscarPorId(req.usuario.id);
                const { senha, ...dados} = professor.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(404).json({erro: erro.message});
            }
        },

        async atualizar(req, res) { 
            try {
                const professor = await professorService.atualizar(req.usuario.id, req.body);
                const { senha, ...dados} = professor.toJSON();
                res.status(200).json(dados);
            } catch (erro) {
                res.status(400).json({ erro: erro.message})
            }
        }
    }
}