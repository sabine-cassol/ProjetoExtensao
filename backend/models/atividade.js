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
        data: {
            type: DataTypes.DATEONLY
        },
        cargaHoraria: {
            type: DataTypes.FLOAT
        },
        projetoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: "Atividades"
    });

    return Atividade;
}