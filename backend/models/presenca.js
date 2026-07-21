import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";



export default (sequelize) => {
    class Presenca extends Model { }
    // backend/models/presenca.js
    Presenca.init({
        dataHoraCheckIn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        localizacaoCheckIn: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dataHoraCheckOut: {
            type: DataTypes.DATE,
            allowNull: true
        },
        localizacaoCheckOut: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('pendente', 'aprovado', 'recusado'),
            defaultValue: 'pendente'
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: "Presencas"
    });
    return Presenca;

}


