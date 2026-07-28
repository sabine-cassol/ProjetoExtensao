import { sequelize } from "../config/dataBase.js";
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
        exigeLocalizacao: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: true
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: true
        },
        raioMetros: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 100 // tolerância padrão de 100 metros
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