import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Noticia extends Model {};

    Noticia.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resumo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        conteudo: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        professorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Noticia"
    });

    return Noticia;
}
