import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";


export default (sequelize) => {
    class Presenca extends Model { }

    Presenca.init({
        dataHoraCheckIn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        localizacaoCheckIn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dataHoraCheckOut: {
            type: DataTypes.DATE,
            allowNull: false 
        },
        localizacaoCheckOut: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Presenca"
    });

    return Presenca;

}


