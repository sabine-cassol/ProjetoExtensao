import { DataTypes, Model } from "sequelize";


export default (sequelize) => {

    class Participacao_projeto extends Model {};

    Participacao_projeto.init({
        alunoId: {
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
        modelName: "ParticipacaoProjeto"
        });

        return Participacao_projeto;
}