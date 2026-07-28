import { Model, DataTypes } from "sequelize";

export default (sequelize) => {

    class Inscricao_visitante extends Model {

    };

    Inscricao_visitante.init({
        visitanteId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        projetoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dataCadastro: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "InscricaoVisitante"
    });

    return Inscricao_visitante;
};