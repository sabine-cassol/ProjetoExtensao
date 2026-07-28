import { sequelize } from "../config/dataBase.js";
import bcrypt from "bcrypt";
import { Model, DataTypes } from "sequelize";



export default (sequelize) => {

    class Aluno extends Model { 
        //Método para verificar senha 
        async verificarSenha(senhaDigita) {
            return bcrypt.compare(senhaDigita, this.senha);
        };
    };
    
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
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: "Alunos",
        hooks: {
            beforeCreate: async (aluno)  => {
                aluno.senha = await bcrypt.hash(aluno.senha, 10);
            },
            beforeUpdate: async (aluno) => {
                if (aluno.changed('senha')) {
                    aluno.senha = await bcrypt.hash(aluno.senha, 10);
                }
            }
        }
    });
    
    return Aluno;

}