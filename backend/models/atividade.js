import { sequelize  } from "../config/dataBase.js";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Atividade extends Model { };

    Atividade.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING
        },
        dataHoraInicio: {
            type: DataTypes.DATE
        },
        dataHoraFim: {
            type: DataTypes.DATE
        },
        projetoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Atividades"
    });

    return Atividade;
}