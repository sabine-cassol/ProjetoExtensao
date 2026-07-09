import { Model, DataTypes } from "sequelize";

export default (sequelize) => {

    class Visitante extends Model {

    };

    Visitante.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: "Visitantes"
    });

    return Visitante;
};