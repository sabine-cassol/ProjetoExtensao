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
            allowNull: true 
        },
        localizacaoCheckOut: {
            type: DataTypes.STRING,
            allowNull: true
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


