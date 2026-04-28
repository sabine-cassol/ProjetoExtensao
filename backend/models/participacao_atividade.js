import { DataTypes, Model } from "sequelize";


export default (sequelize) => {

    class Participacao_atividade extends Model {};

    Participacao_atividade.init({
        alunoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        atividadeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dataCadastro: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "ParticipacaoAtividade"
        });

        return Participacao_atividade;
}