import { sequelize } from "../config/dataBase.js";

import { Model, DataTypes } from "sequelize";



export default (sequelize) => {

    class Aluno extends Model { }
    
    Aluno.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ra: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        curso: {
            type: DataTypes.STRING,
            allowNull: false
        },
        periodo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horasExtensao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: "Aluno"
    });
    
    return Aluno;

}
