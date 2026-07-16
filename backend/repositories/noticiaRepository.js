import { Professor } from "../models/index.js";

export default (Noticia) => {
    return {
        async criarNoticia(dados) {
            return Noticia.create(dados);
        },

        async buscarPorId(id) {
            return Noticia.findByPk(id, {
                include: {
                    model: Professor,
                    as: "autor",
                    attributes: ['nome']
                }
            });
        },

        async listarTodas() {
            return Noticia.findAll({
                include: {
                    model: Professor,
                    as: "autor",
                    attributes: ['nome']
                },
                order: [['createdAt', 'DESC']]
            });
        },

        async atualizarNoticia(id, novaNoticia) {
            const noticia = await Noticia.findByPk(id);
            if (!noticia) return null;
            await noticia.update(novaNoticia);
            return noticia;
        },

        async deletar(id) {
            const noticia = await Noticia.findByPk(id);
            if (!noticia) return null;
            await noticia.destroy();
            return true;
        }
    }
}