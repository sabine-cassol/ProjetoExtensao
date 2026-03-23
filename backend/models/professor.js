import { sequelize } from "../config/dataBase.js";
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";


export default (sequelize) => {
    class Professor extends Model { 
        //Método para verificar senha 
        async verificarSenha(senhaDigita) {
            return bcrypt.compare(senhaDigita, this.senha);
        }
    };

    Professor.init({
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
        curso: {
            type: DataTypes.STRING,
            allowNull: false
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Professores",

        hooks: {
            beforeCreate: async (Professor) => {
                Professor.senha = await bcrypt.hash(Professor.senha, 10);
            }
        }
    });

    return Professor;
}