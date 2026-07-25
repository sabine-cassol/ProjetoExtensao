// backend/services/noticiaService.js
export default (noticiaRepository) => {
    return {
        async criarNoticia(dados, professorLogadoId) {
            return noticiaRepository.criarNoticia({
                ...dados,
                professorId: professorLogadoId
            });
        },

        async buscarPorId(id) {
            const noticia = await noticiaRepository.buscarPorId(id);
            if (!noticia) {
                throw new Error("Notícia não encontrada");
            }
            return noticia;
        },

        async listarTodas() {
            return noticiaRepository.listarTodas();
        },

        async listarPorProfessor(professorId) {
            return noticiaRepository.listarPorProfessor(professorId);
        },


        async atualizarNoticia(id, dados, professorLogadoId,isAdmin) {
            const noticia = await noticiaRepository.buscarPorId(id);
            if (!noticia) {
                throw new Error("Notícia não encontrada");
            }
            if (noticia.professorId !== professorLogadoId && !isAdmin) {
                throw new Error("Você não tem permissão para editar esta notícia");
            }
            return noticiaRepository.atualizarNoticia(id, dados);
        },

        async deletarNoticia(id, professorLogadoId,isAdmin) {
            const noticia = await noticiaRepository.buscarPorId(id);
            if (!noticia) {
                throw new Error("Notícia não encontrada");
            }
            if (noticia.professorId !== professorLogadoId && !isAdmin) {
                throw new Error("Você não tem permissão para deletar esta notícia");
            }
            return noticiaRepository.deletar(id);
        }
    }
}