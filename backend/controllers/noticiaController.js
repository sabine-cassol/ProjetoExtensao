export default (noticiaService) => {
    return {
        async criarNoticia(req, res) {
            try {
                const noticia = await noticiaService.criarNoticia(req.body, req.usuario.id);
                res.status(201).json(noticia.toJSON());
            } catch (erro) {
                res.status(400).json({ erro: erro.message });
            }
        },

        async buscarPorId(req, res) {
            try {
                const noticia = await noticiaService.buscarPorId(req.params.id);
                res.status(200).json(noticia.toJSON());
            } catch (erro) {
                res.status(404).json({ erro: erro.message });
            }
        },

        async listarTodas(req, res) {
            try {
                const noticias = await noticiaService.listarTodas();
                res.status(200).json(noticias.map((n) => n.toJSON()));
            } catch (erro) {
                res.status(404).json({ erro: erro.message });
            }
        },

        async listarPorProfessor(req, res) {
            try {
                const noticias = await noticiaService.listarPorProfessor(req.params.professorId);
                res.status(200).json(noticias.map((n) => n.toJSON()));
            } catch (erro) {
                res.status(404).json({ erro: erro.message });
            }
        },


        async atualizarNoticia(req, res) {
            try {
                const noticia = await noticiaService.atualizarNoticia(req.params.id, req.body, req.usuario.id);
                res.status(200).json(noticia.toJSON());
            } catch (erro) {
                res.status(403).json({ erro: erro.message });
            }
        },

        async deletarNoticia(req, res) {
            try {
                await noticiaService.deletarNoticia(req.params.id, req.usuario.id);
                res.status(200).json({ mensagem: "Notícia deletada com sucesso" });
            } catch (erro) {
                res.status(403).json({ erro: erro.message });
            }
        }
    }
}