import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Projeto_extensao extends Model {};

    Projeto_extensao.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING
        },
        professorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "ProjetosDeExtensao"
    });

    return Projeto_extensao;
}